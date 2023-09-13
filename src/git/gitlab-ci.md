---
date: 2023-01-10
tag: 
- Git
- Gitlab
- Java
---

# Gitlab CI
## 合并代码前进行检查
### 背景
有的产品线使用 Jenkins 进行 CI，但又没设置好相应的 GitLab 插件，于是会形成这样一个流程：

- feature 分支发起 Merge Request
- 合并至受保护的分支
- 登录 Jenkins，点击构建
- 构建失败，原因：编译报错

最后一点，非常难以忍受，因为代码已经合并进去了，木已成舟。此时面对编译报错，第一反应是解决报错，重新编译。但有没有一种可能，我根本不想要这些编译报错的代码呢？

笔者还是更倾向于防患于未然的思维模式，也即不能通过编译的代码，不允许合并至受保护的分支。而使用 Gitlab CI 来做这件事比 Jenkins 体验更丝滑，下面就来介绍一下具体的做法。
### 安装Gitlab Runner
```shell
docker run -d --name gitlab-runner --restart always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /srv/gitlab-runner/config:/etc/gitlab-runner \
  gitlab/gitlab-runner:latest
```
其他安装方式可查阅[文档](https://docs.gitlab.com/runner/install/docker.html#install-the-docker-image-and-start-the-container)。
### 注册Gitlab Runner
Gitlab Runner 根据范围分为[三种](https://docs.gitlab.com/ee/ci/runners/runners_scope.html)。注册需要获取相应的 token，这就涉及到了权限，至少需要 Maintainer 权限。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387098778.png)
下面以 Specific Runner 为例进行说明。

进入项目如下界面：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387102770.png)

拿到 URL 及 token：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387107092.png)

执行命令进行注册:
```shell
docker run --rm -it -v /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register
```
根据提示输入内容，其中 URL 及 token 就是前面步骤中 Web 界面获取的信息。

命令行操作示例如下：
```bash
Enter the GitLab instance URL (for example, https://gitlab.com/):
https://your-gitlab

Enter the registration token:
your-token

Enter a description for the runner:
java

Enter tags for the runner (comma-separated):
java


Enter an executor: custom, shell, virtualbox, kubernetes, docker, docker-ssh, parallels, ssh, docker+machine, docker-ssh+machine:
docker

Enter the default Docker image (for example, ruby:2.6):
maven:3.6.3-openjdk-8
```

注册成功后，显示示例如下：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387118062.png)
### 设置MR检查
进入项目如下界面：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387122013.png)

勾选流水线必须成功。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388470210.png)
### 配置.gitlab-ci.yml
简单示例如下，根据实际情况修改：
```yaml
image: maven:3.6.3-openjdk-8

variables:
  MAVEN_CLI_OPTS: "-s .m2/settings.xml --batch-mode"
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

cache:
  paths:
    - .m2/repository

stages:
  - build

build:
  stage: build
  script:
    - mvn $MAVEN_CLI_OPTS clean compile
  tags:
    - java # 这是注册了的 gitlab runner 的 tag
  rules:
    - if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME =~ /develop|test|uat/

```
上述示例要设置成功，还要确保 .m2/settings.xml 文件存在。

建议提前 yml 文件前，在 Gitlab 先进行语法校验。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388474604.png)

如果错误，会有提示。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388478169.png)
### 效果
当流水线还未结束时，不能提前合并代码，只能等待流水线成功。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388481821.png)

如果流水线失败了，不能合并。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388485568.png)

## 集成单元测试
核心思路就是在 CI 环境运行 `mvn test`。

可能遇到的问题在于，由于项目依赖关系：
1. 旧代码中运行不通过的测试影响到了 `mvn test` 的结果
2. pom.xml 无法读取相关的配置

首先，假设根目录为 parent，其下有三个子模块：
- a
- b
- common

每个目录都有 pom.xml，其中所有子模块的属性值都来自于 parent 目录的 pom.xml。

而我们需要进行持续集成的模块是 b，则 maven 命令应该如下：
```shell
mvn --also-make -pl b test
```

则此时就跳过了子模块 a。

但如果子模块 b 又依赖了 common，此时 common 的遗留的测试用例报错了，那我们的解决办法只能是：一个个地解决报错。

当上述 maven 命令可以运行后，就可以修改 Gitlab CI 的配置，然后设置调度任务，让 Gitlab 每天都跑测试用例。一旦用例执行不通过，就会发邮件通知到我们。

![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683436020492.png)

## 线上发布 jar
可以在前文的基础上，设置流水线自动发布 jar。
### Maven配置
考虑到一个项目A，可能划分了多个模块，并非每个模块都需要发布 jar，可以修改对应模块的 pom.xml
```xml
<build>
  <plugins>
  <!--  跳过 deploy 步骤   -->
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-deploy-plugin</artifactId>
        <version>3.0.0</version>
        <configuration>
            <skip>true</skip>
        </configuration>
    </plugin>
  </plugins>
</build>
```

则在项目根目录执行 deploy 命令即可：
```bash
mvn deploy -Dmaven.test.skip
```

### Gitlab配置
相应 gitlab-ci 配置如下：
```yaml
deploy:
  stage: deploy
  script:
    - mvn $MAVEN_CLI_OPTS -Dmaven.test.skip deploy
  tags:
    - java
  rules:
    - if: $CI_COMMIT_BRANCH =~ /develop|test|uat/

```
代码合并或有新的 commit 时，会执行流水线：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388489368.png)
### 拉取最新的jar
在B项目中，如果要引用A项目打出来的 jar，记得拉取最新的版本，pom.xml 设置如下：
```xml
<repositories>
    <repository>
        <id>nexus</id>
        <name>nexus-snapshot</name>
        <url>http://localhost:8081/repository/maven-snapshots/</url>
          <snapshots>
              <enabled>true</enabled>
            <!--     拉取最新的   -->
              <updatePolicy>always</updatePolicy>
          </snapshots>
    </repository>
</repositories>
```

## 其他问题与解决方案
### Node.js
本文主要以 Java 项目为例进行 Gitlab CI 相关的讲解，如果需要 Node.js 项目的示例，可以查看[另一篇文章](../software-testing/use-playwright-for-ui-testing.html#%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90)。

### 创建不了容器
> ERROR: Preparation failed: adding cache volume: set volume permissions: running permission container "d1574748b77fc73a4319a45341af1f0eab983900d81885a02c017ff6c5559f28" for volume "runner-bzsttzs-project-2271-concurrent-0-cache-3c3f060a0374fc8bc39395164f415a70": starting permission container: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "process_linux.go:319: getting the final child's pid from pipe caused \"EOF\"": unknown (linux_set.go:105:0s)

可以尝试的方案：
```shell
docker restart gitlab-runner
```

如果上述方法不行，可尝试重启 docker
```shell
sudo systemctl stop docker
sudo systemctl start docker
sudo systemctl status docker
```
### 本地成功，流水线失败
如果流水线编译报错，本地编译通过，不用怀疑，一定是本地的问题。

本地之所以能编译通过，是因为有缓存。如果 pom.xml 没有设置 `<updatePolicy>always</updatePolicy>`，编译时很可能使用的是缓存。

清除缓存拉取最新的包即可。 
```python
mvn -U clean install
```
## 参考文档

- [Gitlab CI 示例 ](https://docs.gitlab.com/ee/ci/examples/)
- [预设的环境变量](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)
- [rules规则说明](https://docs.gitlab.com/ee/ci/jobs/job_control.html#specify-when-jobs-run-with-rules)

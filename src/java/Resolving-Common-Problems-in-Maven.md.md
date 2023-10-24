---
date: 2022-12-09
tag:
- Java
- Daily
---

# Maven常见问题与解决方案
## 运行 class 找不到主类
```xml
maven compile
```
得到 class 文件后
```xml
cd /my-app/target/com/mycompany/app
java App
```
报错：
> 错误: 找不到或无法加载主类 App
> 原因: java.lang.NoClassDefFoundError: com/mycompany/app/App (wrong name: App)

这是因为主类并非在默认包下，故需要在正确的路径下调用全限定名。
```bash
cd /my-app/target

java com.mycompany.app.App
```
## 运行 jar 找不到主类
```java
maven package
```
打出 jar 后，运行失败，因为主清单找不到主类。这是因为缺少了打包配置
```xml
        <plugin>
          <artifactId>maven-jar-plugin</artifactId>
          <version>3.0.2</version>
<!--           添加下面的配置 -->
          <configuration>
            <archive>
              <manifest>
                <mainClass>com.mycompany.app.App</mainClass>
              </manifest>
            </archive>
          </configuration>
        </plugin>

```
## 编译时找不到主类
表现：Maven 有相应的 jar，IDEA 能自动 import，编译时却报找不到类 `NoClassDefFoundError`

实例：flink-quickstart-java 项目就是如此。

原因：这跟 Maven 依赖的 score 有关，因为 pom.xml 对依赖的 scope 定义为 provided，默认时编译不会去找相应的依赖。关于 maven scope 的知识点，[点击这里](https://www.baeldung.com/maven-dependency-scopes)。

解决方案：

1. build configuration
2. modify options
3. 把 provided 加入 classpath

![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1668066163479-43ea1144-f764-4ec0-b5ca-823b8efccae8.png)

## 设置Maven目录
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1670227320589-edf93b93-25d6-4992-9fe1-528218537ecf.png)
尽管IDEA可以设置 local repository，但实际上还是以 settings.xml 的配置为主，注意检查路径是否正确
```bash
<localRepository>/path/to/repository</localRepository>
```
## 无法识别 Maven 项目
IDEA的表现：Java文件 icon 异常![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1668149177501-37c6b4d2-1674-4ab2-b7c7-f7774ab90e12.png)，
正常是这样的![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1668149163603-a59d7ffe-7236-4756-8add-a55c1d282754.png)。

此时代码的方法、变量不能跳转到定义处，无法编译、找不到主类。

表面上看，这是没有把源码目录设置为 src root，但实际上，这是 pom.xml 解析、Maven依赖下载失败后的结果。很可能是因为把 IDEA 下载依赖的进程杀死了而导致的。

解决方案：删除项目，重新创建。
## 使用了不想要的镜像源
有可能第三方依赖包指定了第三方镜像源，而该镜像源不可用、或网络很慢，此时想避免使用该镜像源。

解决方案：观察日志，确认第三方镜像源的名字，修改 ~/.m2/settings.xml，拦截其请求
```shell
  <mirror>
      <id>my-central</id>
      <mirrorOf>central,third-party-central</mirrorOf>
      <name>my-central</name>
      <url>my-central-url</url>
  </mirror>
```
以上配置会拦截所有指向 Maven中央仓库、third-party-central 的请求，使用 my-central 下载依赖。
## 下载 jar 失败
如果因为网络问题， mvn 命令安装依赖失败（如下载某个依赖卡死），可以试试手动下载。

解决方案：

1. 点击相应的 jar 包链接，使用浏览器下载
2. 观察 jar 包的下载链接，把下载到的 jar 复制到相应的 ~/.m2 子目录下
3. 重新执行 mvn install
## 私服认证401
下载私服依赖时，报了 401。

解决方案：

1. 检查 ~/.m2/settings.xml，找到 server 选项，确保设置了相应的用户名与密码
2. 点击私服链接，输入用户名与密码
3. 如果上述步骤不能正确执行，说明设置有误，需要更正设置；如果上述步骤正常，有可能是 IDEA 抽风，建议：
   1. 删除项目，重新克隆
   2. 手动下载 jar，放到~/.m2 目录

## 避免缓存
pom.xml 作好设置
```xml
<repository>
  <id>my-central</id>
  <name>my repo</name>
  <url>http://</url>
  <snapshots>
    <enabled>true</enabled>
    <updatePolicy>always</updatePolicy>
  </snapshots>
</repository>

```

或命令行强制不使用依赖：
```xml
mvn -U clean install
```
## 参考资料
官网：[https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html)
书籍：《Maven实战》

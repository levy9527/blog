---
date: 2023-03-23
tag: 
- Git
- GitLab
- Python
---

# 操作 Gitlab MR 的命令行工具
## 背景
为什么开发这个工具？主要解决以下问题：

1. 提测、上 UAT 时，避免漏合代码。
2. 代码冲突时，团队成员不用再问“解决这个冲突要怎么切分支？”
3. 一个 feature 分支要向多个保护分支提交合并请求时，减少烦琐而易错的选取分支的界面操作。

可能会有人问：为什么会漏合代码？当你在某一个迭代需要来回在不同的 feature 分支切换、一个 feature 横跨多个项目，同时你偶尔还要兼顾 bug 修复的时候，你极容易丢失上下文。
并且，不同的 feature 研发进度不一致，可能出现的一种情况是：feature A 只是合并到 test 分支，但　feature B 却已经合并到了 uat。
对此，有人问你代码到底合并了没，你怎么确认？一个个项目去相应的主干分支里查看提交历史吗？就是因为不想再这样做了，这才有了这个工具。
## 安装
### 解压zip
下载并解压文件:
- [Windows](https://r0e715v8ejr.feishu.cn/file/IxH4bYAOkowK08xSid1crXcSnRo)
- [Linux](https://r0e715v8ejr.feishu.cn/file/ORa3buA3donF3TxxPVwcHSYnnQb)

### 安装git bash
Windows系统才要安装。
如果 git bash 版本不足 2.41.0，最好安装最新版本。

安装地址：[https://gitforwindows.org/](https://gitforwindows.org/)
## 配置
新增文件
```bash
vi ~/.mr-config.json
```

复制以下内容：
```bash
{
  "gitlab_url":"https://your-gitlab.com",
  "gitlab_token":"your-token",
  "codebases": {
    "default": ["dev", "test", "master"]
  }
}

```
对于该配置的解释，详见后文。
### gitlab_token
先获取 gitlab token，操作如下：

1. 打开Gitlab，右上角点击个人头像

![0a8ff2ce0d86d685fd2b5283c40871d9.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154008266.png)

2. 点击左侧边栏

![f1151c580d5672d187ca38699e9c2013.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154013693.png)

3. 勾选全部权限，并确认生成 token

![790ed16e056c26d79f35b7ff4c072c8f.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154016668.png)

### codebases
适用于多基线的场景。

如产品默认有三个环境，分别对应三条分支 dev、test、master。
同时，又有定制化需求，专门为某一客户进行源码改动，同样有三个环境，则可能出现的配置如下：
```json
  "codebases": {
    "default": ["dev", "test", "master"],
    "customize": ["customize-dev", "customize-test", "customize-master"]
  }

```
### 环境变量
把 mr 可执行文件所在目录设置到环境变量中：

1. 查找"环境变量"

![157a114acdf00def50ae774b4d68e004.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154020270.png)

2. 点击"环境变量"

![6a99dd2754b75348523a388d36067bd9.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154023459.png)

3. 找到 Path，点击"编辑"

![d1335d05ddefa6aa33006e9f24f3254f.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154026703.png)

4. 点击"新增"，再点击"浏览"，找到最里层的 mr 目录

![6df5b86a1f91452414382718983e0e22.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154030135.png)
（上图是示例，具体路径根据自己的情况而定）

重新打开 git bash 即可生效，记得一定要重新打开！

注：如果是 Linux，那很简单，修改 ~/.bashrc
```bash
export PATH=$PATH:mr文件夹所在路径即可
```
### IDEA
该步骤选填，适用于 JetBrains 系列产品，想在 IDEA 的终端中也使用 mr 命令时可配置。

 File -> Settings -> Tools -> Terminal：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154033353.png)
## 使用
可以不带参数运行，查看支持的命令：mr
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154109989.png)
### 创建MR
```bash
# 默认以当前分支作为 source_branch
# 根据 codebases 的设置选择 target_branch
mr create
```
提示输入要提交 MR 的源分支，按回车使用当前分支：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154113289.png)
创建成功： 
![ae115431acc7c0b9275c158fb99e3eaa.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154116622.png)

可以处理同名项目的情况：
![dealing-with-same-name-projects.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/dealing-with-same-name-projects.png)

MR 不会重复创建：
![ab7d3ea5177726bbab0ccbcd870d0044.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154120100.png)

分支没有代码更新时，也不会创建 MR：
![147f745360164598c78c3de8808af1d2.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154123348.png)
### 查看MR
```shell
mr list
```

可以用来查看自己有哪些MR未合并。注意：只显示自己创建的。

- 如果可以合并，显示 [ok]
- 如果有冲突，显示 [conflict]

![85ac4ee87e49965270f502ef830bf619.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154126283.png)
### 合并MR
```shell
# 格式如下
# mr merge {mr_url}
mr merge https://gitlab.com/my-project/-/merge_requests/2
```
{mr_url} 的值可以根据以下方式来获取：

1. create 命令成功后的输出
2. list 命令的输出
3. gitlab web界面上 MR 的 url

合并前会有确认提示：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154129605.png)

可以取消，防止误合并：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154133045.png)
### 冲突处理
解决冲突，切换分支，是很麻烦的事情，故本工具为解决冲突提供了一些辅助功能。

注意：命令行只做拉取代码、切合分支等必要操作，冲突的解决仍需要人工介入，工具不会自动合并代码的。

合并冲突状态的MR：
```shell
mr merge {conflict_mr_url}
```

出现提示，是否自动切换分支为解决冲突作准备：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154136190.png)
当然在此之前，要保证工作目录是干净的，如果有修改未提交，会中止切换分支操作：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154139322.png)
> 可以使用 `git stash`保存修改，合并冲突后，再 `git stash pop`


命令执行成功时，会切换到 `conflict/` 开头的分支。
此时，打开 IDE 或 Git 管理工具，根据提示把相应的分支合并到 `conflict/` 分支即可。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154143622.png)

以 IDEA 为例：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154146323.png)

解决冲突后，再切回命令行，此时有两种选择：

1. 创建 MR，适用于自己没有权限合并的场景
2. 合并 MR，适用于自己有权限合并的场景

如果是创建，再次执行 create 命令即可：
```shell
mr create
```
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154149211.png)
创建的 MR 合并时会自动删除 `conflict/` 分支。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154152000.png)

如果是合并，同样再次执行 merge 命令即可，此时不用带参数：
```shell
mr merge
```
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154155089.png)
![52fee749bc6d270f9ccab3eb0e04208b.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154158111.png)

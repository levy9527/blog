---
date: 2023-08-12
tag:
- Java
---

# 奇技淫巧：在没有源码的情况下，把 snapshot 转成 release 包
## 背景
项目中依赖了一个旧的 snapshot.jar，有人提出要求必须使用 release.jar，不能使用 snapshot。

问题来了，该 jar 所属的源码不知所踪，那还怎么发布 release.jar 呢？这就是本文要解决的问题。

<!-- more -->

## 下载
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748114074-8149044d-a066-4069-9bbd-7124bede3686.png)
首先我们登录仓库，输入　ArtifactId，找到对应的 snapshot jar 包，并点击进入详情。

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748125239-9f38e77c-e2a9-4cb9-a5ae-663d1cbdbc5a.png)
找到关键的三个 jar:

- x.jar
- x-sources.jar
- x.pom

分别点击进入详情
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748130574-143b17a9-4ecc-4543-8802-d51b14f43651.png)
依次点击　Path，下载到本地。
## 修改
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748138424-a8260207-8884-4054-8b86-c247b3766a3b.png)
首先修改名字，如图所示。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748145414-f10b3b8a-9f57-493e-ae78-978b80e41dcd.png)
再使用任意工具解压 x.jar，提取出两个文件夹。进入　META-INF

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748152420-1e600d70-ff87-4962-844f-021fe5288aa2.png)
修改　MANIFEST.MF，把里面的 snapshot 字符串去掉（如果有的话）

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748159789-a1ebe8eb-231f-435c-aabb-0c2fb06f93db.png)
再点击　maven　文件夹

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748164871-77ab05e9-480f-4afb-9f48-6dba9b89a49a.png)
修改　pom.xml、pom.properties　文件，把里面的 snapshot 字符串去掉。
## 上传
把前面解压出来的文件重新打包成 jar
```bash
jar cvf my-1.4.1.jar com META-INF

# you can also use zip 
# zip -r my-1.4.1.jar com META-INF
```

然后上传仓库
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748169575-27ed04cd-a4c5-4956-b8fc-9e7acb9b7f42.png)
在Upload中，点击　maven-releases

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748175045-badb4fa7-8d30-45ad-8707-d096da6a28ec.png)
把三个文件添加上去，点击　Upload。

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1691748258011-2fef169f-82c0-41c4-a7f7-d7bca0065b25.png)
可以看到，新的 release 版本的 jar 包已经在仓库中了，可以被安装使用了。

# IDEA常见问题与解决方案 

## 启动参数过长
Error running OrderStartupApplication. Command line is too long. Shorten the command line and rerun.
解决方案：

1. 编辑 .idea/workspace.xml
2. 找到 `PropertiesComponent`
3. 添加：<property name="dynamic.classpath" value="true" />

或者这样：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1691568843067-69847e70-987e-4263-81f3-7f19c3acccc5.png)
```json
"dynamic.classpath": "true",
```

## 设置JDK版本
相关报错：

- [java: Compilation failed: internal java compiler error](https://blog.csdn.net/qq_32452623/article/details/106141126)
- Cannot resolve jdk.tools:jdk.tools:1.7

解决方案如下。

1.先确保已安装 jdk。

2.修改运行设置
![image.png](https://cdn.nlark.com/yuque/0/2021/png/160590/1637063344496-6b8f60c5-c444-4f77-a404-9b8ca8d7a9bb.png)
![image.png](https://cdn.nlark.com/yuque/0/2021/png/160590/1637063379719-7c3d4323-5d77-44c4-8c49-7d79c4d61865.png)
3.修改外部依赖设置
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1645614452333-3f5d2763-e7a1-42d8-a3ea-b73cb664e6a1.png)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1645614476794-b37230c5-958a-459d-8dce-ecb5cb839d3f.png)
## lombok 编译报错
前提：[lombok 有maven依赖后，还要安装IDE插件](https://blog.csdn.net/weixin_42440768/article/details/107999786)

相关报错：
[class lombok.javac.apt.LombokProcessor (in unnamed module @0x29f3e3c7) cannot access class com.sun.tools.javac.processing.JavacProcessingEnvironment (in module jdk.compiler) because module jdk.compiler does not export com.sun.tools.javac.processing to unnamed module @0x29f3e3c7](https://stackoverflow.com/questions/66801256/java-lang-illegalaccesserror-class-lombok-javac-apt-lombokprocessor-cannot-acce)：

解决方案：找到相应的 pom.xml，更新依赖版本（如果没有，则添加依赖）
```
<dependency>
  <groupId>org.projectlombok</groupId>
  <artifactId>lombok</artifactId>
  <version>1.18.20</version>
</dependency>
```
当然，还要确保项目 JDK 版本正确[
](https://blog.csdn.net/qq_32452623/article/details/106141126)
## 设置启动参数
Run -> Edit Configurations
注意是 VM options

常见使用场景，使用本地配置：-Dspring.profiles.active=local
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1641977331365-8803c79f-8e88-401d-9452-f86c4d5a457e.png)
## 栈溢出
maven build "Exception in thread "main" java.lang.StackOverflowError"

-Xss40m
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1669357898562-420a3ceb-3dfd-4b9c-93fa-8884edc8b231.png)

不是maven的编译选项在下面
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1669357950353-4cc40792-1e54-400e-b3c8-aab28b71df64.png)

## 内存不足
如图所示进入设置：![image.png](https://cdn.nlark.com/yuque/0/2021/png/160590/1637063639112-cf83394f-5c10-4eb6-9946-8f10cf901f62.png)
-Xmx4011m

---

相关报错：
java: java.lang.OutOfMemoryError: GC overhead limit exceeded

解决方案：需要进行如图所示修改设置
![image.png](https://cdn.nlark.com/yuque/0/2021/png/160590/1639039051050-9a0039c3-1087-4701-8ee9-0d61994bf2ca.png)
## 热加载
相关文章：[https://cloud.tencent.com/developer/article/1683029](https://cloud.tencent.com/developer/article/1683029)

提示：不用追求自动重新编译，手动按 build 即可。
## 终端加载环境变量
相关问答：[https://stackoverflow.com/questions/36592226/bashrc-not-sourced-on-intellij-ideas-terminal/59138750#59138750](https://stackoverflow.com/questions/36592226/bashrc-not-sourced-on-intellij-ideas-terminal/59138750#59138750)

注意两点：

1. shell 命令带上 -i
2. 根据 shell 的版本，使用 .bashrc 或 .zshrc
## 添加外部jar作为依赖
如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1669256297330-7985774e-3d1b-4d8b-af90-5b179b1fc825.png)
打开相应文件夹，选中jar即可。
## 文件找不到——依赖冲突
相关报错：`nested exception is java.io.FileNotFoundException`
这一般是 jar 包冲突。

首先确保 pom.xml 的修改已生效，再利用 Maven Helper 插件，寻找冲突的依赖，根据报错信息，把不想的包 exclude 掉，重新加载 pom.xml。

如果报错的包根本不在冲突列表里，也有可能是以下情况：

- 版本不对， 则 google 一下相关报错，设置成正确的版本
- 引入了多余的包，执行了不想要的逻辑

exclue掉：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1666767522281-08333ca8-f4fa-4965-8e61-65b4da2f3524.png)

重新加载：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1666767567101-8308c02c-a792-4fbd-9198-6edf2a514e8c.png)
## 自动import
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1659925756116-626b591f-2be4-4bb5-90c8-91f65989fc2b.png)
## 文件乱码
如图所示，根据情况修改即可：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1641976626307-9d57d76f-eb57-4f57-8660-c77813485d5a.png)

## autowired 提示变量未赋值
这是[因为我使用的是社区版](https://stackoverflow.com/a/44670144/6759562)，需要[手动设置下](https://stackoverflow.com/a/62437991/6759562)：
![](https://i.stack.imgur.com/3bSYa.png#from=url&id=Wxizo&originHeight=368&originWidth=1858&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
该方法可以放心使用。
虽然说的是 suppress unsed warning，其实是 suppress never assigned warning， unsed warning 还是会生效的。

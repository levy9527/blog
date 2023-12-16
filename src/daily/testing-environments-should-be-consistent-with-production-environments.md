---
date: 2023-11-12
tag:
- Daily
---

# 生产教训：测试环境要与生产环境一致
## 事件还原
业务流程：

1. app-a 上传文件
2. app-b 下载文件后使用文件

其他信息：

1. 开发、测试环境使用 MinIO
2. 生产环境使用 Amazon S3

问题：

1. app-a 上传文件成功
2. app-b 使用文件报错

逐步分析定位问题：

1. app-a 与 app-b　配置是否一致？——确认都是使用 S3
2. S3 是否正确配置？有没权限问题？——确认配置正确，没有权限问题
3. app-a 是否真的上传成功？——确认文件已在 S3
4. app-b 是否下载成功？——根据日志，判断下载失败，得到的信息是：文件不存在。

所以问题就在于，为什么 app-b 的代码会判断文件不存在？

- 是传过去的路径参数不对？
- 还是 app-b　的逻辑有问题？

经过确认，传参是正确的，那么只有一个推论： app-b 判断文件是否存在的逻辑有问题。

具体是哪里有问题呢？

原来文件下载前，有一个判断目录是否存在的逻辑，其实现是判断 S3 的对象是否存在，示例代码如下：
```java
return s3Client.doesObjectExist("/path/dir")
```
则该代码永远为 false。

如何修复呢？改为调用 `listObjects`就可以了。如下图所示（左边是修改前，右边是修改后）：
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1699790489630-9003e1b5-8388-48b4-ab78-a89685efa382.png)
## 分析
很难想像，为什么在涉及对象存储的代码中，会有判断目录是否存在的逻辑。

好在我是个善于为别人找理由的人。我观察了下代码库，发现接口与类结构如下：
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/60dd2cb12a7fcb019482c4fc140f6347.svg#lake_card_v2=eyJ0eXBlIjoibWVybWFpZCIsImNvZGUiOiJjbGFzc0RpYWdyYW1cblx0ICBJU3RvcmFnZSA8fC4uIEhERlNTdG9yYWdlXG4gICAgSVN0b3JhZ2UgPHwuLiBNaW5JT1N0b3JhZ2Vcblx0XHRJU3RvcmFnZSA8fC4uIFMzU3RvcmFnZVxuXHRcdFxuICAgIGNsYXNzIElTdG9yYWdlIHtcblx0XHQgIDw8aW50ZXJmYWNlPj5cblx0XHR9XG5cdFx0XG4gICAgY2xhc3MgTWluSU9TdG9yYWdlIHtcbiAgICB9XG5cdFx0XG5cdFx0Y2xhc3MgUzNTdG9yYWdlIHsgIFxuXHRcdH1cblxuXHRcdGNsYXNzIEhERlNTdG9yYWdlIHsgIFxuXHRcdH1cblx0XHQiLCJ1cmwiOiJodHRwczovL2Nkbi5ubGFyay5jb20veXVxdWUvX19tZXJtYWlkX3YzLzYwZGQyY2IxMmE3ZmNiMDE5NDgyYzRmYzE0MGY2MzQ3LnN2ZyIsImlkIjoiZWY3N3IiLCJtYXJnaW4iOnsidG9wIjp0cnVlLCJib3R0b20iOnRydWV9LCJjYXJkIjoiZGlhZ3JhbSJ9)

如果定义 IStorage 与实现 S3Storage 的代码的人并不相同（我相信很可能是这样），那么我更倾向于认为责任在定义 IStorage 的人身上，因为TA并没有合理地设计接口，导致后来者被迫实现没有意义的接口，从而出错。
## 结论
为什么开发、测试环境没问题？或者说，为什么 MinIO　没这个问题？那是因为实现 MinIOStorage 的人，没有踩这个坑。

所以，本此事件给我来的经验教训是什么呢？既不是 S3 如何判断目录是否存在，也不是接口定义的重要性。而是：要让测试环境与生产环境尽可能保持一致，提前暴露问题。而不是测试环境是这样的配置，生产环境又是那样的配置——这就会加大生产环境出问题的可能性！

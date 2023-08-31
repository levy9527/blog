---
date: 2021-01-27 
tag: Frontend
---
# 前端项目性能优化实战

本文将分享常用的 Web 页面性能分析工具，以及一个前端项目性能优化的实战经验。

<!-- more -->

## 检测
使用两个工具分析项目首页性能情况：

1. [https://developers.google.com/speed/pagespeed/insights/](https://developers.google.com/speed/pagespeed/insights/)
2. [https://tools.pingdom.com/](https://tools.pingdom.com/)

得到结果如下：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1611714344531-6501362c-526d-40e5-b1a4-a3399a544ea1.png)
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607738629800-10ff9829-ea0c-402b-b826-1d05903ee302.png)
可以看到，首页超过50%的请求都与图片有空，优化空间比较大，因此第一步应该是优化图片加载。

## 图片优化

关于图片，PageSpeed 的优化建议如下：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607739432571-c4ebd1bb-bf91-4ced-afca-ad70b84c4de6.png)
根据文章《[把图片优化指南做成一个组件：v-img](https://zhuanlan.zhihu.com/p/99769484)》，找到首页的图片相关的代码：

1. 把 `<img>`  元素修改成 `<v-img/>` ，注意设置 width 或 height
2. 把 `<div ``style="background-image: url(img-url)"``></div>` 修改成 `<div v-img="{src: img-url}"></div>`

注意：img-url 应该是 oss 的链接，并且是 https 协议。
如果是 http 协议，或不指定协议 //img-url，则很可能会出现下图的情况：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1611714403654-591acc14-7c8e-4882-a781-a5271bb0b428.png)

如果图片是放在项目中，且项目并没有部署到 oss，则无法享受自动加载 webp 格式图片的福利。

则在此环节，一次性做到了上图中的三个优化点。

## 提高TTFB时间

来看下一条优化建议：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607914614811-2ea4a4f6-0f0c-4222-bc6f-112f3512bfbb.png)
因为项目是服务端渲染的，有些请求是在服务端做了。找到相关代码：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607914815788-19181de1-6526-46f1-8ed2-e4c3bd130e7a.png)
经过分析，上述代码存在两个问题：

1. 可在客户端执行却放在了服务端
2. 可并行执行却写成了串行

修改如下：

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607914801350-ca4cadfe-9750-47be-98f4-fd5a305bb408.png)

---

通过分析请求日志发现，有一个请求应该是在客户端发送，代码本意也是在客户端执行，却在服务端也执行了。
找到发送请求的代码：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607929114683-23cb4794-bc67-4bed-8e95-0a8f493cb1e6.png)
原来是代码写在了 created 里，这是个经典的案例：为了让请求更早一点发送，不写在 mounted 钩子，而写在 created 里，导致请求分别在 server-side 与 client-side 都执行了。具体说明请看 [vue ssr 官方文档](https://ssr.vuejs.org/guide/universal.html#component-lifecycle-hooks)。

修改如下：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607929358177-06449ad6-8251-444d-9ae3-1e2ae93b8fef.png)

## 移除未使用的 Javascript

来看下一条优化建议：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607931113342-9fbf0d58-58dd-4d77-9628-cb2a1182d957.png)
因为经过多次迭代，有可能某些功能曾经上线过，后来被下线，但当时代码没删干净，所以留下一些现在没用的第三方库。根据建议，找到这些引入的 js，确保不影响正常功能后，删除即可。

此时注意用到以下基本操作：

1. google/github 查询库的用途
2. git history/annotate 查看是何人何时引入、并在何处使用的，如何代码不能表明意图，则最好找到相关人员询问是有何意图。

## 延迟静态资源的加载
来看另一个相关的建议：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607932915571-42f62757-85e0-4893-8a1f-5b3d103da94c.png)
如果有些第三方 js 确实有用到，但却不是关键资源，则可以延迟其加载或解析时机，缩短阻塞时间。

以一些第三方代码为例，它们并不是关键资源，可以在 window.onload 事件触发后，再加载

```javascript
const srcs = [
  // 百度统计
  {
    src: 'https://hm.baidu.com/hm.js',
    id: 'baidu-analysis',
  },
  // 腾讯企点客服 
  {
    src: 'https://wp.qiye.qq.com/qidian',
    id: 'tencent-qidian',
    charset: 'utf-8',
    'data-n-head': 'data-vue-enterprise'
  }
]

window.addEventListener('load', _ => {
  srcs.forEach(item => {
    const script = document.createElement('script')
    script.async = true

    Object.keys(item).forEach(k => {
      script.setAttribute([k], item[k])
    })

    document.body.appendChild(script)
  })
})
```

## 启用文本压缩
首先是启用文本压缩，采用 gzip 是最简单的方式。对应的请求头是：**Content-Encoding**
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1612505764342-9505cfe1-9025-49b0-b1fc-3e49e6d9f2c5.png)

因为静态资源是放到对象储存服务上的，故应该修改相关的配置。

- 如果是阿里云OSS，[点击查看参考文档](https://help.aliyun.com/document_detail/31913.html?spm=5176.11065259.1996646101.searchclickresult.76556e6eoNS81O)
- 如果是华为云OBS，[点击查看参考文档](https://support.huaweicloud.com/usermanual-cdn/cdn_01_0119.html)

这里要注意的是，对于静态资源的访问，最好使用自定义域名，而不是存储桶的域名，方便CDN做加速优化。

## 优化缓存策略
下一条相关的优化建议是缓存策略，对应的请求头是：**Cache-Control**
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1612506152108-a13a4684-6b3c-46d2-8fa3-0b20fda0d4ec.png)
简单来说，就是在静态资源（html 除外）的 HTTP 响应头中设置如下字段：

```http
Cache-Control: max-age=31536000
```


以阿里云 oss 为例进行说明，其他静态资源存储如 obs、S3 都是同理。

对于少量的资源，可以进行手工操作。打开 [oss-browser](https://github.com/aliyun/oss-browser)，找到相应资源：

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1574909023658-459fff93-ad99-43ad-92c1-bf94d5cff9c6.png)

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1574909060558-751aeab8-c08c-4a84-95f4-f3fbe5e13e24.png)

本中使用的 oss-browser 版本，一次只能对一个资源进行 HTTP 头的设置，操作十分不便，可以[登录阿里云控制台进行批量操作](https://help.aliyun.com/document_detail/31913.html?spm=a2c4g.11186623.4.1.7e863bdb6IwtQq)。

当然，最根本的解决办法，是使用 [阿里云oss命令行工具](https://help.aliyun.com/document_detail/120057.html?spm=a2c4g.11186623.6.711.c31a2d24TVqy6d) 上传的时候就进行设置。

```bash
/user/ossutil64 cp -r -f -u ./dist oss://$bucket/$file_path/ --meta=Cache-Control:max-age=31536000
/user/ossutil64 set-meta oss://$bucket/$file_path/index.html Cache-Control:no-cache --update
```

注意，在命令行里别乱设置 Content-Encoding:gzip，否则会出现下面的情况，页面都打不开，具体说明[查看详情](https://appuals.com/how-to-fix-err_content_decoding_failed-error/)
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1574914337532-52c323e6-b22c-45a4-b514-c2614762909a.png)

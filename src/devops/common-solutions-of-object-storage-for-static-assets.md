---
date: 2019-04-05
tag:
- Frontend
- DevOps
- S3
- OBS
- OSS
---

# 对象存储静态资源常见操作
## 前言
把静态资源放到云厂商的对象存储服务中托管是很常见的实践，但由于涉及的事项较多，故记录下来，方便查阅。

本文主要以阿里云OSS的控制台界面作为操作示例，其逻辑同样适用于华为云OBS、Amazon S3，只是可能界面上有差异，具体需要看相关的官方文档。

<!-- more -->

## 阿里云OSS
对于新建的bucket，需要做一些设置，才能正常使用静态资源。
### 绑定域名
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702347742834-834879a6-3610-4b57-b0d3-73c7bcdead4e.png#averageHue=%23eaeae6&clientId=u60f42bc1-4481-4&from=paste&height=342&id=u96fb23ed&originHeight=342&originWidth=1808&originalType=binary&ratio=1&rotation=0&showTitle=false&size=302360&status=done&style=none&taskId=u8ae79e13-fed5-4ff3-9214-5f220758b8e&title=&width=1808)

![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702348155056-40bd48ea-53f8-48c1-88f4-82cc11460d80.png#averageHue=%23fdfdfd&clientId=u60f42bc1-4481-4&from=paste&height=421&id=ubf7c51d8&originHeight=421&originWidth=1480&originalType=binary&ratio=1&rotation=0&showTitle=false&size=204064&status=done&style=none&taskId=ua9e752a5-6884-4531-8e86-ab7cad1773f&title=&width=1480)

则使用自定义域名访问，可以解决访问 html 变成下载的问题。
### CNAME设置
如果绑定的是同一个阿里云账号下的域名，则可以自动添加 CNAME 记录。否则需要手动添加。

查看 bucket 外网地址：my-bucket.oss-cn-shenzhen.aliyuncs.com
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702348349732-a5a3015a-262a-4b32-b89d-593c32e56cfc.png#averageHue=%23faf9f9&clientId=u60f42bc1-4481-4&from=paste&height=662&id=u278acbcc&originHeight=662&originWidth=1590&originalType=binary&ratio=1&rotation=0&showTitle=false&size=226370&status=done&style=none&taskId=u455741d8-010a-4202-9b96-170a9d9ffb7&title=&width=1590)

则去域名解析供应商设置：
static.domain.com(自定义域名） -> CNAME -> my-bucket.oss-cn-shenzhen.aliyuncs.com
### HTTPS证书托管
上传证书，开启 HTTPS
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702348442889-df82e3da-e07d-451e-af99-45f40f7e789a.png#averageHue=%23e6e4e0&clientId=u60f42bc1-4481-4&from=paste&height=340&id=u94fa9d74&originHeight=340&originWidth=1586&originalType=binary&ratio=1&rotation=0&showTitle=false&size=228171&status=done&style=none&taskId=u51004980-ecd6-4be3-914a-75f0b84cec0&title=&width=1586)
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702348569375-f32bac2c-25ae-4b38-a2e8-3d3d5a42164c.png#averageHue=%23f4f3f3&clientId=u60f42bc1-4481-4&from=paste&height=904&id=u6ae4a65b&originHeight=904&originWidth=1607&originalType=binary&ratio=1&rotation=0&showTitle=false&size=308821&status=done&style=none&taskId=uaa66eaf6-767e-47db-92fa-fdeaeb76403&title=&width=1607)

如果没有证书，查看教程获取：[🔒免费开启HTTPS](https://github.com/levy9527/blog/issues/5)
### 公共读
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702348615962-e6695e07-9c22-4095-876a-9ea0cd412d0d.png#averageHue=%23fcfaf9&clientId=u60f42bc1-4481-4&from=paste&height=409&id=uc420f547&originHeight=409&originWidth=1748&originalType=binary&ratio=1&rotation=0&showTitle=false&size=192573&status=done&style=none&taskId=u78cd38c9-f1b7-4132-afc0-3bbf461b01d&title=&width=1748)

这样可以解决访问链接超时的问题。

### CORS跨域设置
在基础设置下，找到跨域设置
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1547111265557-dd3885fc-1007-4dfe-bef9-1e70a3578f0f.png#averageHue=%23fefdfd&height=116&id=hyGnS&originHeight=314&originWidth=2022&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=747)
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1547111287199-072507c0-02d4-4cdb-8be7-0bccc13c096c.png#averageHue=%239fa69d&height=159&id=JDTLh&originHeight=438&originWidth=2058&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=747)

在来源中设置域名，或ip地址。下面给出最简单的示例为 *，实际可以根据需要填写允许的域名，一行一个。

- 将allowed origins设置成 `*`
- 将allowed methods设置成`GET, POST, PUT, DELETE, HEAD`
- 将allowed headers设置成 `*`
- 将expose headers设置成 
   - `etag`
   - `x-oss-request-id`

这样可以解决字体无法显示、JavaScript跨域的问题。
## 华为云OBS
### 跨域设置
华为云的入口如下：
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702347220980-e3545244-04d2-4435-bc87-f277a6ddbf91.png#averageHue=%23fefdfc&clientId=u1ece0f42-2e8c-4&from=paste&height=570&id=ub4d8b2f8&originHeight=570&originWidth=1099&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47529&status=done&style=none&taskId=uba2e51ff-d581-4e8c-8dcc-95be2bca9cf&title=&width=1099)
具体规则的填写是类似阿里云OSS的。
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702348727824-91972218-3050-4346-838e-f33b317dba14.png#averageHue=%23e7e7e7&clientId=u60f42bc1-4481-4&from=paste&height=710&id=u532a6905&originHeight=710&originWidth=1221&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43351&status=done&style=none&taskId=u606e3ead-a17a-41ce-bd9c-801c4ea1259&title=&width=1221)

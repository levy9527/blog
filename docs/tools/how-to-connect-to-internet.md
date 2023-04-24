# 科学上网
## 产品优势
安全稳定（全年可用），可支付宝支付，最重要的是：可以使用 chatGPT 及 New Bing！
## 购买指南
[点击进入服务页面](https://cp.cloudnx.cc/aff.php?aff=22930)
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172119852.png)
先点击注册账户
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172124456.png)
再点击购买产品，查看产品列表（为什么要这么绕，因为这是保护措施，避免产品主页被黑）。

可以先订阅一个月，支持支付宝，觉得不错后，再来个包年，更划算。

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172127595.png)
如果只是上网搜索、学习，一般而言 Mini 套餐就够用了，每月 10GB，也可以与朋友、同事共用，反正不限制同时在线，随便玩！算下来，一天不到0.5元，很划算了。

如果是要看电影的话，可能要选择其他套餐。
## 客户端
支持全平台客户端：

- Mac 推荐 [ClashX](https://github.com/yichengchen/clashX/releases)
- Windows 推荐 [Shadowsocks](https://github.com/shadowsocks/shadowsocks-windows/releases)
- Android 推荐 V2ray
- iOS 推荐 Shadowrocket（花点小钱，使用美区 apple id——文末有分享如何申请）
## 导入配置
以 Shadowsocks 为例：
#### 根据客户端复制相应的订阅地址
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172131049.png)

#### 先禁用系统代理
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172136278.png)

#### 点击在线配置
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172141931.png)

#### 输入URL，点击更新
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172145950.png)

#### 选择一个服务器
#### ![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172149930.png)
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172155098.png)

#### 再恢复系统代理，选择PAC模式
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172160264.png)

就可以愉快地上网啦！
## 其他
### 500 内部代理错误 
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172164184.png)
出现此问题时，一般是内网自定义域名不允许走代理，需要禁用掉系统代理
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172170331.png)

### 修改PAC文件
PAC模式是指：根据规则识别某网站是否需要使用代理访问。

什么时候需要修改PAC文件呢？

- 当某个网站不想走代理
- 设置某网站一定走代理

操作如下（以Shadowsocks为例）：
![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172175096.png)

按下图所示，模仿添加，即可实现遇到下列网站时选择直连。。

![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172179825.png)

示例修改：
```shell
 "@@||company.yuque.com",
```

```java
"*.openai.com",
"*.bing.com",
```

保存后记得重启软件。

---

### 使用 New Bing
再给一个配置 Clash 使用 New Bing 的示例：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172184433.png)
编辑文件：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172189506.png)
添加如下设置：
```yaml
 - DOMAIN-KEYWORD,bing,🚀 节点选择
```
效果如下图：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172193803.png)
之后再重新加载配置，即可打开 New Bing 页面。

但要让 New Bing 回答问题，还要设置全局模式，并选择正确的节点，如图所示。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172198850.png)
### 申请美区apple id
在官网创建申请: [https://appleid.apple.com/account](https://appleid.apple.com/account)

不要用 qq邮箱, 注册不会的成功的。

需要注意的是，地区请选择：Alaska，否则后续充值的话要交税😅

相关的地址信息，可以使用[美国地址生成器](https://www.prepostseo.com/tool/fake-address-generator)，按如图所示选择，再点击生成即可获得注册时的必要信息。这样就不需要输入信用卡信息。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1682172198851.png)
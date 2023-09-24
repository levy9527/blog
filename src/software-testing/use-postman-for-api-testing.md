---
date: 2023-09-13
tag:
- Node.js
- Daily
---

# 使用 Postman 进行接口测试
## 前言

虽然之前分享过 RestAssured 进行接口测试的教程，但实践起来，会有阻碍：研发同学还是对 Postman 更熟悉，更倾向于使用 Postman 调试接口，而不是写 Java 代码对 Controller 层进行测试。

而笔者在针对旧的 Java 项目添加接口测试时，又遇到了另一个问题：那就是由于模块依赖，进行接口测试时，还在把旧的测试代码一并带上。虽然说有办法解决，但究竟是麻烦不断。

还有就是，Java 的类型检查，在写接口测试时十分束缚手脚。如下述代码：

<!-- more -->

```javascript
// 为什么不设置 Map<String, String> ? 
// 因为 menu 有个字段的类型是 Integer，使用 String 接收运行时会报错。
Optional<Map<String, Object>> foundMenu = menuList.stream().filter(v -> {
  String code = (String) v.get("name"); // 这种类型转换代码实在多余！
  return code.contains("管理员");
}).findFirst();
```

笔者实在忍不住吐槽了一番：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694596433278-eb3e5566-0126-4e93-9dfe-a9c4d8edae51.png)

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694596460562-b472ca9d-8b73-4e1f-b5a5-7c9c1fb8253a.png)

笔者思前想后，最终还是放弃测试代码要与源码使用统一技术栈的构想，再次搬出 Postman 作为接口自动化测试的工具。
## 本地调试

### 接口集合

新建一个 collection，然后再在里面新建接口。

新建方法多种多样，可以手工新建，也可以 curl 导入，也可以从 swagger 导入。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694595120400-0e37bf26-405b-412c-b54f-7057cf49ab20.png)

### 从 cURL 导入
对于已经上线的接口，使用 cURL 导入非常方便，省去了拼接参数的过程。

下面以获取 token 接口为例进行说明。

打开登录页面，打开浏览器控制台（按 F12），点击登录按钮，找到获取 token 的接口，然后右键 -> Copy -> Copy as cURL（bash）。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694737892655-0ebc74d0-17de-4972-9411-e36697fd5637.png)
再打开 Postman，点击 Import -> Raw text -> 粘贴，即可导入接口。

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694738073586-9de6f40e-6ddd-4b0a-b330-b807f9cb851b.png)

### 环境变量

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602746875957-dc9090e7-900e-4352-91f7-039792e2a9e0.png)
点击右上角红框处，即可设置变量，需要先设置环境名。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602747172023-7b96aa77-39bc-4881-b1e9-36d5535c92f1.png)
值得注意的是：

1. 一般设置 initial value 即可
2. 如果设置了 current value，则运行 postman 时使用的是 current value

如果有多套环境，就点击复制，再修改环境名及包含变量的 initial value 即可。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602747475793-1f85e976-8189-44b7-9667-f1a195ff8c35.png)

使用 {{var}} 的形式引用变量，可在 url 及 body 处引用。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602746808280-6743bf6c-34b5-402a-abe6-397eb76c5380.png)

环境变量还可以在测试用例里去修改值：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694424229773-4c83c6cf-0640-4c8a-aa33-38097d84f0cd.png)

### 请求设置

对于请求体的发送，一般进行如下设置
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602747761421-f2c415ec-1b1c-48f6-976d-fbc958fdcbf3.png)
如果要上传文件，则一般进行如下设置
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602747847485-5d86f2f6-18cc-4262-b5fd-69349feb4bbe.png)

## 接口测试

### 编写用例

在 Tests 标签页里，即可编写测试，在 SNIPPETS 里会有相应的示例。

示例接口的测试用例分别如下：

- 这是最简单的测试用例，判断接口响应码 200

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602748404916-daf8d633-1a35-48f8-a652-cc13c16244b5.png)

- 请求成功后，取数组的第一个元素，并把其 id 设置到环境变量中
```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
  let resp = let payload = pm.response.json();
  pm.environment.set('feedback_id', resp.payload[0].id)
});
```

- 从环境变量中取值, 作为请求参数
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602752518841-f3717ddd-fbee-428f-a34f-794a8ab1ac0e.png)


- 再复杂一点的示例：确保返回的数据里没有特定的数据
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
    let payload = pm.response.json().payload;
    // 在这里写 node.js 代码
    let found = payload.content.some(v => v.username.includes('unwanted'))
    pm.expect(found).to.be.false;
});
```

### 运行集合

本地调试好了，把代码部署到线上环境后，就可以使用 postman 对线上的接口进行测试了

记得先重置变量当前值
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1603339930271-36e9f9e5-8013-40fa-9fac-e7cb642ba451.png)

再选择集合，点击运行
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602747943902-be50a347-cf3d-417c-9bed-e8d8abbb520d.png)

点击如图所示内容：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602748072901-4d49553d-bf78-4276-baee-6b8e84c83951.png)
在弹出的窗口中，选择环境，再把下面的四个 checkbox 取消勾选。一般而言，这样不会容易出错。

点击执行，可以看到集合内所有接口的执行结果：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1602748206140-245e5362-ffe3-4d2f-b3a3-61f781730e86.png)

## 持续集成
### 导出数据
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694594443532-5ca5008a-4e57-4eb1-909d-2b40ff4241ff.png)

使用推荐的格式，导出一个 json 文件。

### 提交到Git
把 json 文件放到项目中，并提交到 Git
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694594578211-b381d377-f6a5-4dd2-be82-0c9295f10fc6.png)

### 建立CI任务
以 Gitlab 为例，修改 .gitlab-ci.yml，增加以下内容：
```java
newman:
  stage: test
  image: node:lts
  script:
    - node -v
    - npm -v
    - npm install -g newman
    - newman run export.postman_collection.json --reporter-cli-exit-code
  tags:
    - gitlab-runner
  only:
    - /dev|test|uat/
```

推送代码，即可看到流水线
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694594759551-cb5a8564-cf20-4491-9378-3b6408e2c9fc.png)

结果如下：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694594789278-08b7d7e5-397b-47a9-9cbe-2f989a357ae1.png)

---
date: 2023-09-12
tag:
- Node.js
- Daily
---

# 使用postman进行接口测试
## 前言

虽然之前分享过 RestAssured 进行接口测试的教程，但实践起来，会有阻碍：研发同学还是对 Postman 更熟悉，更倾向于使用 Postman 调试接口，而不是写 Java 代码对 Controller 层进行测试。

而笔者在针对旧的 Java 项目添加接口测试时，又遇到了另一个问题：那就是由于模块依赖，进行接口测试时，还在把旧的测试代码一并带上。虽然说有办法解决，但究竟是麻烦不断。

还有就是，Java 的类型检查，在写接口测试时十分束缚手脚。如下述代码：

<!-- more -->

```javascript
// 为什么不设置 Map<String, String> ? 
// 因为 menu 有个字段的值是数字，使用 String 接收运行时会报错！
Optional<Map<String, Object>> foundMenu = menuList.stream().filter(v -> {
  String code = (String) v.get("name");
  return code.contains("管理员");
}).findFirst();
```

笔者实在忍不住吐槽了一番：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694596433278-eb3e5566-0126-4e93-9dfe-a9c4d8edae51.png#clientId=u840bb390-3dd6-4&from=paste&height=337&id=u8353972f&originHeight=506&originWidth=490&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=162686&status=done&style=none&taskId=u2bd878c8-bf67-4898-bc86-cdc64384d44&title=&width=326.6666666666667)![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694596460562-b472ca9d-8b73-4e1f-b5a5-7c9c1fb8253a.png#averageHue=%23ede2e0&clientId=u840bb390-3dd6-4&from=paste&height=156&id=ucaf12f74&originHeight=234&originWidth=489&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21212&status=done&style=none&taskId=uc97f45e9-a92b-4d35-ae34-bf2855f8b56&title=&width=326)

笔者思前想后，最终还是放弃测试代码要与源码使用统一技术栈的构想，再次搬出 Postman 作为接口自动化测试的工具。
## 本地调试

### 接口集合

新建一个 collection，然后再在里面新建接口。

新建方法多种多样，可以手工新建，也可以 curl 导入，也可以从 swagger 导入。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694595120400-0e37bf26-405b-412c-b54f-7057cf49ab20.png#averageHue=%23fcfafa&clientId=u49f46c82-3f02-4&from=paste&height=251&id=u6bfbe493&originHeight=377&originWidth=1249&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23706&status=done&style=none&taskId=ub80d0899-20bc-4c9e-b9c3-0462eb82e3a&title=&width=832.6666666666666)
### 环境变量

![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602746875957-dc9090e7-900e-4352-91f7-039792e2a9e0.png#align=left&display=inline&height=119&margin=%5Bobject%20Object%5D&name=image.png&originHeight=346&originWidth=1744&size=178268&status=done&style=none&width=600#averageHue=%23b9b7b6&id=adhT3&originHeight=346&originWidth=1744&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
点击右上角红框处，即可设置变量，需要先设置环境名。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602747172023-7b96aa77-39bc-4881-b1e9-36d5535c92f1.png#align=left&display=inline&height=256&margin=%5Bobject%20Object%5D&name=image.png&originHeight=584&originWidth=1368&size=118188&status=done&style=none&width=600#averageHue=%23f9f9f9&id=Ybwlr&originHeight=584&originWidth=1368&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
值得注意的是：

1. 一般设置 initial value 即可
2. 如果设置了 current value，则运行 postman 时使用的是 current value
3. 建议只针对线上环境做相应的 environment 管理，本地开发环境通过 current value 设置即可

如果有多套环境，就点击复制，再修改环境名及包含变量的 initial value 即可。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602747475793-1f85e976-8189-44b7-9667-f1a195ff8c35.png#align=left&display=inline&height=93&margin=%5Bobject%20Object%5D&name=image.png&originHeight=230&originWidth=1482&size=56407&status=done&style=none&width=600#averageHue=%23f6f4f4&id=ouZSe&originHeight=230&originWidth=1482&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

使用 {{var}} 的形式引用变量，可在 url 及 body 处引用。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602746808280-6743bf6c-34b5-402a-abe6-397eb76c5380.png#align=left&display=inline&height=322&margin=%5Bobject%20Object%5D&name=image.png&originHeight=700&originWidth=1306&size=279151&status=done&style=none&width=600#averageHue=%23f9f8f7&id=xvnep&originHeight=700&originWidth=1306&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

环境变量还可以在测试用例里去修改值：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694424229773-4c83c6cf-0640-4c8a-aa33-38097d84f0cd.png#averageHue=%23fafaf9&clientId=ud0af0b54-f452-4&from=paste&height=455&id=uf2c9b6a5&originHeight=455&originWidth=1249&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78599&status=done&style=none&taskId=u141727ea-9797-4227-8021-b7f6d069eb7&title=&width=1249)

### 请求设置

对于请求体的发送，一般进行如下设置
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602747761421-f2c415ec-1b1c-48f6-976d-fbc958fdcbf3.png#align=left&display=inline&height=278&margin=%5Bobject%20Object%5D&name=image.png&originHeight=610&originWidth=1318&size=285542&status=done&style=none&width=600#averageHue=%23f8f6f6&id=xR281&originHeight=610&originWidth=1318&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
如果要上传文件，则一般进行如下设置
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602747847485-5d86f2f6-18cc-4262-b5fd-69349feb4bbe.png#align=left&display=inline&height=281&margin=%5Bobject%20Object%5D&name=image.png&originHeight=590&originWidth=1258&size=146125&status=done&style=none&width=600#averageHue=%23f7f5f5&id=mfgAx&originHeight=590&originWidth=1258&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 接口测试

### 编写用例

在 Tests 标签页里，即可编写测试，在 SNIPPETS 里会有相应的示例。

示例接口的测试用例分别如下：

- POST请求

![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602748404916-daf8d633-1a35-48f8-a652-cc13c16244b5.png#align=left&display=inline&height=299&margin=%5Bobject%20Object%5D&name=image.png&originHeight=648&originWidth=1732&size=362328&status=done&style=none&width=800#averageHue=%23faf7f6&id=JFy97&originHeight=648&originWidth=1732&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

- GET请求：请求成功后，取第一个数组，并把其 id 设置到环境变量中
```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
  let resp = let payload = pm.response.json();
  pm.environment.set('feedback_id', resp.payload[0].id)
});
```

或者确保返回的数据里没有特定的数据：
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
    let payload = pm.response.json().payload;
    // 在这里写 node.js 代码
    let found = payload.content.some(v => v.username.includes('unwanted'))
    pm.expect(found).to.be.false;
});
```

- DELETE请求：从环境变量中取值，判断接口响应码是否 200 即可

![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602752518841-f3717ddd-fbee-428f-a34f-794a8ab1ac0e.png#align=left&display=inline&height=265&margin=%5Bobject%20Object%5D&name=image.png&originHeight=530&originWidth=1316&size=136137&status=done&style=none&width=658#averageHue=%23f8f8f8&id=NBiKR&originHeight=530&originWidth=1316&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 运行集合

本地调试好了，上线开发环境后，可以使用 postman 对线上接口进行测试

记得先恢复变量当前值
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1603339930271-36e9f9e5-8013-40fa-9fac-e7cb642ba451.png#align=left&display=inline&height=174&margin=%5Bobject%20Object%5D&name=image.png&originHeight=412&originWidth=1418&size=102880&status=done&style=none&width=600#averageHue=%23d9d8d8&id=ewGCQ&originHeight=412&originWidth=1418&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

再选择集合，点击运行
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602747943902-be50a347-cf3d-417c-9bed-e8d8abbb520d.png#align=left&display=inline&height=259&margin=%5Bobject%20Object%5D&name=image.png&originHeight=716&originWidth=1660&size=299452&status=done&style=none&width=600#averageHue=%23dcd9d8&id=ptduQ&originHeight=716&originWidth=1660&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
点击如图所示内容。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602748072901-4d49553d-bf78-4276-baee-6b8e84c83951.png#align=left&display=inline&height=376&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1328&originWidth=2474&size=365551&status=done&style=none&width=700#averageHue=%23edecec&id=vF3AK&originHeight=1328&originWidth=2474&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
在弹出的窗口中，选择环境，再把下面的四个 checkbox 取消勾选，一般而言，这样不会错。

点击执行，可以看到集合内所有接口的执行结果。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/160590/1602748206140-245e5362-ffe3-4d2f-b3a3-61f781730e86.png#align=left&display=inline&height=391&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1010&originWidth=2068&size=371291&status=done&style=none&width=800#averageHue=%23e8e7e6&id=L5fDL&originHeight=1010&originWidth=2068&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 持续集成
### 导出数据
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694594443532-5ca5008a-4e57-4eb1-909d-2b40ff4241ff.png#averageHue=%23f6f1f0&clientId=ud8b830b6-ab27-4&from=paste&height=325&id=uc26f5863&originHeight=487&originWidth=470&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=35579&status=done&style=none&taskId=u2285a1c9-7f72-45c8-9164-9308e224033&title=&width=313.3333333333333)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694594460053-8cf994d3-a2fa-4dbc-a6da-911ae41a8e35.png#averageHue=%23faf5f4&clientId=ud8b830b6-ab27-4&from=paste&height=269&id=ufbde5341&originHeight=403&originWidth=692&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=27733&status=done&style=none&taskId=u85993242-c6e3-438c-80f7-d0eca50b862&title=&width=461.3333333333333)
这会导出一个 json 文件。
### 提交到Git
把 json 文件放到项目中，并提交到 Git
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694594578211-b381d377-f6a5-4dd2-be82-0c9295f10fc6.png#averageHue=%233e454d&clientId=ud8b830b6-ab27-4&from=paste&height=209&id=u5d8c3186&originHeight=314&originWidth=622&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=22859&status=done&style=none&taskId=u11d239a3-5b99-4879-af2f-909c6d25521&title=&width=414.6666666666667)
### 建立CI任务
以 Gitlab 为例，修改 .gitlab-ci.yml，增加以下内容：
```java
newman:
  stage: test
  image: node:lts
  script:
    - node --version
    - npm --version
    - npm install -g newman
    - newman run export.postman_collection.json
  tags:
    - gitlab-runner
  only:
    - /develop|test|uat/

```
推送代码，即可看到流水线
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694594759551-cb5a8564-cf20-4491-9378-3b6408e2c9fc.png#averageHue=%23f5f5f5&clientId=ud8b830b6-ab27-4&from=paste&height=107&id=u5d039deb&originHeight=161&originWidth=297&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=6130&status=done&style=none&taskId=u9f90edf8-388c-4dbe-b9d5-098a89086ea&title=&width=198)

结果如下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1694594789278-08b7d7e5-397b-47a9-9cbe-2f989a357ae1.png#averageHue=%23171615&clientId=ud8b830b6-ab27-4&from=paste&height=387&id=uf06b5710&originHeight=580&originWidth=585&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=32328&status=done&style=none&taskId=u9783ae76-8888-4dc5-a259-482bc032938&title=&width=390)


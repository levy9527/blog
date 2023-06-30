# 使用 RestAssured 进行 API 测试

## 前言

本文将借助 RestAssured 工具，向大家介绍如何进行 API 测试，从而在团队中开启接口自动化之路。

本文的示例代码使用的是 Java 语言。尽管本文的首要读者是 Java 研发人员，但道理是相通的，其他语言的研发人员也能从中受益。

## What

什么是 API 测试？简单来说，可以认为是针对 Controller 层的测试，但不是 Mock，而是会真实地处理请求，与数据库或外部服务进行交互。

## Why

为什么要做 API 测试呢？

考虑有过这样的场景：

- 加一个新功能，自测没问题，结果被测试人员发现一个旧模块出了问题，感到措手不及
- 后端写好了接口，前端还没开发好界面，于是感觉不方便自测，因为没有界面，只好催前端快去做页面

API 测试就是来解决上述问题的。做 API 测试的原因有：

- 必要性：做回归测试，避免添加新功能时破坏旧功能。
- 便利性：方便本地调试，不用部署到线上，依赖界面去测试。
- 资产化：让测试用例变成资产，与团队共享。

当然，要做好 API 测试，还要接受这样的认知： 接口自动化测试并不仅仅是测试人员事情，研发人员也有责任把它做好。 否则，研发人员难免会觉得这不关我的事, 从而不愿意写这种代码。 建议研发人员从以下方便思考其好处，提升行动的积极性：

- 减少阻塞，接口自测不再依赖前端
- 提高效率，本地就能自测，不用把应用部署到线上环境
- 提高质量，减少部署到研发环境、前端一调用接口就 500 的情况

## 为什么不用Postman

Postman 确实是符合直觉的接口调试的第一选项。 但注意，调试不等于测试。

Postman 最大的问题在于，无法将测试用例有效地资产化:

- 你会在 Postman 里写断言吗？很少吧，你其实是在用肉眼去检查接口成功与否，这本质还是手工测试
- 你的 Postman 数据能与团队共享吗？不能吧，大多数人的 Postman 数据是在本地的，也不会去付费创建一个团队以共享数据
- 你的 Postman 数据在有版本管理吗？没有吧，大多数人的 Postman 数据是与源代码分离的，不利于维护与管理

另外，如果要与 CI 结合，Postman 的数据更适合使用 Node.js 的 [Newman](https://github.com/postmanlabs/newman)。

考虑源代码是 Java，使用 RestAssured，编写 API 测试代码用同一种语言，可以减少使用者的心智负担较轻；并且与源代码放在同一个 Git 仓库中，易于管理。

因此，Postman 我仍然会使用，但更多是应用在出现线上问题时，直接复制一个 cURL 用来复现、排查问题的情况。

## 安装

下面将介绍如何用 Maven 安装 RestAssured。

复制以下内容到 pom.xml 即可。

```xml
    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>rest-assured</artifactId>
        <version>5.3.0</version>
        <scope>test</scope>
        <exclusions>
            <exclusion>
                <artifactId>json-path</artifactId>
                <groupId>io.rest-assured</groupId>
            </exclusion>
        </exclusions>
    </dependency>

    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>json-path</artifactId>
        <version>5.3.0</version>
        <scope>test</scope>
    </dependency>

    <dependency>
        <groupId>io.rest-assured</groupId>
        <artifactId>xml-path</artifactId>
        <version>5.3.0</version>
        <scope>test</scope>
    </dependency>

```

安装完成后，重启 Spring 容器。

如果安装依赖不成功，可以进行以下检查：

- 显式指定：json-path 与 xml-path 的版本，并排除其他测试包(如 sping-boot-starter-test) 对 json-path 的依赖
- 声明放在 JUnit 前面

## 快速上手

语法结构为： given()、when()、then()

```xml
given()  // 设置请求信息
        .log().all() // 输出请求日志
        .when()
        .get() // 发送请求
        .then()
        .log().all() // 输出响应日志
        .statusCode(200) // 断言响应
        ;
```

## 通用设置

以下代码可直接复制到 Java 测试类中。

```java
private RequestSpecification requestSpec;

// @BeforeEach // JUnit5 
@Before // JUnit4
public void init(){
    // 如果是本地调试 domain 就是 localhost
    RestAssured.baseURI="http://your-domain.com:port/context-path";

    // 设置请求头
    RequestSpecBuilder builder=new RequestSpecBuilder();
    String token=System.getenv("TOKEN");
    builder.addHeader("Authorization",token); // jwt
    // 在 give().spec() 中使用即可
    requestSpec=builder.build();
    }

```

## 请求示例
下面是一个较完整的示例，包含了：

- 设置请求头
- 设置请求体
- 设置query
- 判断响应体的数据结构

```java
  @Test
public void test(){
    Workflow workflow=new Workflow();
    workflow.setWorkflowId(1643167159934930966L);
    workflow.setWorkflowName("flow");
    List<Workflow> body=new ArrayList<>();
    body.add(workflow);

    given()
    .spec(requestSpec)
    .queryParam("query","value")
    .body(JSON.toJSONString(body))
    .log().all()
    .when()
    .post("/api/v1/your-api?t=1")
    .then()
    .log().body()
    .statusCode(200)
    .assertThat().body("code",equalTo("0"))
    ;
    }
```

提醒，在运行测试代码前，需要做两件事：

- 一定保证 Web 服务已请求，因为这不是 Mock，而是会发送真实的请求。
- 正确配置了环境变量 TOKEN。如果使用 IDEA，可以编辑运行配置，在环境变量里注入类似代码：TOKEN=Bearer xxx

## 接口依赖

有时在请求接口 B 之前，需要请求接口 A，于是就产生了接口依赖：B 依赖了 A。

此时可以使用 extract() 及 path() 获取请求 A 返回的数据。

```java
  @Test
public void test(){
    // 发送第一个请求
    List<Map<String, String>>workflowList=getWorkflowList();
    if (workflowList.isEmpty()) {
      System.out.println("workflowList  empty, test not execute");
      return;
    }

    // 返回的数据结构是个 Map
    // 也可以是　Map<String, Object>，这取决于你实际的数据结构
    Map<String, String> target=workflowList.get(0);

    WorkflowRunVO workflow = new WorkflowRunVO();
    workflow.setWorkflowId(Long.valueOf(target.get("workflowId")));
    workflow.setWorkflowName(target.get("name"));
    List<WorkflowRunVO> body = new ArrayList<>();
    body.add(workflow);

    // 在第二个请求中断言
    given()
            .spec(requestSpec)
    .body(JSON.toJSONString(body))
    .log().body()
    .when()
    .post("/api/v1/workflows")
    .then()
    .statusCode(200)
    .assertThat().body("code",equalTo("0")) // org.hamcrest.Matchers.equalTo
    .log().body();
    }

private List<Map<String, String>>getWorkflowList(){
    return given()
    .spec(requestSpec)
    .when()
    .get("/api/v1/workflows")
    .then()
    .statusCode(200)
    .extract()
    .path("payload.content");
    }
```

## 上传示例

RestAssured 很强大，还能处理上传与下载的请求，简直让人“爱了爱了”。 下面是具体的示例：

```java
  @Test
public void importSuccess(){
    // 需要本地有文件
    File file=new File("src/test/fixtures/txt-success");

    getImportResp(file)
    .assertThat().body("code",org.hamcrest.Matchers.equalTo("0"))
    .assertThat().body("payload",equalTo(true))
    ;
    }

private ValidatableResponse getImportResp(File file){
    return given()
    .spec(requestSpec)
    .multiPart(file)
    .when()
    .post("/api/v1/import")
    .then()
    .statusCode(200);
    }
```

## 下载示例

```java
  @Test
public void downloadLicense(){
    Map<String, Object> license=getLicenseList().get(0);
    if(Objects.isNull(license))return;

    // 因为设置的请求头跟默认的不一样，所以单独设置
    RequestSpecBuilder builder=new RequestSpecBuilder();
    String token=System.getenv("TOKEN");
    builder.addQueryParam("token",token.replace("Bearer ",""));
    builder.addHeader("Content-Type","application/json;charset=UTF-8");
    requestSpec=builder.build();

    String result=given()
    .spec(requestSpec)
    .log().all()
    .when()
    .get("/api/v1/download/"+license.get("id"))
    .then()
    .statusCode(200)
    .extract()
    .response()
    .asString() //　获取输出流打印的字符串
    ;

    System.out.println(result);
    Assert.assertEquals(5,result.split("\n").length);
    }
```

看到全部用例断言成功，非常爽快！
![resetassured-download](../../download-images/resetassured-download.png)

## 其他问题

### 为什么不用 Pytest

如果编码代码的人员是测试人员，那可能首选 Pytest。但本文面向的读者的 Java 研发——既写 API，也写相应的测试代码。故选型理由参考前面 为什么不用Postman 的回答。

### 这也是单元测试吗

不是。运行上述测试代码，如果是测试本地接口，需要先在本地启动 Spring 容器；如果是测试线上接口，则需要先把应用部署到线上。因此，这是集成测试。

## 参考资料

官方文档：[https://github.com/rest-assured/rest-assured/wiki/Usage](https://github.com/rest-assured/rest-assured/wiki/Usage#examples)

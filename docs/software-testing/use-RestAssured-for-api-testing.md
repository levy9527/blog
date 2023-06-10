# 使用 RestAssured 进行 API 测试
## Why
必要性：让测试代码变成资产，方便回归测试，避免添加新功能时破坏旧功能。
便利性：方便本地调试，不用部署到线上，依赖界面去测试。

## 安装
注意点：

- 显式指定：json-path 与 xml-path 的版本，并排除其他测试包(如 sping-boot-starter-test) 对 json-path 的依赖
- 声明放在 JUnit 前面
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
## 快速上手
语法结构为： given()、when()、then()
```xml
given()  // 设置请求信息
.when()
        .get() // 发送请求
.then()
        .statusCode(200) // 断言响应
```
## 查看日志
最简单的方式是使用 log().all()：

- 在 given 输出请求信息
- 在 then 输出响应信息
```xml
given()
        .log().all()
.when()
        .get()
.then()
        .log().all();
```
## 通用设置
以下代码可直接复制到测试类中。
```java
private static RequestSpecification requestSpec;

// @BeforeAll // JUnit5 
@BeforeClass // JUnit4
public static void init() {
    RestAssured.baseURI = "http://your-domain.com:port/context-path"; // 如果是本地调试 domain 就是 localhost

    // 设置请求头
    RequestSpecBuilder builder = new RequestSpecBuilder();
    String token = "Bearer your-token";
    builder.addHeader("Authorization", token); // jwt
    builder.addHeader("Content-Type", "application/json;charset=UTF-8");
    // 在 give().spec() 中使用即可
    requestSpec = builder.build();
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
public void test() {
    Workflow workflow = new Workflow();
    workflow.setWorkflowId(1643167159934930966L);
    workflow.setWorkflowName("flow");
    List<Workflow> body = new ArrayList<>();
    body.add(workflow);

    given()
            .spec(requestSpec)
            .queryParam("query", "value")
            .body(JSON.toJSONString(body))
            .log().all()
    .when()
            .post("/api/v1/your-api?t=1")
    .then()
            .log().body()
            .statusCode(200)
            .assertThat().body("code", equalTo("0"))
            ;
  }

```
## 接口依赖
有时在请求接口 B 之前，需要请求接口 A，于是就产生了接口依赖：B 依赖了 A。

此时可以使用 extract() 及 path() 获取请求 A 返回的数据。
```java
  @Test
  public void test() {
    // 发送第一个请求
    List<Map<String,String>> workflowList = getWorkflowList();
    if (workflowList.isEmpty()) {
      System.out.println("workflowList  empty, test not execute");
      return;
    }

    // 返回的数据结构是个 Map
    Map<String, String> target = workflowList.get(0);

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
            .post("/api/v1/b")
    .then()
            .statusCode(200)
            .assertThat().body("code", equalTo("0"))
            .log().body();
  }


private List<Map<String, String>> getWorkflowList() {
  return given()
        .spec(requestSpec)
        .when()
        .get("/api/v1/a")
        .then()
        .statusCode(200)
        .extract()
        .path("payload.content");
  }

```
## FAQ
### 为什么不用Postman
Postman 确实是符合直觉的接口调试的第一选项。 但 Postman 的问题在于，测试用例与源代码分离，不利于维护与管理。

另外，如果要与 CI 结合，Postman 的数据更适合使用 Node.js 的 [Newman](https://github.com/postmanlabs/newman)。

考虑源代码是 Java，使用 RestAssured，编写 API 测试代码用同一种语言，可以减少使用者的心智负担较轻；并且与源代码放在同一个 Git 仓库中，易于管理。
### 为什么不用 Pytest
如果编码代码的人员是测试人员，那可能首选 Pytest。但本文面向的读者的 Java 研发——既写 API，也写相应的测试代码。故选型理由参考前面 为什么不用Postman 的回答。

### 这也是单元测试吗
不是。运行上述测试代码，如果是测试本地接口，需要先在本地启动 Spring 容器；如果是测试线上接口，则需要先把应用部署到线上。因此，这至少是集成测试。

## 参考资料
官方文档：[https://github.com/rest-assured/rest-assured/wiki/Usage](https://github.com/rest-assured/rest-assured/wiki/Usage#examples)

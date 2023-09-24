---
date: 2023-07-28
tag:
- Testing
---

# 单元测试概述
## Why
为什么要做单元测试？或者说，为什么要写测试代码？

个人总结为以下两点：

1. [测试左移](https://www.stickyminds.com/article/shift-left-approach-software-testing)，降低修复bug的成本
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1690532448643-e09bebb0-66f2-49f9-8686-d4a8c6b5d590.png)
2. 形成资产，方便回归测试，后续迭代重构、维护有保障

<!-- more -->

以上两点，是研发人员写测试代码的本质理由，无论什么类型的测试代码、研发人员用的什么语言、框架都适用。
## What
写测试代码究竟是写什么？

个人认为测试代码主要是为了搞清楚两件事：

1. 源码到底会不会在目标环境执行？
2. 源码的执行结果是否符合预期？

第一件事，引出了 code coverage 代码覆盖率的概念；第二件事，则引出了 assert 断言的概念。
## How
### 测试代码的风格
[AAA](https://medium.com/@pjbgf/title-testing-code-ocd-and-the-aaa-pattern-df453975ab80) 风格：

1. 组装参数
2. 执行目标方法
3. 执行断言
```java
  @Test
  public void testHash() throws Exception {
    // Arrange
    String plainText = JSON.toJSONString(licenseRequest);

    // Act
    String digest = hash(plainText);

    // Assert
    Assert.assertEquals(digest, "myhash");
  }

```

尤其注意最后的断言，如果没有断言，不叫测试。

常见的错误就是，不写断言，而使用 `System.out.println()`来判断执行结果。
这样做无法结合 CI 形成有效的自动化测试。 因为这种做法只能让编译通过，源码逻辑也许已经错误了，但测试结果仍然 100% 通过，这是没有意义的。

### 测试难点
以函数的观点来看。

输入：

1. 内存数据
2. 外部数据

输出：

1. 内存数据
2. 数据库
3. 文件系统
4. 网络调用

单元测试从严格意义上来说需要满足三个No：

1. No DB
2. No Network
3. No I/O

由此，引出了 Mock 的概念及技术。作为单元测试，需要 Mock 依赖，准备好输入数据，并想办法在内存中验证外部输出。

也即，重要的是隔离依赖，让测试可重复执行。
### 常用工具

1. [Junit](https://junit.org/junit5/)
2. [Mocktio](https://site.mockito.org/)
3. [TestMe](https://plugins.jetbrains.com/plugin/9471-testme)

## Bad Examples
以下是常见的错误测试示例，它们都不是合格的单元测试。
### 没有测试类 
```java
public static void main(String[] args) {
    // write a lot code to test
}
```
经典错误：写一个 main 方法，把所有测试代码都放进去。这样做的后果是，无论是人还是机器，都不知道原来这里还有测试代码。
### 没有断言
```java
@Test
public void decryptPwdTest(){
    String pwdStr = "YT08KDijKt/rqhhKv9NrLA==";
    String decrypt = DatasourcePasswordUtils.decrypt(pwdStr);
    System.out.println(decrypt);
}
```
经典错误：（很可能是单纯地把测试代码从 main 方法移过来）没有断言，依赖人用肉眼判断输出正确与否。

```java
@Test
public void testGetSummary() throws Exception {
    when(dao.countWithNoTenant(any())).thenReturn(0);
    when(dao.countEnableWithNoTenant()).thenReturn(0);
    when(dao.countWithNoTenant()).thenReturn(0);

    Result result = service.getResult();
}
```
这个例子虽然用上了 Mock 技术，但依赖掩盖不了没有断言的事实。这也许是为了达到测试覆盖率百分百而进行的投机取巧。
### 无法重复执行
```java
@Test
public void testAppendFile() throws Exception {
    File file = new File("D://appendtest.txt");
    minioFileStorage.append(file, "/appendtest.txt");
    Assert.isTrue(file.exists(file));
}
```
如果代码 Linux 环境运行怎么办？哪里来的 D 盘？

这种情况，正确的做法应该是把依赖的文件作为测试夹具，与测试代码一起放入版本控制中。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1695537638532-e8092338-3de2-4019-99a2-03bfb98f781f.png)
参考代码如下：
```java
  @Test
  public void importSuccess() {
    File file = new File("src/test/fixtures/file-import");

    getImportResp(file)
            .assertThat().body("code", org.hamcrest.Matchers.equalTo("0"))
            .assertThat().body("payload", equalTo(true))
    ;
  }

```

---
date: 2022-10-14
tag:
- Java
- Daily
---

# 编写函数的最佳实践
## 前言
编写函数的目的，最根本的目的是提高可维护性，从而提高研发效率。

本文将推荐一些编写函数的最佳实践，以供参数。

### 减少重复
这是在遵守 [Don't repeat yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (DRY) 原则。

实践中可以采取一个简单的判断方法：当相同的代码段第二次出现时，就是需要把代码封装成函数的契机。

然而，有时代码只是相似，不完全相同，不能简单地使用 IDEA 右键 + Refactor + Extract Method 来抽取函数。
此时，为减少重复，需要进行一些思考。

可以把程序的划分成三个部分：
```java
Program = Control + Logic + Data Structure
```
一般而言，函数的入参都是数据变量，也即 Data Structure。
而 Java 8 以后，lambda 表达式（也即函数）可以作为入参，其代表的是 Logic。
因此，最抽象的函数，是只定义了 Control、把 Logic 及 Data Structure 都作为入参的函数。当遇到类似却不完全相同的代码、想封装函数有遇难时，可以借助上述思路来梳理逻辑。
### 隐藏细节
隐藏细节，是为了减少使用者的心智负担，方便其调用。

有一个简单的判断标准：如果调用者需要频繁查看函数内部情况，以确定函数的目的或实现细节，那么隐藏细节的意图是失败的。
## 建议
为了达到前文所述的目的，如以下实践建议。需要指出的是，以下提倡的是建议，并非金科玉律；只适用于一般情况，并非所有情况，特殊情况是可以特殊处理的。
### 优先根据业务命名
一般而言，函数名最好是根据业务逻辑、结合业务领域来命名，而不是根据程序逻辑来命名。

示例：
```java
// bad
String getString(UserDTO user);

// good
String getUsername(UserDTO user);
```

当然，如果有些方法名是专业名词或是耳熟能详的，那直接使用即可，如：
```java
void bfs();

void shortestPath();

void binarySearch();
```
### 一个函数只做一件事
遵守 [Keep it simple stupid](https://en.wikipedia.org/wiki/KISS_principle) (KISS) 原则。

当然，不可能所有函数都达到这个要求——程序入口一般就会做很多事。我们的目标是尽可能地遵守该原则，减少调用者需要频繁查看函数实现的可能。

反例1：做A且做B
```java
// bad
int doSomethingAndAnother(Param param);

// good 
// 拆分成两个函数
int doSomething(ParamA a);
int doAnother(ParamB b);
```
坏的示例问题出在哪里呢？根据入参的合法性，有可能产生以下情况：

1. 参数合法，同时做A与B；只要有一个参数不合法，均不做A与B
2. 哪个合法就做哪个，也即可能出现：
   1. 只做A
   2. 只做B
   3. 做A也做B
   4. 二者均不做

到底是什么情况呢？对此疑问，调用方只有查看函数实现，才能了解，于是破坏了封装的意图。
而且，坏的示例还会存在一个问题：如果调用方只想做A怎么办？我想很少人会把原代码拆分成两个函数，更常见的做法是保持原函数不变，并拷贝原函数的部分逻辑，封装一个只做A的新函数——这就造成了代码的冗余，于是减少重复的目的失败了。

反例2：做A或做B
```java
// bad
int doSomethingOrAnother(Param param);

// good 
// 拆分成两个函数
int doSomething(ParamA a);
int doAnother(ParamB b);
```
同样的，坏的示例会让人疑惑，搞不清楚函数的意图到底属于以下哪种情况：

1. 要么做A，要么做B，一定会做其中一个
2. 哪个合法做哪个，可能会出现：
   1. 只做A
   2. 只做B
   3. 做A也做B
   4. 二者均不做

当然，一些常见的深入人心的 API，我们是可以接受这种“或逻辑”的：

- saveOrUpdate() // 有 id 就是 update，没有就是 insert
- getOrDefault() // 获取值；如果值不存在，就返回默认值
### 优先使用纯函数
纯函数(pure function)，可以借助数学中的函数概念来理解：y = f(x)

- 给定 x，能返回确定的 y
- 无论函数调用几次、在何处调用，上述结果都不会变化

纯函数的好处之一是无副作用（side effect）。也即调用函数后，不会对函数作用域以外的变量造成影响。

反例：一个常见的现象，辅助函数会修改入参，主函数的变量生命周期贯穿整个主函数
```java
Result getRelation(String nodeId, Param param) {
    // 省略其他代码
    
    Map<Long, Node> nodesMap = new HashMap<>();   

    // 没有返回值
    getUpstream(nodeId, nodesMap, param);

    // “废物利用”！
    nodesMap.clear();

    // 没有返回值
    getDownstream(nodeId, nodesMap, param);
  
    Map<Long, NodeDTO> nodesDtoMap = new HashMap<>();
    return getResult(nodesDtoMap, nodesMap);
} 
```
因为已经省略了其他代码，因此我们不难看出 `nodesMap`是辅助变量，是为返回结果而服务的，而没有返回值的函数调用很可能修改了该变量。

但实际上，代码逻辑很长，还有其他变量掺杂其中，代码意图并非能够一目了然。假设稍微修改一下，为 `getUpstream()`添加多一个参数，还能看出函数到底修改了哪个变量吗？
```java
Map<Long, Node> nodesMap = new HashMap<>(); 
// 添加多一个变量
Map<Long, Edge> edgesMap = new HashMap<>();

getUpstream(nodeId, nodesMap, edgesMap, param);
```

如果 `edgesMap`是来自主函数的参数呢？
```java
Result getRelation(String nodeId, Map<Long, Edge> edgesMap, Param param) {
    // 省略其他代码
    
    Map<Long, Node> nodesMap = new HashMap<>();   

    // edgesMap 是主函数传参
    getUpstream(nodeId, nodesMap, edgesMap, param);
       
    // 省略其他代码 
} 
```
情况变得糟糕了，因为按照 `getUpstream()`会修改入参的“习性”，我们很难有信心认为 `edgesMap`一定没有被修改。

上述例子是想表明：为了贪图方便，编写一个不需要返回值而直接修改入参的函数，会给后续的维护增加负担。一方面变量状态难以追踪，另一方面这样的函数也不方便测试。

一般而言，优先使用纯函数，会助于对大函数的拆分，从而使得 KISS 原则更容易被遵守。

当然，总有例外情况。当程序逻辑复杂时，或有些函数就是对 setter 语句的调用，此时不需要返回值并且会造成副作用，又该怎么办呢？请看下一条建议。
### 编写不需要返回值的函数
有如下建议：

1. 方法名叫`setup`+ ${要修改的变量名}
2. 一个方法只修改一个变量
3. 要修改的变量就是函数的第一个参数
4. lambda（如果有的话） 作为最后的参数

示例：
```java
setupNodeCommonInfo(node, nodeId, queryUpstream);
setupNodeTableInfo(node, nodeId2Table);

setupEdgeCrossLayer(edges, Edge::getSourceId, Edge::getTargetId);
```
## 参考资料
- [functional-programming-mostly-adequate-guide/ch03](https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch03)
- [code-complete-2nd-edition.pdf](http://aroma.vn/web/wp-content/uploads/2016/11/code-complete-2nd-edition-v413hav.pdf)

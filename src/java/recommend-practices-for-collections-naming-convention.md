---
date: 2022-06-01
tag:
- Java
- Daily
---

# 集合命名推荐
## 概述
建议给常用集合类的变量命名时，后缀带上相应的集合信息，以提高可读性。

当然，在此之前要回答一个问题：当把鼠标放到变量上面时，IDE 会提示变量的类型，为什么还要在命名上做文章？
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1654049668320-c53d0ef6-4063-4163-aa3e-2c304af4e39a.png)

这是因为，有时并不在 IDE 上阅读代码，比如进行 GitHub 或 GitLab 进行 code review，此时无法获得提示，需要通过命名的规范来帮助理解。
## List
List 的变量，一般以 List 或 s 结尾， 如 idList 或 ids。这点易于理解，大家也容易遵守。

坏的示例：
```java
nodeType.forEach(t -> {
    // 省略代码
});
```
第一眼看到这代码的时候，不知道读者是什么反应？

按照习惯，nodeType 通常要么是字符串、数字、或枚举，但上述居然能调用 forEach 方法？我不禁愣了一下，赶紧去看了下定义，才发现原来是List。

好的示例：
```java
nodeTypes.forEach(t -> {
    
});

// 或
nodeTypeList.forEach(t -> {
    
});
```

## Set
参考List，在变量后面加 Set 即可。
## Map
Map 的变量命名是值得重点关注，因为很容易造成差可读性的重灾区。

Map 的变量，推荐根据 key 与 value 来命名。规则表达式为：${key} + To + ${value} + Map，如 idToNameMap。
其中：

- 可以玩一下“文字游戏”，把 To 写成 2（就像把 For 写成 4，这种 word play 是可以接受的），即 id2NameMap
- 如果名字够清晰或已经很长，Map 可以省略，如 id2Name

为什么推荐这样命名？我们先来看一则案例，看一看经典的 Map<String, String> 在实际编码中，命名是如何造成理解上的困难的。
```java
List<TableNode> tableNodes = getFromSomePlace();
Map<String, String> tableIdMaps = getFromAnotherPlace(); 

// 重点看下面两行代码
Map<String, String> tableMaps = getTableIdMap(tableNodes, tableIdMaps); 
replaceNodeId(tableNodes, tableMaps);
```

`getTableIdMap`核心实现如下：
```java
// 谜之代码
tableNodes.forEach(tableNode -> {
    String tableNodeId = getTableNodeId(tableIdMaps);
    tableMaps.put(tableNode.getNodeId(), tableNodeId);  //？？？
});

return tableMaps;
```

`replaceNodeId`核心实现如下：
```java
// 谜之代码
tableNodes.forEach(tableNode -> {
    String nodeId = tableMaps.get(tableNode.getNodeId());  // ？？？
    tableNode.setNodeId(nodeId);
});
```

不知读者是否已经晕了？反正我是一头雾水。可能以为是因为我删减了很多代码导致的？恰恰相反，实际代码还有更多的逻辑判断，我已经抽出了核心部分，不需要被其他逻辑干扰了。

上面的代码带来的疑问有：
疑问1：都是 `Map<String, String>`，`tableIdMaps` 与 `tableMaps` 有什么区别，它们存储的到底是什么？从类型上看，也不像是 id -> table 的映射啊。
疑问2：`tableMaps.put(tableNode.getNodeId(), tableNodeId);`  这个 `tableNode.getNodeId()` 不是等于 `tableNodeId`吗？
疑问3：`String nodeId = tableMaps.get(tableNode.getNodeId()); `根据 nodeId 拿到 nodeId？

到这里已可以猜到，`tableMaps`里的 key 与 value 肯定不是单纯的 nodeId 的意思，但这并没有什么帮助，因为我们还是不知道 `tableMaps`  key -> value 映射的到底是什么。

我们来看修改变量名之后，上述代码的效果。
```java
List<TableNode> tableNodes = getFromSomePlace();
//修改下面两个 Map 的命名
Map<String, String> str2TableIdMap = getFromAnotherPlace(); 
Map<String, String> nodeId2TableIdMap = getTableIdMap(tableNodes, str2TableIdMap); 

replaceNodeId(tableNodes, nodeId2TableIdMap);
```

```java
tableNodes.forEach(tableNode -> {
    String tableId = getTableNodeId(str2TableIdMap); // 修改了这行
    nodeId2TableIdMap.put(tableNode.getNodeId(), tableId); // 修改了这行
});

return nodeId2TableIdMap;
```

```java
tableNodes.forEach(tableNode -> {
    String tableId = nodeId2TableIdMap.get(tableNode.getNodeId());  //修改了这行
    tableNode.setNodeId(tableId);
});
```

现在是不是好懂很多了：

- str2TableIdMap 存储的 str -> tableId 的映射, 其中 str 是由某种规则拼接而成的字符串，具体规则封装在了 `getTableNodeId`这个函数里，我们暂时可以不用关心
- nodeId2TableIdMap 存储的是 nodeId -> tableId 的映射

仅仅修改变量名，可读性就有大大提高，效果立竿见影！
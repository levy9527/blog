---
date: 2022-04-05
tag:
- Java
- Daily
---

# forEach 还是 map？
## 背景
遍历一个集合，在里面执行某种操作后，再依次返回每一个元素，常见的实现方式有：
```java
List<Type> result = new ArrayList<>();
list.forEach(src -> {
    Type target = BeanUtils.copyProperties(src, target);
    //省略代码
    result.add(target);
});
```

```java
List<Type> result = list.map(src -> {
    Type target = BeanUtils.copyProperties(src, target);
    //省略代码
   return target;
});
```

两种方式看起来没多大差别啊，到底用哪种呢？
## 结论
先说结论：根据《Effective Java》(第三版），forEach 只用于消费数据的场景，并不应该用于计算、累加，故上述代码应该使用 map。

原文如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1654151903594-61668916-08c9-4349-9429-024742b14fac.png)
> 红字处翻译：forEach 仅适用于输出 stream 里的计算结果，并不适合执行计算。


## 解析
为更好地理解上述结论，需要先理解以下内涵：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/160590/1654153524133-3fcb016b-8dae-4482-807b-952b5dd0ca6e.png)
Stream 的引入，不仅带来新的语法，也带来了函数式编程的思维。

这里最重要的一点就是：编写纯函数（pure function），不造成副作用（side-effect）。

纯函数可以用数学中的函数映射来理解：y = f(x)

- 给定 x，能唯一确定 y
- 无论函数调用几次、在何处调用，上述结果都不会变化

无副作用意思是：调用函数后，不会对函数作用域以外的变量造成影响。而纯函数，一定是无副作用的。

前文使用 forEach 的代码，其实是造成了副作用的：
```java
List<Type> result = new ArrayList<>();
list.forEach(src -> {
    Type target = BeanUtils.copyProperties(src, target);
    result.add(target); //side effect
});
```
很简单的一个识别方法：再调用一次 forEach，result 的结果还是期望的结果吗？显然不是。

但如果 map 方法呢？再调用一次，结果不变！
```java
List<Type> result = list.map(src -> {
    Type target = BeanUtils.copyProperties(src, target);
   return target; // side effect free
});
```

类似的，修改函数入参，也不是纯函数：
```java
List<String> ids = new ArrayList<>();

collectIds(data, ids); // 在这里填充 ids！

int size = ids.size(); 
```
上面的 `collectIds`函数是令人讨厌的——写代码的人懒得写函数返回时，直接修改函数入参，给后面维护的人留下隐患。

当然，如果一定要用纯函数来看待问题，未免过于理想化，因为有时要执行这样的代码：
```java
list.forEach(v -> {
    myService.save(v);
});
```
虽然上述代码并没影响到函数作用域以外的代码变量，但 myService 会把数据持久化，站在整个应用的角度讲，仍然造成了副作用。 

但上述代码可以接受的。因此，建议记住 forEach 只用于消费数据，不用于计算及返回，就不容易混淆。
## 实战
当然，上述的讨论还是比较偏理论的，我们来看一下实际项目中，滥用 forEach 可能导致可读性较差的问题。

代码一开始，是简单清晰的：
```java
// 一个只有20行的函数
void myFunction(List<Node> nodes, List<Edge> edges) {
    Type1 var1;
    Type2 var2;
    
    nodes.forEach(node -> {
        // 修改 var1
    })
      
    edges.forEach(edge -> {
        // 修改 var2
    })
}
```
然而，业务会变化，逻辑会复杂，代码也要修改。而上述在 forEach 中修改变量的行为，罪恶的根源在于，它在向后来修改代码的人发出邀请：新增的逻辑，写在这个 forEach 里面就好了！

当仅在 forEach 添加代码就能完成任务的时候，很难有人能抵抗这种诱惑，于是就会变成：
```java
// 一个超过50行的函数
void myFunction(List<Node> nodes, List<Edge> edges) {
    Type1 var1;
    Type2 var2;
    Type3 var3;
    Type4 var4;
    Type5 var5;
    
    nodes.forEach(node -> {
        // 里面有多个 if-else
        // 修改了 var1, var2
        // 有可能修改 var5
    })
      
    edges.forEach(edge -> {
        // 里面有多个 if-else
        // 修改了 var3, var4
        // 有可能修改 var5
    })
}
```
写代码一时爽，维护火葬场。上面的代码，将是维护的噩梦！

并且，如果维护者只想知道函数的整体逻辑，由于变量穿插、隐藏在 forEach 内部，维护者不得不在各种 if-else 里面追踪变量，很容易就陷入不必要的细节中。

如果换个方式来写呢？
```java
void myFunction(List<Node> nodes, List<Edge> edges) {   
    // 为代码简洁，省略了 collect(Collectors.toList())
    Type1 var1 = nodes.map(v -> getVar1(v));
    Type2 var2 = nodes.map(v -> getVar2(v));
    Type3 var3 = edges.map(v -> getVar3(v));
    Type4 var4 = edges.map(v -> getVar4(v));
    Type5 var5 = Stream.of(nodes, edges).filter(v -> filterVar5(v));
    
}
```
效果有大大的不同！

现在想追查哪个变量，简单轻松好多啦！

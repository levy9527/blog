---
date: 2022-10-14
tag:
- Java
- Daily
---

# 枚举的推荐实践
## 背景
定义枚举的动机在于，可以作为常量，避免魔法值的出现。并且具有相应的类型，方便检索、与代码提示。

而在使用过程中，一种符合直觉的想法是，期望枚举在具备基本的 key-value 的功能外，还能够承载更多的信息。

本文推荐，不要在枚举中定义数字，直接使用枚举名即可！

## Java
### 极简实现
理想状态下，枚举就应该这样简单！

```java
public enum SEX {
  MALE,
  FEMALE;
}
```

### 常见实现
然而，代码库中常见的实现是，使用 enum 关键字定义枚举类型，并写下枚举名以及相应的绑定值
```java
public enum SEX {
  MALE(1, "this is description for male"),
  FEMALE(0, "this is description for female"); 
}

```
就这点代码，从业务的角度讲，逻辑已经实现了。

但从具体编程语言（Java）的角度讲，工作还没有完成：此时，编译器会提示报错，因为缺少构造函数。

站在调用方的角度，就会发现，我们没有方法拿到枚举里的定义值，也即`(1, "this is description for male")` ，

因此，还需要编写以下内容：

- final 的成员变量
- 在构造函数中为成员变量赋值
- 定义成员变量相应的 getter 方法

```java
  private final Integer code;
  private final String desc;

  MyEnum(int code, String desc) {
    this.code = code;
    this.desc = desc;
  }

  public Integer getCode() {
    return code;
  }

  public String getDesc() {
    return desc;
  }
```

前面说到，我们期望枚举里有 key-value 的功能，则还要再定义 `getValueByKey` 方法：
```java
  public static String getDescByCode(Integer code) {
    for (MyEnum e : values()) {
      if (e.getCode().equals(code)) return e.getDesc();
    }
    return "";
  }
```
有了上面的方法，我们才可以通过传入 code，返回相应的 desc

如果反过来，我们想通过传入 desc 返回相应的 code 呢？还得再写一个方法！真是烦琐！

### 更好的方式
前面我们可以看到，当关键逻辑写出来以后，还要写那么多模板代码，简直索然无味。

为什么把简单的事情搞复杂，有没有更好的方式？

需要了解到以下事实，枚举类型提供了通过枚举名获得枚举值的方法：
```java
  public static void main(String[] args) {
    MyEnum myEnum = MyEnum.valueOf("MALE");
    System.out.println(myEnum.getDesc());
  }
```

也就是说，如果使用 `valueOf`的方式来定位枚举值，就可以通过 getter 方法来获取自定义的业务值，不需要再写自定义的 getValueByKey 方法。

### 为什么还要定义数字？
另外，再看之前的枚举定义，为什么要定义 `MALE(1, "this is description for male")`呢？
在 `MALE`本身已经有含义的情况下，为何还要再设置一个数字呢？

这个数字导致了不必要的转换：
1. 前端传数字 -> 后端转成枚举
2. 后端再把枚举转成数字 -> 存入数据库

最蛋疼的就是，select 数据库数据的时候，全是1、2、3，都不知道什么意思。

能不能不要这个数字？ 直接把定义好的枚举名，存入数据库呢？

表面上看，这是因为数据库定义如此——从数据库查出来是数字，因而要根据数字去获取别的业务信息。

然而，我再问了一下，得到的回答是： 上述做法是设计如此。为了节省存储空间及提升查询性能，才在数据库设置的数字，而不是直接存储字符串。

这就引出了另一个问题，需要这样做来提高性能吗？对此，我们接下来要进行数据库层面的讨论。
## 数据库
数据库本身是支持检举类型的，下文以 MySQL 为例进行说明。

枚举相关的 SQL 语句示例：
```sql
-- 建表
CREATE TABLE shirts (
  name VARCHAR(40),
  size ENUM('x-small', 'small', 'medium', 'large', 'x-large')
);

-- 插入
INSERT INTO shirts (name, size) VALUES ('dress shirt','large'), ('t-shirt','medium'),
('polo shirt','small');

-- 查询
SELECT name, size FROM shirts WHERE size = 'medium';
+---------+--------+
| name    | size   |
+---------+--------+
| t-shirt | medium |
+---------+--------+
```

存储方式：转换成数字存储，查询时再转换成字符串
[存储空间](https://dev.mysql.com/doc/refman/5.7/en/storage-requirements.html#data-types-storage-reqs-numeric)：1 or 2 bytes (65,535 values maximum)

由上可知，为了节省空间及提高查询性能，在数据库层面使用数字代表枚举进行存储，是不必要的，因为数据库本身已有相应的功能。

### 排序特点
排序规则如下（如执行order by 时）：

- NULL 在最前面，'' 次之，接下来是非空的枚举值
- 定义枚举值时的顺序，就是排序的顺序

推荐使用以下技巧：

- 按字母表顺序定义检举值
- 把检举值转换成字符串再排序 ORDER BY CAST(col AS CHAR) or ORDER BY CONCAT(col)

### 添加新值
使用枚举类型的最大的问题是，后续添加新值时需要执行 alter table。

如果枚举值经常变动且对枚举值的顺序要求（添加的新值不一定在最后面），则不建议使用枚举类型。

否则的话，可以使用枚举类型。

因为 alter table 的机制是：

1. 创建临时表 t'
2. 插入数据
3. 删除当前表 t
4. 把 t' 重命名为 t

这在表数据量较大时，会导致表被锁较长时间而不可用。

可以使用以下技巧进行更新，记得严格按照顺序执行：
```sql
CREATE TABLE database.shirts_tmp LIKE database.shirts;
-- 在最后添加了 'xx-large'
ALTER TABLE database.shirts_tmp MODIFY COLUMN ENUM('x-small', 'small', 'medium', 'large', 'x-large', 'xx-large');

FLUSH TABLES WITH READ LOCK;

SHOW variables LIKE 'datadir';
SELECT DATABASE() as databaseName;
```
```shell
# 登录 MySQL 所在机器
# 根据上面最后两行SQL，进入相关目录
cd ${datadir}/${databaseName}

mv shirts shirts_old;
mv shirts_tmp shirts;
mv shirts_old shirts_tmp;
```
```sql
UNLOCK TABLES;

-- 可以在删除前检查两张表的定义是否已交换
-- select * from database.shirts;
-- select * from database.shirts_tmp;

DROP TABLE database.shirts_tmp;
```
如果在 Navicat 或 DBeaver等图形工具上看不出表结构的变化，请刷新数据库。

## 总结
本文主要目的是想消除枚举中对魔法数字的误用，试图让 Java 代码、数据库数据、以及前端 API 传参都使用可理解、可读性强的枚举值。

在数据库层面，对于枚举类型字段的注意点，本文也做了说明。如果实在不想每次添加新的枚举值都执行 `alter table`语句，贪图省事，使用 varchar 存储也未尝不可。

总之，本文想强调的是 Java 代码与数据库数据展示内容的一致性，至于数据库的存储格式，是见仁见智的。

## 参考资料

- [https://www.baeldung.com/java-enum-values](https://www.baeldung.com/java-enum-values)
- [https://www.baeldung.com/a-guide-to-java-enums](https://www.baeldung.com/a-guide-to-java-enums)
- [https://dev.mysql.com/doc/refman/5.7/en/enum.html](https://dev.mysql.com/doc/refman/5.7/en/enum.html)
- [High Performance MySQL 3rd Edition](https://www.oreilly.com/library/view/high-performance-mysql/9781449332471/)

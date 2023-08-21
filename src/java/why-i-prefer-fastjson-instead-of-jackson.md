---
date: 2023-08-21
tag:
- Java
- Daily
- Video
---

# 用什么jackson，fastjson不香吗？

Jackson　经典错误：UnrecognizedPropertyException。

原因是 json 字段，多于 Java 实体类的字段。

解决方法很简单：
```java
new ObjectMapper()
  .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
```

或者为相关实体添加注解：
```java
@JsonIgnoreProperties(ignoreUnknown = true)
public class ObjectParseFromJsonString {  }
```

<!-- more -->

可是，如果用 fastjson，根本不会有这种错误。使用起来也简单，[文档在这里](https://github.com/alibaba/fastjson/wiki/Samples-DataBind)。

所以，为什么不用　fastjson　呢？

<BiliBili bvid="BV1Vp4y1K7Wq" />
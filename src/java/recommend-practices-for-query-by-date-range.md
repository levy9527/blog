---
date: 2023-09-12
tag:
- Java
- Daily
---

# 根据时间范围查询推荐实践
## 背景
不敢说是最佳实践，因为受限于特定技术、框架，并且带上了个人偏好。

虽然原理简单，但细节很多，不想每次搞来搞去，因此还是有记录的价值。

本文用到的技术栈为：MySQL、MyBatis、Java 8、Jackson

<!-- more -->

## 需求
删除某个时间段以前的日志。类似于消除浏览记录：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694499288408-aaec3b0c-9d06-43c1-849b-7af4ec9eb01a.png)

## 分析
上图只是UI示例，为了适应UI的变化，最好把接口设置成接收两个参数：

- 开始时间
- 结束时间

如果UI如上图所示，则选择过去 7 天时，开始时间就是 1970 年 1 月 1 日，结束时间就是过去第 7 天。
## 实现
### MySQL
对于 MySQL，推荐使用，因为简单直观，且方便：
```sql
SELECT * FROM operation_logs 
WHERE created_time BETWEEN '2023-09-12 11:44:26' AND '2023-09-12 13:54:52';
```

另一种方式：
```sql
SELECT * FROM operation_logs 
WHERE created_time >= '2023-09-12 11:44:26' AND created_time <= '2023-09-12 13:54:52';
```

上面是时间精确到秒的设计思路，逻辑上没有问题，但体验会有问题：如果是查询某个时间范围的日志还好，精确一点；现在需要是删除日志，谁还关心到秒啊！

通常人们只会关心到天，则考虑一种情况：开始时间与结束时间是同一天，下面的语句无法删除任何记录：
```sql
DELETE FROM operation_logs 
WHERE created_time BETWEEN '2023-09-12' AND '2023-09-12';
```

那么现在，就是分歧点了，有两种方案：

1. 程序为开始时间、结束时间填充时分秒：
```sql
DELETE FROM operation_logs 
WHERE created_time BETWEEN '2023-09-12 00:00:00' AND '2023-09-12 23:59:59';
```

2. 结束时间 +1 天：
```sql
DELETE FROM operation_logs 
WHERE created_time BETWEEN '2023-09-12' AND '2023-09-13';
```

两种方案都是可以行，我推荐的是第二种。并且，由后端处理，不需要前端拼接字符串。

> 注：结束时间 +1 的原因是，实际存储的的 created_time 是带有时分秒的，而用户选择时，只精确到日，这就相当于时分秒的值为0。如果结束时间不加1，则结束时间当天的记录都无法匹配到。
### MyBatis
如果使用的是 `>=` 这种要SQL写法，MyBatis 就需要转义：

- `>` 转成 `&gt;`
- `<` 转成 `&lt;`

这就是不推荐这种写法的原因之一。
### LoxalDate
都已经 Java 8 了，就不要使用 java.util.Date 了，使用 java.time.LocalDate 吧。方便应对后续的时间操作。

结束时间+1天，非常简单：
```java
    @Override
    public boolean deleteLog(DeleteOperationLogDto log) {
        return operationLog.delete(log.getStartDate(), log.getEndDate().plus(1, ChronoUnit.DAYS));
    }
```

记得在 Controller 对时间字段加注解：
```java
@DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
private LocalDate startDate;
```

否则会报错：
> Failed to convert property value of type 'java.lang.String' to required type 'java.time.LocalDate' for property 'startDate'; nested exception is org.springframework.core.convert.ConversionFailedException:

### Jackson
如果不想在每个字段都加 `@DateTimeFormat` 注解，可以利用 Jackson 进行反序列化相关设置。

既然要设置反序列化，那序列化也少不了。我把全部设置的代码放下面了，有需要复制即可：
```java
@SpringBootConfiguration
public class JacksonConfig {
    public static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_PATTERN = "yyyy-MM-dd"; 
    public static final String TIME_PATTERN = "HH:mm:ss";

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        // 对于空的对象转json的时候不抛出错误
        objectMapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        // 禁用遇到未知属性抛出异常
        objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        // 序列化BigDecimal时不使用科学计数法输出
        objectMapper.configure(JsonGenerator.Feature.WRITE_BIGDECIMAL_AS_PLAIN, true);

        // 时区
        objectMapper.setTimeZone(TimeZone.getDefault());

        // 日期和时间格式序列化器
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalDateTime.class,
                new LocalDateTimeSerializer(
                        DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)));
        javaTimeModule.addSerializer(LocalDate.class,
                new LocalDateSerializer(DateTimeFormatter.ofPattern(DATE_PATTERN)));
        javaTimeModule.addSerializer(LocalTime.class,
                new LocalTimeSerializer(DateTimeFormatter.ofPattern(TIME_PATTERN)));

        // 日期和时间格式反序列化器
        javaTimeModule.addDeserializer(LocalDateTime.class,
                new LocalDateTimeDeserializer(
                        DateTimeFormatter.ofPattern(DATE_TIME_PATTERN)));
        javaTimeModule.addDeserializer(LocalDate.class,
                new LocalDateDeserializer(DateTimeFormatter.ofPattern(DATE_PATTERN)));
        javaTimeModule.addDeserializer(LocalTime.class,
                new LocalTimeDeserializer(DateTimeFormatter.ofPattern(TIME_PATTERN)));
        objectMapper.registerModule(javaTimeModule);
        return objectMapper;
    }
}

```

## 结语
好了，终于搞完了，我的评价是：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1694501621853-c16a33fa-68e7-4aba-a72e-a9907793b564.png)

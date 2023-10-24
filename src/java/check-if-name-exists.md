---
date: 2023-10-18
tag:
- Java
- MySQL
- Daily
---

# 检查名字是否重复
检查名字是否重复是很常用的业务需求，本文推荐一种更省心、更少bug的做法。

<!-- more -->

## 推荐做法
借助数据库的来实现，执行以下语句：
```sql
ALTER TABLE my_table ADD UNIQUE(name);
```

然后，在程序里添加全局异常处理类：
```java
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = org.springframework.dao.DuplicateKeyException.class)
    public ResponseEntity<?> SQLIntegrityConstraintViolationExceptionHandler(Exception ex, HttpServletRequest webRequest) {
        String[] strings = ex.getMessage().split("java.sql.SQLIntegrityConstraintViolationException: ");
        String msg = strings[strings.length - 1];
        return errorHandler(ex, webRequest,"400", msg);
    }
}
```

示例返回：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1697616346892-cea4b6c7-1966-4dc5-84c6-d901eeeabd65.png#averageHue=%23fcfbfb&clientId=u791d113b-6ee5-4&from=paste&height=146&id=u5e5b9578&originHeight=146&originWidth=575&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11093&status=done&style=none&taskId=u48e1cd4e-70db-4617-be80-0ec3828b522&title=&width=575)
## Why
为什么这样做呢？因为这样只需要改一次代码。后续再有类似的需求时，只需要增加 SQL 即可，不需要再修改码、不需要重新编译、构建、部署。

如果选择修改代码，则每次至少要修改两个地方：新增、修改都要处理。

示例代码如下：

- 检查是否存在
```java
  public Boolean exists(Request req) {
    // 新增与修改的查询语句是不一样的
    return mapper.exists(new LambdaQueryWrapper<Entity>()
            .eq(Entity::getName, req.getName())
            .ne(Objects.nonNull(req.getId()), Entity::getId, req.getId())
    );
  }
```

- 新增接口
```java
  public boolean create(Request req) {
    if (exists(req)) throw ApplicationException("Duplication!")
  }
```

- 修改接口
```java
  public boolean update(Request req) {
    if (exists(req)) throw ApplicationException("Duplication!")
  }
```

实践的经验表明：改得多，错的多！

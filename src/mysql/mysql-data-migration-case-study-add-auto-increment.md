---
date: 2023-08-16
tag:
- Daily
- MySQL
---

# 数据迁移案例：表AUTO_INCREMENT加10w

## 背景
项目要做数据迁移，要把 mysql-a 的数据，迁移至 mysql-b，同时 mysql-b 的数据不能丢失。

问题分析：

1. 两个 mysql 实例的表的主键都是自增的，若直接合并，必然造成主键冲突。
2. 可以修改某一方的主键后再迁移，但要注意后续不会因主键增长而发生冲突。

迁移思路:

1. 由于 mysql-b 的数据更重要、且数据量更大，故决定修改 mysql-a 的数据的主键，方案是增加 10w（mysql-b 的单表数据不超过 10w条）
2. mysql-b 的相应的表 AUTO_INCREMENT 加 10w
3. 记得动手前先确保数据已备份

注意：
- mysql-b 的数据量比 mysql-a 的大，所以 mysql-b 也直接设置 AUTO_INCREMENT 加10w。
- 但如果 mysql-a的数量比较大，那是不可行的，此时 mysql-b 需要先 select 出每张表的最大id，作为需要增加的 AUTO_INCREMENT。

<!-- more -->
## 备份
迁移前一定要做好备份。备份的技巧在[另一篇文章](mysql-backup-case-study-mysqldump-in-action.md)里有讲，就不在此赘述了。

## SQL编写
mysql-a 可以先 insert：
```sql
insert into table_a(id, other_fields...)
select id+100000, other_fields... from table_a
where is_deleted=0;
```
再导出新增的数据：
```sql
select * 
from table_a 
where id > 100000;
```

也可以先备份 mysql-a，然后直接 update：
```sql
update table_a
set id = id + 100000
where is_deleted=0;
```
再导出。

对于 mysql-b，需要编写的SQL很简单：

1. 先把当前表的主键自增值找出来
2. 再加 10w

理想中SQL如下：
```sql
ALTER TABLE table_a AUTO_INCREMENT = (
  SELECT AUTO_INCREMENT + 100000
  FROM information_schema.TABLES
  WHERE TABLE_NAME = 'table_a'
);
```

然而，报错如下：
```sql
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '(
  SELECT AUTO_INCREMENT + 100000
  FROM information_schema.TABLES
  WHERE TABLE_' at line 1
```

原因是： The **AUTO_INCREMENT** value must be a constant or a specific integer value in the **ALTER TABLE** statement.

那怎么办呢？存储过程就派上用场了。思路是使用存储过程来拼接 alter table 语句，绕过 MySQL 的限制。
## 存储过程（可复用
```sql
DELIMITER //
CREATE PROCEDURE AddAutoIncrementValue(tableName VARCHAR(255), incrementValue bigint unsigned)
BEGIN
  DECLARE currentAutoIncrement bigint unsigned;
  SET currentAutoIncrement = (SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = tableName);
  SET @sql = CONCAT('ALTER TABLE ', tableName, ' AUTO_INCREMENT = ', currentAutoIncrement + incrementValue);
  PREPARE stmt FROM @sql;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END//
DELIMITER ;
```

```sql
CALL AddAutoIncrementValue('table_a', 100000);
CALL AddAutoIncrementValue('tablb_b', 100000);
```
上述代码可复用，直接复制粘贴即可，有需要的请自取。
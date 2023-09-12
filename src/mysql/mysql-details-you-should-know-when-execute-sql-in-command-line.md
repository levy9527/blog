---
date: 2023-08-19
tag:
- Daily
- MySQL
---

# MySQL 命令行执行SQL的细节
## 背景
经过调试与验证，我们可以确信自己编写的SQL是正确的，是时候到目标库执行SQL了！

但要小心，在正式环境中执行 SQL，也许会有意想不到的坑！
## 环境说明
先说明下我们的环境信息。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692321838318-b353f14d-13d0-432e-a05b-9fbcd3c1dd1f.jpeg)
我们只能通过跳板机的终端连接 mysql、执行SQL，没有DBeaver、Navicat等工具可用。

则我们执行SQL语句的方式有两种：

1. 执行导出的SQL语句文件
2. 复制粘贴SQL语句执行

当然，在执行前，我们要确保已进行了数据备份。
## 执行SQL文件
执行SQL文件是最简单的，一般实践也是在命令行批量执行SQL文件。

相关的命令与恢复备份的命令一致：
```sql
mysql -h your-ip -u your-username -p${password} your-database <  script.sql
```

这是推荐的方式，因为执行语句一旦出错，就会停下，并告知是第几行的语句出错。

但出于某些原因，你可能不想把所有SQL语句都合并到一个 script.sql 文件中。
另外，上传文件到跳板机，可能也比较麻烦，于是，你想采用第二种方式。
## 复制粘贴执行
通过 mysql 客户端直接上 MySQL 后，在命令上执行 SQL 语句会有一个问题：错误的语句不会中断后续的执行。

更可怕的是在命令行里，很可能你SQL语句包括的中文字符串会被过滤掉，变成空字符串。如：

- '创建人' -> ''
- '中英en混杂' -> 'en'

这真是血的教训😭。

我们先来看下错误是否中断的实验。

新建一个只有两行的SQL文件，其中第一行语句是错误的。
```sql
ss;
select 1;
```
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692263770642-5487130c-27ed-4e08-9e89-24755194f7ed.png)

使用导入命令：
```sql
mysql -h your-ip -u your-username -p${password} your-database < test.sql
```

提示第一行有错误，第二行未执行。这是符合期望的。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692263858957-62a01998-d47a-4fa9-b2a9-b83c5a3be764.png)

但如果连接 mysql 后，在交互式命令行里执行 source 命令：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692263665731-d9bdde27-6522-4cd3-9c82-4f5c7a0ead79.png)
错误出现并不会中断SQL的执行。
复制语句，粘贴到命令行，表现也是如此：错误只提示，不中断执行。

那么，能否在交互式命令行里执行SQL语句，一旦错误就中断呢？

我们在MySQL官方论坛里找到了相关的[帖子](https://bugs.mysql.com/bug.php?id=35634)：
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692262908887-64d86cd8-c2e9-4b50-b341-75a28a509d94.png)

最终得到的答案是，使用：\e。
进行类vi界面，在这里粘贴 SQL（这里就不会有中文被过滤的问题）
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692263386275-ba3e4365-f45e-435e-a269-05c5d92dfa16.png)
保存退出后，输入 `;`则执行 SQL 语句，Ctrl + C　则不执行。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692263595582-2f5a733e-ea75-47b1-b128-f76ecf7a1cda.png)
可以看到，这种方式执行 SQL 语句，也是可以遇到错误就中断的。
## 如果要删除错误的数据怎么办？
尽管经过测试，但也不敢说语句的执行能百分之分成功，因此，这里给个温馨提醒。

如果插入、更新了错误的数据，确实要执行 DELETE 语句，那么请做好以下 checklist:

1. 确保已备份数据
2. 删除前先查询，也即先写 select from，确认一下是目标数据，再改写成 select 改写成 delete
3. 一定要写 where 语句，并且精确到主键，最好只写类似这种语句 where id = 1 或者 where id in (1,2)

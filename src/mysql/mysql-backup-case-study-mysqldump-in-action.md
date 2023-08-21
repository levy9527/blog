---
date: 2023-08-17
tag:
- Daily
- MySQL
---

# 数据备份案例：mysqldump实战
## 背景
前面有讲[数据迁移的案例](mysql-data-migration-case-study-add-auto-increment.md)(mysql-a -> mysql-b)，其实在迁移前还少不了备份。

并且，因为不想停机迁移，因此还要新起一个数据库实例，记为 mysql-b'，复制 mysql-b 的相关数据。这样就能在 mysql-b' 里验证迁移SQL的正确性，以确保 mysql-b 能不宕机完成数据迁移。

在这种情况下，就需要用到我们今天的主角，数据备份工具 mysqldump。
<!-- more -->

## 架构
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692280572283-08eb507c-00b6-446b-bd37-cb5ecbe59531.jpeg)
注意到：

1. 从 mysql-b -> mysql-b'，就要用到工具 mysqldump
2. 关于 sql 的编写在另一文中已有提及，就不重复了
3. 只能通过跳板机在终端连接数据库实例，因此无法使用图例界面操作。
## 安装
首先要在跳板机安装 mysqldump。

如果够幸运，可以用包管理工具安装：
```shell
sudo apt update

sudo apt install mysql-client
```

```shell
sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm

sudo yum install mysql-community-client
```

如果配置有问题安装不了，可以直接下载 mysql 二进制包：
```shell
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.26-linux-glibc2.12-x86_64.tar.xz

tar -xvf mysql-8.0.26-linux-glibc2.12-x86_64.tar.xz

cd mysql-8.0.26-linux-glibc2.12-x86_64

sudo cp bin/mysqldump /usr/local/bin/
```

如果还不行，那就本地下载，然后把 mysqldump 压缩通过 scp 上传到跳板机。

有人会想，这么麻烦，为何不直接复制 mysql-b 的数据文件？这是因为：

1. 没有进入 mysql-b 宿主机的权限
2. 复制磁盘文件更麻烦，后面会讲
## 导出
导出命令很简单的，类似 mysql 客户端连接，指定用户名、表名、导出文件，再根据提示输入密码即可。
```shell
mysqldump -h ip -P port -u your_username -p your_database > dump.sql
```

![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692281767457-f40d7db4-c2d9-4589-ac46-cbea320266da.png)
然而命令行的提示，暗示事情令有玄机：

1. 首先，这样简单的命令，只能导出表数据，其他数据如触发器则并没导出
2. 其次，由于目标数据库开启了 GTID 模式(gtid_mode=ON)，导出的文件会有相关的设置
### --set-gtid-purged=OFF
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1692281766948-704c4a90-c575-4340-b596-281c74de5c44.png)
打开 dump.sql 的前 30 行，可以看到 GTIDs 的相关内容。

Here's a quick overview of how GTIDs(Global Transaction Identifiers) work in MySQL：

- GTIDs uniquely identify every transaction.
- Allow replicas to track replication positions.
- Enable failover and repointing replication.

因为 mysql-b 是主从架构的，开启 GTIDs 很正常，但我们要用来测试的 mysql-b' 是单实例的，并不需要它。
如果未正确设置，导入的时候是会报错的。

因此，在这种情况下，导出语句可以添加以下参数：
```shell
--set-gtid-purged=OFF
```

也即命令变成：
```shell
mysqldump -h ip -P port -u your_username -p --set-gtid-purged=OFF your_database > dump.sql
```

当然，也可以修改 dump.sql，把 GTIDs 相关的语句删除掉。
### --ignore-table
导出的文件可能会很大，而如果我们要把文件在不同的机器之间传输，这就会让过程变得很慢。此时，我们希望导出的文件越小越好。

我们利用以下 SQL来确认下，目标库中到底是哪些表占据了较大的存储空间：
```sql
SELECT table_name, 
       ROUND(((data_length + index_length) / (1024 * 1024)), 2) AS "Data Size (MB)"
FROM information_schema.tables
WHERE table_schema = 'your_database'
ORDER BY (data_length + index_length) DESC
```

接着我们根据业务，分析哪些表的数据是必要的，哪些表的数据可以不用导出。添加以下参数把不需要导出的表忽略掉：
```shell
--ignore-table
```

示例命令：
```sql
mysqldump -u your_username -p your_database --ignore-table=table_name1 --ignore-table=table_name2 > dump.sql
```
注意：该参数一次只能忽略一张表，故忽略多张表需要声明多次。
## 导入
导入命令类似导出，只不过此时使用的是 mysql　客户端，并且重定向符号不同。
```shell
mysql -u your_username -p your_database_name < dump.sql
```
## 为什么不?
现在来回答为什么不直接复制MySQL的磁盘文件。

根据前面我们知道，也许我们的需求是部分备份，而不是全量备份，则直接拷贝磁盘文件，在数据量大的情况下，只会造成传输负担，反而“欲速则不达”。

另外，复制磁盘文件，为保证数据一致性，要求MySQL必须停止运行。主要有以下原因：

1. **Ative Transactions:** Copying database files directly may lead to data inconsistency if there are active transactions or changes happening in the database while the files are being copied. 
2. **Flush and Sync:** The MySQL server may buffer data in memory and write it to disk periodically. When you copy files directly, you may capture data that is in memory and not yet written to disk.
3. **File Locks:** Some storage engines, such as MyISAM, may use file-level locks, which can prevent you from copying files while the server is running. InnoDB, on the other hand, uses a different mechanism (tablespace files), but copying InnoDB files still carries the risk of data inconsistency.

因此，纵然有直接复制MySQL磁盘文件的奇技淫巧，还是不建议使用，我就也不向大家展示了。

---
date: 2024-05-29
tag:
- llm
---

# 大语言模型赋能备案审查
## 业务背景
备案审查是指规范性文件在制定颁布后，按法定期限报同级或上一级人大常委会备案，由接受备案的人大常委会在法定期限内依照法定标准和程序对其进行监督审查的活动。
在这个过程中，最重要的就是确保下位法不会与上位法相抵触。
因规范性文件众多，而具备审查资格的专家又极少，故工作进程较为缓慢，现期望借助AI的能力，提高效率。
## 核心流程
![](https://raw.gitmirror.com/levy9527/image-holder/main/1716934384864-e8f15645-a3a7-4986-8610-f964433eb8f7.png)
## 项目难点

1. 海量文件，必须自动化分片，不可能人工处理，也即手工插入分隔符是不可行的

解决方案：写代码处理

2. 通过下位法法条，能找到对应的上位法法条

解决方案：在分片质量有所保证的提前下，在常规语义检索的基础上，通过结构化数据筛选，提高匹配率

3. 判断下位法是否与上位法相抵触

解决方案：参考经典案例，学习其判断逻辑；指示AI，无法判断时不要乱下结论。
## 经验总结
数据很重要，一定要了解业务数据。

数据要分类：

1. 参考的数据要与验证的数据区分开来。一定要在前期就找客户要参考案例，并问清楚如何验证。问清楚后，要么让客户给验证数据，要么自己造验证数据，千万不能连怎么验证都不知道就动手。
2. 基于场景分类，如下位法对上位法范围扩大、范围缩小，它们就要区分开来。
## 参考资料
[什么是上位法](https://baike.baidu.com/item/%E4%B8%8A%E4%BD%8D%E6%B3%95)
[论大语言模型在规范性文件备案审查中的应用](https://wap.zuel.edu.cn/2023/0615/c1236a337820/pagem.htm)
[备案审查案例选编](https://www.gdpc.gov.cn/gdrdw/rdzt/bascalxb/)
![](https://raw.githubusercontent.com/levy9527/image-holder/main/1716934571936-866c2e58-59e4-4c4a-aae6-4c2b54624d7d.png#averageHue=%23f8f3f1&clientId=ue4d82166-db4f-4&from=paste&height=385&id=u86ef6742&originHeight=578&originWidth=1397&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=168640&status=done&style=none&taskId=ud877cee2-9be7-4ce6-a968-98c30e15f45&title=&width=931.3333333333334)

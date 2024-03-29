---
date: 2023-08-03
tag:
- Linux
- DevOps
- Video
---

# sh与bash的区别

结论：如果可移植性很重要，那么应该使用 sh！一般编写 Dockerfile　时，有关的脚本优先使用 sh。

常见问题：明明是存在的、可执行的shell脚本，却在容器报错 `No such file or directory`，很可能是因为shell脚本开头声明了bash，但容器里只能执行 sh。

<!-- more -->

视频里有实战演示：
<BiliBili bvid="BV1Dj411676U" />

以下是 ChatGPT 的相关回答：
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1691066962763-bfbe3c1a-cb4f-43bc-b181-062eabee9529.png#averageHue=%23e4e5e7&clientId=ue1ff8f12-10ba-4&from=paste&height=196&id=u6521b3f3&originHeight=392&originWidth=1428&originalType=binary&ratio=2&rotation=0&showTitle=false&size=235208&status=done&style=none&taskId=uef2009af-bd00-4e0e-a215-9cca4c37ed2&title=&width=714)
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1691067007160-ec9a619b-be1c-4947-9dfc-6578d7b95003.png#averageHue=%23e5e6e8&clientId=ue1ff8f12-10ba-4&from=paste&height=116&id=u443ed474&originHeight=232&originWidth=1354&originalType=binary&ratio=2&rotation=0&showTitle=false&size=75155&status=done&style=none&taskId=u999f43f5-eb71-425d-8651-fbe5098a7c9&title=&width=677)
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1691067065982-c0370621-ff74-41e2-a435-b21973c64be4.png#averageHue=%23e3e4e6&clientId=ue1ff8f12-10ba-4&from=paste&height=170&id=u00ae3745&originHeight=340&originWidth=1382&originalType=binary&ratio=2&rotation=0&showTitle=false&size=116797&status=done&style=none&taskId=u563107c4-dbc5-464b-bb87-ab1c1dea427&title=&width=691)
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1691067101217-a60e6bd8-600c-4c68-89d0-53675a11442c.png#averageHue=%23e5e5e8&clientId=ue1ff8f12-10ba-4&from=paste&height=118&id=u1559e5c7&originHeight=236&originWidth=1370&originalType=binary&ratio=2&rotation=0&showTitle=false&size=77383&status=done&style=none&taskId=u846749a0-6dcb-429b-ad44-0d6e77dea00&title=&width=685)


---
date: 2023-08-02
tag:
- Daily
- Linux
- Docker
---
# 关于 Arm 你需要了解的三件事

Arm 是另一种CPU架构（CISC），与常见的 x86 有所不同（RISC）。

跟我们有什么关系呢？
1. MacOS 的 M1 芯片是基于 Arm 的
2. 云厂商及生态都在积极与 Arm 进行合作
3. Docker 镜像的构建有注意事项

构建镜像时，为 Arm 平台构建镜像时，常见的问题：`exec user process caused: exec format error`。
这是因为试图在 x86 机器上执行对平台有依赖的命令，如 shell 命令。
![](https://cdn.nlark.com/yuque/0/2023/png/160590/1690980143888-a9ffdab2-8be1-4463-84ef-d83be1c6d6c5.png)

解决办法就是，想办法把相关命令前置，提前执行，再构建镜像。

如注释掉 Dockerfile 里的　`Run chmod 777`，改成在构建镜像前执行。
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/2023-12-17-zfOoTC.png)

视频里有更详细的讲解：
<BiliBili bvid="BV1Eu4y1m75X" />

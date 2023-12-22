---
date: 2023-12-09
tag:
- DevOps
- Python
---

# 缩减Python应用的镜像体积 

## 背景
当你为 LLM 应用构建镜像时，发现整个过程很慢，一看镜像体积：好家伙，1.76 G！
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1701851964516-fbd3eb62-111f-4e94-b8d6-2948a974a0ac.png)
能不能减少镜像体积，缩短打包时间啊？本文将分享两招实用的技巧，让 Python 应用的镜像体积减少 50%。

<!-- more -->

## 原始Dockerfile
先来看看 Dockerfile 的原始模样：
```shell
FROM python:3.10.13

WORKDIR /app

COPY requirements.txt .

RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt --ignore-installed

COPY . .

ENV HOST=0.0.0.0
ENV LISTEN_PORT 8000
EXPOSE 8000

CMD ["chainlit", "run", "app.py", "--no-cache"]
```
## 使用slim镜像
最简单快捷的优化方式，是修改第一行代码，使用 slim 镜像。
```shell
FROM python:3.10.13-slim
```
重点是：为什么用 slim，而不是 alpine？

这里我们就要搞清楚，Alpine 是 Linux 众多发行版中的一员，与 CentOS、Ubuntu、Archlinux 之类一样，只是一个发行版的名字，主打一个小巧安全。

然而，alpine 镜像有一个陷阱，它使用的标准库与大多数发行版不同，它使用的是 `musl libc`，与常用的标准库 `glibc`并不兼容。

而在 alpine 镜像中，使用 Wheel 文件(后缀为 .whl) 安装 Python 依赖时，可能会出现兼容性问题，因为 Wheel 会与 C 语言的扩展库有关联，而这些 C extensions 不一定与 `musl libc`兼容，尤其是使用到了 NumPy、 Pandas 的时候。

那么为什么 slim 镜像又可以呢？因为 slim 镜像是基于 Debian 的, 使用的是 `glibc`，通过删除了许多非必需的软件包方式，优化了体积。

因此，在 Python 中，最稳妥的做法是，做 slim 镜像，而不是 alpine。
## 减少层数、取消本地缓存
来看这两行代码：
```shell
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt --ignore-installed
```
安装依赖，应该一步到位，我们可以把这两行压缩成一行，以减少 docker layer 数量。

另外，pip 安装依赖时，会在本地生成缓存，而这对于镜像来说是无用的，可以添加参数 `--no-cache-dir`禁止此行为。

则上述两行代码优化如下：
```shell
run pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip && \
    pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --ignore-installed --no-cache-dir -r requirements.txt
```
## 优化效果
第一次优化，使用 slim 镜像：
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1701851939395-45a1f231-9075-4d41-b71e-b4eeaf53136e.png)

第二次优化，减少层数、取消本地缓存：
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1701853194080-cb829a4a-b778-4b19-b221-6b6896252223.png)
小小的改动，大大的变化！
## 参考
[https://icloudnative.io/posts/intro-guide-to-dockerfile-best-practices/](https://icloudnative.io/posts/intro-guide-to-dockerfile-best-practices/)
[https://icloudnative.io/posts/docker-images-part2-details-specific-to-different-languages](https://icloudnative.io/posts/docker-images-part2-details-specific-to-different-languages/#jdk-vs-jre)
[https://www.ardanlabs.com/blog/2020/04/docker-images-part3-going-farther-reduce-image-size](https://www.ardanlabs.com/blog/2020/04/docker-images-part3-going-farther-reduce-image-size.html)


---
date: 2023-08-26
tag:
- Java
- Daily
- Video
---

# 升个jar版本，怎么这么难？

## 前言
无论是 C/S 还是 B/S 模式下的应用通过是 API 来交互的。而 API 的消费者与提供者，可以看成一枚硬币的正反面。

通常来说，对 Web 应用而言，前端是消费者，后端是提供者。

今天就站在服务提供方的视角来看下，升级依赖版本，遇到的难点有哪些？

<!-- more -->

## 接口调用示意图
![](https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1693060849195-8f65efab-8c15-4731-bf8e-10645785f0f5.jpeg)

## 已知信息

1. common.jar 的版本是 1.0.0-SNAPSHOT，实际上 common.jar 的最新稳定版已经是 5.x 了。比较了下版本内容，发现二者是不兼容的。
2. 公司有多个业务系统依赖 infra-service，但它们隶属于别的团队

## 问题
infra-service 的某个接口，现在要修改，多返回一个字段，但因为之前的代码健壮性不够，新接口　common.jar 处理会报错。

于是，想通过让使用方升级 jar 来解决，此方案可行吗？

答案可能出乎意料：不行！

因为：jar 升级版本的动作不在自己的掌控范围内。

说起来很简单：叫他们升一下就行。
但问题是：

1. 他们是谁？
2. 你说升就升？

问题本身在技术层面很简单，但在现实的执行层面，有着超出技术范畴的难点。这便是服务提供者，需要面对的。而这是作为服务的消费者，容易忽视的一点。

## 复盘
那么，在技术层面，是否能做得更好，避免重蹈覆辙呢？其实是可以的。

有两种思路：

1. 只对外发布稳定版，要么强制自己的接口一直向后兼容；要么一旦有接口不兼容，在保留旧接口的情况下，发布新接口、新 jar。
2. 利用好 SNAPSHOT 版本 jar 会不断覆盖的特性，同时对外发布 1.0.0-SNAPSHOT 版本，以及每次迭代的稳定版。也即，通过使得 1.0.0-SNAPSHOT 永远与最新的稳定版本相同，让使用者及时升级。

<BiliBili bvid="BV18G411d7gR" />





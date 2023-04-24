# Git最佳实践
## 精简提交
一次只提交一个“瘦”的功能，同时只包含相关改动文件。例如，对于两个错误的修复应该进行两次不同的提交。
如果发现写提交信息时，需要写两点以上;  则可以考虑拆分提交。

## 频繁提交
一次提交应只对应一个“瘦”的功能。从而达到频繁提交的目标。
经常性地提交改动可以确保不会出现特别庞大的提交，同时也可以比较精准地对应到所需要的改动上。

此外，通过频繁地提交也可以比较快速地和其他开发人员来共享你的改动。同样也会避免在整合代码时出现过多的合并冲突。相反的，非常庞大的提交会加大整合代码时出现冲突的风险，解决这些冲突也会非常复杂。

## 不要提交不完整的改动
虽然原则上来说不要提交一些还没有完成的改动，但是对于一个非常庞大的新功能来说，也并不意味着你必须整体完成这个功能后才可以提交。恰恰相反，你必须把那些改动正确地分割成一些有意义的逻辑模块来进行频繁地提交。

如果你仅仅是因为急着想要下班，或者是想要得到一个干净的工作副本（比如想要切换到另一个分支上），你可以利用 Git 所提供的储藏（Stash）功能来解决这些问题。切记不要把那些不完整的改动提交到仓库中。
## 提交前测试那些改动
不要理所当然地认为自己完成的改动都是正确的。所有的改动一定要通过彻底地测试才表示它真正地被完成了。
## 版本控制不是备份系统
版本控制系统具有一个很强大的附带功能，那就是服务器端的备份功能。但是千万不要把 VCS 仅仅当成一个备份系统。特别需要注意的是，只能提交那些有意义的改动。

## Github实例
### 一个功能对应一个分支
下面是好的示例： 格式化代码，也应该单独一个PR![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344980430.png)
下面是不好的示例：因为一个PR修改了不同的主题内容
![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344985874.png)
![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344990582.png)
### 提交“瘦”的PR
参考文章：[https://deliveroo.engineering/2017/09/06/play-pull-request-roulette.html#ideas-to-make-your-prs-more-review-friendly](https://deliveroo.engineering/2017/09/06/play-pull-request-roulette.html#ideas-to-make-your-prs-more-review-friendly)
其中最重要的一点：不要一次提交一个很大改动的PR，否则别人很难 review，要学会拆分步骤。
下面是一个 PR 示例：
拆分前，包含了35个改动，很难 review![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344998899.png)

下图是拆分后：![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345004360.png)

单个PR的改动文件只有11个
![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345009991.png)每个 PR 改动的文件少了，这样 review 起来就更容易了。
### 使用正确的标题
[相关规范看这里](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

另外，请回答：出于什么原因需要进行这次修改？具体改动了些什么？

- 使用一定要使用现在时祈使句（例如要使用 change ，而不是 changed 或 changes）。
- 优先使用正面肯定语句，而不是否定句。

好的示例：`docs: extraQuery 的正确使用方法`
不好的示例：`docs: 更新不直观的例子`

### 根据模板填写PR描述
这是我们 Github 的 PR 模板，融合了我们的最佳实践![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345014045.png)
下面是实际的好的例子![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345019293.png)

### 自动关闭issue
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345024941.png)

```bash
git commit -m 'fix #6'
# 或
git commit -m 'close #6'
```

当pr合并时，将自动close issue

### 1+2 review 规则
1 是指发起 PR 的人，2 是指进行 code review 的人。也即，每一个 PR，至少要经过两个团队成员 approve 才能合并。
> 上面是针对 github 的协作，项目组中可酌情变为 1+1 规则

![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345031945.png)
![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345036964.png)
### 礼貌提问
在 github 向人提问时，需要有礼貌。当提出 feature request时，还要说明自己的情况，尽可能提供更多的信息给对方。
![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682345041577.png)
上面的示例有三个重点：

1. 开头表达感谢
2. 中间说明己方的使用情况，并给出相应链接
3. 最后参考业界已有实现，给出一个方案设想，并给出相应链接

## 学习资源

- [Pro Git](https://git.oschina.net/progit/)
- [https://learngitbranching.js.org](https://learngitbranching.js.org/?NODEMO)

---
date: 2023-05-06
tag: English
---

# 让 ChatGPT 成为你的外语私教
## 前言
有了 ChatGPT 后，练习外语口语的门槛再次降低，没有外语环境再也不是问题了——AI 就是你的专属私教。

本文将分享借助 AI 进行口语练习的一些工具、方法与实践经验，仅供参考。

## 准备工作

在开始之前，要准备好几样东西：

0. [ChatGPT](https://chat.openai.com/), 如果没有账号或不能上网，请查看[上网教程](../tools/how-to-connect-to-internet.md)
1. [Chrome 浏览器插件 voice-control-for-chatgpt](https://chrome.google.com/webstore/detail/voice-control-for-chatgpt/eollffkcakegifhacjnlnegohfdlidhn)
2. 口语练习题，根据个人需求查找即可，下文将以[雅思](https://liuxue.koolearn.com/ielts/speak-1-44-0/)为例进行说明

安装好插件后，打开 chatGPT 界面，下方就会出现语音输入按钮。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211581972.png)

## 常用Prompt

下面总结了常用的 Prompt，可以有根据需要进行使用或调整。

设置角色：

1. Please act as an English teacher.
2. Please act as an English-speaking test examiner.
3. Please act as IELTS speaking test examiner.

进入一问一答模式：

1. You're supposed to asked me questions and wait for my answer. The next question is: xxx

对回答进行完善：

1. Please revise my answer
2. Please modify my answer to make it more fluent

对回答进行评分：

1. Please rate my answer

## 进行对话

第一句话，是设置好 AI 的角色，让它扮演口语考官。

可以使用以下 prompt:

```markdown
act as an English-speaking test examiner
```

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211593449.png)
可以看出，语音转文字出现错误，单词 IELTS 始终未能正确识别，但 ChatGPT 却能明白其中的意思。

开启语音插件的意义在于，如果语音识别不了自己说的话，很有可能是自己的发音有问题，起到提醒自己纠正发音的作用。另外，ChatGPT 回复的文字，也会转换成语音输出，顺便练习了听力。

根据练习材料，让 AI 问自己问题。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211601688.png)
记得让 AI 对自己的回答评分，可以使用以下 prompt：
```markdown
please rate my answer after I answer the question each time
```
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211608559.png)

进行下一个问题：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211615610.png)
上述回答不太好，AI 给出了理由：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211861818.png)

修改后再回答，有所进步
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211906368.png)

再问下一个问题：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211920743.png)
这个回答同样不理想，但看了提示也不知道要怎么改：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211928334.png)

此时可以新建一个聊天窗口，让 AI 提供示例回答：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211938210.png)

根据示例答案，结合关键词，重新组织语言，切换回原聊天窗口，再回答一次：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211955902.png)
有所进步！

有时对话长了，AI 会“糊涂”如下所示：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683373370527.png)

此时要重新强调它扮演的角色，让其回忆起上下文，可以使用以下 prompt:
```markdown
focus on the speaking test and assume that you ask me this question
```
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683373376359.png)

除此之外，就没啥值得注意的了。重复上述过程，不断练习即可。

## 记录回答
做完了练习，还要作笔记。但在记录回答之前，还要润色一下，毕竟口语表达的时候，可能会存在语法错误。

进入 [https://quillbot.com/](https://quillbot.com/)，把答案复制上去，先进行语法检查：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211964246.png)
再进行流畅度润色：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/english/1683211997332.png)
最后保存到笔记本上即可。

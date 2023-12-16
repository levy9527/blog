---
date: 2023-12-15
tag:
- Python
- Testing
- Gitlab
---

# 使用pytest为LLM应用添加回归测试

## 回归测试的必要性
基于 LLM 的 Chat 应用大量依赖了 Prompt Engineering，而用户的输入又千奇百怪，调整了 Prompt 模板，很可能会有意想不到的效果：满足了新需求，却破坏了旧功能。

因此，LLM应用比任何时候都需要回归测试，确保在迭代过程中，不破坏旧功能、不让已修复的bug复现。

而回归测试，当然是自动化执行效率才高。本文交分享如何使用 pytest 对 LLM 应用进行自动化的回归测试。

<!-- more -->

## pytest
### 安装
pytest 的安装就有坑，如果是使用虚拟环境 `venv`，安装姿势不正确的话，就会在执行测试用例的时候报错：`ModuleNotFoundError: No module named xxx`，具体原因参考[这篇文章](https://medium.com/@dirk.avery/pytest-modulenotfounderror-no-module-named-requests-a770e6926ac5)。

正确的安装步骤：

1. 新开一个 bash 终端
2. pip uninstall pytest # 删除全局的 pytest
3. cd xxx && source ./venv/Scripts/activate # 激活虚拟环境
4. pip install pytest # 在虚拟环境中安装 pytest
5. pytest # 启动测试
### 配置
在项目根目录新建 pytest.ini 文件，最简单的配置如下：
```shell
[pytest]
log_cli = 1
log_cli_level = INFO
```

更多的配置可参考[文档](https://docs.pytest.org/en/stable/reference/customize.html)。
### 用例
pytest 会自动收集测试用例，要求用例满足以下规范：

1. 文件名以 test_ 开头，如：test_intention.py
2. 用例名以 test_ 开头，如：def test_my_method():

为避免加载不到自定义的函数，需要包含以下代码：
```python
import os
import sys
# 确定当前目录的位置
current_dir = os.path.dirname(os.path.abspath(__file__))
# 找到上级目录的路径
parent_dir = os.path.dirname(current_dir)
# 将上级目录路径添加到sys.path
sys.path.append(parent_dir)
```

给个实际的例子：
```shell
import logging
from langchain.chat_models import ChatOpenAI

import os
import sys
# 确定当前目录的位置
current_dir = os.path.dirname(os.path.abspath(__file__))
# 找到上级目录的路径
parent_dir = os.path.dirname(current_dir)
# 将上级目录路径添加到sys.path
sys.path.append(parent_dir)


# 辅助函数
def check_intention(question, expected_intention_type):
    intention_recognition_list = handle_intention_recognition(
        llm=llm, question=question)

    intention_recognition = intention_recognition_list.intentions[0]
    intention_type = intention_recognition.type
    logging.info(f'question: {question} intention: {intention_type}')
    
    assert intention_type == expected_intention_type
    
# 测试用例
def test_check_indicator():
    questions = [
        '31999587库存情况？',
        '31999587库存情况',
        '31999587库存',
        '商品73206430的库存情况？',
        '商品63890590的采购信息？',
        '商品51998031的进货信息？',
        '52067610的铺店率是多少？',
        '18323188的累计采购量与累计销售量是？',
    ]
    for question in questions:
        check_intention(question, IntentionType.CHECK_INDICATOR)

```

在终端激活虚拟环境后，执行 `pytest`即可运行上述用例。

如果只想执行单个文件，则指定文件名即可：
```shell
pytest test/test_intent.py
```

如果想出错马上退出，带 -x 参数即可：
```python
pytest test/test_intent.py -x
```
## 持续集成
经过上述的步骤，我们可以在本地对自己的改动进行自动化的回归测试，但这还不够——因为有可能别人修改了代码，却不进行自测！

所以，我们还需要借助 CI 工具，在有人往代码仓库中提交改动后，立刻执行一次回归测试。

以 Gitlab CI 为例（点击查看[安装教程](https://levy.vip/git/gitlab-ci.html)），`.gitlab-ci.yml` 文件如下：
```yaml
image: python:3.10.13-slim

stages:
  - test
  - build

pytest:
  stage: test
  script:
    - pip install -i https://pypi.tuna.tsinghua.edu.cn/simple --upgrade pip && pip install -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
    - pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pytest
    - pytest -x
  tags:
    - your-gitlab-runner
    
build-and-push:
  image: docker:stable
  stage: build
  script:
    - chmod +x ./build-image.sh
    - ./build-image.sh
  tags:
    - your-gitlab-runner
```

提交代码后就会触发自动化测试、构建镜像并推送。效果截图如下：
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702014482966-9391b0d1-906b-4c23-b74b-41c1a2dcc305.png)
![](https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702014525088-10240012-bad2-4b94-a06d-154adb3f1186.png)




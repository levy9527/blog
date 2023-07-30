---
date: 2023-05-07
tag: 
- Node.js
- Python
- Testing
---

# 下一代 UI 自动化测试工具 Playwright
## 前言
Playwright 是微软于 2020 年发布的一款 E2E testing 工具，跟社区成熟的 Cypress 相比，稍显年轻。然而 Playwright 的主要优势有：

1. 支持多语言：Node.js、Java、Python，也即它并非是前端工程师专属的工具
2. 开箱即用的代码生成功能（Cypress 现在也支持，不过要修改配置或安装插件）

另外，Playwright 的安装没什么门槛，不像 Cypress 可能需要黑魔法。

综上所述，笔者认为 Playwright 是值得在研发过程中引入的一款测试工具，它可以帮助研发、测试团队较平滑地走上自动化测试之路。它适用的典型场景之一，就是做回归测试——测试人员再也不用在界面上使用鼠标进行“点点点”，解放双手，提高测试效率。
## 安装
```shell
yarn create playwright
```
根据命令提示，输入如下：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683274667037.png)
默认会下载所有浏览器，如果没有浏览器兼容性测试的需求，推荐如上图所示，手动安装一个浏览器。

以安装 chromium 为例，相应操作步骤如下：

1. 修改配置 
```shell
vi playwright.config.ts
```
注释掉以下内容：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683274759403.png)

2. 安装浏览器
```shell
yarn playwright install --with-deps chromium
```
等待一段时间即可，如果失败，请重试。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683274769748.png)

推荐再安装 [VS Code 插件](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)，获取更好的使用体验。
## 使用
### 代码生成
虽然可以参考 `example.spec.ts`去编写测试用例，但这不是 Playwright 独特之处。Playwright 最引入注目的，是代码生成功能。
```shell
yarn playwright codegen
```

上述命令会打开两个浏览器窗口：

1. 一个是普通的浏览器界面
2. 另一个是代码生成界面，在前一个窗口进行的任何操作，都会生成相应的代码

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683275050705.png)
虽然默认生成代码是 Javascript，但可以选择切换语言：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683275136008.png)
注意到可以生成 Pytest 的代码，对测试工程师来说，简直是福音。这也提示我们，Playwright 既可以由前端研发来使用，也可以由测试人员来使用，并不限制使用者的职业身份。

点击"Copy"按钮
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683276292010.png)
然后打开代码编辑器，把代码复制进去即可。

点击"Clear"按钮，
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277483800.png)
可以清空本次操作生成的代码，从而开始进行下一次操作的代码生成。

如果是使用 VS Code 插件，点击"Record new"即可。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277490131.png)
### 修改代码
生成的代码，最好还是检查一下，也许需要去掉一些多余的操作记录。
如下面的代码，`Tab`的操作只是人工操作时为了方便而进行的按键，对机器而言，是多余的，应该去掉。
```javascript
test('login', async ({ page }) => {
  await page.goto('http://172.16.202.6:3000/#/login');
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('username');
  //await page.getByRole('textbox').first().press('Tab');
  await page.getByRole('textbox').nth(1).fill('code');
  //await page.getByRole('textbox').nth(1).press('Tab');
  await page.locator('input[type="password"]').fill('password');
  await page.getByRole('button', { name: '登录' }).click();
});

```

如果想基于现在的测试代码，继续生成新的代码，可以使用 VS Code：

- 把光标放到测试用例的最后一行
- 点击"Record at cursor"，即可继续录制

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277555357.png)
### 执行用例
```shell
yarn playwright test
```
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277566741.png)
如果用例失败了，想查看到底哪里错了，可以用以下命令显示浏览器，查看用例执行过程：
```bash
yarn playwright test --headed
```

如果是使用 VS Code，直接点击运行用例即可。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277575650.png)
勾选左下角的"Show broswer"，即可显示浏览器。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277598218.png)
### 调试用例
对于失败的用例，如何 debug呢？添加 --debug 参数即可。
```shell
yarn playwright test --debug
```

点击"Step over" 即可执行下一行代码。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277605265.png)

如果是使用 VS Code，找到相应的用例，右键出现"Debug Test"，点击即可。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277678957.png)
### 查看报告
在执行完用例后，本地会生成目录 `playwright-report`，可以通过以下命令查看测试报告
```shell
yarn playwright show-report
```
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277713874.png)
## 常见场景与解决方案
### 应用登录
下面给出一个自动登录、并保存用户数据的解决方案。

先创建文件夹，并让 git 忽略它
```bash
mkdir -p playwright/auth
echo "playwright/auth" >> .gitignore
```

创建 login.ts
```javascript
import { chromium, expect, FullConfig } from '@playwright/test';

async function login(config: FullConfig) {
  console.log('setting up')
  const { storageState } = config.projects[0].use
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 这里执行登录操作
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox').first().fill('user');
  await page.locator('input[type="password"]').fill('pass');
  await page.getByRole('button', { name: '登录' }).click();

  // 等待成功
  await expect(page.getByRole('button', { name: '登录' })).not.toBeVisible()
  // End of authentication steps.

  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default login
```

修改 playwright.config.ts
```javascript
export default defineConfig({
  globalSetup: require.resolve('./login'), // 添加这一行
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'playwright/auth/user.json', // 添加这一行
      },
    },
  ]
})
```
### 本地测试与线上CI
使用环境变量配置 baseURL 即可。

修改 playwright.config.ts
```javascript
require('dotenv').config()

export default defineConfig({
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ? process.env.PLAYWRIGHT_BASE_URL : 'http://127.0.0.1:3000',
  },
})
```
### 超时时间
默认的超时时间不太够用，建议修改 playwright.config.ts:
```javascript
export default defineConfig({
  timeout: 5 * 60 * 1000, // 单个用例的超时时间
  expect: {
    timeout: 10 * 1000, // expect 语句的超时时间
  },
})
```
同时要注意拆分用例，没有依赖关系的用例建议拆分开来，避免用例执行时间过长超时。

### 元素选择
人们对元素选择的第一反应是使用 CSS 或 XPath，但 Playwright 并不鼓励这样使用，因为这些选择器容易改变。较为好的办法是，为测试元素添加专门的属性 testid，如下所示：
```html
<div data-testid="my-div"></div>
```
然后通过下列方式进行选择：
```javascript
await page.getByTestId('my-div').click()
```

当然，这种方式会对源代码有侵入。更为折衷的方式是，优先使用下列[官方推荐的方法](https://playwright.dev/docs/locators#locate-by-role)进行元素选择，最后再使用业务 class，
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277746417.png)

这里值得一提的是，业务class是针对 Tailwind CSS 这种“解构主义”的纯样式class而言的。你会发现，如果全是 Tailwind 的class，没有业务样式，E2E测试代码很不好写。

如果是使用 VS Code，有辅助办法：
1. 点击“Pick locator”
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683421157907.png)
2. 切换到浏览器界面，点击目标元素
3. 切回 VS Code，即可看到相应的元素选择代码
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683421163861.png)

### 声明断言 && 检查元素是否存在
生成的代码是没有断言的，因此，很有可能页面报错了，用例执行报告仍然显示成功。为避免这种情况，每个用例至少要有一句断言。

常用的断言是，检查某一元素是否存在：
```javascript
await expect(page.locator('.selected-item')).toHaveCount(1) // 1 代表相应的元素数量
```
当然也可以用以下方法，这取决于元素是否可见（元素存在，未必可见）。
```javascript
await expect(page.locator('.selected-item')).toBeVisible() 
```

注意，Node.js 才可以在 locator 里写 CSS 选择器，如果是 Python, 需要这样写：
```python
await expect(page.query_selector('.selected-item')).toBeVisible() 
```

更多断言写法，参考[官方文档](https://playwright.dev/docs/writing-tests#assertions)。
### 获取第n个元素
通过定位器得到的元素可能不止一个，可以使用以下代码获得具体某一个元素：
```javascript
page.locator('.my-class').nth(0); // n 从 0 开始算起
```
### 遍历元素
使用定位器后，调用`.all()`
```javascript
for (const row of await page.getByRole('listitem').all())
  console.log(await row.textContent());
```
### 获取元素属性
```javascript
await page.getAttribute('href')
```
### 判断子元素数量
使用 `$` 及 `$$` [元素选择器](https://playwright.dev/docs/api/class-elementhandle#element-handle-query-selector)
```javascript
const hiddenColumns = await page.$('.table-section .hidden-columns');
expect(await hiddenColumns.$$('*')).toHaveLength(0)
```

### 鼠标悬浮
有些元素是在鼠标悬浮时才显示或创建的，可以使用以下代码
```javascript
await page.locator('.my-class').hover() // 模拟鼠标悬浮事件
await page.locator('.my-class .hover-element').click() // 点击悬浮后显示的元素
```
这里有个问题，自己怎么知道悬浮后显示的元素是否正确地定位到了呢？可以通过下面的小技巧：

1. 切换到 codegen 打开的浏览器页面
2. 打开网页控制台（按F12)
3. 鼠标悬浮在目标元素上面，然后右键，如下图所示

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277759344.png)

4. 点击控制台内部，则此时元素不会丢失 hover 状态，如下图所示

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277780882.png)

5. 切换到 VS Code

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277793308.png)

### 操作剪贴板
读写剪贴板需要设置权限，下面给出一个判断是否成功从剪贴板获取特定文本的测试用例：

```javascript
  test('clipboard', async ({page, context}) => {
    context.grantPermissions(['clipboard-read'])
    await page.goto('www.my-home.com');

    await page.getByRole('button', { name: 'Copy' }).click()
    const copyText = await page.evaluate(() => navigator.clipboard.readText())
    await expect(copyText.indexOf('text from copy!') > -1).toBeTruthy()
  })
```

## 持续集成
以 Gitlab CI 为例，说明 Playwright 如何集成进 CI 流水线中。其他方式如 Jenkins，请[参考文档](https://playwright.dev/docs/ci#jenkins)。

首先确保已安装 Gitlab Runner 并成功注册，具体操作可以参考[安装文档](https://levy.vip/docs/git/gitlab-ci.html#%E5%AE%89%E8%A3%85gitlab-runner)。

端对端的测试耗时较长，并且对环境的稳定性有要求，作为回归测试的实践时，一般倾向于借助定时任务跑测试用例。

新建调度：
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683436020492.png)
设置调度时间及环境变量：

- 每 6 小时跑一次
- e2e 环境变量的值为 true

![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683436027996.png)

现在可以开始编写 .gitlab-ci.yml，下面只给出测试相关的配置。
```yaml
image: node:lts # it doesn't matter because playwright will use another image

cache:
  paths:
    - node_modules/

stages:
  - test

e2e:
  stage: test
  tags:
    - your-runner-name
  rules:
    - if: '$CI_PIPELINE_SOURCE == "schedule" && $e2e'
  image:
    name: mcr.microsoft.com/playwright:v1.33.0-jammy
    entrypoint: ['/bin/bash', '-c', 'ln -snf /bin/bash /bin/sh && /bin/bash -c $0' ]
  script:
    - yarn --frozen-lockfile --ignore-engines
    - yarn playwright install --with-deps chromium
    - yarn playwright test
```


注意点：

1. entrypoint 解决的是 [shell not found](https://gitlab.com/gitlab-org/gitlab-runner/-/issues/27614) 问题
2. --ignore-engines 可以在不修改源码的情况下避免安装失败
3. 只有定时调度才会触发该任务的执行

再修改 Gitlab Runner 的配置，解决[yarn命令无法运行](https://github.com/nodejs/help/issues/1754#issuecomment-1260462271)的问题：
```shell
vi /srv/gitlab-runner/config/config.toml
```

根据 token 找到对应的 Runner 配置，按照下图所示，把红框处的值设置成 `true`
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277800200.png)
config.toml 里面可能会有多个 Runner 配置，如何找到要修改哪一个呢？
可以在项目界面，根据下图所示的 token（w8exPBfA） 去查找。
![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-test/1683277808112.png)

修改完后，重启 Gitlab Runner
```shell
docker restart gitlab-runner 
```

最后，使用 Chromium 可能会出现内存超出限制的问题，需要对 Docker 设置 --ipc=host，配置 .gitlab-ci.yml 如下：
```yaml
services:
  - name: docker:dind
    command: ["--insecure-registry", "registry.example.com", "--storage-driver=overlay2", "--iptables=false", "--ip-masq=false", "--ipv6=false", "--fixed-cidr=10.0.0.0/8", "--fixed-cidr-v6=fc00::/7", "-H", "tcp://0.0.0.0:2375", "-H", "unix:///var/run/docker.sock"]
    ipc: host
```
## 其他
### **setup.py bdist_wheel did not run successfully**
Python安装时，可能会再现此错误。解决方案如下：
```python
pip install cmake
# or 
pip3 install cmake

```
之后，再安装
```python
pip install wheel setuptools --upgrade
# or
pip3 install wheel setuptools --upgrade
```
最后，重新安装Playwright即可
```python
pip install playwright
# or
pip3 install playwright

```
```python
playwright install --with-deps chromium
```

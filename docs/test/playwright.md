# 快速上手 E2E 测试工具 Playwright
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
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682583539639-102ce298-492d-4f93-bf49-8188809b0f5e.png#averageHue=%230e0b08&clientId=u082820f0-a203-4&from=paste&height=133&id=u093ed00c&originHeight=200&originWidth=880&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=25585&status=done&style=none&taskId=ud944b4da-cc1f-43a4-81fd-f0e1304c1fb&title=&width=586.6666666666666)
默认会下载所有浏览器，如果没有浏览器兼容性测试的需求，推荐如上图所示，手动安装一个浏览器。

以安装 chromium 为例，相应操作步骤如下：

1. 修改配置 
```shell
vi playwright.config.ts
```
注释掉以下内容：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682583882950-cafa14a0-a55b-4b5e-af88-f0a4c31eb023.png#averageHue=%23080000&clientId=u082820f0-a203-4&from=paste&height=227&id=ue9a0318b&originHeight=341&originWidth=576&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=20123&status=done&style=none&taskId=ub0478de5-7b8e-4fc1-aef9-c7a419109ba&title=&width=384)

2. 安装浏览器
```shell
yarn playwright install --with-deps chromium
```
等待一段时间即可，如果失败，请重试。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682584355986-ad840b32-7fba-4a75-b3b7-f2735d9d61d7.png#averageHue=%230a0807&clientId=u082820f0-a203-4&from=paste&height=143&id=u0c6cab2b&originHeight=214&originWidth=880&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=23077&status=done&style=none&taskId=uce1816c3-6d58-4f33-a380-900371de827&title=&width=586.6666666666666)

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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682586488888-df48780c-393b-4deb-9200-a51b56942fdb.png#averageHue=%237cad80&clientId=u082820f0-a203-4&from=paste&height=499&id=u58582544&originHeight=748&originWidth=1596&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=116706&status=done&style=none&taskId=u449cd803-7169-4b0a-b8c8-22ba8f85b21&title=&width=1064)
虽然默认生成代码是 Javascript，但可以选择切换语言：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682586618511-c65db4e7-c37b-4a86-aacd-dcccef61d02d.png#averageHue=%23faf8f7&clientId=u082820f0-a203-4&from=paste&height=279&id=u2965b958&originHeight=419&originWidth=846&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=82830&status=done&style=none&taskId=ucab89b17-17da-4f57-969f-e020b89d733&title=&width=564)
注意到可以生成 Pytest 的代码，对测试工程师来说，简直是福音。这也提示我们，Playwright 既可以由前端研发来使用，也可以由测试人员来使用，并不限制使用者的职业身份。

点击"Copy"按钮
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682587794091-7b18eb16-0d94-4028-9a9f-81949a626d95.png#averageHue=%23a8cc95&clientId=u082820f0-a203-4&from=paste&height=67&id=ua9bb483a&originHeight=101&originWidth=307&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=7311&status=done&style=none&taskId=ua0ef4d8d-332c-48f0-8b03-a8695eb4a27&title=&width=204.66666666666666)
然后打开代码编辑器，把代码复制进去即可。

点击"Clear"按钮，
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682587892731-b15fd6e7-7ed9-4e80-af0d-8d9548548486.png#averageHue=%23c3d5aa&clientId=u082820f0-a203-4&from=paste&height=66&id=ua346f946&originHeight=99&originWidth=858&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=11379&status=done&style=none&taskId=u511e3601-1af0-4aa6-ba7c-74b50e22577&title=&width=572)
可以清空本次操作生成的代码，从而开始进行下一次操作的代码生成。

如果是使用 VS Code 插件，点击"Record new"即可。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682681963102-fe8eaa5b-3d09-47f7-bf4b-91a97d993e63.png#averageHue=%23352f30&clientId=u29341808-56fa-4&from=paste&height=131&id=ud7e6d183&originHeight=196&originWidth=468&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=21361&status=done&style=none&taskId=u9a7d1a38-6b67-4f50-8b7f-071847d0729&title=&width=312)
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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682681748045-7649ce34-b3ec-4742-a167-8f791b58f4d2.png#averageHue=%237f9764&clientId=u29341808-56fa-4&from=paste&height=405&id=uf03aea4a&originHeight=608&originWidth=964&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=61464&status=done&style=none&taskId=u15a65cc0-e512-4b14-977d-d90b4c927d3&title=&width=642.6666666666666)
### 执行用例
```shell
yarn playwright test
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682588728053-347cd0a7-b3a9-490d-95fe-7804adaaa231.png#averageHue=%232e2d2d&clientId=u082820f0-a203-4&from=paste&height=57&id=u53918bf0&originHeight=86&originWidth=365&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=7133&status=done&style=none&taskId=u2f759634-3cdf-48a3-9214-dcf77cd9be5&title=&width=243.33333333333334)
如果用例失败了，想查看到底哪里错了，可以用以下命令显示浏览器，查看用例执行过程：
```bash
yarn playwright test --headed
```

如果是使用 VS Code，直接点击运行用例即可。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682863323501-96652720-6a3f-4a23-9e96-ac9cc8626bb0.png#averageHue=%23868063&clientId=ud1f06ed4-27a0-4&from=paste&height=331&id=u5d055039&originHeight=662&originWidth=2720&originalType=binary&ratio=2&rotation=0&showTitle=false&size=371500&status=done&style=none&taskId=u3310dba0-334d-4769-a254-57b18e4cad2&title=&width=1360)
勾选左下角的"Show broswer"，即可显示浏览器。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682679338226-a45a9688-cba4-4f07-9c30-b0ce2561c775.png#averageHue=%232a2a2b&clientId=u29341808-56fa-4&from=paste&height=144&id=u5b7f0b4c&originHeight=216&originWidth=403&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=16601&status=done&style=none&taskId=u756266fd-637a-448c-b323-4013bb1110d&title=&width=268.6666666666667)
### 调试用例
对于失败的用例，如何 debug呢？添加 --debug 参数即可。
```shell
yarn playwright test --debug
```

点击"Step over" 即可执行下一行代码。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682683188360-8e42b434-0dd7-41d0-bb58-fc5afa9bcc19.png#averageHue=%23dcd4c2&clientId=u29341808-56fa-4&from=paste&height=152&id=u31d38880&originHeight=252&originWidth=878&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=63167&status=done&style=none&taskId=ub67f2e36-a4f8-4cd8-aeb2-06402032402&title=&width=529.3333740234375)

如果是使用 VS Code，找到相应的用例，右键出现"Debug Test"，点击即可。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682681870122-600a5bd8-8101-467e-bfb5-2e4262c89227.png#averageHue=%23222a30&clientId=u29341808-56fa-4&from=paste&height=186&id=u4f968aab&originHeight=279&originWidth=363&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=19195&status=done&style=none&taskId=uc7a96187-c4cd-45c7-999b-7311182a66f&title=&width=242)
### 查看报告
在执行完用例后，本地会生成目录 `playwright-report`，可以通过以下命令查看测试报告
```shell
yarn playwright show-report
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682661061910-0a1a50e6-73b2-4f99-83af-b73f88306260.png#averageHue=%23ead4ab&clientId=u950a8797-5d6a-4&from=paste&height=173&id=u98384ca5&originHeight=260&originWidth=1493&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=24949&status=done&style=none&taskId=u764cb478-f038-461a-b2e3-a678ec57d62&title=&width=995.3333333333334)
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
### 元素选择
人们对元素选择的第一反应是使用 CSS 或 XPath，但 Playwright 并不鼓励这样使用，因为这些选择器容易改变。较为好的办法是，为测试元素添加专门的属性 testid，如下所示：
```html
<div data-testid="my-div"></div>
```
然后通过下列方式进行选择：
```javascript
await page.getByTestId('my-div').click()
```

当然，这种方式会对源代码有侵入。更为折衷的方式是，使用下列[官方推荐的方法](https://playwright.dev/docs/locators#locate-by-role)进行元素选择， 直到最后没办法了，才使用 CSS。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682869270701-398ea1c1-1737-4530-a523-215f0ba2df05.png#averageHue=%23fefefe&clientId=uddf58bbe-eaae-4&from=paste&height=173&id=u773c456d&originHeight=346&originWidth=360&originalType=binary&ratio=2&rotation=0&showTitle=false&size=30575&status=done&style=none&taskId=u07a6f422-b061-42d4-b0ae-12f563cc9b3&title=&width=180)
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

![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682683588831-69da3284-a41b-4409-b79a-2ea38e4a7936.png#averageHue=%23edca93&clientId=u29341808-56fa-4&from=paste&height=272&id=u72809035&originHeight=408&originWidth=577&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=40844&status=done&style=none&taskId=ucf66fb0a-7750-4259-b45f-46c38ed424c&title=&width=384.6666666666667)

4. 点击控制台内部，则此时元素不会丢失 hover 状态，如下图所示

![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682683682443-ae142404-4c0f-42ea-aaf3-6bae7e3c0064.png#averageHue=%23c8cfb4&clientId=u29341808-56fa-4&from=paste&height=135&id=u2b583631&originHeight=203&originWidth=1283&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=47640&status=done&style=none&taskId=u8de05041-b901-4ee2-8b16-a83bf38a9f6&title=&width=855.3333333333334)

5. 切换到 VS Code

![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1682683882857-d3336350-6ebe-4d07-92fc-7421e04ab019.png#averageHue=%233d3634&clientId=u29341808-56fa-4&from=paste&height=121&id=u8b8364e0&originHeight=182&originWidth=1366&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=45647&status=done&style=none&taskId=u0aa0b7b2-ae3c-472f-9932-51cb3c87872&title=&width=910.6666666666666)

## CI 集成
以 Gitlab CI 为例，说明 Playwright 如何集成进 CI 流水线中。其他方式如 Jenkins，请[参考文档](https://playwright.dev/docs/ci#jenkins)。

首先确保已安装 Gitlab Runner 并成功注册，具体操作可以参考[安装文档](https://levy.vip/docs/git/gitlab-ci.html#%E5%AE%89%E8%A3%85gitlab-runner)。

前面的操作执行完毕后，可以开始编写 .gitlab-ci.yml，下面只给出测试相关的配置。
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

再修改 Gitlab Runner 的配置，解决[yarn命令无法运行](https://github.com/nodejs/help/issues/1754#issuecomment-1260462271)的问题：
```shell
vi /srv/gitlab-runner/config/config.toml
```

根据 token 找到对应的 Runner 配置，按照下图所示，把红框处的值设置成 `true`
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1683188233773-e01005ac-69e8-4c8b-8e8d-94eed1bc8bfe.png#averageHue=%232e2826&clientId=u2e6ce88a-b573-4&from=paste&height=308&id=u17426074&originHeight=462&originWidth=466&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=36932&status=done&style=none&taskId=uf273d5f3-82d7-40e0-bc21-34e5ad4af88&title=&width=310.6666666666667)
config.toml 里面可能会有多个 Runner 配置，如何找到要修改哪一个呢？
可以在项目界面，根据下图所示的 token（w8exPBfA） 去查找。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/160590/1683188182326-5fdd5051-71f2-4a68-97ed-10ec7a262476.png#averageHue=%23f5eeed&clientId=u2e6ce88a-b573-4&from=paste&height=225&id=u429ec37e&originHeight=337&originWidth=1042&originalType=binary&ratio=1.5&rotation=0&showTitle=false&size=43490&status=done&style=none&taskId=ub2627d21-98a6-4338-86bd-ef3ef938475&title=&width=694.6666666666666)

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

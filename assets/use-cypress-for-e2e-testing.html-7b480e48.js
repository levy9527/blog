import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o,c,a as s,b as n,d as e,f as t}from"./app-7309c93b.js";const l={},r=t('<h1 id="使用-cypress-进行端对端测试" tabindex="-1"><a class="header-anchor" href="#使用-cypress-进行端对端测试" aria-hidden="true">#</a> 使用 Cypress 进行端对端测试</h1><h2 id="为什么写端对端测试" tabindex="-1"><a class="header-anchor" href="#为什么写端对端测试" aria-hidden="true">#</a> 为什么写端对端测试</h2><p>写端对端测试代码的最大好处就是，把相关的用例变成可执行的代码，成为项目的资产；结合CI系统，可在后续研发维护过程中，将一部分测试过程自动化，减少重复的手工劳动，既保障质量，又提高效率。</p><p>谁来写呢？本文的目标读者是前端研发人员，因而相关测试代码是由前端同学去编写的。</p><h2 id="为什么用-cypress" tabindex="-1"><a class="header-anchor" href="#为什么用-cypress" aria-hidden="true">#</a> 为什么用 Cypress</h2>',5),d={href:"https://docs.cypress.io/guides/overview/why-cypress.html",target:"_blank",rel:"noopener noreferrer"},u=t(`<p>缺点：全英文档</p><h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> cypress <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,4),v={href:"https://docs.cypress.io/guides/getting-started/installing-cypress.html#npm-install",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>一般而言，国内用户都会在上述过程中卡住，最好在命令行设置网络代理后再下载（懂的自然懂）。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890 <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:7890 <span class="token assign-left variable">all_proxy</span><span class="token operator">=</span>socks5://127.0.0.1:7890
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果是在 CI 环境，记得缓存 cypress binary。</p><p>安装完后，修改 package.json</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;e2e&quot;</span><span class="token operator">:</span> <span class="token string">&quot;cypress open&quot;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加速下载" tabindex="-1"><a class="header-anchor" href="#加速下载" aria-hidden="true">#</a> 加速下载</h3>`,6),k={href:"https://download.cypress.io/desktop.json",target:"_blank",rel:"noopener noreferrer"},b=t(`<p>则安装 Cypress 时，设置 <code>CYPRESS_INSTALL_BINARY</code> 指向对应的地址即可。如</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>CYPRESS_INSTALL_BINARY=https<span class="token operator">:</span><span class="token comment">//your-oss.com/6.1.0-linux-x64-cypress.zip yarn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或使用淘宝镜像，缺点是可能包不是最新的。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">CYPRESS_INSTALL_BINARY</span><span class="token operator">=</span>https://npm.taobao.org/mirrors/cypress/6.2.0/linux/cypress.zip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或这样写</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token assign-left variable">CYPRESS_DOWNLOAD_MIRROR</span><span class="token operator">=</span>https://npm.taobao.org <span class="token function">yarn</span> <span class="token function">add</span>  cypress <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h3><p><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494179328.png" alt="image.png" loading="lazy"><br> 推荐结构如上图所示的目录结构：</p>`,8),h=s("li",null,"cypress 相关的内容放到 test/e2e 文件夹下。与单元测试的 unit 文件夹区分开来",-1),g={href:"https://docs.cypress.io/guides/guides/environment-variables.html#Setting",target:"_blank",rel:"noopener noreferrer"},y=s("li",null,"fixtures 存放测试 mock 数据",-1),_=s("li",null,"integration 存放的就是 cypress 的测试用例了，命名规范同 jest：${name}.spec.js",-1),f=s("li",null,"plugins 存放的是相关插件",-1),q=s("li",null,"support 存放自定义的 cypress 命令",-1),x=t(`<p>可以根据要求，修改文件夹目录结构，只要在 cypress.json 里配置好即可：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;fixturesFolder&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test/e2e/fixtures&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;integrationFolder&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test/e2e/integration&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;pluginsFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test/e2e/plugins/index.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;screenshotsFolder&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test/e2e/screenshots&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;supportFile&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test/e2e/support/index.js&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;videosFolder&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test/e2e/videos&quot;</span><span class="token punctuation">,</span>
  <span class="token property">&quot;viewportWidth&quot;</span><span class="token operator">:</span> <span class="token number">1280</span><span class="token punctuation">,</span>
  <span class="token property">&quot;viewportHeight&quot;</span><span class="token operator">:</span> <span class="token number">800</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意，如果不显示声明这些配置，每次执行 cypress 命令都会自动生成相应的示例文件</p></blockquote>`,3),j={href:"https://docs.cypress.io/guides/references/configuration.html#Options",target:"_blank",rel:"noopener noreferrer"},C={href:"https://github.com/FEMessage/create-nuxt-app",target:"_blank",rel:"noopener noreferrer"},w=t(`<h3 id="与-jest-协同工作" tabindex="-1"><a class="header-anchor" href="#与-jest-协同工作" aria-hidden="true">#</a> 与 Jest 协同工作</h3><p>当项目也在使用 jest 进行单元测试时，有两个注意点。</p><h4 id="eslint-配置" tabindex="-1"><a class="header-anchor" href="#eslint-配置" aria-hidden="true">#</a> ESLint 配置</h4><p>推荐项目中存在三份 eslint 配置文件：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 项目根目录下的 .eslintrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;plugin:prettier/recommended&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// test/unit/.eslintrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;plugin:jest/recommended&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// test/e2e/.eslintrc.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;plugin:cypress/recommended&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，还要安装相应的依赖：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> eslint-plugin-jest eslint-plugin-cypress <span class="token parameter variable">--dev</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="测试目录" tabindex="-1"><a class="header-anchor" href="#测试目录" aria-hidden="true">#</a> 测试目录</h4><p>两个工具都需要明确指定各自的测试目录。</p><p>cypress 的测试目录可通过上文所说的 cypress.json 指定。</p><p>jest 测试目录则可通过在 jest.config.js 里指定：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>module.exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  // 也可使用 testRegex 属性
  // 详见文档：https://jestjs.io/docs/en/configuration<span class="token comment">#testmatch-arraystring</span>
  testMatch: <span class="token punctuation">[</span><span class="token string">&#39;&lt;rootDir&gt;/test/unit/?(*.)+(spec|test).[jt]s?(x)&#39;</span><span class="token punctuation">]</span>,
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检查依赖及生产安装依赖命令" tabindex="-1"><a class="header-anchor" href="#检查依赖及生产安装依赖命令" aria-hidden="true">#</a> 检查依赖及生产安装依赖命令</h3><p>请确保生产安装依赖命令为</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>yarn --frozen-lockfile --production
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上述命令，只会安装 package.json 里声明的 <code>dependencies</code> 依赖，避免因为下载 Cypress 而超时。</p><p>因此，也要确保项目中 package.json 中的 <code>dependencies</code> <code>devDependencies</code> 等声明是正确的。</p><h3 id="第一个用例" tabindex="-1"><a class="header-anchor" href="#第一个用例" aria-hidden="true">#</a> 第一个用例</h3><p>新建 common.spec.js</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;联系客服按钮&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    cy<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>
    cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.cy-customer-service&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;[id*=_QIDIAN_WEB_IM_IFRAME_]&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;exist&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">&#39;合作生态 加入我们 按钮&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    cy<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token string">&#39;/cooperation/si&#39;</span><span class="token punctuation">)</span>
    cy<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;.cy-cooperation-btn&#39;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">should</span><span class="token punctuation">(</span><span class="token string">&#39;have.css&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;width&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;98px&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的示例覆盖了三个 cypress 常用命令：</p><ul><li>跳转页面</li><li>获取元素</li><li>断言</li></ul><p>这里说一下 <code>should</code> 命令，它相当于是 <code>expect.to</code> 的简写。<br> 如： <code>expect($input).to.be.disabled</code> 可写成 <code>get($input).should(&#39;be.disabled&#39;)</code></p>`,23),I={href:"https://docs.cypress.io/api/commands/get.html#Syntax",target:"_blank",rel:"noopener noreferrer"},R=s("br",null,null,-1),S={href:"https://docs.cypress.io/guides/references/assertions.html#Common-Assertions",target:"_blank",rel:"noopener noreferrer"},E={href:"https://docs.cypress.io/zh-cn/guides/tooling/intelligent-code-completion.html#",target:"_blank",rel:"noopener noreferrer"},A=t(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/// &lt;reference types=&quot;Cypress&quot; /&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr><p>执行 <code>yarn e2e</code> ，出现弹窗<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494184473.png" alt="image.png" loading="lazy"><br> 点击文件，即会执行用例。<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494186469.png" alt="image.png" loading="lazy"></p><h3 id="更复杂的示例" tabindex="-1"><a class="header-anchor" href="#更复杂的示例" aria-hidden="true">#</a> 更复杂的示例</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  beforeEach(() =&gt; {
    // 免登录
    cy.setCookie(&#39;_yapi_token&#39;, &#39;GXgIZ7rr7gF1o38EugAWgSgHoyC-e2MbZU43uHapqkk&#39;)
    cy.setCookie(&#39;_yapi_uid&#39;, &#39;2426&#39;)
  })
  
  it(&#39;import swagger&#39;, () =&gt; {
    let resp = {&quot;code&quot;:&quot;1&quot;,&quot;payload&quot;:{&quot;total&quot;:-1,&quot;rows&quot;:[]},&quot;success&quot;:true}

    let apps = resp.payload.rows.filter(item =&gt; item.language == &#39;Java8&#39; &amp;&amp; [&#39;job&#39;, &#39;scheduler&#39;, &#39;openresty&#39;].every(name =&gt; !item.name.includes(name)))
    
    apps.forEach(item =&gt; {
      let url = \`https://dev.domain.com/\${item.name}/v2/api-docs\`;

      let yapi = &#39;https://yapi.domain.com/group/2120&#39;
      cy.visit(yapi)
      cy.wait(1000)

      // cy.contains(item.name).click()
      cy.contains(&#39;添加项目&#39;).click()
      cy.get(&#39;#name&#39;).type(item.name)
      cy.contains(&#39;创建项目&#39;).click()

      cy.contains(&#39;设 置&#39;).click()
      cy.contains(&#39;Swagger自动同步&#39;).click()
      cy.get(&#39;.ant-switch-inner&#39;).last().click()
      cy.get(&#39;.ant-select-selection&#39;).last().click()
      cy.contains(&#39;智能合并&#39;).click() // 选择下拉列表选项
      cy.get(&#39;#sync_json_url&#39;).type(url)
      cy.contains(&#39;保存&#39;).click()
      cy.wait(1000)
    })
  })
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结合typescript" tabindex="-1"><a class="header-anchor" href="#结合typescript" aria-hidden="true">#</a> 结合TypeScript</h2><p>在 e2e 目录添加 tsconfig.json，内容如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;noEmit&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// be explicit about types included to avoid clashing with Jest types</span>
    <span class="token comment">// add more types if have custom commands</span>
    <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;cypress&quot;</span><span class="token punctuation">]</span> 
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;include&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;../../node_modules/cypress&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;./*/*.ts&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 e2e/support 添加 index.d.ts，如果有自定义命令的话</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/* eslint-disable no-unused-vars */</span>
<span class="token comment">/// &lt;reference types=&quot;cypress&quot; /&gt;</span>

<span class="token keyword">declare</span> <span class="token keyword">namespace</span> Cypress <span class="token punctuation">{</span>
  <span class="token comment">// eslint-disable-next-line @typescript-eslint/no-unused-vars</span>
  <span class="token keyword">interface</span> <span class="token class-name">Chainable<span class="token operator">&lt;</span>Subject<span class="token operator">&gt;</span></span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Create login server
     * <span class="token keyword">@example</span>
     * cy.login()
     */</span>
    <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Chainable<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将 e2e/integration/xxx.spec.js 重命名为 e2e/integration/xxx.spec.ts，并添加如下2行内容：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token operator">+</span> <span class="token comment">/// &lt;reference types=&quot;cypress&quot;/&gt;</span>
<span class="token operator">+</span> <span class="token comment">/// &lt;reference types=&quot;../../support&quot; /&gt;</span>

<span class="token function">descript</span><span class="token punctuation">(</span><span class="token string">&#39;something&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// some test code here</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="持续集成" tabindex="-1"><a class="header-anchor" href="#持续集成" aria-hidden="true">#</a> 持续集成</h2>`,13),N={href:"https://github.com/cypress-io/cypress-docker-images",target:"_blank",rel:"noopener noreferrer"},z=t(`<blockquote><p>注意自身的 Node 版本选择合适的镜像。</p></blockquote><p>另一方面，一般 CI 环境下执行的是 <code>cypress run</code> 命令。</p><blockquote><p>run 与 open 的不同之处在于，run 默认不会启动浏览器界面，使用的是 headless 模式执行用例。</p></blockquote><p>同时，需要安装 Cypress 时，需要设置环境变量 <code>CYPRESS_INSTALL_BINARY</code></p><p>最后，还是要强调一下，在生产安装依赖环节，使用如下命令安装依赖，则不会安装 Cypress 依赖</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>yarn --frozen-lockfile --production
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="直接运行-cypress" tabindex="-1"><a class="header-anchor" href="#直接运行-cypress" aria-hidden="true">#</a> 直接运行 Cypress</h3>`,7),L={href:"https://docs.gitlab.com/ee/ci/yaml/README.html#stages",target:"_blank",rel:"noopener noreferrer"},D=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cypress:
  image:
    name: cypress/base:12.19.0
    entrypoint: <span class="token punctuation">[</span><span class="token string">&quot;&quot;</span><span class="token punctuation">]</span> <span class="token comment"># https://github.com/cypress-io/cypress-docker-images/issues/300</span>
  stage: e2e
  when: manual
  tags:
    - <span class="token function">docker</span>
  script:
    - <span class="token assign-left variable">CYPRESS_INSTALL_BINARY</span><span class="token operator">=</span>your-domain/cypress.zip <span class="token function">yarn</span> --frozen-lockfile
    - <span class="token variable"><span class="token variable">$(</span><span class="token function">npm</span> bin<span class="token variable">)</span></span>/cypress run <span class="token parameter variable">--env</span> <span class="token assign-left variable">config</span><span class="token operator">=</span>dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不推荐选择 <code>cypress/included</code> 镜像直接执行 Cypress 命令，因为很可能会遇到以下问题。<br> 当然，如果自己的用例写的不好，也很可能会出现下面的问题。<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494188361.png" alt="image.png" loading="lazy"></p><h3 id="使用-start-server-and-test" tabindex="-1"><a class="header-anchor" href="#使用-start-server-and-test" aria-hidden="true">#</a> 使用 start-server-and-test</h3><p>如果需要本地起个 localhost 服务，然后再运行 cypress。那么可以合作官方推荐的 <code>start-server-and-test</code> 模块。它在 CI 上的执行顺序是：</p><ol><li>在系统后台执行拉起本地服务的命令</li><li>使用 wait-on 模块监听并等待该本地服务响应 200</li><li>执行 test 命令，完成并退出</li><li>CI 环境此时会自动关闭所有后台进程并退出</li></ol>`,5),F={href:"http://gitlab.com/",target:"_blank",rel:"noopener noreferrer"},$=t(`<ul><li>package.json</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;e2e&quot;</span><span class="token operator">:</span> <span class="token string">&quot;start-server-and-test \\&quot;yarn dev\\&quot; http-get://localhost:3000 \\&quot;cypress run \\&quot;&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">&quot;devDependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;cypress&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^6.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;start-server-and-test&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^1.10.8&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>.gitlab-ci.yml</li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># 参考 https://gitlab.com/cypress-io/cypress-example-docker-gitlab/-/blob/master/.gitlab-ci.yml</span>
<span class="token comment"># 参考 https://github.com/cypress-io/cypress-example-kitchensink/blob/master/.gitlab-ci.yml</span>

<span class="token comment"># 这是 gitlab-ci 默认执行顺序。也可以省略</span>
<span class="token key atrule">stages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> build
  <span class="token punctuation">-</span> test

<span class="token comment"># to cache both npm modules and Cypress binary we use environment variables</span>
<span class="token comment"># to point at the folders we can list as paths in &quot;cache&quot; job settings</span>
<span class="token key atrule">variables</span><span class="token punctuation">:</span>
  <span class="token key atrule">YARN_CACHE_FOLDER</span><span class="token punctuation">:</span>  <span class="token string">&quot;$CI_PROJECT_DIR/.yarn&quot;</span>
  <span class="token key atrule">npm_config_cache</span><span class="token punctuation">:</span> <span class="token string">&quot;$CI_PROJECT_DIR/.npm&quot;</span>
  <span class="token key atrule">CYPRESS_CACHE_FOLDER</span><span class="token punctuation">:</span> <span class="token string">&quot;$CI_PROJECT_DIR/cache/Cypress&quot;</span>

<span class="token comment"># cache using branch name</span>
<span class="token comment"># https://gitlab.com/help/ci/caching/index.md</span>
<span class="token key atrule">cache</span><span class="token punctuation">:</span>
  <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>CI_COMMIT_REF_SLUG<span class="token punctuation">}</span>
  <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> .npm
    <span class="token punctuation">-</span> .yarn
    <span class="token punctuation">-</span> cache/Cypress
    <span class="token punctuation">-</span> node_modules

<span class="token comment"># this job installs NPM dependencies and Cypress</span>
<span class="token key atrule">install</span><span class="token punctuation">:</span>
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> merge_requests
  <span class="token key atrule">image</span><span class="token punctuation">:</span> cypress/base<span class="token punctuation">:</span>12.19.0
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile
    <span class="token comment"># check Cypress binary path and cached versions</span>
    <span class="token comment"># useful to make sure we are not carrying around old versions</span>
    <span class="token punctuation">-</span> $(npm bin)/cypress cache path
    <span class="token punctuation">-</span> $(npm bin)/cypress cache list
    <span class="token punctuation">-</span> $(npm bin)/cypress verify

<span class="token comment"># all jobs that actually run tests can use the same definition</span>
<span class="token key atrule">e2e test</span><span class="token punctuation">:</span>
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> merge_requests
  <span class="token key atrule">image</span><span class="token punctuation">:</span> cypress/base<span class="token punctuation">:</span>12.19.0
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token comment"># start the server in the background</span>
    <span class="token punctuation">-</span> yarn e2e
  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">when</span><span class="token punctuation">:</span> always
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> cypress/videos/
      <span class="token punctuation">-</span> cypress/screenshots/
    <span class="token key atrule">expire_in</span><span class="token punctuation">:</span> 1 week
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="this-job-is-stuck" tabindex="-1"><a class="header-anchor" href="#this-job-is-stuck" aria-hidden="true">#</a> This job is stuck</h3><p><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494190870.png" alt="image.png" loading="lazy">如果是自建的 gitlab, 可能会遇到这个问题。<br> 这是任务没有打对标签，导致无法给任务分配对应的 Runner。<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494192801.png" alt="image.png" loading="lazy"><br> 进入上图所示页面，注意找到可使用的 Runner<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494195056.png" alt="image.png" loading="lazy"><br> 如上图所示， <code>docker</code> 标签对应的 Runner 是处于激活状态的，则在 CI 文件里配置即可</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cypress:
  tags:
    - <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cypress-dashbord" tabindex="-1"><a class="header-anchor" href="#cypress-dashbord" aria-hidden="true">#</a> Cypress Dashbord</h3><p>Cypress 官方提供了一个测试记录托管服务。在 CI 命令中，只需要加上 <code>--record --key $key</code> 即可。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>script:
  - cypress run <span class="token parameter variable">--record</span> <span class="token parameter variable">--key</span> <span class="token variable">$key</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,10),T=s("br",null,null,-1),Y=s("img",{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/software-testing/1686494197613.png",alt:"image.png",loading:"lazy"},null,-1),O=s("br",null,null,-1),P={href:"https://docs.cypress.io/guides/dashboard/introduction.html#Features",target:"_blank",rel:"noopener noreferrer"},M=s("h2",{id:"总结",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),n(" 总结")],-1),B=s("p",null,"cypress 比较适合写一个流程测试。一般情况下，只需要把整个正常流程操作使用 cypress 记录下来即可。",-1),J=s("p",null,"一个流程可能长这样：创建->验证->修改->验证->删除->验证。那我们就可以根据该流程，模拟填写合法数据，模拟点击提交按钮，检查页面是否有相应内容即可。",-1),H=s("p",null,"这样，每次开发新功能后，编写测试用例，再跑 Cypress，就能把一部分的回归测试自动化了，保证完成新功能的同时，原有功能最低限度地保持可用。",-1),W=s("h2",{id:"拓展阅读",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#拓展阅读","aria-hidden":"true"},"#"),n(" 拓展阅读")],-1),V={href:"https://www.yuque.com/femessage/fwrngg/arlhoq",target:"_blank",rel:"noopener noreferrer"};function U(G,Z){const a=p("ExternalLinkIcon");return o(),c("div",null,[r,s("p",null,[n("文档齐全，生态好，对 JavaScript 友好，可简单上手。更多详见："),s("a",d,[n("why-cypress"),e(a)])]),u,s("p",null,[n("下载完依赖后，cypress 还会再从网络下载二进制执行包。安装完成后会在本地全局缓存一份二进制执行包，那么这台机器上所有项目都可以使用这份缓存。"),s("a",v,[n("文档参考"),e(a)])]),m,s("p",null,[n("因为安装时，需要科学上网，如果不想设置代理，也能加速下载安装。可以自己先下载官方提供的二进制 "),s("a",k,[n("cypress.zip"),e(a)]),n("，再上传至自己的 OSS。")]),b,s("ul",null,[h,s("li",null,[n("config 存放不同环境下的"),s("a",g,[n("变量"),e(a)]),n("，如 dev/uat 环境的 baseUrl 是不同的，可分别在 config 里")]),y,_,f,q]),x,s("p",null,[n("cypress.json 是放在项目根目录下的默认配置文件，全部配置项可"),s("a",j,[n("查看文档"),e(a)])]),s("blockquote",null,[s("p",null,[n("通过 "),s("a",C,[n("FEMessage/create-nuxt-app"),e(a)]),n(" 生成的项目默认是使用上面的配置")])]),w,s("p",null,[n("更多命令，可"),s("a",I,[n("查看API"),e(a)]),R,n(" 常见断言，可"),s("a",S,[n("查看文档"),e(a)])]),s("p",null,[n("如果想获得代码提示、代码补全，需在开头添加如下语句，（Webstorm不需要此配置）"),s("a",E,[n("参考文档"),e(a)])]),A,s("p",null,[n("持续集成的第一步要选择合适的包含 Cypress 的"),s("a",N,[n("镜像"),e(a)]),n("。")]),z,s("p",null,[n("直接运行 Cypress 的场景是，e2e 作为 CI 的最后一个"),s("a",L,[n("阶段"),e(a)]),n("，当应用完成部署后，再对应用运行线上的测试。")]),D,s("p",null,[n("下面以 "),s("a",F,[n("gitlab.com"),e(a)]),n(" 为例，展示执行完 gitlab jobs 后可看到 test 记录和下载测试产物（视频及截图）")]),$,s("p",null,[n("CI 日志如下："),T,Y,O,n(" 更多介绍请查阅"),s("a",P,[n("官方文档"),e(a)])]),M,B,J,H,W,s("ul",null,[s("li",null,[s("a",V,[n("Cypress 实战总结"),e(a)])])])])}const K=i(l,[["render",U],["__file","use-cypress-for-e2e-testing.html.vue"]]);export{K as default};

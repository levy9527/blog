import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r,o,c as l,a,b as e,d as n,f as i}from"./app-6c39dc78.js";const c={},d=i('<h1 id="操作-gitlab-mr-的命令行工具" tabindex="-1"><a class="header-anchor" href="#操作-gitlab-mr-的命令行工具" aria-hidden="true">#</a> 操作 Gitlab MR 的命令行工具</h1><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2><p>为什么开发这个工具？主要解决以下问题：</p><ol><li>提测、上 UAT 时，避免漏合代码。</li><li>代码冲突时，团队成员不用再问“解决这个冲突要怎么切分支？”</li><li>一个 feature 分支要向多个保护分支提交合并请求时，减少烦琐而易错的选取分支的界面操作。</li></ol><p>可能会有人问：为什么会漏合代码？当你在某一个迭代需要来回在不同的 feature 分支切换、一个 feature 横跨多个项目，同时你偶尔还要兼顾 bug 修复的时候，你极容易丢失上下文。<br> 并且，不同的 feature 研发进度不一致，可能出现的一种情况是：feature A 只是合并到 test 分支，但　feature B 却已经合并到了 uat。<br> 对此，有人问你代码到底合并了没，你怎么确认？一个个项目去相应的主干分支里查看提交历史吗？就是因为不想再这样做了，这才有了这个工具。</p><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2><h3 id="解压zip" tabindex="-1"><a class="header-anchor" href="#解压zip" aria-hidden="true">#</a> 解压zip</h3><p>下载并解压文件:</p>',8),p={href:"https://r0e715v8ejr.feishu.cn/file/IxH4bYAOkowK08xSid1crXcSnRo",target:"_blank",rel:"noopener noreferrer"},g={href:"https://r0e715v8ejr.feishu.cn/file/ORa3buA3donF3TxxPVwcHSYnnQb",target:"_blank",rel:"noopener noreferrer"},m=a("h3",{id:"安装git-bash",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#安装git-bash","aria-hidden":"true"},"#"),e(" 安装git bash")],-1),u=a("p",null,[e("Windows系统才要安装。"),a("br"),e(" 如果 git bash 版本不足 2.41.0，最好安装最新版本。")],-1),h={href:"https://gitforwindows.org/",target:"_blank",rel:"noopener noreferrer"},b=i(`<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>新增文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> ~/.mr-config.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>复制以下内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">{</span>
  <span class="token string">&quot;gitlab_url&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;https://your-gitlab.com&quot;</span>,
  <span class="token string">&quot;gitlab_token&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;your-token&quot;</span>,
  <span class="token string">&quot;codebases&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;default&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">&quot;dev&quot;</span>, <span class="token string">&quot;test&quot;</span>, <span class="token string">&quot;master&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于该配置的解释，详见后文。</p><h3 id="gitlab-token" tabindex="-1"><a class="header-anchor" href="#gitlab-token" aria-hidden="true">#</a> gitlab_token</h3><p>先获取 gitlab token，操作如下：</p><ol><li>打开Gitlab，右上角点击个人头像</li></ol><figure><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154008266.png" alt="0a8ff2ce0d86d685fd2b5283c40871d9.png" tabindex="0"><figcaption>0a8ff2ce0d86d685fd2b5283c40871d9.png</figcaption></figure><ol start="2"><li>点击左侧边栏</li></ol><figure><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154013693.png" alt="f1151c580d5672d187ca38699e9c2013.png" tabindex="0"><figcaption>f1151c580d5672d187ca38699e9c2013.png</figcaption></figure><ol start="3"><li>勾选全部权限，并确认生成 token</li></ol><figure><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154016668.png" alt="790ed16e056c26d79f35b7ff4c072c8f.png" tabindex="0"><figcaption>790ed16e056c26d79f35b7ff4c072c8f.png</figcaption></figure><h3 id="codebases" tabindex="-1"><a class="header-anchor" href="#codebases" aria-hidden="true">#</a> codebases</h3><p>适用于多基线的场景。</p><p>如产品默认有三个环境，分别对应三条分支 dev、test、master。<br> 同时，又有定制化需求，专门为某一客户进行源码改动，同样有三个环境，则可能出现的配置如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code>  <span class="token property">&quot;codebases&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;default&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;dev&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;master&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">&quot;customize&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;customize-dev&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customize-test&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;customize-master&quot;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h3><p>把 mr 可执行文件所在目录设置到环境变量中：</p><ol><li>查找&quot;环境变量&quot;</li></ol><figure><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154020270.png" alt="157a114acdf00def50ae774b4d68e004.png" tabindex="0"><figcaption>157a114acdf00def50ae774b4d68e004.png</figcaption></figure><ol start="2"><li>点击&quot;环境变量&quot;</li></ol><figure><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154023459.png" alt="6a99dd2754b75348523a388d36067bd9.png" tabindex="0"><figcaption>6a99dd2754b75348523a388d36067bd9.png</figcaption></figure><ol start="3"><li>找到 Path，点击&quot;编辑&quot;</li></ol><figure><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154026703.png" alt="d1335d05ddefa6aa33006e9f24f3254f.png" tabindex="0"><figcaption>d1335d05ddefa6aa33006e9f24f3254f.png</figcaption></figure><ol start="4"><li>点击&quot;新增&quot;，再点击&quot;浏览&quot;，找到最里层的 mr 目录</li></ol><p><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154030135.png" alt="6df5b86a1f91452414382718983e0e22.png"><br> （上图是示例，具体路径根据自己的情况而定）</p><p>重新打开 git bash 即可生效，记得一定要重新打开！</p><p>注：如果是 Linux，那很简单，修改 ~/.bashrc</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:mr文件夹所在路径即可
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="idea" tabindex="-1"><a class="header-anchor" href="#idea" aria-hidden="true">#</a> IDEA</h3><p>该步骤选填，适用于 JetBrains 系列产品，想在 IDEA 的终端中也使用 mr 命令时可配置。</p><p>File -&gt; Settings -&gt; Tools -&gt; Terminal：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154033353.png" alt="image.png"></p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><p>可以不带参数运行，查看支持的命令：mr<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154109989.png" alt="image.png"></p><h3 id="创建mr" tabindex="-1"><a class="header-anchor" href="#创建mr" aria-hidden="true">#</a> 创建MR</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 默认以当前分支作为 source_branch</span>
<span class="token comment"># 根据 codebases 的设置选择 target_branch</span>
mr create
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提示输入要提交 MR 的源分支，按回车使用当前分支：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154113289.png" alt="image.png"><br> 创建成功：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154116622.png" alt="ae115431acc7c0b9275c158fb99e3eaa.png"></p><p>可以处理同名项目的情况：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/dealing-with-same-name-projects.png" alt="dealing-with-same-name-projects.png"></p><p>MR 不会重复创建：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154120100.png" alt="ab7d3ea5177726bbab0ccbcd870d0044.png"></p><p>分支没有代码更新时，也不会创建 MR：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154123348.png" alt="147f745360164598c78c3de8808af1d2.png"></p><h3 id="查看mr" tabindex="-1"><a class="header-anchor" href="#查看mr" aria-hidden="true">#</a> 查看MR</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mr list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以用来查看自己有哪些MR未合并。注意：只显示自己创建的。</p><ul><li>如果可以合并，显示 [ok]</li><li>如果有冲突，显示 [conflict]</li></ul><figure><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154126283.png" alt="85ac4ee87e49965270f502ef830bf619.png" tabindex="0"><figcaption>85ac4ee87e49965270f502ef830bf619.png</figcaption></figure><h3 id="合并mr" tabindex="-1"><a class="header-anchor" href="#合并mr" aria-hidden="true">#</a> 合并MR</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 格式如下</span>
<span class="token comment"># mr merge {mr_url}</span>
mr merge https://gitlab.com/my-project/-/merge_requests/2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>{mr_url} 的值可以根据以下方式来获取：</p><ol><li>create 命令成功后的输出</li><li>list 命令的输出</li><li>gitlab web界面上 MR 的 url</li></ol><p>合并前会有确认提示：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154129605.png" alt="image.png"></p><p>可以取消，防止误合并：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154133045.png" alt="image.png"></p><h3 id="冲突处理" tabindex="-1"><a class="header-anchor" href="#冲突处理" aria-hidden="true">#</a> 冲突处理</h3><p>解决冲突，切换分支，是很麻烦的事情，故本工具为解决冲突提供了一些辅助功能。</p><p>注意：命令行只做拉取代码、切合分支等必要操作，冲突的解决仍需要人工介入，工具不会自动合并代码的。</p><p>合并冲突状态的MR：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mr merge <span class="token punctuation">{</span>conflict_mr_url<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>出现提示，是否自动切换分支为解决冲突作准备：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154136190.png" alt="image.png"><br> 当然在此之前，要保证工作目录是干净的，如果有修改未提交，会中止切换分支操作：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154139322.png" alt="image.png"></p><blockquote><p>可以使用 <code>git stash</code>保存修改，合并冲突后，再 <code>git stash pop</code></p></blockquote><p>命令执行成功时，会切换到 <code>conflict/</code> 开头的分支。<br> 此时，打开 IDE 或 Git 管理工具，根据提示把相应的分支合并到 <code>conflict/</code> 分支即可。<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154143622.png" alt="image.png"></p><p>以 IDEA 为例：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154146323.png" alt="image.png"></p><p>解决冲突后，再切回命令行，此时有两种选择：</p><ol><li>创建 MR，适用于自己没有权限合并的场景</li><li>合并 MR，适用于自己有权限合并的场景</li></ol><p>如果是创建，再次执行 create 命令即可：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mr create
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154149211.png" alt="image.png"><br> 创建的 MR 合并时会自动删除 <code>conflict/</code> 分支。<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154152000.png" alt="image.png"></p><p>如果是合并，同样再次执行 merge 命令即可，此时不用带参数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mr merge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154155089.png" alt="image.png"><br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/tools/1689154158111.png" alt="52fee749bc6d270f9ccab3eb0e04208b.png"></p>`,70);function v(f,k){const s=r("ExternalLinkIcon");return o(),l("div",null,[d,a("ul",null,[a("li",null,[a("a",p,[e("Windows"),n(s)])]),a("li",null,[a("a",g,[e("Linux"),n(s)])])]),m,u,a("p",null,[e("安装地址："),a("a",h,[e("https://gitforwindows.org/"),n(s)])]),b])}const _=t(c,[["render",v],["__file","use-command-line-tool-to-manage-gitlab-merge-request.html.vue"]]);export{_ as default};

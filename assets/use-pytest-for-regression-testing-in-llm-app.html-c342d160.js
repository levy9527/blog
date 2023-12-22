import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as l,c as o,e as c,a as n,b as s,d as e,f as t}from"./app-7610ad73.js";const u={},r=n("h1",{id:"使用-pytest-为llm应用添加回归测试",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#使用-pytest-为llm应用添加回归测试","aria-hidden":"true"},"#"),s(" 使用 pytest 为LLM应用添加回归测试")],-1),d=n("h2",{id:"回归测试的必要性",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#回归测试的必要性","aria-hidden":"true"},"#"),s(" 回归测试的必要性")],-1),v=n("p",null,"基于 LLM 的 Chat 应用大量依赖了 Prompt Engineering，而用户的输入又千奇百怪，调整了 Prompt 模板，很可能会有意想不到的效果：满足了新需求，却破坏了旧功能。",-1),m=n("p",null,"因此，LLM应用比任何时候都需要回归测试，确保在迭代过程中，不破坏旧功能、不让已修复的bug复现。",-1),k=n("p",null,"而回归测试，当然是自动化执行效率才高。本文交分享如何使用 pytest 对 LLM 应用进行自动化的回归测试。",-1),b=n("h2",{id:"pytest",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#pytest","aria-hidden":"true"},"#"),s(" pytest")],-1),h=n("h3",{id:"安装",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#安装","aria-hidden":"true"},"#"),s(" 安装")],-1),_=n("code",null,"venv",-1),g=n("code",null,"ModuleNotFoundError: No module named xxx",-1),y={href:"https://medium.com/@dirk.avery/pytest-modulenotfounderror-no-module-named-requests-a770e6926ac5",target:"_blank",rel:"noopener noreferrer"},f=t(`<p>正确的安装步骤：</p><ol><li>新开一个 bash 终端</li><li>pip uninstall pytest # 删除全局的 pytest</li><li>cd xxx &amp;&amp; source ./venv/Scripts/activate # 激活虚拟环境</li><li>pip install pytest # 在虚拟环境中安装 pytest</li><li>pytest # 启动测试</li></ol><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p>在项目根目录新建 pytest.ini 文件，最简单的配置如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>pytest<span class="token punctuation">]</span>
log_cli <span class="token operator">=</span> <span class="token number">1</span>
log_cli_level <span class="token operator">=</span> INFO
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),x={href:"https://docs.pytest.org/en/stable/reference/customize.html",target:"_blank",rel:"noopener noreferrer"},q=t(`<h3 id="用例" tabindex="-1"><a class="header-anchor" href="#用例" aria-hidden="true">#</a> 用例</h3><p>pytest 会自动收集测试用例，要求用例满足以下规范：</p><ol><li>文件名以 test_ 开头，如：test_intention.py</li><li>用例名以 test_ 开头，如：def test_my_method():</li></ol><p>为避免加载不到自定义的函数，需要包含以下代码：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> os
<span class="token keyword">import</span> sys
<span class="token comment"># 确定当前目录的位置</span>
current_dir <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>abspath<span class="token punctuation">(</span>__file__<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 找到上级目录的路径</span>
parent_dir <span class="token operator">=</span> os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>current_dir<span class="token punctuation">)</span>
<span class="token comment"># 将上级目录路径添加到sys.path</span>
sys<span class="token punctuation">.</span>path<span class="token punctuation">.</span>append<span class="token punctuation">(</span>parent_dir<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给个实际的例子：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">import</span> logging
from langchain.chat_models <span class="token function">import</span> ChatOpenAI

<span class="token function">import</span> os
<span class="token function">import</span> sys
<span class="token comment"># 确定当前目录的位置</span>
current_dir <span class="token operator">=</span> os.path.dirname<span class="token punctuation">(</span>os.path.abspath<span class="token punctuation">(</span>__file__<span class="token punctuation">))</span>
<span class="token comment"># 找到上级目录的路径</span>
parent_dir <span class="token operator">=</span> os.path.dirname<span class="token punctuation">(</span>current_dir<span class="token punctuation">)</span>
<span class="token comment"># 将上级目录路径添加到sys.path</span>
sys.path.append<span class="token punctuation">(</span>parent_dir<span class="token punctuation">)</span>


<span class="token comment"># 辅助函数</span>
def check_intention<span class="token punctuation">(</span>question, expected_intention_type<span class="token punctuation">)</span>:
    intention_recognition_list <span class="token operator">=</span> handle_intention_recognition<span class="token punctuation">(</span>
        <span class="token assign-left variable">llm</span><span class="token operator">=</span>llm, <span class="token assign-left variable">question</span><span class="token operator">=</span>question<span class="token punctuation">)</span>

    intention_recognition <span class="token operator">=</span> intention_recognition_list.intentions<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    intention_type <span class="token operator">=</span> intention_recognition.type
    logging.info<span class="token punctuation">(</span>f<span class="token string">&#39;question: {question} intention: {intention_type}&#39;</span><span class="token punctuation">)</span>
    
    assert intention_type <span class="token operator">==</span> expected_intention_type
    
<span class="token comment"># 测试用例</span>
def test_check_indicator<span class="token punctuation">(</span><span class="token punctuation">)</span>:
    questions <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string">&#39;31999587库存情况？&#39;</span>,
        <span class="token string">&#39;31999587库存情况&#39;</span>,
        <span class="token string">&#39;31999587库存&#39;</span>,
        <span class="token string">&#39;商品73206430的库存情况？&#39;</span>,
        <span class="token string">&#39;商品63890590的采购信息？&#39;</span>,
        <span class="token string">&#39;商品51998031的进货信息？&#39;</span>,
        <span class="token string">&#39;52067610的铺店率是多少？&#39;</span>,
        <span class="token string">&#39;18323188的累计采购量与累计销售量是？&#39;</span>,
    <span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">question</span> <span class="token keyword">in</span> questions:
        check_intention<span class="token punctuation">(</span>question, IntentionType.CHECK_INDICATOR<span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在终端激活虚拟环境后，执行 <code>pytest</code>即可运行上述用例。</p><p>如果只想执行单个文件，则指定文件名即可：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pytest test/test_intent.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果想出错马上退出，带 -x 参数即可：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>pytest test<span class="token operator">/</span>test_intent<span class="token punctuation">.</span>py <span class="token operator">-</span>x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="持续集成" tabindex="-1"><a class="header-anchor" href="#持续集成" aria-hidden="true">#</a> 持续集成</h2><p>经过上述的步骤，我们可以在本地对自己的改动进行自动化的回归测试，但这还不够——因为有可能别人修改了代码，却不进行自测！</p><p>所以，我们还需要借助 CI 工具，在有人往代码仓库中提交改动后，立刻执行一次回归测试。</p>`,15),L={href:"https://levy.vip/git/gitlab-ci.html",target:"_blank",rel:"noopener noreferrer"},I=n("code",null,".gitlab-ci.yml",-1),C=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">image</span><span class="token punctuation">:</span> python<span class="token punctuation">:</span>3.10.13<span class="token punctuation">-</span>slim

<span class="token key atrule">stages</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> test
  <span class="token punctuation">-</span> build

<span class="token key atrule">pytest</span><span class="token punctuation">:</span>
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> test
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> pip install <span class="token punctuation">-</span>i https<span class="token punctuation">:</span>//pypi.tuna.tsinghua.edu.cn/simple <span class="token punctuation">-</span><span class="token punctuation">-</span>upgrade pip <span class="token important">&amp;&amp;</span> pip install <span class="token punctuation">-</span>i https<span class="token punctuation">:</span>//pypi.tuna.tsinghua.edu.cn/simple <span class="token punctuation">-</span>r requirements.txt
    <span class="token punctuation">-</span> pip install <span class="token punctuation">-</span>i https<span class="token punctuation">:</span>//pypi.tuna.tsinghua.edu.cn/simple pytest
    <span class="token punctuation">-</span> pytest <span class="token punctuation">-</span>x
  <span class="token key atrule">tags</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> your<span class="token punctuation">-</span>gitlab<span class="token punctuation">-</span>runner
    
<span class="token key atrule">build-and-push</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>stable
  <span class="token key atrule">stage</span><span class="token punctuation">:</span> build
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> chmod +x ./build<span class="token punctuation">-</span>image.sh
    <span class="token punctuation">-</span> ./build<span class="token punctuation">-</span>image.sh
  <span class="token key atrule">tags</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> your<span class="token punctuation">-</span>gitlab<span class="token punctuation">-</span>runner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>提交代码后就会触发自动化测试、构建镜像并推送。效果截图如下：<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702014482966-9391b0d1-906b-4c23-b74b-41c1a2dcc305.png" alt="" loading="lazy"><br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/md-image-kit/1702014525088-10240012-bad2-4b94-a06d-154adb3f1186.png" alt="" loading="lazy"></p>`,2);function N(w,E){const a=p("ExternalLinkIcon");return l(),o("div",null,[r,d,v,m,k,c(" more "),b,h,n("p",null,[s("pytest 的安装就有坑，如果是使用虚拟环境 "),_,s("，安装姿势不正确的话，就会在执行测试用例的时候报错："),g,s("，具体原因参考"),n("a",y,[s("这篇文章"),e(a)]),s("。")]),f,n("p",null,[s("更多的配置可参考"),n("a",x,[s("文档"),e(a)]),s("。")]),q,n("p",null,[s("以 Gitlab CI 为例（点击查看"),n("a",L,[s("安装教程"),e(a)]),s("），"),I,s(" 文件如下：")]),C])}const T=i(u,[["render",N],["__file","use-pytest-for-regression-testing-in-llm-app.html.vue"]]);export{T as default};

import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as i,e as u,a as n,b as s,d as t,f as p}from"./app-6a19a5a1.js";const l={},k=n("h1",{id:"给llm应用添加日志",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#给llm应用添加日志","aria-hidden":"true"},"#"),s(" 给LLM应用添加日志")],-1),d=n("h2",{id:"logging替代print",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#logging替代print","aria-hidden":"true"},"#"),s(" logging替代print")],-1),r=n("p",null,"目前公司的LLM应用开发使用的是 Python 技术栈，观察源码，发现没有多少日志，纵使有，也是用的 print。",-1),v=n("p",null,"print 的作用，就相当于 Java 的 System.out.print，相当于 Node.js 的 console.log，一般只适合在本地调试，不适合作为日志输出的。",-1),m={href:"https://stackoverflow.com/questions/29663459/why-doesnt-python-app-print-anything-when-run-in-a-detached-docker-container",target:"_blank",rel:"noopener noreferrer"},g={href:"https://stackoverflow.com/questions/24617397/how-do-i-print-to-console-in-pytest",target:"_blank",rel:"noopener noreferrer"},b=p(`<p>使用 Python 内置的日志模块 logging，直接 import 即可使用：</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> logging
<span class="token comment"># 在入口函数添加以下一行</span>
logging<span class="token punctuation">.</span>basicConfig<span class="token punctuation">(</span>level<span class="token operator">=</span>logging<span class="token punctuation">.</span>INFO<span class="token punctuation">)</span>

<span class="token comment"># 使用示例</span>
logging<span class="token punctuation">.</span>info<span class="token punctuation">(</span><span class="token string">&quot;log&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要在 pytest 中显示日志，还要在项目根目录添加 pytest.ini 文件，补充如下内容：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>pytest<span class="token punctuation">]</span>
log_cli <span class="token operator">=</span> <span class="token number">1</span>
log_cli_level <span class="token operator">=</span> INFO
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),f={href:"https://betterstack.com/community/guides/logging/how-to-start-logging-with-python/",target:"_blank",rel:"noopener noreferrer"},h=p(`<h2 id="何时打印日志" tabindex="-1"><a class="header-anchor" href="#何时打印日志" aria-hidden="true">#</a> 何时打印日志</h2><p>为避免排查线上问题时，被迫吐槽：“怎么一点日志都没有！”建议平时养成打日志的习惯，方便应用的迭代与维护。</p><p>下面给出一些通用的打印日志的实践建议，与语言无关，可按需采纳。</p><ol><li>外部调用</li><li>异常捕获</li><li>提前返回</li><li>复杂或特殊的if-else</li></ol><h3 id="外部调用" tabindex="-1"><a class="header-anchor" href="#外部调用" aria-hidden="true">#</a> 外部调用</h3><p>调用另一个应用的API，与中间件（如 redis, rocketmq）交互，都属于外部调用，最好调用前后都打印日志（当然，如果返回的数据量太大，酌情可以考虑省略打印部分返回信息）</p><p>示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;准备发送 mq&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">MQRequest</span> mqRequest <span class="token operator">=</span> <span class="token function">buildMQRequest</span><span class="token punctuation">(</span>dto<span class="token punctuation">)</span><span class="token punctuation">;</span>
mqApi<span class="token punctuation">.</span><span class="token function">sendMessage</span><span class="token punctuation">(</span>mqRequest<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token class-name">MqRequest</span> mqRequest<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> destination <span class="token operator">=</span> mqRequest<span class="token punctuation">.</span><span class="token function">getTopic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;:&quot;</span> <span class="token operator">+</span> mqRequest<span class="token punctuation">.</span><span class="token function">getTag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    rocketMQTemplate<span class="token punctuation">.</span><span class="token function">asyncSend</span><span class="token punctuation">(</span>destination<span class="token punctuation">,</span> <span class="token class-name">JSONObject</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>mqRequest<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">SendCallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSuccess</span><span class="token punctuation">(</span><span class="token class-name">SendResult</span> sendResult<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;发送成功, {}, 内容: {}&quot;</span><span class="token punctuation">,</span>sendResult<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">JSONObject</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>mqRequest<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token annotation punctuation">@Override</span>
        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onException</span><span class="token punctuation">(</span><span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;发送异常:&quot;</span><span class="token punctuation">,</span>throwable<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">retry</span><span class="token punctuation">(</span>mqRequest<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异常捕获" tabindex="-1"><a class="header-anchor" href="#异常捕获" aria-hidden="true">#</a> 异常捕获</h3><p>异常捕获后，一定要打印日志。实在想偷懒，直接打印堆栈信息都能授受。最忌讳的是，捕获了异常，然后什么都不做，直接把异常信息给“吃了”，这绝对是排查问题的恶手。</p><p>示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">saveDataToHive</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;累积{}条数据，开始存储！&quot;</span><span class="token punctuation">,</span> cachedDataList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token comment">//省略执行写文件操作代码...</span>
        
      log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;存储成功！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">logException</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> <span class="token string">&quot;保存数据时，把 CSV 文件内容写到 HDFS 上出错&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token comment">//省略关闭流代码...</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="提前返回" tabindex="-1"><a class="header-anchor" href="#提前返回" aria-hidden="true">#</a> 提前返回</h3><p>如果函数有提前 return 的逻辑，最好返回前也打印日志，不然排查问题时，发现请求进来了，却什么日志也没有，容易让人一头雾水。</p><p>示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Payload</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">MenuTreeVO</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token function">getMenuByAppId</span><span class="token punctuation">(</span><span class="token annotation punctuation">@Valid</span> <span class="token class-name">Param</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">checkoutSubscribe</span><span class="token punctuation">(</span>param<span class="token punctuation">.</span><span class="token function">getAppId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;checkoutSubscribe: false, 因此返回空数组&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Payload</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;checkoutSubscribe: true&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Payload</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>menuResourceService<span class="token punctuation">.</span><span class="token function">getAccountMenuList</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复杂或特殊的if-else" tabindex="-1"><a class="header-anchor" href="#复杂或特殊的if-else" aria-hidden="true">#</a> 复杂或特殊的if-else</h3><p>如何定义复杂，又如何定义特殊，这就见仁见智，需要个人在实践中去总结理解了。</p><p>一个常见的场景是，某段逻辑因为业务变化要加 if-else 进行特殊处理，你得在这个 if-else 前加上注释，解释其原因。那么这段逻辑就可以添加日志，日志内容就是你的注释内容，也即把注释改写成日志即可。</p><p>示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">SPECIAL_APP_CODE</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span><span class="token function">getAppCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;特殊应用，跳过从 plugin.json 读取配置的代码&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">else</span> <span class="token punctuation">{</span>
  log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;从 plugin.json 中读取配置...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  confs <span class="token operator">=</span> <span class="token class-name">CommonUtils</span><span class="token punctuation">.</span><span class="token function">readFromProperties</span><span class="token punctuation">(</span>localPath<span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkAndSetAppPlugins</span><span class="token punctuation">(</span><span class="token class-name">DatasourceDO</span> datasourceDO<span class="token punctuation">,</span> <span class="token class-name">SubApplicationDTO</span> subApplicationDTO<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>datasourceDO<span class="token punctuation">.</span><span class="token function">getIsUsePlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;检查 {} 插件中...&quot;</span><span class="token punctuation">,</span> subApplicationDTO<span class="token punctuation">.</span><span class="token function">getAppCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token class-name">String</span> datasourceType <span class="token operator">=</span> datasourceDO<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Long</span> datasourceTypeId <span class="token operator">=</span> <span class="token function">getTypeId</span><span class="token punctuation">(</span>datasourceType<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Objects</span><span class="token punctuation">.</span><span class="token function">isNull</span><span class="token punctuation">(</span>datasourceTypeId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ApplicationException</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s缺少%s的插件，请联系运营人员上传相应插件&quot;</span><span class="token punctuation">,</span>
                    subApplicationDTO<span class="token punctuation">.</span><span class="token function">getAppCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> datasourceType<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;完成检查, {} 存在 {} 插件...&quot;</span><span class="token punctuation">,</span> subApplicationDTO<span class="token punctuation">.</span><span class="token function">getAppCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> datasourceType<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">setAppPlugins</span><span class="token punctuation">(</span>driverPluginDOList<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;不需要检查插件&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23);function q(y,w){const a=o("ExternalLinkIcon");return c(),i("div",null,[k,d,r,v,u(" more "),n("p",null,[s("打包成 Docker 镜像时，Python 应用很可能看不到 "),n("a",m,[s("print 输出"),t(a)]),s("。使用 pytest 执行测试用例时，"),n("a",g,[s("默认也是看不到 print"),t(a)]),s(" 输出的。再加上 print 太简陋了，输出没有时间，没有级别分类，建议还是弃用，改用专门的日志模块。")]),b,n("p",null,[s("logging 模块完整的用法，可以"),n("a",f,[s("点击查看文章"),t(a)]),s("。")]),h])}const S=e(l,[["render",q],["__file","add-logging-for-llm-app.html.vue"]]);export{S as default};
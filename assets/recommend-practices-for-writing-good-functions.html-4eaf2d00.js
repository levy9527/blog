import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as c,c as l,a as n,b as a,d as e,f as p}from"./app-f6785c6e.js";const i={},u=p('<h1 id="编写函数的最佳实践" tabindex="-1"><a class="header-anchor" href="#编写函数的最佳实践" aria-hidden="true">#</a> 编写函数的最佳实践</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>编写函数的目的，最根本的目的是提高可维护性，从而提高研发效率。</p><p>本文将推荐一些编写函数的最佳实践，以供参数。</p><h3 id="减少重复" tabindex="-1"><a class="header-anchor" href="#减少重复" aria-hidden="true">#</a> 减少重复</h3>',5),d={href:"https://en.wikipedia.org/wiki/Don%27t_repeat_yourself",target:"_blank",rel:"noopener noreferrer"},r=p(`<p>实践中可以采取一个简单的判断方法：当相同的代码段第二次出现时，就是需要把代码封装成函数的契机。</p><p>然而，有时代码只是相似，不完全相同，不能简单地使用 IDEA 右键 + Refactor + Extract Method 来抽取函数。<br> 此时，为减少重复，需要进行一些思考。</p><p>可以把程序的划分成三个部分：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Program</span> <span class="token operator">=</span> <span class="token class-name">Control</span> <span class="token operator">+</span> <span class="token class-name">Logic</span> <span class="token operator">+</span> <span class="token class-name">Data</span> <span class="token class-name">Structure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一般而言，函数的入参都是数据变量，也即 Data Structure。<br> 而 Java 8 以后，lambda 表达式（也即函数）可以作为入参，其代表的是 Logic。<br> 因此，最抽象的函数，是只定义了 Control、把 Logic 及 Data Structure 都作为入参的函数。当遇到类似却不完全相同的代码、想封装函数有遇难时，可以借助上述思路来梳理逻辑。</p><h3 id="隐藏细节" tabindex="-1"><a class="header-anchor" href="#隐藏细节" aria-hidden="true">#</a> 隐藏细节</h3><p>隐藏细节，是为了减少使用者的心智负担，方便其调用。</p><p>有一个简单的判断标准：如果调用者需要频繁查看函数内部情况，以确定函数的目的或实现细节，那么隐藏细节的意图是失败的。</p><h2 id="建议" tabindex="-1"><a class="header-anchor" href="#建议" aria-hidden="true">#</a> 建议</h2><p>为了达到前文所述的目的，如以下实践建议。需要指出的是，以下提倡的是建议，并非金科玉律；只适用于一般情况，并非所有情况，特殊情况是可以特殊处理的。</p><h3 id="优先根据业务命名" tabindex="-1"><a class="header-anchor" href="#优先根据业务命名" aria-hidden="true">#</a> 优先根据业务命名</h3><p>一般而言，函数名最好是根据业务逻辑、结合业务领域来命名，而不是根据程序逻辑来命名。</p><p>示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// bad</span>
<span class="token class-name">String</span> <span class="token function">getString</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// good</span>
<span class="token class-name">String</span> <span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token class-name">UserDTO</span> user<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，如果有些方法名是专业名词或是耳熟能详的，那直接使用即可，如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">void</span> <span class="token function">bfs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">shortestPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">void</span> <span class="token function">binarySearch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="一个函数只做一件事" tabindex="-1"><a class="header-anchor" href="#一个函数只做一件事" aria-hidden="true">#</a> 一个函数只做一件事</h3>`,17),k={href:"https://en.wikipedia.org/wiki/KISS_principle",target:"_blank",rel:"noopener noreferrer"},m=p(`<p>当然，不可能所有函数都达到这个要求——程序入口一般就会做很多事。我们的目标是尽可能地遵守该原则，减少调用者需要频繁查看函数实现的可能。</p><p>反例1：做A且做B</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// bad</span>
<span class="token keyword">int</span> <span class="token function">doSomethingAndAnother</span><span class="token punctuation">(</span><span class="token class-name">Param</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// good </span>
<span class="token comment">// 拆分成两个函数</span>
<span class="token keyword">int</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token class-name">ParamA</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">doAnother</span><span class="token punctuation">(</span><span class="token class-name">ParamB</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>坏的示例问题出在哪里呢？根据入参的合法性，有可能产生以下情况：</p><ol><li>参数合法，同时做A与B；只要有一个参数不合法，均不做A与B</li><li>哪个合法就做哪个，也即可能出现： <ol><li>只做A</li><li>只做B</li><li>做A也做B</li><li>二者均不做</li></ol></li></ol><p>到底是什么情况呢？对此疑问，调用方只有查看函数实现，才能了解，于是破坏了封装的意图。<br> 而且，坏的示例还会存在一个问题：如果调用方只想做A怎么办？我想很少人会把原代码拆分成两个函数，更常见的做法是保持原函数不变，并拷贝原函数的部分逻辑，封装一个只做A的新函数——这就造成了代码的冗余，于是减少重复的目的失败了。</p><p>反例2：做A或做B</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// bad</span>
<span class="token keyword">int</span> <span class="token function">doSomethingOrAnother</span><span class="token punctuation">(</span><span class="token class-name">Param</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// good </span>
<span class="token comment">// 拆分成两个函数</span>
<span class="token keyword">int</span> <span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token class-name">ParamA</span> a<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> <span class="token function">doAnother</span><span class="token punctuation">(</span><span class="token class-name">ParamB</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样的，坏的示例会让人疑惑，搞不清楚函数的意图到底属于以下哪种情况：</p><ol><li>要么做A，要么做B，一定会做其中一个</li><li>哪个合法做哪个，可能会出现： <ol><li>只做A</li><li>只做B</li><li>做A也做B</li><li>二者均不做</li></ol></li></ol><p>当然，一些常见的深入人心的 API，我们是可以接受这种“或逻辑”的：</p><ul><li>saveOrUpdate() // 有 id 就是 update，没有就是 insert</li><li>getOrDefault() // 获取值；如果值不存在，就返回默认值</li></ul><h3 id="优先使用纯函数" tabindex="-1"><a class="header-anchor" href="#优先使用纯函数" aria-hidden="true">#</a> 优先使用纯函数</h3><p>纯函数(pure function)，可以借助数学中的函数概念来理解：y = f(x)</p><ul><li>给定 x，能返回确定的 y</li><li>无论函数调用几次、在何处调用，上述结果都不会变化</li></ul><p>纯函数的好处之一是无副作用（side effect）。也即调用函数后，不会对函数作用域以外的变量造成影响。</p><p>反例：一个常见的现象，辅助函数会修改入参，主函数的变量生命周期贯穿整个主函数</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Result</span> <span class="token function">getRelation</span><span class="token punctuation">(</span><span class="token class-name">String</span> nodeId<span class="token punctuation">,</span> <span class="token class-name">Param</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略其他代码</span>
    
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token punctuation">&gt;</span></span> nodesMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   

    <span class="token comment">// 没有返回值</span>
    <span class="token function">getUpstream</span><span class="token punctuation">(</span>nodeId<span class="token punctuation">,</span> nodesMap<span class="token punctuation">,</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// “废物利用”！</span>
    nodesMap<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 没有返回值</span>
    <span class="token function">getDownstream</span><span class="token punctuation">(</span>nodeId<span class="token punctuation">,</span> nodesMap<span class="token punctuation">,</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">NodeDTO</span><span class="token punctuation">&gt;</span></span> nodesDtoMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">getResult</span><span class="token punctuation">(</span>nodesDtoMap<span class="token punctuation">,</span> nodesMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为已经省略了其他代码，因此我们不难看出 <code>nodesMap</code>是辅助变量，是为返回结果而服务的，而没有返回值的函数调用很可能修改了该变量。</p><p>但实际上，代码逻辑很长，还有其他变量掺杂其中，代码意图并非能够一目了然。假设稍微修改一下，为 <code>getUpstream()</code>添加多一个参数，还能看出函数到底修改了哪个变量吗？</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token punctuation">&gt;</span></span> nodesMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// 添加多一个变量</span>
<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Edge</span><span class="token punctuation">&gt;</span></span> edgesMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">getUpstream</span><span class="token punctuation">(</span>nodeId<span class="token punctuation">,</span> nodesMap<span class="token punctuation">,</span> edgesMap<span class="token punctuation">,</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code>edgesMap</code>是来自主函数的参数呢？</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Result</span> <span class="token function">getRelation</span><span class="token punctuation">(</span><span class="token class-name">String</span> nodeId<span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Edge</span><span class="token punctuation">&gt;</span></span> edgesMap<span class="token punctuation">,</span> <span class="token class-name">Param</span> param<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略其他代码</span>
    
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Long</span><span class="token punctuation">,</span> <span class="token class-name">Node</span><span class="token punctuation">&gt;</span></span> nodesMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   

    <span class="token comment">// edgesMap 是主函数传参</span>
    <span class="token function">getUpstream</span><span class="token punctuation">(</span>nodeId<span class="token punctuation">,</span> nodesMap<span class="token punctuation">,</span> edgesMap<span class="token punctuation">,</span> param<span class="token punctuation">)</span><span class="token punctuation">;</span>
       
    <span class="token comment">// 省略其他代码 </span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>情况变得糟糕了，因为按照 <code>getUpstream()</code>会修改入参的“习性”，我们很难有信心认为 <code>edgesMap</code>一定没有被修改。</p><p>上述例子是想表明：为了贪图方便，编写一个不需要返回值而直接修改入参的函数，会给后续的维护增加负担。一方面变量状态难以追踪，另一方面这样的函数也不方便测试。</p><p>一般而言，优先使用纯函数，会助于对大函数的拆分，从而使得 KISS 原则更容易被遵守。</p><p>当然，总有例外情况。当程序逻辑复杂时，或有些函数就是对 setter 语句的调用，此时不需要返回值并且会造成副作用，又该怎么办呢？请看下一条建议。</p><h3 id="编写不需要返回值的函数" tabindex="-1"><a class="header-anchor" href="#编写不需要返回值的函数" aria-hidden="true">#</a> 编写不需要返回值的函数</h3><p>有如下建议：</p>`,29),v=n("ol",null,[n("li",{要修改的变量名:""},[a("方法名叫"),n("code",null,"setup"),a("+ $")]),n("li",null,"一个方法只修改一个变量"),n("li",null,"要修改的变量就是函数的第一个参数"),n("li",null,"lambda（如果有的话） 作为最后的参数")],-1),g=p(`<p>示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token function">setupNodeCommonInfo</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> nodeId<span class="token punctuation">,</span> queryUpstream<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">setupNodeTableInfo</span><span class="token punctuation">(</span>node<span class="token punctuation">,</span> nodeId2Table<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setupEdgeCrossLayer</span><span class="token punctuation">(</span>edges<span class="token punctuation">,</span> <span class="token class-name">Edge</span><span class="token operator">::</span><span class="token function">getSourceId</span><span class="token punctuation">,</span> <span class="token class-name">Edge</span><span class="token operator">::</span><span class="token function">getTargetId</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,3),b={href:"https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch03",target:"_blank",rel:"noopener noreferrer"},h={href:"http://aroma.vn/web/wp-content/uploads/2016/11/code-complete-2nd-edition-v413hav.pdf",target:"_blank",rel:"noopener noreferrer"};function f(_,M){const s=o("ExternalLinkIcon");return c(),l("div",null,[u,n("p",null,[a("这是在遵守 "),n("a",d,[a("Don't repeat yourself"),e(s)]),a(" (DRY) 原则。")]),r,n("p",null,[a("遵守 "),n("a",k,[a("Keep it simple stupid"),e(s)]),a(" (KISS) 原则。")]),m,v,g,n("ul",null,[n("li",null,[n("a",b,[a("functional-programming-mostly-adequate-guide/ch03"),e(s)])]),n("li",null,[n("a",h,[a("code-complete-2nd-edition.pdf"),e(s)])])])])}const j=t(i,[["render",f],["__file","recommend-practices-for-writing-good-functions.html.vue"]]);export{j as default};
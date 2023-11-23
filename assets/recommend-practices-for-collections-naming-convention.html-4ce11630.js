import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as s,f as e}from"./app-a9d55428.js";const t={},p=e(`<h1 id="集合命名推荐" tabindex="-1"><a class="header-anchor" href="#集合命名推荐" aria-hidden="true">#</a> 集合命名推荐</h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2><p>建议给常用集合类的变量命名时，后缀带上相应的集合信息，以提高可读性。</p><p>当然，在此之前要回答一个问题：当把鼠标放到变量上面时，IDE 会提示变量的类型，为什么还要在命名上做文章？<br><img src="https://cdn.nlark.com/yuque/0/2022/png/160590/1654049668320-c53d0ef6-4063-4163-aa3e-2c304af4e39a.png" alt="image.png" loading="lazy"></p><p>这是因为，有时并不在 IDE 上阅读代码，比如进行 GitHub 或 GitLab 进行 code review，此时无法获得提示，需要通过命名的规范来帮助理解。</p><h2 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h2><p>List 的变量，一般以 List 或 s 结尾， 如 idList 或 ids。这点易于理解，大家也容易遵守。</p><p>坏的示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>nodeType<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>t <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// 省略代码</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一眼看到这代码的时候，不知道读者是什么反应？</p><p>按照习惯，nodeType 通常要么是字符串、数字、或枚举，但上述居然能调用 forEach 方法？我不禁愣了一下，赶紧去看了下定义，才发现原来是List。</p><p>好的示例：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>nodeTypes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>t <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 或</span>
nodeTypeList<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>t <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h2><p>参考List，在变量后面加 Set 即可。</p><h2 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h2><p>Map 的变量命名是值得重点关注，因为很容易造成差可读性的重灾区。</p><p>Map 的变量，推荐根据 key 与 value 来命名。规则表达式为：\${key} + To + \${value} + Map，如 idToNameMap。<br> 其中：</p><ul><li>可以玩一下“文字游戏”，把 To 写成 2（就像把 For 写成 4，这种 word play 是可以接受的），即 id2NameMap</li><li>如果名字够清晰或已经很长，Map 可以省略，如 id2Name</li></ul><p>为什么推荐这样命名？我们先来看一则案例，看一看经典的 Map&lt;String, String&gt; 在实际编码中，命名是如何造成理解上的困难的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableNode</span><span class="token punctuation">&gt;</span></span> tableNodes <span class="token operator">=</span> <span class="token function">getFromSomePlace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> tableIdMaps <span class="token operator">=</span> <span class="token function">getFromAnotherPlace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token comment">// 重点看下面两行代码</span>
<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> tableMaps <span class="token operator">=</span> <span class="token function">getTableIdMap</span><span class="token punctuation">(</span>tableNodes<span class="token punctuation">,</span> tableIdMaps<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token function">replaceNodeId</span><span class="token punctuation">(</span>tableNodes<span class="token punctuation">,</span> tableMaps<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>getTableIdMap</code>核心实现如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 谜之代码</span>
tableNodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tableNode <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> tableNodeId <span class="token operator">=</span> <span class="token function">getTableNodeId</span><span class="token punctuation">(</span>tableIdMaps<span class="token punctuation">)</span><span class="token punctuation">;</span>
    tableMaps<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>tableNode<span class="token punctuation">.</span><span class="token function">getNodeId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> tableNodeId<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//？？？</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> tableMaps<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>replaceNodeId</code>核心实现如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 谜之代码</span>
tableNodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tableNode <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> nodeId <span class="token operator">=</span> tableMaps<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>tableNode<span class="token punctuation">.</span><span class="token function">getNodeId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// ？？？</span>
    tableNode<span class="token punctuation">.</span><span class="token function">setNodeId</span><span class="token punctuation">(</span>nodeId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不知读者是否已经晕了？反正我是一头雾水。可能以为是因为我删减了很多代码导致的？恰恰相反，实际代码还有更多的逻辑判断，我已经抽出了核心部分，不需要被其他逻辑干扰了。</p><p>上面的代码带来的疑问有：<br> 疑问1：都是 <code>Map&lt;String, String&gt;</code>，<code>tableIdMaps</code> 与 <code>tableMaps</code> 有什么区别，它们存储的到底是什么？从类型上看，也不像是 id -&gt; table 的映射啊。<br> 疑问2：<code>tableMaps.put(tableNode.getNodeId(), tableNodeId);</code> 这个 <code>tableNode.getNodeId()</code> 不是等于 <code>tableNodeId</code>吗？<br> 疑问3：<code>String nodeId = tableMaps.get(tableNode.getNodeId()); </code>根据 nodeId 拿到 nodeId？</p><p>到这里已可以猜到，<code>tableMaps</code>里的 key 与 value 肯定不是单纯的 nodeId 的意思，但这并没有什么帮助，因为我们还是不知道 <code>tableMaps</code> key -&gt; value 映射的到底是什么。</p><p>我们来看修改变量名之后，上述代码的效果。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">TableNode</span><span class="token punctuation">&gt;</span></span> tableNodes <span class="token operator">=</span> <span class="token function">getFromSomePlace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//修改下面两个 Map 的命名</span>
<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> str2TableIdMap <span class="token operator">=</span> <span class="token function">getFromAnotherPlace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> nodeId2TableIdMap <span class="token operator">=</span> <span class="token function">getTableIdMap</span><span class="token punctuation">(</span>tableNodes<span class="token punctuation">,</span> str2TableIdMap<span class="token punctuation">)</span><span class="token punctuation">;</span> 

<span class="token function">replaceNodeId</span><span class="token punctuation">(</span>tableNodes<span class="token punctuation">,</span> nodeId2TableIdMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>tableNodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tableNode <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> tableId <span class="token operator">=</span> <span class="token function">getTableNodeId</span><span class="token punctuation">(</span>str2TableIdMap<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 修改了这行</span>
    nodeId2TableIdMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>tableNode<span class="token punctuation">.</span><span class="token function">getNodeId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> tableId<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 修改了这行</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> nodeId2TableIdMap<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>tableNodes<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>tableNode <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> tableId <span class="token operator">=</span> nodeId2TableIdMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>tableNode<span class="token punctuation">.</span><span class="token function">getNodeId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">//修改了这行</span>
    tableNode<span class="token punctuation">.</span><span class="token function">setNodeId</span><span class="token punctuation">(</span>tableId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在是不是好懂很多了：</p><ul><li>str2TableIdMap 存储的 str -&gt; tableId 的映射, 其中 str 是由某种规则拼接而成的字符串，具体规则封装在了 <code>getTableNodeId</code>这个函数里，我们暂时可以不用关心</li><li>nodeId2TableIdMap 存储的是 nodeId -&gt; tableId 的映射</li></ul><p>仅仅修改变量名，可读性就有大大提高，效果立竿见影！</p>`,35),o=[p];function c(l,i){return a(),s("div",null,o)}const r=n(t,[["render",c],["__file","recommend-practices-for-collections-naming-convention.html.vue"]]);export{r as default};
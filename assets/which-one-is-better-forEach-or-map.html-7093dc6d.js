const a=JSON.parse('{"key":"v-0d6828c2","path":"/java/which-one-is-better-forEach-or-map.html","title":"forEach 还是 map？","lang":"zh-CN","frontmatter":{"date":"2022-04-05T00:00:00.000Z","tag":["Java","Daily"],"description":"forEach 还是 map？ 背景 遍历一个集合，在里面执行某种操作后，再依次返回每一个元素，常见的实现方式有： List&lt;Type&gt; result = new ArrayList&lt;&gt;(); list.forEach(src -&gt; { Type target = BeanUtils.copyProperties(src, target); //省略代码 result.add(target); });","head":[["meta",{"property":"og:url","content":"https://levy.vip/java/which-one-is-better-forEach-or-map.html"}],["meta",{"property":"og:site_name","content":"levy"}],["meta",{"property":"og:title","content":"forEach 还是 map？"}],["meta",{"property":"og:description","content":"forEach 还是 map？ 背景 遍历一个集合，在里面执行某种操作后，再依次返回每一个元素，常见的实现方式有： List&lt;Type&gt; result = new ArrayList&lt;&gt;(); list.forEach(src -&gt; { Type target = BeanUtils.copyProperties(src, target); //省略代码 result.add(target); });"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-29T11:33:02.000Z"}],["meta",{"property":"article:author","content":"levy"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Daily"}],["meta",{"property":"article:published_time","content":"2022-04-05T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-29T11:33:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"forEach 还是 map？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-04-05T00:00:00.000Z\\",\\"dateModified\\":\\"2024-04-29T11:33:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"levy\\"}]}"]]},"headers":[{"level":2,"title":"背景","slug":"背景","link":"#背景","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]},{"level":2,"title":"解析","slug":"解析","link":"#解析","children":[]},{"level":2,"title":"实战","slug":"实战","link":"#实战","children":[]}],"git":{"createdTime":1714390382000,"updatedTime":1714390382000,"contributors":[{"name":"levy","email":"897895407@qq.com","commits":1}]},"readingTime":{"minutes":3.67,"words":1102},"filePathRelative":"java/which-one-is-better-forEach-or-map.md","localizedDate":"2022年4月5日","excerpt":"<h1> forEach 还是 map？</h1>\\n<h2> 背景</h2>\\n<p>遍历一个集合，在里面执行某种操作后，再依次返回每一个元素，常见的实现方式有：</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token class-name\\">List</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token class-name\\">Type</span><span class=\\"token punctuation\\">&gt;</span></span> result <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ArrayList</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nlist<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">forEach</span><span class=\\"token punctuation\\">(</span>src <span class=\\"token operator\\">-&gt;</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token class-name\\">Type</span> target <span class=\\"token operator\\">=</span> <span class=\\"token class-name\\">BeanUtils</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">copyProperties</span><span class=\\"token punctuation\\">(</span>src<span class=\\"token punctuation\\">,</span> target<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token comment\\">//省略代码</span>\\n    result<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">add</span><span class=\\"token punctuation\\">(</span>target<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{a as data};

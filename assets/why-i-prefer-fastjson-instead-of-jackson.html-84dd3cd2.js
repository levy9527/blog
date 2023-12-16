const e=JSON.parse('{"key":"v-1aafac08","path":"/java/why-i-prefer-fastjson-instead-of-jackson.html","title":"Jackson 经典异常 UnrecognizedPropertyException","lang":"zh-CN","frontmatter":{"date":"2023-08-21T00:00:00.000Z","tag":["Java","Daily","Video"],"description":"Jackson 经典异常 UnrecognizedPropertyException 原因是 json 包含的字段，多于 Java 实体类定义的字段。 解决方法很简单： new ObjectMapper() .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false) 或者为相关实体添加注解： @JsonIgnoreProperties(ignoreUnknown = true) public class ObjectParseFromJsonString { }","head":[["meta",{"property":"og:url","content":"https://levy.vip/java/why-i-prefer-fastjson-instead-of-jackson.html"}],["meta",{"property":"og:site_name","content":"levy"}],["meta",{"property":"og:title","content":"Jackson 经典异常 UnrecognizedPropertyException"}],["meta",{"property":"og:description","content":"Jackson 经典异常 UnrecognizedPropertyException 原因是 json 包含的字段，多于 Java 实体类定义的字段。 解决方法很简单： new ObjectMapper() .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false) 或者为相关实体添加注解： @JsonIgnoreProperties(ignoreUnknown = true) public class ObjectParseFromJsonString { }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-12-16T18:48:51.000Z"}],["meta",{"property":"article:author","content":"levy"}],["meta",{"property":"article:tag","content":"Java"}],["meta",{"property":"article:tag","content":"Daily"}],["meta",{"property":"article:tag","content":"Video"}],["meta",{"property":"article:published_time","content":"2023-08-21T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-12-16T18:48:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jackson 经典异常 UnrecognizedPropertyException\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-21T00:00:00.000Z\\",\\"dateModified\\":\\"2023-12-16T18:48:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"levy\\"}]}"]]},"headers":[],"git":{"createdTime":1702752531000,"updatedTime":1702752531000,"contributors":[{"name":"levy","email":"897895407@qq.com","commits":1}]},"readingTime":{"minutes":0.36,"words":109},"filePathRelative":"java/why-i-prefer-fastjson-instead-of-jackson.md","localizedDate":"2023年8月21日","excerpt":"<h1> Jackson 经典异常 UnrecognizedPropertyException</h1>\\n<p>原因是 json 包含的字段，多于 Java 实体类定义的字段。</p>\\n<p>解决方法很简单：</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">ObjectMapper</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span>\\n  <span class=\\"token punctuation\\">.</span><span class=\\"token function\\">configure</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">DeserializationFeature</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">FAIL_ON_UNKNOWN_PROPERTIES</span><span class=\\"token punctuation\\">,</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><p>或者为相关实体添加注解：</p>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@JsonIgnoreProperties</span><span class=\\"token punctuation\\">(</span>ignoreUnknown <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ObjectParseFromJsonString</span> <span class=\\"token punctuation\\">{</span>  <span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{e as data};

const t=JSON.parse('{"key":"v-79e139f8","path":"/daily/beyond-utf8-do-you-know-utf8mb4-and-collation.html","title":"Beyond UTF-8, do you know utf8mb4 and utf8mb4_unicode_ci?","lang":"zh-CN","frontmatter":{"date":"2023-08-15T00:00:00.000Z","tag":["Daily","Video","MySQL"],"description":"Beyond UTF-8, do you know utf8mb4 and utf8mb4_unicode_ci? Background Look at the DDL below, can you tell the meaning of CHARSET=utf8mb4 and COLLATE=utf8mb4_general_ci? CREATE TABLE `my_table` ( `id` bigint NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`) USING BTREE ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; That is the knowledge that today I want to share with you.","head":[["meta",{"property":"og:url","content":"https://levy.vip/daily/beyond-utf8-do-you-know-utf8mb4-and-collation.html"}],["meta",{"property":"og:site_name","content":"levy"}],["meta",{"property":"og:title","content":"Beyond UTF-8, do you know utf8mb4 and utf8mb4_unicode_ci?"}],["meta",{"property":"og:description","content":"Beyond UTF-8, do you know utf8mb4 and utf8mb4_unicode_ci? Background Look at the DDL below, can you tell the meaning of CHARSET=utf8mb4 and COLLATE=utf8mb4_general_ci? CREATE TABLE `my_table` ( `id` bigint NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`) USING BTREE ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; That is the knowledge that today I want to share with you."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-14T08:18:51.000Z"}],["meta",{"property":"article:author","content":"levy"}],["meta",{"property":"article:tag","content":"Daily"}],["meta",{"property":"article:tag","content":"Video"}],["meta",{"property":"article:tag","content":"MySQL"}],["meta",{"property":"article:published_time","content":"2023-08-15T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-09-14T08:18:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Beyond UTF-8, do you know utf8mb4 and utf8mb4_unicode_ci?\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-15T00:00:00.000Z\\",\\"dateModified\\":\\"2023-09-14T08:18:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"levy\\"}]}"]]},"headers":[{"level":2,"title":"Background","slug":"background","link":"#background","children":[]},{"level":2,"title":"utf8mb4(UTF-8 MultiByte 4-Byte)","slug":"utf8mb4-utf-8-multibyte-4-byte","link":"#utf8mb4-utf-8-multibyte-4-byte","children":[]},{"level":2,"title":"utf8mb4_unicode_ci","slug":"utf8mb4-unicode-ci","link":"#utf8mb4-unicode-ci","children":[]},{"level":2,"title":"Some tips","slug":"some-tips","link":"#some-tips","children":[]}],"git":{"createdTime":1694679531000,"updatedTime":1694679531000,"contributors":[{"name":"levy","email":"levy9527@gmail.com","commits":1}]},"readingTime":{"minutes":1.78,"words":533},"filePathRelative":"daily/beyond-utf8-do-you-know-utf8mb4-and-collation.md","localizedDate":"2023年8月15日","excerpt":"<h1> Beyond UTF-8, do you know utf8mb4 and utf8mb4_unicode_ci?</h1>\\n<h2> Background</h2>\\n<p>Look at the DDL below, can you tell the meaning of <code>CHARSET=utf8mb4</code> and <code>COLLATE=utf8mb4_general_ci</code>?</p>\\n<div class=\\"language-sql line-numbers-mode\\" data-ext=\\"sql\\"><pre class=\\"language-sql\\"><code><span class=\\"token keyword\\">CREATE</span> <span class=\\"token keyword\\">TABLE</span> <span class=\\"token identifier\\"><span class=\\"token punctuation\\">`</span>my_table<span class=\\"token punctuation\\">`</span></span> <span class=\\"token punctuation\\">(</span>\\n  <span class=\\"token identifier\\"><span class=\\"token punctuation\\">`</span>id<span class=\\"token punctuation\\">`</span></span> <span class=\\"token keyword\\">bigint</span> <span class=\\"token operator\\">NOT</span> <span class=\\"token boolean\\">NULL</span> <span class=\\"token keyword\\">AUTO_INCREMENT</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token keyword\\">PRIMARY</span> <span class=\\"token keyword\\">KEY</span> <span class=\\"token punctuation\\">(</span><span class=\\"token identifier\\"><span class=\\"token punctuation\\">`</span>id<span class=\\"token punctuation\\">`</span></span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">USING</span> <span class=\\"token keyword\\">BTREE</span>\\n<span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">ENGINE</span><span class=\\"token operator\\">=</span><span class=\\"token keyword\\">InnoDB</span> <span class=\\"token keyword\\">DEFAULT</span> <span class=\\"token keyword\\">CHARSET</span><span class=\\"token operator\\">=</span>utf8mb4 <span class=\\"token keyword\\">COLLATE</span><span class=\\"token operator\\">=</span>utf8mb4_general_ci<span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div><p>That is the knowledge that today I want to share with you.</p>\\n","autoDesc":true}');export{t as data};

const e=JSON.parse('{"key":"v-4f919602","path":"/daily/testing-environments-should-be-consistent-with-production-environments.html","title":"生产教训：测试环境要与生产环境一致","lang":"zh-CN","frontmatter":{"date":"2023-11-12T00:00:00.000Z","tag":["Daily"],"description":"生产教训：测试环境要与生产环境一致 事件还原 业务流程： app-a 上传文件 app-b 下载文件后使用文件 其他信息： 开发、测试环境使用 MinIO 生产环境使用 Amazon S3 问题： app-a 上传文件成功 app-b 使用文件报错 逐步分析定位问题： app-a 与 app-b　配置是否一致？——确认都是使用 S3 S3 是否正确配置？有没权限问题？——确认配置正确，没有权限问题 app-a 是否真的上传成功？——确认文件已在 S3 app-b 是否下载成功？——根据日志，判断下载失败，得到的信息是：文件不存在。","head":[["meta",{"property":"og:url","content":"https://levy.vip/daily/testing-environments-should-be-consistent-with-production-environments.html"}],["meta",{"property":"og:site_name","content":"levy"}],["meta",{"property":"og:title","content":"生产教训：测试环境要与生产环境一致"}],["meta",{"property":"og:description","content":"生产教训：测试环境要与生产环境一致 事件还原 业务流程： app-a 上传文件 app-b 下载文件后使用文件 其他信息： 开发、测试环境使用 MinIO 生产环境使用 Amazon S3 问题： app-a 上传文件成功 app-b 使用文件报错 逐步分析定位问题： app-a 与 app-b　配置是否一致？——确认都是使用 S3 S3 是否正确配置？有没权限问题？——确认配置正确，没有权限问题 app-a 是否真的上传成功？——确认文件已在 S3 app-b 是否下载成功？——根据日志，判断下载失败，得到的信息是：文件不存在。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-11-22T09:59:56.000Z"}],["meta",{"property":"article:author","content":"levy"}],["meta",{"property":"article:tag","content":"Daily"}],["meta",{"property":"article:published_time","content":"2023-11-12T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-11-22T09:59:56.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"生产教训：测试环境要与生产环境一致\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-11-12T00:00:00.000Z\\",\\"dateModified\\":\\"2023-11-22T09:59:56.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"levy\\"}]}"]]},"headers":[{"level":2,"title":"事件还原","slug":"事件还原","link":"#事件还原","children":[]},{"level":2,"title":"分析","slug":"分析","link":"#分析","children":[]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1700647196000,"updatedTime":1700647196000,"contributors":[{"name":"levy","email":"chenriwei@deepexi.com","commits":1}]},"readingTime":{"minutes":2.49,"words":748},"filePathRelative":"daily/testing-environments-should-be-consistent-with-production-environments.md","localizedDate":"2023年11月12日","excerpt":"<h1> 生产教训：测试环境要与生产环境一致</h1>\\n<h2> 事件还原</h2>\\n<p>业务流程：</p>\\n<ol>\\n<li>app-a 上传文件</li>\\n<li>app-b 下载文件后使用文件</li>\\n</ol>\\n<p>其他信息：</p>\\n<ol>\\n<li>开发、测试环境使用 MinIO</li>\\n<li>生产环境使用 Amazon S3</li>\\n</ol>\\n<p>问题：</p>\\n<ol>\\n<li>app-a 上传文件成功</li>\\n<li>app-b 使用文件报错</li>\\n</ol>\\n<p>逐步分析定位问题：</p>\\n<ol>\\n<li>app-a 与 app-b　配置是否一致？——确认都是使用 S3</li>\\n<li>S3 是否正确配置？有没权限问题？——确认配置正确，没有权限问题</li>\\n<li>app-a 是否真的上传成功？——确认文件已在 S3</li>\\n<li>app-b 是否下载成功？——根据日志，判断下载失败，得到的信息是：文件不存在。</li>\\n</ol>","autoDesc":true}');export{e as data};

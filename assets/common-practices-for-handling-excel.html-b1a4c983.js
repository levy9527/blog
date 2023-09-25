import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-abd65974.js";const p={},e=t(`<h1 id="excel处理常用实践" tabindex="-1"><a class="header-anchor" href="#excel处理常用实践" aria-hidden="true">#</a> Excel处理常用实践</h1><h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2><p>导入需要用到对象，MultipartFile。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/import&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">importLicense</span><span class="token punctuation">(</span>
      <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span> <span class="token class-name">MultipartFile</span> file<span class="token punctuation">,</span>
      <span class="token annotation punctuation">@RequestParam</span><span class="token punctuation">(</span><span class="token string">&quot;tenantId&quot;</span><span class="token punctuation">)</span> <span class="token annotation punctuation">@NotBlank</span> <span class="token class-name">String</span> tenantId<span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>导出需要用到对象：HttpServletResponse。作为 Controller 的最后一个入参即可，框架会自动注入。<br> 也可以从请求上下文获取：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ServletRequestAttributes</span> servletRequestAttributes <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ServletRequestAttributes</span><span class="token punctuation">)</span> <span class="token class-name">RequestContextHolder</span><span class="token punctuation">.</span><span class="token function">getRequestAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">HttpServletResponse</span> response <span class="token operator">=</span> servletRequestAttributes<span class="token punctuation">.</span><span class="token function">getResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时注意设置响应头：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/exmport/{id}&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">download</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">&quot;id&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> id<span class="token punctuation">,</span> <span class="token class-name">HttpServletResponse</span> response<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 这是普通文本文件下载的响应头，excel 有更具体的设置，在文章后面</span>
      response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&quot;application/octet-stream&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      response<span class="token punctuation">.</span><span class="token function">setHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Disposition&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;attachment;filename=license-&quot;</span> <span class="token operator">+</span> license<span class="token punctuation">.</span><span class="token function">getIdentifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
      <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">OutputStream</span> outputStream <span class="token operator">=</span> response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>licenseEncryption<span class="token punctuation">.</span><span class="token function">getDigest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;\\n&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        outputStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>licenseEncryption<span class="token punctuation">.</span><span class="token function">getCipherText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        outputStream<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ApplicationException</span><span class="token punctuation">(</span><span class="token string">&quot;下载出错&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span><span class="token function">getCause</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="应用框架" tabindex="-1"><a class="header-anchor" href="#应用框架" aria-hidden="true">#</a> 应用框架</h2><h3 id="导出" tabindex="-1"><a class="header-anchor" href="#导出" aria-hidden="true">#</a> 导出</h3><p>EasyExcel 做 Excel 导出还是挺方便的。</p><p>先建立Java实体与Excel表格内容的映射：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExportDTO</span> <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;主账号&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> mainAccountName<span class="token punctuation">;</span>

  <span class="token annotation punctuation">@ExcelProperty</span><span class="token punctuation">(</span><span class="token string">&quot;子账号&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> accountName<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后收集数据，用下面的语句导出：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> excelName <span class="token operator">=</span> <span class="token string">&quot;my-excel&quot;</span><span class="token punctuation">;</span>
response<span class="token punctuation">.</span><span class="token function">setCharacterEncoding</span><span class="token punctuation">(</span><span class="token string">&quot;UTF-8&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
response<span class="token punctuation">.</span><span class="token function">setContentType</span><span class="token punctuation">(</span><span class="token string">&quot;application/vnd.ms-excel&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
response<span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">&quot;Content-Disposition&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;attachment;filename=&quot;</span> <span class="token operator">+</span> excelName <span class="token operator">+</span> <span class="token string">&quot;.xlsx&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 关键就是实现 data 的逻辑</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ExportDTO</span><span class="token punctuation">&gt;</span></span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">ExportDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
       <span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span>excelName<span class="token punctuation">)</span>
       <span class="token punctuation">.</span><span class="token function">registerWriteHandler</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">LongestMatchColumnWidthStyleStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
       <span class="token punctuation">.</span><span class="token function">doWrite</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h3><p>EasyExcel 处理导入，体验就没那么丝滑了。</p><p>可以先看下示例代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CsvListener</span> csvListener <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CsvListener</span><span class="token punctuation">(</span>csvService<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">EasyExcel</span><span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>file<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> csvListener<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">excelType</span><span class="token punctuation">(</span><span class="token class-name">ExcelTypeEnum</span><span class="token punctuation">.</span><span class="token constant">CSV</span><span class="token punctuation">)</span> <span class="token comment">// 如果是读取 excel，去掉这一行即可</span>
        <span class="token punctuation">.</span><span class="token function">sheet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doRead</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CsvListener</span> <span class="token keyword">extends</span> <span class="token class-name">AnalysisEventListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * 每隔n条存储数据库，然后清理list ，方便内存回收
   */</span>
  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">BATCH_COUNT</span> <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span>
  <span class="token doc-comment comment">/**
   * 缓存的数据
   */</span>
  <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Map</span><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> cachedDataList <span class="token operator">=</span> <span class="token class-name">ListUtils</span><span class="token punctuation">.</span><span class="token function">newArrayListWithExpectedSize</span><span class="token punctuation">(</span><span class="token constant">BATCH_COUNT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">invokeHead</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">ReadCellData</span><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> headMap<span class="token punctuation">,</span> <span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span><span class="token punctuation">{</span>
   
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 每一条数据解析都会来调用
   */</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> data <span class="token punctuation">,</span> <span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    cachedDataList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      
    <span class="token comment">// 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cachedDataList<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token constant">BATCH_COUNT</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 存储完成清理 list</span>
      cachedDataList <span class="token operator">=</span> <span class="token class-name">ListUtils</span><span class="token punctuation">.</span><span class="token function">newArrayListWithExpectedSize</span><span class="token punctuation">(</span><span class="token constant">BATCH_COUNT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 所有数据解析完成了 都会来调用
   */</span>
  <span class="token annotation punctuation">@Override</span>
  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAfterAllAnalysed</span><span class="token punctuation">(</span><span class="token class-name">AnalysisContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里也要保存数据，确保最后遗留的数据也存储到数据库</span>
    <span class="token function">saveData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设计思路是挺优雅的：事件驱动，把业务逻辑放入这个 Listener 里。</p><p>但实践起来就不太优雅了：</p><ol><li>无法利用 Spring 进行依赖管理，需要手动在构造器中注入业务对象。对于这一点，我表示很难受。我相信，当业务变得复杂，这个构造器要接收 9 个参数的时候，大部分人都会难受。</li><li>需要维护横跨回调函数的“全局变量”。当业务复杂后，势必要引入更多的类成员变量，在 invoke/invokeHead/doAfterAllAnalysed 等回调函数中出现多次，对这几个回调函数而言，类成员变量就是全局变量。代码是可以实现，但个人不倾向于这种做法。另外，这也给我一种”梦回前端“的感觉，我对这种感觉不持有积极态度。</li></ol><p>当然上面仅仅是吐槽，又不是不能用。业务不复杂的话，直接用起来就完事了。</p><h2 id="常见问题与解决方案" tabindex="-1"><a class="header-anchor" href="#常见问题与解决方案" aria-hidden="true">#</a> 常见问题与解决方案</h2><h3 id="浏览器下载" tabindex="-1"><a class="header-anchor" href="#浏览器下载" aria-hidden="true">#</a> 浏览器下载</h3><p>虽然说 GET 请求可以让浏览器直接下载文件，Postman 也验证过此方案，但很可能实际会让前端采取另一种实现方案：先进行 Ajax 请求，再利用返回的数据创建 Blob 对象，最后才下载。</p><p>为什么不直接让浏览器下载，而要前端转一层呢？大概率是因为鉴权问题——因为浏览器 GET 请求不能带上授权相关的请求头，小概率原因是想前端显示 loading 状态。</p><p>前端多转一层，很可能转出问题，排查起来，既要 debug 接口，又要 debug 前端代码，吃力不讨好。</p><p>对此，我推荐的实践是：请求 url 带上 token 信息，如 /download?token=xxx，让后端对于下载接口特殊处理，以更前端少做一次处理，直接让浏览器下载文件即可。</p><h3 id="上传文件大小限制" tabindex="-1"><a class="header-anchor" href="#上传文件大小限制" aria-hidden="true">#</a> 上传文件大小限制</h3><p>导入本质是文件上传，服务端会生成临时文件，当文件过大时，需要修改相关设置。</p><p>以下是 Spring 的相关配置。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>spring.servlet.multipart.max-file-size<span class="token operator">=</span>1024MB
spring.servlet.multipart.max-request-size<span class="token operator">=</span>1024MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="缺少字体" tabindex="-1"><a class="header-anchor" href="#缺少字体" aria-hidden="true">#</a> 缺少字体</h3><p>Excel 的导出需要字体文件。</p><p>缺少字体时，可能会报错：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>java.lang.NullPointerException: null
at sun.awt.FontConfiguration.getVersion<span class="token punctuation">(</span>FontConfiguration.java:1264<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为什么会缺少字体呢？笔者遇到的一个例子就是，使用了过于精简的基础镜像来打包应用，如使用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>openjdk:8-jdk-bosybox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解决方案就是换一个更“丰满”一点的镜像。</p><p>但如果没有导出的内容没有格式要求，其实推荐优先使用 CSV。因为 CSV 不需要字体，而又与 Excel 兼容。</p><h3 id="序列化失败" tabindex="-1"><a class="header-anchor" href="#序列化失败" aria-hidden="true">#</a> 序列化失败</h3><p>一般应用程序都会对请求参数进行日志打印，当处理文件时，可能会遇到以下错误：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>com.alibaba.fastjson.JSONException: <span class="token function">write</span> javaBean error, fastjson version <span class="token number">1.2</span>.68, 
class org.springframework.web.multipart.support.StandardMultipartHttpServletRequest<span class="token variable">$StandardMultipartFile</span>, fieldName <span class="token builtin class-name">:</span> file, <span class="token function">write</span> javaBean error, fastjson version <span class="token number">1.2</span>.68, class org.springframework.web.multipart.MultipartFileResource, fieldName <span class="token builtin class-name">:</span> resource
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>找到相应代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">CreateOperationLogDTO</span> <span class="token function">getMethodTrilateralOperationLog</span><span class="token punctuation">(</span><span class="token class-name">ProceedingJoinPoint</span> joinPoint<span class="token punctuation">,</span> <span class="token class-name">RequestAttributes</span> requestAttributes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">MethodSignature</span> methodSignature <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">MethodSignature</span><span class="token punctuation">)</span> joinPoint<span class="token punctuation">.</span><span class="token function">getSignature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parameterNames <span class="token operator">=</span> methodSignature<span class="token punctuation">.</span><span class="token function">getParameterNames</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parameterValues <span class="token operator">=</span> joinPoint<span class="token punctuation">.</span><span class="token function">getArgs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> parameters <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> parameterNames<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        parameters<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>parameterNames<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> parameterValues<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token class-name">Log</span> log <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Log</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    log<span class="token punctuation">.</span><span class="token function">setContentTo</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span>parameters<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题出在第 12 行，上传的文件 Multipart 对象被序列化时报错了。但这不应认为是 fastjson 问题——就算换也 Jackson，默认情况也是会报错的。</p><p>这里具体问题具体分析。笔者的场景，其实只是要打印参数，并不需要序列化文件对象，因此，通过跳过序列化 Multipart 对象解决此问题，示例代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> parameterNames<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 在 for 循环中添加如下一行</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>parameterNames<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
    parameters<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>parameterNames<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> parameterValues<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,50),c=[e];function o(i,l){return s(),a("div",null,c)}const r=n(p,[["render",o],["__file","common-practices-for-handling-excel.html.vue"]]);export{r as default};
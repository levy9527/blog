import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c as p,e as r,a as n,b as a,d as e,f as t}from"./app-31b1062a.js";const c={},d=n("h1",{id:"前端项目性能优化实战",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前端项目性能优化实战","aria-hidden":"true"},"#"),a(" 前端项目性能优化实战")],-1),u=n("p",null,"本文将分享常用的 Web 页面性能分析工具，以及一个前端项目性能优化的实战经验。",-1),m=n("h2",{id:"检测",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#检测","aria-hidden":"true"},"#"),a(" 检测")],-1),h=n("p",null,"使用两个工具分析项目首页性能情况：",-1),g={href:"https://developers.google.com/speed/pagespeed/insights/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://tools.pingdom.com/",target:"_blank",rel:"noopener noreferrer"},k=n("p",null,[a("得到结果如下："),n("br"),n("img",{src:"https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1611714344531-6501362c-526d-40e5-b1a4-a3399a544ea1.png",alt:"",loading:"lazy"}),n("br"),n("img",{src:"https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607738629800-10ff9829-ea0c-402b-b826-1d05903ee302.png",alt:"",loading:"lazy"}),n("br"),a(" 可以看到，首页超过50%的请求都与图片有空，优化空间比较大，因此第一步应该是优化图片加载。")],-1),v=n("h2",{id:"图片优化",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#图片优化","aria-hidden":"true"},"#"),a(" 图片优化")],-1),f=n("br",null,null,-1),_=n("img",{src:"https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607739432571-c4ebd1bb-bf91-4ced-afca-ad70b84c4de6.png",alt:"",loading:"lazy"},null,-1),y=n("br",null,null,-1),w={href:"https://zhuanlan.zhihu.com/p/99769484",target:"_blank",rel:"noopener noreferrer"},x=t('<ol><li>把 <code>&lt;img&gt;</code>  元素修改成 <code>&lt;v-img/&gt;</code> ，注意设置 width 或 height</li><li>把 <code>&lt;div ``style=&quot;background-image: url(img-url)&quot;``&gt;&lt;/div&gt;</code> 修改成 <code>&lt;div v-img=&quot;{src: img-url}&quot;&gt;&lt;/div&gt;</code></li></ol><p>注意：img-url 应该是 oss 的链接，并且是 https 协议。<br> 如果是 http 协议，或不指定协议 //img-url，则很可能会出现下图的情况：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1611714403654-591acc14-7c8e-4882-a781-a5271bb0b428.png" alt="" loading="lazy"></p><p>如果图片是放在项目中，且项目并没有部署到 oss，则无法享受自动加载 webp 格式图片的福利。</p><p>则在此环节，一次性做到了上图中的三个优化点。</p><h2 id="提高ttfb时间" tabindex="-1"><a class="header-anchor" href="#提高ttfb时间" aria-hidden="true">#</a> 提高TTFB时间</h2><p>来看下一条优化建议：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607914614811-2ea4a4f6-0f0c-4222-bc6f-112f3512bfbb.png" alt="" loading="lazy"><br> 因为项目是服务端渲染的，有些请求是在服务端做了。找到相关代码：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607914815788-19181de1-6526-46f1-8ed2-e4c3bd130e7a.png" alt="" loading="lazy"><br> 经过分析，上述代码存在两个问题：</p><ol><li>可在客户端执行却放在了服务端</li><li>可并行执行却写成了串行</li></ol><p>修改如下：</p><figure><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607914801350-ca4cadfe-9750-47be-98f4-fd5a305bb408.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr>',10),z=n("br",null,null,-1),C=n("br",null,null,-1),q=n("img",{src:"https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607929114683-23cb4794-bc67-4bed-8e95-0a8f493cb1e6.png",alt:"",loading:"lazy"},null,-1),j=n("br",null,null,-1),E={href:"https://ssr.vuejs.org/guide/universal.html#component-lifecycle-hooks",target:"_blank",rel:"noopener noreferrer"},T=t(`<p>修改如下：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607929358177-06449ad6-8251-444d-9ae3-1e2ae93b8fef.png" alt="" loading="lazy"></p><h2 id="移除未使用的-javascript" tabindex="-1"><a class="header-anchor" href="#移除未使用的-javascript" aria-hidden="true">#</a> 移除未使用的 Javascript</h2><p>来看下一条优化建议：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607931113342-9fbf0d58-58dd-4d77-9628-cb2a1182d957.png" alt="" loading="lazy"><br> 因为经过多次迭代，有可能某些功能曾经上线过，后来被下线，但当时代码没删干净，所以留下一些现在没用的第三方库。根据建议，找到这些引入的 js，确保不影响正常功能后，删除即可。</p><p>此时注意用到以下基本操作：</p><ol><li>google/github 查询库的用途</li><li>git history/annotate 查看是何人何时引入、并在何处使用的，如何代码不能表明意图，则最好找到相关人员询问是有何意图。</li></ol><h2 id="延迟静态资源的加载" tabindex="-1"><a class="header-anchor" href="#延迟静态资源的加载" aria-hidden="true">#</a> 延迟静态资源的加载</h2><p>来看另一个相关的建议：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1607932915571-42f62757-85e0-4893-8a1f-5b3d103da94c.png" alt="" loading="lazy"><br> 如果有些第三方 js 确实有用到，但却不是关键资源，则可以延迟其加载或解析时机，缩短阻塞时间。</p><p>以一些第三方代码为例，它们并不是关键资源，可以在 window.onload 事件触发后，再加载</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> srcs <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token comment">// 百度统计</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token string">&#39;https://hm.baidu.com/hm.js&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;baidu-analysis&#39;</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 腾讯企点客服 </span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token string">&#39;https://wp.qiye.qq.com/qidian&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">&#39;tencent-qidian&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">charset</span><span class="token operator">:</span> <span class="token string">&#39;utf-8&#39;</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;data-n-head&#39;</span><span class="token operator">:</span> <span class="token string">&#39;data-vue-enterprise&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;load&#39;</span><span class="token punctuation">,</span> <span class="token parameter">_</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  srcs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span>
    script<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token boolean">true</span>

    Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">k</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      script<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">,</span> item<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    document<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="启用文本压缩" tabindex="-1"><a class="header-anchor" href="#启用文本压缩" aria-hidden="true">#</a> 启用文本压缩</h2><p>首先是启用文本压缩，采用 gzip 是最简单的方式。对应的请求头是：<strong>Content-Encoding</strong><br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1612505764342-9505cfe1-9025-49b0-b1fc-3e49e6d9f2c5.png" alt="" loading="lazy"></p><p>因为静态资源是放到对象储存服务上的，故应该修改相关的配置。</p>`,12),N={href:"https://help.aliyun.com/document_detail/31913.html?spm=5176.11065259.1996646101.searchclickresult.76556e6eoNS81O",target:"_blank",rel:"noopener noreferrer"},S={href:"https://support.huaweicloud.com/usermanual-cdn/cdn_01_0119.html",target:"_blank",rel:"noopener noreferrer"},V=t(`<p>这里要注意的是，对于静态资源的访问，最好使用自定义域名，而不是存储桶的域名，方便CDN做加速优化。</p><h2 id="优化缓存策略" tabindex="-1"><a class="header-anchor" href="#优化缓存策略" aria-hidden="true">#</a> 优化缓存策略</h2><p>下一条相关的优化建议是缓存策略，对应的请求头是：<strong>Cache-Control</strong><br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1612506152108-a13a4684-6b3c-46d2-8fa3-0b20fda0d4ec.png" alt="" loading="lazy"><br> 简单来说，就是在静态资源（html 除外）的 HTTP 响应头中设置如下字段：</p><div class="language-http line-numbers-mode" data-ext="http"><pre class="language-http"><code><span class="token header"><span class="token header-name keyword">Cache-Control</span><span class="token punctuation">:</span> <span class="token header-value">max-age=31536000</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以阿里云 oss 为例进行说明，其他静态资源存储如 obs、S3 都是同理。</p>`,5),B={href:"https://github.com/aliyun/oss-browser",target:"_blank",rel:"noopener noreferrer"},O=n("figure",null,[n("img",{src:"https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1574909023658-459fff93-ad99-43ad-92c1-bf94d5cff9c6.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),I=n("figure",null,[n("img",{src:"https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1574909060558-751aeab8-c08c-4a84-95f4-f3fbe5e13e24.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),$={href:"https://help.aliyun.com/document_detail/31913.html?spm=a2c4g.11186623.4.1.7e863bdb6IwtQq",target:"_blank",rel:"noopener noreferrer"},L={href:"https://help.aliyun.com/document_detail/120057.html?spm=a2c4g.11186623.6.711.c31a2d24TVqy6d",target:"_blank",rel:"noopener noreferrer"},P=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/user/ossutil64 <span class="token function">cp</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-u</span> ./dist oss://<span class="token variable">$bucket</span>/<span class="token variable">$file_path</span>/ <span class="token parameter variable">--meta</span><span class="token operator">=</span>Cache-Control:max-age<span class="token operator">=</span><span class="token number">31536000</span>
/user/ossutil64 set-meta oss://<span class="token variable">$bucket</span>/<span class="token variable">$file_path</span>/index.html Cache-Control:no-cache <span class="token parameter variable">--update</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,1),A={href:"https://appuals.com/how-to-fix-err_content_decoding_failed-error/",target:"_blank",rel:"noopener noreferrer"},H=n("br",null,null,-1),D=n("img",{src:"https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1574914337532-52c323e6-b22c-45a4-b514-c2614762909a.png",alt:"",loading:"lazy"},null,-1);function F(J,Q){const s=i("ExternalLinkIcon");return l(),p("div",null,[d,u,r(" more "),m,h,n("ol",null,[n("li",null,[n("a",g,[a("https://developers.google.com/speed/pagespeed/insights/"),e(s)])]),n("li",null,[n("a",b,[a("https://tools.pingdom.com/"),e(s)])])]),k,v,n("p",null,[a("关于图片，PageSpeed 的优化建议如下："),f,_,y,a(" 根据文章《"),n("a",w,[a("把图片优化指南做成一个组件：v-img"),e(s)]),a("》，找到首页的图片相关的代码：")]),x,n("p",null,[a("通过分析请求日志发现，有一个请求应该是在客户端发送，代码本意也是在客户端执行，却在服务端也执行了。"),z,a(" 找到发送请求的代码："),C,q,j,a(" 原来是代码写在了 created 里，这是个经典的案例：为了让请求更早一点发送，不写在 mounted 钩子，而写在 created 里，导致请求分别在 server-side 与 client-side 都执行了。具体说明请看 "),n("a",E,[a("vue ssr 官方文档"),e(s)]),a("。")]),T,n("ul",null,[n("li",null,[a("如果是阿里云OSS，"),n("a",N,[a("点击查看参考文档"),e(s)])]),n("li",null,[a("如果是华为云OBS，"),n("a",S,[a("点击查看参考文档"),e(s)])])]),V,n("p",null,[a("对于少量的资源，可以进行手工操作。打开 "),n("a",B,[a("oss-browser"),e(s)]),a("，找到相应资源：")]),O,I,n("p",null,[a("本中使用的 oss-browser 版本，一次只能对一个资源进行 HTTP 头的设置，操作十分不便，可以"),n("a",$,[a("登录阿里云控制台进行批量操作"),e(s)]),a("。")]),n("p",null,[a("当然，最根本的解决办法，是使用 "),n("a",L,[a("阿里云oss命令行工具"),e(s)]),a(" 上传的时候就进行设置。")]),P,n("p",null,[a("注意，在命令行里别乱设置 Content-Encoding:gzip，否则会出现下面的情况，页面都打不开，具体说明"),n("a",A,[a("查看详情"),e(s)]),H,D])])}const K=o(c,[["render",F],["__file","performance-optimization-in-action.html.vue"]]);export{K as default};

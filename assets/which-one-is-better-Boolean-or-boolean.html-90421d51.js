import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as p,c,a,b as n,d as s,f as o}from"./app-a9d55428.js";const i={},r=o('<h1 id="boolean-还是-boolean" tabindex="-1"><a class="header-anchor" href="#boolean-还是-boolean" aria-hidden="true">#</a> Boolean 还是 boolean？</h1><p>在 Java 中，对于布尔类型的变量、对象属性或方法参数的定义，到底是用包装类型 Boolean 还是基本类型 boolean 呢？</p><h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2><p>先说结论：根据《Effective Java》(第三版），始终尽可能地使用基本类型。故应该使用 boolean。</p><p>原文如下：<br><img src="https://cdn.nlark.com/yuque/0/2022/png/160590/1654073705555-ed3a3c4c-bb4b-4bfb-955f-00fc0f0356b4.png" alt="image.png" loading="lazy"></p><blockquote><p>红线处翻译：总结就是，当你有得选的时候，请务必使用基本类型，而非包装类型。</p></blockquote><p>那什么时候使用包装类型呢？原文如下：<br><img src="https://cdn.nlark.com/yuque/0/2022/png/160590/1654073877311-28b24470-1fc2-4560-a752-caa1bcff807c.png" alt="image.png" loading="lazy"></p><blockquote><p>红线处翻译：当你没得选、被强制要求时，才使用包装类型。如：使用泛型（使用集合类、调用参数是泛型参数的方法），以及通过反射进行方法调用(使用 invoke 方法）</p></blockquote><h2 id="争议" tabindex="-1"><a class="header-anchor" href="#争议" aria-hidden="true">#</a> 争议</h2>',9),d={href:"https://github.com/alibaba/p3c/blob/master/Java%E5%BC%80%E5%8F%91%E6%89%8B%E5%86%8C(%E9%BB%84%E5%B1%B1%E7%89%88).pdf",target:"_blank",rel:"noopener noreferrer"},u=a("br",null,null,-1),b=a("img",{src:"https://cdn.nlark.com/yuque/0/2022/png/160590/1654076977162-f5358442-5426-4bca-936b-fcedcff0d3d3.png",alt:"image.png",loading:"lazy"},null,-1),h=o(`<p>但注意，本文讨论的仅仅是布尔类型，不要发散话题。 那现在就来分析一下，布尔类型有没有必要考虑 null 的情况？</p><p>我认为是没有的必要的。理由如下：</p><ul><li>布尔类型就是二进制的，代码两种情况：1或0；真或假。使用包装类型，出现第三种情况 null，不但要注意空指针异常问题，还要兼容 null 的情况——此时到底是真还是假呢?</li><li>如果 null 表示的既不是真也不假，而是第三种情况——就不该定义为布尔类型，而应定义为枚举类型，因为一共有三种情况。使用 Boolean 来表示三种情况，是设计上的偷懒。</li></ul><h2 id="实战" tabindex="-1"><a class="header-anchor" href="#实战" aria-hidden="true">#</a> 实战</h2><p>我们来看一下实际代码中，滥用 Boolean 类型导致的问题。</p><h3 id="简单例子" tabindex="-1"><a class="header-anchor" href="#简单例子" aria-hidden="true">#</a> 简单例子</h3><p>有如下 Controller，使用的是 boolean：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>@RestController
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoController</span> <span class="token punctuation">{</span>
  @<span class="token function">RequestMapping</span><span class="token punctuation">(</span><span class="token string">&quot;/hello&quot;</span><span class="token punctuation">)</span>
  <span class="token keyword">public</span> String <span class="token function">hello</span><span class="token punctuation">(</span><span class="token parameter">boolean bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> String<span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>bool<span class="token punctuation">)</span> <span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前端传个空值，会得到报错信息：<br><img src="https://cdn.nlark.com/yuque/0/2023/png/160590/1695173173498-3a5c865a-912b-429c-bb9c-ee8132e6dee5.png" alt="image.png" loading="lazy"><br> 但如果使用 Boolean，并不能检查出是非法参数：<br><img src="https://cdn.nlark.com/yuque/0/2023/png/160590/1695173219438-a3bf6805-fefb-4ee7-b592-c0472f784d79.png" alt="image.png" loading="lazy"><br> 这原本是前端传参错误，但却无法即使发现。</p><p>你可能会问，为什么不先判断 Boolean 变量是否为 null 呢？因为别人在声明 Boolean 变量时，设置了默认值为 false，谁能想到前端会传个 null？</p><p>这就是 Boolean 的问题：“千防万防，家贼难防”！</p><h3 id="复杂例子" tabindex="-1"><a class="header-anchor" href="#复杂例子" aria-hidden="true">#</a> 复杂例子</h3><p>下面是前端传给 Controller 的参数：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TableQuery</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> withTable2Api<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Boolean</span> forkable<span class="token punctuation">;</span>
<span class="token punctuation">}</span>	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是，有至少两个 Controller 会接受到了这个参数，并且根据业务的不同，它们对参数的处理是不同的：</p><ul><li>有的会判断如果 withTable2Api 为 null，就设置为 true</li><li>有的则完全由前端传值，也即 forkable、withTable2Api 有可能为 null</li></ul><p>来看一下，Service 里的相应代码：<br><img src="https://cdn.nlark.com/yuque/0/2022/png/160590/1654083796570-a55a49ad-dcd3-4e5c-a35d-c3455d786715.png" alt="image.png" loading="lazy"><br> 这里有什么问题呢？可以看到，第二个 if 使用 <code>!Boolean._TRUE_</code>去判断很别扭，然而，却不能改写成：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 错误！因为没有兼容 null 的情况</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">FALSE</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>query<span class="token punctuation">.</span><span class="token function">getWithTable2Api</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这就是布尔值使用 Boolean 类型在实战中最大的问题——你不能任意地进行真或假的判断，而必须兼容上下文中隐式对 null 赋予的含义。</p><p>而多人协作过程中，外部调用是很难控制的，因此，此时使用 Boolean，只增加了无谓的编码负担。</p><h2 id="附" tabindex="-1"><a class="header-anchor" href="#附" aria-hidden="true">#</a> 附</h2>`,21),k={href:"https://www.yuque.com/attachments/yuque/0/2022/pdf/160590/1654077188552-25d2e37f-f34c-46db-817e-569163265605.pdf?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2022%2Fpdf%2F160590%2F1654077188552-25d2e37f-f34c-46db-817e-569163265605.pdf%22%2C%22name%22%3A%22Joshua%20Bloch%20-%20Effective%20Java%20(3rd)%20-%202018.pdf%22%2C%22size%22%3A2294786%2C%22ext%22%3A%22pdf%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22download%22%3Atrue%2C%22type%22%3A%22application%2Fpdf%22%2C%22mode%22%3A%22title%22%2C%22taskId%22%3A%22u4da28c90-dfee-481c-b1b9-7ab6c120cdd%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22ud6462faf%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D",target:"_blank",rel:"noopener noreferrer"};function m(f,v){const e=t("ExternalLinkIcon");return p(),c("div",null,[r,a("p",null,[n("阿里的"),a("a",d,[n("《Java开发手册》"),s(e)]),n("有提到，类属性强制使用包装类型。"),u,b,n("文中举的例子还是有道理的：有时需要 null 来表示额外的信息。")]),h,a("p",null,[a("a",k,[n("Joshua Bloch - Effective Java (3rd) - 2018.pdf"),s(e)])])])}const B=l(i,[["render",m],["__file","which-one-is-better-Boolean-or-boolean.html.vue"]]);export{B as default};

import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as t}from"./app-6c2ef082.js";const p={},e=t(`<h1 id="都什么年代了-还在用传统方式写代码" tabindex="-1"><a class="header-anchor" href="#都什么年代了-还在用传统方式写代码" aria-hidden="true">#</a> 都什么年代了，还在用传统方式写代码？</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>还在把 AI 当作搜索引擎的替代品，有问题才问 AI，没问题就在那边吭哧吭哧地撸代码？如果是这样，那你真的 OUT了！现在正经人谁还自己一行行地写代码啊，都是 AI 生成的代码——没有 AI 我不写（手动滑稽）。</p><p>本文将搁置争议，秉持实用主义，讨论在 AI 可以辅助我们编码的情况下，应采取什么样的实践，从而利用好工具，提高工作效率。</p><p>本文将分享 AI 时代的编程新实践，教你如何从一个 &quot;Ctrl + C&quot;、 &quot;Ctrl + V&quot; 工程师，变成一个 &quot;Tab + Enter&quot; 工程师🤣。</p><h2 id="开发流程" tabindex="-1"><a class="header-anchor" href="#开发流程" aria-hidden="true">#</a> 开发流程</h2><p>软件的一般研发流程为：</p><ol><li>需求分析</li><li>程序设计</li><li>代码编写</li><li>软件测试</li><li>部署上线</li></ol><p>我们在这里主要关心步骤2~4，因为与 AI 结合得比较紧密。虽然需求分析也可以借助 AI，但不是本文的重点，故不做讨论。</p><h2 id="程序设计" tabindex="-1"><a class="header-anchor" href="#程序设计" aria-hidden="true">#</a> 程序设计</h2><p>经过需求分析、逻辑梳理后，在编写实际代码前，需要进行程序设计。</p><p>此环节的产物是设计文档，是什么类型的设计文档不重要，重要的是伪代码的输出。</p><p>虽然《Code Complete》早就推荐过伪代码的实践，但对此人们容易有一个误区：认为写伪代码花的时间，已经够把实际代码写好了。但 AIGC 时代，此问题可以轻松破解：AI 写代码的速度肯定比人快，因此，只要能找到方法能让 AI 生成符合需求的代码，就值得花时间去研究。而伪代码，就是让 AI 快速生成符合期望的实际代码的最好方式。</p><p>为什么这么说呢？因为想要让 AIGC 符合期望，恰当的 Prompt 必不可少。但如何写好这个 Prompt，需要提供多少上下文，才能让 AI 更好地理解我们的意图，这是需要技巧、需要调试的。而经过精心设计的伪代码，本身已经提供了足够的上下文，且意图足够聚焦，减轻了对 Prompt 的要求，又提高了 AIGC 的成功率。</p><p>我们来看一下伪代码示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>plainText <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
digest <span class="token operator">=</span> <span class="token function">hash</span><span class="token punctuation">(</span>plainText<span class="token punctuation">)</span> <span class="token comment">// 防篡改</span>
secret <span class="token operator">=</span> Symmetric<span class="token punctuation">.</span><span class="token function">getKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  
cipherText <span class="token operator">=</span> <span class="token function">encryptText</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> secret<span class="token punctuation">)</span> <span class="token comment">// 防内容泄密</span>


pair <span class="token operator">=</span> Asymmetric<span class="token punctuation">.</span><span class="token function">getPair</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
cipherSecret <span class="token operator">=</span> <span class="token function">encryptKey</span><span class="token punctuation">(</span>secret<span class="token punctuation">,</span> pair<span class="token punctuation">.</span><span class="token function">getPrivateKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 防密钥泄露</span>

<span class="token keyword">return</span> <span class="token punctuation">{</span>
    digest<span class="token punctuation">,</span>  
    cipherText<span class="token punctuation">,</span> 
    cipherSecret<span class="token punctuation">,</span>
    pair<span class="token punctuation">.</span><span class="token function">getPublicKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述代码主要表达的内容是：</p><ol><li>对初始数据进行加密</li><li>返回加密后的相关内容</li><li>涉及到了一系列的算法</li></ol><p>对于伪代码的编写，有如以建议：</p><ol><li>不要纠结类型，不要局限于某一种编程语言的语法，不用试图写能编译通过的代码——这只会限制了你的表达</li><li>命名一定要准确，符合领域术语，这一点很关键。这一点可以通过查找资料、看书、问 AI 来实现。千万不要只是生硬地汉译英，不专业的表达会妨碍 AI 的理解</li></ol><h2 id="代码编写" tabindex="-1"><a class="header-anchor" href="#代码编写" aria-hidden="true">#</a> 代码编写</h2><p>代码编写分为以下几步：</p><ol><li>把伪代码转换成目标语言可执行的代码</li><li>根据项目情况，对生成的代码进行改造</li><li>利用 AI 编码辅助工具编写剩余的代码</li></ol><h3 id="生成真实代码" tabindex="-1"><a class="header-anchor" href="#生成真实代码" aria-hidden="true">#</a> 生成真实代码</h3><p>让 AI 生成代码的 prompt 很简单，示例如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>please transform the following pseudo code into practical Java code \`\`\`
your code\`\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>根据实际情况，把 Java 替换成 Node.js/Python/Go 即可。</p><p>使用 chatGPT 结果截图：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689239437556-36a14986-6114-44e1-b07c-c38a288874db.png" alt="" loading="lazy"></p><p>完整代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>databind<span class="token punctuation">.</span></span><span class="token class-name">ObjectMapper</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span></span><span class="token class-name">Cipher</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span></span><span class="token class-name">KeyGenerator</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span></span><span class="token class-name">SecretKey</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>security<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EncryptionExample</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// Prepare the license data</span>
        <span class="token class-name">LicenseData</span> licenseData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LicenseData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        licenseData<span class="token punctuation">.</span><span class="token function">setLicenseId</span><span class="token punctuation">(</span><span class="token string">&quot;123&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        licenseData<span class="token punctuation">.</span><span class="token function">setLicenseType</span><span class="token punctuation">(</span><span class="token string">&quot;Standard&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Convert the license data to JSON string</span>
        <span class="token class-name">ObjectMapper</span> objectMapper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> plainText <span class="token operator">=</span> objectMapper<span class="token punctuation">.</span><span class="token function">writeValueAsString</span><span class="token punctuation">(</span>licenseData<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Hash the plain text</span>
        <span class="token class-name">String</span> digest <span class="token operator">=</span> <span class="token function">hash</span><span class="token punctuation">(</span>plainText<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Generate a symmetric key</span>
        <span class="token class-name">SecretKey</span> secretKey <span class="token operator">=</span> <span class="token function">generateSymmetricKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Encrypt the license data with the symmetric key</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cipherText <span class="token operator">=</span> <span class="token function">encryptText</span><span class="token punctuation">(</span>plainText<span class="token punctuation">,</span> secretKey<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Generate an asymmetric key pair</span>
        <span class="token class-name">KeyPair</span> keyPair <span class="token operator">=</span> <span class="token function">generateAsymmetricKeyPair</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Encrypt the symmetric key with the private key</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cipherSecret <span class="token operator">=</span> <span class="token function">encryptKey</span><span class="token punctuation">(</span>secretKey<span class="token punctuation">.</span><span class="token function">getEncoded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> keyPair<span class="token punctuation">.</span><span class="token function">getPrivate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Print the results</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Plain Text: &quot;</span> <span class="token operator">+</span> plainText<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Digest: &quot;</span> <span class="token operator">+</span> digest<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Cipher Text: &quot;</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>cipherText<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Cipher Secret: &quot;</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>cipherSecret<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">hash</span><span class="token punctuation">(</span><span class="token class-name">String</span> input<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span> <span class="token punctuation">{</span>
        <span class="token class-name">MessageDigest</span> digest <span class="token operator">=</span> <span class="token class-name">MessageDigest</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;SHA-256&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> hash <span class="token operator">=</span> digest<span class="token punctuation">.</span><span class="token function">digest</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token function">bytesToHex</span><span class="token punctuation">(</span>hash<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">SecretKey</span> <span class="token function">generateSymmetricKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span> <span class="token punctuation">{</span>
        <span class="token class-name">KeyGenerator</span> keyGenerator <span class="token operator">=</span> <span class="token class-name">KeyGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;AES&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyGenerator<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token number">128</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> keyGenerator<span class="token punctuation">.</span><span class="token function">generateKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">encryptText</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">,</span> <span class="token class-name">SecretKey</span> key<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Cipher</span> cipher <span class="token operator">=</span> <span class="token class-name">Cipher</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;AES&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cipher<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">Cipher</span><span class="token punctuation">.</span><span class="token constant">ENCRYPT_MODE</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> cipher<span class="token punctuation">.</span><span class="token function">doFinal</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">encryptKey</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> secret<span class="token punctuation">,</span> <span class="token class-name">PrivateKey</span> privateKey<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Cipher</span> cipher <span class="token operator">=</span> <span class="token class-name">Cipher</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;RSA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        cipher<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token class-name">Cipher</span><span class="token punctuation">.</span><span class="token constant">ENCRYPT_MODE</span><span class="token punctuation">,</span> privateKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> cipher<span class="token punctuation">.</span><span class="token function">doFinal</span><span class="token punctuation">(</span>secret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">KeyPair</span> <span class="token function">generateAsymmetricKeyPair</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NoSuchAlgorithmException</span> <span class="token punctuation">{</span>
        <span class="token class-name">KeyPairGenerator</span> keyPairGenerator <span class="token operator">=</span> <span class="token class-name">KeyPairGenerator</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token string">&quot;RSA&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        keyPairGenerator<span class="token punctuation">.</span><span class="token function">initialize</span><span class="token punctuation">(</span><span class="token number">2048</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> keyPairGenerator<span class="token punctuation">.</span><span class="token function">generateKeyPair</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">bytesToHex</span><span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">StringBuilder</span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">byte</span> b <span class="token operator">:</span> bytes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%02x&quot;</span><span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">LicenseData</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> licenseId<span class="token punctuation">;</span>
        <span class="token keyword">private</span> <span class="token class-name">String</span> licenseType<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getLicenseId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> licenseId<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setLicenseId</span><span class="token punctuation">(</span><span class="token class-name">String</span> licenseId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>licenseId <span class="token operator">=</span> licenseId<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getLicenseType</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> licenseType<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setLicenseType</span><span class="token punctuation">(</span><span class="token class-name">String</span> licenseType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>licenseType <span class="token operator">=</span> licenseType<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把上述代码 copy 下来，放到工程中，根据需要改造即可。</p><p>这里特别要说下，强烈推荐使用原版 AI，而不是寻找平替，同样的 prompt，下图是某一中文平替输出的结果：<br> 只生成了函数声明，没有生成函数实现。二者对比，未免相形见绌。<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688721631064-514593cc-21d3-4851-8f41-71e776658295.png" alt="" loading="lazy"></p><h3 id="辅助编程工具" tabindex="-1"><a class="header-anchor" href="#辅助编程工具" aria-hidden="true">#</a> 辅助编程工具</h3><p>改造的过程中，少不了 AI pair programming tools。对此，我推荐使用 Amazon 的 CodeWhisperer，原因很简单，跟 GitHub Copilot 相比，它是免费的😃。</p><p>CodeWhisperer 的安装可以看文末的安装教程，我们先来看一下它是怎么辅助我们编码的。</p><p>第一种方式是最简单的，那就是什么都不管，等待智能提示即可，就好像 IDEA 原来的提示一样，只不过更智能。</p><p>下图示例中，要把原来的中文异常提示，修改成英文，而我只输入了两个字符 <code>IM</code>， 就得到了智能提示，补全了完整的英文字符串！<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689230327179-e9bf9c63-7081-41ca-8720-840f0f7f7c77.png" alt="" loading="lazy"><br> 可以注意到，上图的智能建议一共有 5 条，相应的快捷键为：</p><ol><li>方向键 -&gt;，查看下一条提示</li><li>方向键 &lt;-，查看上一条提示</li><li>Tab，采用该提示</li><li>Esc，拒绝提示</li></ol><p>我们再来看第二种 CodeWhisperer 的使用方式，编写注释，获得编码建议。<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689301926714-26dc940a-9762-4b3b-ab3d-f59cff96d54d.gif#averageHue=%23436733&amp;clientId=u2b1600a8-64be-4&amp;from=paste&amp;height=720&amp;id=u7ba54448&amp;originHeight=720&amp;originWidth=1280&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;size=663291&amp;status=done&amp;style=none&amp;taskId=ufeb3c36e-8e32-419e-bbe3-8acd6f88063&amp;title=&amp;width=1280" alt="" loading="lazy"><br> 最后一种就是编写一个空函数，让 CodeWhisperer 根据函数名去猜测函数的实现，这种情况需要足够的上下文，才能得到令人满意的结果。</p><h2 id="软件测试" tabindex="-1"><a class="header-anchor" href="#软件测试" aria-hidden="true">#</a> 软件测试</h2><p>AI 生成的内容，并不是完全可信任的，因此，单元测试的重要性变得尤为突出。</p><p>对上述代码编写测试代码后，实际上并不能一次通过，因为前面 AI 生成的代码参数有误。</p><p>此时需要一边执行单测，一边根据结果与 AI 进行交互：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689240199090-8daed9cd-273d-406d-9f20-60ba66732436.png" alt="" loading="lazy"></p><p>经过修改，最终测试用例通过👏！<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1689240017776-4f52a685-d749-4af3-8061-94c4befe3e8b.png" alt="" loading="lazy"></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>本文通过案例，展示了 AI 如何结合软件研发的流程，提升我们的编程效率的。</p><p>其中，个人认为最重要的是编写伪代码与进行单元测试。有趣的是，这两样实践在 AIGC 时代之前，就已经被认为是最佳实践。这给我们启示：某些方法论、实践经得起时间的考验，技术更新迭代，它们历久弥新。</p><p>对于AI编程的到底应该怎么看，其实 GitHub Copilot 的产品标语已经很好地概括了：Your AI pair programmer。在结队编程里，由两个人一起来进行编程活动。一个是 Navigator，负责指导、审查，另一个 Driver，负责具体的代码编写。AI 的出现，其实是取代了 Driver 的角色，而另一个充当 Navigator 角色的人，仍然是不可或缺的。</p><p>最后，AI 是否能进一步渗透我们的工作流，还有待探索。此文作引抛砖引玉之用，期待大家的后续分享。</p><h2 id="附-codewhisperer-安装" tabindex="-1"><a class="header-anchor" href="#附-codewhisperer-安装" aria-hidden="true">#</a> 附：CodeWhisperer 安装</h2><p>下载 2023 年的 IDEA，打开 Plugins Marketplace，找到 AWS Toolkit<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371554642-c3105125-ac08-4d22-8da5-c6cec8b898fa.png" alt="" loading="lazy"></p><p>安装完成、重启 IDEA 后，点击左下角，按下图所示操作：<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371684736-b48a0257-1aa1-442f-b998-05aa79bf0863.png" alt="" loading="lazy"></p><figure><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371750789-6aabc4d0-512e-44bc-9c12-13d02c9f8527.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>如果第一次使用，就点击 1 处进行注册，如果已经有账号了，就点击 2 处使用自己的账号登录。<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371861568-6da13369-3074-4f4e-86e6-0a2c8738b30c.png" alt="" loading="lazy"><br> 注册、登录、授权成功后，出现如图所示页面，即可使用 CodeWhisperer。<br><img src="https://raw.githubusercontent.com/levy9527/image-holder/main/md-image-kit/1688371897998-369e984e-f5b8-4c4b-bc56-897015092549.png" alt="" loading="lazy"></p>`,54),c=[e];function o(i,l){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","leverage-ai-to-boost-coding-productivity.html.vue"]]);export{k as default};
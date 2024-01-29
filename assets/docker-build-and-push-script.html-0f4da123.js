import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as t,c as o,a as s,b as a,d as l,f as n}from"./app-5fad1304.js";const c={},r=n(`<h1 id="docker-构建镜像、推送、启动实用脚本" tabindex="-1"><a class="header-anchor" href="#docker-构建镜像、推送、启动实用脚本" aria-hidden="true">#</a> Docker 构建镜像、推送、启动实用脚本</h1><h2 id="misc" tabindex="-1"><a class="header-anchor" href="#misc" aria-hidden="true">#</a> misc</h2><p>存储多份 docker 认证信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token string">&quot;~/.project1&quot;</span>
<span class="token function">mkdir</span> <span class="token string">&quot;~/.project2&quot;</span>

<span class="token function">docker</span> <span class="token parameter variable">--config</span> ~/.project1 login registry.example.com <span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>deploy_token<span class="token operator">&gt;</span>
<span class="token function">docker</span> <span class="token parameter variable">--config</span> ~/.project2 login registry.example.com <span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span> <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>deploy_token<span class="token operator">&gt;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token parameter variable">--config</span> ~/.project1 pull registry.example.com/project1
<span class="token function">docker</span> <span class="token parameter variable">--config</span> ~/.project2 pull registry.example.com/project2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,6),d={id:"build-image-sh",tabindex:"-1"},u=s("a",{class:"header-anchor",href:"#build-image-sh","aria-hidden":"true"},"#",-1),v={href:"http://build-image.sh",target:"_blank",rel:"noopener noreferrer"},k=n(`<p>support command:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># only build</span>
./build-image.sh 
<span class="token comment"># build and push</span>
./build-image.sh <span class="token parameter variable">-u</span> xxx <span class="token parameter variable">-p</span> xxx <span class="token parameter variable">--push</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>build-image.sh</code> (remember to replace <code>xxx</code> with true value)：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token comment"># Docker注册表</span>
<span class="token assign-left variable">REGISTRY</span><span class="token operator">=</span>xxx
<span class="token assign-left variable">REGISTRY_URL</span><span class="token operator">=</span>https://<span class="token variable">$REGISTRY</span>

<span class="token comment"># 镜像名称和标签</span>
<span class="token assign-left variable">IMAGE</span><span class="token operator">=</span><span class="token variable">$REGISTRY</span>/xxx/<span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>&quot;</span><span class="token variable">)</span></span>
<span class="token assign-left variable">IMAGE_TAG</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> VERSION<span class="token variable">)</span></span>

<span class="token comment"># Dockerfile文件位置</span>
<span class="token assign-left variable">DOCKERFILE_PATH</span><span class="token operator">=</span>./Dockerfile

<span class="token comment"># Initialize variables for user input</span>
<span class="token assign-left variable">username</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">password</span><span class="token operator">=</span><span class="token string">&quot;&quot;</span>
<span class="token assign-left variable">push</span><span class="token operator">=</span>false

<span class="token comment"># Process command-line arguments</span>
<span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-gt</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
  <span class="token keyword">case</span> <span class="token variable">$1</span> <span class="token keyword">in</span>
    -u<span class="token punctuation">)</span>
      <span class="token builtin class-name">shift</span>
      <span class="token assign-left variable">username</span><span class="token operator">=</span><span class="token variable">$1</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>
    -p<span class="token punctuation">)</span>
      <span class="token builtin class-name">shift</span>
      <span class="token assign-left variable">password</span><span class="token operator">=</span><span class="token variable">$1</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>
    --push<span class="token punctuation">)</span>
      <span class="token assign-left variable">push</span><span class="token operator">=</span>true
      <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span>
      <span class="token builtin class-name">echo</span> <span class="token string">&quot;Unknown argument will be ignored: <span class="token variable">$1</span>&quot;</span>
      <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token keyword">esac</span>
  <span class="token builtin class-name">shift</span>
<span class="token keyword">done</span>

<span class="token comment"># Print the parsed values</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;username: <span class="token variable">$username</span>&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;push: <span class="token variable">$push</span>&quot;</span>


<span class="token comment"># 构建镜像</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Building image: &quot;</span><span class="token variable">\${IMAGE}</span><span class="token builtin class-name">:</span><span class="token variable">\${IMAGE_TAG}</span>
<span class="token function">docker</span> build <span class="token variable">\${BUILD_CONTEXT}</span> <span class="token parameter variable">-t</span> <span class="token variable">\${IMAGE}</span><span class="token builtin class-name">:</span><span class="token variable">\${IMAGE_TAG}</span> <span class="token parameter variable">-f</span> <span class="token variable">$DOCKERFILE_PATH</span> <span class="token builtin class-name">.</span>
<span class="token function">docker</span> tag <span class="token variable">\${IMAGE}</span><span class="token builtin class-name">:</span><span class="token variable">\${IMAGE_TAG}</span> <span class="token variable">\${IMAGE}</span>:latest

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$push</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;push is true. Performing push operation...&quot;</span>

  <span class="token comment"># 登录</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Logging into registry...&quot;</span>
  <span class="token function">docker</span> login <span class="token parameter variable">-u</span> <span class="token variable">$username</span> <span class="token parameter variable">-p</span> <span class="token variable">$password</span> <span class="token variable">$REGISTRY_URL</span>

  <span class="token comment"># 推送</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Pushing to registry...&quot;</span>
  <span class="token function">docker</span> push <span class="token variable">\${IMAGE}</span><span class="token builtin class-name">:</span><span class="token variable">\${IMAGE_TAG}</span> 
  <span class="token function">docker</span> push <span class="token variable">\${IMAGE}</span>:latest

  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Build and push complete!&quot;</span>
<span class="token keyword">else</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;push is false. Skipping push operation.&quot;</span>
  <span class="token builtin class-name">echo</span> <span class="token string">&quot;Build complete!&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),b={id:"startup-sh",tabindex:"-1"},m=s("a",{class:"header-anchor",href:"#startup-sh","aria-hidden":"true"},"#",-1),h={href:"http://startup.sh",target:"_blank",rel:"noopener noreferrer"},g=n(`<p><code>startup.sh</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token comment"># 镜像名称和标签</span>
<span class="token assign-left variable">IMAGE</span><span class="token operator">=</span>harbor.xxx.com/xxx/xxx-app
<span class="token assign-left variable">IMAGE_TAG</span><span class="token operator">=</span>x.x.xxx
<span class="token assign-left variable">NAME</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $<span class="token punctuation">{</span>IMAGE<span class="token punctuation">}</span><span class="token variable">)</span></span>
<span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">8000</span>:8000

<span class="token comment"># 如果容器正在运行,停止它</span>
<span class="token keyword">if</span> <span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">--format</span><span class="token operator">=</span><span class="token string">&quot;{{.Names}}&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-xq</span> <span class="token variable">$NAME</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;Stopping old container...&quot;</span>
    <span class="token function">docker</span> stop <span class="token variable">$NAME</span>
    <span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable">$NAME</span>
<span class="token keyword">fi</span>

<span class="token comment"># 获取新的镜像</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Pulling new image...&quot;</span>
<span class="token function">docker</span> pull <span class="token variable">$IMAGE</span><span class="token builtin class-name">:</span><span class="token variable">$IMAGE_TAG</span>

<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> <span class="token variable">$NAME</span> <span class="token parameter variable">-p</span> <span class="token variable">$PORT</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>always <span class="token parameter variable">--env</span> <span class="token assign-left variable">ENV_KEY</span><span class="token operator">=</span>xxx <span class="token variable">$IMAGE</span><span class="token builtin class-name">:</span><span class="token variable">$IMAGE_TAG</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;Container started!&quot;</span>

<span class="token function">docker</span> logs <span class="token parameter variable">-f</span> <span class="token variable">$NAME</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2);function f(x,_){const e=p("ExternalLinkIcon");return t(),o("div",null,[r,s("h2",d,[u,a(),s("a",v,[a("build-image.sh"),l(e)])]),k,s("h2",b,[m,a(),s("a",h,[a("startup.sh"),l(e)])]),g])}const $=i(c,[["render",f],["__file","docker-build-and-push-script.html.vue"]]);export{$ as default};

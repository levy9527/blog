import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as l,c as d,a as s,b as a,d as c,e}from"./app-5e3d6b08.js";const t={},o=e(`<h1 id="git常用命令" tabindex="-1"><a class="header-anchor" href="#git常用命令" aria-hidden="true">#</a> Git常用命令</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>这里列举常见场景，并给出相应解决方案<br> 约定： 下文代码块中<code>\${}</code>里面表示的是变量，具体值视情况而定，其余的都是正确可执行的命令。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>Mac/Linux 用户 执行以下操作</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> ~/.gitconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Windows用户在桌面用户文件夹下有个.gitconfig隐藏文件，直接修改即可<br><img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682343376774.png" alt="" loading="lazy"><br> 补充以下内容</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>alias<span class="token punctuation">]</span>
  st <span class="token operator">=</span> status
  cm <span class="token operator">=</span> commit
  br <span class="token operator">=</span> branch
  co <span class="token operator">=</span> checkout
  <span class="token function">ps</span> <span class="token operator">=</span> push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="增强" tabindex="-1"><a class="header-anchor" href="#增强" aria-hidden="true">#</a> 增强</h2>`,9),p={href:"https://github.com/robbyrussell/oh-my-zsh",target:"_blank",rel:"noopener noreferrer"},h=e(`<h2 id="记住账号密码" tabindex="-1"><a class="header-anchor" href="#记住账号密码" aria-hidden="true">#</a> 记住账号密码</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 输入下列命令后，再输入一次账号密码即可</span>
<span class="token function">git</span> config <span class="token parameter variable">--global</span> credential.helper store
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="本地提交" tabindex="-1"><a class="header-anchor" href="#本地提交" aria-hidden="true">#</a> 本地提交</h2><h3 id="取消未暂存的修改" tabindex="-1"><a class="header-anchor" href="#取消未暂存的修改" aria-hidden="true">#</a> 取消未暂存的修改</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 恢复单个文件</span>
<span class="token function">git</span> checkout -- <span class="token variable">\${file}</span>

<span class="token comment"># 恢复目录下所有文件</span>
<span class="token function">git</span> checkout -- <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="取消add" tabindex="-1"><a class="header-anchor" href="#取消add" aria-hidden="true">#</a> 取消add</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="取消提交" tabindex="-1"><a class="header-anchor" href="#取消提交" aria-hidden="true">#</a> 取消提交</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> reset HEAD^1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看提交的hash</span>
<span class="token function">git</span> log
<span class="token comment"># 使用相应的hash回滚</span>
<span class="token function">git</span> reset <span class="token variable">\${hash}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修正提交" tabindex="-1"><a class="header-anchor" href="#修正提交" aria-hidden="true">#</a> 修正提交</h3><p>适用于提交信息有误或有遗漏，需要修正最新提交信息的场景。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">--amend</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="stash修改" tabindex="-1"><a class="header-anchor" href="#stash修改" aria-hidden="true">#</a> stash修改</h3><p>适用于当前功能开发并不完整，不能产生一次提交，但却要开发另外功能的场景</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> stash save <span class="token string">&#39;\${msg}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="恢复stash" tabindex="-1"><a class="header-anchor" href="#恢复stash" aria-hidden="true">#</a> 恢复stash</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="分支管理" tabindex="-1"><a class="header-anchor" href="#分支管理" aria-hidden="true">#</a> 分支管理</h2><h3 id="创建分支" tabindex="-1"><a class="header-anchor" href="#创建分支" aria-hidden="true">#</a> 创建分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token variable">\${branch}</span>
<span class="token comment"># 根据commit hash 创建分支</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token variable">\${branch}</span> <span class="token variable">\${commit_hash}</span>
<span class="token comment"># 切出远程分支到本地</span>
<span class="token function">git</span> checkout <span class="token parameter variable">--track</span> origin/<span class="token punctuation">{</span>branch<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看远程分支" tabindex="-1"><a class="header-anchor" href="#查看远程分支" aria-hidden="true">#</a> 查看远程分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> branch <span class="token parameter variable">--remote</span>
<span class="token comment"># 或者</span>
<span class="token function">git</span> branch <span class="token parameter variable">-r</span>
如果上述命令看不到所有的远程分支，可以使用以下命令
<span class="token function">git</span> ls-remote <span class="token parameter variable">--heads</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建干净历史分支" tabindex="-1"><a class="header-anchor" href="#创建干净历史分支" aria-hidden="true">#</a> 创建干净历史分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> checkout <span class="token parameter variable">--orphan</span> <span class="token variable">\${branch}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除分支" tabindex="-1"><a class="header-anchor" href="#删除分支" aria-hidden="true">#</a> 删除分支</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 删除本地分支</span>
<span class="token function">git</span> branch <span class="token parameter variable">-d</span> <span class="token variable">\${local_branch}</span>
<span class="token comment"># 删除远程分支</span>
<span class="token function">git</span> push origin <span class="token parameter variable">-d</span> <span class="token variable">\${remote_branch}</span>
<span class="token comment"># 或</span>
<span class="token function">git</span> push origin <span class="token builtin class-name">:</span><span class="token variable">\${remote_branch}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="标签管理" tabindex="-1"><a class="header-anchor" href="#标签管理" aria-hidden="true">#</a> 标签管理</h2><h3 id="新建本地标签" tabindex="-1"><a class="header-anchor" href="#新建本地标签" aria-hidden="true">#</a> 新建本地标签</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token variable">\${tag_name}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除本地标签" tabindex="-1"><a class="header-anchor" href="#删除本地标签" aria-hidden="true">#</a> 删除本地标签</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token parameter variable">-d</span> <span class="token variable">\${tag_name}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看本地所有标签" tabindex="-1"><a class="header-anchor" href="#查看本地所有标签" aria-hidden="true">#</a> 查看本地所有标签</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> tag <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="推送本地标签" tabindex="-1"><a class="header-anchor" href="#推送本地标签" aria-hidden="true">#</a> 推送本地标签</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push origin <span class="token variable">\${tag_name}</span>
<span class="token comment"># 推送所有标签</span>
<span class="token function">git</span> push origin <span class="token parameter variable">--tags</span>
<span class="token comment"># 同时推送提交记录以及本分支的所有标签</span>
<span class="token function">git</span> push --follow-tags
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取远程标签" tabindex="-1"><a class="header-anchor" href="#获取远程标签" aria-hidden="true">#</a> 获取远程标签</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> fetch origin tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除远程标签" tabindex="-1"><a class="header-anchor" href="#删除远程标签" aria-hidden="true">#</a> 删除远程标签</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push origin <span class="token parameter variable">-d</span> tag <span class="token variable">\${tag_name}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="远程仓库" tabindex="-1"><a class="header-anchor" href="#远程仓库" aria-hidden="true">#</a> 远程仓库</h2><h3 id="浅克隆" tabindex="-1"><a class="header-anchor" href="#浅克隆" aria-hidden="true">#</a> 浅克隆</h3><p>适用于仓库很大，对过往历史不关心，想快速克隆的场景。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span> <span class="token variable">\${repo_url}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="克隆指定分支" tabindex="-1"><a class="header-anchor" href="#克隆指定分支" aria-hidden="true">#</a> 克隆指定分支</h3><p>适用于只想要某一分支代码的场景。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone <span class="token parameter variable">-b</span> <span class="token variable">\${branch}</span> <span class="token variable">\${repo_url}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="克隆失败因为文件名太长" tabindex="-1"><a class="header-anchor" href="#克隆失败因为文件名太长" aria-hidden="true">#</a> 克隆失败因为文件名太长</h3><p>报错信息为：<code>error: unable to create file xxx.java: Filename too long</code></p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code>git clone <span class="token operator">-</span>c core<span class="token punctuation">.</span>longpaths<span class="token operator">=</span><span class="token boolean">true</span> \${repo_url}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，如果是使用 IDEA 进行克隆，很可能会看忽略该报错，但可以根据以下经验加以验证：如果 git clone 完成后，工作区并不干净（可以用 git status 检查）、不能切换分支，说明很可能就是上述情况。</p><h3 id="强行推送" tabindex="-1"><a class="header-anchor" href="#强行推送" aria-hidden="true">#</a> 强行推送</h3><p>适用于本地开发了一段时间，最近才在代码托管平台上初始化远程仓库的场景</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 谨慎：本地master分支会覆盖远程master分支！</span>
<span class="token function">git</span> push <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="取消错误的推送" tabindex="-1"><a class="header-anchor" href="#取消错误的推送" aria-hidden="true">#</a> 取消错误的推送</h3><p>适用于推送了错误的提交后, 想取消该推送的场景</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 更新代码</span>
<span class="token comment"># 一定要更新最新的代码! 以免覆盖掉其他协作者的推送!</span>
<span class="token function">git</span> pull
<span class="token comment"># 查看提交的hash</span>
<span class="token function">git</span> log
<span class="token comment"># 使用相应的hash回滚</span>
<span class="token comment"># 注意: 回滚后 在\${hash}之后提交的代码 都会在 Changes to be committed 中</span>
<span class="token function">git</span> reset <span class="token variable">\${hash}</span>
<span class="token comment"># 覆盖远程仓库的代码</span>
<span class="token function">git</span> push <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><h3 id="cherry-pick" tabindex="-1"><a class="header-anchor" href="#cherry-pick" aria-hidden="true">#</a> cherry-pick</h3><ol><li>checkout目标分支(target branch)</li><li>选中相应的提交记录，右键</li><li>点击Cherry-pick<img src="https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682343384184.png" alt="image.png" loading="lazy"></li><li>则相应的提交记录就会合并到目标分支</li></ol><h3 id="merge-unrelated-histories" tabindex="-1"><a class="header-anchor" href="#merge-unrelated-histories" aria-hidden="true">#</a> merge unrelated histories</h3><p>遇到上述问题时，可以使用 <code>--allow-unrelated-histories</code> ，如</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> merge --allow-unrelated-histories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> pull origin <span class="token variable">\${branch}</span> --allow-unrelated-histories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="查看分支创建时间" tabindex="-1"><a class="header-anchor" href="#查看分支创建时间" aria-hidden="true">#</a> 查看分支创建时间</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看本地当前分支</span>
<span class="token function">git</span> reflog <span class="token parameter variable">--date</span><span class="token operator">=</span>iso 

<span class="token comment"># 查看本地指定分支</span>
<span class="token function">git</span> reflog <span class="token parameter variable">--date</span><span class="token operator">=</span>iso <span class="token variable">\${branch}</span>

<span class="token comment"># 查看远程指定分支</span>
<span class="token function">git</span> reflog <span class="token parameter variable">--date</span><span class="token operator">=</span>iso origin/<span class="token variable">\${branch}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，本地分支可以查看到 clone 或 create 的日期：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>fe8f41af <span class="token punctuation">(</span>origin/master, origin/HEAD, master<span class="token punctuation">)</span> HEAD@<span class="token punctuation">{</span><span class="token number">2022</span>-05-23 09:38:28 +0800<span class="token punctuation">}</span>: merge origin/master: Fast-forward
7f2bfaa1 HEAD@<span class="token punctuation">{</span><span class="token number">2022</span>-05-07 <span class="token number">14</span>:30:04 +0800<span class="token punctuation">}</span>: clone: from https://gitlab.com/

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>d149ade1 feat/name@<span class="token punctuation">{</span><span class="token number">2022</span>-07-14 <span class="token number">11</span>:35:49 +0800<span class="token punctuation">}</span>: commit: refactor: 修改变量名 
fcecacd7 feat/name@<span class="token punctuation">{</span><span class="token number">2022</span>-07-13 <span class="token number">17</span>:26:16 +0800<span class="token punctuation">}</span>: branch: Created from HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但远程分支，并不能确切地知道分支创建的日期：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>c93e70dc refs/remotes/origin/feat/name@<span class="token punctuation">{</span><span class="token number">2022</span>-07-18 <span class="token number">17</span>:35:27 +0800<span class="token punctuation">}</span>: update by push
dcea169b refs/remotes/origin/feat/name@<span class="token punctuation">{</span><span class="token number">2022</span>-07-18 <span class="token number">16</span>:50:20 +0800<span class="token punctuation">}</span>: update by push
336190dc refs/remotes/origin/feat/name@<span class="token punctuation">{</span><span class="token number">2022</span>-07-18 <span class="token number">16</span>:17:57 +0800<span class="token punctuation">}</span>: update by push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="根据文件搜索历史" tabindex="-1"><a class="header-anchor" href="#根据文件搜索历史" aria-hidden="true">#</a> 根据文件搜索历史</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> log <span class="token parameter variable">--all</span> --full-history -- package-lock.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a></h3><h3 id="从所有提交中删除一个文件" tabindex="-1"><a class="header-anchor" href="#从所有提交中删除一个文件" aria-hidden="true">#</a> 从所有提交中删除一个文件</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> filter-branch --tree-filter <span class="token string">&quot;rm -rf package-lock.json&quot;</span> --prune-empty -- <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果代码已经推送到了远程仓库，还需要强制推送</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> push <span class="token parameter variable">-f</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,79);function u(b,v){const n=r("ExternalLinkIcon");return l(),d("div",null,[o,s("p",null,[a("Mac或Linux用户，推荐安装"),s("a",p,[a("https://github.com/robbyrussell/oh-my-zsh"),c(n)]),a("，增强命令行体验。")]),h])}const k=i(t,[["render",u],["__file","git-useful-commands.html.vue"]]);export{k as default};

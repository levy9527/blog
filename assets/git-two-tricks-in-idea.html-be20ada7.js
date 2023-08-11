import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{o,c as i,e as a,a as e,b as p,f as c}from"./app-301ad891.js";const d={},s=e("h1",{id:"在idea查看git历史记录的小技巧",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#在idea查看git历史记录的小技巧","aria-hidden":"true"},"#"),p(" 在IDEA查看Git历史记录的小技巧")],-1),r=e("p",null,"分享两个Git的小技巧， 都是关于在 IDEA 里查看Git的历史记录的。",-1),l=e("p",null,"这两个技巧，简单却实用。面对年代久远、团队人员流失严重的代码，靠的就是这两个技巧, 从提交记录里品读岁月史书，从蛛丝马迹中寻找遗失的真相。",-1),n=c("<p>第一个是叫 <code>annotate with git blame</code>。<br> 在Idea的行号这个位置，右键，再点击即可。如图所示：</p><p>效果就是，每一行代码都会显示，该行代码是由谁提交的、 什么时候提交的。</p><p>在合并冲突的时候也可以用这个技巧。</p><p>对左右两边进行<code>git blame</code>一下， 然后就可以看到如图所示的情况：</p><p>这样就能提供更多的信息帮助解决冲突。</p><p>就算冲突无法自己解决，也至少能知道提交代码的是谁，可以找到作者去进行沟通。</p><p>当然<code>git blame</code> 是有一些注意点的。因为它本质上显示的是某一行代码的最后提交人， 也就是last modified的一个概念，而有些时候这并不意味着最后的修改人就是代码的原作者。</p><p>之所以这样，可能会有以下的原因:</p><ol><li>代码格式化</li><li>移动代码，比如说拷贝代码、迁移代码</li><li>合并代码，解决冲突</li></ol><p>上述操作都会改变最后修改人的这个属性，但此时显然最后修改人并非原作者。</p><p>这说明，有时候仅知道了某一行代码是由谁最近修改的还不够，还需要知道某一个文件经过了怎么样的修改。</p><p>这就引出了第二个小技巧了: <code>git show history</code>。</p><p>点击IDEA某个文件的空白处，然后右键，选择git，然后点击 show history。</p><p>就会出现如图所示的这样的一个 git log的 界面。</p><p>那么这样就可以看到这个文件从最初到至今经历过了怎样的修改、 有过哪些人在上面修改， 从而更好的进行记录追踪。</p><p>这两个技巧， 其实是越有经验就对你帮助越大的。因为你，年限越长，你看别人的代码的机会就越； 而如果你年限尚浅的话，更多的是你的代码被别人 review。</p>",16);function _(h,m){return o(),i("div",null,[s,r,l,a(" more "),n])}const u=t(d,[["render",_],["__file","git-two-tricks-in-idea.html.vue"]]);export{u as default};

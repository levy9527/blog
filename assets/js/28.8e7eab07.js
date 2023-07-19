(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{303:function(t,v,a){"use strict";a.r(v);var r=a(10),e=Object(r.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"git代码合并指南"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#git代码合并指南"}},[t._v("#")]),t._v(" Git代码合并指南")]),t._v(" "),v("h2",{attrs:{id:"前言"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[t._v("#")]),t._v(" 前言")]),t._v(" "),v("p",[t._v("合并时代码常见问题是冲突、提交错代码以及合并错分支，本文将说明这些问题的解决方案，为代码合并打下坚实的基础，以应对未来可能出现的分支模型多样化、协作流程复杂化的场景。\n在说明问题前，先定义一些概念：")]),t._v(" "),v("ul",[v("li",[t._v("feat：指代功能分支")]),t._v(" "),v("li",[t._v("dev 与 test：指代两条不同的长驻分支，它们具有以下特点：\n"),v("ul",[v("li",[t._v("受保护，不能直接推送")]),t._v(" "),v("li",[t._v("不会被删除")]),t._v(" "),v("li",[t._v("二者之间不直接合并，也即合并方式一般是 feat -> dev，feat -> test")])])]),t._v(" "),v("li",[t._v("MR：merge request。代码合并请求")])]),t._v(" "),v("p",[t._v("以及说明本文解决冲突涉及到的工具及平台：")]),t._v(" "),v("ul",[v("li",[t._v("使用 IDEA 解决冲突（JetBrains系列的工具都适用）")]),t._v(" "),v("li",[t._v("使用 GitLab 托管代码")])]),t._v(" "),v("h2",{attrs:{id:"功能分支合并长驻分支冲突"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#功能分支合并长驻分支冲突"}},[t._v("#")]),t._v(" 功能分支合并长驻分支冲突")]),t._v(" "),v("p",[t._v("这是最常见的场景：feat1 与 feat2 并行开发，当提交MR（ feat1 -> dev ）时，发现冲突了，无法合并。\n下面先给出解决思路，再给出图文操作步骤。")]),t._v(" "),v("h3",{attrs:{id:"解决思路"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#解决思路"}},[t._v("#")]),t._v(" 解决思路")]),t._v(" "),v("ol",[v("li",[t._v("因为合并的方向是 feat -> dev，所以解决冲突应该是在本地 dev 合并 feat")]),t._v(" "),v("li",[t._v("又因为本地 dev 不能向远程推送，因而需要基于 dev 切一个新分支 conflict/resolved")]),t._v(" "),v("li",[t._v("基于 conflict/resolved 分支合并 feat")]),t._v(" "),v("li",[t._v("推送 conflict/resolved 分支")]),t._v(" "),v("li",[t._v("提交 MR：conflict/resolved -> dev")])]),t._v(" "),v("p",[t._v("上述步骤操作烦琐，推荐直接使用我写的"),v("RouterLink",{attrs:{to:"/docs/tools/use-command-line-tool-to-operate-gitlab-merge-request.html"}},[t._v("命令行工具")]),t._v("，使用 mr merge 命令即可。")],1),t._v(" "),v("h3",{attrs:{id:"操作步骤"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#操作步骤"}},[t._v("#")]),t._v(" 操作步骤")]),t._v(" "),v("ol",[v("li",[t._v("本地切换到 dev 分支，更新代码")]),t._v(" "),v("li",[t._v("合并相应的 feat 分支")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344287512.png",alt:""}})]),t._v(" "),v("ol",[v("li",[t._v("弹出冲突提示，点击合并")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344293749.png",alt:""}})]),t._v(" "),v("ol",[v("li",[t._v("首先处理无冲突的代码，点击下图红框处")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344298158.png",alt:""}})]),t._v(" "),v("ol",[v("li",[t._v("再根据情况，选择合并代码或丢弃代码。")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344303228.png",alt:""}})]),t._v(" "),v("ol",[v("li",[t._v("在 dev 分支上切出新分支，推荐命名为 conflict/xxx")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344307534.png",alt:""}})]),t._v(" "),v("ol",[v("li",[t._v("推送代码，提交MR（conflict -> dev)，记得勾选合并后删除")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344312127.png",alt:""}})]),t._v(" "),v("h2",{attrs:{id:"功能分支被污染"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#功能分支被污染"}},[t._v("#")]),t._v(" 功能分支被污染")]),t._v(" "),v("p",[t._v("分支一多，人难免失误，很可能造成 feat 分支被污染，即当提MR（feat -> test）时，出现不想合并到 test的代码或提交记录。\n这种场景的出现可能有多种原因：")]),t._v(" "),v("ol",[v("li",[t._v("研发过程中出现误操作，如出现了 dev -> feat 的合并")]),t._v(" "),v("li",[t._v("feat 分支的基线分支搞错了，如从 dev 切出了 feat")])]),t._v(" "),v("h3",{attrs:{id:"解决思路-2"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#解决思路-2"}},[t._v("#")]),t._v(" 解决思路")]),t._v(" "),v("ol",[v("li",[t._v("基于目标分支如 (test 分支）切一个干净的分支 clean")]),t._v(" "),v("li",[t._v("使用 cherry-pick，挑选自己想要的提交")]),t._v(" "),v("li",[t._v("再提交MR（clean -> test）")])]),t._v(" "),v("p",[t._v("注意的是，要按提交顺序进行 cherry-pick，以避免遗漏或出错。")]),t._v(" "),v("h3",{attrs:{id:"操作步骤-2"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#操作步骤-2"}},[t._v("#")]),t._v(" 操作步骤")]),t._v(" "),v("ol",[v("li",[t._v("更新目标分支（在这里是 test）")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344317048.png",alt:""}})]),t._v(" "),v("ol",[v("li",[t._v("基于 test 切新分支，这里示例命名为：clean")])]),t._v(" "),v("p",[v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344322358.png",alt:""}})]),t._v(" "),v("ol",[v("li",[t._v("在拥有最新代码的分支（这里是 feat） 找到并选中相应的提交记录")]),t._v(" "),v("li",[t._v("右键，点击 Cherry-Pick"),v("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682344326902.png",alt:""}})]),t._v(" "),v("li",[t._v("则相应的提交记录就会合并到 clean 分支")]),t._v(" "),v("li",[t._v("推送 clean，提交MR（clean -> test）")])]),t._v(" "),v("h2",{attrs:{id:"挑选别的分支部分代码合并"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#挑选别的分支部分代码合并"}},[t._v("#")]),t._v(" 挑选别的分支部分代码合并")]),t._v(" "),v("p",[t._v("有可能会出现这样一种场景：")]),t._v(" "),v("ul",[v("li",[t._v("最新的生产代码里，假设版本为v1.3.0，包含了 feat 分支的代码")]),t._v(" "),v("li",[t._v("为了减少分支的冗余，代码一旦上生产后，就会清除相应的功能分支，也即此时仓库里没有 feat 分支了")]),t._v(" "),v("li",[t._v("客户方部署的版本代码为 v1.1.0，而客户不想升级到最新的版本，只想要 feat 分支相应的功能")])]),t._v(" "),v("p",[t._v("此时该如何是好？")]),t._v(" "),v("h3",{attrs:{id:"解决思路-3"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#解决思路-3"}},[t._v("#")]),t._v(" 解决思路")]),t._v(" "),v("p",[t._v("其实只要触发“挑选”关键字，就可以考虑使用 cherry-pick。\nfeat 分支就算被删了，只要提交记录还在，那也没关系：")]),t._v(" "),v("ul",[v("li",[t._v("在v1.3.0 的代码库中，按分支筛选，找出 feat 分支对应的提交记录")]),t._v(" "),v("li",[t._v("通过 cherry-pick 把 feat 分支的代码合并到客户方的代码分支即可")])]),t._v(" "),v("p",[t._v("注意：毕竟跨越了版本，无法保证合并过去后的代码一定能正确工作，需要进行充分地测试。")]),t._v(" "),v("h3",{attrs:{id:"操作步骤-3"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#操作步骤-3"}},[t._v("#")]),t._v(" 操作步骤")]),t._v(" "),v("p",[t._v("此操作本质还是 cherry-pick，参考前面 cherry-pick 的示例即可。")])])}),[],!1,null,null,null);v.default=e.exports}}]);
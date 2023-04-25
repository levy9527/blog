(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{294:function(t,v,e){"use strict";e.r(v);var _=e(14),a=Object(_.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"再论git-flow"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#再论git-flow"}},[t._v("#")]),t._v(" 再论Git Flow")]),t._v(" "),v("h2",{attrs:{id:"背景"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),v("p",[t._v("团队目前使用的 Git 协作模式是：")]),t._v(" "),v("ol",[v("li",[t._v("对每个功能建立相应的 feat 分支")]),t._v(" "),v("li",[t._v("上研发、测试、UAT环境时，分别把相应的 feat 分支合并进入长驻 dev/test/uat")]),t._v(" "),v("li",[t._v("如有冲突，则在本地更新长驻分支 dev/test/uat，merge feat into current branch，之后 checkout 一个新分支，作为 conflict resolved 分支，推送并合并至远程长驻分支")])]),t._v(" "),v("p",[t._v("这个模式简单好懂，且业界流行，最直观的好处是，可以满足以下需求：")]),t._v(" "),v("ol",[v("li",[t._v("某 feat 合并至 dev 后，并不想合并至 test")]),t._v(" "),v("li",[t._v("某 feat 合并至 test 后，并不想合并至 uat")])]),t._v(" "),v("p",[t._v("本文暂且不讨论该交付理念的优劣，毕竟每个团队研发情况、交付理念都不一样。 本文关注的是，在满足上述需求的情况下，是否有更好的分支协作方式。")]),t._v(" "),v("h2",{attrs:{id:"动机"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#动机"}},[t._v("#")]),t._v(" 动机")]),t._v(" "),v("p",[t._v("为什么要寻求更好的方式？因为上述分支协作模式，会导致代码冲突的噩梦：")]),t._v(" "),v("ol",[v("li",[t._v("feat -> dev，解决冲突")]),t._v(" "),v("li",[t._v("feat -> test，又要解决冲突")]),t._v(" "),v("li",[t._v("feat -> uat，还要解决冲突")])]),t._v(" "),v("p",[t._v("正如"),v("a",{attrs:{href:"https://www.cloudbees.com/blog/pitfalls-feature-branching",target:"_blank",rel:"noopener noreferrer"}},[t._v("此文章"),v("OutboundLink")],1),t._v("所说，“把时间浪费在解决不必要的冲突上”。")]),t._v(" "),v("p",[t._v("再者，功能已经通过测试了，准备上UAT环境时，居然还要解决一大堆曾经解决过的冲突，实在不想接受这种“惊喜”（或者说“惊吓”更合适）——合错代码了怎么办？并且，这么多分支，遗漏了怎么办？这些问题可以解决，但难免有为了解决一个问题，引入更多问题之嫌。")]),t._v(" "),v("p",[t._v("理想中的研发流程是，测试通过后，上 UAT 的体验是平滑的，是不用担心出错的。")]),t._v(" "),v("p",[t._v("为此，本文思考是否存在另一种分支协作的方式。")]),t._v(" "),v("h2",{attrs:{id:"分析"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分析"}},[t._v("#")]),t._v(" 分析")]),t._v(" "),v("p",[t._v("首先分析一下，“某功能测试通过但不上 UAT”的可操作方法有哪些：")]),t._v(" "),v("ol",[v("li",[t._v("要上 UAT 的 feat 分支逐个依次合并至长驻分支，也即当前的做法")]),t._v(" "),v("li",[t._v("在原计划要上的功能的代码集合中，剔除掉相应 feat 的代码，再上 UAT")]),t._v(" "),v("li",[t._v("相应分支再次提交代码，或提交 revert commit，或屏蔽相应的功能及入口，变相达到目的")])]),t._v(" "),v("h3",{attrs:{id:"剔除代码"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#剔除代码"}},[t._v("#")]),t._v(" 剔除代码")]),t._v(" "),v("p",[t._v("先来看第2种方法。filter by branch，这是最先想到且符合直觉的方式，可惜实际上 Git 并没有此功能。")]),t._v(" "),v("p",[t._v("想“剔除某 feat 分支的代码”，可操作方式如下，更多请"),v("a",{attrs:{href:"https://www.clock.co.uk/insight/deleting-a-git-commit",target:"_blank",rel:"noopener noreferrer"}},[t._v("参考此文章"),v("OutboundLink")],1),t._v("：")]),t._v(" "),v("ol",[v("li",[v("code",[t._v("git rebase")])]),t._v(" "),v("li",[v("code",[t._v("git cherry-pick")])])]),t._v(" "),v("p",[v("code",[t._v("git rebase")]),t._v("要求 commit 是连续的，这对于实际不可行，因为集成分支里各个 feat 分支的提交记录掺杂在一起。")]),t._v(" "),v("p",[v("code",[t._v("git cherry-pick")]),t._v("是可行的。不过其思路是挑捡想要的 commit，放到目标分支，本质上并不是剔除的逻辑。")]),t._v(" "),v("h3",{attrs:{id:"再次提交"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#再次提交"}},[t._v("#")]),t._v(" 再次提交")]),t._v(" "),v("p",[t._v('真正的剔除逻辑，存在于第3种方法中。提交一个 revert commit，就可以把之前的代码干掉了（如果想恢复代码，需要 revert "revert commit")。')]),t._v(" "),v("p",[t._v("觉得 revert 可能会对后续恢复代码造成困扰的话，也可以再提交代码，屏蔽相应功能及入口。这种方式适合于功能入口少，功能本身具有类似开关特性的场景。")]),t._v(" "),v("h3",{attrs:{id:"比较优劣"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#比较优劣"}},[t._v("#")]),t._v(" 比较优劣")]),t._v(" "),v("p",[t._v("要比较上述方案优劣，本文倾向于使用功利主义的最佳实践作为指导思想——认为痛苦存在更多共同点，因而为避免消极而努力。换言之，本文关注的是，哪种方案最令人痛苦，则优先淘汰它。")]),t._v(" "),v("p",[t._v("还有一个指导思想：麻烦、辛苦的事情放前面；前面可以多做，后面期望少做。")]),t._v(" "),v("p",[t._v("当前的方式，存在最难受的问题：解决过的冲突，需要重复地解决。涉及范围：全部分支。涉及人员：所有参与研发的人员，即使他们在别的 feat 分支提交代码。")]),t._v(" "),v("p",[t._v("cherry-pick 依然存在要重复解决冲突的问题，且涉及范围同样为全部分支，但涉及人员减少为单人，因为只需要一个做 cherry-pick 的工作，由其解决 cherry-pick 遇到的冲突（当然，很可能需要他人协助）。")]),t._v(" "),v("p",[t._v("再次提交，冲突的可能性将大大减少，涉及范围：相应的 feat 分支。涉及人员：相应的 feat 分支研发人员。")]),t._v(" "),v("p",[t._v("也即使用再次提交的方案，痛苦将降低至最小。这也是符合直觉的：谁出问题，谁负责。某功能不上线了，这也算是“问题”的一种，则相应的负责人去处理，尽可能不影响到其他人。")]),t._v(" "),v("p",[t._v("至于再次提交是使用 revert 还是屏蔽功能及入口，则具体情况具体分析。")]),t._v(" "),v("h2",{attrs:{id:"实例"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#实例"}},[t._v("#")]),t._v(" 实例")]),t._v(" "),v("p",[t._v("下面举例说明，如何应用上述分析结果。")]),t._v(" "),v("h3",{attrs:{id:"分支模型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分支模型"}},[t._v("#")]),t._v(" 分支模型")]),t._v(" "),v("p",[t._v("长驻分支： dev/test/uat，分别对应环境：研发/测试/UAT")]),t._v(" "),v("p",[t._v("一个月一次的迭代开始时，都建立相应的  release 分支，命名规则可以：")]),t._v(" "),v("ul",[v("li",[t._v("按版本，如： release/v2.15")]),t._v(" "),v("li",[t._v("按上线日期，如：release/04-26")])]),t._v(" "),v("h3",{attrs:{id:"功能提交"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#功能提交"}},[t._v("#")]),t._v(" 功能提交")]),t._v(" "),v("p",[t._v("每个研发人员根据相应功能，从 uat checkout 相应的 feat 分支。")]),t._v(" "),v("p",[t._v("每次需要集成发布时，正常的分支合并操作如下：")]),t._v(" "),v("ol",[v("li",[t._v("feat -> dev")]),t._v(" "),v("li",[t._v("feat -> release")]),t._v(" "),v("li",[t._v("release -> test")]),t._v(" "),v("li",[t._v("release -> uat")])]),t._v(" "),v("p",[t._v("则冲突大多数情况只发生在第前两步，解决之后，后续上测试环境、上 UAT 环境，基本无需担心冲突。")]),t._v(" "),v("p",[t._v("为什么一个 feat 要合并两次？")]),t._v(" "),v("p",[t._v("因为要保证 release 的功能是较为完整的, 至少经过开发人员在 dev 环境的自测。")]),t._v(" "),v("p",[t._v("并且这样也能适应不同的功能分批提测的研发节奏。")]),t._v(" "),v("h3",{attrs:{id:"功能回撤"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#功能回撤"}},[t._v("#")]),t._v(" 功能回撤")]),t._v(" "),v("p",[t._v("当 release 合并至 test 分支后，得到通知，某功能（分支涉及 feat/unwanted）不上 UAT。")]),t._v(" "),v("p",[t._v("则此时，feat/unwanted 相应的研发人员，为了进行功能回滚，操作如下：")]),t._v(" "),v("ol",[v("li",[t._v("checkout rollback 分支")]),t._v(" "),v("li",[t._v("进行回滚提交，或 revert，或屏蔽功能入口")]),t._v(" "),v("li",[t._v("请求合并至 UAT（不合并至 release/分支）:")])]),t._v(" "),v("p",[t._v("后续要恢复功能，在 rollback 分支操作，再合并至 UAT 即可。")]),t._v(" "),v("h2",{attrs:{id:"结论"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#结论"}},[t._v("#")]),t._v(" 结论")]),t._v(" "),v("p",[t._v("通过分析与比较，本文推荐使用“再次提交”的方式，来满足某 feat 分支合进 test，不合进 uat 分支的需求。")]),t._v(" "),v("p",[t._v("这样做，将改动涉及范围减至最小，涉及人员降为单人，大大减少上 UAT 时合并代码的痛苦，达到平稳上线的目的。")])])}),[],!1,null,null,null);v.default=a.exports}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{293:function(t,a,s){"use strict";s.r(a);var n=s(14),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"gitlab-ci"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-ci"}},[t._v("#")]),t._v(" Gitlab CI")]),t._v(" "),a("h2",{attrs:{id:"合并代码前进行检查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#合并代码前进行检查"}},[t._v("#")]),t._v(" 合并代码前进行检查")]),t._v(" "),a("h3",{attrs:{id:"背景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),a("p",[t._v("有的产品线使用 Jenkins 进行 CI，但又没设置好相应的 GitLab 插件，于是会形成这样一个流程：")]),t._v(" "),a("ul",[a("li",[t._v("feature 分支发起 Merge Request")]),t._v(" "),a("li",[t._v("合并至受保护的分支")]),t._v(" "),a("li",[t._v("登录 Jenkins，点击构建")]),t._v(" "),a("li",[t._v("构建失败，原因：编译报错")])]),t._v(" "),a("p",[t._v("最后一点，非常难以忍受，因为代码已经合并进去了，木已成舟。此时面对编译报错，第一反应是解决报错，重新编译。但有没有一种可能，我根本不想要这些编译报错的代码呢？")]),t._v(" "),a("p",[t._v("笔者还是更倾向于防患于未然的思维模式，也即不能通过编译的代码，不允许合并至受保护的分支。而使用 Gitlab CI 来做这件事比 Jenkins 体验更丝滑，下面就来介绍一下具体的做法。")]),t._v(" "),a("h3",{attrs:{id:"安装gitlab-runner"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装gitlab-runner"}},[t._v("#")]),t._v(" 安装Gitlab Runner")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-d")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--name")]),t._v(" gitlab-runner "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--restart")]),t._v(" always "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" /var/run/docker.sock:/var/run/docker.sock "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" /srv/gitlab-runner/config:/etc/gitlab-runner "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n  gitlab/gitlab-runner:latest\n")])])]),a("p",[t._v("其他安装方式可查阅"),a("a",{attrs:{href:"https://docs.gitlab.com/runner/install/docker.html#install-the-docker-image-and-start-the-container",target:"_blank",rel:"noopener noreferrer"}},[t._v("文档"),a("OutboundLink")],1),t._v("。")]),t._v(" "),a("h3",{attrs:{id:"注册gitlab-runner"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#注册gitlab-runner"}},[t._v("#")]),t._v(" 注册Gitlab Runner")]),t._v(" "),a("p",[t._v("Gitlab Runner 根据范围分为"),a("a",{attrs:{href:"https://docs.gitlab.com/ee/ci/runners/runners_scope.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("三种"),a("OutboundLink")],1),t._v("。注册需要获取相应的 token，这就涉及到了权限，至少需要 Maintainer 权限。\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387098778.png",alt:"image.png"}}),t._v("\n下面以 Specific Runner 为例进行说明。")]),t._v(" "),a("p",[t._v("进入项目如下界面：\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387102770.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("拿到 URL 及 token：\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387107092.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("执行命令进行注册:")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--rm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-it")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-v")]),t._v(" /srv/gitlab-runner/config:/etc/gitlab-runner gitlab/gitlab-runner register\n")])])]),a("p",[t._v("根据提示输入内容，其中 URL 及 token 就是前面步骤中 Web 界面获取的信息。")]),t._v(" "),a("p",[t._v("命令行操作示例如下：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("Enter the GitLab instance URL "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("for example, https://gitlab.com/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\nhttps://your-gitlab\n\nEnter the registration token:\nyour-token\n\nEnter a description "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" the runner:\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("java")]),t._v("\n\nEnter tags "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" the runner "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("comma-separated"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("java")]),t._v("\n\n\nEnter an executor: custom, shell, virtualbox, kubernetes, docker, docker-ssh, parallels, ssh, docker+machine, docker-ssh+machine:\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v("\n\nEnter the default Docker image "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("for example, ruby:2.6"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(":\nmaven:3.6.3-openjdk-8\n")])])]),a("p",[t._v("注册成功后，显示示例如下：\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387118062.png",alt:"image.png"}})]),t._v(" "),a("h3",{attrs:{id:"设置mr检查"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#设置mr检查"}},[t._v("#")]),t._v(" 设置MR检查")]),t._v(" "),a("p",[t._v("进入项目如下界面：\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682387122013.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("勾选流水线必须成功。\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388470210.png",alt:"image.png"}})]),t._v(" "),a("h3",{attrs:{id:"配置-gitlab-ci-yml"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置-gitlab-ci-yml"}},[t._v("#")]),t._v(" 配置.gitlab-ci.yml")]),t._v(" "),a("p",[t._v("简单示例如下，根据实际情况修改：")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" maven"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("3.6.3"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("openjdk"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("variables")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MAVEN_CLI_OPTS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-s .m2/settings.xml --batch-mode"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MAVEN_OPTS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"-Dmaven.repo.local=.m2/repository"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("cache")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("paths")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" .m2/repository\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stages")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" build\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("build")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" build\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" mvn $MAVEN_CLI_OPTS clean compile\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tags")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" java "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 这是注册了的 gitlab runner 的 tag")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("rules")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $CI_MERGE_REQUEST_TARGET_BRANCH_NAME =~ /develop"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v("test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v("uat/\n\n")])])]),a("p",[t._v("上述示例要设置成功，还要确保 .m2/settings.xml 文件存在。")]),t._v(" "),a("p",[t._v("建议提前 yml 文件前，在 Gitlab 先进行语法校验。\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388474604.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("如果错误，会有提示。\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388478169.png",alt:"image.png"}})]),t._v(" "),a("h3",{attrs:{id:"效果"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#效果"}},[t._v("#")]),t._v(" 效果")]),t._v(" "),a("p",[t._v("当流水线还未结束时，不能提前合并代码，只能等待流水线成功。\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388481821.png",alt:"image.png"}})]),t._v(" "),a("p",[t._v("如果流水线失败了，不能合并。\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388485568.png",alt:"image.png"}})]),t._v(" "),a("h2",{attrs:{id:"线上发布-jar"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#线上发布-jar"}},[t._v("#")]),t._v(" 线上发布 jar")]),t._v(" "),a("p",[t._v("可以在前文的基础上，设置流水线自动发布 jar。")]),t._v(" "),a("h3",{attrs:{id:"maven配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maven配置"}},[t._v("#")]),t._v(" Maven配置")]),t._v(" "),a("p",[t._v("考虑到一个项目A，可能划分了多个模块，并非每个模块都需要发布 jar，可以修改对应模块的 pom.xml")]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("build")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("plugins")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--  跳过 deploy 步骤   --\x3e")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("plugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("groupId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("org.apache.maven.plugins"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("groupId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("artifactId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("maven-deploy-plugin"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("artifactId")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("3.0.0"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("configuration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("skip")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("true"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("skip")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("configuration")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("plugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("plugins")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("build")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("则在项目根目录执行 deploy 命令即可：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("mvn deploy "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-Dmaven.test.skip")]),t._v("\n")])])]),a("h3",{attrs:{id:"gitlab配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab配置"}},[t._v("#")]),t._v(" Gitlab配置")]),t._v(" "),a("p",[t._v("相应 gitlab-ci 配置如下：")]),t._v(" "),a("div",{staticClass:"language-yaml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yaml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("deploy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("stage")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" deploy\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" mvn $MAVEN_CLI_OPTS "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("Dmaven.test.skip deploy\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("tags")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" java\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("rules")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" $CI_COMMIT_BRANCH =~ /develop"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v("test"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("|")]),t._v("uat/\n\n")])])]),a("p",[t._v("代码合并或有新的 commit 时，会执行流水线：\n"),a("img",{attrs:{src:"https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682388489368.png",alt:"image.png"}})]),t._v(" "),a("h3",{attrs:{id:"拉取最新的jar"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拉取最新的jar"}},[t._v("#")]),t._v(" 拉取最新的jar")]),t._v(" "),a("p",[t._v("在B项目中，如果要引用A项目打出来的 jar，记得拉取最新的版本，pom.xml 设置如下：")]),t._v(" "),a("div",{staticClass:"language-xml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-xml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("repositories")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("repository")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("id")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nexus"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("id")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nexus-snapshot"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("http://localhost:8081/repository/maven-snapshots/"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("snapshots")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n              "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("true"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n            "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("\x3c!--     拉取最新的   --\x3e")]),t._v("\n              "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("updatePolicy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("always"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("updatePolicy")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("snapshots")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("repository")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("repositories")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"报错"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#报错"}},[t._v("#")]),t._v(" 报错")]),t._v(" "),a("h3",{attrs:{id:"创建不了容器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#创建不了容器"}},[t._v("#")]),t._v(" 创建不了容器")]),t._v(" "),a("blockquote",[a("p",[t._v('ERROR: Preparation failed: adding cache volume: set volume permissions: running permission container "d1574748b77fc73a4319a45341af1f0eab983900d81885a02c017ff6c5559f28" for volume "runner-bzsttzs-project-2271-concurrent-0-cache-3c3f060a0374fc8bc39395164f415a70": starting permission container: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "process_linux.go:319: getting the final child\'s pid from pipe caused "EOF"": unknown (linux_set.go:105:0s)')])]),t._v(" "),a("p",[t._v("可以尝试的方案：")]),t._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("docker")]),t._v(" restart gitlab-runner\n")])])]),a("h3",{attrs:{id:"本地成功-流水线失败"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地成功-流水线失败"}},[t._v("#")]),t._v(" 本地成功，流水线失败")]),t._v(" "),a("p",[t._v("如果流水线编译报错，本地编译通过，不用怀疑，一定是本地的问题。")]),t._v(" "),a("p",[t._v("本地之所以能编译通过，是因为有缓存。如果 pom.xml 没有设置 "),a("code",[t._v("<updatePolicy>always</updatePolicy>")]),t._v("，编译时很可能使用的是缓存。")]),t._v(" "),a("p",[t._v("清除缓存拉取最新的包即可。")]),t._v(" "),a("div",{staticClass:"language-python extra-class"},[a("pre",{pre:!0,attrs:{class:"language-python"}},[a("code",[t._v("mvn "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("U clean install\n")])])]),a("h2",{attrs:{id:"参考文档"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文档"}},[t._v("#")]),t._v(" 参考文档")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://docs.gitlab.com/ee/ci/examples/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Gitlab CI 示例 "),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://docs.gitlab.com/ee/ci/variables/predefined_variables.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("预设的环境变量"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://docs.gitlab.com/ee/ci/jobs/job_control.html#specify-when-jobs-run-with-rules",target:"_blank",rel:"noopener noreferrer"}},[t._v("rules规则说明"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);
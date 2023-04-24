# Git常用命令
## 前言
这里列举常见场景，并给出相应解决方案
约定： 下文代码块中`${}`里面表示的是变量，具体值视情况而定，其余的都是正确可执行的命令。
## 配置
Mac/Linux 用户 执行以下操作
```bash
vi ~/.gitconfig
```
Windows用户在桌面用户文件夹下有个.gitconfig隐藏文件，直接修改即可
![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682343376774.png)
补充以下内容
```bash
[alias]
  st = status
  cm = commit
  br = branch
  co = checkout
  ps = push
```
## 增强
Mac或Linux用户，推荐安装[https://github.com/robbyrussell/oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)，增强命令行体验。
## 记住账号密码
```bash
# 输入下列命令后，再输入一次账号密码即可
git config --global credential.helper store
```
## 本地提交
### 取消未暂存的修改
```bash
# 恢复单个文件
git checkout -- ${file}

# 恢复目录下所有文件
git checkout -- .
```
### 取消add
```bash
git reset HEAD
```
### 取消提交
```bash
git reset HEAD^1
```
或者
```bash
# 查看提交的hash
git log
# 使用相应的hash回滚
git reset ${hash}
```
### 修正提交
适用于提交信息有误或有遗漏，需要修正最新提交信息的场景。
```bash
git commit --amend
```
### stash修改
适用于当前功能开发并不完整，不能产生一次提交，但却要开发另外功能的场景
```bash
git stash save '${msg}'
```
### 恢复stash
```bash
git stash pop
```
## 分支管理
### 创建分支
```bash
git checkout -b ${branch}
# 根据commit hash 创建分支
git checkout -b ${branch} ${commit_hash}
# 切出远程分支到本地
git checkout --track origin/{branch}
```
### 查看远程分支
```bash
git branch --remote
# 或者
git branch -r
如果上述命令看不到所有的远程分支，可以使用以下命令
git ls-remote --heads
```
### 创建干净历史分支
```bash
git checkout --orphan ${branch}
```
### 删除分支
```bash
# 删除本地分支
git branch -d ${local_branch}
# 删除远程分支
git push origin -d ${remote_branch}
# 或
git push origin :${remote_branch}
```
## 标签管理
### 新建本地标签
```bash
git tag ${tag_name}
```
### 删除本地标签
```bash
git tag -d ${tag_name}
```
### 查看本地所有标签
```bash
git tag -l
```
### 推送本地标签
```bash
git push origin ${tag_name}
# 推送所有标签
git push origin --tags
# 同时推送提交记录以及本分支的所有标签
git push --follow-tags
```
### 获取远程标签
```bash
git fetch origin tag
```
### 删除远程标签
```bash
git push origin -d tag ${tag_name}
```
## 
## 远程仓库
### 浅克隆
适用于仓库很大，对过往历史不关心，想快速克隆的场景。
```bash
git clone --depth=1 ${repo_url}
```
### 克隆指定分支
适用于只想要某一分支代码的场景。
```bash
git clone -b ${branch} ${repo_url}
```

### 克隆失败因为文件名太长
报错信息为：`error: unable to create file xxx.java: Filename too long`

```sql
git clone -c core.longpaths=true ${repo_url}
```

注意，如果是使用 IDEA 进行克隆，很可能会看忽略该报错，但可以根据以下经验加以验证：如果 git clone 完成后，工作区并不干净（可以用 git status 检查）、不能切换分支，说明很可能就是上述情况。

### 强行推送
适用于本地开发了一段时间，最近才在代码托管平台上初始化远程仓库的场景
```bash
# 谨慎：本地master分支会覆盖远程master分支！
git push --force
```
### 
### 取消错误的推送
适用于推送了错误的提交后, 想取消该推送的场景
```bash
# 更新代码
# 一定要更新最新的代码! 以免覆盖掉其他协作者的推送!
git pull
# 查看提交的hash
git log
# 使用相应的hash回滚
# 注意: 回滚后 在${hash}之后提交的代码 都会在 Changes to be committed 中
git reset ${hash}
# 覆盖远程仓库的代码
git push --force
```
## 其他
### cherry-pick
方法一：

1. checkout目标分支(target branch)
2. 选中相应的提交记录，右键
3. 点击Cherry-pick![image.png](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682343384184.png)
4. 则相应的提交记录就会合并到目标分支

方法二：

1. checkout目标分支(target branch)
2. 在源分支(source  branch)获取revision number![](https://raw.gitmirror.com/levy9527/image-holder/main/docs/git/1682343389693.png)3.开始cherry-pick。输入命令
```bash
git cherry-pick df2612cf167ebaf5e743042477942b95bf15f33d b910c946f8d3dedbb33c2478fceda53867e77000 0737f6f4eb35cf79a3d775f7e05f39a2e1bd65d9 f99c68db44102f28a2a3652103ad94733092c788 9c5cba2ac3ba9b9870d57ac8a59d83333b6a3623 2659bfeae32bd3ca6a574669359248e631e750fd 4d7fa72438d20d1c5917dc9b234d90ea791fd7c5
```

4. 解决冲突。遇到冲突，会提示，解决冲突后
```bash
git add ${冲突的文件}
```

5. 继续cherry-pick。之后会提示，继续操作
```bash
git cherry-pick --continue
```
 如再遇到冲突，重复4，5

6. 则相应的提交记录就会合并到目标分支
### merge unrelated histories
遇到上述问题时，可以使用 `--allow-unrelated-histories` ，如
```bash
git merge --allow-unrelated-histories
```
```bash
git pull origin ${branch} --allow-unrelated-histories
```
### 查看分支创建时间
```shell
# 查看本地当前分支
git reflog --date=iso 

# 查看本地指定分支
git reflog --date=iso ${branch}

# 查看远程指定分支
git reflog --date=iso origin/${branch}
```
注意，本地分支可以查看到 clone 或 create 的日期：
```shell
fe8f41af (origin/master, origin/HEAD, master) HEAD@{2022-05-23 09:38:28 +0800}: merge origin/master: Fast-forward
7f2bfaa1 HEAD@{2022-05-07 14:30:04 +0800}: clone: from https://gitlab.com/

```
```shell
d149ade1 feat/name@{2022-07-14 11:35:49 +0800}: commit: refactor: 修改变量名 
fcecacd7 feat/name@{2022-07-13 17:26:16 +0800}: branch: Created from HEAD
```
但远程分支，并不能确切地知道分支创建的日期：
```shell
c93e70dc refs/remotes/origin/feat/name@{2022-07-18 17:35:27 +0800}: update by push
dcea169b refs/remotes/origin/feat/name@{2022-07-18 16:50:20 +0800}: update by push
336190dc refs/remotes/origin/feat/name@{2022-07-18 16:17:57 +0800}: update by push
```

### 根据文件搜索历史
```bash
git log --all --full-history -- package-lock.json
```
### 

### 从所有提交中删除一个文件
```bash
git filter-branch --tree-filter "rm -rf package-lock.json" --prune-empty -- --all
```

如果代码已经推送到了远程仓库，还需要强制推送
```bash
git push -f
```



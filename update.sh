#!/bin/sh
# 需要先安装 https://github.com/stedolan/jq
readme=README.md

# 恢复原始内容
cat introduction.md > $readme

echo '## 正文\n' >> $readme

while read -r title html_url
do
  echo "- [$title]($html_url)" >> $readme
done << EOF # https://askubuntu.com/questions/678915/whats-the-difference-between-and-in-bash
$(jq -r '.[] | "\(.title) \(.html_url)"' <<< `curl https://api.github.com/repos/levy9527/blog/issues`) 
EOF

git add $readme
git commit -m 'docs: update'
git pull --rebase
git push 

echo 提交信息: $1
echo 分支名称: $2
git add -A
git commit -m $2
git push origin $2

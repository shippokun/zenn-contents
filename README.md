# Zenn Contents

HRBrain で毎週行われるフロントエンドトークなどの活動を社外に展開するために zenn での投稿を行なっていきます。  
このリポジトリは投稿するために活用するために作成されました。

## 事前準備

```shell
npm ci
```

## 記入方法

```shell
# 記事の作成
npx zenn new:article --slug <article-name>
# ex) npx zenn new:article --slug hellow-world
# output) articles/hellow-world.md

# 記事のプレビュー
npx zenn preview
```

* [📘 How to use](https://zenn.dev/zenn/articles/zenn-cli-guide)

## 注意事項

社内用語やプロダクト名などは記事に載せないように注意しましょう  
最悪セキュリティインシデントにつながる恐れがあるため

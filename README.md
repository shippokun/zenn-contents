# Zenn Contents

HRBrain で毎週行われるフロントエンドトークなどの活動を社外に展開するため zenn での投稿を行なっていきます。  
このリポジトリは投稿するために活用するため作成されました。

## 事前準備

```shell
npm ci
```

## 記入方法

```shell
# 記事の作成
npm run create

# 記事のプレビュー
npx zenn preview
```

- [📘 How to use](https://zenn.dev/zenn/articles/zenn-cli-guide)

## 注意事項

社内用語やプロダクト名などは記事に載せないように注意しましょう。  
最悪セキュリティインシデントにつながる恐れがあるためです。

## 公開までの流れ

1. 新しくブランチを作成する
2. 記事を書く
3. 記事を push する
4. Github Actions による校正チェック
   1. pass → 次に進む
   2. failed → 記事を修正し、3 に戻る
5. [管理者](https://github.com/orgs/hrbrain/teams/zenn-content-manager) に PR Approve してもらう
6. main ブランチにマージ
7. 記事が公開される

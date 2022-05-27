---
title: "Frontend Talk（2022-05-27）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているしっぽくんです。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

今回は公開第 3 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# news

## Storybook v6.5 リリースブログが公開

https://storybook.js.org/blog/storybook-6-5/

[前回のフロントエンドトーク](https://zenn.dev/hrbrain/articles/frontend-talk-2022-05-20#storybook-v6.5.0-release%EF%BC%81) でも触れた Storybook v6.5 のリリースブログが公開されました。
前回触れていなかったトピックについて深掘りしました。

### Interaction testing

CSF(Component Story Format) 3.0 で導入された play 関数を storybook が提供する test-runner でアサーションがパスできるのかどうかをテストできるようになりました。
詳細な内容は[公式サイト](https://storybook.js.org/docs/react/writing-tests/test-runner)に記述されています。

> For those without a play function: it verifies whether the story renders without any errors.
> For those with a play function: it also checks for errors in the play function and that all assertions passed.

play 関数がない story であってもエラーなくレンダリングできるかのテストができ、一定利用するメリットはあります。
Storybook をデプロイしている環境がない場合と、ある場合の GitHub Actions のサンプル yaml があるので気になる方は確認してみてください。

### Figma plugin

https://www.figma.com/community/plugin/1056265616080331589/Storybook-Connect

Figma と Storybook をリンクさせることができる Plugin。
Plugin 公開直後に弊社のデザイナーチームと一緒に触ってみた感想を共有しました。

- Storybook をデプロイした環境が必要
- リンクしたいコンポーネントの URL と Figma のコンポーネントを 1:1 で Plugin を用いてリンク
- Action や Control など Storybook の addon は構うことができず、Canvas のような利用しかできない
- メンテナンスコストと実際のリターンが少々見合わないため、業務導入するのは見送り
  - とはいえ、一定の利用メリットはある
    - Storybook から Figma を閲覧できる [addon](https://storybook.js.org/addons/storybook-addon-designs) もある
    - 相互にリンク付けすることで気づいたらデザインと実装が乖離していた、をできるだけ回避できる

## Microsoft のデザインシステムが良さそう

https://developer.microsoft.com/en-us/fluentui#/

クロスプラットフォームアプリケーションを作るための UX フレームワーク。
React Components のドキュメントとして Storybook が公開されています。

https://react.fluentui.dev

Microsoft が提供する Office など多くのアプリに利用されており、実際のアプリケーションとコンポーネントを見比べてみるのも面白そうですね。
[React のコード](https://github.com/microsoft/fluentui/tree/master/packages/react)を見ると、各コンポーネントに testing-library を利用したテストコードが書かれており、a11y についてもテストを行っているため、テストコードを書くときの参考になりそうです。

## Deno と React を使った新しいフレームワーク「Ultra」についての記事が公開

https://ultrajs.dev/
https://blog.logrocket.com/using-ultra-new-react-web-framework/

Deno の新しいフレームワーク「Ultra」についてのブログ記事が公開されました。(Ultra 自体は 4 月時点で既に公開されています。)

- React の SSR に焦点を当てたフレームワーク
- ブラウザネイティブ機能に依存し、ES モジュール、web ストリームを使用
- TS,JSX との互換性
- 読みやすく理解しやすい
- メンテナンスが簡単

# know-how

## Building a Mini Next.js

https://hire.jonasgalvez.com.br/2022/may/18/building-a-mini-next-js/
https://github.com/fastify/fastify-vite

Vite を Fastify に統合するプラグインである fastify-vite を作成する過程で、そのパフォーマスを可視化するために Vite x Fastify x React で Mini Next.js を作成した過程を紹介した記事。
Next.js のファイルシステムベースのルーティングについて解説しつつ、実際のコードに落とした内容も紹介されています。

また合わせて、fastify-vite v3 の初めてのパブリックベータも 5/25 に公開されているので気になった方は確認してみてください。
この記事で紹介されている内容のコードは `examples/react-next` にあります。

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
# あとがき
HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンジニア | 株式会社HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

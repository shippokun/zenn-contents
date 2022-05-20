---
title: "Frontend Talk（2022-05-20）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているしっぽくんです。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

今回は公開第 2 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# topic

## Storybook v6.5.0 Release！

https://github.com/storybookjs/storybook/releases/tag/v6.5.0

特に気になるトピックについていくつか話しました。

- Webpack 5 lazy compilation
  - これは[前回のフロントエンドトーク](https://zenn.dev/hrbrain/articles/frontend-talk-20220513)でお話しました。
- React v18 で新規追加された root API 対応
  - これによって正式に React v18 対応がされました。
- React 以外の主要なフレームワークに CSF(Component Story Format)3.0 対応
- ReactRouter v6 の依存がなくなった
  - v6.4 では `@storybook/router` が ReactRouter v6 に依存していたため v5 を利用しているプロダクトでは v6.4 へのアップデートが出来ない状態でした。
  - https://github.com/storybookjs/storybook/issues/16837

まだリリースしたばかりで、現時点（v6.5.3）でいくつかの不具合報告があります。

- `@mdx-js/react` のインストールが必須になっている
  - 依存関係に追加すれば問題ないですが、[Issue](https://github.com/storybookjs/storybook/issues/18266)でインストールの必要性について問われています。
  - 最終的には必須ではなくなる可能性もありそうです。
- storybook のビルドに失敗する
  - https://github.com/storybookjs/storybook/issues/18276

まだしばらくアップデートは待ちになりそうです。

## State of CSS 2022

https://www.youtube.com/watch?v=Xy9ZXRRgpLk
https://web.dev/state-of-css-2022/

Google IO 2022 の中で CSS の基調講演がありました。
2022 年中に実装されるであろう CSS 機能や、最近実装された機能の紹介。
かなり数があったので今回のトークでは数を絞って話をしました。

- `subgrid`
  - `diplay: grid` を入れ子にする時、メインのグリッドを基準にして整列できるようになります。
  - 今までは `display: grid` を入れ子にすると一番親のグリッドに追従できず、全て個別で動いてしまう問題がありました。
  - 仕組みとしては複雑ですが、DevTools も `subgrid` に対応し `flex` と同様に確認することが可能になるそうです。
  - 今後 `grid` を使った複雑なレイアウトができるようになりそうです。
  - ブラウザの対応状況は stable では firefox のみですが、experimental ではモダンブラウザ全て対応しているので、おそらくもうすぐ来そうですね。
- `@container queries`
  - これまでは `media query` を使ってブレイクポイントを width を基準に切り替えていました。
  - この `@container queries` は任意のポイントに container をつけることで、そこに基準を設けることができ、その任意のポイントのサイズによって有効にする CSS を切り替えが可能になります。
  - ブラウザの対応状況は全て experimental なので、利用できるのはまだまだ先になりそうです。

## State of frontend 2022

https://tsh.io/state-of-frontend/

人気のあるフレームワークやライブラリを前年と比べてどう変わったのかを見ていきました。
特に面白かった点として、将来学びたいものに v1 が去年の 12 月にリリースした `Remix` がランクインし、嫌いになったライブラリ 1 位 `Redux` がランクインしていました。
とはいえ候補に出ているライブラリは目新しいものがなく、指標になるかどうかは怪しいです。

# news

## React のメンテナーの dan さんが useEffect のドキュメントを書いているツイート

https://twitter.com/dan_abramov/status/1526584624159555584

useEffect について去年の 8 月から書き込もうとトライをしたみたいですが、適切な説明が全て揃っていないとして断念したとのこと。
ツイートには useEffect について知りたいことをヒアリングしているみたいなので、知りたいケースがあれば聞いてみるとドキュメントに載るかも？
ドキュメントの発表が楽しみですね。

## Math support in Markdown

https://github.blog/2022-05-19-math-support-in-markdown/

GitHub の markdown で数式がかけるようになりました。
機械学習系のライブラリでは活用できそうです。

合わせて同じタイミングでリリースされた機能の中に Issue の Close 方法が増えていました。
https://github.blog/changelog/2022-05-19-the-new-github-issues-may-19th-update/

重複した場合や、対応しなくなった場合に利用することを想定しています。
GitHub Projects の beta 版ではタスク管理ができるように開発が進んでいますが、この機能は Projects の開発に関係していそうです。

# discussion

## httpie という HTTPClient が便利らしい。皆さんは api client は何を使っていますか？

https://httpie.io/docs/cli/main-features

curl と比べてユーザーフレンドリーな api client の紹介。読み方は「aitch-tee-tee-pie（エイチティティパイ）」
あるメンバーは「全て VSCode で完結したいので、VSCode の拡張 Thunder Client を使っています」とのこと。
Postman や curl などいくつかの client は出てきましたが、httpie 利用ユーザーはいませんでした。
実装は Python、Star 数も 54k と伸びているプロダクト。

https://github.com/httpie/httpie

curl と使い方は似ているので npm と yarn みたいに脳内で置換するのが大変そうです。

<!-- textlint-disable -->

# あとがき

HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンジニア | 株式会社 HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)

<!-- textlint-enable -->

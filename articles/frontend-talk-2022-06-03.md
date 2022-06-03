---
title: "Frontend Talk（2022-06-03）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているしっぽくんです。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

今回は公開第 4 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# news

## React Spectrum May 31, 2022 Release

https://react-spectrum.adobe.com/releases/2022-05-27.html

Adobe のデザインシステムである React Spectrum の リリースノートが更新されました。
今回注目したポイントとして React v18 の対応 PR の内容です。

https://github.com/adobe/react-spectrum/pull/3108

各種ライブラリのアップデートしつつ、完全に移行できない部分は自作する[^1]など細かな努力が見えます。
React18 では Suspense やその他魅力的なアップデートも多くマイグレーション対応したいものの、必要な周辺ライブラリのアップデート作業が多いのでできるところから対応したいですね。

[^1]: @testing-library/react-hooks から @react-spectrum/test-util に[差し替えて](https://github.com/adobe/react-spectrum/blob/b5db74d40c139192c709193ee976dfc945d505b6/packages/%40react-aria/actiongroup/test/useActionGroup.test.js#L14)移行しています。

## Release v7.30.0 · jsx-eslint/eslint-plugin-react

https://github.com/jsx-eslint/eslint-plugin-react/releases/tag/v7.30.0

eslint-plugin-react の v7.30.0 がリリースされました。
このリリースでは新しいオプションが追加されていて、特に気になったオプションを紹介してもらいました。

https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.30.0/docs/rules/jsx-no-leaked-render.md

> In React, you might end up rendering unexpected values like 0 or NaN. In React Native, your render method will crash if you render 0, '', or NaN:

0 や NaN ではそのままレンダリングしてしまうため、lint で指摘してくれるルールです。
この仕様は知らず思わずその場で確認しました。

https://codesandbox.io/embed/rough-haze-yxixpb?fontsize=14&hidenavigation=1&theme=dark

実際に 0 や NaN がレンダリングされているのが確認できました。
意外と知らない仕様をツールで教えてくれるのはとてもありがたいですね。

# know-how

## Automate accessibility tests with Storybook

https://storybook.js.org/blog/automate-accessibility-tests-with-storybook/

先週お話した[https://zenn.dev/hrbrain/articles/frontend-talk-2022-05-27#storybook-v6.5-%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%83%96%E3%83%AD%E3%82%B0%E3%81%8C%E5%85%AC%E9%96%8B]Storybook v6.5 で追加された test-runner を使った a11y 自動テストについての公式ブログ記事。

[Addon](https://storybook.js.org/addons/@storybook/addon-a11y) 自体は前から存在しており、Storybook のパネルに Axe を実行した結果を視覚的に確認ができます。
今回の test-runner の登場により CI 上でチェックできるため、都度 Storybook を直接確認しにいく必要もなく、また気付かぬうちに壊れている状態になることも事前に防ぐことができます。

違反内容を Json や CLI 上で表示したり、アクセシビリティツリーのスナップショットを作成するなど色々とできることもあり、より a11y に配慮したコードを書くための補助ツールとして利用ができそうです。

# discussion

## LT で喋るテーマに悩んでいる

弊社社員の中で外部の LT に参加する人がいて、その方からの切実な相談事が持ち込まれました。

実際にどんなテーマがいいのか、こういうのはどう？みたいにディスカッションをしました。
ここでは詳細は省きますが、気になる方はぜひ実際の LT イベントの参加してみてください。

https://rakus.connpass.com/event/245664/
No.3 の purpleeeee さんの枠です。

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
# あとがき
HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンジニア | 株式会社HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

---
title: "Frontend Talk（2022-07-08）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているしっぽくんです。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

今回は公開第 8 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# news

## Vue2.7 Release

https://blog.vuejs.org/posts/vue-2-7-naruto.html

Vue2 系最後のマイナーバージョンである 2.7 がリリースしました。
Vue3 系からいくつかの機能がバックポートされました。

- Composition API
  - Composition API がサポート対象になるため、https://github.com/vuejs/composition-api をインポートしなくても良くなります。
- SFC `<script setup>`
  - Composition API がサポートされたことで利用可能に
- SFC CSS v-bind

またその他にも追加サポートされる API がいくつかあります。
合わせてアップデートするためのガイドと、周辺ツール（Vite, Volar）の対応方法もブログに書かれています。

この 2.7 のリリースをもって 2 系は 18 ヶ月間の LTS に入ります。つまり 3 系へのアップグレードはマストになりつつある状況に変わってきました。
LTS の間に徐々にマイグレーションの準備を進めておく必要がありそうですね。

## July 7th 2022 Security Releases

https://nodejs.org/en/blog/vulnerability/july-2022-security-releases/

Node.js のセキュリティリリースがされました。
下記のバージョンが提供されているので、アップデート対応をしましょう。

- v14.20.0
- v16.16.0
- v18.5.0

7/8 現在、DockerImage には最新のバージョンは見つかりませんが、この[PR](https://github.com/docker-library/official-images/pull/12761)がマージされれば公開されるので DockerImage を利用している方はもうしばらく待ちましょう。

## Announcing TypeScript 4.8 Beta

https://devblogs.microsoft.com/typescript/announcing-typescript-4-8-beta/

少し前ですが、2022/6/21 に TS4.8 Beta がリリースされました。
フロントエンドトークではリリース内容について少しずつ触れていきます。

### Improved Intersection Reduction, Union Compatibility, and Narrowing

こちらの内容については uhyo さんの記事がとても丁寧に解説されているので、こちらも合わせて参照しました。
https://zenn.dev/uhyo/articles/typescript-4-8-type-narrowing

### Improved Inference for infer Types in Template String Types

TS4.7 で `extends` のあとに `infer` が記述が可能になりましたが、 `Template String Type` には利用できませんでした。
機能追加する際の利用用途に対する[コメント](https://github.com/microsoft/TypeScript/pull/48112#issuecomment-1058735884)に、「Probably anyone doing tuple type or template literal type manipulation」と述べられています。このコメントと同タイミングで今回の機能追加の PR を出されているので、リリースのタイミング関係で個別のリリースになったかと思われます。

```ts
// https://github.com/microsoft/TypeScript/pull/48094
// helper that enforces a constraint on an `infer T` type
type Is<T extends U, U> = T;

// today
type T0 = "100" extends `${Is<infer T, number>}` ? T : never; // number
type T1 = "100" extends `${Is<infer T, bigint>}` ? T : never; // bigint
type T2 = "true" extends `${Is<infer T, boolean>}` ? T : never; // boolean

// after this change
type T0 = "100" extends `${Is<infer T, number>}` ? T : never; // 100
type T1 = "100" extends `${Is<infer T, bigint>}` ? T : never; // 100n
type T2 = "true" extends `${Is<infer T, boolean>}` ? T : never; // true
```

注意したいのが、この機能追加では `infer T` の制約を確立するための機能ではなく、例の `Is` のようなヘルパー型が必要になる点です。

# know-how

## The React core team finally have opinions about CSS

https://dev.to/hypeddev/the-react-core-team-finally-have-opinions-about-css-16f0

https://www.youtube.com/watch?v=jWafEXS7EE0&t=1276s

上記の動画で React Core チームの Dan さんが CSS への意見について述べていることに対するブログ記事の紹介です。

[引用元](https://dev.to/hypeddev/the-react-core-team-finally-have-opinions-about-css-16f0#:~:text=%E2%80%9CWe%20used%20to,are%20really%20expensive.%E2%80%9D)

> We used to be very unopinionated about styling. We’re getting a few more opinions now because there are a few more constraints like streaming server rendering, server components. We start caring a bit more about performance. Overall we’re thinking for dynamic stuff just use inline styles. For things that don’t change use something that compiles to CSS so that it doesn’t have extra runtime costs. A lot of these approaches with runtimes are really expensive.

ランタイムで CSS を生成するようなものではなく、CSS Modules やビルド時に CSS へ吐き出してくれるものがいいのではないか？と述べています。

`Linaria` や `Vanilla Extract`, `Tailwind CSS` などが Dan さんが述べているものに該当すると記事中では書かれています。

インラインで書いた方が、CSS ファイルの読み込みをスキップさせてパースの邪魔をしないためパフォーマンスの観点ではインラインで書くのが望ましいです。
しかしインラインで書けない場合は CSS ファイルとして書き出して、キャッシュが可能な link タグに出した方がよいと考えられます。

# discussion

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
# あとがき
HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンドエンジニア | 株式会社HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

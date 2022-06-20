---
title: "Frontend Talk（2022-06-17）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているしっぽくんです。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

今回は公開第 6 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# news

## Announcing TypeScript 4.7

https://devblogs.microsoft.com/typescript/announcing-typescript-4-7

今週は先週に続き、TS4.7 の情報について深掘りをしていきました。

### ECMAScript Module Support in Node.js

- 出来るようになったこと
  - tsconfig の `compilerOptions` の `module` に `node16` と `nodenext` が設定できるようになった
  - `.ts` → `.js`, `.cts` → `.cjs`, `.mts` → `.mjs` へそれぞれトランスパイルできるようになった

`CommonJS modules` と `ECMAScript modules（以降、ES modules）` について少し前提を整理してみました。

- 昨今の JS 界隈では上記の 2 つの modules 解釈が混在している状態。
- `.cjs` は `CommonJS modules` として、 `.mjs` は `ES modules` として解釈される。
- Node14 から[デフォルト](https://nodejs.org/dist./v14.10.0/docs/api/esm.html#esm_enabling)で `ES modules` をサポートするようになった。
  - Node12 は[デフォルト](https://nodejs.org/docs/latest-v12.x/api/esm.html#esm_enabling)で `CommonJS modules` をサポート。
- Node.js は `CJS-interop` という機能を持っている。
  - `CJS-interop` : `CommonJS modules` と `ES modules` を相互互換にする機能
  - この機能の仕様に `Babel` と `TypeScript` は準拠していなかった。
    - そのため、トランスパイルした後のファイルが別のものになっていたので、Node.js の `CJS-interop` が使えなかった。
  - 今回 TS に追加された `compilerOptions.module` へ `node16` or `nodenext` を設定することで、それぞれが Node.js の `CJS-interop` が解釈できる各種 JS に出力してくれるようになった。
- ここで問題になるのが、 `.js` と `.ts` は `CommonJS modules` か `ES modules` なのかがわからないこと。
  - これの解決方法として `package.json` の `exports` に記述した内容でどちらの modules なのかを示すことができるようになった。
  - 合わせて `CommonJS modules` と `ES modules` それぞれの型定義ファイルも出力できるようになりました。

### extends Constraints on infer Type Variables

前回は `infer` の後に `extends` が使えるようになった程度のお話でしたが、今回はなぜ追加されたのか、詳細な仕様についてお話しました。

https://github.com/microsoft/TypeScript/pull/48112

```ts
type Before<T> =
    T extends [infer S, ...unknown[]]
        ? S extends string ? S : never
        : never;

type BeforeResult = Before<['this', number, number]>;

type After<T> =
    T extends [infer S extends string, ...unknown[]]
        ? S
        : never;

type AfterResult = After<['this', number, string]>
```

この構文を提案した方が、この構文を入れることでこれらの場所で活用ができる！といくつかのプロダクトの該当箇所を提示しました。
https://github.com/microsoft/TypeScript/pull/48112#issuecomment-1058735884

この構文で気になったのが、 `infer U extends hoge` の後に三項演算子が記述できるのかどうかです。
提案時点ではいくつかの解釈方法がありました。
https://github.com/microsoft/TypeScript/pull/48112#issuecomment-1061104797

結果としては `extends` の仕様を担保するために、 `infer U extends hoge ?` と書いても構文としては解釈されますが、型としては機能しないものとなります。

いくつか例文がありますが、解釈されないことを示されています。
https://github.com/microsoft/TypeScript/pull/48112#issuecomment-1062494194

```ts
// ok, parsed as `infer..extends` (precedence wouldn't have parsed the `?` as part of a type operator)
type X4<T> = T extends keyof infer U extends number ? 1 : 0;
```

構文エラーは出ないため、予期せぬ解釈となってしまうことが予想されますが、今後のアップデートで変わっていくのかは要チェックですね。

## atom の開発者が rust でエディタを作ってるらしい

https://github.blog/2022-06-08-sunsetting-atom/
https://news.livedoor.com/article/detail/22307147/

GitHub がテキストエディタ「Atom」の開発停止を宣言しました。
記事の中で開発停止する経緯を述べています。

記事中に Atom のオリジナル開発者だった Nathan Sobo 氏が Rust で書かれた「Zed」というエディタを開発していることについても触れています。
https://zed.dev/

まだドキュメントの公開までしかされていませんが、従来のものより優れたパフォーマンスを持つかもしれないエディタの登場は我々エンジニアにとっては嬉しい事なので、要注目です。
リリースされたらまたフロントエンドトークで話題にしたいですね。

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
# あとがき
HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンドエンジニア | 株式会社HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

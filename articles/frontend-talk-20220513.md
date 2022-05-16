---
title: "Frontend Talk (2022-05-13)"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontendTalk"]
published: true
---

こんにちは。株式会社 HRBrain フロントエンドエンジニアのしっぽくんです。

私たち HRBrain では週に一度、フロントエンドトークという「1 週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で 30 分程度開催しています。  
本記事はその際に出たネタをまとめたものになります。

今回は公開第 1 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontendtalk)。

# topic

## React の公式的には zero runtime もしくは CSS modules を推奨してる？という話

https://github.com/reactwg/react-18/discussions/110

React の開発チームのセバスチャンさんがだしてる CSS in JS ライブラリのアップグレードガイド。 特に気になるのが `Feature` 見出しに書いてある内容。

> While this technique for generating CSS is popular today, we've found that it has a number of problems that we'd like to avoid. Therefore we don't have plans for adding any solutions upstream to handle this in React. For the time being, we expect this to have to be handled by third-party libraries such as in this guide.
> Our preferred solution is to use <link rel="stylesheet"> for statically extracted styles and plain inline styles for dynamic values. E.g. <div style={{...}}>. You could however build a CSS-in-JS library that extracts static rules into external files using a compiler. That's what we use at Facebook.

CSS-in-JS ライブラリでもコンパイラを使用して外部ファイルに抽出が可能で、それが Facebook で利用しているライブラリだよ、と書いてあります。
Stylex のことを指しているのだと思われますが、現時点（2022/05/13）で公開は確認できていません。

https://www.infoq.com/jp/news/2021/11/facebook-css-js-stylex/

この discussion の内容は主にライブラリ開発者に向けてのものなので、具体的に私たちプロダクト開発者が何かしらアクションをとることはなさそうですが、こういった内容をキャッチアップしていくことで今後の技術選定に活かしていきたいですね。

## Storybook Performance：Vite vs Webpack

https://storybook.js.org/blog/storybook-performance-from-webpack-to-vite/

https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md#650-alpha40-february-19-2022
6.5 で lazy compilation が追加されたので webpack でのパフォーマンスが向上しました。  
この記事は lazy compilation が追加された webpack と vite とのパフォーマンスの比較記事です。

webpack についての詳細な内容
https://storybook.js.org/blog/storybook-lazy-compilation-for-webpack/

実際に使う場合は下記のような設定にするとできます。

```js
// .storybook/main.js
module.exports = {
  features: {
    storyStoreV7: true,
  },
  core: {
    builder: {
      name: "webpack5",
      options: {
        lazyCompilation: true,
        fsCache: true,
      },
    },
  },
};
```

## New in Chrome 101

https://developer.chrome.com/blog/new-in-chrome-101/

Chrome の 101 がリリースされました。101 の気になる新機能について深掘り。

### hwd（Hue-Whiteness-Backness）での色の指定が可能に

```css
h1 {
  color: hwb(194 0% 0% / 0.5); /* #00c3ff with 50% opacity */
}
```

色相、白さ、黒さで色を指定する。より人間の色に合わせた表記とのこと。opacity もオプションで指定ができます。
Firefox や Safari でもサポートされていて、モダンブラウザであれば利用ができます。

### Priority Hints の追加。<img>で fetchpriority が指定できるようになった

img の読み込みの優先度が決められるようになりました。 `fetchpriority="high"` のものが優先的に読み込みされて、画像読み込みの最適化に利用できそうです。  
どの程度最適化に影響あるのかは[こちら](https://web.dev/priority-hints/)を参照。

# news

## Nrwl is taking over stewardship of Lerna

https://github.com/lerna/lerna/issues/3121

monorepo 管理ツールである Lerna の管理を Nrwl が引き継ぎました。
３月にメンテナの inca さんが Lerna の利用を非推奨にすると発表していました。社内でもプロダクトに利用していて移行検討をしていましたが見送りしても良さそうですね。
https://github.com/lerna/lerna/pull/3092

# discussion

## hooks 時代のローディング状態の正しい管理仕方が未だわからない

Suspense では lazy での取り扱いはできるけれども、データフェッチングなどに関してはまだ stable ではないため hooks でのベストプラクティスが知りたいという相談内容。

https://ja.reactjs.org/docs/react-api.html#reactsuspense

> 現時点ではコンポーネントの遅延ローディングが <React.Suspense> がサポートする唯一のユースケースです

結論としてはこの問題を解決するために Suspense が登場した、という認識になり「stable が来るまで従来通りの書き方しかないね」となりました。

```tsx
export default function App() {
  const res = useQuery("key", async () => {
    await sleep();
    return { hello: "world" };
  });

  // hooksはif分より上でしか使えない
  const memo = useMemo(() => {
    return res.data;
  }, [res.data]);

  if (res.isLoading) {
    return <div>loading...</div>;
  }

  if (res.isError) {
    return <div>error</div>;
  }

  if (res.isSuccess) {
    // 本当はここでuseMemoを使いたい
    // const memo = useMemo(() => {
    //   return res.data;
    // }, [res.data]);
    return (
      <>
        <div>res: {res.data.hello}</div>
        <div>memo: {memo?.hello}</div>
      </>
    );
  }

  throw new Error("invalid state");
}
```

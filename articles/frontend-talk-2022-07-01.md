---
title: "Frontend Talk（2022-07-01）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているしっぽくんです。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

先週はお休みでしたが、引き続き更新していきます。

今回は公開第 7 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# news

## New in Chrome 103

https://developer.chrome.com/blog/new-in-chrome-103/

### HTTP 103 status code 103 - early hints

HTTP のステータスコードに 103 が登場しました。
サーバーへリクエストする際に、ページ作成のレスポンスに時間がかかる場合にサーバー側から先に 103 のレスポンスを返すことができるようになりました。
これによりクライアント側で先にリソース(CSS, JS など)のロード対応ができるようになるため、全体的なページロードを早くできる可能性があります。

### Local Font Access API

ローカルにインストールされているフォントを利用できる API が登場しました。
利用するためには 2 段階の処理が必要になります。

```js
// https://developer.chrome.com/blog/new-in-chrome-103/#local-fonts
// Step1: ローカルへのアクセス許可取得
try {
  const status = await navigator.permissions.request({
    name: "local-fonts",
  });
  if (status.state !== "granted") {
    throw new Error("No Permission.");
  }
} catch (err) {
  if (err.name !== "TypeError") {
    throw err;
  }
}

// Step2: queryLocalFonts() でローカルのフォントを取得
const opts = {};
const pickedFonts = await self.queryLocalFonts();
for (const fontData of pickedFonts) {
  console.log(fontData.postscriptName);
  console.log(fontData.fullName);
  console.log(fontData.family);
  console.log(fontData.style);
}
```

### Easier Timeouts with AbortSignal.timeout()

これまで fetch を中断させたい場合は `AbortController()` と `setTimeout` を組み合わせていましたが、それを今回の `AbortSignal.timeout()` だけで実現できるようになりました。
この機能はすでに Firefox と Safari で利用できるため、今回の Chrome のサポートによってモダンブラウザでの利用が可能になりそうです。

```js
// https://developer.chrome.com/blog/new-in-chrome-103/#abort-timeout
// Before
const controller = new AbortController();
const signal = controller.signal;
const resp = fetch(url, { signal });

setTimeout(() => {
  // abort the fetch after 6 seconds
  controller.abort();
}, 6000);

// After
const signal = AbortSignal.timeout(6000);
const resp = fetch(url, { signal });
```

## ES2022 release

いくつかある機能の中で、特に気になる機能について深掘りをしました。

### private methods

https://github.com/tc39/proposal-class-fields/blob/main/PRIVATE_SYNTAX_FAQ.md

今まで TS には `private methoods` がありましたが、 JS へコンパイルする際には public へ変換されていました。
今回追加された `#` を頭に用意することで JS でもフィールドやメソッドに private の概念を持ち込むことができます。

なぜ構文として `#` が利用されたのかは消去法によるものらしく、候補対象には下記のものが挙げられました。

- `@`
  - デコレーターで利用されているため NG
- `_`
  - 慣習で利用しない変数に用いるため NG
- `%`, `&`, `?`, `^`
  - これらは演算子として利用されるため NG

実際のアプリケーション開発では型によるガードがあるため、ランタイム上で外部からのアクセスを想定しないなら活用はあまりなさそうですね。

### .at

https://github.com/tc39/proposal-relative-indexing-method

`Array.at(-1)` で配列の最後の要素を取り出すことができるようになりました。
`-1` によって配列の最後の要素を取得する概念は JS にはなく、Python などの別言語の概念が持ち込まれた形です。
ただし Python と違い、JS では `[]` で配列以外にオブジェクトなどからも取得できるため、 `.at` の関数が用意された形に落ち着きました。

実装を見ると渡した値が配列の長さを超える場合は undefined を返す仕様になっています。
これが TS で実装されると、TS のオプション noUncheckedIndexedAccess を true にしてなくても undefined のチェックできる可能性がありそうです。
（noUncheckedIndexedAccess は true にした方がいいので、実用的な意見ではないですが）

```ts
// https://github.com/tc39/proposal-relative-indexing-method#polyfill
function at(n) {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0;
  // Allow negative indexing from the end
  if (n < 0) n += this.length;
  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= this.length) return undefined;
  // Otherwise, this is just normal property access
  return this[n];
}

const TypedArray = Reflect.getPrototypeOf(Int8Array);
for (const C of [Array, String, TypedArray]) {
  Object.defineProperty(C.prototype, "at", {
    value: at,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}
```

### Error.cause

https://github.com/tc39/proposal-error-cause

error に `.cause` が追加されて、明示的にエラー内容を入れることでそのエラーを catch した先で参照できるようになりました。

```ts
// https://github.com/tc39/proposal-error-cause#chaining-errors
async function doJob() {
  const rawResource = await fetch("//domain/resource-a").catch((err) => {
    throw new Error("Download raw resource failed", { cause: err });
  });
  const jobResult = doComputationalHeavyJob(rawResource);
  await fetch("//domain/upload", { method: "POST", body: jobResult }).catch(
    (err) => {
      throw new Error("Upload job result failed", { cause: err });
    }
  );
}

try {
  await doJob();
} catch (e) {
  console.log(e);
  console.log("Caused by", e.cause);
}
// Error: Upload job result failed
// Caused by TypeError: Failed to fetch
```

### hasOwn

https://github.com/tc39/proposal-accessible-object-hasownproperty

`Object.prototype.hasOwnProperty()` を call する際にそのオブジェクトが既に `hasOwnProperty` というプロパティを持っていた場合に上書きされてしまったり、そもそも `.prototype` が利用できないパターンがあるため追加されました。

```ts
// https://github.com/tc39/proposal-accessible-object-hasownproperty#motivation
// Before
let hasOwnProperty = Object.prototype.hasOwnProperty;

if (hasOwnProperty.call(object, "foo")) {
  console.log("has property foo");
}

// After
if (Object.hasOwn(object, "foo")) {
  console.log("has property foo");
}
```

## V8 がブログ更新を停止

https://v8.dev/blog/discontinuing-release-posts

Google のオープンソースで JavaScript および WebAssembly エンジンである V8 のブログ投稿が停止しました。
これまで新しいリリースブランチごとに投稿がありましたが、この最後の更新となる投稿内では、情報源がいくつかあることを紹介し、以降は紹介した記事を参照するように書かれています。

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
# あとがき
HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンドエンジニア | 株式会社HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

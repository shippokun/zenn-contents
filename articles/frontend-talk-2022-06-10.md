---
title: "Frontend Talk（2022-06-10）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているしっぽくんです。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

今回は公開第 5 回目です。過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# news

## Safari 16 new feature

https://webkit.org/blog/12824/news-from-wwdc-webkit-features-in-safari-16-beta/

Safari 16 beta が公開されました。
過去のフロントエンドトークでも議題にあげた「Container Query」「Subgrid」がついに Safari に実装されます。

詳細は以前の[フロントエンドトーク](https://zenn.dev/hrbrain/articles/frontend-talk-2022-05-20)で書いているので気になる方はそちらの記事を参照してください。

また Chrome と同様に `Grid Inspector` も導入されるため、複雑な入子になったレイアウトに関しては今後 `Grid Layout` による実装が主流になる可能性があります。

### WebPush の登場

Chrome に実装されている WebPush が Safari にも登場します。
この WebPush には `Apple Push Notification` が使われているため、ネイティブと Web で同じ通知サービスを利用でき、さらにこのサービス自体は AppleDevelopmentProgram のメンバーに入る必要はない、という点も素晴らしいですね。

## Component Encylopedia

UI コンポーネントの一覧を Storybook が提供サービスを始めました。
https://storybook.js.org/showcase

使っているフレームワークや、CSS のスタイルなどケースごとの検索も可能でユースケースによって適切な Story の検索ができます。

Storybook としては優れたコンポーネントライブラリを広く普及することで、知識のギャップを埋める手助けする目的があり、そのアプローチとして今回のサービスをリリースしたみたいです。

> At Storybook, we believe the world is moving toward Component-driven UIs
> Our goal is to accelerate the industry's shift to components by helping folks learn how to build them in the first place.

`shift to components` をデザインシステムを形成する方法と捉えると、Storybook はデザインシステムを形成する 1 つのツールとしての立場を確立しつつありそうですね。

## Announcing TypeScript 4.7

https://devblogs.microsoft.com/typescript/announcing-typescript-4-7

先月の 24 日に公開された記事ですが、理解が難しいトピックもあるので少しずつ触れて消化していきます。
今回は `Optional Variance Annotations for Type Parameters` と `extends Constraints on infer Type Variables` の 2 つのみでしたが、次回以降は他のトピックについても触れていきます。

### Optional Variance Annotations for Type Parameters

`in` と `out` の修飾子が追加されます。
この 2 つの修飾子について理解するにはまず TypeScript における `covariant` と `contravariant` を調べていきます。

https://typescriptbook.jp/reference/values-types-variables/array/array-type-is-covariant

TypeScriptBook に共変性(convariance)についての説明があるので、そこから引用します。

> 型の世界の話で、共変とはその型自身、もしくは、その部分型(subtype)が代入できることを言います。たとえば、Animal 型と Dog 型の 2 つの型があるとします。Dog は Animal の部分型とします。共変であれば、Animal 型の変数には Animal 自身とその部分型の Dog が代入できます。
> 一方で共変では、Dog 型の変数には、Dog のスーパータイプである Animal は代入できません。

```ts
type Animal = { isAnimal: boolean };
type Dog = { isAnimal: boolean; isDog: boolean };
let pochi: Dog = { isAnimal: true, isDog: true };
let animal: Animal = pochi; // 代入OK

let animal: Animal = { isAnimal: true };
let pochi: Dog = animal; // 代入NG
```

ここでは配列について述べていますが、今回追加される `Optional Variance Annotations for Type Parameters` についても同様のことが言えます。

また合わせて `variance` についてとてもわかりやすく説明されている記事があるので、こちらも合わせて紹介します。
https://numb86-tech.hatenablog.com/entry/2020/07/04/095737

`out: 共変性（covariance）`, `in: 反変性（contravariance）` を念頭に置きつつ考えていきます。

Dog 型に対して Animal 型を取り出す(`out`）ことは可能ですが、Dog 型に対して Animal 型を代入(`in`)はできません。
しかし全く同じ型であればどちらも行えます。
この法則を利用し表現できるのが、公式で紹介されている `State<in out T>` です。

```ts
interface State<in out T> {
    get: () => T;
    set: (value: T) => vois;
}
```

今回の修飾子は読み手にとって型パラメータがどのように利用されているのかを実装を見ずとも判断できるのが大きなポイントです。

より厳密に型判定が可能になり、より高速でかつ制度の良い判定を受けることが可能です。

```ts
// ↓ Foo<in out T> と表現することで foo1 = foo2 が Error になる
type Foo<T> = {
  x: T;
  f: Bar<T>;
};

type Bar<U> = (x: Baz<U[]>) => void;

type Baz<V> = {
  value: Foo<V[]>;
};

declare let foo1: Foo<unknown>;
declare let foo2: Foo<string>;

foo1 = foo2; // Should be an error but isn't ❌
foo2 = foo1; // Error - correct ✅
```

公式ではより深い再起的な型を扱う場合やライブラリ作成者に、利用者により良いコーディング体験を提供できると書いてあります。
実際のプロダクトコードでの利用場面は話し合うことができませんでしたが、「こんなケースで使えるよ！」などご意見ありましたらコメントにてご教授いただけると幸いです。

### extends Constraints on infer Type Variables

`infer` の後に `extends` の記述が可能になリます。

```ts
// 今まで
type FirstIfString<T> =
    T extends [infer S, ...unknown[]]
        ? S extends string ? S : never
        : never;

// TS 4.7
type FirstIfString<T> =
    T extends [infer S extends string, ...unknown[]]
        ? S
        : never;
```

これによってネストしていた推論を簡潔に書くことができます。

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
# あとがき
HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンドエンジニア | 株式会社HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

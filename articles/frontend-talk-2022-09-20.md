---
title: "Frontend Talk（2022-09-30）"
emoji: "🧠"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["HRBrainFrontend"]
published: true
---

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
こんにちは。株式会社HRBrainでフロントエンドエンジニアをしているあべです。
お久しぶりです！公開が追いつかず時間が空いてしまいましたが、投稿を再開していこうとおもいます。

私たち HRBrain では週に1度30分、フロントエンドトークという「1週間の間に発見したフロントエンドに関するネタを共有もしくは相談する会」を社内で開催しています。  

過去の記事は[こちら](https://zenn.dev/topics/hrbrainfrontend)。
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

# news

## memlab がオープンソースで公開

https://www.publickey1.jp/blog/22/javascriptmemlab.html

meta がメモリリークを検出するツール「memlab」を公開しました。
ヘッドレスブラウザを動かして、SPA で画面遷移しながらメモリリークが発生していないか検知できるとのこと。
Puppeteer の記法でテストシナリオを書けるので、使いやすそうです！
怪しい箇所にシナリオを書いておき、定期的に実行して監視できそうですね。
HRBrain でも、フロントエンドアプリの動作が重いときなどの調査に役立ちそうです。

## 日本標準時の歴史について

https://www.m3tech.blog/entry/timezone-091859

弊社エンジニアが、日付を扱う部分でテストコードを走らせていたときのこと。
何度やっても時間がずれてしまい、調べてみたらタイムゾーンが GMT+0918 となっていた・・・
日本であれば、GMT+0900 が正しいのに、これはなぜ？
ということで、タイムゾーンと日本標準時について調べてみました。

詳しくは上記エムスリーさんのブログに詳しく書かれているのですが、
日本標準時は 1884 年に開催された国際子午線会議で決定されました。
会議の中で、兵庫県明石市を通る東経 135 度が日本の標準子午線となり、「+09:00:00」が日本標準時と決まります。
4 年の移行期間を経て、標準時は 1888 年に施行されました。

1888 年以前は、都市ごとにそれぞれ地方時があったそうで、「GMT+0918」は東京の地方時なのだそうです。
テストに使ったデータは 1888 年以前のものだったので、時差が GMT+0918 と解釈されてしまっていたのですね。

社内的には謎が解けて、めでたしめでたし、だったのですが、
実は東京の地方時が「GMT+0918」なのかについては諸説あり、現在も議論が続いているとのことです。
（ここでは詳しく書き切れませんが、「天守台」と「天文台」をめぐるエピソードなど、興味深かったです。）

日付を扱う部分のテストをするときには、うっかり「1234 年 5 月 6 日 7 時 8 分 9 秒」などと書かないようにしましょうね！
エムスリーさん、興味深いブログ記事をありがとうございました。勉強になりました！

## CSS Modules の歴史

https://developer.hatenastaff.com/entry/2022/09/01/093000

CSS Modules の歴史について書かれています。
今となっては CSS Modules は当たり前となり、
CSS のバンドルは自動化されることも多いので特に意識もせず使っている方もいるかもしれませんが、
もともとは CSS のプロパティ名の衝突を避けるために考え出されたものでした。

CSS Modules 以前は、BEM や FLOCCS といった CSS の命名を規則化するためのルールが考えだされ、
フロントエンドエンジニアはそのルールに則ってプロパティ名を決めないといけなかったのでした。
github のプルリクエストで、CSS プロパティ名が規則に合っているかについて熱い議論をした経験があるエンジニアにとっては
なつかしいお話ですね。

今となっては普通となってしまった技術を深掘りし、過去にさかのぼってその技術が成立した背景を学ぶことも
エンジニアにとっては必要なことだなと思いました。

## New in Safari 16

https://webkit.org/blog/13152/webkit-features-in-safari-16-0/

- Container Query
- Subgrid
  が Safari で使えるようになります！
  Container Query については Chrome(Edge)でサポートされているので、Firefox のサポート待ち。
  Subgrid については、Firefox ではサポートされており、Chrome のサポート待ちです。

## New in Chrome 106

https://developer.chrome.com/blog/new-in-chrome-106/

- Intl.NumberFormat v3 API
  Intl API が v3 となり、新機能が追加されました。
  とくに、 `Intl.NumberFormat` に追加された `minimumFractionDigits` と `roundingIncrement` のオプションを使うと、小数点つきの数を任意の桁数で丸めることができて便利です。

```ts
const opts = {
  style: "percent",
  minimumFractionDigits: 2,
  roundingIncrement: 5,
};
const nf = new Intl.NumberFormat("en-US", opts);
nf.format(0.428267);
// "42.85%" と出力される
```

- CSS の単位として ic をサポート
  ic は、漢字の「水」の送り幅（横書きの場合は横幅）を基準とした単位です。
  例えば、あるテキストの中で、「水」が 10px で表示されていれば 1ic = 10px となります。

```css
.hoge {
  width: 8ic;
}
```

と指定すれば、 `.hoge` クラスがついたテキストエリアの横幅は、全角文字 8 文字分の長さとして指定できるようになります。

※基準に「水」が選ばれたのは、CJK フォントに必ず存在する文字だからとのことでした。

<!-- prettier-ignore-start -->
<!-- textlint-disable -->
# あとがき
すっかり秋めいてきて、涼しくなってきましたね！
もう10月になってしまった！とびっくりしているのですが、10月はAdobe MAXがあるので個人的に楽しみです。

HRBrain では毎週このような内容で会をしています。他にも様々なイベントごとを毎週実施しているので気になった方は下記のリンクをクリック！

[フロントエンドエンジニア | 株式会社HRBrain](https://hrmos.co/pages/hrbrain/jobs/2110210)
<!-- textlint-enable -->
<!-- prettier-ignore-end -->

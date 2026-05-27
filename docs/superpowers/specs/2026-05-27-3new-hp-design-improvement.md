# 3NEW srl HP デザイン改善仕様書

**作成日：** 2026-05-27  
**更新日：** 2026-05-27  
**対象：** `C:\Users\Kanae\OneDrive - 3New srl\1D_AI_3New\3NewHP\site`

---

## 概要

3new.eu の信頼性・UX を向上させる 5 点の改善。コード変更のみで実施可能（新規ページ不要）。

---

## 変更一覧

### ① About セクション：代表者プロフィールカードの追加

**対象ファイル：** `index.html`（`#about` セクション）

**変更内容：**  
会社情報テーブルの上に、代表者プロフィールカードを追加する。

**カードの構成：**
- 写真：`/assets/KanaeKaizodo.png`（88px 丸、`object-fit:cover`）
- 氏名：堂田 佳奈恵（Kanae Doda）
- 肩書き：代表 / Founder & Principal Consultant
- 略歴文：LinkedIn の内容をもとに実装時に確定（日本語、3〜4 行程度）
- 資格タグ（badge）：「弁理士（日本）」「EU MDR 実務」「Belgium 在住」

**レイアウト：**  
`display:flex; gap:20px` で写真を左、テキストを右に配置。  
背景：`var(--gray-pale)`、ボーダー：`var(--gray-light)`、角丸：`var(--radius-lg)`。

---

### ② 有料資料カード：バッジと価格表示の変更

**対象ファイル：** `index.html`（`#products` セクション）、`products/index.html`

**変更内容：**

1. **バッジ変更：** 全 4 枚のカード  
   - 現在：`準備中`（グレー背景 `var(--gray-light)` / グレー文字）  
   - 変更後：`先行案内受付中`（`var(--blue-pale)` 背景 / `var(--blue)` 文字・ボーダー付き）

2. **メルマガ誘導リンクを追加：**  
   各カードに以下のインラインブロックを追加（価格表示の上）：  
   ```
   📧 発売通知を受け取る → [無料登録](#newsletter)
   ```
   スタイル：`font-size:11.5px`、背景 `var(--gray-pale)`、角丸 `var(--radius)`。

3. **価格表示を控えめに変更：**  
   - 現在：`予定価格 ¥XX,000 税込`（目立つ表示）  
   - 変更後：`参考価格 ¥XX,000（税込・予定）`  
   - スタイル：`font-size:11px; color:var(--gray-mid)`（最下部に小さく）

---

### ③ ニュースレターセクション：Brevo フォームのリスタイリング

**対象ファイル：** `index.html`（`#newsletter` セクション）

**変更内容：**  
Brevo が出力する HTML 構造はそのまま維持し、CSS のみで見た目をサイトデザインに統合する。

| 項目 | 現在 | 変更後 |
|------|------|--------|
| フォント | Helvetica（インライン指定） | `var(--font-jp)`（Noto Sans JP） |
| 背景色 | `#EFF2F7` | `var(--gray-pale)`（`#f4f7fb`） |
| コンテナ角丸 | `3px` | `var(--radius)`（8px） |
| ボタン背景 | `#3E4857` | `var(--navy)`（`#1c3068`） |
| ボタン角丸 | `3px` | `var(--radius)`（8px） |
| タイトル | Helvetica 32px | Noto Sans JP `clamp(20px, 2vw, 26px)` |

**方針：** Brevo のフォーム `id="sib-form"` / `action` / 送信処理は変更しない。`style.css` にオーバーライドを追加する形で対応する。  
**注意：** Brevo の HTML にはインライン `style` 属性が多数存在し、CSS 詳細度が高い。上書きには `#sib-container` セレクタを使った詳細度の高いルール、または `!important` を最小限使用する。フォント・背景色・角丸・ボタン色を優先的に上書きする。

---

### ④ ヒーロー本文フォントの修正

**対象ファイル：** `style.css`

**変更内容：**  
`.hero-sub` のフォントファミリーを英字フォントから日本語フォントに変更。

```css
/* 変更前 */
.hero-sub {
  font-family: var(--font-en);
  ...
}

/* 変更後 */
.hero-sub {
  font-family: var(--font-jp);
  ...
}
```

---

### ⑤「選ばれる理由」代表者項目：アイコンを写真に差し替え

**対象ファイル：** `index.html`（`#why` セクション、4 番目の `.feature`）

**変更内容：**  
「弁理士資格を持つ代表…」の `.feature-icon` 内の SVG を `<img>` タグに置き換える。

```html
<!-- 変更前 -->
<div class="feature-icon" aria-hidden="true">
  <svg>...</svg>
</div>

<!-- 変更後（aria-hidden を削除し alt テキストを付与） -->
<div class="feature-icon">
  <img src="/assets/KanaeKaizodo.png"
       alt="代表 堂田 佳奈恵"
       style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid var(--blue-pale);">
</div>
```

---

## 変更しないもの

- サイトの色・タイポグラフィ全体（CSS カスタムプロパティはそのまま）
- Brevo フォームの送信機能・action URL・入力フィールド構造
- ヒーロー画像・ヒーローレイアウト
- サービスカードの構成
- ナビゲーション・フッター

---

## 素材

| ファイル | 用途 | 備考 |
|----------|------|------|
| `/assets/KanaeKaizodo.png` | ①⑤ の代表者写真 | 1.8MB。実装時に WebP 変換・リサイズ推奨（300px 程度） |

---

## 略歴テキスト（実装時に確定）

① の略歴文は、LinkedIn プロフィール（https://www.linkedin.com/in/kanae-doda-442491a/）の内容をもとに実装時に日本語で確定する。3〜4 行・100 字程度を目安とする。

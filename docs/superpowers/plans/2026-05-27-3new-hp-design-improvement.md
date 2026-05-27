# 3NEW srl HP デザイン改善 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 3new.eu の信頼性と UX を向上させる 5 点のデザイン改善を index.html・style.css・products/index.html に実装する。

**Architecture:** 静的 HTML/CSS サイト。ビルドステップなし。変更はファイル直接編集のみ。CSS の追加は既存の `style.css` 末尾にセクションを追記する形で行う。Brevo フォームの HTML 構造・送信機能には触れない。

**Tech Stack:** HTML5, CSS3（カスタムプロパティ使用）, Vanilla JS（既存のまま）

**仕様書：** `docs/superpowers/specs/2026-05-27-3new-hp-design-improvement.md`

---

## ファイルマップ

| ファイル | 変更内容 |
|----------|----------|
| `index.html` | ①プロフィールカード追加 / ②バッジ・価格・誘導リンク変更 / ③Brevo ラッパー HTML 追加 / ⑤アイコン→写真 |
| `style.css` | ④ `.hero-sub` フォント修正 / ③ Brevo オーバーライド CSS 追加 / ① プロフィールカード CSS 追加 |
| `products/index.html` | ②バッジ・価格・誘導リンク変更（index.html と同内容） |

---

## Task 1: ④ ヒーロー本文フォント修正

**Files:**
- Modify: `style.css`（`.hero-sub` セレクタ）

最小変更・最速確認のため最初に実施する。

- [ ] **Step 1: style.css の `.hero-sub` を修正する**

`style.css` の `.hero-sub` ブロックを以下に変更する（`font-family` の1行だけ変更）：

```css
.hero-sub {
  font-family: var(--font-jp);   /* 変更：var(--font-en) → var(--font-jp) */
  font-size: clamp(13px, 1.2vw, 14px);
  color: var(--text-muted);
  line-height: 1.85;
}
```

- [ ] **Step 2: ブラウザで確認する**

`index.html` をブラウザで開き、ヒーローセクションの本文テキスト（「EU MDR対応・CER作成・欧州代理人の手配から…」）が Noto Sans JP で表示されていることを確認する。Inter のときより文字が少し丸みを帯びて見える。

- [ ] **Step 3: 保存を確認して次へ**

---

## Task 2: ① About セクション — 代表者プロフィールカード

**Files:**
- Modify: `index.html`（`#about` セクション内）
- Modify: `style.css`（末尾に CSS 追加）

**前提：** LinkedIn プロフィールから略歴テキストを用意すること。下記の「略歴プレースホルダー」は実際のテキストに差し替える。

- [ ] **Step 1: style.css 末尾にプロフィールカードの CSS を追加する**

`style.css` の末尾に追加：

```css
/* =============================================================
   Representative Profile Card (About section)
   ============================================================= */
.rep-card {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  background: var(--gray-pale);
  border: 1px solid var(--gray-light);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin-bottom: 28px;
}

.rep-card-photo {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 3px solid var(--blue-pale);
}

.rep-card-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 2px;
  line-height: 1.3;
}

.rep-card-title {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--blue);
  margin-bottom: 10px;
}

.rep-card-bio {
  font-size: 13px;
  color: var(--text-body);
  line-height: 1.8;
  margin-bottom: 12px;
}

.rep-card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.rep-card-badge {
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-en);
  background: var(--blue-pale);
  color: var(--blue);
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid rgba(45, 97, 168, 0.2);
}

@media (max-width: 540px) {
  .rep-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .rep-card-badges {
    justify-content: center;
  }
}
```

- [ ] **Step 2: index.html の `#about` セクションにカード HTML を挿入する**

`index.html` の `#about` セクションを探す。以下のブロックを探す：

```html
<div class="about-content">
  <p class="about-lead">3NEW srl は、日本の医療機器メーカーが…
```

この `<p class="about-lead">` の**直前**に以下を挿入する：

```html
<div class="rep-card">
  <img
    src="/assets/KanaeKaizodo.png"
    alt="代表 堂田 佳奈恵"
    class="rep-card-photo"
    loading="lazy"
    width="88"
    height="88"
  >
  <div>
    <p class="rep-card-name">堂田 佳奈恵（Kanae Doda）</p>
    <p class="rep-card-title">代表 / Founder &amp; Principal Consultant</p>
    <p class="rep-card-bio">
      <!-- LinkedIn の内容をもとに確定。例： -->
      ベルギー在住。EU MDR・臨床評価・欧州体制構築を専門とし、日本の医療機器メーカーの欧州展開を支援。弁理士（日本）資格を有し、CRO・欧州医師・代理店との契約・知財論点の整理も対応。
    </p>
    <div class="rep-card-badges">
      <span class="rep-card-badge">弁理士（日本）</span>
      <span class="rep-card-badge">EU MDR 実務</span>
      <span class="rep-card-badge">Belgium 在住</span>
    </div>
  </div>
</div>
```

- [ ] **Step 3: 略歴テキストを LinkedIn の実際の内容に差し替える**

上記 `rep-card-bio` 内のテキストを、LinkedIn プロフィール（https://www.linkedin.com/in/kanae-doda-442491a/）の内容をもとに日本語で確定する。目安：3〜4 文、100 字前後。

- [ ] **Step 4: ブラウザで確認する**

`index.html` を開いて About セクションにスクロールする。確認項目：
- 写真が丸く表示されている
- 氏名・肩書き・略歴・バッジが正しく表示されている
- スマートフォン幅（540px 以下）で縦並びになることを確認する

---

## Task 3: ⑤「選ばれる理由」— 代表者アイコンを写真に差し替え

**Files:**
- Modify: `index.html`（`#why` セクション、4番目の `.feature`）

- [ ] **Step 1: 対象ブロックを特定する**

`index.html` の `#why` セクション内で「弁理士資格を持つ代表による契約・知財論点整理」というテキストを含む `.feature` ブロックを探す。その中の `<div class="feature-icon" aria-hidden="true">` が対象。

- [ ] **Step 2: SVG を写真タグに差し替える**

```html
<!-- 変更前 -->
<div class="feature-icon" aria-hidden="true">
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="14" r="7" stroke="currentColor" stroke-width="2"/>
    <path d="M8 38c0-8 6-13 14-13s14 5 14 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M28 11l3 3 6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</div>

<!-- 変更後（aria-hidden 削除、alt テキスト付与） -->
<div class="feature-icon">
  <img
    src="/assets/KanaeKaizodo.png"
    alt="代表 堂田 佳奈恵"
    style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid var(--blue-pale);"
    loading="lazy"
    width="40"
    height="40"
  >
</div>
```

- [ ] **Step 3: ブラウザで確認する**

「選ばれる理由」セクションにスクロールし、4番目のカードに顔写真が表示されていることを確認する。他の3枚はアイコンのままであることを確認する。

---

## Task 4: ② 有料資料カード — バッジ・価格・誘導リンク変更

**Files:**
- Modify: `index.html`（`#products` セクション）
- Modify: `products/index.html`（同じ変更）

index.html の `#products` セクションと products/index.html の両方に**同じ変更**を行う。

- [ ] **Step 1: style.css に「先行案内受付中」バッジと誘導リンクの CSS を追加する**

`style.css` の末尾に追加：

```css
/* =============================================================
   Product card — Coming Soon badge & newsletter nudge
   ============================================================= */
.product-status-badge.is-coming-soon {
  background: var(--blue-pale);
  color: var(--blue);
  border: 1px solid rgba(45, 97, 168, 0.22);
}

.product-newsletter-nudge {
  font-size: 11.5px;
  color: var(--text-muted);
  background: var(--gray-pale);
  border-radius: var(--radius);
  padding: 8px 12px;
  line-height: 1.6;
}

.product-newsletter-nudge a {
  color: var(--blue);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: rgba(45, 97, 168, 0.35);
}

.product-price-ref {
  font-size: 11px;
  color: var(--gray-mid);
  margin-top: 4px;
}
```

- [ ] **Step 2: index.html の各 product-card を変更する（4枚すべて）**

各 `<article class="product-card">` 内の変更：

**2-a: バッジのクラスと文言を変更する**
```html
<!-- 変更前 -->
<span class="product-status-badge is-prep">準備中</span>

<!-- 変更後 -->
<span class="product-status-badge is-coming-soon">先行案内受付中</span>
```

**2-b: `.product-card-foot` の中身を変更する**（4枚とも同じ構造）

```html
<!-- 変更前 -->
<div class="product-card-foot">
  <div class="product-card-price">
    <span class="label">予定価格</span>
    <span class="amount">¥XX,000<small>税込</small></span>
  </div>
  <a class="product-card-detail-btn" href="/products/">詳細を見る →</a>
</div>

<!-- 変更後 -->
<div class="product-card-foot">
  <p class="product-newsletter-nudge">
    📧 発売通知を受け取る →
    <a href="#newsletter">無料登録</a>
  </p>
  <p class="product-price-ref">参考価格 ¥XX,000（税込・予定）</p>
  <a class="product-card-detail-btn" href="/products/">詳細を見る →</a>
</div>
```

価格は各カードの元の金額をそのまま使う（¥28,000 / ¥28,000 / ¥38,000 / ¥48,000）。

- [ ] **Step 3: products/index.html に同じ変更を行う**

products/index.html を開き、Step 2 と同じバッジ・価格・誘導リンクの変更を全カードに適用する。

- [ ] **Step 4: ブラウザで確認する**

`index.html` の `#products` セクションで確認：
- バッジが青い「先行案内受付中」になっている
- 各カードに「📧 発売通知を受け取る → 無料登録」リンクがある
- リンクをクリックすると `#newsletter` セクションにスクロールする
- 価格が小さいグレー文字で「参考価格 ¥XX,000（税込・予定）」と表示されている

---

## Task 5: ③ ニュースレターセクション — Brevo フォームのリスタイリング

**Files:**
- Modify: `style.css`（末尾に Brevo オーバーライドを追加）

Brevo HTML の構造は変えない。CSS オーバーライドのみ。

- [ ] **Step 1: style.css 末尾に Brevo オーバーライド CSS を追加する**

```css
/* =============================================================
   Newsletter — Brevo form override
   Brevo uses inline styles with high specificity.
   Use #sib-container selector and !important where needed.
   ============================================================= */

/* セクション背景をサイトカラーに統一 */
#newsletter .sib-form {
  background-color: var(--gray-pale) !important;
}

/* フォームコンテナ */
#sib-container.sib-container--large {
  border-radius: var(--radius) !important;
  border-color: var(--gray-light) !important;
  font-family: var(--font-jp) !important;
  max-width: 520px;
}

/* タイトルブロック */
#sib-container .sib-form-block p {
  font-family: var(--font-jp) !important;
  color: var(--navy) !important;
}

/* タイトル（32px → サイズを抑える） */
#sib-container .sib-form-block:first-child p {
  font-size: clamp(18px, 2vw, 22px) !important;
  font-weight: 700 !important;
}

/* 本文テキスト */
#sib-container .sib-text-form-block p {
  font-size: 14px !important;
  line-height: 1.75 !important;
  color: var(--text-body) !important;
}

/* ラベル */
#sib-container .entry__label {
  font-family: var(--font-jp) !important;
  font-size: 14px !important;
  color: var(--text-body) !important;
}

/* 入力フィールド */
#sib-container input.input[type="text"] {
  border-radius: var(--radius) !important;
  border: 1px solid var(--gray-mid) !important;
  font-family: var(--font-jp) !important;
  color: var(--text-body) !important;
  padding: 10px 14px !important;
}

/* 送信ボタン */
#sib-container .sib-form-block__button {
  background-color: var(--navy) !important;
  border-radius: var(--radius) !important;
  font-family: var(--font-jp) !important;
  font-size: 15px !important;
  padding: 13px 28px !important;
  letter-spacing: 0.02em !important;
  transition: background var(--trans) !important;
}

#sib-container .sib-form-block__button:hover {
  background-color: var(--blue) !important;
}

/* チェックボックス同意文 */
#sib-container .entry__choice span {
  font-family: var(--font-jp) !important;
  font-size: 13px !important;
  color: var(--text-body) !important;
}

/* 注釈テキスト */
#sib-container .entry__specification {
  font-family: var(--font-jp) !important;
  font-size: 12px !important;
  color: var(--text-muted) !important;
}
```

- [ ] **Step 2: ブラウザでニュースレターセクションを確認する**

`index.html` を開いてニュースレターセクションにスクロールする。確認項目：
- 背景色がサイト全体と統一されている（`#EFF2F7` の独立した灰色が消えている）
- フォントが Noto Sans JP になっている
- ボタンが navy 色（`#1c3068`）になっている
- 角丸がサイトの他の要素と揃っている
- フォーム送信が正常に動作する（テスト送信を行う）

- [ ] **Step 3: Brevo フォームの動作テストを行う**

自分のメールアドレスでテスト送信し、確認メールが届くことを確認する。スタイル変更が送信機能に影響していないことを検証する。

---

## 完了チェックリスト

全タスク完了後、以下をまとめて確認する：

- [ ] ヒーローの本文テキストが Noto Sans JP で表示されている
- [ ] About セクションに写真カードが表示されている（写真・氏名・略歴・バッジ）
- [ ] 「選ばれる理由」の代表者項目に顔写真が表示されている
- [ ] 有料資料カード全 4 枚のバッジが「先行案内受付中」（青）になっている
- [ ] 各カードに「📧 発売通知を受け取る → 無料登録」リンクがある
- [ ] リンクが `#newsletter` にジャンプする
- [ ] 価格が小さいグレー文字「参考価格 ¥XX,000（税込・予定）」になっている
- [ ] ニュースレターフォームがサイトデザインと統一されている
- [ ] ニュースレターフォームの送信が正常に動作する
- [ ] products/index.html も同じバッジ・価格・誘導リンクになっている
- [ ] スマートフォン幅（375px）で崩れていない

---

## 画像最適化（推奨・任意）

`KanaeKaizodo.png`（現在 1.8MB）は About・Why の2箇所で読み込まれる。パフォーマンス改善のため：

```bash
# ffmpeg または Squoosh (https://squoosh.app) で変換
# 目標: KanaeKaizodo.webp を 200px × 200px, ~30KB 程度に
```

変換後、HTML の `src` を `/assets/KanaeKaizodo.webp` に変更し、フォールバックとして `<picture>` タグを使用する：

```html
<picture>
  <source srcset="/assets/KanaeKaizodo.webp" type="image/webp">
  <img src="/assets/KanaeKaizodo.png" alt="代表 堂田 佳奈恵" class="rep-card-photo" ...>
</picture>
```

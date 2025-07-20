# zbuf

> A Slack-like CLI tool for local message posting and management, built with React/Ink

Slack風のUIでローカルにメッセージを投稿・管理できるCLIツールです。React/Inkを使用して構築されており、ディレクトリごとにセッションを分けてメッセージを保存します。

## 特徴

- 📁 **セッションベースの管理**: 現在のディレクトリごとに独立したメッセージ履歴
- 💾 **永続的なストレージ**: JSONL形式でメッセージを保存
- 🎨 **Slack風のUI**: 見やすいメッセージリストと入力インターフェース
- 📤 **エクスポート機能**: LLMに渡しやすい形式でデータをエクスポート
- 🔧 **XDG Base Directory対応**: 設定ファイルは標準的な場所に保存

## インストール

### npm から (推奨)

```bash
npm install -g zbuf
# または
pnpm add -g zbuf
# または
yarn global add zbuf
```

### ソースコードから

```bash
# リポジトリをクローン
git clone https://github.com/zztkm/zbuf.git
cd zbuf

# 依存関係をインストール
pnpm install

# ビルド
pnpm build

# グローバルにインストール（オプション）
pnpm link --global
```

## 使い方

### 開発モードで実行

```bash
pnpm dev
```

### ビルド済みバージョンを実行

```bash
pnpm start
```

### グローバルインストール後

```bash
# インタラクティブモードで起動
zbuf

# セッションをエクスポート（デフォルト: markdown形式）
zbuf --export

# 特定の形式でエクスポート
zbuf --export json
zbuf --export plain

# ヘルプを表示
zbuf --help
```

## 基本操作

- **メッセージの投稿**: テキストを入力してEnterキーを押す
- **終了**: `:quit` コマンドを入力するか、`Ctrl+C` を押す

## インタラクティブモードのコマンド

| コマンド | 説明 |
|---------|------|
| `:clear` | 現在のセッションのメッセージをすべて削除 |
| `:quit` | アプリケーションを終了 |

## エクスポート形式

エクスポートされたデータはすべて標準出力に出力されます。ファイルに保存したい場合はリダイレクトを使用してください：
```bash
zbuf --export json > session.json
```

### Markdown形式（デフォルト）
```bash
zbuf --export
```

LLMに渡しやすい形式で出力：
```markdown
# Session: /path/to/directory

## Messages

[2025-01-20 10:30:45] username: メッセージ内容
```

### JSON形式
```bash
zbuf --export json
```

完全な構造化データとして出力：
```json
{
  "session": "/path/to/directory",
  "exportedAt": "2025-01-20T10:30:45.000Z",
  "messages": [
    {
      "id": "uuid",
      "timestamp": "2025-01-20T10:30:45.000Z",
      "author": "username",
      "content": "メッセージ内容"
    }
  ]
}
```

### プレーンテキスト形式
```bash
zbuf --export plain
```

シンプルなテキスト形式で出力：
```
[2025-01-20 10:30:45] username: メッセージ内容
```

## データの保存場所

メッセージは以下の場所に保存されます：
- Linux/macOS: `$XDG_CONFIG_HOME/zbuf/sessions/` または `~/.config/zbuf/sessions/`
- 各セッションは現在のディレクトリパスをBase64エンコードしたファイル名で保存

## 開発

### 必要な環境

- Node.js 18以上
- pnpm

### 依存関係のバージョンについて

このプロジェクトは以下のバージョンの組み合わせで動作確認されています：
- ink: 4.4.1
- ink-text-input: 5.0.1
- react: 18.3.1

最新バージョンではなく、これらの互換性のあるバージョンを使用しています。

### プロジェクト構造

```
src/
├── index.tsx          # エントリーポイント
├── App.tsx            # メインアプリケーションコンポーネント
├── components/        # UIコンポーネント
│   ├── MessageList.tsx
│   ├── InputBox.tsx
│   ├── SessionBar.tsx
│   └── StatusBar.tsx
├── hooks/             # カスタムフック
│   └── useSession.ts
├── utils/             # ユーティリティ関数
│   ├── storage.ts
│   ├── session.ts
│   └── export.ts
└── types/             # TypeScript型定義
    └── index.ts
```

### スクリプト

```bash
# 開発サーバーを起動
pnpm dev

# TypeScriptをビルド
pnpm build

# ビルド済みアプリを実行
pnpm start
```

## トラブルシューティング

### 開発モードでエラーが発生する場合

ESMモジュールの互換性の問題が発生する場合があります。以下を確認してください：

1. Node.jsのバージョンが18以上であること
2. `package.json`に`"type": "module"`が設定されていること
3. 依存関係のバージョンが上記の推奨バージョンと一致していること

### ビルド時のエラー

TypeScriptのビルドでエラーが発生する場合：
```bash
# node_modulesを削除して再インストール
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

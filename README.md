# line-bot-token-generator

LineBotを操作するためのチャネルアクセストークンを生成するための手順をまとめています。
基本的には[LINEの公式ドキュメント](https://developers.line.biz/ja/docs/messaging-api/getting-started/)を参考にしています。

## LINE DevConsole上でプロバイダーとチャネルを作成

https://developers.line.biz/ja/docs/messaging-api/getting-started/

## アサーション署名キーのキーペアを生成する

### jwx commandのインストールと秘密鍵と公開鍵の生成

jwx commandをインストール

```
git clone https://github.com/lestrrat-go/jwx.git
cd jwx
make jwx
```

秘密鍵と公開鍵を生成

```
jwx jwk generate --type RSA --keysize 2048 --template '{"alg":"RS256","use":"sig"}' > private.key
jwx jwk format --public-key private.key > public.key
```

### LINE Devconsole上で公開鍵を登録し、kidを取得

次のJWTトークンの生成でkidは利用します。

https://developers.line.biz/ja/docs/messaging-api/generate-json-web-token/#register-public-key-and-get-kid

## JWTトークンの生成

`.env`ファイルを作成し、LINE_KIDとLINE_CHANNEL_ID(LINE Devconsole上で確認できます)を設定する。

```
LINE_KID="xxxxx"
LINE_CHANNEL_ID="xxxx"
```

30分有効なJWTトークンが生成されるのでコピーします。

```
npm install
npm run generate
```

## チャネルアクセストークンv2.1を発行

以下のスクリプトを実行するとチャネルアクセストークンが生成されます。

```
JWT="JWTトークンをペーストする" bash scripts/generate_channel_token.sh
```

## チャネルアクセストークンの一覧を表示

```
JWT="JWTトークンをペーストする" bash scripts/list_channel_token.sh
```

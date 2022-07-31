# picture-shelf

## 概要

画像を管理するためのシンプルなWebアプリケーション

## 機能

- 画像のアップロード
- タイトル、メモ、カテゴリーと紐付けて画像を保存
- 画像の一覧表示、カテゴリーでの絞り込み
- 会員登録、ログイン

## 使用技術

Nuxt.js / Firebase (Firestore, Storage, Authentication) / VuexFire / Buefy

## デモ
![GkO9Dlgtebgapz4VW5IO1640917256-1640917592](https://user-images.githubusercontent.com/46856574/147800047-9600f579-fdf6-44e3-961c-770a00cb4071.gif)

## ローカルでの動作方法

事前にFirebaseでプロジェクトを作成してください。  
作成後以下の操作を行います。  
- Authentication でメールパスワード認証を有効に変更
- Firestore Database でデータベースを作成
- Storage で Rules を変更 
  ```
  allow read, write: if false;
  ↓
  allow read, write;
  ```

1. コードをクローン

   ```
   git clone git clone git@github.com:t-aono/picture-shelf.git
   ```

2. .env-example をコピーして .env を作成  
  .env には Firebase SDK の firebaseConfig の値を入力してください。

   ```
   cp .env-example .env
   ```  

3. パッケージのインストールとローカル環境起動

   ```
   yarn
   yarn dev
   ```

4. ブラウザでトップページにアクセス

    http://localhost:3000/

5. Firestoreでインデックスの作成  
デーベースへの登録時に複合インデックスの作成が必要です。  
初回データ登録操作時にブラウザのコンソールへ作成用リンクのURLが出力されます。  
そちらからインデックス作成を行なってください。作成には数分かかります。

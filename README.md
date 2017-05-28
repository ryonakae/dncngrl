# dncngrl


## ネットワーク作成
```
$ docker network create --driver bridge back-dncngrl
```


## ボリューム作成
```
docker volume create --name=dncngrl-data-db
docker volume create --name=dncngrl-data-wp
```


## .envファイル作成
```
$ touch .env
```

### 編集
```
VIRTUAL_HOST=xxx
VIRTUAL_PORT=xxx

LETSENCRYPT_HOST=xxx
LETSENCRYPT_EMAIL=mail@example.com
LETSENCRYPT_TEST=true/false

WORDPRESS_DB_NAME=xxx
WORDPRESS_DB_PASSWORD=xxx

MYSQL_DATABASE=xxx
MYSQL_ROOT_PASSWORD=xxx
```

`WORDPRESS_DB_PASSWORD`と`MYSQL_ROOT_PASSWORD`は同じにする


## (ローカルのとき)hostsファイル編集
```
# hosts編集
$ sudo vim /etc/hosts

# 下記を追記
127.0.0.1 [VIRTUAL_HOSTで設定したホスト名]
```


## データのバックアップ/リストア
`docker-compose up -d`した上で、

```
# バックアップ
$ sh script/backup.sh

# リストア
# あらかじめbackup以下にwp-content-uploads.tarとdb.sqlを置いておく
$ sh script/restore.sh
```


### データコンテナの中に入る
```
$ docker-compose run --rm data /bin/sh
```


## デプロイ
### 準備
* サーバでこのリポジトリをpull
* backupディレクトリにバックアップファイルを用意
  * `scp 転送するファイル configに書いた名前:転送先のディレクトリ`
* docker-compose up -d

### wp-cliでリストア&URL置換
```
# リストア
$ sh script/restore.sh

# URL置換
$ docker-compose run --rm wpcli search-replace --all-tables 'http://before.com' 'http://after.com'

# Dry Run
$ docker-compose run --rm wpcli search-replace --all-tables --dry-run 'http://before.com' 'http://after.com'
```

HTTPSのサイトなら`https://after.com`にする

### テーマファイルのビルド
* サーバにnode.js + yarnをインストールする
  * yarnがrootで実行できるようにしておく

```
$ cd theme
$ su
$ yarn run build
$ exit
```

rootで実行しないと、Dockerで生成した`theme/public`にアクセスできないので、
ディレクトリのクリーンナップやコンパイルが失敗してしまう

作業ユーザーでもビルドできるようにしたい(できるだけrootで作業したくない)

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


## (ローカルのとき)hostsファイル編集
```
# hosts編集
$ sudo vim /etc/hosts

# 下記を追記
127.0.0.1 [VIRTUAL_HOSTで設定したホスト名]
```


## データのバックアップ/リストア
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

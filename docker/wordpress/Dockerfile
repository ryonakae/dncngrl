FROM wordpress:4.7.4-php7.1-fpm

# これから使うaptを入れる
RUN apt-get update
RUN apt-get -y install wget unzip curl sudo

# sudo
RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo
USER docker
CMD /bin/bash


# WP-CLIをインストール
RUN curl -o /bin/wp-cli.phar https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
COPY wp-su.sh /bin/wp
RUN chmod +x /bin/wp-cli.phar /bin/wp

# プラグインファイルの一時ダウンロード先
WORKDIR /tmp/wp-plugins

# プラグインファイルをダウンロード
# プラグイン探す→ https://ja.wordpress.org/plugins/
RUN wget https://downloads.wordpress.org/plugin/advanced-custom-fields.4.4.11.zip
RUN wget https://cl.ly/3S0C2G3T3w1z/download/acf-repeater.zip
RUN wget https://downloads.wordpress.org/plugin/acf-to-rest-api.2.2.1.zip
RUN wget https://downloads.wordpress.org/plugin/update-control.1.5.zip
RUN wget https://downloads.wordpress.org/plugin/wp-multibyte-patch.2.8.1.zip

# プラグインをWordPressのプラグインディレクトリに解凍する
RUN unzip './*.zip' -d /usr/src/wordpress/wp-content/plugins
RUN chown -R www-data:www-data /usr/src/wordpress/wp-content

# 一時ダウンロード先内の全ファイルの削除
RUN apt-get clean
RUN rm -rf '/tmp/*'

# 戻る
WORKDIR /var/www/html

# PHPの拡張をインストール
RUN docker-php-ext-install mysqli pdo pdo_mysql mbstring
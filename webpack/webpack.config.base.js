import webpack from 'webpack';
import path from 'path';
import filePath from '../gulp/filePath';
import autoprefixer from 'autoprefixer';
import bourbon from 'node-bourbon';


export default {
  entry: [
    filePath.src.scripts + 'app.js'
  ],
  output: {
    filename: 'app.js'
  },
  module: {
    rules: [
      // 画像とフォントは200KB以下ならbase64エンコード
      // base64エンコードしない場合はテーマ内の指定のディレクトリのパスを入れる
      // images
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          emitFile: false,
          limit: 200000,
          name: '[name].[ext]',
          outputPath: filePath.images,
          publicPath: '/' + filePath.theme.images
        }
      },
      // webfont
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          emitFile: false,
          limit: 200000,
          name: '[name].[ext]',
          outputPath: filePath.fonts,
          publicPath: '/' + filePath.theme.fonts
        }
      },
      // babel js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['es2015', { modules: false }]]
        }
      },
      // vuejs
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          postcss: [
            autoprefixer({
              browsers: [
                'last 2 versions',
                'ie > 11',
                'iOS >= 10',
                'Android >= 5.0'
              ],
              cascade: false
            })
          ]
        }
      }
    ]
  },
  resolve: {
    alias: {
      // webpackでheadに挿入したりbase64エンコードしてcssに入れるファイルがあるパスを記述する
      bourbon: bourbon.includePaths[0] + '/_bourbon.scss',
      styles: path.resolve(__dirname, '../' + filePath.src.styles),
      css: path.resolve(__dirname, '../' + filePath.dist.styles),
      images: path.resolve(__dirname, '../' + filePath.dist.images),
      fonts: path.resolve(__dirname, '../' + filePath.dist.fonts)
    }
  }
}

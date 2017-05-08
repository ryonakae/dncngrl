import webpack from 'webpack';
import path from 'path';
import filePath from '../gulp/filePath';
import env from '../gulp/env';
import autoprefixer from 'autoprefixer';
import bourbon from 'node-bourbon';


export default {
  entry: [
    filePath.dev.scripts + 'index.js'
  ],
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // eslint
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
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
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader?' + JSON.stringify({
              includePaths: [].concat(bourbon.includePaths)
            }),
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax?' + JSON.stringify({
              includePaths: [].concat(bourbon.includePaths)
            })
          },
          postcss: [
            autoprefixer({
              browsers: [
                'last 4 versions',
                'ie >= 10',
                'iOS >= 8.1',
                'Android >= 4.4'
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
      styles: path.resolve(__dirname, '../' + filePath.dev.styles)
    }
  }
}
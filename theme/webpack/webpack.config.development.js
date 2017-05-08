import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import filePath from '../gulp/filePath';

module.exports = merge(baseConfig, {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ],
  output: {
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
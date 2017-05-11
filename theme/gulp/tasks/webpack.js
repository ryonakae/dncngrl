import gulp from 'gulp';
import filePath from '../filePath';
import env from '../env';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import plumber from 'gulp-plumber';


let webpackConfig;

if (env === 'development') {
  webpackConfig = require('../../webpack/webpack.config.development');
}
else if (env === 'production') {
  webpackConfig = require('../../webpack/webpack.config.production');
}


gulp.task('webpack', () => {
  return gulp
    .src(filePath.dev.scripts + '**/*.{js,jsx,vue}')
    .pipe(plumber({
      errorHandler(err) {
        this.emit('end');
      }
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(filePath.public.scripts));
});
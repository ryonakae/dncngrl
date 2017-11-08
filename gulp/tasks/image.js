import gulp from 'gulp';
import filePath from '../filePath';
import env from '../env';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import mozjpeg from 'imagemin-mozjpeg';
import cache from 'gulp-cache';
import spritesmith from 'gulp.spritesmith';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';
import bs from './browserSync';


// image minify
gulp.task('image:min', () => {
  const imageminOption = [
    pngquant({
      quality: '80-90',
      speed: 1,
      floyd: 0
    }),
    mozjpeg({
      quality: 85,
      progressive: true
    }),
    imagemin.svgo({
      plugins: [{removeViewBox: false}]
    }),
    imagemin.optipng(),
    imagemin.gifsicle()
  ];

  return gulp
    .src([
      filePath.src.images + '**/*',
      filePath.dist.images + 'sprite.png',
      '!' + filePath.src.images + 'sprite',
      '!' + filePath.src.sprite + '*'
    ])
    .pipe(gulpif(env === 'production', imagemin(imageminOption)))
    .pipe(gulp.dest(filePath.dist.images))
    .on('end', () => {
      if(env === 'development' && bs.active) gulp.start('bs:reload');
    });
});


// image sprite
// webpackのaliasで解決するために、imgPath,retinaImgPathは'images/...'というパスにする
gulp.task('image:sprite', (callback) => {
  const spriteData = gulp.src(filePath.src.sprite + '*.png')
    .pipe(plumber())
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: 'images/sprite.png',
      cssName: '_sprite.scss',
      padding: 10,
      retinaSrcFilter: filePath.src.sprite + '*-2x.png',
      retinaImgName: 'sprite-2x.png',
      retinaImgPath: 'images/sprite-2x.png'
    }));

  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(gulp.dest(filePath.dist.images));

  const cssStream = spriteData.css
    .pipe(buffer())
    .pipe(gulp.dest(filePath.src.styles));

  return merge(imgStream, cssStream);
});

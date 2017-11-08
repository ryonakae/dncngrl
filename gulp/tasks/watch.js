import gulp from 'gulp';
import filePath from '../filePath';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';


gulp.task('watch', () => {
  // sass
  watch([
    filePath.src.styles + '**/*.{scss,sass,css}'
  ], (event) => {
    gulp.start('sass');
  });

  // image minify
  watch(filePath.src.images + '**/*', (event) => {
    gulp.start('image:min');
  });

  // sprite image
  watch(filePath.src.sprite + '*', (event) => {
    runSequence('image:sprite', 'sass');
  });

  // js libraries
  watch([
    filePath.src.scripts + 'lib/**/*',
    'gulp/jsLib.js'
  ], (event) => {
    gulp.start('concat:js');
  });

  // other file
  watch([
    filePath.src.fonts + '**/*',
    filePath.src.root + 'assets/audio/**/*',
    filePath.src.root + 'assets/video/**/*',
    filePath.src.root + '**/*.{php,html}',
    filePath.src.root + 'style.css'
  ], (event) => {
    gulp.start('copyFile');
  });
});

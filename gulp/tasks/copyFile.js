import gulp from 'gulp';
import filePath from '../filePath';
import env from '../env';
import bs from './browserSync';


gulp.task('copyFile', () => {
  return gulp
    .src(
      [
        filePath.src.fonts + '**/*',
        filePath.src.root + 'assets/audio/**/*',
        filePath.src.root + 'assets/video/**/*',
        filePath.src.root + '**/*.{php,html}',
        filePath.src.root + 'style.css'
      ],
      { base: filePath.src.root }
    )
    .pipe(gulp.dest(filePath.dist.root))
    .on('end', () => {
      if(env === 'development' && bs.active) gulp.start('bs:reload');
    });
});
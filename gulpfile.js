const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    // cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer');

/* pathConfig*/
const sassWatchPath = './src/components/**/*.scss';
/**/

gulp.task('sass', () =>
    gulp.src(sassWatchPath)
    .pipe(sourcemaps.init())
    .pipe(sass({
        trace: true,
        verbose: true
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    // .pipe(cleanCSS({compatibility: 'ie11'}))
    .pipe(gulp.dest('./src/components/compile'))
);

gulp.task('sass-watch', () => {
    gulp.watch(sassWatchPath, ['sass']);
});
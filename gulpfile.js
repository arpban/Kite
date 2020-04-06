const gulp = require('gulp');
const livereload = require('gulp-livereload');
const uglify = require('gulp-uglifyjs');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');
const stylelint = require('gulp-stylelint');

gulp.task('styles', function () {
  gulp.src([
    'src/styles/**/*.scss',
    'src/styles/**/*.css'
  ])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('built/css'));
});

gulp.task('lint:styles', () => {
  return gulp.src([
    'src/styles/**/*.scss',
    'src/styles/**/*.css'
  ]).pipe(
    stylelint({
      reporters: [
        {
          formatter: 'string',
          console: true,
        }
      ]
    })
  )
})

gulp.task('scripts', function () {
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('built/js'))
});

gulp.task('default', ['styles', 'scripts'], function () {
  livereload.listen();
  gulp.watch(['src/styles/**/*.scss', 'src/styles/**/*.css'], ['styles', 'lint:styles']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch(['built/css/**/*.css', '**/*.twig', 'built/js/**/*.js'], function (files) {
    livereload.changed(files)
  });
});

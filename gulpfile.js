var gulp    = require('gulp');
var webpack = require('webpack-stream');
var bower   = require('gulp-bower');
var $       = require('gulp-load-plugins')();

var bowerDir = './bower_components';

gulp.task('bower', function() {
  return bower()
        .pipe(gulp.dest(bowerDir))
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('img', function() {
  return gulp.src('img/*')
    .pipe(gulp.dest('dist/img'));
});

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack', function() {
  return gulp.src('js/app.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['bower','html','img','sass','webpack'], function() {
  gulp.watch(['index.html'], ['html']);
  gulp.watch(['img/**/*'], ['img']);
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(['js/app.js'], ['webpack']);
});

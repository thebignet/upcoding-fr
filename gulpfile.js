var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');
const zip         = require('gulp-zip');

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

function sass() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};

function images() {
  return gulp.src('img/*')
    .pipe(gulp.dest('dist/img/'));
}

function javascript() {
  return gulp.src('js/*')
    .pipe(gulp.dest('dist/js/'));
}

function index() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist/'));
}

gulp.task('package', () => 
  gulp.src('dist/**')
    .pipe(zip('upcoding.zip'))
    .pipe(gulp.dest('.'))
);

function serve() {
  browserSync.init({
    server: "dist/"
  });

  gulp.watch("scss/*.scss", sass).on('change', browserSync.reload);
  gulp.watch("*.html").on('change', index).on('change', browserSync.reload);
  gulp.watch("img/*").on('change', images).on('change', browserSync.reload);
  gulp.watch("js/*").on('change', javascript).on('change', browserSync.reload);
}

gulp.task('sass', sass);
gulp.task('images', images);
gulp.task('index', index);
gulp.task('javascript', javascript);
gulp.task('serve', gulp.series('sass', 'images', 'index', 'javascript', serve));
gulp.task('default', gulp.series('sass', 'images', 'index', 'javascript', 'package'));

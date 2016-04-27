// Modules
var gulp          = require('gulp');
var nano          = require('gulp-cssnano');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var source        = require('gulp-sourcemaps');

// Paths
var path = {
  sass: {
    dest: './www/css/',
    source: './assets/sass/'
  },
  js: {
    source: {
      libs: './assets/js/libs/',
      scripts: './assets/js/'
    },
    dest: './www/js/'
  }
};

// Methods
/* CSS */
gulp.task('sass', function(){
  return gulp.src(path.sass.source + '*.+(sass|scss)')
    .pipe(source.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(nano({
      zindex: false,
      autoprefixer: {
        browsers: ['> 0.2%'],
        add: true
      }
    }))
    .pipe(concat('style.min.css'))
    .pipe(source.write())
    .pipe(gulp.dest(path.sass.dest));
});
/* JS */
gulp.task('jsLibs', function(){
  return gulp.src(path.js.source.libs+'*.js')
    .pipe(uglify())
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest(path.js.dest));
});
gulp.task('jsScripts', function(){
  return gulp.src(path.js.source.scripts+'*.js')
    .pipe(source.init())
    .pipe(uglify())
    .pipe(concat('scripts.min.js'))
    .pipe(source.write())
    .pipe(gulp.dest(path.js.dest));
});
/* WATCH */
gulp.task('watch', function(){
  gulp.watch(path.sass.source + '*.+(sass|scss)', ['sass']);
  gulp.watch(path.js.source.libs+'*.js', ['jsLibs', 'jsScripts']);
  gulp.watch(path.js.source.scripts+'*.js', ['jsScripts', 'jsLibs']);
});
/* DEFAULT */
gulp.task('default', ['build']);
gulp.task('build', ['sass', 'jsLibs', 'jsScripts']);

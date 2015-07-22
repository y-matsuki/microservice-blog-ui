var gulp = require('gulp');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var flatten = require('gulp-flatten');

gulp.task('server', function() {
  browser({
    server: {
      baseDir: "./"
    }
  })
});

gulp.task('sass', function() {
  gulp.src("src/sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("./dest/css"))
    .pipe(browser.reload({stream:true}));
});

gulp.task('compile', function() {
  return gulp.src('./src/**/*.jsx')
    .pipe(plumber())
    .pipe(react())
    .pipe(flatten())
    .pipe(gulp.dest("./dest/js"))
    .pipe(browser.reload({stream:true}));
})

gulp.task('uglify', function() {
  gulp.src("src/js/**/*.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest("./dest/js"))
    .pipe(browser.reload({stream:true}));
});

gulp.task('build', ['compile', 'sass', 'uglify']);
gulp.task('debug', ['server'], function() {
  gulp.watch("src/js/**/*.js", ["uglify"]);
  gulp.watch("src/jsx/**/*.jsx", ["compile"]);
  gulp.watch("src/sass/**/*.scss", ["sass"]);
});

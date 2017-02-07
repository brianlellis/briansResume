/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-sass'),
    sassdoc = require('sassdoc'),
    jsdoc = require('gulp-jsdoc3');

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

// SASS manual compile
gulp.task('sass-styles', function () {
    gulp.src('styles/scss/**/*.scss')
        .pipe( sass().on('error', sass.logError) )
        .pipe( gulp.dest('css/') );
});

// SASSDoc compile
gulp.task('sassdoc', function () {
  return gulp.src('styles/scss/**/*.scss')
    .pipe(sassdoc());
});

// SASS watch task
gulp.task('sass-watch', function () {
    gulp.watch('styles/scss/**/*.scss', ['sass-styles', 'sassdoc']);
});

// SASS manual build with doc
gulp.task('sass-compile',['sass-styles', 'sassdoc']);

// JSDoc compilation
gulp.task('jsdoc', function (cb) {
    gulp.src(['README.md', 'js/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});
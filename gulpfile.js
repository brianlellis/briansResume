/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-sass');

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

// SASS watch task
gulp.task('sass-watch', function () {
	gulp.watch('styles/scss/**/*.scss', ['sass-styles']);
});
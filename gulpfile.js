/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass  = require('gulp-sass'), // SASS compiler
    sassdoc = require('sassdoc'), // SASS Documentation builder
    jsdoc = require('gulp-jsdoc3'), // JS Documentation builder
    cucumber = require('gulp-cucumber'), // Automated QA feature testing
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    browsync = require('browser-sync').create(), // create a browser sync instance.
    // FIXME: html5 api is down
    //html5Lint = require('gulp-html5-lint'),
    imagemin = require('gulp-imagemin');
    // FIXME: Configure gulp load plugins in future release
    //plugins = require('gulp-load-plugins')();

// create a default task and just log a message
gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

// Browser Sync 
gulp.task('browser-sync', function() {
    browsync.init({
        server: {
            baseDir: "./"
        }
    });
});

// HTML5 linter
gulp.task('html5-lint', function() {
    return gulp.src('*.html')
        .pipe(html5Lint()); // FIXME: html5 api down
});

// SASS manual compile
gulp.task('sass-styles', function () {
    gulp.src('styles/scss/**/*.scss')
        .pipe( sass().on('error', sass.logError) )
        .pipe( gulp.dest('compiled/') );

    return gulp.src('compiled/*.css')
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ' original size: ' + details.stats.originalSize);
            console.log(details.name + ' NEW size: ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('compiled'))
        .pipe(browsync.reload({stream: true})); // prompts a reload after compilation
});

// SASSDoc compile
gulp.task('sassdoc', function () {
  return gulp.src('styles/scss/**/*.scss')
    .pipe(sassdoc());
});

// SASS watch task
gulp.task('sass-watch', ['browser-sync'], function () {
    gulp.watch('styles/scss/**/*.scss', ['sass-styles', 'sassdoc']);
});

// SASS manual build with doc
gulp.task('sass-compile',['sass-styles', 'sassdoc']);

// JSDoc compilation
gulp.task('jsdoc', function (cb) {
    gulp.src(['README.md', 'js/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});

// Cucumber compiler
// run tests with the following command: npm test
gulp.task('cucumber', function() {
    return gulp.src('features/*').pipe(cucumber({
        'steps': 'features/steps/steps.js',
        'format': 'summary'
    }));
});

// JS Hint Stylish Output configured
gulp.task('jshint', () =>
    gulp.src('js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
);

// JS Build watch task
gulp.task('js-compile', function () {
    gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(concat('compiledJS.js'))
        .pipe(gulp.dest('./compiled'));
});

// Image optimization task
gulp.task('images', function () {
    gulp.src('media/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('media'))
});

// FULL BUILD OF ALL ASSETS
gulp.task('build', ['images', 'jshint', 'js-compile', 'sass-styles', 'sassdoc', 'jsdoc']);

// FIXME: BAD GLOB CONFIGURATION
gulp.task('build-watch', ['browser-sync'], function () {
    gulp.watch('*', ['html5-lint', 'jshint', 'js-compile', 'sass-styles', 'sassdoc', 'jsdoc']);
});

/**
 * TRAVIS BUILD TASKS
 */

gulp.task('travis', function () {
	process.exit(0);
});



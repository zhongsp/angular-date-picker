'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var templateCache = require('gulp-angular-templatecache');

gulp.task('sass', function() {
  gulp.src('./lib/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./lib/css'));
});

gulp.task('watch', function() {
  gulp.watch('./lib/scss/*.scss', ['sass']);
});

gulp.task('build', function() {
  gulp.src('lib/**/*.html')
    .pipe(templateCache('templates.js', {
      module: 'datepicker'
    }))
    .pipe(gulp.dest('build'));
});

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('./lib/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./lib/css'));
});

gulp.task('watch', function() {
  gulp.watch('./lib/scss/*.scss', ['sass']);
});

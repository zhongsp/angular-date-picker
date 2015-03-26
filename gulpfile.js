'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var templateCache = require('gulp-angular-templatecache');

gulp.task('sass', function() {
  gulp.src('./lib/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./lib/css'));
});

gulp.task('watch', function() {
  gulp.watch('./lib/scss/*.scss', ['sass']);
});

gulp.task('templateCache', function() {
  return gulp.src('lib/**/*.html')
    .pipe(templateCache('templates.js', {
      module: 'datepicker'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('concat', ['templateCache'], function() {
  return gulp.src(['./lib/js/*.js', './build/templates.js'])
    .pipe(concat('angular-date-picker.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {

});

gulp.task('build', ['sass', 'concat'], function() {
  gulp.src('./build/templates.js')
    .pipe(clean());

  gulp.src('./lib/css/**')
    .pipe(gulp.dest('build'));
});

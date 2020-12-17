const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

// Работа со скриптами

module.exports = function script() {
  return gulp.src('app/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpif(argv.prod, uglify()))
    .pipe(gulp.dest('dist/js/'))
}
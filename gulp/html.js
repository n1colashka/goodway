const gulp = require('gulp');

// Копирование HTML

module.exports = function script() {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist/'));
};

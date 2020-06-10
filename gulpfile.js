const gulp = require('gulp');
const eslint = require('gulp-eslint');
const ts = require('gulp-typescript');
const del = require('del');

const { src, dest, task } = gulp;
const tsProject = ts.createProject('./tsconfig.json');

task('eslint', () => {
    return src(['tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

task('build', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(dest('dist'));
});

task('clean', () => {
    return del('./dist');
});

task('default', gulp.series('clean', 'build', 'eslint'));

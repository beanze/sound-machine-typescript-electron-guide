'use strict'

const gulp = require('gulp')
const sequence = require('gulp-sequence')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')
const sourcemaps = require('gulp-sourcemaps')

const merge = require('merge-stream')
const argv = require('yargs').argv

const distDir = 'dist';
const mainDestPath = distDir
const rendererDestPath = distDir + '/renderer'

const mode = argv.mode || 'debug'

console.log('mode :' + mode)

const coreProject = ts.createProject('tsconfig.json')

gulp.task('clean', function() {
  return gulp.src(distDir).pipe(clean())
});

gulp.task('buildMain', () => coreProject.src()
            .pipe(sourcemaps.init())
            .pipe(coreProject())
            .js
            .pipe(sourcemaps.write('.', {
                sourceRoot: '../src/'
            }))
            .pipe(gulp.dest(mainDestPath))
);

gulp.task('buildRenderer', () => {
  return gulp.src('src/renderer/**/*').pipe(gulp.dest(rendererDestPath))
})

gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*.ts', ['buildMain'])
  gulp.watch('src/renderer/*', ['buildRenderer'])
})

gulp.task('build', sequence('clean', ['buildMain', 'buildRenderer']))

gulp.task('default', ['watch'])
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

const buildMainProject = () => { 
  return gulp.src('src/**/*.ts')
                                  .pipe(sourcemaps.init())
                                  .pipe(ts.createProject('tsconfig.json')())
                                  .js
                                  .pipe(sourcemaps.write('.'))
                                  .pipe(gulp.dest(mainDestPath))
}

gulp.task('buildRendererProject', () => {
  return gulp.src('src/renderer/**/*').pipe(gulp.dest(rendererDestPath))
})

gulp.task('clean', function() {
  return gulp.src(distDir).pipe(clean())
});

gulp.task('scripts', () => {
  return buildMainProject()
  // return merge(buildMainProject, buildRendererProject)
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('build', sequence('clean', 'scripts', 'buildRendererProject'))

gulp.task('default', ['watch']);
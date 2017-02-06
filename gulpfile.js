'use strict'

const gulp = require('gulp')
const sequence = require('gulp-sequence')
const ts = require('gulp-typescript')
const clean = require('gulp-clean')
const sourcemaps = require('gulp-sourcemaps')
const embedTemplates = require('gulp-angular-embed-templates');

const Builder = require('systemjs-builder')

const merge = require('merge2')
const argv = require('yargs').argv

const distDir = 'dist';
const mainDestPath = distDir
const rendererDestPath = distDir + '/renderer'

const mode = argv.mode || 'debug'

console.log('mode :' + mode)

const mainTsProject = ts.createProject('mainTsConfig.json')
const rendererTsProject = ts.createProject('rendererTsConfig.json')

gulp.task('clean', function() {
  return gulp.src(distDir).pipe(clean())
});

gulp.task('buildMain', () => mainTsProject.src()
            .pipe(sourcemaps.init())
            .pipe(mainTsProject())
            .js
            .pipe(sourcemaps.write('.', {
                sourceRoot: '../src/'
            }))
            .pipe(gulp.dest(mainDestPath))
);

gulp.task('buildRenderer', sequence('copyResources', 'buildRendererTS'))

gulp.task('copyResources', () => gulp.src(['src/renderer/**/*.html', 'src/renderer/**/*.css'])
                                     .pipe(gulp.dest(rendererDestPath))
)

// gulp.task('buildRendererTS', () => rendererTsProject.src()
//             .pipe(sourcemaps.init())
//             .pipe(rendererTsProject())
//             .js
//             .pipe(sourcemaps.write('.', {
//                 sourceRoot: '../src/renderer/'
//             }))
//             .pipe(gulp.dest(rendererDestPath)))

gulp.task('buildRendererTS', () => gulp.src('src/renderer/**/*.ts', {base: 'src/renderer'})
.pipe(rendererTsProject()).js.pipe(gulp.dest(rendererDestPath)))


gulp.task('watch', ['build'], () => {
  gulp.watch('src/**/*', ['build'])
})

gulp.task('build', sequence('clean', ['buildMain', 'buildRenderer']))

gulp.task('default', ['watch'])
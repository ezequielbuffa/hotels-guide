"use strict";

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { src, series, parallel, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();

const jsPath = "js/*.js";
const scssPath = "css/*.scss"
const cssPath = "css/*.css"


function copyHtml() {
  return src('*.html').pipe(gulp.dest('dist'));
}

function imgTask() {
  return src('img/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
}

function jsTask() {
  return src(jsPath, { sourcemap: true })
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(dest('dist/js', { sourcemap: '.' }));
}

function sassTask(){
  return src(scssPath)
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('./css'));
}

function cssTask() {
  return src(cssPath, { sourcemap: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist/css', { sourcemap: '.' }))
}

function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

function browserSyncReload (cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch('*.html', browserSyncReload);
  watch([scssPath, jsPath],series(sassTask,cssTask,jsTask,browserSyncReload));
}

exports.sassTask = sassTask;
exports.cssTask = cssTask;
exports.jsTask = jsTask,
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;

/* Default Gulp Task */
exports.default = series(cssTask, jsTask,  browserSyncServer, watchTask);



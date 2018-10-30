var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var browserSync = require('browser-sync').create();
var run = require('run-sequence');
var del = require('del');


// CSS

gulp.task('style', function() {
  gulp.src('source/less/style.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(minify())
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.stream());
});

// JS

gulp.task('js-del', function() {
  return del('build/js');
});

gulp.task('js', ['js-del'], function() {
  gulp.src('source/js/*.js')
  .pipe(plumber())
  .pipe(uglify()) 
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.stream());
});

// IMAGES 

gulp.task('images', function() {
  return gulp.src('build/img/**/*.{png,jpg,svg}')
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
 .pipe(gulp.dest('build/img'));
});

// WEBP

gulp.task('webp', function() {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest('build/img'));
});

// SVG SPRITE

gulp.task('sprite', function() {
  return gulp.src([
    'source/img/logo-*.svg',
    'source/img/icon-*.svg'
  ])
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
});

// HTML

gulp.task('html', function() {
  return gulp.src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build'));
});

// CLEAN

gulp.task('clean', function() {
  return del('build');
});

// COPY

gulp.task('copy', function() {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**'
    ], {
      base: 'source/'
    })
  .pipe(gulp.dest('build'))
});

// BUILD

gulp.task('build', function(done) {
  run(
    'clean',
    'copy',
    'style',
    'js',
    'images',
    'webp',
    'sprite',
    'html',
    done
  )
});

// BROWSERSYNC

gulp.task('serve', function() {
  browserSync.init({
    proxy: 'pink/',
    notify: false,
    open: true
  });  
  
  gulp.watch('source/less/**/*.less', ['style']).on('change', browserSync.reload);
  gulp.watch('source/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('source/js/*.js', ['js']).on('change', browserSync.reload);
});



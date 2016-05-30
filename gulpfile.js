/**
 * Module dependencies
 */

var autoprefixer = require('autoprefixer-stylus');
var gulp = require('gulp');
var tinypng = require('gulp-tinypng');
var stylus = require('gulp-stylus');
var pug = require('gulp-pug');
var connect = require('gulp-connect');


/**
 * App and path configurations
 */

var config = {
  favicon: {
    src: 'src/favicon.png',
    dest: 'dist'
  },

  images: {
    src: 'src/img/background.{jpg,jpeg}',
    dest: 'dist/img'
  },

  stylus: {
    src: 'src/styl/styles.styl',
    dest: 'dist/css',
    watch: 'src/styl/*.styl'
  },

  pug: {
    src: 'src/index.pug',
    dest: '.'
  }
};


/**
 * Images task
 */

gulp.task('favicon', () => {
  gulp.src(config.favicon.src)
    .pipe(tinypng(process.env.TINYPNG_KEY))
    .pipe(gulp.dest(config.favicon.dest));
});

gulp.task('images', () => {
  gulp.src(config.images.src)
    .pipe(tinypng(process.env.TINYPNG_KEY))
    .pipe(gulp.dest(config.images.dest));
});


/**
 * Stylus task
 */

gulp.task('stylus', () => {
  gulp.src(config.stylus.src)
    .pipe(stylus({
      use: autoprefixer('last 3 versions'),
      compress: true
    }))
    .pipe(gulp.dest(config.stylus.dest))
    .pipe(connect.reload());
});


/**
 * Pug task
 */

gulp.task('pug', () => {
  gulp.src(config.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(config.pug.dest))
    .pipe(connect.reload());
});


/**
 * Serve task
 */

gulp.task('serve', () => {
  connect.server({
    port: 1337,
    livereload: true
  });

  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.pug.src, ['pug']);
});


/**
 * Default task
 */

gulp.task('default', ['serve', 'stylus', 'pug']);
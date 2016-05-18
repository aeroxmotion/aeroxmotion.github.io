var autoprefixer = require('autoprefixer-stylus');
var gulp = require('gulp');
var tinypng = require('gulp-tinypng');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var connect = require('gulp-connect');

var TINYPNG_KEY = 'API_KEY';

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

gulp.task('favicon', () => {
  gulp.src(config.favicon.src)
    .pipe(tinypng(TINYPNG_KEY))
    .pipe(gulp.dest(config.favicon.dest));
});

gulp.task('images', () => {
  gulp.src(config.images.src)
    .pipe(tinypng(TINYPNG_KEY))
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('stylus', () => {
  gulp.src(config.stylus.src)
    .pipe(stylus({
      use: autoprefixer('last 3 versions'),
      compress: true
    }))
    .pipe(gulp.dest(config.stylus.dest))
    .pipe(connect.reload());
});

gulp.task('pug', () => {
  gulp.src(config.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(config.pug.dest))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.pug.src, ['pug']);
});

gulp.task('serve', () => {
  connect.server({
    port: 1337,
    livereload: true
  });
});

gulp.task('default', ['serve', 'stylus', 'pug', 'watch']);
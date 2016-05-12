var autoprefixer = require('autoprefixer-stylus');
var gulp = require('gulp');
var tinypng = require('gulp-tinypng');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

const TINYPNG_KEY = '';

var config = {
  images: {
    src: './src/img/background.{jpg,jpeg}',
    dest: './dist/img'
  },

  stylus: {
    src: './src/styl/styles.styl',
    dest: './dist/css',
    watch: './src/styl/*.styl',
    minify: {
      src: './dist/css/styles.css'
    }
  },

  jade: {
    src: './src/index.jade',
    dest: './'
  }
};

gulp.task('images', () => {
  gulp.src(config.images.src)
    .pipe(tinypng(TINYPNG_KEY))
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('stylus', () => {
  gulp.src(config.stylus.src)
    .pipe(stylus({
      use: autoprefixer('last 3 versions')
    }))
    .pipe(gulp.dest(config.stylus.dest))
    .pipe(connect.reload());
});

gulp.task('minify', () => {
  gulp.src(config.stylus.minify.src)
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.stylus.dest));
});

gulp.task('jade', () => {
  gulp.src(config.jade.src)
    .pipe(jade())
    .pipe(gulp.dest(config.jade.dest))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.stylus.minify.src, ['minify']);
  gulp.watch(config.jade.src, ['jade']);
});

gulp.task('serve', () => {
  connect.server({
    port: 1337,
    livereload: true
  });
});

gulp.task('default', [
  'serve',
  'images',
  'stylus',
  'minify',
  'jade',
  'watch'
]);
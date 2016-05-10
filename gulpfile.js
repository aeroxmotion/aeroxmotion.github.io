var autoprefixer = require('autoprefixer-stylus');
var gulp = require('gulp');
var tinypng = require('gulp-tinypng');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var config = {
  images: {
    key: 'API_KEY',
    src: './src/images/background.{jpg,jpeg}',
    dest: './dist/images'
  },

  coffee: {
    src: './src/coffee/config.coffee',
    dest: './dist/javascripts'
  },

  stylus: {
    src: './src/stylus/styles.styl',
    dest: './dist/stylesheets',
    watch: './src/stylus/*.styl',
    minify: {
      src: './dist/stylesheets/styles.css'
    }
  },

  jade: {
    src: './src/index.jade',
    dest: './'
  }
};

gulp.task('images', () => {
  gulp.src(config.images.src)
    .pipe(tinypng(config.images.key))
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('stylus', () => {
  gulp.src(config.stylus.src)
    .pipe(stylus({
      use: [ autoprefixer('last 3 versions') ]
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
  gulp.watch(config.coffee.src, ['coffee']);
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
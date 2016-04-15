var autoprefixer = require('autoprefixer-stylus');
var gulp = require('gulp');
var tinypng = require('gulp-tinypng');
var coffee = require('gulp-coffee');
var stylus = require('gulp-stylus');
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
    watch: './src/stylus/*.styl'
  },

  jade: {
    src: './src/index.jade',
    dest: './'
  }
};

gulp.task('images', function() {
  gulp.src(config.images.src)
    .pipe(tinypng(config.images.key))
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('coffee', function() {
  gulp.src(config.coffee.src)
   .pipe(coffee())
   .pipe(gulp.dest(config.coffee.dest))
   .pipe(connect.reload());
});

gulp.task('stylus', function() {
  gulp.src(config.stylus.src)
    .pipe(stylus({
      use: [ autoprefixer('last 3 versions') ]
    }))
    .pipe(gulp.dest(config.stylus.dest))
    .pipe(connect.reload());
});

gulp.task('jade', function() {
  gulp.src(config.jade.src)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.dest))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(config.coffee.src, ['coffee']);
  gulp.watch(config.stylus.watch, ['stylus']);
  gulp.watch(config.jade.src, ['jade']);
});

gulp.task('serve', function() {
  connect.server({
    port: 1337,
    livereload: true
  });
});

gulp.task('default', [
  'serve',
  'images',
  'coffee',
  'stylus',
  'jade',
  'watch'
]);
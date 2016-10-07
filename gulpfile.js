'use strict'

/**
 * Module dependencies
 */
const autoprefixer = require('autoprefixer-stylus')
const gulp = require('gulp')
const tinypng = require('gulp-tinypng')
const stylus = require('gulp-stylus')
const pug = require('gulp-pug')
const browserSync = require('browser-sync').create()

/**
 * App and path configurations
 */
const config = {
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
    support: 'last 3 versions',
    dest: 'dist/css',
    watch: 'src/styl/*.styl'
  },

  pug: {
    src: 'src/index.pug',
    dest: '.'
  }
}

/**
 * Images task
 */
gulp.task('favicon', () => {
  gulp.src(config.favicon.src)
    .pipe(tinypng(process.env.TINYPNG_KEY))
    .pipe(gulp.dest(config.favicon.dest))
})

gulp.task('images', () => {
  gulp.src(config.images.src)
    .pipe(tinypng(process.env.TINYPNG_KEY))
    .pipe(gulp.dest(config.images.dest))
})

/**
 * Stylus task
 */
gulp.task('stylus', () => {
  gulp.src(config.stylus.src)
    .pipe(stylus({
      use: autoprefixer(config.stylus.support),
      compress: true
    }))
    .pipe(gulp.dest(config.stylus.dest))
    .pipe(browserSync.stream())
})

/**
 * Pug task
 */
gulp.task('pug', () => {
  gulp.src(config.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(config.pug.dest))
    .pipe(browserSync.stream({
      once: true
    }))
})

/**
 * Serve task
 */
gulp.task('serve', () => {
  browserSync.init({
    server: true,
    port: 1337
  })

  gulp.watch(config.stylus.watch, ['stylus'])
  gulp.watch(config.pug.src, ['pug'])
})

/**
 * Default task
 */
gulp.task('default', ['serve', 'stylus', 'pug'])
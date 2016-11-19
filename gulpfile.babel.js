import autoprefixer from 'autoprefixer-stylus'
import gulp from 'gulp'
import tinypng from 'gulp-tinypng'
import stylus from 'gulp-stylus'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'

const server = browserSync.create()

/**
 * App and path configurations
 */
const config = {
  favicon: {
    src: 'src/favicon.png',
    dest: 'dist/'
  },

  images: {
    src: 'src/img/background.{jpg,jpeg}',
    dest: 'dist/img/'
  },

  stylus: {
    src: 'src/styl/styles.styl',
    support: 'last 3 versions',
    dest: 'dist/css/',
    watch: 'src/styl/*.styl'
  },

  pug: {
    src: 'src/index.pug',
    dest: './'
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
    .pipe(server.stream())
})

/**
 * Pug task
 */
gulp.task('pug', () => {
  gulp.src(config.pug.src)
    .pipe(pug())
    .pipe(gulp.dest(config.pug.dest))
    .pipe(server.stream({
      once: true
    }))
})

/**
 * Serve task
 */
gulp.task('serve', () => {
  server.init({
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
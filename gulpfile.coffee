# gulpfile.coffee: build script for front assets
#
# gulp        - build assets
# gulp watch  - build assets continuously

sources =
  main:     'app/sources/js/boot.js'
  js:       'app/sources/js/**/*.js'
  css:      'app/sources/css/**/*.css'
  static:   ['app/sources/static/**/*']

dist =
  deploy:   'app/publish'

del         = require 'del'
gulp        = require 'gulp'
gutil       = require 'gulp-util'
concat      = require 'gulp-concat'
coffee      = require 'gulp-coffee'
plumber     = require 'gulp-plumber'
uglify      = require 'gulp-uglify'
streamify   = require 'gulp-streamify'
source      = require 'vinyl-source-stream'
browserify  = require 'browserify'
babelify    = require 'babelify'

gulp.task 'default', ['clean'], ->
  gulp.start 'compile:js', 'compile:css', 'compile:static'

gulp.task 'clean', (cb) ->
  del dist.deploy, {force:true}, cb

gulp.task 'watch', ->
  gulp.watch sources.js,     ['compile:js']
  gulp.watch sources.css,    ['compile:css']
  gulp.watch sources.static, ['compile:static']


gulp.task 'compile:js', ->
  browserify sources.main
    .transform babelify, {presets: ['es2015', 'react']}
    .bundle()
    .on 'error', (err) ->
      console.log gutil.colors.red "Oops! you have ERROR! \n" + err.message
      this.emit 'end'
    .pipe source "app.js"
    # .pipe streamify uglify()
    .pipe gulp.dest dist.deploy

gulp.task 'compile:css', ->
  gulp.src sources.css
    .pipe plumber()
    .pipe concat 'app.css'
    .pipe gulp.dest dist.deploy

gulp.task 'compile:static', ->
  gulp.src sources.static
    .pipe gulp.dest dist.deploy
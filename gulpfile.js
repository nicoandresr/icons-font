var gulp = require('gulp');
var async = require('async');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');

gulp.task('Iconfont', function(done){
  var iconStream = gulp.src(['assets/icons/*.svg'])
    .pipe(iconfont({ fontName: 'myfont' }));

  async.parallel([
    function handleGlyphs (cb) {
      iconStream.on('glyphs', function(glyphs, options) {
        gulp.src('templates/myfont.css')
          .pipe(consolidate('lodash', {
            glyphs: glyphs,
            fontName: 'myfont',
            fontPath: '../fonts/',
            className: 'ys'
          }))
          .pipe(gulp.dest('www/css/'))
          .on('finish', cb);
      });
    },
    function handleFonts (cb) {
      iconStream
        .pipe(gulp.dest('www/fonts/'))
        .on('finish', cb);
    }
  ], done);
});

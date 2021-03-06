      'use strict';

var gulp = require('gulp');

gulp.task('watch', ['config', 'wiredep', 'injector:css', 'injector:js'], function() {
  gulp.watch('src/{app,components}/**/*.css', ['injector:css']);
  gulp.watch('src/{app,components}/**/*.js', ['injector:js']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('bower.json', ['config', 'wiredep']);
});

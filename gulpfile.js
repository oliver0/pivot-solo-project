var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    cssmin  = require('gulp-minify-css'),
    rename  = require("gulp-rename"),
    sass    = require('gulp-sass'),
    uglify  = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    bs      = require('browser-sync').create();

gulp.task('default', ['nodemon']);


// browserSync task
gulp.task('browserSync', function() {
  bs.init(null, {
    notify: false,
    proxy: 'http://localhost:3000',
    port: 5000,
    ui: {
      port: 5001
    }
  });
});

// nodemon task
gulp.task('nodemon', ['browserSync'], function() {
  return nodemon({
    script: 'server/app.js',
    ext: 'html js',
    ignore: 'gulpfile.js'
  }).on('start', function() {
    setTimeout(function() {
      bs.reload();
    }, 1000);
  });
});

// // scripts task
// gulp.task('scripts', function() {
//   return gulp.src('./src/js/*.js')
//     .pipe(concat('app.js'))
//     .pipe(gulp.dest('./dist/js/'))
//     .pipe(uglify())
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest('./dist/js/'));
// });
//
// // styles task
// gulp.task('styles', function() {
//   return gulp.src('./src/sass/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./dist/css/'))
//     .pipe(cssmin())
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest('./dist/css/'));
// });
//
// // watch task
// gulp.task('watch', function() {
//   gulp.watch('./src/js/*.js', ['scripts']);
//   gulp.watch('./src/sass/*.scss', ['styles']);
// });

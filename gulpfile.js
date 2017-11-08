var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano');
    imagemin = require('gulp-imagemin');
    autoprefixer = require('gulp-autoprefixer');

var jsSources = ['scripts/*.js'],
    sassSourcesAll = ['styles/*.scss'],
    sassSources = ['styles/style.scss']
    htmlSources = ['*.html'],
    bodymovinSources = ['bodymovin/*.json'],
    bodymovinOutput = 'production/bodymovin',
    audioSources = ['audio/*'],
    audioOutput = 'production/audio',
    outputDir = 'production';


gulp.task('log', function() {
  gutil.log('== My First Task ==')
});

gulp.task('copy', function() {
  gulp.src(htmlSources)
  .pipe(gulp.dest(outputDir));
  gulp.src(bodymovinSources)
  .pipe(gulp.dest(bodymovinOutput));
  gulp.src(audioSources)
  .pipe(gulp.dest(audioOutput));
  
});

gulp.task('sass', function() {
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
    .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
    .pipe(cssnano())
  .pipe(gulp.dest('production'))
  .pipe(connect.reload())
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest(outputDir))
  .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(sassSourcesAll, ['sass']);
  gulp.watch(htmlSources, ['copy']);
  gulp.watch(bodymovinSources, ['copy']);
  gulp.watch(audioSources, ['copy']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'production',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(htmlSources)
  .pipe(connect.reload())
});

gulp.task('imagemin', function() {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest(outputDir + '/images'))
});

gulp.task('default', ['copy', 'html', 'js', 'sass', 'connect', 'watch']);

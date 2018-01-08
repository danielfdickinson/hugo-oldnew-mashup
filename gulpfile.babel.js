'use strict';

var gulp = require("gulp");
var babel_register = require('babel-register');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var rename = require('gulp-rename');
var fs = require('graceful-fs');
var yarn = require('gulp-yarn');
var evstr = require('event-stream');
var tar = require('gulp-tar');
var gzip = require('gulp-gzip');
var zip = require('gulp-zip');
var jshint= require('gulp-jshint');
var eslint = require('gulp-eslint');
var csslint = require('gulp-csslint');
var postcss = require('gulp-postcss');
var cssImport = require('postcss-import');
var cssnext = require('postcss-cssnext');

gulp.task('yarn', function (done) {
  return evstr.concat(
    gulp.src(['./modules/package.json'])
      .pipe(gulp.dest('./modules'))
      .pipe(yarn({
        production: true,
        flat: true,
        noBinLinks: true,
        ignoreScripts: true,
        nonInteractive: true}))
  )
});

gulp.task('js', ['js-test'], function () {
  var pkg = JSON.parse(fs.readFileSync('./package.json'));
  return evstr.concat(
    gulp.src([
      "src/base/*.js",
      "src/modules/*/src/**/*.js",
      "!**/*.min.js",
      "!**/*-min.js"
    ])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest("dist/separated/js"))
    .pipe(concat(pkg.name + ".js"))
    .pipe(gulp.dest("dist/js"))
    .pipe(babel({ "presets": ['minify'] }))
    .pipe(rename({extname: '-min.js'}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
  );
});

gulp.task('release', ['js'], function() {
  var pkg = JSON.parse(fs.readFileSync('./package.json'));
  return evstr.concat(
    gulp.src([
      "dist/**/*.js",
      "!dist/**/*-min.js",
    ])
   .pipe(rename({basename: pkg.name + "-" + pkg.version}))
   .pipe(gulp.dest('release/' + pkg.name + '-' + pkg.version + '/')),
  gulp.src([
      "dist/**/*-min.*",
    ])
   .pipe(rename({basename: pkg.name + "-" + pkg.version + '-min'}))
   .pipe(gulp.dest('release/' + pkg.name + '-' + pkg.version + '/')),
  gulp.src([
    "release/" + pkg.name + "-" + pkg.version + '/'
  ])
    .pipe(tar(pkg.name + "-" + pkg.version + '.tar'))
    .pipe(gzip())
    .pipe(gulp.dest('release')),
  gulp.src([
    "release/" + pkg.name + "-" + pkg.version + '/'
  ])
    .pipe(zip(pkg.name + "-" + pkg.version + '.zip'))
  );
});

gulp.task('css', ['css-test'], function(done) {
  var plugins = [
     cssImport({path: ["src/css/imports"]}),
     cssnext()
  ]
  return evstr.concat(
    gulp.src([
      "src/css/modules/normalize.css/normalize.css",
      "src/css/base/**/*.css",
   ])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins,{
       browsers: ['>0%']
     }))
    .pipe(gulp.dest('dist/separated/css'))
    .pipe(concat("base.css"))
    .pipe(gulp.dest("dist/css/"))
    .pipe(sourcemaps.write(".")),
  gulp.src([
      "src/css/base-modern/**/*.css",
   ])
    .pipe(sourcemaps.init())
    .pipe(postcss(plugins,{
       browsers: ['>5%']
     }))
    .pipe(gulp.dest('dist/separated/css'))
    .pipe(concat("base-modern.css"))
    .pipe(gulp.dest("dist/css/"))
    .pipe(sourcemaps.write(".")),
  gulp.src([
      "src/css/base-ie8/**/*.css",
   ])
    .pipe(postcss(plugins,{
       browsers: ['>0%']
     }))
    .pipe(gulp.dest('dist/separated/css'))
    .pipe(concat("base-ie8.css"))
    .pipe(gulp.dest("dist/css/"))
  );
});

gulp.task('js-test', function(done) {
  return evstr.concat(
    gulp.src([
      "src/js/base/**/*.js"
    ])
      .pipe(babel())
      .pipe(gulp.dest("build/lint/js"))
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(jshint.reporter('fail'))
      .pipe(eslint({useElintrc: true, rules: {
         'indent': 0
       }}))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
  );
});

gulp.task('css-test', ['yarn'], function(done) {
  var plugins = [
     cssImport({path: ["src/css/imports"]}),
     cssnext()
  ]
  return evstr.concat(
    gulp.src([
      "src/css/modules/normalize.css/normalize.css",
      "src/css/base/**/*.css",
      "src/css/base-modern/**/*.css"
   ])
    .pipe(postcss(plugins,{
       browsers: ['>1%']
   }))
    .pipe(gulp.dest("build/lint/css"))
    .pipe(csslint())
    .pipe(csslint(csslint.formatter('fail')))
  );
});

gulp.task('test', ['js-test','css-test']);
gulp.task('build', ['js','css']);
gulp.task("default", ['test','build']);

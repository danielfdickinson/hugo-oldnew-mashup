var gulp = require("gulp");
var babel = require("gulp-babel");
var babel_register = require('babel-register');
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var fs = require("graceful-fs");
var rename = require('gulp-rename');
var yarn = require('gulp-yarn');
var evstr = require('event-stream');


gulp.task("yarn", function(done) {
  return evstr.concat(
    gulp.src(['./modules/package.json'])
      .pipe(gulp.dest('./modules'))
      .pipe(yarn({
        production: true,
        flat: true,
        noBinLinks: true,
        ignoreScripts: true,
        nonInteractive: true
    })),
    gulp.src(['./local-modules/cshore-styling-tools/modules/package.json'])
      .pipe(gulp.dest('./local-modules/cshore-styling-tools/modules'))
      .pipe(yarn({
        production: true,
        flat: true,
        noBinLinks: true,
        ignoreScripts: true,
        nonInteractive: true
    }))
  );
});

gulp.task("js", ['yarn'], function (done) {
  return evstr.concat(
    gulp.src([
      "src/**/.js",
      "static-src/**/*.js",
      "local-modules/*/src/**/*.js",
      "local-modules/*/modules/node_modules/**/*.js",
      "!**/*.min.js",
      "!**/*-min.js"
     ])
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat("all.js"))
      .pipe(gulp.dest("dist/js"))
      .pipe(babel({ "presets": ['minify'] }))
      .pipe(rename({extname: '-min.js'}))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/js"))
  );
});

gulp.task("build", ["js"], function (done) {
  var pkg = JSON.parse(fs.readFileSync('./package.json'));
  return evstr.concat(
    gulp.src([
      "dist/**/*.css",
      "dist/**/*.js",
      "!dist/**/*.min.*",
      "!dist/**/*-min.*"
   ])
    .pipe(gulp.dest('static/'))
    .pipe(rename({basename: pkg.name + "-" + pkg.version}))
    .pipe(gulp.dest('release/' + pkg.name + "-" + pkg.version + "/")),
   gulp.src([
      "dist/**/*.min.*",
      "dist/**/*-min.*"
   ])
    .pipe(rename({basename: pkg.name + "-" + pkg.version + "-min"}))
    .pipe(gulp.dest('release/' + pkg.name + "-" + pkg.version + "/")),
   gulp.src([
      "static-src/**",
   ])
    .pipe(gulp.dest('static'))
    .pipe(gulp.dest('release/' + pkg.name + "-" + pkg.version + "/")),
 );
});

gulp.task("default", ['build']);

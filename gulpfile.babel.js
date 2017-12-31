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
    gulp.src(["src/**/*.js","local-modules/src/**/*.js","local-modules/node_modules/*/src/**/*.js","!**/*.min.js","!**/*-min.js"])
     .pipe(sourcemaps.init())
     .pipe(babel())
     .pipe(concat("all.js"))
     .pipe(gulp.dest("static"))
     .pipe(babel({ "presets": ['minify'] }))
     .pipe(rename({extname: '-min.js'}))
     .pipe(sourcemaps.write("."))
     .pipe(gulp.dest("static"))
  )
});

gulp.task("default", ['js','css']);

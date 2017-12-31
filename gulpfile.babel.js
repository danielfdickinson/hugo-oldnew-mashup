var gulp = require("gulp");
var babel = require("gulp-babel");
var babel_register = require('babel-register');
var concat = require("gulp-concat");
var sourcemaps = require("gulp-sourcemaps");
var require_dir = require("require-dir");
var fs = require("graceful-fs");
var process = require("process");
import { execSync } from 'child_process';
var runSequence = require('run-sequence');
var rename = require('gulp-rename');

gulp.task("build_modules", function(done) {
  var moduleDirs;
  var moduleDir;
  var err = null;
  var errOut = null;
  var olddir;
  moduleDirs = fs.readdirSync("./modules");
  if (moduleDirs) {
    errOut = moduleDirs.forEach(function(moduleDir, index) {
      olddir = process.cwd();
      try {
        process.chdir("./modules/" + moduleDir.toString());
        fs.accessSync('package.json')
        execSync("yarn install");
        try {
          fs.accessSync('gulpfile*.js');
          err = execSync("gulp");
        } catch (err) {
           errOut = err
        }
        if (errOut) {
          try {
            errOut = null;
            fs.accessSync('Gruntfile.js');
            err = execSync("grunt");
          } catch (err) {
            errOut = "Neither gulpfile*.js nor Gruntfile.js accessible";
          }
          err = errOut;
        }
        if (err) {
          errOut = err.toString();
          return errOut;
        }
      } catch (err) {
        errOut = err.toString();
      }
      process.chdir(olddir);
    });
    done(errOut);
  } else {
    done("No submodules found.");
  }
});

gulp.task("js", function () {
  runSequence
  return gulp.src(["src/**/*.js","modules/*/src/**/*.js","modules/*/modules/*/src/*.js","!**/*.min.js","!**/*-min.js"])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("static"))
    .pipe(babel({ "presets": ['minify'] }))
    .pipe(rename({extname: '-min.js'}))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("static"));
});

gulp.task("default", function () {
  runSequence(
    'build_modules',
    'js'
  );
});

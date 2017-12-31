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
var glob = require('glob');

gulp.task("build_modules", function(done) {
  var moduleDirs;
  var moduleDir;
  var err = null;
  var err2 = null;
  var olddir;
  var files;
  moduleDirs = fs.readdirSync("./modules");
  if (moduleDirs) {
    var errOut = moduleDirs.forEach(function(moduleDir, index) {
      olddir = process.cwd();
      try {
        process.chdir("./modules/" + moduleDirs.toString());
        files = glob.sync('package.json');
        if (typeof files!= "undefined" && files != null && files.length > 0) {
          execSync("yarn install");
          files = glob.sync('gulpfile*.js');
          if (typeof files!= "undefined" && files != null && files.length > 0) {
            errOut = execSync("gulp");
          } else {
            files = glob.sync('Gruntfile*.js');
            if (typeof files!= "undefined" && files != null && files.length > 0) {
              errOut = execSync("grunt");
            } else {
              errOut = "Neither gulpfile*.js not Gruntfile.js exist";
            }
            err = errOut;
          }
        } else {
          console.log("Didn't find package.json");
        }
        if (err) {
          err2 = err.toString();
        }
        console.log(err2);
      } catch (err) {
        err2= err.toString();
      }
      process.chdir(olddir);
      if (err2) {
        return err2;
      } else {
        return null;
      }
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

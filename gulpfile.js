"use strict";

var gulp = require('gulp');

// Include Our Plugins

var browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    tslint = require("gulp-tslint"),
    ts = require("gulp-typescript"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    merge = require('merge-stream'),
    cssmin = require('gulp-cssmin'),
    dts = require('dts-bundle').bundle,
    util = require('gulp-util');

var tsProject = ts.createProject("tsconfig.json");
var tsTestProject = ts.createProject("tsconfig.json");

gulp.task("build-app", function() {
    return gulp.src([
            "src/**/**.ts",
            "typings/main.d.ts/"
        ])
        .pipe(sourcemaps.init())
        .pipe(tsProject()).pipe(sourcemaps.write('.')).pipe(gulp.dest('./obj/'));
});

gulp.task('definitions', function(done) {
    dts({
        name: 'codenodes',
        baseDir: 'obj/',
        main: './obj/codenodes.d.ts',
        out: '../types/codenodes.d.ts'
    });
    done();
});


// Lint Task
gulp.task("lint", function() {
    return gulp.src([
            "src/**/**.ts",
            "test/**/**.test.ts"
        ])
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task("bundle", ["build-app"], function() {

    var libraryName = "codenodes";
    var mainTsFilePath = "obj/codenodes.js";
    var outputFolder = "dist/";
    var outputFileName = "codenodes.js";
    var outputFileNameMin = "codenodes.min.js";

    var bundler = browserify({
        debug: false,
        standalone: libraryName
    });
    var b2 = browserify({
        debug: false,
        standalone: libraryName
    });
    var s1 = b2.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(gulp.dest(outputFolder));
    var s2 = bundler.add(mainTsFilePath)
        .bundle()
        .pipe(source(outputFileNameMin))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(outputFolder));


    return merge(s1, s2);
});


gulp.task('less', function() {
    return gulp.src('src/codenodes.less')
        .pipe(less({ style: 'compressed' }).on('error', util.log))
        //.pipe(autoprefix('last 10 version'))
        .pipe(gulp.dest("./dist/"))
        .pipe(cssmin().on('error', util.log))
        .pipe(rename('codenodes.min.css'))
        .pipe(gulp.dest("./dist/"));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(["src/**/**.ts"], ["lint", "bundle"]);
    gulp.watch('src/codenodes.less', ['less']);
});

// Default Task
gulp.task('default', ["lint", "definitions", "bundle", "less"]);
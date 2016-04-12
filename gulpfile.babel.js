var gulp = require('gulp');
var babel = require('gulp-babel');

var fs = require('fs');
var babelify = require('babelify');
var browserify = require('browserify');

var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();

// default task
gulp.task('default', function ()
{
    gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('build'));

    var bundler = browserify('build/Tetris.js');
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err)
        {
            console.error(err);
        })
        .pipe(fs.createWriteStream('bundle/bundle.js'));

});

// configure the jshint task to check source JS files for errors
gulp.task('jshint', function ()
{
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

//gulp.watch('src/**/*.js', ['jshint']);

// files change watcher
gulp.task('watch', function()
{
    gulp.watch('src/**/*.js', ['jshint', 'default']);
});

//reloads browser page when watch processed
gulp.task('js-watch', ['watch'], browserSync.reload);

gulp.task('serve', ['watch'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch("bundle/**/*.js", ['js-watch']);
});

// open browsers page with browser-sync plugin
gulp.task('browserSync', function ()
{
    browserSync.init({
        server: {
            // Serve files from the root of this project
            baseDir: './'
        },
    })
});

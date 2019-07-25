let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let changed = require('gulp-changed');
let htmlReplace = require('gulp-html-replace');
let htmlMin = require('gulp-htmlmin');
let del = require('del');
let sequence = require('run-sequence');

let config = {
    dist: 'docs/',
    src: 'src/',
    cssin: 'src/css/**/*.css',
    jsin: 'src/js/**/*.js',
    jspluginsin: 'src/js/',
    imgin: 'src/img/**/*.{jpg,jpeg,png,gif,svg,ico}',
    htmlin: 'src/*.html',
    scssin: 'src/scss/**/*.scss',
    fontin: 'src/fonts/*.{eot,ttf,woff,woff2}',
    fontout: 'docs/fonts',
    cssout: 'docs/css/',
    jsout: 'docs/js/',
    imgout: 'docs/img/',
    htmlout: 'docs/',
    scssout: 'src/css/',
    cssoutname: 'style.css',
    jsoutname: 'script.js',
    jsplugin: 'plugins.js',
    cssreplaceout: 'css/style.css',
    jsreplaceout: 'js/script.js'
};

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', ['sass', 'jsPlugins'], function() {
    browserSync({
        server: config.src
    });

    gulp.watch([config.htmlin, config.jsin], ['reload']);
    gulp.watch(config.scssin, ['sass']);
});

gulp.task('sass', function() {
    return gulp.src(config.scssin)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scssout))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src(config.cssin)
        .pipe(concat(config.cssoutname))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.cssout));
});

gulp.task('fonts', function() {
    return gulp.src(config.fontin)
        .pipe(gulp.dest(config.fontout));
});

gulp.task('jsPlugins', function () {
   return gulp.src([
       './node_modules/jquery/docs/jquery.min.js',
       './node_modules/jquery-ui-docs/jquery-ui.min.js'
   ])
       .pipe(concat(config.jsplugin))
       .pipe(gulp.dest(config.jspluginsin));
});

gulp.task('js', function() {
    return gulp.src([
        config.jsin
    ])
        .pipe(concat(config.jsoutname))
        .pipe(gulp.dest(config.jsout));
});

gulp.task('img', function() {
    return gulp.src(config.imgin)
        .pipe(changed(config.imgout))
        .pipe(imagemin())
        .pipe(gulp.dest(config.imgout));
});

gulp.task('html', function() {
    return gulp.src(config.htmlin)
        .pipe(htmlReplace({
            'css': config.cssreplaceout,
            'js': config.jsreplaceout
        }))
        .pipe(htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.dist))
});

gulp.task('clean', function() {
    return del([config.dist]);
});

gulp.task('build', function() {
    sequence('clean', ['html', 'js', 'css', 'fonts', 'img']);
});

gulp.task('default', ['serve']);

'use strict';

//import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import del from 'del';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import fs from 'fs';


/*var getManifest = function () {
   return JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
};*/

const getManifest = ()=>{
    console.log("get manifest start..!!!");
    return JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));
};

const setManifest = ()=>{
    console.log("setmanifest start..!!");
    let tmp = JSON.stringify(getManifest());
    return fs.writeFileSync('./dist/manifest.json', tmp, 'utf8');
};


const setManifest = ()=>{
    let manifestTmp = getManifest();


};

gulp.task('default', ['clean','webpack','css','html', 'assets', 'watch'], () => {
    return gutil.log('Gulp is running');
});

// 디렉토리 정의 : 소스/빌드 디렉토리를 담은 객체
const DIR = {
    SRC: 'src',
    DEST: 'dist'
};

const SRC = {
    JS: DIR.SRC + '/js/*.js',
    CSS: DIR.SRC + '/css/*.css',
    HTML: DIR.SRC + '/*.html',
    ASSETS: DIR.SRC + '/assets/*'
};

const DEST = {
    JS: DIR.DEST + '/js',
    CSS: DIR.DEST + '/css',
    HTML: DIR.DEST + '/',
    ASSETS: DIR.DEST + '/assets'
};

// task 정의
/*gulp.task('js', () => {
    return gulp.src(SRC.JS)
           .pipe(uglify())
           .pipe(gulp.dest(DEST.JS));
});*/

gulp.task('css',() => {
    return gulp.src(SRC.CSS)
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(DEST.CSS));
});

gulp.task('html', () => {
    return gulp.src(SRC.HTML)
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest(DEST.HTML))
});

gulp.task('assets', () => {
    return gulp.src(SRC.ASSETS)
           .pipe(imagemin())
           .pipe(gulp.dest(DEST.ASSETS));
});

gulp.task('webpack', () => {
    return gulp.src('src/js/test.js')
           .pipe(webpack(webpackConfig))
           .pipe(gulp.dest('./dist/js'));
});

gulp.task('manifUpdate', ()=>{

});

gulp.task('clean', () => {
    return del.sync([DIR.DEST]);
});

gulp.task('watch', () => {
    let watcher = {
        //js : gulp.watch(SRC.JS, ['js']),
        webpack: gulp.watch(SRC.JS, ['webpack']),
        css : gulp.watch(SRC.CSS, ['css']),
        html : gulp.watch(SRC.HTML, ['html']),
        assets : gulp.watch(SRC.ASSETS, ['assets'])
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});

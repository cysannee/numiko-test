var gulp = require('gulp'),
	util = require('gulp-util'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync'),
	reload = browserSync.stream;

var config = {
	scss: 'src/css/style.scss',
	production: !!util.env.production
};

// Sass
gulp.task("sass", function () {
	gulp.src(config.scss)
		.pipe(plumber())
		.pipe(config.production ? util.noop() : sourcemaps.init())
		.pipe(config.production ?
			sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError) :
			sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', '> 1%'],
			cascade: false
		}))
		.pipe(config.production ? util.noop() : sourcemaps.write())
		.pipe(gulp.dest('dist/css'))
		.pipe(reload())
});

// BrowserSync
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

// Watching
gulp.task('watch', function () {
	gulp.watch('src/css/**/*.scss', ['sass'])
});


// Default Task
gulp.task('default', ['sass', 'browser-sync', 'watch']);
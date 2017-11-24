'use strict';


// Include libs
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


// File paths
var cssPaths = 'app/css/scss/**/*.scss';
var jsPaths = [
	'app/js/src/lib/jquery.min.js',
	'app/js/src/lib/jquery.zoom.min.js',
	'app/js/src/lib/angular.js',
	'app/js/src/lib/angular-route.js',

	'app/js/src/routes.js',
	'app/js/src/controllers.js',
	'app/js/src/directives.js',
];


gulp.task('css', function() {
	gulp.src(cssPaths)
		.pipe(sourcemaps.init())

		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		// .pipe(sass().on('error', sass.logError))

    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/app/css/scss'}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('js', function(){
	gulp.src(jsPaths, { base: 'src' })
		.pipe(sourcemaps.init())
			.pipe(concat('app.js'))
			.pipe(uglify({ mangle: false }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/js'));
});

gulp.task('watch', function () {
	gulp.watch(cssPaths, ['css']);
	gulp.watch(jsPaths, ['js']);
});


gulp.task('default', ['watch', 'css', 'js']);
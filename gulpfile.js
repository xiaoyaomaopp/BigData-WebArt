var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require("vinyl-source-stream");
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var concat = require('gulp-concat');

var server = require('gulp-express');


gulp.task('vendor-css', function() {
	gulp.src('node_modules/bootstrap/dist/fonts/*.*')
		.pipe(gulp.dest('public/fonts'));

	return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/animate.css/animate.css',
			'self_modules/mCustomScrollbar/3.0.2/jquery.mCustomScrollbar.css'
		])
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('public/css'));

});


/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', ['vendor-css'], function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
			'node_modules/headroom.js/dist/headroom.js',
			'node_modules/headroom.js/dist/jQuery.headroom.js',
			'node_modules/qrcodejs/qrcode.js',
			'node_modules/jweixin/jweixin-1.0.0.js',
			'self_modules/jquery-ui-1.12.1/jquery-ui.min.js',
			'self_modules/mousewheel/3.1.11/jquery.mousewheel.min.js',
			'self_modules/mCustomScrollbar/3.0.2/jquery.mCustomScrollbar.js'
	]).pipe(concat('vendor.js'))
		//.pipe(gulpif(production, uglify({mangle: false})))
		.pipe(gulp.dest('public/js'));
});

var dependencies = [
	'alt',
	'react',
	'react-router'
];

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
	return browserify()
		.require(dependencies)
		.bundle()
		.pipe(source('vendor.bundle.js'))
		//.pipe(gulpif(production, streamify(uglify({mangle: false}))))
		.pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */

gulp.task('browserify', ['browserify-vendor'], function() {
	return browserify('app/main.js')
		.external(dependencies)
		.transform(babelify, {
			presets: ['es2015', 'react', 'stage-0']
		})
		.bundle()
		.pipe(source('bundle.js'))
		//.pipe(gulpif(production, streamify(uglify({mangle: false}))))
		.pipe(gulp.dest('public/js'));
});

gulp.task('styles', function() {
	return gulp.src(['app/stylesheets/*.less','app/stylesheets/*.css'])
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer())
		//.pipe(gulpif(production, cssmin()))
		.pipe(gulp.dest('public/css'));
});


gulp.task('build', ['styles', 'vendor', 'browserify']);


gulp.task('watch', ['build'], function() {
	gulp.watch('app/**/*.*', ['build']);
});


gulp.task('server', ['watch'], function() {
	process.env.NODE_ENV = 'development';
	process.env.debug = 'bigdata-web:*';
	// Start the server at the beginning of the task
	server.run(['./bin/www']);
	gulp.watch('public/**/bundle.js', server.notify);
	gulp.watch('public/**/*.css', server.notify);
	gulp.watch(['app.js', 'routes/**/*.js'], server.run);
})


gulp.task('run', ['watch'], function() {
	// Start the server at the beginning of the task
	server.run(['./bin/www']);
})
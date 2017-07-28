/**
 * -------------------------------
 * 모듈 호출
 * -------------------------------
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sassdoc = require('sassdoc'),
    imagemin  = require('gulp-imagemin'),
    spritesmith  = require('gulp.spritesmith'),
    sourcemaps = require('gulp-sourcemaps'),
    merge = require('merge-stream'),
    del = require('del'),
    browserSync  = require('browser-sync'),
    reload = browserSync.reload;

/**
 * -------------------------------
 * 경로 담은 객체
 * -------------------------------
 */
const DIR = {
  SRC   : 'project/src',
  DIST  : 'project/dist'
};
const SRC = {
  JS    : DIR.SRC + '/js/**/*.js',
  CSS   : DIR.SRC + '/stylesheets/**/*.scss',
  HTML  : DIR.SRC + '/html/**/*.html',
  IMAGES: DIR.SRC + '/images/**/*'
};
const DIST = {
  JS    : DIR.DIST + '/js',
  CSS   : DIR.DIST + '/css', 
  HTML  : DIR.DIST + '/html',
  IMAGES: DIR.DIST + '/images'
}

/**
 * -------------------------------
 * config : 각 플러그인 옵션 설정
 * -------------------------------
 */
var config = {
  // Reference : https://github.com/kangax/html-minifier#options-quick-reference
  'html': {
    /**
     * outputStyle (Type : Boolean  , Default : false)
     * CSS의 컴파일 결과 코드스타일 지정
     */
    collapseWhitespace: 'true'
    /**
     * outputStyle (Type : Boolean  , Default : false)
     * 스타일 요소 및 스타일 속성에서 css 축소(clean-css 사용)
     */
    //minifyCSS: 'true',
    /**
     * outputStyle (Type : Boolean  , Default : false)
     * 스크립트 요소 및 이벤트 속성에서 javascript 최소화(uglify js 사용)
     */
    //minifyJS: 'true'
  },
  // Reference : https://github.com/sass/node-sass#options
  'sass': {
    /**
     * outputStyle (Type : String  , Default : nested)
     * CSS의 컴파일 결과 코드스타일 지정
     * Values : nested, expanded, compact, compressed
     */
    outputStyle: 'expanded'
    /**
     * indentType (>= v3.0.0 , Type : String , Default : space)
     * 컴파일 된 CSS의 "들여쓰기" 의 타입
     * Values : space , tab
     */
    // indentType: 'space',
    /**
     * indentWidth (>= v3.0.0, Type : Integer , Default : 2)
     * 컴파일 된 CSS의 "들여쓰기" 의 갯수
     */
    // indentWidth: 2,
    /**
     * precision (Type :  Integer , Default : 5)
     * 컴파일 된 CSS의 소수점 자리수.
     */
    // precision: 5,
    /**
     * sourceComments (Type : Boolean , Default : false)
     * 컴파일 된 CSS에 원본소스의 위치와 줄수 주석표시.
     */
    // sourceComments: false
  },
  // Reference : https://github.com/postcss/autoprefixer#options
  // 브라우저 리스트 참고 : https://github.com/ai/browserslist#queries
  'autoprefixer': {
    // 지원 브라우저 체크
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  },
  'sassdoc': {
    verbose: true
  },
  // Browser-sync
  // Reference: http://www.browsersync.io/docs/options/
	'browserSync': { 
		server  : {
      baseDir   : DIR.DIST,
      directory : true
    },
    port    : 8080,
    // Don't show any notifications in the browser.
		notify  : false
	}
}

/**
 * -------------------------------
 * task : HTML | html minify
 * -------------------------------
 */
gulp.task('html', function() {
  return gulp.src(SRC.HTML)
             .pipe(htmlmin(config.html))
             .pipe(gulp.dest(DIST.HTML))
             .pipe(reload({stream: true}));
});

/**
 * -------------------------------
 * task : JS
 * -------------------------------
 */
gulp.task('js', function() {
  return gulp.src(SRC.JS)
             .pipe(uglify())
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest(DIST.JS))
             .pipe(reload({stream: true}));
});

/**
 * -------------------------------
 * task : CSS | sass 컴파일, sassdoc, sourcemap
 * -------------------------------
 */
gulp.task('sass', function() {
  return gulp.src(SRC.CSS)
             .pipe(sourcemaps.init())
             .pipe(sassdoc(config.sassdoc))
             .pipe(sass(config.sass).on('error', sass.logError))
             .pipe(autoprefixer(config.autoprefixer))
             .pipe(sourcemaps.write('./maps'))
             .pipe(gulp.dest(DIST.CSS))
             .pipe(reload({stream: true}));
});
/**
 * -------------------------------
 * task : IMAGE
 * -------------------------------
 */
// task : IMG 파일 minify해서 dist 폴더에 넣기 
gulp.task('images', ['sprite'], function() {
  return gulp.src([SRC.IMAGES, '!' + DIR.SRC + '/images/sprites/*'])
             .pipe(imagemin())
			       .pipe(gulp.dest(DIST.IMAGES));
});

// task : 스프라이트 이미지 생성
gulp.task('sprite', function() {
	var spriteData = gulp.src(DIR.SRC + '/images/sprites/*.png')
                       .pipe( spritesmith({
                         'imgName' : '../images/sprites/sprite.png',
                         'cssName' : '_sprite.scss'
                       }) );

	// return spriteData.pipe( gulp.dest('dist') );
	var imgStream = spriteData.img.pipe(gulp.dest(DIST.IMAGES));
	var cssStream = spriteData.css.pipe(gulp.dest(DIR.SRC + '/stylesheets'));

	return merge(imgStream, cssStream);
});

// task : clean | 이전 dist 폴더의 파일 삭제
gulp.task('clean', function() {
  return del.sync([DIR.DIST]);
});

// task : watch | 관찰할 업무 지정
gulp.task('watch', function() {
  gulp.watch(SRC.JS, ['js']);
  gulp.watch(SRC.CSS, ['sass']);
  gulp.watch(SRC.HTML, ['html']);
  gulp.watch([SRC.IMAGES, '!' + DIR.SRC + '/images/sprites/*'], ['images']);
  gulp.watch(DIR.SRC + '/images/sprites/*.png', ['sprite']);
});

// task : browserSync
gulp.task('browserSync', ['html', 'js', 'sass'], function () { 
  return browserSync.init(config.browserSync);
});

// task : default | 'gulp'를 실행하면 sass, watch task를 실행함
gulp.task('default', ['clean', 'browserSync','images', 'watch']);

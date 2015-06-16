
// -------------------- Dependencies -------------------- //
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglifyJS = require('gulp-uglifyjs'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    jade = require('gulp-jade'),
    ftp = require('vinyl-ftp'),
    rename = require('gulp-rename'),
    prettyURL = require('gulp-pretty-url'),
    order = require('gulp-order'),
    del = require('del'),
    critical = require('critical').stream;


// -------------------- Output paths -------------------- //
var publicDir = '6-public/',
    publicDirDeploy = [ '6-public/**', '6-public/.htaccess'],
    metaDataFile = 'pages.js',

    staticFilesInput = [
      '5-static/.htaccess',
      '5-static/robots.txt', 
      '5-static/**/*.{jpg,gif,svg,png}'
    ],
    staticFilesOutput = '6-public',

    jadeInput = '4-content/**/*.jade',
    jadeTemplatesInput = [
      '1-templating/**/*.jade',
      '!1-templating/0-uicomponents/**',
      '!1-templating/3-templates/template-rss-feed.jade'
    ],
    jadeXMLInput = '1-templating/3-templates/template-rss-feed.jade',
    jadeOutput = '6-public/',

    sassInput = '2-presentation/**/*.{scss,sass}',
    sassOutput = '6-public/assets/css/',

    jsInput = '3-logic/**/*.js',
    jsVendorInput = '3-logic/1-plugins/*.js',
    jsOutput = '6-public/assets/js/'


// -------------------- FTP settings -------------------- //
var ftpHostName = 'gala-holiday.com',
    ftpUserName = 'galaho',
    ftpPassword = 'Dj$RV|V*yS',
    ftpRemoteDirectory = '/domains/ivanjuras.com/public_html/',
    ftpPort = 21,
    ftpParallelStreams = 8


// -------------------- Other variables -------------------- //
var jsSourceMap = false,
    serverPort = 4000,
    prettyJade = false,
    sassIndentedSyntax = true,
    sassAutoPrefixerVersion = 'last 2 versions'


// -------------------- Jade tasks -------------------- //
gulp.task('pages', function() {

  console.log( 'Starting Jade tasks' );
  
  gulp.src( jadeInput )
    .pipe(jade({
      pretty: prettyJade
    }))
    .pipe( prettyURL() )
    .pipe( gulp.dest( jadeOutput ) )
    .pipe( connect.reload() )

});


// -------------------- CSS tasks -------------------- //
gulp.task('styles', function() {

  console.log( 'Starting CSS tasks.' );

  gulp.src( sassInput )
    .pipe( sass({
      indentedSyntax: sassIndentedSyntax
    })).on( 'error', handleErrors )
    .pipe( autoprefixer ({
      browsers:[sassAutoPrefixerVersion]
    }))
    .pipe( minifyCSS() )
    .pipe( gulp.dest( sassOutput ) )
    .pipe( connect.reload() );

});


// -------------------- Javascript tasks -------------------- //
gulp.task('scripts', function() {

  console.log( 'Starting JS tasks.' );

  gulp.src( [ jsInput, '!' + jsVendorInput ] )
    .pipe( jshint() )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter('fail') ).on( 'error', function () {
      this.emit('end')  
    })

  gulp.src( jsInput )
    .pipe( order([
      jsVendorInput,
      jsInput
    ]))
    .pipe( uglifyJS( 'script.min.js', {
      mangle: true,
      outSourceMap: jsSourceMap
    }))
    .pipe( gulp.dest( jsOutput ) )
    .pipe( connect.reload() );

});


// -------------------- Critical CSS rendering task -------------------- //
gulp.task('critical', function () {

  console.log( 'Starting CRITICAL CSS task' );

  return gulp.src( publicDir + '**/*.html' )
    .pipe( critical({
      base: publicDir,
      css: [publicDir + 'assets/css/style.css'],
      width: 1024,
      height: 768,
      extract: true,
      inline: true,
      minify: true
    }))
    .pipe( gulp.dest( publicDir ) );

});


// -------------------- xmlFiles tasks -------------------- //
gulp.task('xmlFiles', function() {

  console.log( 'Building RSS/Sitemap xml files' );

  gulp.src( jadeXMLInput )
    .pipe(jade({
      locals: require('./pages'),
      pretty: true
    }))
    .pipe( rename( 'feed.xml' ) )
    .pipe( gulp.dest( jadeOutput ) )

});


// -------------------- Static file transfer tasks -------------------- //
gulp.task('static', function() {

  console.log( 'Starting - static file transfer tasks.' );

  gulp.src( staticFilesInput )
    .pipe( gulp.dest( staticFilesOutput ) )

});

// -------------------- Delete the 6-public folder -------------------- //
gulp.task('delprod', function() {

  console.log( 'Starting - delete the 6-public folder' );

  del([
    publicDir
  ]);

});


// -------------------- Deploy online (FTP) -------------------- //
gulp.task('deploy', function() {

  var conn = ftp.create({

    host: ftpHostName,
    user: ftpUserName,
    password: ftpPassword,
    port: ftpPort,
    parallel: ftpParallelStreams,
    log: gutil.log

  });

  gulp.src( publicDirDeploy, { base: publicDir, buffer: false } )
    .pipe ( conn.differentSize( ftpRemoteDirectory ) )
    .pipe ( conn.newer( ftpRemoteDirectory ) )
    .pipe ( conn.dest( ftpRemoteDirectory ) )

});


// -------------------- Watcher -------------------- //
gulp.task('watch', function() {

  connect.server({
    port: serverPort,
    root: publicDir,
    livereload: true
  });

  gulp.watch( [jadeInput, jadeTemplatesInput], ['pages'] );
  gulp.watch( [jadeXMLInput, metaDataFile], ['xmlFiles'] );
  gulp.watch( staticFilesInput, ['static'] );
  gulp.watch( sassInput, ['styles'] );
  gulp.watch( jsInput, ['scripts'] );
  
});


// -------------------- Handle Gulp Errors -------------------- //
function handleErrors( error ) {

  console.error( error );
  this.emit( 'end' );

}


// -------------------- Run all tasks -------------------- //
gulp.task( 'default', [ 'pages', 'styles', 'scripts', 'xmlFiles', 'static' ] );
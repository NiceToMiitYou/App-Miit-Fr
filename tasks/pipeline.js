/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [

  'vendor/materialize/bin/materialize.css',

  //'plugins/bootstrap*/**/*.css',

  'plugins/jquery-notifications/css/messenger.css',
  
  'plugins/jquery-notifications/css/messenger-*.css',

  'plugins/jquery-*/**/*.css',

  'plugins/**/*.css',

  'styles/css/responsive.css',
  
  'styles/css/style.css',
  
  'styles/**/*.css',

  'styles/importer.css'
 ];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Preloader
  'vendor/pace/pace.js',

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',

  // Libraries
  // jQuery
  'vendor/jquery/dist/jquery.js',

  // Angular
  'vendor/angular/angular.js',
  'vendor/angular-animate/angular-animate.js',
  'vendor/angular-sanitize/angular-sanitize.js',
  'vendor/angular-touch/angular-touch.js',

  // Async
  'vendor/async/lib/async.js',

  // Lodash
  'vendor/lodash/lodash.js',

  // Materialize
  'vendor/materialize/bin/materialize.js',

  // Modernizr
  'vendor/modernizr/modernizr.js',

  'js/dependencies/it-debug.js',

  // Load ITStorage before ITConnect
  'js/dependencies/it-storage.js',

  // Load ITGarbage before ITConnect
  'js/dependencies/it-garbage.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',

  'plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.js',

  'plugins/bootstrap*/**/*.js',

  'plugins/jquery-notifications/js/messenger.js',
  
  'plugins/jquery-notifications/js/messenger-*.js',

  'plugins/jquery-*/**/*.js',

  'plugins/**/*.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.

  'js/app.js',

  'js/controllers/**/*.js',

  'js/**/*.js'
 ];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
 ];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map( function( path ) {
    return '.tmp/public/' + path;
} );
module.exports.jsFilesToInject = jsFilesToInject.map( function( path ) {
    return '.tmp/public/' + path;
} );
module.exports.templateFilesToInject = templateFilesToInject.map( function( path ) {
    return 'assets/' + path;
} );

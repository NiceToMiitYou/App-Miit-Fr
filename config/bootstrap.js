/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var fs = require( 'fs' );
var filename = 'logo.txt';

module.exports.bootstrap = function( cb ) {

    sails.log.ship = function() {

        var logo = fs.readFileSync( filename, 'utf8' )
            .toString()
            .split( '\n' );

        for ( var line in logo ) {
            sails.log.info( logo[ line ] );
        }
    };

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)


    // Initialize data if in developpement
    InitializationDataService.initialize( function() { 
    
        // Load the restrictions of the conference
        RestrictionService.initialize();

        // Call next
        cb();
    } );
};

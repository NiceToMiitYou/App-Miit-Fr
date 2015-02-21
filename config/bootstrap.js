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

var logo = require( 'fs' )
            .readFileSync( 'logo.txt', 'utf8' )
            .toString()
            .split( '\n' );

module.exports.bootstrap = function( cb ) {

    // Change the logo of sails
    sails.log.ship = function() {

        for ( var line in logo ) {
            sails.log.info( logo[ line ] );
        }
    };

    // Check for import
    if ( 
        ( 
            typeof sails.config._ !== 'undefined' &&
            sails.config._.length === 3 &&
            sails.config._[1] === 'import'
        ) || ( 
            typeof sails.config._ !== 'undefined' &&
            sails.config._.length === 4 &&
            sails.config._[2] === 'import'
        )
    ) {

        var conferenceId = ( sails.config._[1] === 'import' ) ?
                             +sails.config._[2] :
                             +sails.config._[3];

        // Initialize data if in developpement
        return ImportationDataService.import( conferenceId, cb );
    }

    // Generate thumbnail
    return ImportationDataService.thumbnail( cb );
};

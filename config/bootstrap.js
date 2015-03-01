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

module.exports.bootstrap = function( cb ) {

    // Change the logo of sails
    sails.log.ship = function() {
        
        var logo = require( 'fs' )
                    .readFileSync( 'logo.txt', 'utf8' )
                    .toString()
                    .split( '\n' );

        for ( var line in logo ) {
            sails.log.info( logo[ line ] );
        }
    };

    // Initialize upload service
    UploadService.initialize();

    // Check for manual import
    if ( 
        typeof sails.config._ !== 'undefined' &&
        (
            (
                sails.config._.length === 3 &&
                sails.config._[1] === 'import'
            ) || (
                sails.config._.length === 4 &&
                sails.config._[2] === 'import'
            )
        )
    ) {

        // Find the conference id in the query
        var conferenceId = ( sails.config._[1] === 'import' ) ?
                             +sails.config._[2] :
                             +sails.config._[3];

        // Import data if in developpement
        return ImportationDataService.import( conferenceId, cb );
    } else {
        
        // Or define import by SQS
        QueueService.initialize( cb );
    }
};

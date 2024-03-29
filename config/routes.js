/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

function extend( target ) {
    var sources = [].slice.call( arguments, 1 );

    sources.forEach( function( source ) {
        for ( var prop in source ) {
            target[ prop ] = source[ prop ];
        }
    } );

    return target;
}

var userAppRoutes   = require( './routes/user.js' ),
    viewerAppRoutes = require( './routes/viewer.js' ),
    liveAppRoutes   = require( './routes/live.js' ),
    masterAppRoutes = require( './routes/master.js' ),
    adminAppRoutes  = require( './routes/admin.js' );

var routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        controller: 'ConfRouterController',
        action: 'index'
    },

    '/api/subscribe': {
        controller: 'ConfRouterController',
        action: 'subscribe'
    },

    /******************
     * Config Controller
     ******************/

    'GET /api/config/conference': {
        controller: 'ConfConfigController',
        action: 'conference'
    },


    'GET /api/config/presentations': {
        controller: 'ConfConfigController',
        action: 'presentations'
    },


    'GET /api/config/actual': {
        controller: 'ConfConfigController',
        action: 'actual'
    },

    'GET /api/config/users': {
        controller: 'ConfConfigController',
        action: 'connectedUsers'
    }


    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     *  If a request to a URL doesn't match any of the custom routes above, it  *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/
};

extend( routes, viewerAppRoutes,
                liveAppRoutes,
                masterAppRoutes,
                adminAppRoutes,
                userAppRoutes );

module.exports.routes = routes;

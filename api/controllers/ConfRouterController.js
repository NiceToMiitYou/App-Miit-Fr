/**
 * ConfRouterController
 *
 * @description :: Server-side logic for managing Confrouters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var redirectUrl = 'http://www.itevents.fr';

function viewer( req, res ) {

    return res.view( 'viewer', {
        layout: 'layouts/viewer-application'
    } );
}

function master( req, res ) {

    return res.view( 'master', {
        layout: 'layouts/master-application'
    } );
}

function live( req, res ) {

    return res.view( 'live', {
        layout: 'layouts/live-application'
    } );
}

module.exports = {

    /**
     * `ConfRouterController.index()`
     */
    index: function( req, res ) {

        if ( _.contains( req.session.roles, 'ROLE_VIEWER' ) ) {

            return viewer( req, res );

        } else if ( _.contains( req.session.roles, 'ROLE_MASTER' ) ) {

            return master( req, res );

        } else if ( _.contains( req.session.roles, 'ROLE_LIVE' ) ) {

            return live( req, res );

        } else {

            return res.redirect( redirectUrl );
        }
    },

    /**
     * `ConfRouterController.subscribe`
     */
    subscribe: function( req, res ) {

        if ( req.isSocket && req.session.roles ) {

            _.forEach(req.session.roles, function(role) {
                sails.sockets.join( req.socket, role );
            });

            return res.done();
        }

        return res.notDone();
    }
};

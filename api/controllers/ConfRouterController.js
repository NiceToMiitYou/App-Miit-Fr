/**
 * ConfRouterController
 *
 * @description :: Server-side logic for managing Confrouters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfRouterController.index()`
     */
    index: function( req, res ) {

        var roles = _.intersection( req.session.roles, sails.config.application.roles.choose );

        if ( roles.length > 1 ) {

            return res.view( 'choose', {
                roles: roles
            } );

        } else if ( _.contains( roles, 'ROLE_VIEWER' ) ) {

            return res.view( 'viewer', {
                layout: 'layouts/viewer-application'
            } );

        } else if ( _.contains( roles, 'ROLE_MASTER' ) ) {

            return res.view( 'master', {
                layout: 'layouts/master-application'
            } );

        } else if ( _.contains( roles, 'ROLE_LIVE' ) ) {

            return res.view( 'live', {
                goTo:   false,
                layout: 'layouts/live-application'
            } );

        } else {

            return res.redirect( sails.config.application.redirect );
        }
    },

    /**
     * `ConfRouterController.subscribe()`
     */
    subscribe: function( req, res ) {

        if ( req.isSocket      &&
             req.session.user  &&
             req.session.roles
        ) {

            _.forEach(req.session.roles, function(role) {
                // Register for the channel of the conference
                sails.sockets.join( req.socket, role + '_' + +req.session.conference );
            });

            return res.done();
        }

        return res.notDone();
    }
};

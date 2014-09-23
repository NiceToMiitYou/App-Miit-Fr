/**
 * ConfRouterController
 *
 * @description :: Server-side logic for managing Confrouters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index: function( req, res ) {

        if ( !req.session.user || !req.session.roles ) {
            res.view( 'login', {
                layout: 'layouts/login'
            } );
        } else if ( _.contains( req.session.roles, 'ROLE_VIEWER' ) ) {
            res.view( 'viewer', {
                layout: 'layouts/viewer-application'
            } );
        } else if ( _.contains( req.session.roles, 'ROLES_MASTER' ) ) {
            res.view( 'master', {
                layout: 'layouts/master-application'
            } );
        } else if ( _.contains( req.session.roles, 'ROLES_LIVE' ) ) {
            res.view( 'live', {
                layout: 'layouts/live-application'
            } );
        } else {
            res.send( 404 );
        }
    }
};

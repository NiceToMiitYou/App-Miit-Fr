/**
 * ConfRouterController
 *
 * @description :: Server-side logic for managing Confrouters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function login( req, res ) {

    ConfConference.findOne( 1 )
        .exec( function ( err, conference ) {
            if ( err || !conference ) conference = {
                logo: '/images/logodark.png',
                name: 'ITEvents',
                description: 'ITEvents ne trouve pas de conférence active.'
            };

            res.view( 'login', {
                conference: conference,
                layout: 'layouts/login'
            } );
        } );

}

function viewer( req, res ) {
    res.view( 'viewer', {
        layout: 'layouts/viewer-application'
    } );
}

function master( req, res ) {
    res.view( 'master', {
        layout: 'layouts/master-application'
    } );
}

function live( req, res ) {
    res.view( 'live', {
        layout: 'layouts/live-application'
    } );
}

module.exports = {
    index: function ( req, res ) {

        if ( !req.session.user || !req.session.roles ) {

            login( req, res );

        } else if ( _.contains( req.session.roles, 'ROLE_VIEWER' ) ) {

            viewer( req, res );

        } else if ( _.contains( req.session.roles, 'ROLE_MASTER' ) ) {

            master( req, res );

        } else if ( _.contains( req.session.roles, 'ROLE_LIVE' ) ) {

            live( req, res );

        } else {
            res.send( 404 );
        }
    }
};
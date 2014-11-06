/**
 * ConfConfigController
 *
 * @description :: Server-side logic for managing Confconfigs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfConfigController.conference()`
     */
    conference: function( req, res ) {

        ConfConference.findOne( 1 )
            .exec( function( err, conference ) {
                if ( err || !conference ) conference = {
                    logo: '/images/logodark.png',
                    name: 'ITEvents',
                    description: 'ITEvents ne trouve pas de conférence active.'
                };

                return res.done( {
                    conference: conference
                } );
            } );
    },

    /**
     * `ConfConfigController.actual()`
     */
    actual: function( req, res ) {
        
        return res.done( {
            presentation: 1
        } );
    },

    /**
     * `ConfConfigController.connectedUsers()`
     */
    connectedUsers: function( req, res ) {
        
        return res.done( {
            users: _.size( 
                sails.sockets.subscribers('ROLE_VIEWER')
            ) 
        } );
    },

    /**
     * `ConfConfigController.presentations()`
     */
    presentations: function( req, res ) {

        ConfPresentation.find()
            .populate( 'slides' )
            .exec( function( err, presentations ) {
                if ( err || ! presentations ) res.notDone();

                return res.done( {
                    presentations: presentations
                } );
            } );
    }
};

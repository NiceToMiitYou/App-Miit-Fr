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

        ConfConference
            .findOne( req.session.conference )
            .exec( function( err, conference ) {
                if ( err || !conference ) {

                    return res.notDone();
                }

                return res.done( {
                    conference: conference
                } );
            } );
    },

    /**
     * `ConfConfigController.actual()`
     */
    actual: function( req, res ) {
        
        ConfPresentation
            .findOne( {
                conference: req.session.conference
            } )
            .sort('id ASC')
            .exec(
                function( err, presentation ) {
                    if( err || !presentation ) {
                     
                        return res.notDone();
                    }

                    req.session.presentation = presentation.id;

                    return res.done( {
                        presentation: presentation.id
                    } );
                });
    },

    /**
     * `ConfConfigController.connectedUsers()`
     */
    connectedUsers: function( req, res ) {
        
        return res.done( {
            users: _.size( 
                sails.sockets.subscribers('ROLE_VIEWER_' + +req.session.conference)
            ) 
        } );
    },

    /**
     * `ConfConfigController.presentations()`
     */
    presentations: function( req, res ) {

        ConfPresentation
            .find( {
                conference: req.session.conference
            } )
            .populate( 'slides' )
            .exec( function( err, presentations ) {
                if ( err || ! presentations ) res.notDone();

                return res.done( {
                    presentations: presentations
                } );
            } );
    }
};

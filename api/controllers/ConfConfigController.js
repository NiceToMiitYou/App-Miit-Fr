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
            .findOne({
                'where': {
                    'id': {
                        'not': null
                    }
                }
            })
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
            .findOne({
                'where': {
                    'id': {
                        'not': null
                    }
                }
            })
            .sort('id ASC')
            .exec(
                function( err, presentation ) {
                    if( err || !presentation ) {
                     
                        return res.notDone();
                    }

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
                sails.sockets.subscribers('ROLE_VIEWER')
            ) 
        } );
    },

    /**
     * `ConfConfigController.presentations()`
     */
    presentations: function( req, res ) {

        ConfPresentation
            .find()
            .populate( 'slides' )
            .exec( function( err, presentations ) {
                if ( err || ! presentations ) res.notDone();

                return res.done( {
                    presentations: presentations
                } );
            } );
    }
};

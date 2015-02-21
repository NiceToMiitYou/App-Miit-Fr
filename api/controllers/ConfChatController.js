/**
 * ConfChatController
 *
 * @description :: Server-side logic for managing Chat
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfChatController.list()`
     */
    list: function( req, res ) {

        ConfChatRoom
            .find( {
                conference: req.session.conference
            } )
            .exec( function( err, chatrooms ) {
                if( err ) {

                    return res.notDone();
                }

                return res.done( {
                    chatrooms: chatrooms
                } );
            } );
    },

    /**
     * `ConfChatController.send()`
     */
    send: function( req, res ) {

        var message  = req.param( 'message' ),
            chatroom = req.param( 'chatroom' );

        ConfChatMessage
            .create( {
                message:  message,
                chatroom: chatroom,
                user:     req.session.user
            } )
            .exec( function( err, created ) {
                if ( err ) {

                    return res.notDone();
                }

                SocketEventCachingService
                    .sendToAll(
                        req.session.conference,
                        'chatroom-new',
                        created,
                        5 * 60, // Keep them 5 minutes
                        true    // but apply coefficient
                    );

                return res.done();
            } );
    }
};

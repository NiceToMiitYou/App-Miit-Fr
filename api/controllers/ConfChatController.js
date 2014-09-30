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
    list: function ( req, res ) {

        ConfChatRoom.find()
            .exec( function ( err, chatrooms ) {
                return res.done( {
                    chatrooms: chatrooms
                } );
            } );
    },

    /**
     * `ConfChatController.send()`
     */
    send: function ( req, res ) {

        ConfChatMessage.create( {
                message: req.param( 'message' ),
                user: req.session.user,
                chatroom: req.param( 'chatroom' )
            } )
            .exec( function ( err, created ) {
                if ( err ) return res.notDone();

                SocketEventCachingService.sendToAll( 'chatroom-new', created );

                return res.done( {
                    message: created
                } );
            } );
    }
};
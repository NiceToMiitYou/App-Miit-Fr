/**
 * ConfLiveController
 *
 * @description :: Server-side logic for managing Conflives
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfLiveController.next()`
     */
    next: function( req, res ) {
        if ( req.param( 'presentation' ) && req.param( 'presentation' ) > 0 ) {
            SocketEventCachingService.sendToAll(
                'live-presentation-next',
                {
                    presentation: req.param( 'presentation' )
                },
                4 * 60 * 60
            ); // Store them 4 hours
        }
    },

    /**
     * `ConfLiveController.previous()`
     */
    previous: function( req, res ) {
        if ( req.param( 'presentation' ) && req.param( 'presentation' ) > 0 ) {
            SocketEventCachingService.sendToAll(
                'live-presentation-previous',
                {
                    presentation: req.param( 'presentation' )
                },
                4 * 60 * 60
            ); // Store the 4 hours
        }
    }

};

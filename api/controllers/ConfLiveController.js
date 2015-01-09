/**
 * ConfLiveController
 *
 * @description :: Server-side logic for managing Conflives
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var liveDuration = 6 * 60 * 60; // Store them 6 hours

module.exports = {

    /**
     * `ConfLiveController.next()`
     */
    next: function( req, res ) {
        
        if ( req.param( 'presentation' ) && req.param( 'presentation' ) > 0 ) {
        
            SocketEventCachingService.sendToAll(
                'live-presentation-next', {
                    presentation: req.param( 'presentation' )
                },
                liveDuration
            );

            return res.done();
        }

        return res.notDone();
    },

    /**
     * `ConfLiveController.previous()`
     */
    previous: function( req, res ) {

        if ( req.param( 'presentation' ) && req.param( 'presentation' ) > 0 ) {
        
            SocketEventCachingService.sendToAll(
                'live-presentation-previous', {
                    presentation: req.param( 'presentation' )
                },
                liveDuration
            );

            return res.done();
        }

        return res.notDone();
    }

};

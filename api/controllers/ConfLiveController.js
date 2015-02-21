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

        var presentation = req.param( 'presentation' );
        
        if ( presentation && presentation > 0 ) {
        
            SocketEventCachingService.sendToAll(
                req.session.conference,
                'live-presentation-next', {
                    presentation: presentation
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

        var presentation = req.param( 'presentation' );
        
        if ( presentation && presentation > 0 ) {

            SocketEventCachingService.sendToAll(
                req.session.conference,
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

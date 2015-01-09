/**
 * ConfLiveApplicationEventController
 *
 * @description :: Server-side logic for managing Confliveapplicationevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfLiveApplicationEventController.list()`
     */
    list: function( req, res ) {
        ConfLiveApplicationEvent
            .find( {
                where: {
                    id: {
                        '>': req.param( 'token' )
                    },
                    expire: {
                        '>': new Date()
                    }
                },
                sort: 'id ASC'
            } )
            .exec( function( err, events ) {
                if ( err ) {
                    return res.notDone();
                }

                return res.done( {
                    events: events
                } );
            } );
    }
};

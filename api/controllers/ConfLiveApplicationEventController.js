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

        var token = req.param( 'token' );

        ConfLiveApplicationEvent
            .find( {
                where: {
                    token: {
                        '>':    token
                    },
                    expire: {
                        '>':    new Date()
                    },
                    conference: req.session.conference
                },
                sort: 'token ASC'
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

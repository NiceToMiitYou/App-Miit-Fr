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
        ConfLiveApplicationEvent.find( {
            where: {
                id: {
                    '>=': req.param( 'token' )
                }
            },
            sort: 'id ASC'
        } )
            .exec( function( err, events ) {
                if ( err ) {
                    return res.json( {
                        done: false
                    } );
                }

                return res.json( {
                    done: true,
                    events: events
                } );
            } );
    }
};

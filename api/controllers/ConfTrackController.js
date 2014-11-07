/**
 * ConfTrackController
 *
 * @description :: Server-side logic for managing Conftracks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfTrackController.create()`
     */
    create: function( req, res ) {

        var DateNow = new Date();

        ConfTrack.findOne( {
            user: req.session.user,
            sort: 'id DESC'
        } )
            .exec( function( err, track ) {
                if ( err ) return;
                if ( track ) {

                    track.end = DateNow;
                    track.save();
                }

                ConfTrack.create( {
                    action: req.param( 'action' ),
                    start: DateNow,
                    user: req.session.user
                } )
                    .exec( function( err, track ) {} );
            } );
    },
};

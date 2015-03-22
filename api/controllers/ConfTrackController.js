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

        var DateNow = new Date(),
            action  = req.param( 'action' );

        ConfTrack.findOne( {
            user:       req.session.user,
            conference: req.session.conference,
            sort:       'id DESC'
        } )
            .exec( function( err, track ) {
                if ( err ) {

                    return;
                }

                if ( track ) {

                    track.end = DateNow;
                    track.save();
                }

                ConfTrack.create( {
                    action:     action,
                    start:      DateNow,
                    user:       req.session.user,
                    conference: req.session.conference
                } )
                    .exec( function() {

                        return res.done();
                    } );
            } );
    },
};

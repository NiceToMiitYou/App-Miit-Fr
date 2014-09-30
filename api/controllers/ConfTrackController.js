/**
 * ConfTrackController
 *
 * @description :: Server-side logic for managing Conftracks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfTrackController.start()`
     */
    start: function ( req, res ) {
        ConfTrack.create( {
                action: req.param( 'action' ),
                start: new Date(),
                user: req.session.user
            } )
            .exec( function ( err, track ) {
                if ( err ) return res.notDone();

                return res.done( {
                    track: track
                } );
            } );
    },

    /**
     * `ConfTrackController.end()`
     */
    end: function ( req, res ) {
        ConfTrack.findOne( {
                user: req.session.user,
                id: req.param( 'track' ),
            } )
            .exec( function ( err, track ) {
                if ( err || !track ) return res.notDone();

                track.end = new Date();

                track.save( function ( err, saved ) {
                    if ( err || !saved ) return res.notDone();

                    return res.done();
                } );
            } );
    }

};
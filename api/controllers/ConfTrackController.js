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
    start: function( req, res ) {
        ConfTrack.create( {
            action: req.param( 'action' ),
            start: new Date(),
            user: req.session.user
        } )
            .exec( function( err, track ) {
                if ( err ) res.json( {
                    done: false
                } );

                return res.json( {
                    done: true,
                    track: track
                } );
            } );
    },

    /**
     * `ConfTrackController.end()`
     */
    end: function( req, res ) {
        ConfTrack.find( {
            user: req.session.user,
            id: req.param( 'track' ),
        } )
            .exec( function( err, track ) {
                if ( err ) res.json( {
                    done: false
                } );

                track.end = new Date();

                track.save( function( err, saved ) {
                    if ( err ) return res.json( {
                        done: false
                    } );

                    return res.json( {
                        done: true
                    } );

                } );
            } );
    }

};

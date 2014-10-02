/**
 * ConfConfigController
 *
 * @description :: Server-side logic for managing Confconfigs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfConfigController.conference()`
     */
    conference: function( req, res ) {

        ConfConference.findOne( 1 )
            .exec( function( err, conference ) {
                if ( err || !conference ) conference = {
                    logo: '/images/logodark.png',
                    name: 'ITEvents',
                    description: 'ITEvents ne trouve pas de conférence active.'
                };

                return res.done( {
                    conference: conference
                } );
            } );
    }
};

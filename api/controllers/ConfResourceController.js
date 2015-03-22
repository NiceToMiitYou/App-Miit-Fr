/**
 * ConfResourceController
 *
 * @description :: Server-side logic for managing Resources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var less = require( 'less' );

module.exports = {

    /**
     * `ConfresourceController.colorScheme()`
     */
    colorScheme: function( req, res ) {
    
        ConfConference
            .findOne( req.session.conference )
            .exec( 
                function( err, conference ) {
                    if ( err || !conference ) {

                        return res.send( 404 );
                    }

                    less.render( conference.colorScheme, function( e, css ) {
                        if ( e ) {
                         
                            res.send( 404 );
                        }

                        res.set( 'Content-Type', 'text/css' );

                        res.send( css );
                    } );
                } );
    },

    /**
     * `ConfResourceController.list()`
     */
    list: function( req, res ) {

        ConfResourceCategory
            .find( {
                isVisible:  true,
                conference: req.session.conference
            } )
            .populate( 'resources' )
            .exec( function( err, categories ) {
                if ( err ) {
                 
                    return res.notDone();
                }

                return res.done( {
                    categories: categories
                } );
            } );
    }
};

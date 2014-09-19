/**
 * ConfResourceController
 *
 * @description :: Server-side logic for managing Resources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    colorScheme: function( req, res ) {
        ConfConference.findOne( 1 )
            .exec( function( err, conference ) {
                if ( err ) res.send( 500 );

                var less = require( 'less' )

                less.render( conference.colorScheme, function( e, css ) {
                    if ( e ) res.send( 500 );

                    res.set( 'Content-Type', 'text/css' );

                    res.send( css );
                } );
            } );
    },

    list: function( req, res ) {
        ConfResourceCategory.find()
            .where( {
                'isVisible': 1
            } )
            .populate( 'resources' )
            .exec( function( err, categories ) {
                if ( err ) return res.json( {
                    done: false
                } );

                return res.json( {
                    done: true,
                    categories: categories
                } );
            } );
    }
};

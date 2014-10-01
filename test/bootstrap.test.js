var Sails = require( 'sails' );

before( function( done ) {
    // Increase time out
    this.timeout( 15000 );

    // Lift sails in Testing
    Sails.lift( {

        environment: 'testing'

    }, function( err, sails ) {
        if ( err ) return done( err );

        done( err, sails );
    } );
} );

after( function( done ) {
    // Increase time out
    this.timeout( 15000 );

    // here you can clear fixtures, etc.
    sails.lower( done );
} );

var Sails = require( 'sails' );

<<<<<<< HEAD
before( function ( done ) {
=======
before( function( done ) {
    // Increase time out
    this.timeout(15000);

    // Lift sails in Testing
>>>>>>> 7955afeeedafc7a31238a82d8a44af2de11f80bb
    Sails.lift( {

        environment: 'testing'

    }, function ( err, sails ) {
        if ( err ) return done( err );

        done( err, sails );
    } );
} );

<<<<<<< HEAD
after( function ( done ) {
=======
after( function( done ) {
    // Increase time out
    this.timeout(15000);
    
>>>>>>> 7955afeeedafc7a31238a82d8a44af2de11f80bb
    // here you can clear fixtures, etc.
    sails.lower( done );
} );

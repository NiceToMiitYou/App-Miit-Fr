/**
 * 200 done
 *
 * Usage:
 * return res.done( data );
 */

module.exports = function done( data ) {

    // Get access to `res`
    var res = this.res;

    // Set status code
    res.status( 200 );

    if ( !data ) { 
        data = {};
    }

    // Set the response to done
    if ( typeof data.done === 'undefined' ) {
        data.done = true;
    }

    res.json( data );
};

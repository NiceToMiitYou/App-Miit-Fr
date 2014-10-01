/**
 * 200 notDone
 *
 * Usage:
 * return res.notDone(data);
 */

module.exports = function done( data ) {

    // Get access to `res`
    var res = this.res;

    // Set status code
    res.status( 200 );

    if ( !data ) data = {};

    data.done = false;

    res.json( data );
};

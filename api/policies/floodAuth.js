/**
 * floodAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to restrict access to realtime feature to avoid flood
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function( req, res, next ) {

    var allowed = true;

    if( sails.config.environment !== 'testing' &&
        req.options.flood &&
        req.options.flood.id &&
        req.options.flood.time ) {

        var floodId = req.options.flood.id;
        var floodTime = req.options.flood.time;
        var requestTime = (new Date() ).getTime();

        // Check last request time
        if ( req.session.flood &&
             req.session.flood[floodId] &&
             req.session.flood[floodId] > requestTime ) {

            // Restrict access
            allowed = false;
            
        } else {

            // Check if flood variable exist
            if ( ! req.session.flood ) {
                req.session.flood = {};
            }

            // Check if flood id registered set new flood time
            if ( ! req.session.flood[floodId] || req.session.flood[floodId] <= requestTime ) {
                req.session.flood[floodId] = requestTime + floodTime;
            }
        }
    }

    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if ( allowed ) {
        return next();
    }

    // User is not allowed
    return res.notDone();
};

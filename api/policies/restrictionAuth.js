/**
 * restrictionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to restrict access to functionnality
 *                 Assumes that your logout action in one of your controllers sets `req.session.authenticated = false;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function( req, res, next ) {

    var restrictions = [];

    if( req.options.restrictions ) {

        // If many restrictions
        restrictions.concat( req.options.restrictions );

    } else if( req.options.restriction ) {

        // Only one restriction
        restrictions.push( req.options.restriction );
    }

    var callback = function( allowed ) {

        // User is allowed, proceed to the next policy, 
        if ( allowed ) {

            return next();
        }

        // User is not allowed
        return res.notDone();
    };

    // Check the access
    RestrictionService.checkAccess( req.session.conference, restrictions, callback );
};

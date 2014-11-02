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
        _.forEach(req.options.restrictions, function( restriction ) {

            restrictions.push(restriction);
        });

    } else if( req.options.restriction ) {

        // Only one restriction
        restrictions.push(req.options.restriction);
    }

    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if ( RestrictionService.isAllowed( restrictions ) ) {
        return next();
    }

    // User is not allowed
    return res.notDone();
};

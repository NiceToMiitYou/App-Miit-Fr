/**
 * captureAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any capture user
 *                 Assumes that your logout action in one of your controllers sets `req.session.authenticated = false;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function( req, res, next ) {

    var captureHeader = req.get('Need-Capture-A-Slide'),
        userAgent     = req.get('user-agent');

    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if ( captureHeader && userAgent &&
         captureHeader === 'Give-Me-The-Capture-Power-Please-!' &&
         userAgent     === 'Miit-Capture-User-Agent (secret => oiLu31zxaWmn4y8bCWV9U0Kk484LtJyFMU8NuwCIJcfpstcpSf8zuTBeWZvtRMB3gO3mpnCAFJ5wYbHYazaWYfNqk4F8ZcIYURUfq4JhmsWq7amSMkVlfGdPPwpFk6DQ)' ) {
        
        return next();
    }

    // User is not allowed
    return res.notFound();
};

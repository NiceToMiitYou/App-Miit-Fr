/**
 *
 * User service, to manage users
 *
 */


module.exports = {

    createFromConnect: function( user, cb ) {

        ConfUser
            .findOne( {
                realId: user.id
            } )
            .exec( function( errFind, userLocal ) {
                
                if ( errFind || userLocal ) { // If an error ocurred or user already exist

                    if ( typeof cb === 'function' ) {

                        return cb( errFind, userLocal );
                    }
                } else { // If weed need to create it

                    // Format
                    user.realId = user.id;
                    delete user.id;

                    // Create the user
                    ConfUser
                        .create( user )
                        .exec( cb );
                }
            } );
    }
};
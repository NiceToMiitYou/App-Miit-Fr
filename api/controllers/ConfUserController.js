/**
 * ConfUserController
 *
 * @description :: Server-side logic for managing ConfUsers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var redirectUrl = 'http://www.itevents.fr';

module.exports = {

    /**
     * `ConfUserController.list()`
     */
    list: function( req, res ) {

        ConfUser.find()
            .exec( function( err, users ) {
                if ( err || !users ) return res.notDone();

                return res.done( {
                    users: users
                } );
            } );
    },

    /**
     * `ConfUserController.get()`
     */
    get: function( req, res ) {

        ConfUser.findOne(
            req.param( 'user' )
        )
            .exec( function( err, user ) {
                if ( err || !user ) return res.notDone();

                return res.done( {
                    user: user
                } );
            } );
    },

    /**
     * `ConfUserController.me()`
     */
    me: function( req, res ) {

        ConfUser.findOne(
            req.session.user
        )
            .exec( function( err, user ) {
                if ( err || !user ) return res.notDone();

                return res.done( {
                    user: user
                } );
            } );
    },

    /**
     * `ConfUserController.update()`
     */
    update: function (req, res) {

        var firstname = req.param('firstname'),
            lastname  = req.param('lastname'),
            username  = req.param('username'),
            society   = req.param('society'),
            avatar    = req.param('avatar');

        if( firstname || lastname || username ) {

            UserService
                .update( req.session.user, {
                    firstname: firstname,
                    lastname:  lastname,
                    username:  username,
                    society:   society,
                    avatar:    avatar
                }, function( err, user ) {
                    if ( err || !user ) {

                        return res.notDone();
                    }

                    return res.done({
                        user: user 
                    });
                } );
        } else {

            return res.notDone();
        }
    },

    /**
     * `ConfUserController.logout()`
     */
    logout: function( req, res ) {

        if ( req.session.user ) req.session.user = null;
        if ( req.session.roles ) req.session.roles = null;

        // Set last track to end
        ConfTrack.findOne( {
            user: req.session.user,
            sort: 'id DESC'
        } )
            .exec( function( err, track ) {
                if ( err ) return res.notDone();
                if ( track ) {

                    track.end = new Date();
                    track.save();
                }

                return res.done( {
                    url: redirectUrl
                } );
            } ) ;
    },

    /**
     * `ConfUserController.connect()`
     */
    connect: function( req, res ) {

        var token = req.param( 'token' );

        if ( token ) {

            ItUser
                .custom( {
                    method: 'postJson',
                    action: 'connect',
                    data: {
                        conference: 1,
                        token: token
                    }
                }, function( err, response ) {
                    if( err || !response || !response.user ) {

                        return res.redirect( redirectUrl );
                    }

                    UserService
                        .createFromConnect( response.user,  function( errRetrieve, user ) {
                            if( errRetrieve ) {

                                return res.redirect( redirectUrl );
                            }

                            // If connected add informations to the session
                            req.session.user  = user.id;
                            req.session.roles = user.roles;

                            return res.redirect( '/' );
                        } );
                } );
        } else {

            return res.redirect( redirectUrl );
        }
    }
};

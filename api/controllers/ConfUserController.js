/**
 * ConfUserController
 *
 * @description :: Server-side logic for managing ConfUsers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function resetSession( session ) {

    if ( session.user )         session.user         = null;
    if ( session.roles )        session.roles        = null;
    if ( session.conference )   session.conference   = null;
    if ( session.presentation ) session.presentation = null;
}

module.exports = {

    /**
     * `ConfUserController.get()`
     */
    get: function( req, res ) {

        var userId = req.param( 'user' );

        ConfUser
            .findOne( userId )
            .exec( function( err, user ) {
                if ( err || !user ) {

                    return res.notDone();
                }

                return res.done( {
                    user: user
                } );
            } );
    },

    /**
     * `ConfUserController.me()`
     */
    me: function( req, res ) {

        ConfUser
            .findOne( req.session.user )
            .populate( 'quizzAnswers' )
            .exec( function( err, user ) {
                if ( err || !user ) {

                    return res.notDone();
                }

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

        resetSession( req.session );

        // Set last track to end
        ConfTrack
            .findOne( {
                user: req.session.user,
                sort: 'id DESC'
            } )
            .exec( function( err, track ) {
                if ( err ) {

                    return res.notDone();
                }

                if ( track ) {

                    track.end = new Date();
                    track.save();
                }

                return res.done( {
                    url: sails.config.application.redirect
                } );
            } ) ;
    },

    /**
     * `ConfUserController.connect()`
     */
    connect: function( req, res ) {

        var token = req.param( 'token' );

        // Reset the session to be sure
        resetSession( req.session );

        if ( token ) {

            ItUser
                .custom( {
                    method: 'postJson',
                    action: 'connect',
                    data: {
                        token: token
                    }
                }, function( err, response ) {
                    if( err || !response || !response.user ) {

                        return res.redirect( sails.config.application.redirect );
                    }

                    // Check if the conference exist on the server
                    ConfConference
                        .findOne( response.conference )
                        .exec( function( errConference, conference ) {
                            if( errConference || !conference ) {

                                // If no conference or error, redirect the user
                                return res.redirect( sails.config.application.redirect );
                            }

                            // Create the user in local
                            UserService
                                .createFromConnect( response.user,  function( errRetrieve, user ) {
                                    if( errRetrieve ) {

                                        return res.redirect( sails.config.application.redirect );
                                    }

                                    // If connected add informations to the session
                                    req.session.user       = user.id;
                                    req.session.roles      = response.roles;
                                    req.session.conference = response.conference;

                                    return res.redirect( '/' );
                                } );
                        });
                } );
        } else {

            return res.redirect( sails.config.application.redirect );
        }
    },

    /**
     * `ConfUserController.role()`
     */
    role: function( req, res ) {

        var role = req.param( 'role' );

        // If the role is not in the exclude list, we can accept it
        if( role && !_.contains( sails.config.application.roles.exclude, role ) ) {

            // Remove all roles not in the exclude list and not selected
            _.remove( req.session.roles, function( value ) {
                return value !== role && !_.contains( sails.config.application.roles.exclude, value );
            });
        }

        return res.redirect( '/' );
    }
};

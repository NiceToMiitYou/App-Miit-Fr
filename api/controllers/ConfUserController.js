/**
 * ConfUserController
 *
 * @description :: Server-side logic for managing ConfUsers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
     * `ConfUserController.update()`
     */
    update: function (req, res) {

        ConfUser.findOne(
            req.session.user
        ).exec( function( err, user ){
            if ( err || !user ) return res.notDone();

            user.firstname = req.param('firstname');
            user.lastname = req.param('lastname');
            user.username = req.param('username');
            user.society = req.param('society');
            user.avatar = req.param('avatar');

            user.save(function(err, user) {
                if ( err || !user ) return res.notDone();

                return res.done({
                    user: user 
                });
            });
        });
    },

    /**
     * `ConfUserController.login()`
     */
    login: function( req, res ) {

        ConfUser.findOneByMail(
            req.param( 'mail' )
        )
            .populate( 'quizzAnswers' )
            .exec( function( err, user ) {
                if ( err ) return res.notDone();

                if ( !user ) return res.done( {
                    exist: false
                } );

                user.isCorrectPassword( req.param( 'password' ), function( result ) {
                    if ( result ) {
                        req.session.user = user.id;
                        req.session.roles = user.roles;

                        return res.done( {
                            exist: true,
                            connected: true,
                            user: user
                        } );
                    } else {
                        return res.done( {
                            exist: true,
                            connected: false
                        } );
                    }
                } );
            } );
    },

    /**
     * `ConfUserController.register()`
     */
    register: function( req, res ) {
        ConfUser.create( {
            mail: req.param( 'mail' ),
            password: req.param( 'password' ),
            roles: [ 'ROLE_LOGIN', 'ROLE_VIEWER' ]
        } )
            .exec( function( err, user ) {
                if ( err ) return res.notDone();

                return res.done( {
                    user: user
                } );
            } );
    },

    /**
     * `ConfUserController.logout()`
     */
    logout: function( req, res ) {

        if ( req.session.user ) req.session.user = null;
        if ( req.session.roles ) req.session.roles = null;

        return res.done();
    }
};

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
  list: function (req, res) {

    ConfUser.find()
      .exec(function(err, users){
        if (err || !users) return res.json({
          done: false
        });

        return res.json({
          done: true,
          users: users
        });
    });
  },

  /**
   * `ConfUserController.login()`
   */
  login: function (req, res) {

    ConfUser.findOneByMail(
        req.param('mail')
      )
      .exec(function(err, user){
        if ( err ) return res.json({
          done: false
        });

        if ( !user ) return res.json({
          done: true,
          exist: false
        });

        if ( user.password != req.param('password') ) return res.json({
          done: true,
          exist: true,
          connected: false
        });

        req.session.user = user.id;
        req.session.authenticated = true;

        return res.json({
          done: true,
          exist: true,
          connected: true,
          user: user
        });
    });
  },

  /**
   * `ConfUserController.register()`
   */
  register: function (req, res) {
    ConfUser.Create({
      mail: req.param('mail'),
      password: req.param('param')
    }).exec(function(err, user) {
      if ( err ) return res.json({
        done: false
      });

      return res.json({
        done: true,
        user: user
      });
    });
  },

  /**
   * `ConfUserController.logout()`
   */
  logout: function (req, res) {

    if (req.session.user) req.session.user = null;
    if (req.session.authenticated) req.session.authenticated = false;

    return res.json({
      done: true 
    });
  }
};


/**
 * ConfChatController
 *
 * @description :: Server-side logic for managing Chat
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  /**
   * `ConfChatController.list()`
   */
  list: function (req, res) {

    ConfChatRoom.find().exec(function(err, models) {
      return res.json({
        done: true,
        models: models
      });
    });
  },

  /**
   * `ConfChatController.send()`
   */
  send: function(req, res) {
    ConfChatMessage.create({
      message: req.param('message'),
      user: req.session.user,
      chatroom: req.param('chatroom')
    }).exec(function(err, created) {
      if (err) return res.json({
        done: false
      });

      sails.sockets.broadcast('chatroom-' + created.chatroom, 'chatroom-' + created.chatroom + '-new', created);

      return res.json({
        done: true,
        chatmessage: created
      });
    });
  },

  /**
   * `ConfChatController.subscribe()`
   */
  subscribe: function(req, res) {
    ConfChatRoom.findOne(req.param('chatroom')).exec(function(err, chatroom) {
      if (err) return res.json({
        done: false
      });

      if(req.isSocket == true) {
        sails.sockets.join(req.socket, 'chatroom-' + chatroom.id);

        return res.json({
          done: true
        });
      }

      return res.json({
        done: false
      });
    
    });
  },

  /**
   * `ConfChatController.unsubscribe()`
   */
  unsubscribe: function(req, res) {
    ConfChatRoom.findOne(req.param('chatroom')).exec(function(err, chatroom) {
      if (err) return res.json({
        done: false
      });

      if(req.isSocket == true) {
        sails.sockets.leave(req.socket, 'chatroom-' + chatroom.id);

        return res.json({
          done: true
        });
      }

      return res.json({
        done: false
      });
    
    });
  }

};


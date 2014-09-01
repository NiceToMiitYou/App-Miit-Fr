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

      SocketEventCachingService.sendToAll('chatroom-new', created);

      return res.json({
        done: true,
        chatmessage: created
      });
    });
  }
};


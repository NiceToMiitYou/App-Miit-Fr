/**
* ChatRoom.js
*
* @description :: Representation of chatrooms
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : {
    	type: 'string'
    },

    type : {
    	type: 'int'
    },
    
    messages: {
    	collection: 'ConfChatMessage',
    	via: 'chatroom'
    }
  }
};


/**
* ChatRoom.js
*
* @description :: Representation of chatrooms
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : {
    	type: 'string',
        required: true,
        minLength: 1
    },

    type : {
    	type: 'integer',
        defaultsTo: 1
    },
    
    messages: {
    	collection: 'ConfChatMessage',
    	via: 'chatroom'
    }
  }
};


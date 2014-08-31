/**
* ChatMessage.js
*
* @description :: Message representation
*/

module.exports = {

  attributes: {
    
    message: {
        type: 'string'
    },
    
    chatroom: {
        model: 'ConfChatRoom'
    },
    
    user: {
        model: 'ConfUser'
    }
  }
};

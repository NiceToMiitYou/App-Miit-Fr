/**
 * ChatMessage.js
 *
 * @description :: Message representation
 */

module.exports = {

    attributes: {

        message: {
            type: 'string',
            required: true,
            minLength: 1
        },

        chatroom: {
            model: 'ConfChatRoom',
            required: true
        },

        user: {
            model: 'ConfUser',
            required: true
        }
    }
};

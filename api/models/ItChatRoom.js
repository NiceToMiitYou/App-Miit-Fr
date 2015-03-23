/**
 * ItChatRoom.js
 *
 * @description :: Representation of chatrooms
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'chatroom',

    attributes: {

        name: {
            type: 'string',
            required: true,
            minLength: 1
        },

        type: {
            type: 'integer',
            defaultsTo: 1
        },

        conference: {
            model: 'ItConference',
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            obj.toJSON = null;
            return obj;
        }
    }
};

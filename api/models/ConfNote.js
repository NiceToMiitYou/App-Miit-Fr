/**
 * Note.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        title: {
            type: 'string',
            required: true,
            minLength: 1,
            maxLength: 50
        },

        conference: {
            model: 'ConfConference',
            index: true,
            required: true
        },

        content: {
            type: 'text',
            required: true
        },

        user: {
            model: 'ConfUser',
            required: true,
            index: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.conference;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};

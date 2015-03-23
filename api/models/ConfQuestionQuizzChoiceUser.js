/**
 * ConfQuestionQuizzChoiceUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        type: {
            type: 'integer',
            defaultsTo: 0
        },

        extra: {
            type: 'json'
        },
        
        answer: {
            model: 'ConfQuestionQuizzAnswer',
            required: true
        },

        user: {
            model: 'ConfUser',
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            obj.toJSON = null;
            return obj;
        }
    }
};

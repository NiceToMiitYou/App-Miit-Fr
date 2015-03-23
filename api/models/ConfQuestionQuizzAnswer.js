/**
 * ConfQuestionQuizzAnswer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        answer: {
            type: 'string',
            defaultsTo: ''
        },

        type: {
            type: 'integer',
            defaultsTo: 0
        },

        question: {
            model: 'ConfQuestionQuizz',
            required: true
        },

        usersChoices: {
            collection: 'ConfQuestionQuizzChoiceUser',
            via: 'answer'
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

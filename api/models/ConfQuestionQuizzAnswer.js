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
            required: true,
            minLength: 1
        },

        realId: {
            type: 'integer'
        },

        question: {
            model: 'ConfQuestionQuizz',
            required: true
        },

        users: {
            collection: 'ConfUser',
            via: 'quizzAnswers'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.realId;
            return obj;
        }
    }
};

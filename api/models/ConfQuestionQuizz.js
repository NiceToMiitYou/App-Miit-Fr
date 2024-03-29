/**
 * ConfQuestionQuizz.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        question: {
            type: 'string',
            required: true,
            minLength: 3
        },

        required: {
            type: 'boolean',
            defaultsTo: false
        },

        type: {
            type: 'integer',
            required: true
        },

        extra: {
            type: 'json'
        },
        
        answers: {
            collection: 'ConfQuestionQuizzAnswer',
            via: 'question'
        },

        quizz: {
            model: 'ConfQuizz',
            required: true,
            index: true
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

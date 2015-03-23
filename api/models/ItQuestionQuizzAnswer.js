/**
 * ItQuestionQuizzAnswer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'questionquizzanswer',

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
            model: 'ItQuestionQuizz',
            required: true
        },

        usersChoices: {
            collection: 'ItQuestionQuizzChoiceUser',
            via: 'answer'
        },

        toJSON: function() {
            var obj = this.toObject();
            obj.toJSON = null;
            return obj;
        }
    }
};

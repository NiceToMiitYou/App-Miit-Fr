/**
 * QuestionQuizz.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'questionquizz',

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

        quizz: {
            model: 'ItQuizz',
            required: true
        }
    }
};

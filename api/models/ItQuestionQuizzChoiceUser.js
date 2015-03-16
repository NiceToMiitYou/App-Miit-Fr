/**
 * ItQuestionQuizzChoiceUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'questionquizzchoiceuser',

    attributes: {

        type: {
            type: 'integer',
            defaultsTo: 0
        },

        extra: {
            type: 'json'
        },
        
        answer: {
            model: 'ItQuestionQuizzAnswer',
            required: true
        },

        user: {
            model: 'ItUser',
            required: true
        }
    }
};

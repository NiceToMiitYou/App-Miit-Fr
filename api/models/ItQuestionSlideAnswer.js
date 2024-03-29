/**
 * ItConfQuestionAnswer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'questionslideanswer',

    attributes: {

        answer: {
            type: 'string',
            required: true,
            minLength: 1
        },

        question: {
            model: 'ItQuestionSlide',
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            obj.toJSON = null;
            return obj;
        }
    }
};

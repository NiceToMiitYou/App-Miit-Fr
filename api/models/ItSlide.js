/**
 * ItSlide.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'slide',

    attributes: {

        notes: {
            type: 'text'
        },

        title: {
            type: 'string'
        },

        content: {
            type: 'text',
            required: true
        },

        time: {
            type: 'integer',
            defaultsTo: 0
        },

        type: {
            type: 'integer',
            defaultsTo: 1
        },

        presentation: {
            model: 'ItPresentation',
            required: true
        },

        question: {
            model: 'ItQuestionSlide'
        }
    }
};

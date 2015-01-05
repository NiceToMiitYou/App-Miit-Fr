/**
 * ItQuestionSlide.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'questionslide',

    attributes: {

        question: {
            type: 'string',
            required: true,
            minLength: 6
        },

        type: {
            type: 'integer',
            defaultsTo: 1
        },

        slide: {
            model: 'ItSlide',
            required: true
        }
    }
};

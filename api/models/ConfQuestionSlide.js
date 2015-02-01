/**
 * ConfQuestionSlide.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

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

        isClosed: {
            type: 'boolean',
            defaultsTo: false
        },

        slide: {
            model: 'ConfSlide',
            required: true,
            index: true
        },

        answers: {
            collection: 'ConfQuestionSlideAnswer',
            via: 'question'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};

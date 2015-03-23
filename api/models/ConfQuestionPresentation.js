/**
 * ConfQuestionPresentation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        question: {
            type: 'string',
            required: true
        },

        isAnswered: {
            type: 'boolean',
            defaultsTo: false,
            index: true
        },

        user: {
            model: 'ConfUser',
            required: true
        },

        likes: {
            collection: 'ConfQuestionPresentationLike',
            via: 'question'
        },

        tags: {
            collection: 'ConfTag',
            via: 'questions',
            required: true
        },

        presentation: {
            model: 'ConfPresentation',
            required: true,
            index: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.updatedAt;
            obj.toJSON = null;
            return obj;
        }
    }
};

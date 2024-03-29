/**
 * ConfQuestionPresentationLike.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        isLiked: {
            type: 'boolean',
            required: true
        },

        question: {
            model: 'ConfQuestionPresentation',
            required: true,
            index: true
        },

        user: {
            model: 'ConfUser',
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

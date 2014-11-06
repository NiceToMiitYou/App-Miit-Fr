/**
 * ConfQuestionPresentationTag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            unique: true,
            required: true,
            minLength: 1
        },

        questions: {
            collection: 'ConfQuestionPresentation',
            via: 'tags',
            dominant: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updateAt;
            return obj;
        }
    }
};

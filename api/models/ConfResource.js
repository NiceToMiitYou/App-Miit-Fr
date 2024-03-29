/**
 * ConfResource.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true,
            minLength: 1
        },

        type: {
            type: 'string',
            required: true
        },

        path: {
            type: 'text',
            required: true
        },

        category: {
            model: 'ConfResourceCategory',
            required: true
        },

        slides: {
            collection: 'ConfSlide',
            via: 'resources'
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

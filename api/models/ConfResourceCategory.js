/**
 * ConfResourceCategory.js
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

        isVisible: {
            type: 'boolean',
            defaultsTo: true,
            index: true
        },

        resources: {
            collection: 'ConfResource',
            via: 'category'
        },

        conference: {
            model: 'ConfConference',
            required: true,
            index: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.isVisible;
            delete obj.conference;
            delete obj.createdAt;
            delete obj.updatedAt;
            obj.toJSON = null;
            return obj;
        }
    }
};

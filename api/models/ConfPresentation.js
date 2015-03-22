/**
 * ConfPresentation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        description: {
            type: 'text'
        },

        authors: {
            type: 'text',
            required: true
        },

        startTime: {
            type: 'datetime'
        },

        endTime: {
            type: 'datetime'
        },

        conference: {
            model: 'ConfConference',
            index: true,
            required: true
        },

        slides: {
            collection: 'ConfSlide',
            via: 'presentation'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.conference;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};

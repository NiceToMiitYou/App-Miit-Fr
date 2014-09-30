/**
 * ConfConference.js
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

        clientName: {
            type: 'string',
            required: true
        },

        logo: {
            type: 'text',
            required: true
        },

        colorScheme: {
            type: 'text',
            required: true
        },

        description: {
            type: 'text'
        },

        realId: {
            type: 'integer'
        },

        presentations: {
            collection: 'ConfPresentation',
            via: 'conference'
        },

        categories: {
            collection: 'ConfResourceCategory',
            via: 'conference'
        }
    }
};
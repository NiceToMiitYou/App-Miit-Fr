/**
 * ItConference.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'conference',

    attributes: {

        name: {
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

        url: {
            type: 'string',
            required: true
        },

        token: {
            type: 'string',
            required: true
        },

        description: {
            type: 'text'
        },

        restrictions: {
            type: 'array'
        },

        client: {
            model: 'ItClient',
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            obj.toJSON = null;
            return obj;
        }
    }
};

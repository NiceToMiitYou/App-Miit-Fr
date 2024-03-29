/**
 * ItClient.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'client',

    attributes: {

        name: {
            type: 'string',
            required: true
        },

        logo: {
            type: 'text',
            defaultTo: ''
        },

        colorScheme: {
            type: 'text',
            defaultTo: ''
        },

        toJSON: function() {
            var obj = this.toObject();
            obj.toJSON = null;
            return obj;
        }
    }
};


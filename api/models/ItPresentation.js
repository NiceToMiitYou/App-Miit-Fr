/**
 * ItPresentation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'presentation',

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
            model: 'ItConference',
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            obj.toJSON = null;
            return obj;
        }
    }
};

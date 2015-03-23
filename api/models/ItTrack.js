/**
 * ItTrack.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'track',

    attributes: {

        action: {
            type: 'string',
            required: true
        },

        start: {
            type: 'datetime'
        },

        end: {
            type: 'datetime'
        },

        user: {
            model: 'ItUser',
            required: true
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

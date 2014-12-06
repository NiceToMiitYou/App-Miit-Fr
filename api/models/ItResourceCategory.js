/**
 * ResourceCategory.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'resourceCategory',

    attributes: {

        name: {
            type: 'string',
            required: true,
            minLength: 1
        },

        isVisible: {
            type: 'boolean',
            defaultsTo: true
        },

        conference: {
            model: 'ItConference',
            required: true
        }
    }
};

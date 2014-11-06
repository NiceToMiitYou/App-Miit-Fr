/**
 * ConfLiveApplicationEvent.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    connection: 'LiveApplicationDatabase',

    attributes: {

        name: {
            type: 'string'
        },

        data: {
            type: 'json'
        },

        expire: {
            type: 'datetime'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};

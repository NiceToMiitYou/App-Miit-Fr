/**
 * ItUser.js
 *
 * @description :: User representation
 */

module.exports = {

    connection: 'DwhWebService',
    
    tableName: 'user',

    attributes: {

        lastname: {
            type: 'string'
        },

        firstname: {
            type: 'string'
        },

        fullname: function() {
            return this.firstname + ' ' + this.lastname;
        },

        username: {
            type: 'string'
        },

        society: {
            type: 'string'
        },

        avatar: {
            type: 'json'
        },

        mail: {
            type: 'email',
            unique: true,
            required: true
        },

        roles: {
            type: 'array'
        },

        toJSON: function() {
            var obj = this.toObject();
            return obj;
        }
    }
};
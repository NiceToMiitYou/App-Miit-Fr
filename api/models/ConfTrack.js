/**
 * ConfTrack.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        action: {
            type: 'string',
            required: true
        },

        conference: {
            model: 'ConfConference',
            required: true,
            index: true
        },

        start: {
            type: 'datetime'
        },

        end: {
            type: 'datetime'
        },

        user: {
            model: 'ConfUser',
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            obj.toJSON = null;
            return obj;
        }
    }
};

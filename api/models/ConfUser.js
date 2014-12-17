/**
 * ConfUser.js
 *
 * @description :: ConfUser representation
 */

var bcrypt = require( 'bcrypt' );

module.exports = {

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

        messages: {
            collection: 'ConfChatMessage',
            via: 'user'
        },

        notes: {
            collection: 'ConfNote',
            via: 'user'
        },

        realId: {
            type: 'integer'
        },

        slideAnswers: {
            collection: 'ConfQuestionSlideAnswer',
            via: 'users',
            dominant: true
        },

        quizzAnswers: {
            collection: 'ConfQuestionQuizzAnswer',
            via: 'users',
            dominant: true
        },

        questionAsked: {
            collection: 'ConfQuestionPresentation',
            via: 'user'
        },

        questionLikes: {
            collection: 'ConfQuestionPresentationLike',
            via: 'user'
        },

        roles: {
            type: 'array',
            required: true
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.mail;
            delete obj.realId;
            delete obj.roles;
            delete obj.messages;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};

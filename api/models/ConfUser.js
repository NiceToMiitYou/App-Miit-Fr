/**
 * ConfUser.js
 *
 * @description :: ConfUser representation
 */

var bcrypt = require('bcrypt');

module.exports = {

    attributes: {

        lastName: {
            type: 'string'
        },

        firstName: {
            type: 'string'
        },

        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },

        society: {
            type: 'string'
        },

        password: {
            type: 'string',
            required: true
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
            type: 'array'
        },

        isCorrectPassword: function( password ) {
            bcrypt.compare(password, this.password, function(err, res) {
                return res;
           });
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.mail;
            delete obj.roles;
            return obj;
        }
    },

    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {

                if (err) {
                    cb(err);
                } else {
                    user.password = hash;
                    cb(null, user);
                }
            });
        });
    }
};

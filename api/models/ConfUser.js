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

        isCorrectPassword: function( password, cb ) {
            bcrypt.compare( password, this.password, function( err, res ) {
                if ( err ) cb( false );

                cb( res );
            } );
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.mail;
            delete obj.realId;
            delete obj.roles;
            return obj;
        }
    },

    beforeCreate: function( user, cb ) {
        bcrypt.genSalt( 8, function( err, salt ) {
            bcrypt.hash( user.password, salt, function( err, hash ) {

                if ( err ) {
                    cb( err );
                } else {

                    user.password = hash;
                    cb( null, user );
                }
            } );
        } );
    }
};

/**
 * ConfUser.js
 *
 * @description :: ConfUser representation
 */

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

        slideAnswers: {
            collection: 'ConfQuestionSlideAnswer',
            via: 'users',
            dominant: true
        },

        quizzAnswers: {
            collection: 'ConfQuestionQuizzChoiceUser',
            via: 'user'
        },

        questionAsked: {
            collection: 'ConfQuestionPresentation',
            via: 'user'
        },

        questionLikes: {
            collection: 'ConfQuestionPresentationLike',
            via: 'user'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.mail;
            delete obj.messages;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};

/**
* ConfUser.js
*
* @description :: ConfUser representation
*/

module.exports = {

  attributes: {

    lastName : { 
    	type: 'string',
        required: true,
        minLength: 1
    },

    firstName : {
    	type: 'string',
        required: true,
        minLength: 1
    },

    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    },

    society : {
        type: 'string'
    },

    password : {
    	type: 'string',
        unique: true
    },

    mail : {
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
        via: 'users'
    },

    quizzAnswers: {
        collection: 'ConfQuestionQuizzAnswer',
        via: 'users'
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
        delete obj.password;
        delete obj.mail;
        return obj;
    }
  }
};


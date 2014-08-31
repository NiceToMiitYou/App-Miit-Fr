/**
* ConfUser.js
*
* @description :: ConfUser representation
*/

module.exports = {

  attributes: {

    lastName : { 
    	type: 'string'
    },

    firstName : {
    	type: 'string'
    },

    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    },

    society : {
        type: 'string'
    },

    password : {
    	type: 'string',
        index: true
    },

    mail : {
    	type: 'string'
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


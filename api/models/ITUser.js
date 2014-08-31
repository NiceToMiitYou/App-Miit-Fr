/**
* ITUser.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'ITEventsDatabase',

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
    
    slideAnswers: {
        collection: 'ITQuestionSlideAnswer',
        via: 'users'
    },

    quizzAnswers: {
        collection: 'ITQuestionQuizzAnswer',
        via: 'users'
    },

    toJSON: function() {
        var obj = this.toObject();
        delete obj.password;
        delete obj.mail;
        return obj;
    }
  }
};


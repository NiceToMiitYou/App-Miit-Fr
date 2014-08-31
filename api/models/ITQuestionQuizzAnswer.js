/**
* ITQuestionQuizzAnswer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'ITEventsDatabase',

  attributes: {

    answer : { 
    	type: 'string' 
    },

    question: {
    	model: 'ITQuestionQuizz'
    },

    users: {
    	collection: 'ITUser',
    	via: 'quizzAnswers',
    	dominant: true
    }
  }
};


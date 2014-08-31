/**
* ITQuestionQuizz.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'ITEventsDatabase',

  attributes: {

    question : { 
    	type: 'string' 
    },

    type : { 
    	type: 'int' 
    },

    answers: {
    	collection: 'ITQuestionQuizzAnswer',
    	via: 'question'
    },

    quizz: {
    	model: 'ITQuizz'
    }
  }
};


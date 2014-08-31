/**
* ConfQuestionQuizzAnswer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    answer : { 
    	type: 'string' 
    },

    realId : { 
    	type: 'int' 
    },

    question: {
    	model: 'ConfQuestionQuizz'
    },

    users: {
    	collection: 'ConfUser',
    	via: 'quizzAnswers',
    	dominant: true
    }
  }
};


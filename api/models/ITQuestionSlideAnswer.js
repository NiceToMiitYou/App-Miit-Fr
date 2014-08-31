/**
* ITQuestionSlideAnswer.js
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

    realId : { 
    	type: 'int' 
    },

    question: {
    	model: 'ITQuestionSlide'
    },

    users: {
    	collection: 'ITUser',
    	via: 'slideAnswers',
    	dominant: true
    }
  }
};


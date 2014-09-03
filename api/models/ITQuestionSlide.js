/**
* ITQuestionSlide.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'ITEventsDatabase',

  attributes: {

    question : { 
    	type: 'string',
    	required: true,
    	minLength: 6
    },

    type : { 
    	type: 'integer',
    	defaultsTo: 1
    },

    slide: {
    	model: 'ITSlide',
    	required: true
    },

    answers: {
    	collection: 'ITQuestionSlideAnswer',
    	via: 'question'
    }
  }
};

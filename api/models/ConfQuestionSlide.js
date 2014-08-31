/**
* ConfQuestionSlide.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    question : { 
    	type: 'string'
    },

    type : { 
    	type: 'int' 
    },

    isClosed : { 
    	type: 'boolean' 
    },

    slide: {
    	model: 'ConfSlide'
    },

    answers: {
    	collection: 'ConfQuestionSlideAnswer',
    	via: 'question'
    }
  }
};


/**
* ConfQuestionAnswer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    answer : { 
		type: 'string',
        required: true,
        minLength: 1
	},

    realId : { 
    	type: 'integer'
    },

    question: {
    	model: 'ConfQuestionSlide',
        required: true
    },

    users: {
    	collection: 'ConfUser',
    	via: 'slideAnswers',
    	dominant: true
    }
  }
};


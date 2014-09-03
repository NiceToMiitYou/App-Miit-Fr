/**
* ConfQuizz.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { 
    	type: 'string',
        required: true,
        minLength: 1
    },

    description : { 
    	type: 'text'
    },

    maxTime : { 
    	type: 'integer',
        defaultsTo: 0
    },

    startTime : { 
    	type: 'datetime' 
    },

    endTime : { 
    	type: 'datetime' 
    },

    questions: {
    	collection: 'ConfQuestionQuizz',
    	via: 'quizz'
    }
  }
};


/**
* ConfSlide.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    notes : {
    	type: 'text'
    },

    title : {
    	type: 'string'
    },

    content : {
    	type: 'text'
    },

    time : {
    	type: 'int'
    },

    type : {
    	type: 'int'
    },

    presentation: {
    	model: 'ConfPresentation'
    },

    question: {
    	model: 'ConfQuestionSlide'
    }
  }
};


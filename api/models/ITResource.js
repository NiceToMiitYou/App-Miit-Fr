/**
* ITResource.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'ITEventsDatabase',

  attributes: {

    name : { 
    	type: 'string' 
    },

    content : { 
    	type: 'binary' 
    },

    category: {
    	model: 'ITResourceCategory'
    },

    slides: {
    	collection: 'ITSlide',
    	via: 'resources'
    }
  }
};


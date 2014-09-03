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
    	type: 'string',
        required: true,
        minLength: 1
    },

    path : { 
    	type: 'text',
        required: true,
        minLength: 6
    },

    category: {
    	model: 'ITResourceCategory',
        required: true
    },

    slides: {
    	collection: 'ITSlide',
    	via: 'resources'
    }
  }
};

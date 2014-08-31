/**
* ITPresentation.js
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

    description : { 
    	type: 'text' 
    },

    authors : { 
    	type: 'text'
    },

    startTime : { 
    	type: 'datetime' 
    },

    endTime : { 
    	type: 'datetime' 
    },

    conference: {
    	model: 'ITConference',
    	required: true
    },

    slides: {
    	collection: 'ITSlide',
    	via: 'presentation'
    }

  }
};


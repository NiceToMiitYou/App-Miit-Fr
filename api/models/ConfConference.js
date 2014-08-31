/**
* ConfConference.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    name : { 
    	type: 'string' 
    },

    clientName : { 
    	type: 'string' 
    },

    logo : { 
    	type: 'text' 
    },

    colorScheme : { 
    	type: 'text' 
    },

    description : { 
    	type: 'text' 
    },

    presentations: {
    	collection: 'ConfPresentation',
    	via: 'conference'
    }
  }
};


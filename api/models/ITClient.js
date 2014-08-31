/**
* Name:string.js
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

    logo : {
    	type: 'text',
        required: true
	},

    colorScheme : {
    	type: 'text'
    },

    conferences: {
        collection: 'ITConference',
        via: 'client'
    }
  }
};


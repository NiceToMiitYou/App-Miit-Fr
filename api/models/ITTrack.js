/**
* ITTrack.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'ITEventsDatabase',

  attributes: {

    content : {
    	type: 'text',
    	required: true
    },

    user : {
    	model: 'ITUser',
    	required: true
    },

    conference: {
    	model: 'ITConference',
    	required: true
    }
  }
};


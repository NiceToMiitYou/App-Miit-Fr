/**
* ITConference.js
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

    client: {
    	model: 'ITClient',
        required: true
    },

    chatrooms: {
    	collection: 'ITChatRoom',
    	via: 'conference'
    },

    categories: {
        collection: 'ITResourceCategory',
        via: 'conference'
    },

    tracks: {
        collection: 'ITTrack',
        via: 'conference'
    }
  }
};

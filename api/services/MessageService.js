/**
 *
 * @description Service to manage messages
 *
 */

var actions = {};

actions.import = function( data, cb ) {

    if( data.conference ) {
        
        try {
        
            ImportationDataService.import( data.conference, cb );
        } catch( err ) {

            sails.log.debug( err );

            cb( err );
        }
    } else {

        cb( new Error('No conference provided.') );
    }
};

module.exports = {

    handle: function( data, cb ) {

        if( data.action          &&
            actions[data.action] &&
            typeof actions[data.action] === 'function') {

            actions[data.action]( data, cb );
        }
    }
};
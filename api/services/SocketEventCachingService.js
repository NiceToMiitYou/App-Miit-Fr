
var eventsRooms = {
    'chatroom-new':               ['ROLE_VIEWER'], // Chat message for viewers only cause master and live dont care of that
    'live-presentation-next':     ['ROLE_LOGIN'],  // Live for all connected
    'live-presentation-previous': ['ROLE_LOGIN'], // Live for all connected
    'question-presentation-new':  ['ROLE_VIEWER', 'ROLE_MASTER'], // Live dont car of that
    'question-presentation-like': ['ROLE_VIEWER', 'ROLE_MASTER'] // Same
};

var estimatedMessagesPerMinute  = 1 / 5; // 1 message per 5 minutes for one participant
var estimatedParticipant        = 10;    // ACTUALLY STATIC, TO CHANGE AFTER
var maxMessages                 = 40;    // Actual client limitation for displaying messages

// Calculate the number of messages in one minute
var calculatedMessagesPerMinute = estimatedParticipant * estimatedMessagesPerMinute;

// Default in case of zero
var durationCoefficient         = 1;

// Calculate the duration minimal to keep max messages limitations
if( calculatedMessagesPerMinute !== 0) {

    durationCoefficient         = maxMessages / calculatedMessagesPerMinute;
}

module.exports = {

    sendToAll: function( conference, event, data, stayAlive, shouldApplyCoef ) {

        if ( !stayAlive ) {
            // By default, 24 hours
            stayAlive = 24 * 60 * 60;
        }

        // Add milliseconds for time
        stayAlive *= 1000;

        // Apply duration coefficient to have a good comportement in conference
        if( shouldApplyCoef ) {
            
            stayAlive = Math.round(stayAlive * durationCoefficient);
        }

        var expire = new Date(
            ( new Date() )
                .getTime() + stayAlive
        );

        if( typeof data.toJSON === 'function') {

            data = data.toJSON();
        }

        for( var index in data ) {

            if( typeof data[index].toJSON === 'function') {

                data[index] = data[index].toJSON();
            }
        }

        ConfLiveApplicationEvent
            .create( {
                conference: conference,
                name:       event,
                data:       JSON.stringify( data ),
                expire:     expire
            } )
            .exec( function( err, model ) {
                if( err ) {

                    return sails.log.debug( err );
                }

                // Broadcast to all concerned events
                if( eventsRooms[model.name] ) {

                    _.forEach( eventsRooms[model.name], function( role ) {

                        sails.sockets.broadcast( role + '_' + +conference, model.name, model );
                    } );
                }
            } );
    }

};

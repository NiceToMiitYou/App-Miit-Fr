
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
    // TODO: refactor with an option argument
    sendToAll: function( conference, event, data ) {

        var stayAlive       = sails.config.application.events.duration[event] ||
                              sails.config.application.events.duration.default,

            shouldApplyCoef = sails.config.application.events.coefficient[event] || false;

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

                _.forEach(
                    sails.config.application.events.rooms[model.name] || [],
                    function( role ) {

                        sails.sockets.broadcast( role + '_' + +conference, model.name, model );
                    }
                );
            } );
    }
};

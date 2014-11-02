module.exports = {

    sendToAll: function( event, data, stayAlive ) {

        if ( !stayAlive ) {
            // By default, 24 hours
            stayAlive = 24 * 60 * 60;
        }

        // Add milliseconds for time
        stayAlive *= 1000;

        var expire = new Date(
            ( new Date() )
            .getTime() + stayAlive
        );

        if( typeof data.toJSON === 'function') {
            data = data.toJSON();
        }

        for( index in data ) {
            if( typeof data[index].toJSON === 'function') {
                data[index] = data[index].toJSON();
            }
        }

        ConfLiveApplicationEvent.create( {
            name: event,
            data: JSON.stringify( data ),
            expire: expire
        } )
            .exec( function( err, model ) {
                if ( err ) return sails.log.debug( err );

                sails.sockets.broadcast( 'AllConnectedToRT', model.name, model );
            } );
    }

};

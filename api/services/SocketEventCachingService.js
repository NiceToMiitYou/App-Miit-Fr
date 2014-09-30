module.exports = {

    sendToAll: function ( event, data ) {
        ConfLiveApplicationEvent.create( {
                name: event,
                data: JSON.stringify( data.toJSON() )
            } )
            .exec( function ( err, model ) {
                if ( err ) return sails.log.debug( err );

                sails.sockets.broadcast( 'AllConnectedToRT', model.name, {
                    token: model.id,
                    data: model.data
                } );
            } );
    }

};
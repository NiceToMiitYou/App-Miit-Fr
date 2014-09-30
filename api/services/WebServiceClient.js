var https = require( 'https' );

module.exports = {

    sendData: function ( method, path, data, cb ) {
        var jsonData = JSON.stringify( data );

        var options = {
            host: sails.config.webservice.host,
            port: sails.config.webservice.port,

            path: path,
            method: method,

            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': jsonData.length
            }
        };

        https.request( options, function ( res ) {
            var msg = '';

            res.setEncoding( 'utf8' );

            res.on( 'data', function ( chunk ) {
                msg += chunk;
            } );

            res.on( 'end', function () {
                if ( typeof cb == 'function' ) {
                    cb( JSON.parse( msg ) );
                }
            } );
        } );

        req.write( jsonData );
        req.end();
    }


};
/**
 *
 * @description Service to manage queues messaging
 *
 */

var AWS = require('aws-sdk'), sqs, queueUrl, retrieveTimeoutId;

function retrieveMessage() {
    var params = {
        QueueUrl:            queueUrl,
        MaxNumberOfMessages: 1
    };

    // Retrieve a message
    sqs.receiveMessage( params, function( err, data ) {
        if ( err ) {
             sails.log.debug( err );
        }
        else
        {
             // Handle each messages
             _.forEach( data.Messages, function( message ) {

                 // Try to handle it
                 try {

                    var body = JSON.parse( message.Body );

                    // Handle it
                    MessageService.handle( body, function( e ) {
                        if ( e ) { 
                            sails.log.debug( e );
                        }

                        // Delete it
                        deleteMessage( message.ReceiptHandle );
                    } );

                 } catch( e ) {

                    sails.log.debug( message, e.message );

                    // Delete it
                    deleteMessage( message.ReceiptHandle );
                 }
             } );
        }
    } );
}

function deleteMessage( ReceiptHandle ) {

    var params = {
        QueueUrl:      queueUrl,
        ReceiptHandle: ReceiptHandle
    };

    // Delete the message
    sqs.deleteMessage( params, function( err, data ) {
        if (err) {
            sails.log.debug( err );
        }
    } );
}

module.exports = {

    /**
     *
     * QueueService.initialize()
     *
     * @description Initialize the service
     *
     */
    initialize: function( cb ) {
        
        // Set up AWS
        AWS.config.update( sails.config.application.aws );

        // Set up SQS
        sqs = new AWS.SQS( {
            apiVersion: '2012-11-05'
        } );

        // Retrieve queue URL
        var params = {
            QueueName: sails.config.application.sqs
        };

        // Retrieve queue URL
        sqs.getQueueUrl( params, function( err, data ) {
            if (err) {
                sails.log.debug( err );
            } else {

                queueUrl = data.QueueUrl;
                
                // Retrieve messages every 30s
                retrieveTimeoutId = setInterval( retrieveMessage, 60 * 1000 );
            }

            if( typeof cb === 'function') {

                cb( err );
            }
        } );
    }
};
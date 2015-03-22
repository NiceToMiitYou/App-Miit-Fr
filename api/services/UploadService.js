/**
 *
 * @description Service to manage queues messaging
 *
 */

var AWS     = require('aws-sdk'), s3, bucket,
    fs      = require('fs'),
    options = {
        queueSize: 2
    };

// Create an upload Queue
var UploadQueue = async.queue( function ( file, callback ) {

    // Params for upload
    var params = { 
        Bucket: bucket,
        Key:    file.name,
        Body:   fs.readFileSync( file.path )
    };

    // Upload the file
    s3.upload(params, options, function(err, data) {
        // Log informations
        if( err ) {
            sails.log.debug( err );
        } else {
            sails.log.debug( data );
        }

        // Call next
        callback();
    });

}, 2);

module.exports = {

    /**
     *
     * UploadService.initialize()
     *
     * @description Initialize the service
     *
     */
    initialize: function( cb ) {
        
        // Set up AWS
        AWS.config.update( sails.config.application.aws );

        // Set up SQS
        s3 = new AWS.S3( {
            apiVersion: '2006-03-01'
        } );

        bucket = sails.config.application.s3;

        if( typeof cb === 'function') {

            cb();
        }
    },

    /**
     *
     * UploadService.upload()
     *
     * @description Add a file in the upload queue
     *
     */
    upload: function( name, path ) {

        if( name && path ) {

            UploadQueue.push( {
                name: name,
                path: path
            } );

            return true;
        }

        return false;
    }
};
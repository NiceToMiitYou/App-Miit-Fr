
var appRoot = require('app-root-path'),
    webshot = require('webshot'),
    lwip    = require('lwip'),
    path    = require('path'),
    fs      = require('fs'),
    size    = {
        big : {
            width: 2048,
            height: 1536
        },
        small : {
            width: 227,
            height: 170
        }
    },
    options = {
        screenSize: size.big,
        renderDelay: 10000,
        customHeaders: {
            'Need-Capture-A-Slide': 'Give-Me-The-Capture-Power-Please-!'
        },
        userAgent: 'Miit-Capture-User-Agent (secret => oiLu31zxaWmn4y8bCWV9U0Kk484LtJyFMU8NuwCIJcfpstcpSf8zuTBeWZvtRMB3gO3mpnCAFJ5wYbHYazaWYfNqk4F8ZcIYURUfq4JhmsWq7amSMkVlfGdPPwpFk6DQ)'
    },
    thumbnailPath = appRoot + '/.tmp/public/images/';

// Create a ScreenShot Queue
var ScreenshotQueue = async.queue( function ( infos, callback ) {

    // Get infos
    var count        = infos.count,
        conference   = infos.conference,
        presentation = infos.presentation,
        slide        = infos.slide,
        baseUrl      = infos.url;
    
    var saveFile = generateImageInfo( infos ),
        url      = baseUrl + 'api/live/capture/' + conference + '/' + presentation + '/' + count;

    // Create file directory
    mkdirpSync( saveFile.dir );

    webshot( url, saveFile.path, options, function( err ) {

        if( !err ) {

            sails.log.debug('File generated:', saveFile.name);

            // Genrate small image
            ThumbnailQueue.push( {
                origin:       saveFile, 
                conference:   conference, 
                presentation: presentation, 
                slide:        slide,
                size:         'small'
            } );
        } else {

            sails.log.debug('Can\'t generate file:', saveFile.name);
        }

        callback();
    } );
}, 1 );

// Create a Thumbnail Shot Queue
var ThumbnailQueue = async.queue( function ( infos, callback ) {

    var origin       = infos.origin;

    var saveFile = generateImageInfo( infos );

    // Create file directory
    mkdirpSync( saveFile.dir );

    lwip.open( origin.path, function( err, image ) {

        image
            .batch()
            .resize( size.small.width, size.small.height )
            .writeFile( saveFile.path, 'png', {
                compression: 'high',
                transparency: false
            }, function( err ) {

                if( !err ) {

                    sails.log.debug('File generated:', saveFile.name);

                    // Upload the thumbnail
                    UploadService.upload( saveFile.name, saveFile.path );

                } else {

                    sails.log.debug('Can\'t generate file:', saveFile.path, err);
                }

                callback();
            } );
    } );
}, 1 );

// mkdir with EExist tolerant
function mkdirSync( dirpath ) {

    try {
    
        fs.mkdirSync( dirpath );
    } catch(e) {
    
        if ( e.code != 'EEXIST' ) {
            throw e;
        }
    }
}

// Like mkdir -p
function mkdirpSync( dirpath ) {
    var first = '',
        parts = dirpath.split( path.sep );

    if ( dirpath.charAt( 0 ) === path.sep ) {

        first = path.sep;
    }
    
    for( var i = 1; i <= parts.length; i++ ) {

        mkdirSync( first + path.join.apply( null, parts.slice(0, i) ) );
    }
}

// Generate information of an image
function generateImageInfo( infos ) {

    var size = ( infos.size === 'small' ) ? 'thumbnails' : infos.size,
        dir  = size + '/' + infos.conference + '/' + infos.presentation,
        name = dir + '/' + infos.slide + '.png';

    return {
        name: name,
        path: thumbnailPath + name,
        dir:  thumbnailPath + dir
    };
}

// Generate all thumbnails for a conference
function generateThumbnail( conference, baseUrl, cb ) {

    ConfPresentation
        .find( { 
            conference: conference
        } )
        .populate( 'conference' )
        .populate( 'slides' )
        .exec(
            function( err, presentations ) {

                if( ! err ) {

                    // For each presentations
                    _.forEach( presentations, function( presentation ){

                        // For each slides of the presentation
                        var count = 0;

                        _.forEach( _.sortBy( presentation.slides, 'id' ), function( slide ) {

                            // Genrate big image
                            ScreenshotQueue.push( {
                                conference:   presentation.conference.id,
                                presentation: presentation.id,
                                slide:        slide.id,
                                count:        count,
                                size:         'big',
                                url:          baseUrl
                            } );

                            count++;
                        } );
                    } );
                }
                
                if ( typeof cb === 'function' ) {

                    cb();
                }
            } );
}

module.exports = {

    generate: function( conferenceId, baseUrl, cb ) {

        return generateThumbnail( conferenceId, baseUrl, cb );
    }
};

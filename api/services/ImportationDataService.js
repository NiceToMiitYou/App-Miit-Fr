
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
    thumbnailPath = appRoot + '/.tmp/public/images/',
    environment   = 'development';

// Create a ScreenShot Queue
var ScreenshotQueue = async.queue( function ( infos, callback ) {

    // Get infos
    var count        = infos.count,
        conference   = infos.conference,
        presentation = infos.presentation,
        slide        = infos.slide;
    
    var saveFile = generateImageInfo( infos ),
        url      = getUrl() + 'api/live/capture/' + conference + '/' + presentation + '/' + count;


    // Create file directory
    mkdirpSync( saveFile.dir );

    webshot( url, saveFile.path, options, function( err ) {

        if( !err ) {

            sails.log.debug('File generated: ' + saveFile.name);

            // Genrate small image
            ThumbnailQueue.push( {
                origin:       saveFile, 
                conference:   conference, 
                presentation: presentation, 
                slide:        slide,
                size:         'small'
            } );
        } else {

            sails.log.debug('Can\'t generate file: ' + saveFile.name);
        }

        callback();
    } );
}, 1 );

// Create a Thumbnail Shot Queue
var ThumbnailQueue = async.queue( function ( infos, callback ) {

    var origin       = infos.origin,
        conference   = infos.conference,
        presentation = infos.presentation,
        slide        = infos.slide;

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

                    sails.log.debug('File generated: ' + saveFile.name);

                    // Upload the thumbnail
                    UploadService.upload( saveFile.name, saveFile.path );

                } else {

                    sails.log.debug('Can\'t generate file: ' + saveFile.path, err);
                }

                callback();
            } );
    } );
}, 1 );

function getUrl() {
    var url = 'http://127.0.0.1:8080/';

    switch( environment ) {

        case 'qualification':
           url = 'http://app.qlf.priv.miit.fr/';
           break;

        case 'staging':
           url = 'http://app.stg.priv.miit.fr/';
           break;

        case 'production':
           url = 'http://app.miit.fr/';
           break;
    }

    return url;
}

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


// Import all data
function importData( conference, cb ) {

    async.waterfall( [

        // Initialize
        function( cb ) {

            // Send the conference
            cb( null, conference );
        },

        importConference,

        importPresentations,

        importResourcesCategories,

        importChatrooms,

        importTags,

        importQuizzes

        ], cb );

}

// Prototype to wait all data
function waitAll( data, action, cb, cbArg ) {

    var count = 0,
        size  = _.size( data );

    if( size === 0 ) {
        cb();

    } else {

        _.each( data, function( item ) {

            action( item.id, function() {
                count++;

                if( size === count ) {

                    cb( null, cbArg );
                }
            });
        });
    }
}

// Import the conference
function importConference( conferenceId, cb ) {

    ItConference
        .findOne( conferenceId )
        .exec(
            function( err, conference ) {
                if( err ) throw err;
                if( !conference ) return cb( new Error('No conference found.') ); 

                ItClient
                    .findOne( conference.client )
                    .exec(
                        function( err, client ) {
                            if( err ) throw err;

                            ConfConference
                                .create( {
                                    id:             conference.id,
                                    name:           conference.name,
                                    token:          conference.token,
                                    description:    conference.description,
                                    logo:           conference.logo,
                                    colorScheme:    conference.colorScheme,
                                    restrictions:   conference.restrictions,
                                    clientName:     client.name
                                } )
                                .exec(
                                    function( err ) {
                                        if( err ) throw err;

                                        cb( null, conferenceId );
                                    });
                        });
            });
}

// Import chatrooms
function importChatrooms( conferenceId, cb ) {

    ItChatRoom
        .find({ 
            conference: conferenceId 
        })
        .exec(
            function( err, chatrooms ) {
                if( err ) throw err;

                ConfChatRoom
                    .create( chatrooms )
                    .exec(
                        function( err ) {
                            if( err ) throw err;

                            cb( null, conferenceId );
                        });
            });
}

// Import tags
function importTags( conferenceId, cb ) {

    ItTag
        .find({
            conference: conferenceId 
        })
        .exec(
            function( err, tags ) {
                if( err ) throw err;

                ConfTag
                    .create( tags )
                    .exec(
                        function( err ) {
                            if( err ) throw err;

                            cb( null, conferenceId );
                        });
            });
}


// Import the presentations
function importPresentations( conferenceId, cb ) {

    ItPresentation
        .find({ 
            conference: conferenceId 
        })
        .exec(
            function( err, presentations ) {
                if( err ) throw err;

                ConfPresentation
                    .create( presentations )
                    .exec( 
                        function( err, created ) {
                            if( err ) throw err;

                            waitAll( created, importSlides, cb, conferenceId );
                        });
            });
}

// Import the slides
function importSlides( presentationId, cb ) {

    ItSlide
        .find({
            presentation: presentationId
        })
        .exec(
            function( err, slides ) {
                if( err ) throw err;

                ConfSlide
                    .create( slides )
                    .exec( 
                        function( err, created ) {
                            if( err ) throw err;

                            waitAll( created, importQuestionsSlides, cb );
                        });
            });
}

// Import Questions of slides
function importQuestionsSlides( slideId, cb ) {

    ItQuestionSlide
        .find({ 
            slide: slideId 
        })
        .exec(
            function( err, questions ) {
                if( err ) throw err;

                ConfQuestionSlide
                    .create( questions )
                    .exec( 
                        function( err, created ) {
                            if( err ) throw err;

                            waitAll( created, importQuestionsSlidesAnswers, cb );
                        });
            });
}

// Import Answers of Questions of Slides
function importQuestionsSlidesAnswers( questionId, cb ) {

    ItQuestionSlideAnswer
        .find({ 
            question: questionId 
        })
        .exec(
            function( err, answers ) {
                if( err ) throw err;

                ConfQuestionSlideAnswer
                    .create( answers )
                    .exec( 
                        function( err ) {
                            if( err ) throw err;

                            cb();
                        });
            });
}

// Import Categories of resources
function importResourcesCategories( conferenceId, cb ) {

    ItResourceCategory
        .find({
            conference: conferenceId
        })
        .exec(
            function( err, categories ) {
                if( err ) throw err;
                
                ConfResourceCategory
                    .create( categories )
                    .exec(
                        function( err, created ) {
                            if( err ) throw err;

                            waitAll( created, importResources, cb, conferenceId );
                        });
            });
}


// Import Categories of resources
function importResources( categoryId, cb ) {

    ItResource
        .find({
            category: categoryId
        })
        .exec(
            function( err, resources ) {
                if( err ) throw err;

                ConfResource
                    .create( resources )
                    .exec(
                        function( err ) {
                            if( err ) throw err;

                            cb();
                        });
            });
}

// Import quizzes
function importQuizzes( conferenceId, cb ) {

    ItQuizz
        .find({
            conference: conferenceId
        })
        .exec(
            function( err, quizzes ) {
                if( err ) throw err;
                
                ConfQuizz
                    .create( quizzes )
                    .exec(
                        function( err, created ) {
                            if( err ) throw err;

                            waitAll( created, importQuizzesQuestions, cb, conferenceId );
                        });
            });
}

// Import quizz's questions
function importQuizzesQuestions( quizzId, cb ) {

    ItQuestionQuizz
        .find({
            quizz: quizzId
        })
        .exec(
            function( err, questions ) {
                if( err ) throw err;
                
                ConfQuestionQuizz
                    .create( questions )
                    .exec(
                        function( err, created ) {
                            if( err ) throw err;

                            waitAll( created, importQuizzesQuestionsAnswers, cb );
                        });
            });
}

// Import quizz's answers
function importQuizzesQuestionsAnswers( questionId, cb ) {

    ItQuestionQuizzAnswer
        .find({
            question: questionId
        })
        .exec(
            function( err, answers ) {
                if( err ) throw err;
                
                ConfQuestionQuizzAnswer
                    .create( answers )
                    .exec(
                        function( err ) {
                            if( err ) throw err;

                            cb();
                        });
            });
}

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

function generateThumbnail( conference, cb ) {

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
                                size:         'big'
                            } );

                            count++;
                        } );
                    } );
                }
                
                cb();
            } );
}

module.exports = {

    import: function( conferenceId, cb ) {

        // Set the environment
        environment = sails.config.environment;

        sails.log.debug('Importation of data from id "' + conferenceId + '"...');
        
        ConfConference
            .findOne( conferenceId )
            .exec(
                function( err, conference ) {
                    if( err ) {

                        throw err;
                    }

                    if ( conference ) {

                        sails.log.debug('The conference is already imported...');

                        return ThumbnailService.generate( conferenceId, getUrl(), cb );
                    }

                    importData( conferenceId, function( errImport ) {

                        if( errImport ) {

                            sails.log.debug( errImport.message );
                        }

                        sails.log.debug('Importation of data... DONE!');
                        
                        return ThumbnailService.generate( conferenceId, getUrl(), cb );
                    } );
                } );
    }
};
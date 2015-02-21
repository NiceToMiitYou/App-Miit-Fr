
var appRoot = require('app-root-path'),
    webshot = require('webshot'),
    lwip = require('lwip'),
    size = {
        big : {
            width: 2048,
            height: 1536
        },
        small : {
            width: 227,
            height: 170
        }
    },
    thumbnailPath = appRoot + '/.tmp/public/images/slides';

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
                if( !conference ) throw new Error('No conference found.'); 

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

function beautifyHtml( html ) {

    return '<html>' +
            '<head>' +
            '<link rel="stylesheet" href="http://127.0.0.1:' + sails.config.port + '/styles/css/main.css"/>' +
            '</head>' +
            '<body>' +
                '<div id="slides" class="presentation-slide">' +
                    '<div class="slide">' +
                        html +
                    '</div>' +
                '</div>' +
                '<script>' +
                    'var inputs = document.getElementsByTagName("img");' +
                    'for(var i = 0; i < inputs.length; i++) {' +
                    '    inputs[i].src = "http://127.0.0.1:' + sails.config.port + '" + inputs[i].src;' +
                    '    document.write(inputs[i].src);' +
                    '}' +
                '</script>' +
            '</body>' +
           '</html>';
}

function generateImagePath( base, size, presentation, slide ) {

    return base + '/' + size + '_' + presentation + '_' + slide + '.png';
}

var i = 0;

function generateBigImage( path, presentation, slide, html ) {

    setTimeout(function() {

        var saveFile = generateImagePath( path, 'big', presentation, slide );

        var options = {
            screenSize: size.big,
            siteType: 'html',
            renderDelay: 4000,
            settings: {
                localToRemoteUrlAccessEnabled: true
            }
        };

        webshot( beautifyHtml( html ), saveFile, options, function( err ) {

            if( !err ) {

                sails.log.debug('File generated: ' + saveFile);

                setTimeout(function() {

                    // Genrate small image
                    generateSmallImage( saveFile, path, presentation, slide );
                }, 500);

            } else {

                sails.log.debug('Can\'t generate file: ' + saveFile);

                sails.log.debug( err );
            }
        } );
    }, i * 2100 );

    i++;
}

function generateSmallImage( origin, path, presentation, slide ) {

    var saveFile = generateImagePath( path, 'small', presentation, slide );

    lwip.open( origin, function( err, image ) {

        image
            .batch()
            .resize(size.small.width, size.small.height)
            .writeFile( saveFile, 'png', {
                compression: 'high',
                transparency: false
            }, function( err ) {

                if( !err ) {

                    sails.log.debug('File generated: ' + saveFile);

                } else {

                    sails.log.debug('Can\'t generate file: ' + saveFile);
                }
            } );
    } );
}

function generateThumbnail( path, cb ) {

    ConfPresentation
        .find()
        .populate( 'slides' )
        .exec(
            function(err, presentations) {
            
                if( ! err ) {

                    // For each presentations
                    _.forEach( presentations, function( presentation ){

                        // For each slides of the presentation
                        _.forEach( presentation.slides, function( slide ) {

                            // Genrate big image
                            generateBigImage( path, presentation.id, slide.id, slide.content );
                        } );
                    } );
                }
                
                cb();
            } );
}

module.exports = {

    import: function( conferenceId, cb ) {

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

                        return generateThumbnail( thumbnailPath, cb );
                    }

                    importData( conferenceId, function() {

                        sails.log.debug('Importation of data... DONE!');
                        
                        return generateThumbnail( thumbnailPath, cb );
                    } );
                } );
    },

    thumbnail: function( cb ) {

        return generateThumbnail( thumbnailPath, cb );
    }
};
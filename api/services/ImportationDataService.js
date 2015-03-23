
var environment   = 'development';

function getUrl() {
    var url = 'http://127.0.0.1:8080/';

    switch( environment ) {

        case 'qualification':
           url = 'http://app.qlf.priv.miit.fr/';
           break;

        case 'staging':
           url = 'http://app.stg.priv.miit.fr/';
           break;
    }

    return url;
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

                        return ThumbnailService.generate( conferenceId, getUrl() );
                    }

                    importData( conferenceId, function( errImport ) {

                        if( errImport ) {

                            sails.log.debug( errImport.message );
                        }

                        sails.log.debug('Importation of data... DONE!');
                        
                        return ThumbnailService.generate( conferenceId, getUrl() );
                    } );
                } );

        if ( typeof cb === 'function' ) {

            cb();
        }
    }
};
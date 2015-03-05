// Export all data
function exportData( conference, cb ) {

    async.waterfall( [

        // Initialize
        function( cb ) {

            // Send the conference
            cb( null, conference );
        },

        exportPresentations,

        exportQuizzes,

        exportTracks

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

// export Questions of slides
function exportPresentations( conference, cb ) {

    ConfPresentation
        .find( { 
            conference: conference
        } )
        .populate('slides')
        .exec(
            function( err, presentations ) {
                if( err ) throw err;

                var slides = _.flatten( 
                    _.map( presentations, 'slides' )
                );

                waitAll( slides, exportQuestionsSlides, cb, conference );
            });
}

// export Questions of slides
function exportQuestionsSlides( slide, cb ) {

    ConfQuestionSlide
        .find( { 
            slide: slide
        } )
        .exec( 
            function( err, questions ) {
                if( err ) throw err;

                waitAll( questions, exportQuestionsSlidesAnswers, cb );
            });
}

// export Answers of Questions of Slides
function exportQuestionsSlidesAnswers( question, cb ) {

    ConfQuestionSlideAnswer
        .find( { 
            question: question
        } )
        .populate('users')
        .exec(
            function( err, answers ) {
                if( err ) throw err;

                _.forEach( answers, function( answer ) {

                    var users = _.map( answer.users, 'id' );
                    
                    if( _.size( users ) ) {

                        ItQuestionSlideAnswer
                            .custom( {
                                method: 'postJson',
                                action: 'export',
                                data: {
                                    answer: answer.id,
                                    users:  users
                                }
                            }, function( err ) {

                                if ( err ) {

                                    sails.log.debug( err );
                                }
                            } );
                    }
                } );

                cb();
            });
}

// export quizzes
function exportQuizzes( conference, cb ) {

    ConfQuizz
        .find( {
            conference: conference
        } )
        .populate( 'questions' )
        .exec(
            function( err, quizzes ) {
                if( err ) throw err;

                var questions = _.flatten( 
                    _.map( quizzes, 'questions' )
                );
                
                waitAll( questions, exportQuizzesQuestionsAnswers, cb, conference );
            } );
}

// export quizz's answers
function exportQuizzesQuestionsAnswers( question, cb ) {

    ConfQuestionQuizzAnswer
        .find( {
            question: question
        } )
        .populate( 'users' )
        .exec(
            function( err, answers ) {
                if( err ) throw err;

                _.forEach( answers, function( answer ) {

                    var users = _.map( answer.users, 'id' );
                    
                    if( _.size( users ) ) {

                        ItQuestionQuizzAnswer
                            .custom( {
                                method: 'postJson',
                                action: 'export',
                                data: {
                                    answer: answer.id,
                                    users:  users
                                }
                            }, function( err ) {

                                if ( err ) {

                                    sails.log.debug( err );
                                }
                            } );
                    }
                } );

                cb();
            } );
}

function exportTracks( conference, cb ) {

    ConfTrack
        .find( {
            conference: conference
        } )
        .populate('user')
        .populate('conference')
        .exec(
            function( err, tracks ) {
                if( err ) throw err;

                if( _.size( tracks ) ) {

                    tracks = _.map( tracks, function( track ) {
                        return _.omit( track, [ 'id', 'createdAt', 'updatedAt' ] );
                    } );

                    ItTrack
                        .create( tracks )
                        .exec( function( err ) {

                            if ( err ) {

                                sails.log.debug( err );
                            }

                            cb( null, conference );
                        } );
                
                } else {

                    cb( null, conference );
                }
            } );

}

module.exports = {

    export: function( conferenceId, cb ) {

        sails.log.debug('Exportation of data from id "' + conferenceId + '"...');
        
        ConfConference
            .findOne( conferenceId )
            .exec(
                function( err, conference ) {
                    if( err ) {

                        throw err;
                    }

                    if ( !conference ) {

                        sails.log.debug('The conference doesn\'t exist...');
                    } else {

                        exportData( conferenceId, function( errExport ) {

                            if( errExport ) {

                                sails.log.debug( errExport.message );
                            }

                            sails.log.debug('Exportation of data... DONE!');
                        } );
                    }
                } );

        if ( typeof cb === 'function' ) {

            cb();
        }
    }
};
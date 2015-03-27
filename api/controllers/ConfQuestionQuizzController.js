/**
 * ConfQuestionQuizzController
 *
 * @description :: Server-side logic for managing Confquestionquizzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

// Count the intersection of both answers collection
function intersectionCountAnswers( one, two ) {

    return _.size(
        _.intersection(
            _.map( one, 'id' ),
            _.map( two, 'id' )
        )
    );
}

// Count the difference of both answers collection
function differenceCountAnswers( one, two ) {

    return _.size(
        _.difference(
            _.map( one, 'id' ),
            _.map( two, 'id' )
        )
    );
}

// Check the integrity of all questions
function checkAllQuestions( quizzId, conference, userId, selected, cb ) {

    // Check if this is a valid quizz
    ConfQuizz
        .findOne( {
            id:         quizzId,
            conference: conference
        } )
        .exec( function( err, quizz ) {
            if(  err ||
                !quizz ) {

                return cb( err || new Error('No quizz found.') );
            }

            // Check the question integrity
            ConfQuestionQuizz
                .find( {
                    quizz: quizzId
                } )
                .populate( 'answers' )
                .exec( function( errQuestions, questions ) {
                    if(  errQuestions &&
                        !questions ) {

                        return cb( errQuestions || new Error('No question found.') );
                    }

                    // Get user informations
                    ConfUser
                        .findOne( userId )
                        .populate( 'quizzAnswers' )
                        .exec( function( errUser, user ) {
                            if(  errUser &&
                                !user ) {

                                return cb( errUser || new Error('No user found.') );
                            }

                            var answered = false;

                            // Try to know if the quizz is answered
                            _.forEach(
                                _.flatten( _.map( questions, 'answers') ),
                                function( answer ) {

                                    // For each answers of user
                                    _.forEach(
                                        user.quizzAnswers,
                                        function( userAnswer ) {

                                            // Check if same id
                                            if ( userAnswer.answer === answer.id) {
                                                
                                                // Set answered
                                                answered = true;
                                            }
                                        } );
                                } );

                            // Throw an error if already answered
                            if( answered ) {

                                return cb( new Error('The quizz is already answered.') );
                            }

                            // All sent questions id
                            var keys  = _.transform( _.keys( selected ), function(memo, val, idx) {
                                    memo[idx] = +val;
                                } ),
                                // All questions id
                                ids   = _.map( questions, 'id' );

                            // Count if there is extra questions
                            var difference = _.size(
                                _.difference( keys, ids )
                            );

                            // throw the error on extra questions
                            if( difference > 0 ) {

                                return cb( new Error( 'There is extra questions.' ) );
                            }

                            // Prepare the list of tasks
                            var tasks = [];

                            // Iterate on each question
                            _.forEach( questions, function( question ) {

                                // Add the function in the process
                                tasks.push( checkQuestionIntegrity( question, selected[question.id] || [] ) );
                            } );

                            // Check if they are all good
                            async.waterfall( tasks, cb );
                        } );
                } );
        } );
}

// Check the integrity of one question
function checkQuestionIntegrity( question, answers ) {

    return function( callback ) {

        // Get the numbers of answers
        var size       = _.size( answers ),
            intersect  = intersectionCountAnswers( answers, question.answers ),
            difference =   differenceCountAnswers( answers, question.answers );

        // If there is answers but they 
        if ( size > 0 && intersect === 0 || difference > 0 ) {

            return callback( new Error( 'The given answers doesn\'t match with existing.' ) ); 
        }

        // Validate the requierements of the question
        switch ( question.type ) {
            case 0: // Nothing

                // If there is too many answers
                if( size !== 0 ) {

                    return callback( new Error('Should not have answer.') );
                }
                break;

            case 1: // One answer

                // If there is too many answers
                if( size > 1 ) {

                    return callback( new Error('Should not have many answers.') );
                }

                // Check if there is one answer
                if( question.required &&
                    size !== 1
                ) {

                    return callback( new Error('Should have one answer.') );
                }
                break;

            case 2: // Multiple answers

                // Check if there is one answer
                if( question.required &&
                    size === 0
                ) {

                    return callback( new Error('Should have one answer at least.') );
                }
                break;

            case 3: // Open question
                
                // Check if there is an answer
                if( question.required &&
                    size !== 1
                ) {

                    return callback( new Error('Should have one answer at least.') );
                }

                // Check if there is the text
                if( size === 1 ) {

                    // store the answer
                    var first = _.first( answers );

                    if( !first       ||
                        !first.extra ||
                        !first.extra.text ) {

                        return callback( new Error('Should have a text for the given answer.') );
                    }
                }
                break;
        }

        // Go to the next step
        callback();
    };

}

module.exports = {

    /**
     * `ConfQuestionQuizzController.list()`
     */
    list: function( req, res ) {

        ConfQuizz
            .find( {
                conference: req.session.conference
            } )
            .exec( function( err, quizzes ) {
                if ( err || !quizzes ) {

                    return res.notDone();
                }
                
                return res.done( {
                    quizzes: quizzes
                } );
            } );
    },

    /**
     * `ConfQuestionQuizzController.questions()`
     */
    questions: function( req, res ) {

        var quizz = req.param( 'quizz' );

        ConfQuestionQuizz
            .find( {
                quizz: quizz
            } )
            .populate( 'answers' )
            .exec( function( err, questions ) {
                if ( err || !questions ) {

                    return res.notDone();
                }

                return res.done( {
                    questions: questions
                } );
            } );
    },

    /**
     * `ConfQuestionQuizzController.answer()`
     */
    answer: function( req, res ) {

        var quizz    = req.param( 'quizz' ),
            selected = req.param( 'selected' );

        // If there is a quizz and data sent
        if( quizz && selected ) {

            // Iterate on each question
            checkAllQuestions( quizz, req.session.conference, req.session.user, selected, function( errValidate ) {
                if( errValidate ) {

                    return res.notDone();
                }

                var choices = [];

                // Iterate for all questions
                _.forEach( selected, function( answers ) {
                    
                    // Register each answers but wait to execute the other one
                    _.forEach( answers, function( answer ) {

                        choices.push( {
                            user:   req.session.user,
                            answer: answer.id,
                            extra:  answer.extra || null
                        } );
                    } );
                } );

                // Create them on the database
                ConfQuestionQuizzChoiceUser
                    .create( choices )
                    .exec( function( err ) {
                        if( err ) {

                            return res.notDone();
                        }

                        return res.done(); 
                    } );
            } );

        } else {

            return res.notDone();
        }
    },

    extract: function( req, res ) {

        var quizz = req.param('quizz');

        if( quizz ) {

            QuizzExtractService.extract( quizz, function( text ) {
                
                res.set('Content-Type', 'text/plain');
                
                return res.send( text );
            } );
        } else {

            return res.notFound();
        }
    }
};

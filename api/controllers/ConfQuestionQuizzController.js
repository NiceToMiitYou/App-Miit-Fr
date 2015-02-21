/**
 * ConfQuestionQuizzController
 *
 * @description :: Server-side logic for managing Confquestionquizzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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

        var questionId = req.param( 'question' ),
            answers    = req.param( 'answers' );

        ConfQuestionQuizz
            .findOne( question )
            .populate( 'answers' )
            .exec( function( err, question ) {
                if ( err || !question || _.size(
                        _.intersection(
                            _.map( question.answers, 'id' ), answers )
                    ) === 0 ) {

                    return res.notDone();
                }

                var answersSize = _.size( answers );

                // Single choice question
                if ( answersSize == 1 && question.type === 1 ||
                     answersSize >= 1 && question.type !== 1 ) {

                    ConfUser
                        .findOne( req.session.user )
                        .populate( 'quizzAnswers' )
                        .exec( function( err, user ) {
                            if (  err ||
                                !user ||
                                0 < _.size( _.filter( user.quizzAnswers, {
                                        question: question.id
                                    } )
                                )
                            ) {
                            
                                return res.notDone();
                            }

                            // Register answers
                            user.quizzAnswers.concat( answers );

                            // Save result
                            user.save( function( err ) {

                                if ( err ) {

                                    return res.notDone();
                                }

                                return res.done();
                            } );

                        } );

                    // Single choice but with many answers
                } else {

                    return res.notDone();
                }
            } );
    }
};

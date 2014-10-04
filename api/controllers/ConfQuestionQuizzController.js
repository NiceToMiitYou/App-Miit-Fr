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
        ConfQuizz.find()
            .exec( function( err, quizzes ) {
                if ( err || !quizzes ) return res.notDone();

                return res.done( {
                    quizzes: quizzes
                } );
            } );
    },

    /**
     * `ConfQuestionQuizzController.questions()`
     */
    questions: function( req, res ) {
        ConfQuestionQuizz.find( {
            quizz: req.param( 'quizz' )
        } )
            .populate( 'answers' )
            .exec( function( err, questions ) {
                if ( err || !questions ) return res.notDone();

                return res.done( {
                    questions: questions
                } );
            } );
    },

    /**
     * `ConfQuestionQuizzController.answer()`
     */
    answer: function( req, res ) {
        ConfQuestionQuizz.findOne( req.param( 'question' ) )
            .populate( 'answers' )
            .exec( function( err, question ) {
                if ( err || !question || _.size(
                    _.intersection(
                        _.map( question.answers, 'id' ), req.param( 'answers' ) )
                ) === 0) return res.notDone();

                // Single choice question
                if ( _.size( req.param( 'answers' ) ) == 1 && question.type === 1 ||
                    _.size( req.param( 'answers' ) ) >= 1 && question.type !== 1 ) {

                    ConfUser.findOne( req.session.user )
                        .populate( 'quizzAnswers', {
                            question: question.id
                        } )
                        .exec( function( err, user ) {
                            if ( err || !user || 0 < _.size( user.quizzAnswers ) ) return res.notDone();

                            // Register answers
                            _( req.param( 'answers' ) )
                                .forEach( function( answer ) {
                                    user.quizzAnswers.add( answer );
                                } );

                            // Save result
                            user.save( function( err, result ) {

                                if ( err ) return res.notDone();

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

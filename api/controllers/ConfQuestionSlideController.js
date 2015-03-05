/**
 * ConfQuestionSlideController
 *
 * @description :: Server-side logic for managing Confquestionslides
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfQuestionSlideController.question()`
     */
    question: function( req, res ) {

        var slide = req.param( 'slide' );

        ConfQuestionSlide
            .findOne( {
                slide: slide
            } )
            .populate( 'answers' )
            .exec(
                function( err, question ) {
                    if ( err || !question ) {

                        return res.notDone();
                    } 
                    
                    return res.done( {
                        question: question
                    } );
                } );
    },


    /**
     * `ConfQuestionSlideController.answer()`
     */
    answer: function( req, res ) {

        var questionId = req.param( 'question' ),
            answers    = req.param( 'answers' );

        ConfQuestionSlide
            .findOne( questionId )
            .populate( 'answers' )
            .exec(
                function( err, question ) {
                    if ( err || !question || question.isClosed || _.size(
                        _.intersection(
                            _.map( question.answers, 'id' ), answers )
                    ) === 0 ) return res.notDone();

                    var answersSize = _.size( answers );

                    // Single choice question
                    if ( answersSize == 1 && question.type === 1 ||
                         answersSize >= 1 && question.type !== 1 ) {

                        ConfUser.findOne( req.session.user )
                            .populate( 'slideAnswers', {
                                question: question.id
                            } )
                            .exec( function( err, user ) {
                                if ( err || !user || 0 < _.size( user.slideAnswers ) ) { 

                                    return res.notDone();
                                }

                                // Register answers
                                _.forEach( answers, function( answer ) {
                                    user.quizzAnswers.add( answer );
                                } );
                                        
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

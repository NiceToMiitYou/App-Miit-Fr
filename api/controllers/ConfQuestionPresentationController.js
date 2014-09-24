/**
 * ConfQuestionPresentationController
 *
 * @description :: Server-side logic for managing Confquestionpresentations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfQuestionPresentationController.create()`
     */
    create: function( req, res ) {
        if ( _.size( req.param( 'tags' ) ) >= 1 ) {
            ConfQuestionPresentation.create( {
                question: req.param( 'question' ),
                user: req.session.user,
                tags: req.param( 'tags' )
            } )
                .exec( function( err, created ) {
                    if ( err ) return res.notDone();

                    SocketEventCachingService.sendToAll( 'question-presentation-new', created );

                    return res.done( {
                        question: created
                    } );
                } );
        }
    },

    /**
     * `ConfQuestionPresentationController.like()`
     */
    like: function( req, res ) {
        ConfQuestionPresentation.findOne( req.param( 'question' ) )
            .exec( function( err, question ) {
                if ( err || !question || question.isAnswered || question.user == req.session.user ) return res.notDone();

                // When there is a question and is not the actual who posted her, try to find him a like
                ConfQuestionPresentationLike.findOne( {
                    question: question.id,
                    user: req.session.user
                } )
                    .exec( function( err, like ) {
                        if ( err || like ) return res.notDone();

                        // If no like before, let's like it
                        ConfQuestionPresentationLike.create( {
                            question: req.param( 'question' ),
                            user: req.session.user,
                            isLiked: req.param( 'like' )
                        } )
                            .exec( function( err, created ) {
                                if ( err ) return res.notDone();

                                SocketEventCachingService.sendToAll( 'question-presentation-like', created );

                                return res.done( {
                                    like: created
                                } );

                            } );

                    } );

            } );
    }
};

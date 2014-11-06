/**
 * ConfQuestionPresentationController
 *
 * @description :: Server-side logic for managing Confquestionpresentations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var questionDuration = 6 * 60 * 60;

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

                    SocketEventCachingService.sendToAll(
                        'question-presentation-new',
                        { 
                            question: created,
                            tags: req.param( 'tags' )
                        },
                        questionDuration
                    );

                    // If no like before, let's like it
                    ConfQuestionPresentationLike.create( {
                        question: created.id,
                        user: req.session.user,
                        isLiked: true
                    } )
                        .exec( function( err, createdLike ) {
                            if ( err ) return res.notDone();

                            SocketEventCachingService.sendToAll(
                                'question-presentation-like',
                                createdLike,
                                questionDuration
                            );
                        } );

                    return res.done( {
                        question: created
                    } );
                } );
        } else {
            return res.notDone();
        }
    },

    /**
     * `ConfQuestionPresentationController.tags()`
     */
    tags: function( req, res ) {
        ConfTag.find()
            .exec( function( err, tags ) {
                if ( err || !tags ) return res.notDone();

                return res.done( {
                    tags: tags
                } );
            } );
    },

    /**
     * `ConfQuestionPresentationController.like()`
     */
    like: function( req, res ) {
        // Find the question
        ConfQuestionPresentation.findOne( {
            id: req.param( 'question' ),
            isAnswered: false
        } )
            .exec( function( err, question ) {
                if ( err || !question ) return res.notDone();

                // Find if already liked
                ConfQuestionPresentationLike.findOne( {
                    question: question.id,
                    user: req.session.user
                } )
                    .exec( function( err, like ) {
                        if ( err ) return res.notDone();
                        if ( like ) return res.notDone({
                            like: like
                        });

                        // If no like before, let's like it
                        ConfQuestionPresentationLike.create( {
                            question: req.param( 'question' ),
                            user: req.session.user,
                            isLiked: req.param( 'like' )
                        } )
                            .exec( function( err, created ) {
                                if ( err ) return res.notDone();

                                SocketEventCachingService.sendToAll(
                                    'question-presentation-like',
                                    created,
                                    questionDuration
                                );

                                return res.done( {
                                    like: created
                                } );
                            } );
                    } );
            } );
    }
};

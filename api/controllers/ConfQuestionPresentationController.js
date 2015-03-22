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

        var question = req.param( 'question' ),
            tags     = req.param( 'tags' );

        if ( _.size( tags ) >= 1 ) {

            ConfQuestionPresentation
                .create( {
                    question:     question,
                    tags:         tags,
                    user:         req.session.user,
                    presentation: req.session.presentation
                } )
                .exec( function( err, created ) {
                    if ( err ) {

                        return res.notDone();
                    }

                    SocketEventCachingService.sendToAll(
                        req.session.conference,
                        'question-presentation-new',
                        { 
                            question: created,
                            tags:     tags
                        }
                    );

                    // If no like before, let's like it
                    ConfQuestionPresentationLike
                        .create( {
                            question: created.id,
                            user:     req.session.user,
                            isLiked:  true
                        } )
                        .exec( function( err, createdLike ) {
                            if ( err ) {

                                return res.notDone();
                            }

                            SocketEventCachingService.sendToAll(
                                req.session.conference,
                                'question-presentation-like',
                                createdLike
                            );

                            return res.done( {
                                question: created
                            } );
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

        ConfTag
            .find( {
                conference: req.session.conference
            } )
            .exec( function( err, tags ) {
                if ( err || !tags ) {

                    return res.notDone();
                }

                return res.done( {
                    tags: tags
                } );
            } );
    },

    /**
     * `ConfQuestionPresentationController.like()`
     */
    like: function( req, res ) {

        var question = req.param( 'question' ),
            isLike   = req.param( 'like' );

        // Find the question
        ConfQuestionPresentation
            .findOne( {
                id:         question,
                isAnswered: false
            } )
            .exec( function( err, questionPresentation ) {
                if ( err || !questionPresentation ) {

                    return res.notDone();
                }

                // Find if already liked
                ConfQuestionPresentationLike
                    .findOne( {
                        question: questionPresentation.id,
                        user:     req.session.user
                    } )
                    .exec( function( err, like ) {
                        if ( err || like ) {

                            return res.notDone({
                                like: like
                            });
                        }

                        // If no like before, let's like it
                        ConfQuestionPresentationLike.create( {
                            question: question,
                            user:     req.session.user,
                            isLiked:  isLike
                        } )
                            .exec( function( err, created ) {
                                if ( err ) {

                                    return res.notDone();
                                }

                                SocketEventCachingService.sendToAll(
                                    req.session.conference,
                                    'question-presentation-like',
                                    created
                                );

                                return res.done( {
                                    like: created
                                } );
                            } );
                    } );
            } );
    }
};

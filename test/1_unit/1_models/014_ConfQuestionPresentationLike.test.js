var should = require( 'should' );

describe( 'ConfQuestionPresentationLike', function () {

    describe( '#create()', function () {

        it( 'create a like', function ( done ) {

            ConfQuestionPresentationLike.create( {
                    isLiked: true,
                    question: 1,
                    user: 2
                } )
                .exec( function ( err, like ) {
                    should.not.exist( err );

                    should.exist( like );

                    ( like )
                    .should.be.an.instanceOf( Object );

                    ( like )
                    .should.have.properties( {
                        isLiked: true
                    } );

                    done();
                } );
        } );

        it( 'create a dislike', function ( done ) {

            ConfQuestionPresentationLike.create( {
                    isLiked: false,
                    question: 2,
                    user: 2
                } )
                .exec( function ( err, like ) {
                    should.not.exist( err );

                    should.exist( like );

                    ( like )
                    .should.be.an.instanceOf( Object );

                    ( like )
                    .should.have.properties( {
                        isLiked: false
                    } );

                    done();
                } );
        } );

        it( 'create a second dislike', function ( done ) {

            ConfQuestionPresentationLike.create( {
                    isLiked: false,
                    question: 1,
                    user: 3
                } )
                .exec( function ( err, like ) {
                    should.not.exist( err );

                    should.exist( like );

                    ( like )
                    .should.be.an.instanceOf( Object );

                    ( like )
                    .should.have.properties( {
                        isLiked: false
                    } );

                    done();
                } );
        } );
    } );
} );
var should = require( 'should' );

describe( 'ConfQuestionPresentation', function () {

    describe( '#create()', function () {

        it( 'create an question without question ( brain fucked oO )', function ( done ) {

            ConfQuestionPresentation.create( {
                    user: 2
                } )
                .exec( function ( err, question ) {
                    should.exist( err );

                    should.not.exist( question );

                    done();
                } );
        } );


        it( 'create an unanswered question', function ( done ) {

            ConfQuestionPresentation.create( {
                    question: 'Is it awesome?',
                    user: 2,
                    tags: [ 1, 2 ]
                } )
                .exec( function ( err, question ) {
                    should.not.exist( err );

                    should.exist( question );

                    ( question )
                    .should.be.an.instanceOf( Object );

                    ( question )
                    .should.have.properties( {
                        id: 1,
                        question: 'Is it awesome?',
                        isAnswered: false,
                        user: 2
                    } );

                    ( question.tags )
                    .should.be.an.instanceOf( Array );

                    done();
                } );
        } );


        it( 'create a second unanswered question', function ( done ) {

            ConfQuestionPresentation.create( {
                    question: 'Is it awesome or not?',
                    user: 2,
                    tags: [ 1 ]
                } )
                .exec( function ( err, question ) {
                    should.not.exist( err );

                    should.exist( question );

                    ( question )
                    .should.be.an.instanceOf( Object );

                    ( question )
                    .should.have.properties( {
                        id: 2,
                        question: 'Is it awesome or not?',
                        isAnswered: false,
                        user: 2
                    } );

                    ( question.tags )
                    .should.be.an.instanceOf( Array );

                    done();
                } );
        } );
<<<<<<< HEAD


        it( 'create an untag question', function ( done ) {

            ConfQuestionPresentation.create( {
                    question: 'Is it awesome or you think not?',
                    user: 2
                } )
                .exec( function ( err, question ) {
                    should.exist( err );

                    should.not.exist( question );

                    done();
                } );
        } );
=======
>>>>>>> 7955afeeedafc7a31238a82d8a44af2de11f80bb
    } );

    describe( '#find()', function () {

        it( 'find all', function ( done ) {

            ConfQuestionPresentation.find()
                .exec( function ( err, questions ) {
                    should.not.exist( err );

                    should.exist( questions );

                    ( questions )
                    .should.be.an.instanceOf( Array );

                    ( _.size( questions ) )
                    .should.equal( 2 );

                    done();
                } );
        } );

        it( 'find id 1', function ( done ) {

            ConfQuestionPresentation.findOne( 1 )
                .populate( 'tags' )
                .exec( function ( err, question ) {
                    should.not.exist( err );

                    should.exist( question );

                    ( question )
                    .should.be.an.instanceOf( Object );

                    ( _.size( question.tags ) )
                    .should.equal( 2 );

                    done();
                } );
        } );
    } );

    describe( '#update()', function () {

        it( 'update an question to answered', function ( done ) {

            ConfQuestionPresentation.findOne( 1 )
                .exec( function ( err, question ) {
                    should.not.exist( err );

                    should.exist( question );

                    question.isAnswered = true;

                    question.save( function ( err, question ) {
                        should.not.exist( err );

                        should.exist( question );

                        ( question )
                        .should.have.properties( {
                            id: 1,
                            question: 'Is it awesome?',
                            isAnswered: true
                        } );

                        done();
                    } );
                } );
        } );
    } );
} );

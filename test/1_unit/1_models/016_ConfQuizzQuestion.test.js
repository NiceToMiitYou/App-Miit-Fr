var should = require( 'should' );

describe( 'ConfQuestionQuizz', function() {

    describe( '#create()', function() {

        it( 'create an question without question ( brain fucked oO )', function( done ) {

            ConfQuestionQuizz.create( {
                quizz: 1,
                type: 1
            } )
                .exec( function( err, question ) {
                    should.exist( err );

                    should.not.exist( question );

                    done();
                } );
        } );


        it( 'create a question without type', function( done ) {

            ConfQuestionQuizz.create( {
                question: 'Is it awesome?',
                quizz: 1
            } )
                .exec( function( err, question ) {
                    should.exist( err );

                    should.not.exist( question );

                    done();
                } );
        } );


        it( 'create a question without quizz', function( done ) {

            ConfQuestionQuizz.create( {
                question: 'Is it awesome?',
                type: 1
            } )
                .exec( function( err, question ) {
                    should.exist( err );

                    should.not.exist( question );

                    done();
                } );
        } );

        it( 'create a question', function( done ) {

            ConfQuestionQuizz.create( {
                question: 'Is it awesome?',
                quizz: 1,
                type: 2
            } )
                .exec( function( err, question ) {
                    should.not.exist( err );

                    should.exist( question );

                    ( question )
                        .should.be.an.instanceOf( Object );

                    ( question )
                        .should.have.properties( {
                            id: 1,
                            question: 'Is it awesome?',
                            quizz: 1,
                            type: 2
                        } );

                    done();
                } );
        } );


        it( 'create a second question', function( done ) {

            ConfQuestionQuizz.create( {
                question: 'Is it really awesome?',
                quizz: 1,
                type: 1
            } )
                .exec( function( err, question ) {
                    should.not.exist( err );

                    should.exist( question );

                    ( question )
                        .should.be.an.instanceOf( Object );

                    ( question )
                        .should.have.properties( {
                            id: 2,
                            question: 'Is it really awesome?',
                            quizz: 1,
                            type: 1
                        } );

                    done();
                } );
        } );
    } );

    describe( '#find()', function() {

        it( 'find all', function( done ) {

            ConfQuestionQuizz.find()
                .exec( function( err, questions ) {
                    should.not.exist( err );

                    should.exist( questions );

                    ( questions )
                        .should.be.an.instanceOf( Array );

                    ( _.size( questions ) )
                        .should.equal( 2 );

                    done();
                } );
        } );

        it( 'find id 1', function( done ) {

            ConfQuestionQuizz.findOne( 1 )
                .exec( function( err, question ) {
                    should.not.exist( err );

                    should.exist( question );

                    ( question )
                        .should.be.an.instanceOf( Object );

                    ( question )
                        .should.have.properties( {
                            id: 1,
                            question: 'Is it awesome?',
                            quizz: 1,
                            type: 2
                        } );

                    done();
                } );
        } );
    } );
} );

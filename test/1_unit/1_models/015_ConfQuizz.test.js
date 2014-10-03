var should = require( 'should' );

describe( 'ConfQuizz', function() {

    describe( '#create', function() {

        it( 'create a quizz without name', function( done ) {

            ConfQuizz.create( {
                description: 'Test of the quizz model'
            } )
                .exec( function( err, quizz ) {
                    should.exist( err );

                    should.not.exist( quizz );

                    done();
                } );

        } );

        it( 'create a quizz: test', function( done ) {

            ConfQuizz.create( {
                name: 'test',
                description: 'Test of the quizz model'
            } )
                .exec( function( err, quizz ) {
                    should.not.exist( err );

                    should.exist( quizz );

                    ( quizz )
                        .should.be.an.instanceof( Object );

                    ( quizz )
                        .should.have.properties( {
                            id: 1,
                            name: 'test',
                            description: 'Test of the quizz model',
                            maxTime: 0
                        } );

                    done();
                } );
        } );

        it( 'create a second quizz: test', function( done ) {

            ConfQuizz.create( {
                name: 'test',
                description: 'Test of the quizz model'
            } )
                .exec( function( err, quizz ) {
                    should.exist( err );

                    should.not.exist( quizz );

                    done();
                } );
        } );
    } );

    describe( '#find()', function() {

        it( 'find all', function( done ) {
            ConfQuizz.find()
                .exec( function( err, quizzes ) {
                    should.not.exist( err );

                    should.exist( quizzes );

                    ( quizzes )
                        .should.be.an.instanceof( Array );

                    ( _.size( quizzes ) )
                        .should.equal( 1 );

                    done();
                } );
        } );

        it( 'find one - id:1', function( done ) {
            ConfQuizz.findOne( 1 )
                .exec( function( err, quizz ) {
                    should.not.exist( err );

                    should.exist( quizz );

                    ( quizz )
                        .should.be.an.instanceof( Object );

                    ( quizz )
                        .should.have.properties( {
                            id: 1,
                            name: 'test',
                            description: 'Test of the quizz model',
                            maxTime: 0
                        } );

                    done();
                } );
        } );
    } );
} );

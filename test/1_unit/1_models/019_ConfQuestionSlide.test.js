var should = require( 'should' );

describe( 'ConfQuestionSlideAnswer', function() {

    describe( '#create()', function() {

        it( 'create an answer without answer (Brain fucked Oo)', function( done ) {

            ConfQuestionSlideAnswer.create( {
                question: 1
            } )
                .exec( function( err, answer ) {
                    should.exist( err );

                    should.not.exist( answer );

                    done();
                } );

        } );


        it( 'create an answer without question (Brain fucked again Oo)', function( done ) {

            ConfQuestionSlideAnswer.create( {
                answer: 'I am free!'
            } )
                .exec( function( err, answer ) {
                    should.exist( err );

                    should.not.exist( answer );

                    done();
                } );

        } );


        it( 'create an answer', function( done ) {

            ConfQuestionSlideAnswer.create( {
                answer: 'I am free!',
                question: 1
            } )
                .exec( function( err, answer ) {
                    should.not.exist( err );

                    should.exist( answer );

                    ( answer )
                        .should.be.an.instanceof( Object );

                    ( answer )
                        .should.have.properties( {
                            id: 1,
                            answer: 'I am free!',
                            question: 1
                        } );

                    done();
                } );
        } );

        it( 'create another answer', function( done ) {

            ConfQuestionSlideAnswer.create( {
                answer: 'I am not free!',
                question: 1
            } )
                .exec( function( err, answer ) {
                    should.not.exist( err );

                    should.exist( answer );

                    ( answer )
                        .should.be.an.instanceof( Object );

                    ( answer )
                        .should.have.properties( {
                            id: 2,
                            answer: 'I am not free!',
                            question: 1
                        } );

                    done();
                } );
        } );
    } );


    describe( '#find()', function() {

        it( 'find all', function( done ) {

            ConfQuestionSlideAnswer.find()
                .exec( function( err, answers ) {
                    should.not.exist( err );

                    should.exist( answers );

                    ( answers )
                        .should.be.an.instanceOf( Array );

                    ( _.size( answers ) )
                        .should.equal( 2 );

                    done();
                } );
        } );

        it( 'find id 1', function( done ) {

            ConfQuestionSlideAnswer.findOne( 1 )
                .exec( function( err, answer ) {
                    should.not.exist( err );

                    should.exist( answer );

                    ( answer )
                        .should.be.an.instanceOf( Object );

                    ( answer )
                        .should.have.properties( {
                            id: 1,
                            answer: 'I am free!',
                            question: 1
                        } );

                    done();
                } );
        } );
    } );


    describe( '#update', function() {

        it( 'add users to 2', function( done ) {

            ConfQuestionSlideAnswer.findOne( 2 )
                .populate( 'users' )
                .exec( function( err, answer ) {
                    should.not.exist( err );

                    should.exist( answer );

                    ( answer )
                        .should.be.an.instanceOf( Object );


                    answer.users.add( 2 );

                    answer.save( function( err, answer ) {

                        should.not.exist( err );

                        should.exist( answer );

                        ( answer.users )
                            .should.be.an.instanceof( Array );

                        ( _.size( answer.users ) )
                            .should.equal( 1 );

                        done();
                    } );
                } );
        } );
    } );
} );

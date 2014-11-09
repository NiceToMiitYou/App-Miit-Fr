var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfQuestionQuizzController', function() {

    before( function() {
        agent = request.agent( sails.hooks.http.app );
    } );


    describe( 'ConfUser#login()', function() {

        it( 'login for test question quizz', function( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password',
                    connect: true
                } )
                .end( done );
        } );
    } );


    describe( '#list()', function() {

        it( 'list quizzes', function( done ) {

            agent
                .get( '/api/viewer/quizz/list' )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    ( res.body.quizzes )
                        .should.be.an.instanceOf( Array );

                    ( _.size( res.body.quizzes ) )
                        .should.equal( 1 )

                    done();
                } );
        } );
    } );

    describe( '#questions()', function() {

        it( 'get the list of questions from a quizz', function( done ) {

            agent
                .get( '/api/viewer/quizz/1/questions' )
                .send()
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    ( res.body.questions )
                        .should.be.an.instanceOf( Array );

                    ( _.size( res.body.questions ) )
                        .should.equal( 2 );

                    ( res.body.questions[ 0 ].answers )
                        .should.be.an.instanceOf( Array );

                    ( _.size( res.body.questions[ 0 ].answers ) )
                        .should.equal( 2 );

                    done();
                } );
        } );

        it( 'get the list of questions from an inexistant quizz', function( done ) {

            agent
                .get( '/api/viewer/quizz/2/questions' )
                .send()
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    ( res.body.questions )
                        .should.be.an.instanceOf( Array );

                    ( _.size( res.body.questions ) )
                        .should.equal( 0 );

                    done();
                } );
        } );
    } );


    describe( '#answer()', function() {

        it( 'answer to the first question without answer ( Ahahah )', function( done ) {

            agent
                .post( '/api/viewer/quizz/question/' + 1 + '/answer' )
                .send( {
                    answers: []
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: false
                        } );

                    done();
                } );
        } );


        it( 'answer to the first question with 2 answers', function( done ) {

            agent
                .post( '/api/viewer/quizz/question/' + 1 + '/answer' )
                .send( {
                    answers: [ 1, 2 ]
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    done();
                } );
        } );

        it( 'answer to the second question with 2 answers', function( done ) {

            agent
                .post( '/api/viewer/quizz/question/' + 1 + '/answer' )
                .send( {
                    answers: [ 3, 4 ]
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: false
                        } );

                    done();
                } );
        } );

        it( 'answer to the second question with an answer from another question', function( done ) {

            agent
                .post( '/api/viewer/quizz/question/' + 1 + '/answer' )
                .send( {
                    question: 1,
                    answers: [ 1 ]
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: false
                        } );

                    done();
                } );
        } );

        it( 'answer to the second question with right answer', function( done ) {

            agent
                .post( '/api/viewer/quizz/question/' + 2 + '/answer' )
                .send( {
                    answers: [ 3 ]
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    done();
                } );
        } );

        it( 'answer to the second question with right answer twice', function( done ) {

            agent
                .post( '/api/viewer/quizz/question/' + 2 + '/answer' )
                .send( {
                    answers: [ 3 ]
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: false
                        } );

                    done();
                } );
        } );
    } );
} );

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
                    password: 'password'
                } )
                .end( done );
        } );
    } );


    describe( '#question()', function() {

        it( 'get the question from a slide', function( done ) {

            agent
                .post( '/api/viewer/question/slide/question' )
                .send( {
                    slide: 1
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

                    ( res.body.question )
                        .should.be.an.instanceOf( Object );

                    ( res.body.question )
                        .should.have.properties( {
                            id: 1,
                            question: 'Is it awesome?',
                            slide: 1,
                            type: 2
                        } );

                    done();
                } );
        } );
    } );


    describe( '#answer()', function() {

        it( 'answer to the first question without answer ( Ahahah )', function( done ) {

            agent
                .post( '/api/viewer/question/slide/answer' )
                .send( {
                    question: 1,
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
                .post( '/api/viewer/question/slide/answer' )
                .send( {
                    question: 1,
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
                .post( '/api/viewer/question/slide/answer' )
                .send( {
                    question: 2,
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
                .post( '/api/viewer/question/slide/answer' )
                .send( {
                    question: 2,
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
                .post( '/api/viewer/question/slide/answer' )
                .send( {
                    question: 2,
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
                .post( '/api/viewer/question/slide/answer' )
                .send( {
                    question: 2,
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

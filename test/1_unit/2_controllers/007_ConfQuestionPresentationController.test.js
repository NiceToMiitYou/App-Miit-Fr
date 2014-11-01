var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfQuestionPresentationController', function() {

    before( function() {
        agent = request.agent( sails.hooks.http.app );
    } );


    describe( 'ConfUser#login()', function() {

        it( 'login for test question presentation', function( done ) {

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


    describe( '#create()', function() {

        it( 'create a question', function( done ) {

            agent
                .post( '/api/viewer/question/presentation/create' )
                .send( {
                    question: 'Is there ok?',
                    tags: [ 1 ]
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
                            question: 'Is there ok?',
                            isAnswered: false
                        } );

                    done();
                } );
        } );

        it( 'create a question without tags', function( done ) {

            agent
                .post( '/api/viewer/question/presentation/create' )
                .send( {
                    question: 'Is there ok?',
                    tags: []
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

        it( 'create an empty question', function( done ) {

            agent
                .post( '/api/viewer/question/presentation/create' )
                .send( {
                    question: '',
                    tags: [ 1 ]
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


    describe( '#tags()', function() {

        it( 'get all tags', function( done ) {

            agent
                .get( '/api/viewer/question/presentation/tags' )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    ( res.body.tags )
                        .should.be.an.instanceOf( Array );

                    ( _.size( res.body.tags ) )
                        .should.equal( 2 );

                    done();
                } );
        } );
    } );

    describe( '#like()', function() {

        it( 'like a question', function( done ) {

            agent
                .post( '/api/viewer/question/presentation/like' )
                .send( {
                    question: 2,
                    like: true
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

        it( 'double like of a question', function( done ) {

            agent
                .post( '/api/viewer/question/presentation/like' )
                .send( {
                    question: 2,
                    like: true
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

        it( 'dislike an already liked question', function( done ) {

            agent
                .post( '/api/viewer/question/presentation/like' )
                .send( {
                    question: 2,
                    like: false
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

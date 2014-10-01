var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfChatController', function() {

    before( function() {

        agent = request.agent( sails.hooks.http.app );
    } );


    describe( 'ConfUser#login()', function() {

        it( 'login for test chat', function( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .end( done );
        } );
    } );


    describe( '#list()', function() {

        it( 'list all chatrooms', function( done ) {

            agent
                .get( '/api/viewer/chatroom/list' )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );
                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    ( res.body.chatrooms )
                        .should.be.an.instanceOf( Array );
                    ( _.size( res.body.chatrooms ) )
                        .should.equal( 1 );

                    done();
                } );
        } );
    } );


    describe( '#send()', function() {

        it( 'send a message', function( done ) {

            agent
                .post( '/api/viewer/chatroom/send' )
                .send( {
                    chatroom: 1,
                    message: 'Hello world!'
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

                    ( res.body.message )
                        .should.be.an.instanceOf( Object );
                    ( res.body.message )
                        .should.have.properties( {
                            chatroom: 1,
                            message: 'Hello world!'
                        } );

                    done();
                } );
        } );
    } );
} );

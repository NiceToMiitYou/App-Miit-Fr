var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfChatController', function() {

    before( function() {

        agent = request.agent( sails.hooks.http.app );
    } );


    describe( 'ConfUser#login()', function() {

        it( 'login for test note', function( done ) {

            agent
                .post( '/api/public/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .end( done );
        } );
    } );


    describe( '#synchronize()', function() {

        it( 'synchronize from token 0 -' +
            'with chat and test, should be equal to 2', function( done ) {

                agent
                    .post( '/api/public/synchronize' )
                    .send( {
                        token: 0
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

                        ( res.body.events )
                            .should.be.an.instanceOf( Array );
                        ( _.size( res.body.events ) )
                            .should.equal( 2 );

                        done();
                    } );
            } );

        it( 'synchronize from token 1 -' +
            'with chat and test, should be equal to 1', function( done ) {

                agent
                    .post( '/api/public/synchronize' )
                    .send( {
                        token: 1
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

                        ( res.body.events )
                            .should.be.an.instanceOf( Array );
                        ( _.size( res.body.events ) )
                            .should.equal( 1 );

                        done();
                    } );
            } );
    } );
} );

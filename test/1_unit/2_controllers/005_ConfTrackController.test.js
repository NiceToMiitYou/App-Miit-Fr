var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfTrackController', function() {

    before( function() {

        agent = request.agent( sails.hooks.http.app );
    } );


    describe( 'ConfUser#login()', function() {

        it( 'login for test note', function( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .end( done );
        } );
    } );


    describe( '#start()', function() {

        it( 'start tracking', function( done ) {

            agent
                .post( '/api/viewer/track/start' )
                .send( {
                    action: 'test'
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
    } );


    describe( '#end()', function() {

        it( 'end tracking undefined track', function( done ) {

            agent
                .post( '/api/viewer/track/end' )
                .send( {
                    track: 1
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

        it( 'end tracking', function( done ) {

            agent
                .post( '/api/viewer/track/end' )
                .send( {
                    track: 2
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
    } );
} );

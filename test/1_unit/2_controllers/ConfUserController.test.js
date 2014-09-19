var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfUserController', function() {

    before( function() {
        agent = request.agent( sails.hooks.http.app );
    } );


    describe( '#register()', function() {

        it( 'wrong register', function( done ) {
            agent
                .post( '/api/public/user/register' )
                .send( {
                    mail: 'test',
                    password: 'test'
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    if ( err ) return done( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );
                    ( res.body )
                        .should.have.properties( {
                            'done': false
                        } );

                    done();
                } );
        } );

        it( 'right register test@test.fr', function( done ) {
            agent
                .post( '/api/public/user/register' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    if ( err ) return done( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );
                    ( res.body )
                        .should.have.properties( {
                            'done': true
                        } );

                    done();
                } );
        } );
    } );


    describe( '#login()', function() {

        it( 'wrong login', function( done ) {
            agent
                .post( '/api/public/user/login' )
                .send( {
                    mail: 'test',
                    password: 'test'
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    if ( err ) return done( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );
                    ( res.body )
                        .should.have.properties( {
                            'done': true,
                            'exist': false
                        } );

                    done();
                } );
        } );

        it( 'login with test@test.fr and wrong password', function( done ) {
            agent
                .post( '/api/public/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'test'
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    if ( err ) return done( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );
                    ( res.body )
                        .should.have.properties( {
                            'done': true,
                            'exist': true,
                            'connected': false
                        } );

                    done();
                } );
        } );

        it( 'login with test@test.fr and right password', function( done ) {
            agent
                .post( '/api/public/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .expect( 200 )
                .end( function( err, res ) {
                    if ( err ) return done( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );
                    ( res.body )
                        .should.have.properties( {
                            'done': true,
                            'exist': true,
                            'connected': true
                        } );

                    done();
                } );
        } );

        it( 'login twice -> 403', function( done ) {
            agent
                .post( '/api/public/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .expect( 403 )
                .end( done );
        } );
    } );


    describe( '#logout()', function() {

        it( 'logout', function( done ) {
            agent
                .get( '/api/public/user/logout' )
                .expect( 200 )
                .end( function( err, res ) {
                    if ( err ) done( err );

                    ( res.body )
                        .should.be.an.instanceOf( Object );
                    ( res.body )
                        .should.have.properties( {
                            'done': true
                        } );

                    done();
                } );
        } );
    } );
} );

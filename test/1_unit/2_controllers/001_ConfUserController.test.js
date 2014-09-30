var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfUserController', function () {

    before( function () {
        agent = request.agent( sails.hooks.http.app );
    } );


    describe( '#register()', function () {

        it( 'register invalid', function ( done ) {

            agent
                .post( '/api/user/register' )
                .send( {
                    mail: 'test',
                    password: 'test'
                } )
                .expect( 200 )
                .end( function ( err, res ) {
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

        it( 'register test@test.fr', function ( done ) {

            agent
                .post( '/api/user/register' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .expect( 200 )
                .end( function ( err, res ) {
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

        it( 'register second@test.fr', function ( done ) {

            agent
                .post( '/api/user/register' )
                .send( {
                    mail: 'second@test.fr',
                    password: 'password'
                } )
                .expect( 200 )
                .end( function ( err, res ) {
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


    describe( '#login()', function () {

        it( 'login invalid', function ( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test',
                    password: 'test'
                } )
                .expect( 200 )
                .end( function ( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                    .should.be.an.instanceOf( Object );
                    ( res.body )
                    .should.have.properties( {
                        done: true,
                        exist: false
                    } );

                    done();
                } );
        } );

        it( 'login with test@test.fr and wrong password', function ( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'test'
                } )
                .expect( 200 )
                .end( function ( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                    .should.be.an.instanceOf( Object );
                    ( res.body )
                    .should.have.properties( {
                        done: true,
                        exist: true,
                        connected: false
                    } );

                    done();
                } );
        } );

        it( 'login with test@test.fr and right password', function ( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .expect( 200 )
                .end( function ( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                    .should.be.an.instanceOf( Object );
                    ( res.body )
                    .should.have.properties( {
                        done: true,
                        exist: true,
                        connected: true
                    } );

                    ( res.body.user )
                    .should.be.an.instanceOf( Object );

                    done();
                } );
        } );

        it( 'login twice -> 403', function ( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .expect( 403 )
                .end( done );
        } );

        it( 'register third@test.fr -> 403', function ( done ) {

            agent
                .post( '/api/user/register' )
                .send( {
                    mail: 'second@test.fr',
                    password: 'password'
                } )
                .expect( 403 )
                .end( done );
        } );
    } );


    describe( '#list()', function () {

        it( 'list of users', function ( done ) {

            agent
                .get( '/api/user/list' )
                .expect( 200 )
                .end( function ( err, res ) {
                    should.not.exist( err );

                    ( res.body )
                    .should.be.an.instanceOf( Object );
                    ( res.body )
                    .should.have.properties( {
                        done: true
                    } );

                    ( res.body.users )
                    .should.be.an.instanceOf( Array );

                    ( _.size( res.body.users ) )
                    .should.equal( 3 );

                    done();
                } );
        } );
    } );


    describe( '#logout()', function () {

        it( 'logout test@test.fr', function ( done ) {

            agent
                .get( '/api/user/logout' )
                .expect( 200 )
                .end( function ( err, res ) {
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

        it( 'logout twice -> 403', function ( done ) {

            agent
                .get( '/api/user/logout' )
                .expect( 403 )
                .end( done );
        } );
    } );
} );
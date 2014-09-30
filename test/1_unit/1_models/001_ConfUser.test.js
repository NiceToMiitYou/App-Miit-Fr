var should = require( 'should' );

describe( 'ConfUser', function () {

    describe( '#create()', function () {

        it( 'create empty user', function ( done ) {

            ConfUser.create()
                .exec( function ( err, created ) {
                    should.exist( err );

                    done();
                } );
        } );

        it( 'create user only with mail', function ( done ) {

            ConfUser.create( {
                    mail: 'test@test.fr'
                } )
                .exec( function ( err, created ) {
                    should.exist( err );

                    done();
                } );
        } );

        it( 'create user only with wrong mail', function ( done ) {

            ConfUser.create( {
                    mail: 'testtest.fr',
                    password: 'password'
                } )
                .exec( function ( err, created ) {
                    should.exist( err );

                    done();
                } );
        } );

        it( 'create user only with password', function ( done ) {

            ConfUser.create( {
                    password: 'password'
                } )
                .exec( function ( err, created ) {
                    should.exist( err );

                    done();
                } );
        } );

        it( 'create minimalist user', function ( done ) {

            ConfUser.create( {
                    mail: 'test@test.fr',
                    password: 'password',
                    roles: [ 'ROLE_LOGIN', 'ROLE_VIEWER' ]
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        mail: 'test@test.fr'
                    } );

                    done();
                } );
        } );

        it( 'create a second minimalist user', function ( done ) {

            ConfUser.create( {
                    mail: 'working@test.fr',
                    password: 'password',
                    roles: [ 'ROLE_LOGIN', 'ROLE_VIEWER' ]
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        mail: 'working@test.fr'
                    } );

                    done();
                } );
        } );
    } );


    describe( '#find()', function () {

        it( 'find by mail test@test.fr', function ( done ) {

            ConfUser.findOneByMail( 'test@test.fr' )
                .exec( function ( err, user ) {
                    should.not.exist( err );

                    ( user )
                    .should.be.an.instanceOf( Object );
                    ( user )
                    .should.have.properties( {
                        mail: 'test@test.fr'
                    } );

                    done();
                } );
        } );
    } );


    describe( '#destroy()', function () {

        it( 'destroy test@test.fr id - 1', function ( done ) {

            ConfUser.destroy( 1 )
                .exec( function ( err, destroyed ) {
                    should.not.exist( err );

                    done();
                } );
        } );
    } );
} );
var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfresourceController', function() {

    before( function() {

        agent = request.agent( sails.hooks.http.app );
    } );


    describe( 'ConfUser#login()', function() {

        it( 'login for test resource', function( done ) {

            agent
                .post( '/api/public/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password'
                } )
                .end( done );
        } );
    } );


    describe( '#colorScheme()', function() {

        it( 'less to css', function( done ) {

            agent
                .get( '/assets/conference/color-scheme.css' )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    should.exist( res.text );

                    ( res.text )
                        .should.equal( 'body {\n  background: #312312;\n}\n' );

                    done();
                } );
        } );
    } );


    describe( '#list()', function() {

        it( 'list visible categories', function( done ) {

            agent
                .get( '/api/public/resources/list' )
                .expect( 200 )
                .end( function( err, res ) {
                    should.not.exist( err );

                    should.exist( res.body );

                    ( res.body )
                        .should.be.an.instanceOf( Object );

                    ( res.body )
                        .should.have.properties( {
                            done: true
                        } );

                    ( res.body.categories )
                        .should.be.an.instanceOf( Array );
                    ( _.size( res.body.categories ) )
                        .should.equal( 1 );

                    done();
                } );
        } );
    } );
} );

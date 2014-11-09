var request = require( 'supertest' );
var should = require( 'should' );
var agent;

describe( 'ConfNoteController', function() {

    before( function() {

        agent = request.agent( sails.hooks.http.app );
    } );


    describe( 'ConfUser#login()', function() {

        it( 'login for test note', function( done ) {

            agent
                .post( '/api/user/login' )
                .send( {
                    mail: 'test@test.fr',
                    password: 'password',
                    connect: true
                } )
                .expect( 200 )
                .end( done );
        } );
    } );


    describe( '#create()', function() {

        it( 'create a note', function( done ) {

            agent
                .post( '/api/viewer/note/create' )
                .send( {
                    title: 'Title test',
                    content: 'Content of the note'
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

                    ( res.body.note )
                        .should.be.an.instanceOf( Object );
                    ( res.body.note )
                        .should.have.properties( {
                            title: 'Title test',
                            content: 'Content of the note',
                            user: 3
                        } );

                    done();
                } );
        } );
    } );


    describe( '#update()', function() {

        it( 'update a note of someone else -> fail', function( done ) {

            agent
                .post( '/api/viewer/note/' + 1 + '/update' )
                .send( {
                    title: 'Title test UP!',
                    content: 'Updated content of the note'
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

        it( 'update a note', function( done ) {

            agent
                .post( '/api/viewer/note/' + 3 + '/update' )
                .send( {
                    title: 'Title test UP!',
                    content: 'Updated content of the note'
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

                    ( res.body.note )
                        .should.be.an.instanceOf( Object );
                    ( res.body.note )
                        .should.have.properties( {
                            title: 'Title test UP!',
                            content: 'Updated content of the note',
                        } );

                    done();
                } );
        } );
    } );


    describe( '#delete()', function() {

        it( 'delete a note', function( done ) {

            agent
                .get( '/api/viewer/note/' + 3 + '/delete' )
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

                    done();
                } );
        } );
    } );
} );

var should = require( 'should' );

describe( 'ConfChatMessage', function () {

    describe( '#create()', function () {

        it( 'create without user and chatroom and message', function ( done ) {

            ConfChatMessage.create()
                .exec( function ( err, created ) {
                    should.exist( err );

                    should.not.exist( created );

                    done();
                } );
        } );

        it( 'create without user and chatroom', function ( done ) {

            ConfChatMessage.create( {
                    message: 'Hello world!'
                } )
                .exec( function ( err, created ) {
                    should.exist( err );

                    should.not.exist( created );

                    done();
                } );
        } );

        it( 'create without user', function ( done ) {

            ConfChatMessage.create( {
                    message: 'Hello world!',
                    chatroom: 1
                } )
                .exec( function ( err, created ) {
                    should.exist( err );

                    should.not.exist( created );

                    done();
                } );
        } );

        it( 'create a good message', function ( done ) {

            ConfChatMessage.create( {
                    message: 'Hello world!',
                    chatroom: 1,
                    user: 2
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        message: 'Hello world!',
                        chatroom: 1,
                        user: 2
                    } );

                    done();
                } );
        } );

        it( 'create anoteher good message', function ( done ) {

            ConfChatMessage.create( {
                    message: 'Thanks world!',
                    chatroom: 1,
                    user: 2
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        message: 'Thanks world!',
                        chatroom: 1,
                        user: 2
                    } );

                    done();
                } );
        } );
    } );


    describe( '#find()', function () {

        it( 'find all', function ( done ) {

            ConfChatMessage.find()
                .exec( function ( err, messages ) {
                    should.not.exist( err );

                    should.exist( messages );

                    ( messages )
                    .should.be.an.instanceOf( Array );

                    ( _.size( messages ) )
                    .should.equal( 2 );

                    done();
                } );
        } );
    } );


    describe( '#destroy()', function () {

        it( 'destroy with id - 2', function ( done ) {

            ConfChatMessage.destroy( 2 )
                .exec( function ( err ) {
                    should.not.exist( err );

                    done();
                } );
        } );
    } );
} );
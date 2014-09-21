var should = require( 'should' );

describe( 'ConfChatRoom', function() {

    describe( '#create()', function() {

        it( 'create a chatroom without name', function( done ) {

            ConfChatRoom.create()
                .exec( function( err, chatroom ) {
                    should.exist( err );

                    should.not.exist( chatroom );

                    done();
                } );
        } );

        it( 'create a chatroom without type', function( done ) {

            ConfChatRoom.create( {
                name: 'Default type'
            } )
                .exec( function( err, chatroom ) {
                    should.not.exist( err );

                    should.exist( chatroom );

                    ( chatroom )
                        .should.be.an.instanceOf( Object );
                    ( chatroom )
                        .should.have.properties( {
                            'name': 'Default type',
                            'type': 1
                        } );

                    done();
                } );
        } );

        it( 'create a chatroom with type', function( done ) {

            ConfChatRoom.create( {
                name: 'Defined type',
                type: 2
            } )
                .exec( function( err, chatroom ) {
                    should.not.exist( err );

                    should.exist( chatroom );

                    ( chatroom )
                        .should.be.an.instanceOf( Object );
                    ( chatroom )
                        .should.have.properties( {
                            'name': 'Defined type',
                            'type': 2
                        } );

                    done();
                } );
        } );
    } );


    describe( '#find()', function() {

        it( 'find chatrooms', function( done ) {

            ConfChatRoom.find()
                .exec( function( err, chatrooms ) {
                    should.not.exist( err );

                    should.exist( chatrooms );

                    ( chatrooms )
                        .should.be.an.instanceOf( Array );
                    ( _.size( chatrooms ) )
                        .should.equal( 2 );

                    done();
                } );
        } );
    } );

    describe( '#destroy()', function( done ) {

        it( 'destroy chatroom with id - 2', function( done ) {

            ConfChatRoom.destroy( 2 )
                .exec( function( err ) {
                    should.not.exist( err );

                    done();
                } );
        } );
    } );
} );

var should = require( 'should' );

describe( 'ConfTag', function() {

    describe( '#create()', function() {

        it( 'create a tag without a name', function( done ) {

            ConfTag.create()
                .exec( function( err, created ) {
                    should.exist( err );

                    should.not.exist( created );

                    done();
                } );
        } );

        it( 'create a tag - awesome', function( done ) {

            ConfTag.create( {
                name: 'awesome'
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 1,
                            name: 'awesome'
                        } );

                    done();
                } );
        } );

        it( 'create a tag - test', function( done ) {

            ConfTag.create( {
                name: 'test'
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 2,
                            name: 'test'
                        } );

                    done();
                } );
        } );

        it( 'create a second tag - test', function( done ) {

            ConfTag.create( {
                name: 'test'
            } )
                .exec( function( err, created ) {
                    should.exist( err );

                    should.not.exist( created );

                    done();
                } );
        } );
    } );


    describe( '#find()', function() {

        it( 'find all', function( done ) {

            ConfTag.find()
                .exec( function( err, tags ) {
                    should.not.exist( err );

                    should.exist( tags );

                    ( tags )
                        .should.be.an.instanceOf( Object );
                    ( _.size( tags ) )
                        .should.equal( 2 );

                    done();
                } );
        } );
    } );
} );

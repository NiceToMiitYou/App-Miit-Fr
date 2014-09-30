var should = require( 'should' );

describe( 'ConfTrack', function () {

    describe( '#create()', function () {

        it( 'create a track without action and user', function ( done ) {

            ConfTrack.create( {
                    start: new Date(),
                    end: new Date()
                } )
                .exec( function ( err, created ) {
                    should.exist( err );

                    should.not.exist( created );

                    done();
                } );
        } );

        it( 'create a track without user', function ( done ) {

            ConfTrack.create( {
                    action: 'test',
                    start: new Date(),
                    end: new Date()
                } )
                .exec( function ( err, created ) {
                    should.exist( err );

                    should.not.exist( created );

                    done();
                } );
        } );

        it( 'create a track', function ( done ) {

            ConfTrack.create( {
                    action: 'test',
                    start: new Date(),
                    user: 2
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        action: 'test',
                        user: 2
                    } );

                    done();
                } );
        } );
    } );

    describe( '#find()', function () {

        it( 'find all', function ( done ) {

            ConfTrack.find()
                .exec( function ( err, tracks ) {
                    should.not.exist( err );

                    should.exist( tracks );

                    ( tracks )
                    .should.be.an.instanceOf( Array );
                    ( _.size( tracks ) )
                    .should.equal( 1 );

                    done();
                } );
        } );
    } );


    describe( '#update()', function () {

        it( 'update', function ( done ) {

            ConfTrack.findOne( 1 )
                .exec( function ( err, track ) {
                    should.not.exist( err );

                    should.exist( track );

                    ( track )
                    .should.be.an.instanceOf( Object );

                    track.end = new Date();

                    track.save( function ( err, track ) {
                        should.not.exist( err );

                        should.exist( track );

                        done();
                    } );
                } );
        } );
    } );

    describe( '#destroy()', function () {

        it( 'destroy with id - 1', function ( done ) {

            ConfTrack.destroy( 1 )
                .exec( function ( err ) {
                    should.not.exist( err );

                    done();
                } );
        } );
    } );
} );
var should = require( 'should' );

describe( 'ConfLiveApplicationEvent', function () {

    describe( '#create()', function () {

        it( 'create an event', function ( done ) {

            ConfLiveApplicationEvent.create( {
                    name: 'test',
                    data: {
                        message: 'hello'
                    }
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        'name': 'test',
                        'data': {
                            'message': 'hello'
                        }
                    } );

                    done();
                } );
        } );
    } );


    describe( '#find()', function () {

        it( 'find from id - 0', function ( done ) {

            ConfLiveApplicationEvent.find( {
                    where: {
                        id: {
                            '>': 0
                        }
                    },
                    sort: 'id ASC'
                } )
                .exec( function ( err, events ) {
                    should.not.exist( err );

                    should.exist( events );

                    ( events )
                    .should.be.an.instanceOf( Array );
                    ( _.size( events ) )
                    .should.equal( 1 );

                    done();
                } );
        } );

        it( 'find from id - 1', function ( done ) {

            ConfLiveApplicationEvent.find( {
                    where: {
                        id: {
                            '>': 1
                        }
                    },
                    sort: 'id ASC'
                } )
                .exec( function ( err, events ) {
                    should.not.exist( err );

                    should.exist( events );

                    ( events )
                    .should.be.an.instanceOf( Array );
                    ( _.size( events ) )
                    .should.equal( 0 );

                    done();
                } );
        } );
    } );
} );
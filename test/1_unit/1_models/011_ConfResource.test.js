var should = require( 'should' );

describe( 'ConResource', function () {

    describe( '#create()', function () {

        it( 'create a resource in category 1', function ( done ) {

            ConfResource.create( {
                    name: 'test resource',
                    path: 'nowhere.png',
                    category: 1
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        id: 1,
                        name: 'test resource',
                        path: 'nowhere.png',
                        category: 1
                    } );

                    done();
                } );
        } );

        it( 'create a resource in category 2', function ( done ) {

            ConfResource.create( {
                    name: 'test resource 2',
                    path: 'nowheretoo.png',
                    category: 2
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        id: 2,
                        name: 'test resource 2',
                        path: 'nowheretoo.png',
                        category: 2
                    } );

                    done();
                } );
        } );

        it( 'create a resource in category 2', function ( done ) {

            ConfResource.create( {
                    name: 'test resource 3',
                    path: 'nowheretoobad.png',
                    category: 2
                } )
                .exec( function ( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                    .should.be.an.instanceOf( Object );
                    ( created )
                    .should.have.properties( {
                        id: 3,
                        name: 'test resource 3',
                        path: 'nowheretoobad.png',
                        category: 2
                    } );

                    done();
                } );
        } );
    } );


    describe( '#find()', function () {

        it( 'find all', function ( done ) {

            ConfResource.find()
                .exec( function ( err, resources ) {
                    should.not.exist( err );

                    should.exist( resources );

                    ( resources )
                    .should.be.an.instanceOf( Array );
                    ( _.size( resources ) )
                    .should.equal( 3 );

                    done();
                } );
        } );

        it( 'find all in category 1', function ( done ) {

            ConfResource.find( {
                    category: 1
                } )
                .exec( function ( err, resources ) {
                    should.not.exist( err );

                    should.exist( resources );

                    ( resources )
                    .should.be.an.instanceOf( Array );
                    ( _.size( resources ) )
                    .should.equal( 1 );

                    done();
                } );
        } );

        it( 'find all in category 2', function ( done ) {

            ConfResource.find( {
                    category: 2
                } )
                .exec( function ( err, resources ) {
                    should.not.exist( err );

                    should.exist( resources );

                    ( resources )
                    .should.be.an.instanceOf( Array );
                    ( _.size( resources ) )
                    .should.equal( 2 );

                    done();
                } );
        } );
    } );
} );
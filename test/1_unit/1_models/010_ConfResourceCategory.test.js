var should = require( 'should' );

describe( 'ConfResourceCategory', function() {

    describe( '#create()', function() {

        it( 'create an invisible category', function( done ) {

            ConfResourceCategory.create( {
                name: 'abracadabra',
                isVisible: false,
                conference: 1
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 1,
                            name: 'abracadabra',
                            isVisible: false,
                            conference: 1
                        } );

                    done();
                } );
        } );

        it( 'create an visible category', function( done ) {

            ConfResourceCategory.create( {
                name: 'test',
                conference: 1
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 2,
                            name: 'test',
                            isVisible: true,
                            conference: 1
                        } );

                    done();
                } );
        } );
    } );

    describe( '#find()', function() {

        it( 'find all', function( done ) {

            ConfResourceCategory.find()
                .exec( function( err, categories ) {
                    should.not.exist( err );

                    should.exist( categories );

                    ( categories )
                        .should.be.an.instanceOf( Array );
                    ( _.size( categories ) )
                        .should.equal( 2 );

                    done();
                } );
        } );

        it( 'find visible', function( done ) {
            ConfResourceCategory.find()
                .where( {
                    'isVisible': true
                } )
                .exec( function( err, categories ) {
                    should.not.exist( err );

                    should.exist( categories );

                    ( categories )
                        .should.be.an.instanceOf( Array );
                    ( _.size( categories ) )
                        .should.equal( 1 );

                    done();
                } );
        } );

        it( 'find invisible', function( done ) {
            ConfResourceCategory.find()
                .where( {
                    'isVisible': false
                } )
                .exec( function( err, categories ) {
                    should.not.exist( err );

                    should.exist( categories );

                    ( categories )
                        .should.be.an.instanceOf( Array );
                    ( _.size( categories ) )
                        .should.equal( 1 );

                    done();
                } );
        } );
    } );
} );

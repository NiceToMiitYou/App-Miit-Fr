var should = require( 'should' );

describe( 'ConfSlide', function() {

    describe( '#create()', function() {

        it( 'create a slide', function( done ) {

            ConfSlide.create( {
                content: 'Content of the slide',
                presentation: 1
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 1,
                            content: 'Content of the slide',
                            presentation: 1,
                            time: 0,
                            type: 1
                        } );

                    done();
                } );
        } );

        it( 'create a full slide', function( done ) {

            ConfSlide.create( {
                title: 'Welcome',
                notes: 'Some notes',
                content: 'Content of the slide 2',
                presentation: 1,
                time: 10,
                type: 2
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 2,
                            title: 'Welcome',
                            notes: 'Some notes',
                            content: 'Content of the slide 2',
                            presentation: 1,
                            time: 10,
                            type: 2
                        } );

                    done();
                } );
        } );

        it( 'create a full slide presentation 2', function( done ) {

            ConfSlide.create( {
                title: 'Welcome home',
                notes: 'Some notes',
                content: 'Content of the slide 3',
                presentation: 2,
                time: 12
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 3,
                            title: 'Welcome home',
                            notes: 'Some notes',
                            content: 'Content of the slide 3',
                            presentation: 2,
                            time: 12,
                            type: 1
                        } );

                    done();
                } );
        } );
    } );

    describe( '#find()', function() {

        it( 'find all', function( done ) {

            ConfSlide.find()
                .exec( function( err, slides ) {
                    should.not.exist( err );

                    should.exist( slides );

                    ( slides )
                        .should.be.an.instanceOf( Array );
                    ( _.size( slides ) )
                        .should.equal( 3 );

                    done();
                } );
        } );

        it( 'find by presentation 1', function( done ) {

            ConfSlide.find( {
                presentation: 1
            } )
                .exec( function( err, slides ) {
                    should.not.exist( err );

                    should.exist( slides );

                    ( slides )
                        .should.be.an.instanceOf( Array );
                    ( _.size( slides ) )
                        .should.equal( 2 );

                    done();
                } );
        } );

        it( 'find by type 2', function( done ) {

            ConfSlide.find( {
                type: 2
            } )
                .exec( function( err, slides ) {
                    should.not.exist( err );

                    should.exist( slides );

                    ( slides )
                        .should.be.an.instanceOf( Array );
                    ( _.size( slides ) )
                        .should.equal( 1 );

                    done();
                } );
        } );
    } );
} );

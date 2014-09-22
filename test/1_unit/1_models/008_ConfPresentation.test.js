var should = require( 'should' );

describe( 'ConfPresentation', function() {

    describe( '#create', function() {

        it( 'create a presentation', function( done ) {

            ConfPresentation.create( {
                name: 'Awesome presentation',
                authors: 'Tacyniak Boris, Jordan Cortet',
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
                            name: 'Awesome presentation',
                            authors: 'Tacyniak Boris, Jordan Cortet',
                            conference: 1
                        } );

                    done();
                } );
        } );

        it( 'create a presentation with start and end', function( done ) {

            ConfPresentation.create( {
                name: 'ITEvent presentation',
                authors: 'Tacyniak Boris, Jordan Cortet',
                conference: 1,
                startTime: new Date(),
                endTime: new Date()
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            id: 2,
                            name: 'ITEvent presentation',
                            authors: 'Tacyniak Boris, Jordan Cortet',
                            conference: 1
                        } );

                    done();
                } );
        } );
    } );

    describe( '#find()', function() {

        it( 'find all', function( done ) {

            ConfPresentation.find()
                .exec( function( err, presentations ) {
                    should.not.exist( err );

                    should.exist( presentations );

                    ( presentations )
                        .should.be.an.instanceOf( Array );
                    ( _.size( presentations ) )
                        .should.equal( 2 );

                    done();
                } );
        } );
    } );
} );

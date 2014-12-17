var should = require( 'should' );

describe( 'ConfConference', function() {

    describe( '#create()', function() {

        it( 'create a conference', function( done ) {

            ConfConference.create( {
                name: 'Awesome test',
                token: 'ConfTest',
                clientName: 'ITEvents',
                logo: 'NotYet.png',
                colorScheme: 'body{ background: #312312; }'
            } )
                .exec( function( err, created ) {
                    should.not.exist( err );

                    should.exist( created );

                    ( created )
                        .should.be.an.instanceOf( Object );
                    ( created )
                        .should.have.properties( {
                            name: 'Awesome test',
                            token: 'ConfTest',
                            clientName: 'ITEvents',
                            logo: 'NotYet.png',
                            colorScheme: 'body{ background: #312312; }'
                        } );

                    done();
                } );
        } );
    } );


    describe( '#find', function() {

        it( 'find one id - 1', function( done ) {

            ConfConference.findOne( 1 )
                .exec( function( err, conference ) {
                    should.not.exist( err );

                    should.exist( conference );

                    ( conference )
                        .should.be.an.instanceOf( Object );
                    ( conference )
                        .should.have.properties( {
                            id: 1,
                            name: 'Awesome test',
                            token: 'ConfTest',
                            clientName: 'ITEvents',
                            logo: 'NotYet.png',
                            colorScheme: 'body{ background: #312312; }'
                        } );

                    done();
                } );
        } );
    } );
} );

var should = require( 'should' );

describe( 'ConfNote', function() {

    describe( '#create()', function() {

        it( 'create a note without user', function( done ) {

            ConfNote.create( {
                title: 'Title test',
                content: 'Note content'
            } )
                .exec( function( err, note ) {
                    should.exist( err );

                    should.not.exist( note );

                    done();
                } );
        } );

        it( 'create a note with user - 2', function( done ) {

            ConfNote.create( {
                title: 'Title test',
                content: 'Note content',
                user: 2
            } )
                .exec( function( err, note ) {
                    should.not.exist( err );

                    should.exist( note );

                    ( note )
                        .should.be.an.instanceOf( Object );
                    ( note )
                        .should.have.properties( {
                            id: 1,
                            title: 'Title test',
                            content: 'Note content',
                            user: 2
                        } );

                    done();
                } );
        } );

        it( 'create a second note with user - 2', function( done ) {

            ConfNote.create( {
                title: 'Title test 2',
                content: 'Note content',
                user: 2
            } )
                .exec( function( err, note ) {
                    should.not.exist( err );

                    should.exist( note );

                    ( note )
                        .should.be.an.instanceOf( Object );
                    ( note )
                        .should.have.properties( {
                            id: 2,
                            title: 'Title test 2',
                            content: 'Note content',
                            user: 2
                        } );

                    done();
                } );
        } );
    } );


    describe( '#find', function() {

        it( 'find the note with the id - 2', function( done ) {

            ConfNote.findOne( 2 )
                .exec( function( err, note ) {
                    should.not.exist( err );

                    should.exist( note );

                    ( note )
                        .should.be.an.instanceOf( Object );
                    ( note )
                        .should.have.properties( {
                            id: 2,
                            title: 'Title test 2',
                            content: 'Note content',
                            user: 2
                        } );

                    done();
                } );
        } );

        it( 'find all the notes', function( done ) {

            ConfNote.find()
                .exec( function( err, notes ) {
                    should.not.exist( err );

                    should.exist( notes );

                    ( notes )
                        .should.be.an.instanceOf( Array );

                    ( _.size( notes ) )
                        .should.equal( 2 );

                    done();
                } );
        } );
    } );


    describe( '#update', function() {

        it( 'update the note with id - 1', function( done ) {

            ConfNote.findOne( 1 )
                .exec( function( err, note ) {
                    should.not.exist( err );

                    should.exist( note );

                    note.content = 'Updated note content';

                    note.save( function( err, note ) {
                        should.not.exist( err );

                        should.exist( note );

                        ( note )
                            .should.be.an.instanceOf( Object );
                        ( note )
                            .should.have.properties( {
                                id: 1,
                                title: 'Title test',
                                content: 'Updated note content'
                            } );

                        done();
                    } );
                } )

        } );
    } );


    describe( '#destroy', function() {

        it( 'destroy the note with id - 2', function( done ) {

            ConfNote.destroy( 2 )
                .exec( function( err, destroyed ) {
                    should.not.exist( err );

                    done();
                } );
        } );
    } );
} );

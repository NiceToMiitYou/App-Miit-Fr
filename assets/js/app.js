window.ITEventApp = angular.module( 'ITEventApp', ['ngAnimate'] );

// Create
function init() {
    ITStorage.create( 'options', true );

    ITStorage.create( 'chatrooms' );
    ITStorage.create( 'users' );
    ITStorage.create( 'notes' );
    ITStorage.create( 'resources' );

    ITStorage.create( 'quizzes' );
    ITStorage.create( 'presentations' );

    initData();
}

// Request data
function initData() {

    // Get the conference if it is not loaded
    if ( !ITStorage.db.options.get( 'conference.initialized' ) ) {

        // Request the conference
        ITConnect.config.conference( function( data ) {

            if ( data.done ) {

                ITStorage.db.options.set( 'conference', data.conference );

                ITStorage.db.options.set( 'conference.initialized', true );
            }
        } );
    }

    // Load data if not loaded and have to be loaded
    if ( ITStorage.db.options.get( 'user.isConnected' ) &&
        !ITStorage.db.options.get( 'data.isLoaded' ) ) {

        // Call initialization of data one by one and set them loaded after
        async.waterfall(
            [

                function( callback ) {
                    // Load chatrooms
                    ITConnect.chatroom.list( function( data ) {
                        if ( !data.done ) return;

                        // Add each chatroom in the area
                        for ( chatroom in data.chatrooms ) {

                            ITStorage.db.chatrooms.set( chatroom.id, chatroom );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load notes
                    ITConnect.note.list( function( data ) {
                        if ( !data.done ) return;

                        // Add each note in the area
                        for ( note in data.notes ) {

                            ITStorage.db.notes.set( note.id, note );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load resources
                    ITConnect.resources.list( function( data ) {
                        if ( !data.done ) return;

                        // Add each resource in the area
                        for ( resource in data.resources ) {

                            ITStorage.db.resources.set( resource.id, resource );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load quizzes
                    ITConnect.questions.quizz.list( function( data ) {
                        if ( !data.done ) return;

                        var max = 0;
                        var end = 0;

                        // Add each resource in the area
                        for ( quizz in data.quizzes ) {

                            max++;

                            // Get all questions of the quizz
                            ITConnect.questions.quizz.questions(
                                quizz.id,
                                function( data ) {
                                    if ( data.done ) {

                                        // Add them to the current object
                                        quizz.questions = data.questions;

                                        // Store the quizz
                                        ITStorage.db.quizzes.set( quizz.id, quizz );
                                    }

                                    end++;

                                    if ( max === end ) callback( null );
                                } );
                        }
                    } );
                }
            ],
            function( err ) {
                // If all right, then set isLoaded
                if ( !err ) {
                    ITStorage.db.options.set( 'data.isLoaded', true );
                }
            } );

    }
}

init();

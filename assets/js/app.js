// Create
function init() {
    ITStorage.create( 'options', !ITEventDebug );

    ITStorage.create( 'chatrooms', !ITEventDebug );
    ITStorage.create( 'users', !ITEventDebug );
    ITStorage.create( 'notes', !ITEventDebug );
    ITStorage.create( 'resources', !ITEventDebug );

    ITStorage.create( 'quizzes', !ITEventDebug );
    ITStorage.create( 'tags', !ITEventDebug );
    ITStorage.create( 'likes', !ITEventDebug );
    ITStorage.create( 'presentations', !ITEventDebug );

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
                        for ( index in data.chatrooms ) {

                            ITStorage.db.chatrooms.set( data.chatrooms[index].id, data.chatrooms[index] );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load notes
                    ITConnect.note.list( function( data ) {
                        if ( !data.done ) return;

                        // Add each note in the area
                        for ( index in data.notes ) {

                            ITStorage.db.notes.set( data.notes[index].id, data.notes[index] );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load resources
                    ITConnect.resources.list( function( data ) {
                        if ( !data.done ) return;

                        // Add each resource in the area
                        for ( index in data.resources ) {

                            ITStorage.db.resources.set( data.resources[index].id, data.resources[index] );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load tags
                    ITConnect.question.presentation.tags( function( data ) {
                        if ( !data.done ) return;

                        // Add each tag in the area
                        for ( index in data.tags ) {

                            ITStorage.db.tags.set( data.tags[index].id, data.tags[index] );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load quizzes
                    ITConnect.question.quizz.list( function( data ) {
                        if ( !data.done ) return;

                        var max = 0;
                        var end = 0;

                        // Add each resource in the area
                        for ( index in data.quizzes ) {

                            max++;

                            // Get all questions of the quizz
                            ITConnect.question.quizz.questions(
                                data.quizzes[index].id,
                                function( data ) {
                                    if ( data.done ) {

                                        // Add them to the current object
                                        data.quizzes[index].questions = data.questions;

                                        // Store the quizz
                                        ITStorage.db.quizzes.set( quizz.id, quizz );
                                    }

                                    end++;

                                    if ( max === end ) callback( null );
                                } );
                        }

                        if( max === 0 ) callback( null ); 
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

    // If connected, synchronize
    if ( ITStorage.db.options.get( 'user.isConnected' ) ) {
        window.onload = ITConnect.synchronize;
    }
}

init();
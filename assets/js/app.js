// Create
function init() {
    ITStorage.create( 'options', true );

    ITStorage.create( 'chatrooms', !ITEventDebug );
    ITStorage.create( 'users', !ITEventDebug );
    ITStorage.create( 'notes', !ITEventDebug );
    ITStorage.create( 'resources', !ITEventDebug );

    ITStorage.create( 'quizzes', !ITEventDebug );
    ITStorage.create( 'tags', !ITEventDebug );
    ITStorage.create( 'likes', !ITEventDebug );
    ITStorage.create( 'presentations', !ITEventDebug );

    if ( ITEventDebug ) {
        ITStorage.db.options.set( 'data.isLoaded', false );
    }

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
                    // Load presentations
                    ITConnect.config.presentation.list( function( data ) {
                        if ( !data.done ) return;

                        // Add each chatroom in the area
                        for ( index in data.presentations ) {

                            // Set current to 0 by default
                            data.presentations[index].current = 0;

                            ITStorage.db.presentations.set( data.presentations[index].id, data.presentations[index] );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Get actual presentation
                    ITConnect.config.presentation.actual( function( data ) {
                        if ( !data.done ) return;

                        ITStorage.db.options.set('presentation.actual', 
                            ITStorage.db.presentations.get( data.presentation )
                        );

                        callback( null );
                    } );
                },

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

                        var user = ITStorage.db.options.get( 'user' );

                        // Add each resource in the area
                        for ( index in data.quizzes ) {

                            max++;

                            ITStorage.db.quizzes.set( data.quizzes[index].id, data.quizzes[index] );
                            
                            // Get all questions of the quizz
                            ITConnect.question.quizz.questions(
                                data.quizzes[index].id,
                                function( dataQuestion ) {
                                    if ( dataQuestion.done && dataQuestion.questions.length > 0 ) {

                                        // Get quizz
                                        var quizz = ITStorage.db.quizzes.get( dataQuestion.questions[0].quizz );

                                        // Set not answered
                                        quizz.answered = false;

                                        // Foreach questions
                                        for( index in dataQuestion.questions ) {

                                            // Foreach answers
                                            for( indexAnswer in dataQuestion.questions[index].answers ) {

                                                // Default not selected
                                                var selected = false;

                                                // Check if answered
                                                for ( indexUserAnswer in user.quizzAnswers ) {

                                                    // Check if same id
                                                    if ( user.quizzAnswers[indexUserAnswer].id === dataQuestion.questions[index].answers[indexAnswer].id) {
                                                        
                                                        // Set answered
                                                        quizz.answered = true;

                                                        // Set selected
                                                        selected = true;

                                                        // Stop the loop
                                                        break;
                                                    }
                                                }

                                                // Set selected if she is
                                                dataQuestion.questions[index].answers[indexAnswer].selected = selected;
                                            }
                                        }

                                        // Add them to the current object
                                        quizz.questions = dataQuestion.questions;

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

                // If connected, synchronize
                ITConnect.synchronize();

                // If all right, then set isLoaded
                if ( !err ) {
                    ITStorage.db.options.set( 'data.isLoaded', true );
                }
            } );

    }
}

init();
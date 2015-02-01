"use strict";

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

    if ( ITEventDebug ) {
        ITStorage.db.options.set( 'data.isLoaded', false );
    }

    initData();
}

// Request data
function initData() {

    // Load data if not loaded and have to be loaded
    if ( !ITStorage.db.options.get( 'data.isLoaded' ) ) {

        // Call initialization of data one by one and set them loaded after
        async.waterfall(
            [
                function( callback ) {

                    // Request to subscribe to the rooms
                    ITConnect.subscribe( function( data ) {

                        callback( null );
                    } );
                },

                function( callback ) {

                    // Request the current user
                    ITConnect.user.me( function( data ) {

                        if ( data.done ) {

                            ITStorage.db.options.set( 'user', data.user );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {

                    // Request the conference
                    ITConnect.config.conference( function( data ) {

                        if ( data.done ) {

                            ITStorage.db.options.set( 'conference', data.conference );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load presentations
                    ITConnect.config.presentation.list( function( data ) {
                        if ( data.done ) {

                            // Add each chatroom in the area
                            _.forEach(data.presentations, function( presentation ) {

                                // Set current to 0 by default
                                presentation.current = 0;

                                // Set default thubnail
                                presentation.thumbnail = null;

                                ITStorage.db.presentations.set( presentation.id, presentation );
                            });
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Get actual presentation
                    ITConnect.config.presentation.actual( function( data ) {
                        if ( data.done ) {

                            ITStorage.db.options.set('presentation.actual', 
                                ITStorage.db.presentations.get( data.presentation )
                            );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load chatrooms
                    ITConnect.chatroom.list( function( data ) {
                        if ( data.done ) {

                            // Add each chatroom in the area
                            _.forEach(data.chatrooms, function( chatroom ) {

                                ITStorage.db.chatrooms.set( chatroom.id, chatroom );
                            });
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load notes
                    ITConnect.note.list( function( data ) {
                        if ( data.done ) {

                            // Add each note in the area
                            for ( var index in data.notes ) {

                                ITStorage.db.notes.set( data.notes[index].id, data.notes[index] );
                            }
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load resources
                    ITConnect.resources.list( function( data ) {
                        if ( data.done ) {

                            // Add each resource in the area
                            for ( var index in data.categories ) {

                                ITStorage.db.resources.set( data.categories[index].id, data.categories[index] );
                            }
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load tags
                    ITConnect.question.presentation.tags( function( data ) {
                        if ( data.done ) {

                            // Add each tag in the area
                            for ( var index in data.tags ) {

                                ITStorage.db.tags.set( data.tags[index].id, data.tags[index] );
                            }
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load quizzes
                    ITConnect.question.quizz.list( function( data ) {

                        var max = 0;
                        var end = 0;

                        if ( data.done ) {

                            var user = ITStorage.db.options.get( 'user' );

                            // Add each resource in the area
                            for ( var index in data.quizzes ) {

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
                                            for( var index in dataQuestion.questions ) {

                                                // Foreach answers
                                                for( var indexAnswer in dataQuestion.questions[index].answers ) {

                                                    // Default not selected
                                                    var selected = false;

                                                    // Check if answered
                                                    for ( var indexUserAnswer in user.quizzAnswers ) {

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
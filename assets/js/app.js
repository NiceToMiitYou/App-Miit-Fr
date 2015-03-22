"use strict";

if (typeof window.console === "undefined" || typeof window.console.log === "undefined") {

    window.console = {};
    window.console.log = function() {};
}

// Create
function init() {
    MiitStorage.create( 'options',       !ITEventDebug );

    MiitStorage.create( 'chatrooms',     !ITEventDebug );
    MiitStorage.create( 'users',         !ITEventDebug );
    MiitStorage.create( 'notes',         !ITEventDebug );
    MiitStorage.create( 'resources',     !ITEventDebug );

    MiitStorage.create( 'quizzes',       !ITEventDebug );
    MiitStorage.create( 'tags',          !ITEventDebug );
    MiitStorage.create( 'likes',         !ITEventDebug );
    MiitStorage.create( 'presentations', !ITEventDebug );

    if ( ITEventDebug ) {
        MiitStorage.db.options.set( 'data.isLoaded', false );
    }

    initData();
}
// Request data
function initData() {

    // Load data if not loaded and have to be loaded
    if ( !MiitStorage.db.options.get( 'data.isLoaded' ) ) {

        var user;

        // Call initialization of data one by one and set them loaded after
        async.waterfall(
            [
                function( callback ) {

                    // Request to subscribe to the rooms
                    MiitConnect.subscribe( function( data ) {

                        if( data.done ) {
                            
                            callback( null );
                        } else {

                            setTimeout( function() {

                                // refresh if can't subscribe
                                window.location = '/';    
                            }, 10 * 1000);
                        }
                    } );
                },

                function( callback ) {

                    // Request the current user
                    MiitConnect.user.me( function( data ) {

                        if ( data.done ) {

                            user = data.user;
                    
                            MiitStorage.db.options.set( 'user', user );
                        }
                        
                        callback( null );
                    } );
                },

                function( callback ) {

                    // Request the conference
                    MiitConnect.config.conference( function( data ) {

                        if ( data.done ) {

                            MiitStorage.db.options.set( 'conference', data.conference );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load presentations
                    MiitConnect.config.presentation.list( function( data ) {
                        if ( data.done ) {

                            // Add each chatroom in the area
                            _.forEach(data.presentations, function( presentation ) {

                                // Set current to 0 by default
                                presentation.current = 0;

                                // Set default thubnail
                                presentation.thumbnail = null;

                                MiitStorage.db.presentations.set( presentation.id, presentation );
                            });
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Get actual presentation
                    MiitConnect.config.presentation.actual( function( data ) {
                        if ( data.done ) {

                            MiitStorage.db.options.set('presentation.actual', 
                                MiitStorage.db.presentations.get( data.presentation )
                            );
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load chatrooms
                    MiitConnect.chatroom.list( function( data ) {
                        if ( data.done ) {

                            // Add each chatroom in the area
                            _.forEach(data.chatrooms, function( chatroom ) {

                                MiitStorage.db.chatrooms.set( chatroom.id, chatroom );
                            });
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load notes
                    MiitConnect.note.list( function( data ) {
                        if ( data.done ) {

                            // Add each note in the area
                            for ( var index in data.notes ) {

                                MiitStorage.db.notes.set( data.notes[index].id, data.notes[index] );
                            }
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load resources
                    MiitConnect.resources.list( function( data ) {
                        if ( data.done ) {

                            // Add each resource in the area
                            for ( var index in data.categories ) {

                                MiitStorage.db.resources.set( data.categories[index].id, data.categories[index] );
                            }
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load tags
                    MiitConnect.question.presentation.tags( function( data ) {
                        if ( data.done ) {

                            // Add each tag in the area
                            for ( var index in data.tags ) {

                                MiitStorage.db.tags.set( data.tags[index].id, data.tags[index] );
                            }
                        }

                        callback( null );
                    } );
                },

                function( callback ) {
                    // Load quizzes
                    MiitConnect.question.quizz.list( function( data ) {

                        var max = 0;
                        var end = 0;

                        if ( data.done ) {

                            // Add each resource in the area
                            _.forEach( data.quizzes, function( quizz ) {

                                max++;

                                // Get all questions of the quizz
                                MiitConnect.question.quizz.questions(
                                    quizz.id,
                                    function( dataQuestion ) {
                                        if ( dataQuestion.done && dataQuestion.questions.length > 0 ) {

                                            // Set not answered
                                            quizz.answered = false;

                                            // For each answers
                                            _.forEach(
                                                _.flatten( _.map( dataQuestion.questions, 'answers') ),
                                                function( answer ) {

                                                    // Default not selected
                                                    var selected = false;

                                                    // For each answers of user
                                                    _.forEach(
                                                        user.quizzAnswers,
                                                        function( userAnswer ) {

                                                            // Check if same id
                                                            if ( userAnswer.answer === answer.id) {
                                                                
                                                                // Set answered
                                                                quizz.answered = true;

                                                                // Set selected
                                                                selected = true;
                                                            }
                                                        } );

                                                    // Set selected if she is
                                                    answer.selected = selected;
                                                } );

                                            // Add them to the current object
                                            quizz.questions = dataQuestion.questions;

                                            // Store the quizz
                                            MiitStorage.db.quizzes.set( quizz.id, quizz );
                                        }

                                        end++;

                                        if ( max === end ) callback( null );
                                    } );
                            } );
                        }

                        if( max === 0 ) callback( null ); 
                    } );
                }
            ],
            function( err ) {

                // If connected, synchronize
                MiitConnect.synchronize();

                // If all right, then set isLoaded
                if ( !err ) {

                    MiitStorage.db.options.set( 'data.isLoaded', true );
                }
            } );
    }
}

init();
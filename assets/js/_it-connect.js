window.ITConnect = ( function() {
    var apiPublicPrefix = '/api/public';

    var lastestTrack = null;

    var eventsCallbacks = {};

    lastestToken = 0;

    function synchronize() {

        // Ask for synchronisation
        io.socket.post( apiPublicPrefix + '/synchronize', {
            token: lastestToken
        }, function( res ) {

            if ( !res.done ) return;

            // Bind all events
            for ( eventId in res.events ) {
                // Copy the event
                var eventTmp = res.events[ eventId ];

                // Update token
                lastestToken = eventTmp.id;

                // Callback
                if ( typeof eventsCallbacks[ eventTmp.name ] === 'function' ) {
                    eventsCallbacks[ eventTmp.name ]( eventTmp.data );
                }
            }
        } );
    }

    return {
        // Bind an event
        bind: function( name, cb ) {
            // Add callbacks in list
            eventsCallbacks[ name ] = cb;

            // Unbind all event with same name
            io.socket.removeAllListeners( name );

            // Bind the event
            io.socket.on( name, function( cache ) {

                // Check integrity
                if ( lastestToken + 1 === cache.token ) {
                    // No event missing
                    lastestToken += 1;

                    // Callback
                    if ( typeof cb == 'function' )
                        cb( cache.data );
                } else {
                    
                    // Synchronise events
                    synchronize();
                }

            } );
        },

        // Chat actions
        chatroom: {
            // List all chatrooms
            list: function( cb ) {
                io.socket.get( apiPublicPrefix + '/chatroom/list', {}, cb );
            },

            // Send a message to the chatroom
            send: function( chatroom, message, cb ) {
                io.socket.post( apiPublicPrefix + '/chatroom/send', {
                    message: message,
                    chatroom: chatroom
                }, cb );
            }
        },

        // User actions
        user: {
            // List action
            list: function( cb ) {
                io.socket.get( apiPublicPrefix + '/user/list', {}, cb );
            },
            // Login action
            login: function( mail, password, cb ) {
                io.socket.post( apiPublicPrefix + '/user/login', {
                    mail: mail,
                    password: password
                }, cb );
            },
            // Login action
            register: function( mail, password, cb ) {
                io.socket.post( apiPublicPrefix + '/user/register', {
                    mail: mail,
                    password: password
                }, cb );
            },
            // Logout action
            logout: function( cb ) {
                io.socket.get( apiPublicPrefix + '/user/logout', {}, cb );
            }
        },

        // Question Actions
        question: {
            // Questions about quizz
            quizz: {

                // List all quizz
                list: function( cb ) {
                    io.socket.get( apiPublicPrefix + '/question/quizz/list', {}, cb );
                },

                // List all questions and answers of a quizz
                questions: function( quizz, cb ) {
                    io.socket.post( apiPublicPrefix + '/question/quizz/questions', {
                        quizz: quizz
                    }, cb );
                },

                // Answer to a question
                answer: function( question, answers, cb ) {
                    io.socket.post( apiPublicPrefix + '/question/quizz/answer', {
                        question: question,
                        answers: answers
                    }, cb );
                }
            },

            // Questions about presentation
            presentation: {
                // Create a new question
                create: function( question, tags, cb ) {
                    io.socket.post( apiPublicPrefix + '/question/presentation/create', {
                        question: question,
                        tags: tags
                    }, cb );
                },

                // Like a question
                like: function( question, cb ) {
                    io.socket.post( apiPublicPrefix + '/question/presentation/like', {
                        question: question,
                        like: true
                    }, cb );
                },

                // Dislike a question
                dislike: function( question, cb ) {
                    io.socket.post( apiPublicPrefix + '/question/presentation/like', {
                        question: question,
                        like: false
                    }, cb );
                }
            },

            // Questions about quizz
            slide: {

                // Get question of a slide
                question: function( slide, cb ) {
                    io.socket.get( apiPublicPrefix + '/question/slide/question', {
                        slide: slide
                    }, cb );
                },

                // Answer to a question
                answer: function( question, answers, cb ) {
                    io.socket.post( apiPublicPrefix + '/question/slide/answer', {
                        question: question,
                        answers: answers
                    }, cb );
                }
            },
        },

        // Notes Actions
        note: {
            // Create a new note
            create: function( title, content, cb ) {
                io.socket.post( apiPublicPrefix + '/note/create', {
                    title: title,
                    content: content
                }, cb );
            },

            // List all user's note
            list: function( cb ) {
                io.socket.get( apiPublicPrefix + '/note/list', {}, cb );
            },

            // Update a note
            update: function( note, title, content, cb ) {
                io.socket.post( apiPublicPrefix + '/note/update', {
                    note: note,
                    title: title,
                    content: content
                }, cb );
            },

            // delete a note
            delete: function( note, cb ) {
                io.socket.post( apiPublicPrefix + '/note/delete', {
                    note: note
                }, cb );
            },

            // send me a note
            send: function( note, cb ) {
                io.socket.post( apiPublicPrefix + '/note/send', {
                    note: note
                }, cb );
            }
        },

        // Resources Actions
        resources: {
            list: function( cb ) {
                io.socket.get( apiPublicPrefix + '/resources/list', {}, cb );
            }
        },

        track: {
            create: function( action, cb ) {
                if ( lastestTrack ) {
                    io.socket.post( apiPublicPrefix + '/track/end', {
                        track: lastestTrack
                    } );
                }

                io.socket.post( apiPublicPrefix + '/track/start', {
                    action: action
                }, function( data ) {
                    lastestTrack = data.track.id;

                    if ( typeof cb == 'function' ) {
                        cb( data );
                    }
                } );
            }
        }
    };
} )();

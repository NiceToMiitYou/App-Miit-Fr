"use strict";

window.ITConnect = ( function() {
    var apiPublicPrefix = '/api/viewer';
    var apiMasterPrefix = '/api/master';

    var eventsCallbacks = {};

    ITStorage.create( 'events', true );

    var lastestToken = 0;

    function cleanerEventsStorage() {

        var removed = 0;

        ITStorage.db.events.each(function(key, eventTmp) {
            
            // Check if expire
            if ( eventTmp.expire &&
                 ( new Date(eventTmp.expire) ).getTime() < ( new Date() ).getTime() ) {

                removed++;

                ITStorage.db.events.remove( eventTmp.id );
            }
        });

        return removed;
    }

    // Add cleaner to Garbage
    ITGarbage.add( cleanerEventsStorage );

    // handle the callback
    function eventCallback( eventTmp ) {
        // Update token
        lastestToken = eventTmp.id;

        // Execute callback if not expire
        if ( !eventTmp.expire ||
             ( new Date(eventTmp.expire) ).getTime() > ( new Date() ).getTime() ) {
            
            // handle if Callback exist
            if ( typeof eventsCallbacks[ eventTmp.name ] === 'function' ) {
                eventsCallbacks[ eventTmp.name ]( eventTmp.data );
            }
        }
    }

    // Ask for synchronisation
    function synchronize( currentToken ) {

        // Start by checking local database if first load (lastestToken === 0)
        if (lastestToken === 0) {

            var storedEvents = [];

            ITStorage.db.events.each( function(key, value) {

                // Store the event
                storedEvents.push(value);
            } );

            _.forEach(
                _.sortBy(storedEvents, function(e) {
                    return e.id;
                }), function( eventTmp ) {

                // Process event
                eventCallback( eventTmp );
            });
        }

        if ( currentToken > lastestToken ) {

            // Ask for synchronisation
            io.socket.get( apiPublicPrefix + '/synchronize/' + lastestToken,
                function( res ) {
                    if ( !res.done ) return;

                    // Bind all events
                    for ( var eventIndex in res.events ) {
                        // Copy the event
                        var eventTmp = res.events[ eventIndex ];

                        // Store the events
                        ITStorage.db.events.set( eventTmp.id, eventTmp );

                        // Process event
                        eventCallback( eventTmp );
                    }
                } );
        }
    }

    return {
        // Bind an event
        bind: function( name, cb ) {
            // Add callbacks in list
            eventsCallbacks[ name ] = cb;

            // Bind the event
            io.socket.on( name, function( cache ) {

                // Store received event
                ITStorage.db.events.set( cache.id, cache );

                // Check integrity
                if ( lastestToken + 1 === cache.id ) {

                    eventCallback( cache );
                } else {

                    // Synchronise events
                    synchronize( cache.id );
                }
            } );
        },

        // synchronize from cache
        synchronize: function() {
            // Force first synchronization from cache
            if ( lastestToken === 0 ) {
                synchronize( 2147483647 );
            }
        },

        // Get configuration
        config: {
            // Get conference settings
            conference: function( cb ) {
                io.socket.get( '/api/config/conference', {}, cb );
            },

            // Get conference settings
            connectedUsers: function( cb ) {
                io.socket.get( '/api/config/connected/users', {}, cb );
            },

            // Get presentation config
            presentation: {
                // Get the list of all presentations
                list: function( cb ) {
                    io.socket.get( '/api/config/presentation/list', {}, cb );
                },

                // Get actual presentation ID
                actual: function( cb ) {
                    io.socket.get( '/api/config/presentation/actual', {}, cb );
                }
            }
        },

        // Chat actions
        chatroom: {
            // List all chatrooms
            list: function( cb ) {
                io.socket.get( apiPublicPrefix + '/chatroom/list', {}, cb );
            },

            // Send a message to the chatroom
            send: function( chatroom, message, cb ) {
                io.socket.post( apiPublicPrefix + '/chatroom/' + chatroom + '/send', {
                    message: message
                }, cb );
            }
        },

        // User actions
        user: {
            // List action
            list: function( cb ) {
                io.socket.get( '/api/user/list', cb );
            },

            // Get action
            get: function( user, cb ) {
                io.socket.get( '/api/user/' + user + '/get', cb );
            },

            // Me action
            me: function( cb ) {
                io.socket.get( '/api/user/me', cb );
            },

            // Update action
            update: function( firstname, lastname, society, username, avatar, cb ) {
                io.socket.post( '/api/user/update', {
                    firstname: firstname,
                    lastname: lastname,
                    society: society,
                    username: username,
                    avatar: avatar
                }, cb );
            },

            // Logout action
            logout: function( cb ) {
                io.socket.get( '/api/user/logout', cb );
            }
        },

        // Question Actions
        question: {
            // Questions about quizz
            quizz: {

                // List all quizz
                list: function( cb ) {
                    io.socket.get( apiPublicPrefix + '/quizz/list', cb );
                },

                // List all questions and answers of a quizz
                questions: function( quizz, cb ) {
                    io.socket.get( apiPublicPrefix + '/quizz/' + quizz + '/questions', cb );
                },

                // Answer to a question
                answer: function( question, answers, cb ) {
                    io.socket.post( apiPublicPrefix + '/quizz/question/' + question + '/answer', {
                        answers: answers
                    }, cb );
                }
            },

            // Questions about presentation
            presentation: {
                // Create a new question
                create: function( question, tags, cb ) {
                    io.socket.post( apiPublicPrefix + '/presentation/question/create', {
                        question: question,
                        tags: tags
                    }, cb );
                },

                // Get all tags
                tags: function( cb ) {
                    io.socket.get( apiPublicPrefix + '/presentation/question/tags', cb );
                },

                // Like a question
                like: function( question, cb ) {
                    io.socket.post( apiPublicPrefix + '/presentation/question/' + question + '/like', {
                        like: true
                    }, cb );
                },

                // Dislike a question
                dislike: function( question, cb ) {
                    io.socket.post( apiPublicPrefix + '/presentation/question/' + question + '/like', {
                        like: false
                    }, cb );
                }
            },

            // Questions about quizz
            slide: {

                // Get question of a slide
                question: function( slide, cb ) {
                    io.socket.get( apiPublicPrefix + '/question/slide/' + slide + '/question', cb );
                },

                // Answer to a question
                answer: function( question, answers, cb ) {
                    io.socket.post( apiPublicPrefix + '/question/slide/question/' + question + '/answer', {
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
                io.socket.get( apiPublicPrefix + '/note/list', cb );
            },

            // Update a note
            update: function( note, title, content, cb ) {
                io.socket.post( apiPublicPrefix + '/note/' + note + '/update', {
                    title: title,
                    content: content
                }, cb );
            },

            // delete a note
            delete: function( note, cb ) {
                io.socket.get( apiPublicPrefix + '/note/' + note + '/delete', cb );
            },

            // send me a note
            send: function( note, cb ) {
                io.socket.get( apiPublicPrefix + '/note/' + note + '/send', cb );
            }
        },

        // Live actions
        live: {

            // Next slide
            next: function(presentation, cb) {
                io.socket.get( apiMasterPrefix + '/live/' + presentation + '/next', cb);
            },

            // Previous slide
            previous: function(presentation, cb) {
                io.socket.get( apiMasterPrefix + '/live/' + presentation + '/previous', cb);
            }
        },


        // Resources Actions
        resources: {
            list: function( cb ) {
                io.socket.get( apiPublicPrefix + '/resources/list', cb );
            }
        },

        track: {
            create: function( action ) {

                io.socket.get( apiPublicPrefix + '/track/' + action );
            }
        }
    };
} )();

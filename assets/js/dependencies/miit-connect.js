"use strict";

window.ITConnect = ( function() {
    var apiPublicPrefix = '/api/viewer',
        apiMasterPrefix = '/api/master';

    var eventsCallbacks = {};

    var lastestToken = 0;

    ITStorage.create( 'events', !ITEventDebug );

    // Add cleaner to Garbage
    ITGarbage.add( function() {

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
    } );

    var queue = async.priorityQueue(function (eventTmp, callback) {

        // Check for duplicate (only id upper than lastest are allowed)
        if( eventTmp.id > lastestToken ) {

            // Update token
            lastestToken = eventTmp.id;

            // If not set already
            if( !ITStorage.db.events.get( eventTmp.id ) ) {

                // Store the events
                ITStorage.db.events.set( eventTmp.id, eventTmp );
            }

            // Execute callback if not expire
            if ( !eventTmp.expire ||
                 ( new Date(eventTmp.expire) ).getTime() > ( new Date() ).getTime() ) {
                
                // handle if Callback exist
                if ( typeof eventsCallbacks[ eventTmp.name ] === 'function' ) {
                    eventsCallbacks[ eventTmp.name ]( eventTmp.data );
                }
            }
        }

        callback();
    }, 1);

    // Create an actions queue to handle events with a specific order
    var actions = async.priorityQueue( function ( task, callback ) {

        // Store received event
        ITStorage.db.events.set( task.id, task );

        // Check integrity
        if ( lastestToken + 1 === task.id ) {

            queue.push( task, task.id );
        } else {

            // Synchronise events
            synchronize( task.id );
        }

        callback();

    }, 1 );

    // Handle the list of events
    function processEvents( events ) {

        _.forEach(
            _.sortBy( events, 'id' ),
            function( eventTmp ) {

                // Process event
                queue.push( eventTmp, eventTmp.id );
            }
        );
    }

    // Ask for synchronisation and debounce the function
    var synchronize = _.debounce( function( currentToken ) {

        // Start by checking local database if first load (lastestToken === 0)
        if (lastestToken === 0) {

            var storedEvents = [];

            ITStorage.db.events.each( function(key, value) {

                // Store the event
                storedEvents.push( value );
            } );

            processEvents( storedEvents );
        }

        if ( currentToken > lastestToken ) {

            // Ask for synchronisation
            io.socket.get( apiPublicPrefix + '/synchronize/' + lastestToken,
                function( res ) {
                    if ( !res.done ) return;

                    // Bind all events
                    processEvents( res.events );
                }
            );
        }
    }, 250 );

    return {
        // Bind an event
        bind: function( name, cb ) {
            // Add callbacks in list
            eventsCallbacks[ name ] = cb;

            // Bind the event
            io.socket.on( name, function( cache ) {

                // Add the action to the list
                actions.push( cache, cache.id );
            } );
        },

        // Subscribe to rooms
        subscribe: function( cb ) {
            io.socket.get( '/api/subscribe', {}, cb );
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
                io.socket.get( '/api/config/users', {}, cb );
            },

            // Get presentation config
            presentation: {
                // Get the list of all presentations
                list: function( cb ) {
                    io.socket.get( '/api/config/presentations', {}, cb );
                },

                // Get actual presentation ID
                actual: function( cb ) {
                    io.socket.get( '/api/config/actual', {}, cb );
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

            // Get action
            get: function( user, cb ) {
                io.socket.get( '/api/user/' + user, cb );
            },

            // Me action
            me: function( cb ) {
                io.socket.get( '/api/user', cb );
            },

            // Update action
            update: function( firstname, lastname, society, username, avatar, cb ) {
                io.socket.post( '/api/user', {
                    firstname: firstname,
                    lastname:  lastname,
                    society:   society,
                    username:  username,
                    avatar:    avatar
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
                    io.socket.get( apiPublicPrefix + '/quizz', cb );
                },

                // List all questions and answers of a quizz
                questions: function( quizz, cb ) {
                    io.socket.get( apiPublicPrefix + '/quizz/' + quizz + '/questions', cb );
                },

                // Answer to a question
                answer: function( quizz, selected, cb ) {
                    io.socket.post( apiPublicPrefix + '/quizz/' + quizz + '/answer', {
                        selected: selected
                    }, cb );
                }
            },

            // Questions about presentation
            presentation: {
                // Create a new question
                create: function( question, tags, cb ) {
                    io.socket.post( apiPublicPrefix + '/presentation/question', {
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
                io.socket.post( apiPublicPrefix + '/note', {
                    title: title,
                    content: content
                }, cb );
            },

            // List all user's note
            list: function( cb ) {
                io.socket.get( apiPublicPrefix + '/note', cb );
            },

            // Update a note
            update: function( note, title, content, cb ) {
                io.socket.post( apiPublicPrefix + '/note/' + note, {
                    title: title,
                    content: content
                }, cb );
            },

            // delete a note
            delete: function( note, cb ) {
                io.socket.delete( apiPublicPrefix + '/note/' + note, cb );
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
                io.socket.get( apiPublicPrefix + '/resources', cb );
            }
        },

        track: {
            create: function( action ) {

                io.socket.get( apiPublicPrefix + '/track/' + action );
            }
        }
    };
} )();

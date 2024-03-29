"use strict";

angular
    .module( 'MiitApp')
    .controller( 'NotesController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.notes = {};

            $scope.current = {

                title: 'Note',

                content: '',

                new: true
            };

            $scope.hasChange = false;

            $scope.saving = false;

            function loadNotes( isLoaded ) {

                if(isLoaded) {

                    $timeout(function() {
                        
                        MiitStorage.db.notes.each(function( id, note ) {

                            note.new = false;

                            $scope.notes[note.id] = note;

                            if ( $scope.current.new ) {

                                $scope.current = $scope.notes[note.id];
                            }
                        } );
                    } ); 
                }
            }

            function saveNotDebounced(cb) {

                if ( !$scope.saving && $scope.current.title && $scope.current.content ) {
                    
                    if ($scope.current.new) {

                        $scope.saving = true;
                    
                        MiitConnect.note.create($scope.current.title, $scope.current.content, function( data ) {

                            $timeout(function() {

                                $scope.saving = false;

                                if(data.done) {

                                    $scope.notes[data.note.id] = data.note;

                                    $scope.current = $scope.notes[data.note.id];

                                    $scope.current.new = false;

                                    $scope.hasChange = false;

                                    if ( typeof cb === 'function' ) {

                                        cb($scope.notes[data.note.id]);
                                    }
                                }
                            });
                        });
                        
                    } else if ( $scope.hasChange ) {

                        $scope.saving = true;
                    
                        MiitConnect.note.update($scope.current.id, $scope.current.title, $scope.current.content, function( data ) {

                            $timeout(function() {
                                
                                $scope.saving = false;

                                if(data.done) {

                                    $scope.notes[data.note.id] = data.note;
                                    
                                    $scope.current = $scope.notes[data.note.id];

                                    $scope.hasChange = false;

                                    if ( typeof cb === 'function' ) {

                                        cb( $scope.notes[data.note.id] );
                                    }
                                }
                            });

                        });

                    } else {

                        if ( typeof cb === 'function' ) {

                            cb( $scope.current );
                        }
                    }
                } else if ( !$scope.saving ) {

                    if ( typeof cb === 'function' ) {

                        cb( $scope.current );
                    }
                }
            }

            var save = _.debounce(saveNotDebounced, 250);

            function addNote() {

                save( function( savedNote ) {

                    $timeout(function() {
                        
                        $scope.current = {

                            title: 'Note',

                            content: '',

                            new: true

                        };
                    });

                } );
            }

            function changeNote( note ) {

                save( function( savedNote ) {

                    $timeout(function() {
                        
                        $scope.current = note;

                        $scope.current.new = false;

                    } );

                } );
            }

            function send() {

                save( function( savedNote ) {

                    if( savedNote.id ) {

                        MiitConnect.note.send( savedNote.id, function(data) {

                            $timeout(function() {
                                if( data.done ) {

                                    $scope.toast({
                                        message: ItNotifications.notes.send.success,
                                        type: 'info'
                                    });
                                } else {

                                    $scope.toast({
                                        message: ItNotifications.notes.send.error,
                                        type: 'error'
                                    });
                                }
                            } );
                        } );
                    }
                } );
            }

            MiitStorage.db.options.bind( 'data.isLoaded', true, loadNotes );

            $scope.addNote = function() {
                if( $scope.isAllowed('NOTE_INTERACTIONS') && 
                    $scope.isAllowed('NOTE_MULTIPLE') ) {

                    addNote();
                }
            };

            $scope.changeNote =  function( note ) {
                if( $scope.isAllowed('NOTE_INTERACTIONS') && 
                    $scope.isAllowed('NOTE_MULTIPLE') ) {

                    changeNote( note );
                }
            };

            $scope.save = function( cb ) {
                if( $scope.isAllowed('NOTE_INTERACTIONS') ) {

                    save( cb );
                }
            };

            $scope.send = function() {
                if( $scope.isAllowed('NOTE_INTERACTIONS') && 
                    $scope.isAllowed('NOTE_SEND') ) {

                    send();
                }
            };

        }
    ] );
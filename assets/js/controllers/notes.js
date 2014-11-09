"use strict";

ITEventApp.controller(
    'notesController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.notes = {};

            $scope.current = {

                title: 'Note 1',

                content: 'Bienvenue sur votre bloc-note!\n' + 
                         'Vous pouvez dès à présent modifier ou créer des notes.\n' + 
                         'Si vous souhaitez les recevoir dans votre boîte mail, Appuyer sur le bouton "Envoyer".',

                new: true

            };

            $scope.hasChange = false;

            $scope.saving = false;

            function loadNotes( isLoaded ) {

                if(isLoaded) {

                    $timeout(function() {
                        
                        ITStorage.db.notes.each(function( id, note ) {

                            note.new = false;

                            $scope.notes[note.id] = note;

                            if ( $scope.current.new ) {

                                $scope.current = $scope.notes[note.id];
                            }
                        } );
                    } ); 
                }
            }

            function save(cb) {

                if ( !$scope.saving && $scope.current.title && $scope.current.content ) {
                    
                    if ($scope.current.new) {

                        $scope.saving = true;
                    
                        ITConnect.note.create($scope.current.title, $scope.current.content, function( data ) {

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

                                    $scope.messenger.post({
                                        message: 'Votre note a bien été créée.',
                                        type: 'info'
                                    });        
                                } else {

                                    $scope.messenger.post({
                                        message: 'Une erreur s\'est produite lors de la création de la note.',
                                        type: 'error'
                                    });
                                }
                            });
                        });
                        
                    } else if ( $scope.hasChange ) {

                        $scope.saving = true;
                    
                        ITConnect.note.update($scope.current.id, $scope.current.title, $scope.current.content, function( data ) {

                            $timeout(function() {
                                
                                $scope.saving = false;

                                if(data.done) {

                                    $scope.notes[data.note.id] = data.note;
                                    
                                    $scope.current = $scope.notes[data.note.id];

                                    $scope.hasChange = false;

                                    if ( typeof cb === 'function' ) {

                                        cb($scope.notes[data.note.id]);
                                    }

                                    $scope.messenger.post({
                                        message: 'Votre note a bien été enregistrée.',
                                        type: 'info'
                                    });
                                } else {

                                    $scope.messenger.post({
                                        message: 'Une erreur s\'est produite lors de la sauvegarde de la note.',
                                        type: 'error'
                                    });
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

            function addNote() {

                save( function( savedNote ) {

                    $timeout(function() {
                        
                        $scope.current = {

                            title: 'Nouvelle note',

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

                    ITConnect.note.send( savedNote.id, function(data) {

                        $timeout(function() {
                            if( data.done ) {

                                $scope.messenger.post({
                                    message: 'Votre note a bien été envoyée dans votre boite mail.',
                                    type: 'info'
                                });
                            } else {

                                $scope.messenger.post({
                                    message: 'Une erreur c\'est produite lors de l\'envoi par notre service.',
                                    type: 'error'
                                });
                            }
                        } );
                    } );
                } );
            }

            ITStorage.db.options.bind( 'data.isLoaded', true, loadNotes );

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

        } ] );
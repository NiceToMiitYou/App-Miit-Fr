ITEventApp.controller(
    'notesController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.notes = {};

            $scope.current = {

                title: '',

                content: '',

                new: true

            };

            $scope.saving = false;

            function loadNotes( isLoaded ) {
                if(isLoaded) {

                    $timeout(function() {
                        
                        ITStorage.db.notes.each(function( id, note ) {

                            note.new = false;

                            $scope.notes[note.id] = note;

                        } );
                    } ); 
                }
            }

            function save(cb) {

                if ( !$scope.saving && $scope.current.title && $scope.current.content ) {
                    
                    $scope.saving = true;
                    
                    if ($scope.current.new) {

                        ITConnect.note.create($scope.current.title, $scope.current.content, function( data ) {

                            $scope.saving = false;

                            if(data.done) {

                                $scope.notes[data.note.id] = data.note;

                                $scope.current = $scope.notes[data.note.id];

                                $scope.current.new = false;

                                if ( typeof cb === 'function' ) {
                                    cb($scope.notes[data.note.id]);
                                }                             
                            }

                        });
                        
                    } else {

                        ITConnect.note.update($scope.current.id, $scope.current.title, $scope.current.content, function( data ) {

                            $scope.saving = false;

                            if(data.done) {

                                $scope.notes[data.note.id] = data.note;
                                
                                $scope.current = $scope.notes[data.note.id];

                                if ( typeof cb === 'function' ) {
                                    cb($scope.notes[data.note.id]);
                                }
                            }

                        });
                    }
                } else if ( !$scope.saving ) {

                    if ( typeof cb === 'function' ) {
                        cb();
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

                            }
                        } );
                    } )

                } );
            }

            ITStorage.db.options.bind( 'data.isLoaded', true, loadNotes );

            $scope.addNote = addNote;

            $scope.changeNote = changeNote;

            $scope.save = save;

            $scope.send = send;

        } ] );
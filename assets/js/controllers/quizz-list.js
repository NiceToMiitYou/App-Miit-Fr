"use strict";


angular
    .module( 'MiitApp')
    .controller( 'QuizzListController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.quizzes = {};

            function loadQuizzes( isLoaded ) {
                if(isLoaded) {

                    $timeout(function() {
                        
                        MiitStorage.db.quizzes.each(function( id, quizz ) {

                            $scope.quizzes[quizz.id] = quizz;

                        } );
                    } ); 
                }
            }

            function openInner( quizz ) {
                
                MiitStorage.db.options.set('quizz.current', quizz);

                $scope.track('QUIZZ-INNER');
            }

            $scope.openInner = function( quizz ) {
                if( $scope.isAllowed('QUIZZ_INTERACTIONS') ) {

                    openInner( quizz );
                }
            };

            MiitStorage.db.options.bind( 'data.isLoaded', true, loadQuizzes );
        }
    ] );
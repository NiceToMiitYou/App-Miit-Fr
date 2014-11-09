ITEventApp.controller(
    'quizzListController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.quizzes = {};

            function loadQuizzes( isLoaded ) {
                if(isLoaded) {

                    $timeout(function() {
                        
                        ITStorage.db.quizzes.each(function( id, quizz ) {

                            $scope.quizzes[quizz.id] = quizz;

                        } );
                    } ); 
                }
            }

            function openInner( quizz ) {
                
                ITStorage.db.options.set('quizz.current', quizz);

                $scope.track('QUIZZ-INNER');
            }

            $scope.openInner = function( quizz ) {
                if( $scope.isAllowed('QUIZZ_INTERACTIONS') ) {

                    openInner( quizz );
                }
            };

            ITStorage.db.options.bind( 'data.isLoaded', true, loadQuizzes );

        } ] );
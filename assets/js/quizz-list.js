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

            ITStorage.db.options.bind( 'data.isLoaded', true, loadQuizzes );

        } ] );
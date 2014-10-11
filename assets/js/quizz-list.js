ITEventApp.controller(
    'quizzListController', [ '$scope',
        function( $scope ) {

            $scope.quizzes = {};

            function loadQuizzes( isLoaded ) {
                if(isLoaded) {

                    ITStorage.db.quizzes.each(function( id, quizz ) {

                        $scope.quizzes[quizz.id] = quizz;

                    } );

                    $scope.$apply(); 
                }
            }

            ITStorage.db.options.bind( 'data.isLoaded', true, loadQuizzes );

        } ] );
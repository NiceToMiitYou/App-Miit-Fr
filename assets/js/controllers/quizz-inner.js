ITEventApp.controller(
    'quizzInnerController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = {};

            function loadQuizz( quizz ) {
                $timeout(function() {

                    $scope.current = quizz;

                });
            }


            ITStorage.db.options.bind('quizz.current', loadQuizz);
        } ] );
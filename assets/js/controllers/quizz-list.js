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
                $scope.$parent.activetool = "quizz-inner";
                console.log("open")
                ITStorage.db.options.set('quizz.current', quizz);
            }

            $scope.openInner = function( quizz ) {
                if( $scope.isAllowed('QUIZZ_INTERACTIONS') ) {

                    openInner( quizz );
                }
            };

            ITStorage.db.options.bind( 'data.isLoaded', true, loadQuizzes );

        } ] );
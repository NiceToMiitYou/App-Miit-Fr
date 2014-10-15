ITEventApp.controller(
    'quizzInnerController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = {};

            $scope.isAnswered = false;

            function loadQuizz( quizz ) {
                $timeout(function() {

                    $scope.current = quizz;

                });
            }

            function checkRight( question, answer ) {

                for ( indexAnswer in question.answers ) {
                    
                    if ( question.answers[indexAnswer].id !== answer.id ) {

                        question.answers[indexAnswer].selected = false;
                    } 
                }
                
                answer.selected = true;
            }

            function saveQuizz() {

                if ( $scope.isAnswered && ! $scope.current.answered ) {

                    $scope.current.answered = true;

                    for( idQuestion in selected ) {

                        ITConnect.question.quizz.answer(
                            idQuestion,
                            selected[idQuestion],
                            function( data ) { } );

                        for ( indexAnswer in selected[idQuestion] ) {

                            var answer = {};

                            // find the question
                            for ( indexQuestion in $scope.current.questions ) {

                                // if found
                                if ( $scope.current.questions[indexQuestion].id == idQuestion ) {

                                    // find the answer
                                    for ( indexAnswerQuestion in $scope.current.questions[indexQuestion].answers ) {

                                        // if found
                                        if ( $scope.current.questions[indexQuestion].answers[indexAnswerQuestion].id == selected[idQuestion][indexAnswer] ) {

                                            answer = $scope.current.questions[indexQuestion].answers[indexAnswerQuestion];

                                            break;
                                        }
                                    }

                                    break;
                                }
                            }

                            $scope.user.quizzAnswers.push( answer );
                        }
                    }

                    ITStorage.db.options.set( 'user', $scope.user );

                    ITStorage.db.quizzes.set( $scope.current.id, $scope.current );
                }
            }

            var selected = {};

            $scope.$watch('current', function (quizz) {

                // List of selected
                selected = {};

                // Is quizz answered
                $scope.isAnswered = true;

                // For each question
                for( indexQuestion in quizz.questions) {

                    // She is not answered
                    var isQuestionAnswered = false;

                    // Define an array of id
                    selected[quizz.questions[indexQuestion].id] = [];

                    // For each answer
                    for ( indexAnswer in quizz.questions[indexQuestion].answers ) {

                        // If selected
                        if(quizz.questions[indexQuestion].answers[indexAnswer].selected) {

                            // Question answered
                            isQuestionAnswered = true;

                            // Add to selected
                            selected[quizz.questions[indexQuestion].id].push(
                                quizz.questions[indexQuestion].answers[indexAnswer].id
                            );
                        }
                    }

                    // If one question not answered, not answered quizz
                    if ( !isQuestionAnswered ) {
                        $scope.isAnswered = false;
                    }
                }

            }, true);

            $scope.checkRight = checkRight;

            $scope.saveQuizz = saveQuizz;

            ITStorage.db.options.bind('quizz.current', loadQuizz);
        } ] );
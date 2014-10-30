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

                _(question.answers)
                    .forEach( function( questionAnswer ) {

                    questionAnswer.selected = false;
                } );
                
                answer.selected = true;
            }

            function saveQuizz() {

                if ( $scope.isAnswered && ! $scope.current.answered ) {

                    $scope.current.answered = true;

                    _.forEach(selected, function( listIdAnswer, idQuestion ) {

                        ITConnect.question.quizz.answer(
                            idQuestion,
                            listIdAnswer,
                            function( data ) { } );

                        _.forEach(listIdAnswer, function( idAnswer ) {

                            var answer = {};

                            // Find the answer by Id
                            _.chain( $scope.current.questions )
                                .flatten( 'answers' )
                                .where( { 'id' : idAnswer } )
                                .forEach( function( finalAnswer ) {

                                    answer = finalAnswer;
                                } );
                            
                            $scope.user.quizzAnswers.push( answer );
                        });
                    });

                    ITStorage.db.options.set( 'user', $scope.user );

                    ITStorage.db.quizzes.set( $scope.current.id, $scope.current );

                    $scope.messenger.post({
                        message: 'Merci d\'avoir répondu à ce questionnaire!',
                        type: 'info'
                    });

                } else {

                    $scope.messenger.post({
                        message: 'Vous devez répondre à toute les questions.',
                        type: 'error'
                    });
                }
            }

            var selected = {};

            $scope.$watch('current', function (quizz) {

                // List of selected
                selected = {};

                // Is quizz answered
                $scope.isAnswered = true;

                // Check all answers
                _.forEach( quizz.questions, function( question ) {

                    // She is not answered
                    var isQuestionAnswered = false;

                    // Define an array of id
                    selected[question.id] = [];

                    // Find all selected
                    _.chain( question.answers )
                        .where( { 'selected' : true } )
                        .forEach( function( answer ) {

                            // Question answered
                            isQuestionAnswered = true;

                            // Add to selected
                            selected[question.id].push( answer.id );
                        } );

                    // If one question not answered, not answered quizz
                    if ( !isQuestionAnswered && question.required ) {
                        $scope.isAnswered = false;
                    }
                } );

            }, true);

            $scope.checkRight = checkRight;

            $scope.saveQuizz = saveQuizz;

            ITStorage.db.options.bind('quizz.current', loadQuizz);
        } ] );
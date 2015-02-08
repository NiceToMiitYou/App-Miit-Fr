"use strict";

MiitApp.controller(
    'QuizzInnerController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = {};

            $scope.isAnswered = true;

            function loadQuizz( quizz ) {

                $timeout(function() {

                    $scope.current = quizz;
                });
            }

            function checkRight( question, answer ) {

                _.forEach(
                    question.answers,
                    function( questionAnswer ) {

                    questionAnswer.selected = false;
                } );
                
                answer.selected = true;
            }

            function openAnswerModal() {
                $('#answer-modal').openModal();
            }

            function saveQuizz() {

                if ( $scope.isAnswered && ! $scope.current.answered ) {

                    $scope.current.answered = true;

                    var i = 0;

                    _.forEach(selected, function( listIdAnswer, idQuestion ) {

                        setTimeout( function() {
                            ITConnect.question.quizz.answer(
                                idQuestion,
                                listIdAnswer,
                                function( data ) { } );
                        }, i * 125);

                        if( !$scope.user.quizzAnswers ) {
                            
                            $scope.user.quizzAnswers = [];
                        }

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

                        i++;
                    });

                    ITStorage.db.options.set( 'user', $scope.user );

                    ITStorage.db.quizzes.set( $scope.current.id, $scope.current );

                    $scope.isAnswered = true;

                    $scope.toast({
                        message: ItNotifications.quizzInner.save.success,
                        type: 'info'
                    });

                     $scope.track('QUIZZ');

                } else {

                    $scope.toast({
                        message: ItNotifications.quizzInner.save.error,
                        type: 'error'
                    });
                }

                $('#answer-modal').closeModal();
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
                    _.forEach(
                        _.filter(
                            question.answers,
                            {
                                'selected' : true
                            }
                        ), function( answer ) {

                            // Question answered
                            isQuestionAnswered = true;
                            
                            // Add to selected
                            selected[question.id].push( answer.id );
                        } );

                    // If one question not answered, not answered quizz
                    if ( !isQuestionAnswered && question.required ) {

                        $scope.isAnswered = false;
                    }

                    // Remove empty data
                    if( _.isEmpty(selected[question.id]) ) {

                        delete selected[question.id];
                    }
                } );

            }, true);

            $scope.checkRight = checkRight;

            $scope.openAnswerModal = openAnswerModal;

            $scope.shared.saveQuizz = function() {
                if( $scope.isAllowed('QUIZZ_INTERACTIONS') ) {

                    saveQuizz();
                }
            };

            ITStorage.db.options.bind('quizz.current', loadQuizz);
        } ] );
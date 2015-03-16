"use strict";

angular
    .module( 'MiitApp')
    .controller( 'QuizzInnerController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = {};

            $scope.isAnswered = false;

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

                $('#answer-modal').openModal({
                    dismissible: false
                });
            }

            function saveQuizz() {

                if ( $scope.isAnswered && ! $scope.current.answered ) {

                    if( !$scope.user.quizzAnswers ) {
                        
                        $scope.user.quizzAnswers = [];
                    }

                    $scope.current.answered = true;

                    MiitConnect.question.quizz.answer( $scope.current.id, selected, function( data ) {

                        $timeout( function() {

                            if( data.done ) {

                                $scope.toast({
                                    message: ItNotifications.quizzInner.save.success,
                                    type: 'info'
                                });

                                MiitStorage.db.quizzes.set( $scope.current.id, $scope.current );

                                $scope.track( 'QUIZZ' );
                            } else {

                                $scope.toast({
                                    message: ItNotifications.quizzInner.save.error,
                                    type: 'error'
                                });

                                $scope.current.answered = false;
                            }
                        } );
                    } );

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

                    if( question.type === 0 ) {
                        return;
                    }

                    // She is not answered
                    var isQuestionAnswered = false;

                    // Define an array of id
                    selected[question.id] = [];

                    // Is an open question
                    if( question.type === 3 ) {

                        if( question.extra && question.extra.text && question.answers.length === 1 ) {

                            // Question answered
                            isQuestionAnswered = true;
                            
                            // Add to selected
                            selected[question.id].push( {
                                id:    _.first( question.answers ).id,
                                extra: question.extra
                            } );
                        }

                    } else {

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
                                selected[question.id].push( {
                                    id: answer.id
                                } );
                            } );

                    }

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

            $scope.openAnswerModal = function() {
                if( $scope.isAllowed('QUIZZ_INTERACTIONS') ) {

                    saveQuizz();//openAnswerModal();
                }
            };

            $scope.shared.saveQuizz = function() {
                if( $scope.isAllowed('QUIZZ_INTERACTIONS') ) {

                    saveQuizz();
                }
            };

            MiitStorage.db.options.bind('quizz.current', loadQuizz);
        }
    ] );
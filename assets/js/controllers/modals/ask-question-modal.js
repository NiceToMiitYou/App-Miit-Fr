"use strict";

ITEventApp.controller(
    'AskQuestionModalController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.text = '';

            function post() {
                if ( $scope.text && $( '#multi' ).val() ) {

                    ITConnect.question.presentation.create( $scope.text, $( '#multi' ).val(), function(data) {
                        if( data.done ) {

                            $timeout(function() {

                                $scope.shared.wantToAskQuestion = false;

                                $scope.text = '';

                                $( '#multi' ).select2('val', '');

                                $scope.messenger.post({
                                    message: 'Votre question vient d\'être postée.',
                                    type: 'info'
                                });
                            });

                        } else {

                            $scope.messenger.post({
                                message: 'Une erreur s\'est produite lors de la création de la question.',
                                type: 'error'
                            });
                        }
                    });
                } else {

                    $scope.messenger.post({
                        message: 'Veuillez renseigner tout les champs afin de pouvoir poster une question.',
                        type: 'error'
                    });

                }
            }

            $scope.post = function() {
                if( $scope.isAllowed('WALL_INTERACTIONS') ) {

                    post();
                }
            };

        } ] );
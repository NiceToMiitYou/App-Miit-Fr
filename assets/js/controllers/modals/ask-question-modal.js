"use strict";

angular
    .module( 'MiitApp')
    .controller( 'AskQuestionModalController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.text = '';

            function post() {
                if ( $scope.text && $( '#wall-category-select' ).val() ) {

                    MiitConnect.question.presentation.create( $scope.text, $( '#wall-category-select' ).val(), function(data) {
                        if( data.done ) {

                            $timeout(function() {

                                $scope.shared.wantToAskQuestion = false;

                                $scope.text = '';

                                $( '#wall-category-select' ).select2('val', '');

                                $( '#ask' ).closeModal();

                                $scope.toast({
                                    message: ItNotifications.modal.question.post.success,
                                    type: 'info'
                                });
                            });

                        } else {

                            $scope.toast({
                                message: ItNotifications.modal.question.post.error,
                                type: 'error'
                            });
                        }
                    });
                } else {

                    $scope.toast({
                        message: ItNotifications.modal.question.post.required,
                        type: 'error'
                    });

                }
            }

            $scope.post = function() {
                if( $scope.isAllowed('WALL_INTERACTIONS') ) {

                    post();
                }
            };

        }
    ] );
"use strict";


angular
    .module( 'MiitApp')
    .controller( 'WallController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.filter = "";

            $scope.questions = {};

            function loadTags( isLoaded ) {
                
                if(isLoaded) {

                    $timeout(function() {

                        MiitStorage.db.tags.each(function( id, tag ) {
                            
                            $scope.shared.tags[id] = tag;
                        } );

                        setTimeout(function() {

                            $('#wall-select').material_select();
                        }, 250);
                    } );
                }
            }

            function likeQuestion( question ) {

                if ( ! isLike(question) ) {

                    MiitConnect.question.presentation.like(question.id, function(data) {

                        if( data.done || data.like ) {

                            MiitStorage.db.likes.set( question.id, data.like.id );
                        } else {

                            $scope.toast({
                                message: ItNotifications.wall.like.error,
                                type: 'error'
                            });
                        }
                    } );

                } else {

                    $scope.toast({
                        message: ItNotifications.wall.like.already,
                        type: 'error'
                    });
                }
            }

            function isLike( question ) {

                if ( ! MiitStorage.db.likes.get(question.id) ) {
                    return false;
                }

                return true;
            }

            function getTagName( tag ) {

                if ( ! MiitStorage.db.tags.get( tag ) ) {
                    return '';
                }

                return MiitStorage.db.tags.get( tag ).name;
            }

            function askQuestion() {

                $scope.shared.wantToAskQuestion = true;
            }

            $scope.like = function( question ) {
                if( $scope.isAllowed('WALL_INTERACTIONS') ) {

                    likeQuestion( question );
                }
            };

            $scope.isLike = isLike;

            $scope.getTagName = getTagName;
            
            $scope.askQuestion = function() {
                if( $scope.isAllowed('WALL_INTERACTIONS') ) {

                    askQuestion();
                }
            };

            MiitStorage.db.options.bind( 'data.isLoaded', true, loadTags );

            // Retrieve likes
            MiitConnect.bind('question-presentation-like', function( like ) {
                var time = 0;

                if( ! $scope.questions[like.question] ) {
                    time = 1000;
                }

                $timeout(function(){

                    if( ! isLike({ id: like.question }) &&
                          $scope.user.id === like.user ) {

                        MiitStorage.db.likes.set(like.question, like.id);
                    }

                    if( $scope.questions[like.question] ) {

                        $scope.questions[like.question].likes++;
                    }
                }, time);
            });

            // Retrieve new questions
            MiitConnect.bind('question-presentation-new', function( data ) {
                $timeout(function(){

                    var userId = data.question.user;
                    var questionId = data.question.id;

                    $scope.questions[questionId] = data.question;
                    $scope.questions[questionId].likes = 0;
                    $scope.questions[questionId].tags = data.tags;

                    $scope.askForUserIfNotExist(
                        $scope.questions[questionId],
                        'user', userId
                    );
                });
            });
        }
    ] );

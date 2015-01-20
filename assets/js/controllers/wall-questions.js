"use strict";

ITEventApp.controller(
    'WallController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.filter = "";

            $scope.questions = {};

            function loadTags( isLoaded ) {
                
                if(isLoaded) {

                    $timeout(function() {

                        ITStorage.db.tags.each(function( id, tag ) {
                            
                            $scope.shared.tags[id] = tag;
                        } );
                    } );
                }
            }

            function likeQuestion( question ) {

                if ( ! isLike(question) ) {

                    ITConnect.question.presentation.like(question.id, function(data) {

                        if( data.done || data.like ) {

                            ITStorage.db.likes.set( question.id, data.like.id );
                        } else {

                            $scope.messenger.post({
                                message: 'Une erreur s\'est produite lors du like de la question.',
                                type: 'error'
                            });
                        }
                    } );

                } else {

                    $scope.messenger.post({
                        message: 'Vous aimez déjà cette question.',
                        type: 'error'
                    });
                }
            }

            function isLike( question ) {

                if ( ! ITStorage.db.likes.get(question.id) ) {
                    return false;
                }

                return true;
            }

            function getTagName( tag ) {

                if ( ! ITStorage.db.tags.get( tag ) ) {
                    return '';
                }

                return ITStorage.db.tags.get( tag ).name;
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

            ITStorage.db.options.bind( 'data.isLoaded', true, loadTags );

            // Retrieve likes
            ITConnect.bind('question-presentation-like', function( like ) {
                var time = 0;

                if( ! $scope.questions[like.question] ) {
                    time = 250;
                }

                $timeout(function(){

                    if( $scope.questions[like.question] ) {

                        $scope.questions[like.question].likes++;
                    }
                }, time);
            });

            // Retrieve new questions
            ITConnect.bind('question-presentation-new', function( data ) {
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
    } ] );

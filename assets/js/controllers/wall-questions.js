ITEventApp.controller(
    'wallController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            // Conference model
            $scope.text = '';

            $scope.tags = {};

            $scope.questions = {};

            function loadTags( isLoaded ) {
                
                if(isLoaded) {

                    $timeout(function() {

                        ITStorage.db.tags.each(function( id, tag ) {
                            
                            $scope.tags[id] = tag;
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

            $scope.like = likeQuestion;

            $scope.isLike = isLike;

            $scope.getTagName = getTagName;

            $scope.post = function() {
                if ( $scope.text && $( '#multi' ).val() ) {

                    ITConnect.question.presentation.create( $scope.text, $( '#multi' ).val(), function(data) {
                        if( data.done ) {

                            $timeout(function() {

                                $scope.text = '';

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

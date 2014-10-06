ITEventApp.controller(
    'wallController', [ '$scope',
        function( $scope ) {

            // Conference model
            $scope.text = '';

            $scope.tags = {};

            $scope.questions = {};

            function loadTags( isLoaded ) {
                if(isLoaded) {

                    ITStorage.db.tags.each(function( id, tag ) {
                        $scope.tags[id] = tag;
                    });

                    $scope.$apply();
                }
            }

            function likeQuestion( question ) {

                if ( ! isLike(question) ) {

                    ITConnect.question.presentation.like(question.id, function(data){
                        if( data.done || data.like ) {
                            ITStorage.db.likes.set( question.id, data.like.id );
                        }
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

            $scope.post = function() {
                if ( $scope.text ) {

                    ITConnect.question.presentation.create( $scope.text, $( '#multi' ).val(), function(data) {
                        if( data.done ) {

                            $scope.text = '';
                            $scope.$apply();
                        }
                    });
                }
            }

            ITStorage.db.options.bind( 'data.isLoaded', true, loadTags );

            // Retrieve likes
            ITConnect.bind('question-presentation-like', function( like ) {
                $scope.questions[like.question].likes++;
                $scope.$apply();
            });

            // Retrieve new questions
            ITConnect.bind('question-presentation-new', function( question ) {

                var userId = question.user;

                $scope.questions[question.id] = question;
                $scope.questions[question.id].likes = 0;
                $scope.questions[question.id].user = ITStorage.db.users.get(userId);

                // If user not registered request him
                if( !$scope.questions[question.id].user ) {
                    ITConnect.user.get(userId, function( data ){
                        if( data.done ) {
                            ITStorage.db.users.set(data.user.id, data.user);

                            $scope.questions[question.id].user = data.user;

                            $scope.$apply();
                        }
                    });
                }

                $scope.$apply();
            });
    } ] );

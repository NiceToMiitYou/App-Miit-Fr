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
                        }
                    } );
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
            ITConnect.bind('question-presentation-new', function( data ) {
                
                $timeout(function(){
                    var userId = data.question.user;
                    var questionId = data.question.id;

                    $scope.questions[questionId] = data.question;
                    $scope.questions[questionId].likes = 0;
                    $scope.questions[questionId].tags = data.tags;
                    $scope.questions[questionId].user = ITStorage.db.users.get(userId);

                    // If user not registered request him
                    if( !$scope.questions[questionId].user ) {
                        
                        ITConnect.user.get(userId, function( data ){
                            
                            $timeout(function() {

                                if( data.done ) {

                                    ITStorage.db.users.set(data.user.id, data.user);

                                    $scope.questions[questionId].user = data.user;
                                }
                            });
                        });
                    }
                });
            });
    } ] );

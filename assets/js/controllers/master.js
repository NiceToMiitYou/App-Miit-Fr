ITEventApp.controller(
    'masterController', [ '$scope', '$timeout', '$sce',
        function( $scope, $timeout, $sce ) {

            if ( ! ITStorage.db.options.get('user.isConnected') ) {

                logout();
            }
            $scope.conference = ITStorage.db.options.get('conference');

            $scope.presentation = ITStorage.db.options.get('presentation.actual');

            $scope.user = ITStorage.db.options.get('user');
            
            $scope.messenger = Messenger( {
                maxMessages: 4,
                extraClasses: 'messenger-on-top messenger-fixed',
                theme: 'flat',
                messageDefaults: {
                    showCloseButton: true,
                    hideAfter: 2
                }
            } );

            window.currentSlide = $scope.presentation.current;

            function safeHTML( html ) {
                return $sce.trustAsHtml(html);
            }

            function refreshUser( user ) {
                $timeout( function() {
                    $scope.user = user;
                } );
            }

            function refreshPresentation( presentation ) {
                $timeout( function() {
                    $scope.presentation = presentation;
                } );
            }

            function getUsername() {
                
                var username = 'Anonyme';

                if($scope.user.username) {

                    username = $scope.user.username;

                } else if ($scope.user.lastname || $scope.user.firstname) {
                    
                    username = ($scope.user.firstname ? $scope.user.firstname + ' ' : '') +
                               ($scope.user.lastname ? $scope.user.lastname : '');
                }

                if(username.length > 16) {

                    username = username.substr(0, 14) + "\u2026";
                }

                return username;
            }

            function logout() {
                
                ITConnect.user.logout(function() {

                    $scope.messenger.post({
                        message: 'Vous venez d\'être déconnecté.',
                        type: 'info'
                    });

                    $timeout(function() {
                        window.location.reload();
                    }, 1000);
                });
            }

            function next() {
                jQuery( '.flexslider' ).flexslider( 'next' );
                ITConnect.live.next($scope.presentation.id, function(data) {});

            }

            function previous() {
                jQuery( '.flexslider' ).flexslider( 'previous' );
                ITConnect.live.previous($scope.presentation.id, function(data) {});
            }

            function getTagName( tag ) {

                if ( ! ITStorage.db.tags.get( tag ) ) {
                    return '';
                }

                return ITStorage.db.tags.get( tag ).name;
            }


            $scope.next = next;

            $scope.previous = previous;

            $scope.logout = logout;
            
            $scope.safeHTML = safeHTML;

            $scope.getUsername = getUsername;

            $scope.tags = {};

            $scope.questions = {};

            $scope.getTagName = getTagName;
            
            function loadTags( isLoaded ) {
                
                if(isLoaded) {

                    $timeout(function() {

                        ITStorage.db.tags.each(function( id, tag ) {
                            
                            $scope.tags[id] = tag;
                        } );
                    } );
                }
            }

            ITStorage.db.options.bind('user', refreshUser);
            ITStorage.db.options.bind( 'data.isLoaded', true, loadTags );
            ITStorage.db.options.bind('presentation.actual', true, refreshPresentation);


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
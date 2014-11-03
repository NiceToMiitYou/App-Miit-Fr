ITEventApp.controller(
    'commonController', [ '$scope', '$timeout', '$sce',
        function( $scope, $timeout, $sce ) {

            if ( ! ITStorage.db.options.get('user.isConnected') ) {

                logout();
            }

            $scope.shared = {};

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
                    if( presentation ) {
                        $scope.presentation = presentation;
                    }
                } );
            }

            function getUsername( user ) {

                if( !user ) {
                    var user = $scope.user;
                }

                var username = 'Anonyme';

                if(user.username) {

                    username = user.username;

                } else if (user.lastname || user.firstname) {
                    
                    username = (user.firstname ? user.firstname + ' ' : '') +
                               (user.lastname ? user.lastname : '');
                }

                if(username.length > 16) {

                    username = username.substr(0, 14) + "\u2026";
                }

                return username;
            }

            function logout() {
            	
                ITConnect.user.logout(function(data) {

                    if( data.done ) {
                    
                        $scope.messenger.post({
                            message: 'Vous venez d\'être déconnecté.',
                            type: 'info'
                        });

                        $timeout(function() {
                            window.location.reload();
                        }, 1750);
                    }
                });
            }

            function isAllowed( restrictionId ) {

                // if not restrict, it's allowed
                return ! _.contains( $scope.conference.restrictions, restrictionId );
            }

            function askForUserIfNotExist( object, userField, userId ) {

                object[userField] = ITStorage.db.users.get(userId);

                // If user not registered request him
                if( !object[userField] ) {
                    
                    ITConnect.user.get(userId, function( data ){
                        
                        $timeout(function() {

                            if( data.done ) {

                                ITStorage.db.users.set(data.user.id, data.user);

                                object[userField] = data.user;
                            }
                        });
                    });
                }
            }


            function fullscreen() {

                $scope.isfullscreen = !$scope.isfullscreen;
                $scope.openmenu = !$scope.openmenu;

                setTimeout(function() {
                  window.scaleSlider();
                }, 500);
            }

            function handlerMenu() {
                if($scope.isfullscreen) {
                    $scope.fullscreen();
                }

                $scope.openmenu = !$scope.openmenu;

            }


            $scope.logout = logout;

            $scope.handlerMenu = handlerMenu;

            $scope.openmenu = false;
            
            $scope.safeHTML = safeHTML;

            $scope.isAllowed = isAllowed;

            $scope.getUsername = getUsername;

            $scope.askForUserIfNotExist = askForUserIfNotExist;

            $scope.fullscreen = fullscreen;

            ITStorage.db.options.bind('user', refreshUser);

            ITStorage.db.options.bind('presentation.actual', true, refreshPresentation);
        } ] );
ITEventApp.controller(
    'viewerController', [ '$scope', '$timeout', '$sce',
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

            function safeHTML(html) {

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

            $scope.logout = logout;
            
            $scope.safeHTML = safeHTML;

            ITStorage.db.options.bind('user', refreshUser);

            ITStorage.db.options.bind('presentation.actual', true, refreshPresentation);
        } ] );
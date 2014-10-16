ITEventApp.controller(
    'viewerController', [ '$scope', '$timeout', '$sce',
        function( $scope, $timeout, $sce ) {

            if ( ! ITStorage.db.options.get('user.isConnected') ) {
                ITConnect.user.logout(function( data ) {
                    if( data.done )
                        window.location.reload();
                } );
            }
            $scope.conference = ITStorage.db.options.get('conference');

            $scope.user = ITStorage.db.options.get('user');

            $scope.presentation = ITStorage.db.options.get('presentation.actual');
            
            $scope.agreeAnonyme = false;

            $scope.useUsername = false;

            $scope.accountType = 0;

            $scope.firstInit = ! ( $scope.user.firstname || $scope.user.lastname || $scope.user.username);

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

            function saveUser() {

                if( $scope.user.firstname || $scope.user.lastname || $scope.user.username) {

                    ITConnect.user.update(
                        ( $scope.accountType === 0 ) ? $scope.user.firstname : '', 
                        ( $scope.accountType === 0 ) ? $scope.user.lastname : '', 
                        ( $scope.accountType === 0 ) ? $scope.user.society : '',
                        ( $scope.accountType === 1 || $scope.useUsername ) ? $scope.user.username : '',
                        ( $scope.accountType === 0 ) ? $scope.user.avatar : {} ,

                        function (data) {
                            if ( data.done ) {
                                ITStorage.db.options.set( 'user', data.user );

                                $scope.firstInit = false;
                            }
                        }
                    );
                }
            }

            function generateAnonym() {

                if( $scope.accountType !== 1 ) {

                    $scope.accountType = 1;
                    $scope.user.username = 'Anonym-' + Math.floor( Math.random() * 10000000 );
                }
            }

            function logout() {
            	ITConnect.user.logout();
            	window.location.reload();
            }

            $scope.logout = logout;
            $scope.generateAnonym = generateAnonym;

            $scope.saveUser = saveUser;

            ITStorage.db.options.bind('user', refreshUser);

            ITStorage.db.options.bind('presentation.actual', refreshPresentation);
        } ] );
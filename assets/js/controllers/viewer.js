ITEventApp.controller(
    'viewerController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            if ( ! ITStorage.db.options.get('user.isConnected') ) {
                ITConnect.user.logout(function( data ) {
                    if( data.done )
                        window.location.reload();
                } );
            }

            $scope.conference = ITStorage.db.options.get('conference');

            $scope.user = ITStorage.db.options.get('user');
            
            $scope.agreeAnonyme = false;

            $scope.useUsername = false;

            $scope.accountType = 0;

            $scope.firstInit = ! ( $scope.user.firstname || $scope.user.lastname || $scope.user.username);

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

                                $scope.user = ITStorage.db.options.get('user');

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

        } ] );
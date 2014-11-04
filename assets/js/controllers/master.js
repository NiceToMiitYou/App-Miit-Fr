ITEventApp.controller(
    'masterController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.connectedUsers = 1;
            $scope.usersConnectedUp = true;
            $scope.usersConnectedSame = false;
            $scope.usersConnectedDown = false;

            function refreshConnectedUsers() {

                ITConnect.config.connectedUsers(function( data ) {

                    if( data.done ) {

                        $timeout(function() {
                            $scope.usersConnectedUp = ( $scope.connectedUsers < data.users );;
                            $scope.usersConnectedSame = ( $scope.connectedUsers === data.users );
                            $scope.usersConnectedDown = ( $scope.connectedUsers > data.users );;
                            $scope.connectedUsers = data.users;
                        });
                    }

                    setTimeout(refreshConnectedUsers, 10000);
                });
            }

            setTimeout(refreshConnectedUsers, 1000);
        } ] );
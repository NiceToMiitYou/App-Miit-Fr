ITEventApp.controller(
    'masterController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.connectedUsers = 1;

            function refreshConnectedUsers() {

                ITConnect.config.connectedUsers(function( data ) {

                    if( data.done ) {

                        $timeout(function() {
                            $scope.connectedUsers = data.users;
                        });
                    }

                    setTimeout(refreshConnectedUsers, 5000);
                });
            }

            setTimeout(refreshConnectedUsers, 1000);
        } ] );
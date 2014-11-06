ITEventApp.controller(
    'masterController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            var minTime = 10000;
            var maxTime = 30000;
            var refreshTime = 10000;

            $scope.connectedUsers = 0;
            $scope.usersConnectedUp = true;
            $scope.usersConnectedSame = false;
            $scope.usersConnectedDown = false;

            function calculateTime() {
                refreshTime = Math.round( Math.max( minTime, Math.min( maxTime,
                    ( maxTime - minTime) * $scope.connectedUsers / 500 + minTime
                ) ) );
            }

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

                    setTimeout(refreshConnectedUsers, refreshTime);

                    calculateTime();
                });
            }

            setTimeout(refreshConnectedUsers, 1000);
        } ] );
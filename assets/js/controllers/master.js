"use strict";

angular
    .module( 'MiitApp')
    .controller( 'MasterController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            var minTime     = 10000,
                maxTime     = 30000,
                refreshTime = 10000;

            $scope.connectedUsers     = 0;
            $scope.usersConnectedUp   = true;
            $scope.usersConnectedSame = false;
            $scope.usersConnectedDown = false;

            function calculateTime() {
                refreshTime = Math.round( Math.max( minTime, Math.min( maxTime,
                    ( maxTime - minTime) * $scope.connectedUsers / 500 + minTime
                ) ) );
            }

            function thmbScrollRight() {
                var slideNav = document.getElementById("slides-nav-wrapper");
                slideNav.scrollLeft = slideNav.scrollLeft + 175;
            }

            function thmbScrollLeft() {
                var slideNav = document.getElementById("slides-nav-wrapper");
                slideNav.scrollLeft = slideNav.scrollLeft - 175;
            }

            function refreshConnectedUsers() {

                MiitConnect.config.connectedUsers(function( data ) {

                    if( data.done ) {

                        $timeout(function() {
                            $scope.usersConnectedUp = ( $scope.connectedUsers < data.users );
                            $scope.usersConnectedSame = ( $scope.connectedUsers === data.users );
                            $scope.usersConnectedDown = ( $scope.connectedUsers > data.users );
                            $scope.connectedUsers = data.users;
                        });
                    }

                    setTimeout(refreshConnectedUsers, refreshTime);

                    calculateTime();
                });
            }

            $scope.thmbScrollRight = thmbScrollRight;
            $scope.thmbScrollLeft = thmbScrollLeft;
            setTimeout(refreshConnectedUsers, 1000);
        }
    ] );
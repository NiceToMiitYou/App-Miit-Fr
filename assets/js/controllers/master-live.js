ITEventApp.controller(
    'masterLiveController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            function next() {

                ITConnect.live.next($scope.presentation.id, function(data) {});
            }

            function previous() {
                
                ITConnect.live.previous($scope.presentation.id, function(data) {});
            }

            $scope.next = next;

            $scope.previous = previous;
        } ] );
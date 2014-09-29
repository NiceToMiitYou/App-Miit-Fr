( function() {

    ITEventApp.controller(
        'loginController',
        function( $scope ) {
            $scope.user = {
                mail: '',
                password: ''
            };

            $scope.s = 1;

            $scope.next = function() {
                if($scope.s < 3) {
                    if($scope.user.mail && !$scope.user.password) {$scope.s = 2;}
                    if($scope.user.mail && $scope.user.password) {$scope.s = 3;}
                    
                }
            }

            $scope.previous = function() {
                if($scope.s > 1) {
                    $scope.s--;
                }
            }

        } );

} )();

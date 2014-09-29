( function() {

    ITEventApp.controller(
        'loginController',
        function( $scope ) {
            $scope.user = {
                mail: '',
                password: '',
                newuser: true
            };

            $scope.s = 1;

            $scope.next = function() {
                if($scope.s < 3) {
                    if($scope.user.mail && !$scope.user.password && $scope.s==1) {
                        ITConnect.user.login($scope.user.mail, '', function(data) {
                            $scope.user.newuser = !data.exist;
                            $scope.s = 2;
                            $scope.$apply();
                        });
                    }
                    if($scope.user.mail && $scope.user.password) {
                        $scope.s = 3;
                    }
                    
                }
            }

            $scope.previous = function() {
                if($scope.s > 1) {
                    $scope.s--;
                }
            }

        } );

} )();

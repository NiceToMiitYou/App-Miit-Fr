ITEventApp.controller(
    'loginController',
    function( $scope ) {

        // User model
        $scope.user = {
            mail: '',
            password: '',
            password_c: '',
            cgu: false,
            newuser: true
        };

        // Default step
        $scope.s = 1;

        $scope.next = function() {
            // First Step, check email
            if (
                $scope.user.mail &&
                $scope.s == 1
            ) {

                ITConnect.user.login( $scope.user.mail, '',

                    function( data ) {

                        $scope.user.newuser = !data.exist;
                        $scope.s = 2;
                        $scope.$apply();
                    } );

                // Second Step, Check password, if user exist or user confirm his password
            } else if (
                $scope.user.password &&
                $scope.s == 2 &&
                (
                    $scope.user.newuser === false ||
                    $scope.user.password === $scope.user.password_c
                )
            ) {

                // If the user doesn't exist
                if ( $scope.user.newuser ) {

                    ITConnect.user.register( $scope.user.mail, $scope.user.password,
                        function( data ) {
                            console.log( data );
                            if ( data.done ) {
                                $scope.s = 3;
                                $scope.$apply();
                            }
                        } );

                    // If the user exist and terms not accepted
                } else if ( !$scope.user.cgu ) {

                    $scope.s = 3;

                    // If the user exist and terms accepted
                } else {

                    ITConnect.user.login( $scope.user.mail, $scope.user.password,
                        function( data ) {
                            console.log( data );

                            if ( data.connected ) {
                                window.reload();
                            } else {

                            }
                        } );
                }

                // Check if user accept terms
            } else if (
                $scope.user.mail &&
                $scope.user.password &&
                $scope.s == 3 &&
                $scope.user.cgu
            ) {

                ITConnect.user.login( $scope.user.mail, $scope.user.password,
                    function( data ) {
                        console.log( data );

                        if ( data.connected ) {
                            window.reload();

                        } else {

                            $scope.s = 2;
                            $scope.apply();
                        }
                    } );
            }

        }

        $scope.previous = function() {
            if ( $scope.s > 1 ) {
                $scope.s--;
            }
        }

    } );

// Handle TAB from form
document.getElementById( 'login_email' )
    .onkeydown = function( e ) {
        if ( e.keyCode == 9 ) {
            return false;
        }
}

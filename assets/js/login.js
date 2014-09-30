( function() {

    ITEventApp.controller(
        'loginController',
        function( $scope ) {
            $scope.user = {
                mail: '',
                password: '',
                password_c: '',
                cgu: false,
                newuser: true
            };

            $scope.s = 1;

            $scope.next = function() {
                if ( $scope.user.mail && $scope.s == 1 ) {
                    ITConnect.user.login( $scope.user.mail, '', function( data ) {
                        $scope.user.newuser = !data.exist;
                        $scope.s = 2;
                        $scope.$apply();
                    } );
                }
                if ( $scope.user.password && $scope.s == 2 && ( !$scope.user.newuser || ( $scope.user.password == $scope.user.password_c ) ) ) {
                    if ( $scope.user.newuser ) {
                        ITConnect.user.register( $scope.user.mail, $scope.user.password, function( data ) {
                            console.log( data );
                            if ( data.done ) {
                                $scope.s = 3;
                                $scope.$apply();
                            }
                        } );
                    } else if ( !$scope.user.newuser ) {
                        $scope.s = 3;
                    }
                }
                if ( $scope.user.mail && $scope.user.password && $scope.s == 3 && $scope.user.cgu ) {
                    ITConnect.user.login( $scope.user.mail, $scope.user.password, function( data ) {
                        console.log( data );
                        if ( data.done ) {}
                    } );
                }

            }

            $scope.previous = function() {
                if ( $scope.s > 1 ) {
                    $scope.s--;
                }
            }

        } );

    document.getElementById( 'login_email' )
        .onkeydown = function( e ) {
            if ( e.keyCode == 9 ) {
                return false;
            }
    }

} )();

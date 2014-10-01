ITEventApp.controller(
    'loginController', [ '$scope',
        function( $scope ) {

            function getConference( isInit ) {
                if ( isInit ) {
                    $scope.conference.logo = ITStorage.db.options.get( 'conference.logo' );
                    $scope.conference.name = ITStorage.db.options.get( 'conference.name' );
                    $scope.conference.description = ITStorage.db.options.get( 'conference.description' );
                    $scope.$apply();
                }
            }

            function login() {
                ITConnect.user.login( $scope.user.mail, $scope.user.password,
                    function( data ) {

                        // Step one just for check
                        if ( $scope.s == 1 ) {

                            $scope.user.newuser = !data.exist;
                            $scope.s = 2;

                            // Step two
                        } else if ( $scope.s == 2 ) {

                            // Check connected
                            if ( data.connected ) {
                                // Go to step 3
                                $scope.s = 3;

                            } else {
                                // Wrong password then
                                $scope.wrpass = true;
                            }
                        }

                        $scope.$apply();
                    } );
            }

            function register() {
                ITConnect.user.register( $scope.user.mail, $scope.user.password,
                    function( data ) {

                        if ( data.done ) {
                            login();
                        }
                    } );
            }

            // Conference model
            $scope.conference = {
                logo: '',
                name: '',
                description: ''
            };

            // User model
            $scope.user = {
                mail: '',
                password: '',
                password_c: '',
                cgu: false,
                newuser: true
            };

            ITStorage.db.options.bind( 'conference.initialized', true, getConference );

            // Default step
            $scope.s = 1;
            $scope.wrpass = false;

            // Handle next
            $scope.next = function() {

                if (
                    $scope.s == 1 &&
                    $scope.user.mail
                ) {
                    // First Step, check email

                    login();

                } else if (
                    $scope.s == 2 &&
                    $scope.user.mail &&
                    $scope.user.password &&
                    (
                        $scope.user.newuser === false ||
                        $scope.user.password === $scope.user.password_c
                    )
                ) {
                    // Second Step, Check password, if user exist or user confirm his password

                    if ( $scope.user.newuser ) {
                        // If the user doesn't exist

                        register();

                    } else {
                        // If the user exist 

                        login();
                    }

                } else if (
                    $scope.s == 3 &&
                    $scope.user.mail &&
                    $scope.user.password &&
                    $scope.user.cgu
                ) {
                    // Check if user accept terms

                    window.location.reload();
                }

            }

            // Handle previous
            $scope.previous = function() {

                if ( $scope.s > 1 ) {
                    // Go back in step

                    $scope.s--;
                }
            }


            // Handle TAB from form
            if ( document.getElementById( 'login_email' ) ) {
                document.getElementById( 'login_email' )
                    .onkeydown = function( e ) {
                        if ( e.keyCode == 9 ) {
                            return false;
                        }
                }
            }

            // Log it out
            window.onbeforeunload = function( e ) {
                if ( !$scope.user.cgu ) {
                    ITConnect.user.logout();
                }
            };
    } ] );

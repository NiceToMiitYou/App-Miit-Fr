ITEventApp.controller(
    'loginController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            function getConference( isInit ) {
                if ( isInit ) {

                    $timeout(function() {

                        $scope.conference = ITStorage.db.options.get( 'conference' );
                    });
                }
            }

            function login() {
                ITConnect.user.login( $scope.user.mail, $scope.user.password,
                    function( data ) {

                        if(data.done) {
                        
                            $timeout(function() {
                                
                                // Step one just for check
                                if ( $scope.s == 1 ) {

                                    $scope.user.newuser = !data.exist;
                                    $scope.s = 2;

                                    // Step two
                                } else if ( $scope.s == 2 ) {

                                    // Check connected
                                    if ( data.connected ) {
                                        // Go to step 3
                                        $scope.user.connected = true;
                                        $scope.s = 3;

                                        ITStorage.db.options.set( 'user.isConnected', true );
                                        ITStorage.db.options.set( 'user', data.user );

                                    } else {
                                        // Wrong password then
                                        $scope.wrpass = true;
                                    }
                                }
                            } );    
                        }
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
                newuser: true,
                connected: false
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

            if ( document.getElementById( 'login_email' ) ) {
                // Handle TAB from form
                document.getElementById( 'login_email' )
                    .onkeydown = function( e ) {
                        if ( e.keyCode == 9 ) {
                            return false;
                        }
                }

                // Handle TAB from form
                document.getElementById( 'login_email' )
                    .onkeydown = function( e ) {
                        if ( e.keyCode == 9 ) {
                            return false;
                        }
                }
            }

            // Log it out
            window.onbeforeunload = function( e ) {
                if ( $scope.user.connected && !$scope.user.cgu ) {
                    // Disconnect the user from data initialization
                    ITStorage.db.options.set( 'user.isConnected', false );
                    ITStorage.db.options.set( 'user', null );

                    ITConnect.user.logout();
                }
            };
    } ] );

"use strict";


angular
    .module( 'MiitApp')
    .controller( 'ConnectionBarController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {
        
            $scope.isDisplay = false;
            $scope.isAlert   = true;

            function hide( cb ) {

                $timeout( function() {
                    $scope.isAlert = false;

                    $timeout( function() {
                        $scope.isDisplay = false;

                        if( typeof cb === 'function' ) {

                            cb();
                        }
                    }, 3500 );
                } );
            }

            function show( withReconnect ) {

                $timeout( function() {

                    $scope.isAlert   = true;

                    $scope.isDisplay = true;
                } );
            }

            // Fired upon a successful connection.
            function onConnect() {
                
            }

            // Fired upon a connection error.
            function onConnectError( error ) {

                show();
            }

            // Fired upon a connection timeout.
            function onConnectTimeout() {

                show();
            }

            // Fired upon a successful reconnection.
            function onReconnect( attempt ) {

                hide( function() {

                    // Check if already connected
                    ITConnect.user.me( function( data ) {

                        if( !data || !data.done ) {
                            // reload the window if session disconnected
                            return window.location.reload();
                        }

                        // Resynchronize the user
                        ITConnect.synchronize();
                    } );
                } );
            }
            
            // Fired upon an attempt to reconnect.
            function onReconnectAttempt() {

                show();
            }

            // Fired upon an attempt to reconnect.
            function onReconnecting( attempt ) {

                show();
            }

            // Fired upon a reconnection attempt error.
            function onReconnectError( error ) {

                show();
            }

            // Fired when couldn’t reconnect within reconnectionAttempts
            function onReconnectFailed( attempt ) {

                show();
            }

            // Bind all events
            ITConnect.listen( 'connect',           onConnect );
            ITConnect.listen( 'connect_error',     onConnectError );
            ITConnect.listen( 'connect_timeout',   onConnect );
            ITConnect.listen( 'reconnect',         onReconnect );
            ITConnect.listen( 'reconnect_attempt', onReconnectAttempt );
            ITConnect.listen( 'reconnecting',      onReconnecting); 
            ITConnect.listen( 'reconnect_error',   onReconnectError); 
            ITConnect.listen( 'reconnect_failed',  onReconnectFailed); 
        }
    ] );
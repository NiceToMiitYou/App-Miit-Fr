"use strict";

ITEventApp.controller(
    'LivePrivateController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {
        
            function onKeyPress(e) {

                var keyCode = e.keyCode;

                if( keyCode == 27 ) { 

                    $timeout(function() {

                        $scope.logout();
                    });
                }
            }

            document.addEventListener('keydown', onKeyPress, false);

        } ] );
"use strict";

ITEventApp.controller(
    'MasterLiveController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            function next() {

                if ( ! $scope.shared.isLastSlide ) {
                    
                    ITConnect.live.next($scope.presentation.id, function(data) {});
                }
            }

            function previous() {
                
                if ( ! $scope.shared.isFirstSlide ) {

                    ITConnect.live.previous($scope.presentation.id, function(data) {});
                }
            }

            $scope.next = next;

            $scope.previous = previous;
            
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
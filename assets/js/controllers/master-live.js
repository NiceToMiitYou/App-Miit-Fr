ITEventApp.controller(
    'masterLiveController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            function next() {
                
                ITConnect.live.next($scope.presentation.id, function(data) {

                    if( data.done ) {
                        jQuery( '.flexslider' ).flexslider( 'next' );
                    }
                });
            }

            function previous() {
                
                ITConnect.live.previous($scope.presentation.id, function(data) {

                    if( data.done ) {
                        jQuery( '.flexslider' ).flexslider( 'previous' );
                    }
                });
            }

            $scope.next = next;

            $scope.previous = previous;
        } ] );
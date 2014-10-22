ITEventApp.controller(
    'liveController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = 0;

            function next() {

                if( $scope.current < $scope.presentation.current) {
                    
                    $scope.current++;

                    jQuery( '.flexslider' )
                        .flexslider( 'next' );
                }
            }

            function previous() {

                if( 0 < $scope.current) {
                    
                    $scope.current--;

                    jQuery( '.flexslider' )
                        .flexslider( 'prev' );
                }
            }

            function liveNext( data ) {

                $timeout(function() {

                    if( data.presentation === $scope.presentation.id &&
                        $scope.presentation.current < $scope.presentation.slides.length - 1 ) {

                        $scope.presentation.current++;

                        if( $scope.current + 1 === $scope.presentation.current ) {

                            next();
                        }
                    }
                });
            }

            function livePrevious( data ) {

                $timeout(function() {

                    if( data.presentation === $scope.presentation.id &&
                        0 < $scope.presentation.current) {

                        $scope.presentation.current--;

                        if( $scope.current - 1 === $scope.presentation.current ) {

                            previous();
                        }
                    }
                });
            }

            $scope.next = next;

            $scope.previous = previous;

            ITConnect.bind('live-presentation-next', liveNext);

            ITConnect.bind('live-presentation-previous', livePrevious);

        } ] );
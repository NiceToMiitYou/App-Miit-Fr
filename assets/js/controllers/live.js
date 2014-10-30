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

                        reloadThumbnail();

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

                        reloadThumbnail();

                        if( $scope.current - 1 === $scope.presentation.current ) {

                            previous();
                        }
                    }
                });
            }

            var idReloadThumbnail;

            function reloadThumbnail() {

                clearTimeout(idReloadThumbnail);
                
                idReloadThumbnail = setTimeout(function() {

                    slideToThumbnail()

                }, 600);
            }

            window.onload = reloadThumbnail;

            function slideToThumbnail() {
                
                html2canvas(
                    jQuery(".slide-content").get( $scope.presentation.current ), {
                    onrendered: function(canvas) {
                        $timeout(function(){
                            $scope.presentation.thumbnail = canvas.toDataURL();
                        });
                    }
                });
            }

            $scope.next = function() {
                if( $scope.isAllowed('LIVE_SLIDER_INTERACTIONS') ) {

                    next();
                }
            };

            $scope.previous = function() {
                if( $scope.isAllowed('LIVE_SLIDER_INTERACTIONS') ) {
                    
                    previous();
                }
            };

            ITConnect.bind('live-presentation-next', liveNext);

            ITConnect.bind('live-presentation-previous', livePrevious);

        } ] );
ITEventApp.controller(
    'liveController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = 0;
            $scope.direction = 'left';

            $scope.presentation.current = 0;

            refreshShared();

            function next() {

                if( $scope.current < $scope.presentation.current) {
                    
                    $scope.direction = 'left';
                    $scope.current++;
                }
            }

            function previous() {

                if( 0 < $scope.current) {
                    
                    $scope.direction = 'right';
                    $scope.current--;
                }
            }

            function isCurrentSlide( index ) {
                return ( index === $scope.current );
            }

            function refreshShared() {

                $scope.shared.isLastSlide = 
                    ( $scope.presentation.current === $scope.presentation.slides.length - 1 );

                $scope.shared.isFirstSlide = 
                    ( $scope.presentation.current === 0 );
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

                    refreshShared();
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

                    refreshShared();
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
                    jQuery(".slide").get( $scope.presentation.current ), {
                    onrendered: function(canvas) {
                        $timeout(function(){
                            $scope.presentation.thumbnail = canvas.toDataURL();
                        });
                    }
                });
            }

            $scope.isCurrentSlide = isCurrentSlide;

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

            var pressed = false;

            function onKeyPress(e) {

                var keyCode = e.keyCode;

                if( !pressed && 
                    ( keyCode == 37 || keyCode == 39 )
                ) { 

                    pressed = true;

                    $timeout(function() {
                        if( keyCode == 37 ) $scope.previous();
                        else if( keyCode == 39 ) $scope.next();

                        setTimeout(function() { // Only one key by 500ms to avoid animation problem
                            pressed = false;
                        }, 500);
                    });
                }
            };

            document.addEventListener('keydown', onKeyPress, false);

            ITConnect.bind('live-presentation-next', liveNext);

            ITConnect.bind('live-presentation-previous', livePrevious);

        } ] );
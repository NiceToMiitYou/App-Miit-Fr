"use strict";

ITEventApp.controller(
    'liveController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = 0;
            $scope.direction = 'left';

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

            function gotToSlide( slideIndex ) {

                if( 0 <= slideIndex && slideIndex <= $scope.presentation.current ) {

                    $timeout( function() {
                        var loopBreak = 2000; // In case of infinite loop, just in case (master binding could block the loop)
                        var direction = ( slideIndex > $scope.current ) ? 1 : -1;

                        for(var i = slideIndex; slideIndex != $scope.current && loopBreak > 0; i += direction) {

                            if( direction > 0 ) {
                                next();
                            } else {
                                previous();
                            }
                            loopBreak--;
                        }
                    } );
                }
            }

            function isCurrentSlide( index ) {
                return ( index === $scope.current );
            }

            function refreshShared() {

                $scope.shared.isLastSlide = 
                    ( $scope.presentation && $scope.presentation.current === $scope.presentation.slides.length - 1 );

                $scope.shared.isFirstSlide = 
                    ( $scope.presentation && $scope.presentation.current === 0 );

                $scope.shared.liveProgress = 
                    ( !$scope.presentation ) ? 0 :
                    Math.round(
                        ( $scope.presentation.current * 100 ) / Math.max( 1, $scope.presentation.slides.length - 1 )
                    );
            }

            function liveNext( data ) {

                $timeout(function() {

                    if( data.presentation == $scope.presentation.id &&
                        $scope.presentation.current < $scope.presentation.slides.length - 1 ) {

                        $scope.presentation.current++;

                        if( $scope.current + 1 === $scope.presentation.current ) {

                            next();
                        }
                    }

                    refreshShared();
                });
            }
            function livePrevious( data ) {

                $timeout(function() {

                    if( data.presentation == $scope.presentation.id &&
                        0 < $scope.presentation.current) {

                        $scope.presentation.current--;

                        if( $scope.current - 1 === $scope.presentation.current ) {

                            previous();
                        }
                    }

                    refreshShared();
                });
            }

            $scope.isCurrentSlide = isCurrentSlide;

            $scope.next = function() {
                if( $scope.presentation && 
                    $scope.isAllowed('LIVE_SLIDER_INTERACTIONS') ) {

                    next();
                }
            };

            $scope.previous = function() {
                if( $scope.presentation && 
                    $scope.isAllowed('LIVE_SLIDER_INTERACTIONS') ) {
                    
                    previous();
                }
            };

            $scope.gotToSlide = function( slideIndex ) {
                if( $scope.presentation && 
                    $scope.isAllowed('LIVE_SLIDER_INTERACTIONS') ) {
                    
                    gotToSlide( slideIndex );
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
            }

            document.addEventListener('keydown', onKeyPress, false);

            ITConnect.bind('live-presentation-next', liveNext);

            ITConnect.bind('live-presentation-previous', livePrevious);

        } ] );
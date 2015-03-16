"use strict";


angular
    .module( 'MiitApp')
    .controller( 'LiveController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current   = 0;
            $scope.direction = 'left';

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

            function goToSlide( slideIndex ) {

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

            function refreshShared( isLoad ) {

                if( isLoad ) {
                 
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
            }

            var actions = [];

            function liveMoveTo() {
                
                $timeout(function() {

                    var copy = false;

                    while( copy = actions.shift() ) {

                        if( 
                            copy > 0 &&
                            $scope.presentation.current + 1 < $scope.presentation.slides.length
                        ) {

                            $scope.presentation.current++;

                            if( $scope.current + 1 === $scope.presentation.current ) {

                                next();
                            }
                        } else if (
                            copy < 0 &&
                            0 <= $scope.presentation.current - 1
                        ) {

                            $scope.presentation.current--;

                            if( $scope.current - 1 === $scope.presentation.current ) {

                                previous();
                            }
                        }
                    }

                    refreshShared( true );
                });
            }
            
            var debouncedLiveMoveTo = _.debounce(liveMoveTo, 175);

            // Filter event to add in the list
            function handleLiveEvent( direction, data ) {

                if( data.presentation == $scope.presentation.id ) {

                    actions.push( direction );

                    debouncedLiveMoveTo();
                }
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

            $scope.goToSlide = function( slideIndex, byPassMax, delay ) {


                if( delay ) {

                    $timeout( function() {
                        
                        if( byPassMax && 
                            $scope.presentation.slides ) {

                            $scope.presentation.current = $scope.presentation.slides.length - 1;
                        }

                        goToSlide( slideIndex );
                    }, delay );

                } else if( $scope.presentation && 
                           $scope.isAllowed('LIVE_SLIDER_INTERACTIONS') ) {
                    
                    if( byPassMax && 
                        $scope.presentation.slides ) {

                        $scope.presentation.current = $scope.presentation.slides.length - 1;
                    }

                    goToSlide( slideIndex );
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

            MiitStorage.db.options.bind('data.isLoaded', true, refreshShared);

            if( $scope.accountType !== 3 && !$scope.noSocket  ) {

                MiitConnect.bind('live-presentation-next', function( data ) {
                    handleLiveEvent( 1, data );
                });

                MiitConnect.bind('live-presentation-previous', function( data ) {
                    handleLiveEvent( -1, data );
                });
            }
        }
    ] );
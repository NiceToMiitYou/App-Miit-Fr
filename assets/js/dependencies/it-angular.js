"use strict";

window.MiitApp = angular.module( 'MiitApp', ['ngTouch', 'ngAnimate'] );

/*
 * Use it as "| toArray " in ng-repeat
 */

MiitApp.filter('toArray', function() {
    return function(input) {
        
        var out = []; 

        for(var i in input){
        
            out.push(input[i]);
        
        }        
        return out;
    };
} );

/*
 * Use it as it-blur="(condition === true) to blur a field, like ng-show=""
 */

MiitApp.directive('itBlur', [ '$timeout', function($timeout) {
    return {
        link: function(scope, element, attrs) {

            scope.$watch(attrs.itBlur, function(value) {
                if(value === true) { 
                    
                    $timeout(function() {
                        element[0].blur();

                        scope[attrs.itBlur] = false;
                    });
                }
            });
        }
    };
} ] );

/*
 * Use it as it-focus="(condition === true) to focus a field, like ng-show=""
 */

MiitApp.directive('itFocus', [ '$timeout', function($timeout) {
    return {
        link: function(scope, element, attrs) {

            scope.$watch(attrs.itFocus, function(value) {
                if(value === true) { 
                    
                    $timeout(function() {
                        element[0].focus();

                        scope[attrs.itFocus] = false;
                    });
                }
            });
        }
    };
} ] );


/*
 * Use it to display animation on slides
 */

MiitApp.animation('.slide-animation', function () {
    return {
        addClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {

                var finishPoint = element.parent().width();
                
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }

                element
                    .css( { 
                        left: 0
                    } )
                    .animate( {
                        left: finishPoint
                    }, 500, done );
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();

                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                element
                    .css( { 
                        left: startPoint
                    } )
                    .animate( {
                        left: 0
                    }, 500, done );

            } else {
                done();
            }
        }
    };
});

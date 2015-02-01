"use strict";

window.ITEventApp = angular.module( 'ITEventApp', ['ngTouch', 'ngAnimate'] );

/*
 * Use it as "| toArray " in ng-repeat
 */

ITEventApp.filter('toArray', function() {
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

ITEventApp.directive('itBlur', [ '$timeout', function($timeout) {
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

ITEventApp.directive('itFocus', [ '$timeout', function($timeout) {
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


ITEventApp.animation('.slide-animation', function () {
    return {
        addClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {

                var finishPoint = element.parent().width();
                
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }

                TweenMax.to(element, 0.5, { left: finishPoint, onComplete: done });
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

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });

            } else {
                done();
            }
        }
    };
});

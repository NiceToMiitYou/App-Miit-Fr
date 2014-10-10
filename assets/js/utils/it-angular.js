window.ITEventApp = angular.module( 'ITEventApp', ['ngAnimate'] );

/*
 * Use it as "| toArray " in ng-repeat
 */

ITEventApp.filter('toArray', function() {
    return function(input) {
        
        var out = []; 

        for(i in input){
        
            out.push(input[i]);
        
        }        
        return out;
    }
});

/*
 * Use it as it-blur="(condition === true) to blur a field, like ng-show=""
 */

ITEventApp.directive('itBlur', function($timeout) {
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
});

/*
 * Use it as it-focus="(condition === true) to focus a field, like ng-show=""
 */

ITEventApp.directive('itFocus', function($timeout) {
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
});


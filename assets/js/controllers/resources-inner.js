"use strict";

ITEventApp.controller(
    'resourcesInnerController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = {};

            function loadCategory( category ) {

                $timeout(function() {

                    $scope.current = category;
                });
            }

            ITStorage.db.options.bind('category.current', loadCategory);
        } ] );
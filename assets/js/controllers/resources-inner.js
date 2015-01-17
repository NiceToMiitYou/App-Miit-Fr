"use strict";

ITEventApp.controller(
    'ResourcesInnerController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = {};

            function loadCategory( category ) {

                $timeout(function() {

                    $scope.current = category;
                });
            }

            function openResource( resource ) {

                var win = window.open(resource.path, '_blank');
                win.focus();
            }

            $scope.openResource = openResource;

            ITStorage.db.options.bind('category.current', loadCategory);
        } ] );
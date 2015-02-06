"use strict";

MiitApp.controller(
    'ResourcesController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.categories = {};

            function loadCategories( isLoaded ) {

                if( isLoaded ) {

                    $timeout(function() {
                        
                        ITStorage.db.resources.each(function( id, category ) {

                            $scope.categories[category.id] = category;
                        } );
                    } ); 
                }
            }

            ITStorage.db.options.bind( 'data.isLoaded', true, loadCategories );

        } ] );
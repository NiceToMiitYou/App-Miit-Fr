"use strict";

ITEventApp.controller(
    'resourcesController', [ '$scope', '$timeout',
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

            function openInner( category ) {

                ITStorage.db.options.set('category.current', category);

                $scope.track('RESSOURCE-INNER');
            }

            $scope.openInner = function( category ) {

                openInner( category );
            };

            ITStorage.db.options.bind( 'data.isLoaded', true, loadCategories );

        } ] );
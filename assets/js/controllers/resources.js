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

            function openInner( ressource ) {
                
                ITStorage.db.options.set('ressources.current', ressource);

                $scope.track('RESSOURCES-INNER');
            }

            $scope.openInner = function( quizz ) {
                    openInner( quizz );
            };

            ITStorage.db.options.bind( 'data.isLoaded', true, loadCategories );

        } ] );
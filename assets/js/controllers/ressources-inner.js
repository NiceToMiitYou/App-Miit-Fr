"use strict";


angular
    .module( 'MiitApp')
    .controller( 'RessourcesInnerController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.current = {};

            function loadRessource( ressource ) {

                $timeout(function() {

                    $scope.current = ressource;
                });
            }

            ITStorage.db.options.bind('ressources.current', loadRessource);
        }
    ] );
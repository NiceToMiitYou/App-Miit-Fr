"use strict";


angular
    .module( 'MiitApp')
    .controller( 'RessourcesInnerController', [
        '$scope', '$timeout', '$sce',
        function( $scope, $timeout, $sce ) {

            $scope.current = {};
            $scope.currentPath = '';

            function loadRessource( ressource ) {

                $timeout(function() {

                    $scope.current = ressource;
                    $scope.currentPath = $sce.trustAsResourceUrl(ressource.path);
                });
            }

            MiitStorage.db.options.bind('ressources.current', loadRessource);
        }
    ] );
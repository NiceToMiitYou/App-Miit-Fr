ITEventApp.controller(
    'viewerController', [ '$scope',
        function( $scope ) {

            $scope.user = ITStorage.db.options.get('user');

            $scope.conference = ITStorage.db.options.get('conference');

        } ] );
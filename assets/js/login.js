( function() {

    ITEventApp.controller(
        'loginController',
        function( $scope ) {
            $scope.user = {
                mail: '',
                password: ''
            };

            $scope.execute = function() {
                console.log( 'CLICK' );
            }

        } );

} )();

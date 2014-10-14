ITEventApp.controller(
    'viewerController', [ '$scope',
        function( $scope ) {

            $scope.user = ITStorage.db.options.get('user');

            $scope.conference = ITStorage.db.options.get('conference');
            
            $scope.saveuser = function() {
            	console.log("update");
            	ITConnect.user.update(
            		$scope.user.firstname, 
            		$scope.user.lastname, 
            		$scope.user.society,
            		"",
            		$scope.user.avatar,
            		function (data) {
            			console.log(data);
            		}
            	);
            }

        } ] );
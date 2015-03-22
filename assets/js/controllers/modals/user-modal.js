"use strict";

angular
    .module( 'MiitApp')
    .controller( 'UserModalController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.agreeAnonyme = false;

            $scope.useUsername = false;

            $scope.accountType = null;

            function canSave() {

                if( $scope.agreeAnonyme && $scope.accountType === 1 || $scope.accountType === 0 ) {

                    if( $scope.accountType === 0 && ( $scope.user.firstname || $scope.user.lastname ) || $scope.user.username ) {

                        return true;
                    }
                }

                return false;
            }

            function saveUser() {

                if( canSave() ) {

                    MiitConnect.user.update(
                        ( $scope.accountType === 0 ) ? $scope.user.firstname : '', 
                        ( $scope.accountType === 0 ) ? $scope.user.lastname : '', 
                        ( $scope.accountType === 0 ) ? $scope.user.society : '',
                        ( $scope.accountType === 1 || $scope.useUsername ) ? $scope.user.username : '',
                        ( $scope.accountType === 0 ) ? $scope.user.avatar : {} ,

                        function (data) {

                            if ( data.done ) {
                            
                                MiitStorage.db.options.set( 'user', data.user );

                                $scope.firstInit = false;

                                $scope.toast({
                                    message: ItNotifications.modal.user.save.success,
                                    type: 'infos'
                                });
                            } else {

                                $scope.toast({
                                    message: ItNotifications.modal.user.save.error,
                                    type: 'error'
                                });
                            }
                        }
                    );
                } else {

                    $scope.toast({
                        message: ItNotifications.modal.user.save.required,
                        type: 'error'
                    });
                }
            }

            function useUsernameChanged() {

                if( !$scope.useUsername ) {

                    $scope.user.username = '';
                }
            }

            function resetToClassic() {

                if( $scope.accountType !== 0 ) {

                    $scope.accountType = 0;
                    $scope.useUsername = 0;
                    $scope.user.username = '';
                    $scope.user.avatar = { c: 'red', a: 'm1' };
                }
            }

            function generateAnonym() {

                if( $scope.accountType !== 1 ) {

                    $scope.accountType = 1;
                    $scope.user.avatar = {};
                    $scope.user.username = 'Anonyme-' + Math.floor( Math.random() * 10000000 );
                }
            }

            $scope.useUsernameChanged = useUsernameChanged;

            $scope.resetToClassic = resetToClassic;

            $scope.generateAnonym = generateAnonym;

            $scope.saveUser = saveUser;

            $scope.canSave = canSave;
        }
    ] );
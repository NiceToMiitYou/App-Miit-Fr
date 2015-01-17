"use strict";

ITEventApp.controller(
    'UserModalController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.agreeAnonyme = false;

            $scope.useUsername = false;

            $scope.accountType = null;
            
            function refreshUser( user ) {
                $timeout( function() {
                    $scope.firstInit = ! ( user.firstname || user.lastname || user.username);
                } );
            }

            function saveUser() {

                if( $scope.agreeAnonyme && $scope.accountType === 1 || $scope.accountType === 0 ) {

                    if( $scope.accountType === 0 && ( $scope.user.firstname || $scope.user.lastname ) || $scope.user.username ) {

                        ITConnect.user.update(
                            ( $scope.accountType === 0 ) ? $scope.user.firstname : '', 
                            ( $scope.accountType === 0 ) ? $scope.user.lastname : '', 
                            ( $scope.accountType === 0 ) ? $scope.user.society : '',
                            ( $scope.accountType === 1 || $scope.useUsername ) ? $scope.user.username : '',
                            ( $scope.accountType === 0 ) ? $scope.user.avatar : {} ,

                            function (data) {

                                if ( data.done ) {
                                
                                    ITStorage.db.options.set( 'user', data.user );

                                    $scope.firstInit = false;

                                    $scope.messenger.post({
                                        message: 'Bienvenue parmis nous!',
                                        type: 'infos'
                                    });
                                } else {

                                    $scope.messenger.post({
                                        message: 'Une erreur c\'est produite lors de la modification de vos informations.',
                                        type: 'error'
                                    });
                                }
                            }
                        );
                    } else {

                        $scope.messenger.post({
                            message: 'Merci de renseigner un des champs obligatoire (pseudonyme, nom ou prénom).',
                            type: 'error'
                        });
                    }
                } else {

                    $scope.messenger.post({
                        message: 'Merci de renseigner les champs obligatoire.',
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


            ITStorage.db.options.bind('user', true, refreshUser);

        } ] );
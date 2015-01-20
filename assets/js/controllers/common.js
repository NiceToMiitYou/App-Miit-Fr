"use strict";

ITEventApp.controller(
    'CommonController', [ '$scope', '$timeout', '$sce',
        function( $scope, $timeout, $sce ) {

            $scope.shared = {

                tags: {},
                
                wantToAskQuestion: false
            };

            $scope.conference = false;

            $scope.presentation = false;

            $scope.user = false;

            $scope.messenger = Messenger( {
                maxMessages: 4,
                extraClasses: 'messenger-on-top messenger-fixed',
                theme: 'flat',
                messageDefaults: {
                    showCloseButton: true,
                    hideAfter: 2
                }
            } );

            var alreadyAskedUsers = {};

            function safeHTML( html ) {
                return $sce.trustAsHtml(html);
            }

            function refreshUser( user ) {

                if( user ) {
                    $timeout( function() {
                        $scope.user = user;

                        alreadyAskedUsers[user.id] = true;

                        ITStorage.db.users.set(user.id, user);
                    } );
                }
            }

            function refreshPresentation( presentation ) {
                $timeout( function() {
                    if( presentation ) {
                        $scope.presentation = presentation;
                    }
                } );
            }

            function getUsername( user ) {

                if( !user ) {
                    user = $scope.user;
                }

                var username = 'Anonyme';

                if(user.username) {

                    username = user.username;

                } else if (user.lastname || user.firstname) {
                    
                    username = (user.firstname ? user.firstname + ' ' : '') +
                               (user.lastname ? user.lastname : '');
                }

                if(username.length > 16) {

                    username = username.substr(0, 14) + "\u2026";
                }

                return username;
            }

            function logout() {
            	
                ITConnect.user.logout(function(data) {

                    if( data.done ) {
                    
                        $scope.messenger.post({
                            message: 'Vous venez d\'être déconnecté.',
                            type: 'info'
                        });

                        $timeout(function() {
                            window.location = data.url;
                        }, 1750);
                    }
                });
            }

            function isAllowed( restrictionId ) {

                // if not restrict, it's allowed
                return ! _.contains( $scope.conference.restrictions, restrictionId );
            }

            function askForUserIfNotExist( object, userField, userId ) {

                ITStorage.db.users.bind(userId, true, function(user) {

                    $timeout(function() {
                        object[userField] = user;
                    });
                });

                // If user not registered request him
                if( !alreadyAskedUsers[userId] ) {

                    alreadyAskedUsers[userId] = true;
                    
                    ITConnect.user.get(userId, function( data ){
                        
                        if( data.done ) {

                            ITStorage.db.users.set(data.user.id, data.user);
                        }
                    });
                }
            }


            function fullscreen() {

                $scope.isfullscreen = !$scope.isfullscreen;
                if($scope.openmenu) {
                    $scope.openmenu = false;
                }

                if($scope.isfullscreen) {

                    ITConnect.track.create('LIVE');

                } else {

                    track($scope.activetool);
                }

                setTimeout(function() {
                    window.scaleSlider();
                }, 50);
            }

            function handlerMenu() {

                if($scope.isfullscreen) {
                    $scope.fullscreen();
                } else {

                    $scope.openmenu = !$scope.openmenu;
                }
            }


            function closeMenu() {
                if(!$scope.isfullscreen && $scope.openmenu) {
                    $scope.openmenu = false;
                }
            }

            function track( id ) {

                ITConnect.track.create( id );

                $scope.activetool = id;
            }

            setTimeout(function(){
                if( $scope.accountType === 1 ) {

                    ITConnect.track.create( 'LIVE' );

                    // Track it away
                    window.onbeforeunload = function( e ) {

                        ITConnect.track.create( 'LEAVING' );
                    };
                }
            }, 250);

            $scope.logout = logout;

            $scope.handlerMenu = handlerMenu;

            $scope.closeMenu = closeMenu;

            $scope.openmenu = false;

            $scope.track = track;
            
            $scope.safeHTML = safeHTML;

            $scope.isAllowed = isAllowed;

            $scope.getUsername = getUsername;

            $scope.askForUserIfNotExist = askForUserIfNotExist;

            $scope.fullscreen = fullscreen;

            $scope.isfullscreen = true;

            ITStorage.db.options.bind('user', true, refreshUser);

            ITStorage.db.options.bind('presentation.actual', true, refreshPresentation);
        } ] );
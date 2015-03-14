"use strict";


angular
    .module( 'MiitApp')
    .controller( 'CommonController', [
        '$scope', '$timeout', '$sce',
        function( $scope, $timeout, $sce ) {

            $scope.shared = {

                tags: {},
                
                wantToAskQuestion: false
            };

            $scope.conference = false;

            $scope.presentation = false;

            $scope.user = false;

            $scope.toast = function( options ) {

                if( options && options.message ) {

                    toast(options.message, 2000);
                }
            };

            var alreadyAskedUsers = {};

            function count( collection ) {

                return _.size( collection );
            }

            function safeHTML( html ) {
                return $sce.trustAsHtml(html);
            }

            function refreshUser( user ) {

                if( user ) {
                    $timeout( function() {

                        $scope.firstInit = ! ( user && ( user.firstname || user.lastname || user.username ) );
                        
                        $scope.user = user;

                        alreadyAskedUsers[user.id] = true;

                        ITStorage.db.users.set(user.id, user);
                    } );
                }
            }

            function refreshConference( conference ) {
                $timeout( function() {
                    if( conference ) {
                        $scope.conference = conference;
                    }
                } );
            }

            function refreshPresentation( presentation ) {
                $timeout( function() {
                    if( presentation ) {
                        $scope.presentation = presentation;
                    }
                } );
            }

            function getAvatar( user ) {

                if( !user ) {
                    user = $scope.user;
                }

                var avatar = 'black anonymous';

                if( user && user.avatar && user.avatar.c && user.avatar.a ) {

                    avatar = user.avatar.c + ' avatar-' + user.avatar.a;
                }
                
                return avatar;
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
                    
                        $scope.toast({
                            message: ItNotifications.logout,
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

                ITStorage.db.users.bind(userId, false, function(user) {

                    $timeout(function() {
                        object[userField] = user;
                    });
                });

                object[userField] = ITStorage.db.users.get( userId );

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

                $scope.openmenu = false;
                
                if($scope.isfullscreen) {

                    ITConnect.track.create('LIVE');

                } else {

                    track($scope.activetool);
                }

                window.scaleSlider();
            }

            function showcontrols() {

                if( $scope.isfullscreen && !$scope.showcontrol ) {
                    
                    $scope.showcontrol = true;

                    $timeout(function() {
                        $scope.showcontrol = false;
                    }, 3000);
                }
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
                }
            }, 250);

            $scope.logout = logout;

            $scope.handlerMenu = handlerMenu;

            $scope.closeMenu = closeMenu;

            $scope.count = count;

            $scope.openmenu = false;

            $scope.track = track;
            
            $scope.safeHTML = safeHTML;

            $scope.isAllowed = isAllowed;

            $scope.getAvatar = getAvatar;

            $scope.getUsername = getUsername;

            $scope.askForUserIfNotExist = askForUserIfNotExist;

            $scope.fullscreen = fullscreen;

            $scope.showcontrol = false;

            $scope.showcontrols = showcontrols;

            $scope.isfullscreen = true;

            ITStorage.db.options.bind('user', true, refreshUser);

            ITStorage.db.options.bind('conference', true, refreshConference);

            ITStorage.db.options.bind('presentation.actual', true, refreshPresentation);
        }
    ] );
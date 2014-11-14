"use strict";

ITEventApp.controller(
    'chatController', [ '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.chatrooms = {};

            $scope.text = '';

            $scope.current = false;

            function loadChatrooms( isLoaded ) {

                if(isLoaded) {

                    $timeout(function(){
                        
                        ITStorage.db.chatrooms.each(function( id, chatroom ) {

                            if( $scope.chatrooms[id] ) {

                                var messages = $scope.chatrooms[id].messages;
                                chatroom.messages = messages;

                            } else {

                                chatroom.messages = {};
                            }

                            $scope.chatrooms[id] = chatroom;

                            if(! $scope.current) {

                                $scope.current = $scope.chatrooms[id];
                            }
                        });
                    });
                }
            }

            function post() {

                if( $scope.text ) {

                    ITConnect.chatroom.send($scope.current.id, $scope.text, function(data) {

                        if(data.done) {

                            $timeout(function() {

                                $scope.text = '';
                            });

                        } else {

                            $scope.messenger.post({
                                message: 'Une erreur s\'est produite lors de l\'envoi de votre message.',
                                type: 'error'
                            });
                        }
                    });
                } else {

                    $scope.messenger.post({
                        message: 'Il n\'y a aucun message à envoyer.',
                        type: 'error'
                    });
                }
            }

            function changeChatroom( chatroom ) {

                $scope.current = chatroom;
            }

            $scope.post = function() {
                if( $scope.isAllowed('CHAT_INTERACTIONS') ) {

                    post();
                }
            };

            $scope.changeChatroom = function( chatroom ) {
                if( $scope.isAllowed('CHAT_INTERACTIONS') &&
                    $scope.isAllowed('CHAT_MULTIPLE_CHATROOMS') ) {
                 
                    changeChatroom( chatroom );
                }
            };

            ITStorage.db.options.bind( 'data.isLoaded', true, loadChatrooms );

            // Retrieve new message
            ITConnect.bind('chatroom-new', function( data ) {

                $timeout(function() {

                    if( data.chatroom ) {

                        var userId = data.user;
                        var chatroomId = data.chatroom;
                        var messageId = data.id;
                        
                        // If no chatroom registered, create a temporary chatrrom
                        if( ! $scope.chatrooms[chatroomId] ) {
                            $scope.chatrooms[chatroomId] = { messages: {} };
                        }

                        $scope.chatrooms[chatroomId].messages[messageId] = data;
                        
                        $scope.askForUserIfNotExist(
                            $scope.chatrooms[chatroomId].messages[messageId],
                            'user', userId
                        );

                        var i = 0;

                        for( var index in $scope.chatrooms[chatroomId].messages ) {

                            i++;
                        }

                        while( i > 40 ) {

                            var min = 0; i = -1;

                            for( var index in $scope.chatrooms[chatroomId].messages) {
                                i++;
                                if( min > index || min === 0) min = index;
                            }

                            delete $scope.chatrooms[chatroomId].messages[min];
                        }
                    }
                });
            });
    } ] );
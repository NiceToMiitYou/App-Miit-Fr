"use strict";

angular
    .module( 'MiitApp')
    .controller( 'ChatController', [
        '$scope', '$timeout',
        function( $scope, $timeout ) {

            $scope.chatrooms = {};

            $scope.text = '';

            $scope.current = false;

            function loadChatrooms( isLoaded ) {

                if( isLoaded ) {

                    $timeout(function(){
                        
                        MiitStorage.db.chatrooms.each(function( id, chatroom ) {

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

                    MiitConnect.chatroom.send($scope.current.id, $scope.text, function(data) {

                        if( !data.done ) {

                            $scope.toast({
                                message: ItNotifications.chat.post.error,
                                type: 'error'
                            });
                        }
                    });

                    $scope.text = '';
                } else {

                    $scope.toast({
                        message: ItNotifications.chat.post.required,
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

            MiitStorage.db.options.bind( 'data.isLoaded', true, loadChatrooms );

            // Retrieve new message
            MiitConnect.bind('chatroom-new', function( data ) {

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

                        var i = _.size( $scope.chatrooms[chatroomId].messages );

                        while( i > 40 ) {

                            var min = 0; i = 0;

                            for( var index in $scope.chatrooms[chatroomId].messages) {
                                i++;
                                if( min > +index || min === 0) min = index;
                            }
                            delete $scope.chatrooms[chatroomId].messages[min];
                        }
                    }
                });
            });
        }
    ] );
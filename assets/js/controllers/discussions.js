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

                            $scope.text = '';
                            $scope.$apply();
                        }
                    });
                }
            }

            function changeChatroom( chatroom ) {
                $scope.current = chatroom;
            }

            $scope.post = post;

            $scope.changeChatroom = changeChatroom;

            ITStorage.db.options.bind( 'data.isLoaded', true, loadChatrooms );

            // Retrieve new message
            ITConnect.bind('chatroom-new', function( data ) {

                $timeout(function(){
                    if( data.chatroom ) {

                        var userId = data.user;
                        var chatroomId = data.chatroom;
                        var messageId = data.id;
                        
                        // If no chatroom registered, create a temporary chatrrom
                        if( ! $scope.chatrooms[chatroomId] ) {
                            $scope.chatrooms[chatroomId] = { messages: {} };
                        }

                        $scope.chatrooms[chatroomId].messages[messageId] = data;
                        $scope.chatrooms[chatroomId].messages[messageId].user = ITStorage.db.users.get(userId);
                        
                        // If user not registered request him
                        if( !$scope.chatrooms[chatroomId].messages[messageId].user ) {

                            ITConnect.user.get(userId, function( data ){
                                
                                $timeout(function() {

                                    if( data.done ) {
                                        
                                        ITStorage.db.users.set(data.user.id, data.user);

                                        if( $scope.chatrooms[chatroomId].messages[messageId] ) {

                                            $scope.chatrooms[chatroomId].messages[messageId].user = data.user;
                                        }
                                    }
                                });
                            });
                        }

                        var i = 0;

                        for(index in $scope.chatrooms[chatroomId].messages) {
                            i++;
                        }

                        while( i > 40 ) {
                            var min = 0; i = -1;

                            for(index in $scope.chatrooms[chatroomId].messages) {
                                i++;
                                if( min > index || min === 0) min = index;
                            }

                            delete $scope.chatrooms[chatroomId].messages[min];
                        }
                    }
                });
            });
    } ] );
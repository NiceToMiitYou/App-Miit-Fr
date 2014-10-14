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
                        
                        // If no chatroom registered, create a temporary chatrrom
                        if( ! $scope.chatrooms[data.chatroom] ) {
                            $scope.chatrooms[data.chatroom] = { messages: {} };
                        }

                        $scope.chatrooms[data.chatroom].messages[data.id] = data;
                        $scope.chatrooms[data.chatroom].messages[data.id].user = ITStorage.db.users.get(userId);
                        
                        // If user not registered request him
                        if( !$scope.chatrooms[data.chatroom].messages[data.id].user ) {

                            ITConnect.user.get(userId, function( data ){
                                
                                $timeout(function() {

                                    if( data.done ) {
                                        
                                        ITStorage.db.users.set(data.user.id, data.user);

                                        $scope.chatrooms[data.chatroom].messages[data.id].user = data.user;
                                    }
                                });
                            });
                        }

                        var i = 0;

                        while( i >= 50 ) {
                            var min = 0; i = 0;

                            for(index in $scope.chatrooms[data.chatroom].messages) {
                                i++;
                                if( min > index && min !== 0) min = index;
                            }

                            delete $scope.chatrooms[data.chatroom].messages[min];
                        }
                    }
                });
            });
    } ] );
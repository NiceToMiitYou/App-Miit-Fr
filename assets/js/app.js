
(function(Connect){

	io.socket.on('chatroom-new', function(data){
		console.log(data)
	});

})(Connect);
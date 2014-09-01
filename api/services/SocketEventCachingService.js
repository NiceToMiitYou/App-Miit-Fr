
module.exports = {

	sendToAll: function(event, data) {
		sails.sockets.broadcast('AllConnectedToRT', event, {
			token: 1,
			data: data 
		});
	}

};
/**
 * ConfLiveController
 *
 * @description :: Server-side logic for managing Conflives
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	/**
	 * `ConfLiveController.next()`
	 */
	next: function(req, res) {
		if( req.param('presentation') && req.param('presentation') > 0 ) {
	    	SocketEventCachingService.sendToAll('live-presentation-next', {
	    		presentation: req.param('presentation')
	    	});
		}
	},

  /**
   * `ConfLiveController.previous()`
   */
   previous: function(req, res) {
		if( req.param('presentation') && req.param('presentation') > 0 ) {
	    	SocketEventCachingService.sendToAll('live-presentation-previous', {
	    		presentation: req.param('presentation')
	    	});
		}
   }

};


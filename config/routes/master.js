
var apiMasterPrefix = '/api/master';

var routes = {};

routes['POST ' + apiMasterPrefix + '/live/next'] = {
	controller: 'ConfLiveController',
	action: 'next'
};

routes['POST ' + apiMasterPrefix + '/live/previous'] = {
	controller: 'ConfLiveController',
	action: 'previous'
};

module.exports = routes;

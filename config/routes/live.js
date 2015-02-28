var apiLivePrefix = '/api/live';

var routes = {};

routes[ 'GET ' + apiLivePrefix + '/capture/:conference/:presentation/:slide' ] = {
    controller: 'ConfLiveController',
    action: 'capture'
};

module.exports = routes;

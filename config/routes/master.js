var apiMasterPrefix = '/api/master';

var routes = {};

routes[ 'GET ' + apiMasterPrefix + '/live/:presentation/next' ] = {
    controller: 'ConfLiveController',
    action: 'next'
};

routes[ 'GET ' + apiMasterPrefix + '/live/:presentation/previous' ] = {
    controller: 'ConfLiveController',
    action: 'previous'
};

module.exports = routes;

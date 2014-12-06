var apiUserPrefix = '/api/user';

var routes = {};

/******************
 * User Controller
 ******************/

routes[ 'GET ' + apiUserPrefix + '/list' ] = {
    controller: 'ConfUserController',
    action: 'list'
};

routes[ 'GET ' + apiUserPrefix + '/:user/get' ] = {
    controller: 'ConfUserController',
    action: 'get'
};

routes[ 'GET ' + apiUserPrefix + '/me' ] = {
    controller: 'ConfUserController',
    action: 'me'
};

routes[ 'POST ' + apiUserPrefix + '/update' ] = {
    controller: 'ConfUserController',
    action: 'update'
};

routes[ 'GET ' + apiUserPrefix + '/logout' ] = {
    controller: 'ConfUserController',
    action: 'logout'
};

routes[ 'GET /connect/:token' ] = {
    controller: 'ConfUserController',
    action: 'connect'
};

module.exports = routes;

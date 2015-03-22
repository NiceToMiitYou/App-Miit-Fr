var apiUserPrefix = '/api/user';

var routes = {};

/******************
 * User Controller
 ******************/

routes[ 'GET ' + apiUserPrefix + '/logout' ] = {
    controller: 'ConfUserController',
    action: 'logout'
};

routes[ 'GET ' + apiUserPrefix ] = {
    controller: 'ConfUserController',
    action: 'me'
};

routes[ 'GET ' + apiUserPrefix + '/:user' ] = {
    controller: 'ConfUserController',
    action: 'get'
};

routes[ 'POST ' + apiUserPrefix ] = {
    controller: 'ConfUserController',
    action: 'update'
};

routes[ 'GET /connect/:token' ] = {
    controller: 'ConfUserController',
    action: 'connect'
};

routes[ 'GET /role/:role' ] = {
    controller: 'ConfUserController',
    action: 'role'
};

module.exports = routes;

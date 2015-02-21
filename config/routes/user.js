var apiUserPrefix = '/api/user';

var routes = {};

/******************
 * User Controller
 ******************/

routes[ 'GET ' + apiUserPrefix + '/:user' ] = {
    controller: 'ConfUserController',
    action: 'get'
};

routes[ 'GET ' + apiUserPrefix ] = {
    controller: 'ConfUserController',
    action: 'me'
};

routes[ 'POST ' + apiUserPrefix ] = {
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

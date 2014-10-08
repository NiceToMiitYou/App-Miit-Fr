var apiUserPrefix = '/api/user';

var routes = {};

/******************
 * User Controller
 ******************/

routes[ 'GET ' + apiUserPrefix + '/list' ] = {
    controller: 'ConfUserController',
    action: 'list'
};

routes[ 'POST ' + apiUserPrefix + '/get' ] = {
    controller: 'ConfUserController',
    action: 'get'
};

routes[ 'POST ' + apiUserPrefix + '/update' ] = {
    controller: 'ConfUserController',
    action: 'update'
};

routes[ 'POST ' + apiUserPrefix + '/login' ] = {
    controller: 'ConfUserController',
    action: 'login'
};

routes[ 'POST ' + apiUserPrefix + '/register' ] = {
    controller: 'ConfUserController',
    action: 'register'
};

routes[ 'GET ' + apiUserPrefix + '/logout' ] = {
    controller: 'ConfUserController',
    action: 'logout'
};

module.exports = routes;

/**
 * Routes for the public app
 */

var apiPublicPrefix = '/api/public';

var routes = {};

/******************
* Chat Controller
******************/

routes['GET ' + apiPublicPrefix + '/chatroom/list'] = {
	controller: 'ConfChatController',
	action: 'list'
};

routes['POST ' + apiPublicPrefix + '/chatroom/send'] = {
	controller: 'ConfChatController',
	action: 'send'
};

/******************
* LiveApplicationEvent Controller
******************/

routes['POST ' + apiPublicPrefix + '/synchronize'] = {
	controller: 'ConfLiveApplicationEventController',
	action: 'list' 
};

/******************
* User Controller
******************/

routes['GET ' + apiPublicPrefix + '/user/list'] = {
	controller: 'ConfUserController',
	action: 'list' 
};

routes['POST ' + apiPublicPrefix + '/user/login'] = {
	controller: 'ConfUserController',
	action: 'login'
};

routes['POST ' + apiPublicPrefix + '/user/register'] = {
	controller: 'ConfUserController',
	action: 'register'
};

routes['GET ' + apiPublicPrefix + '/user/logout'] = {
	controller: 'ConfUserController',
	action: 'logout' 
};

/******************
* Presentation Question Controller
******************/

routes['POST ' + apiPublicPrefix + '/question/presentation/create'] = {
	controller: 'ConfQuestionPresentationController',
	action: 'create'
};

routes['POST ' + apiPublicPrefix + '/question/presentation/like'] = {
	controller: 'ConfQuestionPresentationController',
	action: 'like'
};

/******************
* Slide Question Controller
******************/

routes['POST ' + apiPublicPrefix + '/question/slide/question'] = {
	controller: 'ConfQuestionSlideController',
	action: 'question'
};

routes['POST ' + apiPublicPrefix + '/question/slide/answer'] = {
	controller: 'ConfQuestionSlideController',
	action: 'answer'
};

/******************
* Quizz Question Controller
******************/

routes['GET ' + apiPublicPrefix + '/question/quizz/list'] = {
	controller: 'ConfQuestionQuizzController',
	action: 'list'
};

routes['POST ' + apiPublicPrefix + '/question/quizz/questions'] = {
	controller: 'ConfQuestionQuizzController',
	action: 'questions'
};

routes['POST ' + apiPublicPrefix + '/question/quizz/answer'] = {
	controller: 'ConfQuestionQuizzController',
	action: 'answer'
};

/******************
* Note Controller
******************/

routes['POST ' + apiPublicPrefix + '/note/create'] = {
	controller: 'ConfNoteController',
	action: 'create'
};

routes['GET ' + apiPublicPrefix + '/note/list'] = {
	controller: 'ConfNoteController',
	action: 'list'
};

routes['POST ' + apiPublicPrefix + '/note/update'] = {
	controller: 'ConfNoteController',
	action: 'update'
};

routes['POST ' + apiPublicPrefix + '/note/delete'] = {
	controller: 'ConfNoteController',
	action: 'delete'
};

routes['POST ' + apiPublicPrefix + '/note/send'] = {
	controller: 'ConfNoteController',
	action: 'send'
};

/******************
* Resource Controller
******************/

routes['GET /assets/conference/color-scheme.css'] = {
	controller: 'ConfResourceController',
	action: 'colorScheme'
};

routes['GET ' + apiPublicPrefix + '/resources/list'] = {
	controller: 'ConfResourceController',
	action: 'list'
};

module.exports = routes;
/**
 * Routes for the public app
 */

var apiPublicPrefix = '/api/viewer';

var routes = {};

/******************
 * Chat Controller
 ******************/

routes[ 'GET ' + apiPublicPrefix + '/chatroom/list' ] = {
    controller: 'ConfChatController',
    action: 'list',
    restriction: 'CHAT_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/chatroom/send' ] = {
    controller: 'ConfChatController',
    action: 'send',
    restriction: 'CHAT_INTERACTIONS'
};

/******************
 * LiveApplicationEvent Controller
 ******************/

routes[ 'POST ' + apiPublicPrefix + '/synchronize' ] = {
    controller: 'ConfLiveApplicationEventController',
    action: 'list'
};

/******************
 * Presentation Question Controller
 ******************/

routes[ 'POST ' + apiPublicPrefix + '/question/presentation/create' ] = {
    controller: 'ConfQuestionPresentationController',
    action: 'create',
    restriction: 'WALL_INTERACTIONS'
};

routes[ 'GET ' + apiPublicPrefix + '/question/presentation/tags' ] = {
    controller: 'ConfQuestionPresentationController',
    action: 'tags',
    restriction: 'WALL_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/question/presentation/like' ] = {
    controller: 'ConfQuestionPresentationController',
    action: 'like',
    restriction: 'WALL_INTERACTIONS'
};

/******************
 * Slide Question Controller
 ******************/

routes[ 'POST ' + apiPublicPrefix + '/question/slide/question' ] = {
    controller: 'ConfQuestionSlideController',
    action: 'question'
};

routes[ 'POST ' + apiPublicPrefix + '/question/slide/answer' ] = {
    controller: 'ConfQuestionSlideController',
    action: 'answer'
};

/******************
 * Quizz Question Controller
 ******************/

routes[ 'GET ' + apiPublicPrefix + '/question/quizz/list' ] = {
    controller: 'ConfQuestionQuizzController',
    action: 'list',
    restriction: 'QUIZZ_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/question/quizz/questions' ] = {
    controller: 'ConfQuestionQuizzController',
    action: 'questions',
    restriction: 'QUIZZ_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/question/quizz/answer' ] = {
    controller: 'ConfQuestionQuizzController',
    action: 'answer',
    restriction: 'QUIZZ_INTERACTIONS'
};

/******************
 * Note Controller
 ******************/

routes[ 'POST ' + apiPublicPrefix + '/note/create' ] = {
    controller: 'ConfNoteController',
    action: 'create',
    restrictions: [ 'NOTE_INTERACTIONS', 'NOTE_MULTIPLE' ]
};

routes[ 'GET ' + apiPublicPrefix + '/note/list' ] = {
    controller: 'ConfNoteController',
    action: 'list',
    restriction: 'NOTE_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/note/update' ] = {
    controller: 'ConfNoteController',
    action: 'update',
    restriction: 'NOTE_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/note/delete' ] = {
    controller: 'ConfNoteController',
    action: 'delete',
    restrictions: [ 'NOTE_INTERACTIONS', 'NOTE_MULTIPLE' ]
};

routes[ 'POST ' + apiPublicPrefix + '/note/send' ] = {
    controller: 'ConfNoteController',
    action: 'send',
    restrictions: [ 'NOTE_INTERACTIONS', 'NOTE_SEND' ]
};

/******************
 * Resource Controller
 ******************/

routes[ 'GET /assets/conference/color-scheme.css' ] = {
    controller: 'ConfResourceController',
    action: 'colorScheme'
};

routes[ 'GET ' + apiPublicPrefix + '/resources/list' ] = {
    controller: 'ConfResourceController',
    action: 'list'
};

/******************
 * Track Controller
 ******************/

routes[ 'POST ' + apiPublicPrefix + '/track/start' ] = {
    controller: 'ConfTrackController',
    action: 'start'
};

routes[ 'POST ' + apiPublicPrefix + '/track/end' ] = {
    controller: 'ConfTrackController',
    action: 'end'
};


module.exports = routes;

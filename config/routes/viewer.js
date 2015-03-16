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

routes[ 'POST ' + apiPublicPrefix + '/chatroom/:chatroom/send' ] = {
    controller: 'ConfChatController',
    action: 'send',
    restriction: 'CHAT_INTERACTIONS',
    flood: {
        id: 'ChatSendAction',
        time: 250
    }
};

/******************
 * LiveApplicationEvent Controller
 ******************/

routes[ 'GET ' + apiPublicPrefix + '/synchronize/:token' ] = {
    controller: 'ConfLiveApplicationEventController',
    action: 'list'
};

/******************
 * Presentation Question Controller
 ******************/

routes[ 'POST ' + apiPublicPrefix + '/presentation/question' ] = {
    controller: 'ConfQuestionPresentationController',
    action: 'create',
    restriction: 'WALL_INTERACTIONS',
    flood: {
        id: 'QuestionSendAction',
        time: 1000
    }
};

routes[ 'GET ' + apiPublicPrefix + '/presentation/question/tags' ] = {
    controller: 'ConfQuestionPresentationController',
    action: 'tags',
    restriction: 'WALL_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/presentation/question/:question/like' ] = {
    controller: 'ConfQuestionPresentationController',
    action: 'like',
    restriction: 'WALL_INTERACTIONS',
    flood: {
        id: 'WallLikeAction',
        time: 250
    }
};

/******************
 * Slide Question Controller
 ******************/

routes[ 'GET ' + apiPublicPrefix + '/slide/:slide/question' ] = {
    controller: 'ConfQuestionSlideController',
    action: 'question'
};

routes[ 'POST ' + apiPublicPrefix + '/slide/question/:question/answer' ] = {
    controller: 'ConfQuestionSlideController',
    action: 'answer'
};

/******************
 * Quizz Question Controller
 ******************/

routes[ 'GET ' + apiPublicPrefix + '/quizz' ] = {
    controller: 'ConfQuestionQuizzController',
    action: 'list',
    restriction: 'QUIZZ_INTERACTIONS'
};

routes[ 'GET ' + apiPublicPrefix + '/quizz/:quizz/questions' ] = {
    controller: 'ConfQuestionQuizzController',
    action: 'questions',
    restriction: 'QUIZZ_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/quizz/:quizz/answer' ] = {
    controller: 'ConfQuestionQuizzController',
    action: 'answer',
    restriction: 'QUIZZ_INTERACTIONS'
};

/******************
 * Note Controller
 ******************/

routes[ 'POST ' + apiPublicPrefix + '/note' ] = {
    controller: 'ConfNoteController',
    action: 'create',
    restrictions: [ 'NOTE_INTERACTIONS', 'NOTE_MULTIPLE' ]
};

routes[ 'GET ' + apiPublicPrefix + '/note' ] = {
    controller: 'ConfNoteController',
    action: 'list',
    restriction: 'NOTE_INTERACTIONS'
};

routes[ 'POST ' + apiPublicPrefix + '/note/:note' ] = {
    controller: 'ConfNoteController',
    action: 'update',
    restriction: 'NOTE_INTERACTIONS'
};

routes[ 'DELETE ' + apiPublicPrefix + '/note/:note' ] = {
    controller: 'ConfNoteController',
    action: 'delete',
    restrictions: [ 'NOTE_INTERACTIONS', 'NOTE_MULTIPLE' ]
};

routes[ 'GET ' + apiPublicPrefix + '/note/:note/send' ] = {
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

routes[ 'GET ' + apiPublicPrefix + '/resources' ] = {
    controller: 'ConfResourceController',
    action: 'list'
};

/******************
 * Track Controller
 ******************/

routes[ 'GET ' + apiPublicPrefix + '/track/:action' ] = {
    controller: 'ConfTrackController',
    action: 'create'
};

module.exports = routes;

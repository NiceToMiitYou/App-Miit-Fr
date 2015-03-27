var routes = {};

routes[ 'GET /backend/extract/quizz/:quizz' ] = {
    controller: 'ConfQuestionQuizzController',
    action: 'extract'
};


module.exports = routes;

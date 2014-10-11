

// Create all data
function create( cb ) {

    async.waterfall( [

        createConference,

        createUsers,

        createChatrooms,

        createTags,

        createQuizzes,

        createQuizzQuestions,

        createQuizzQuestionAnswers

        ], cb );

}

// Create the conference
function createConference( cb ) {

    ConfConference
        .create({
            name: 'ITEvents test',
            description: 'ITEvents vous présente ça conférence de test.',
            clientName: 'ITEvents Society',
            colorScheme: 'html {}',
            logo: '/images/logodark.png'
        })
        .exec(
            function( err, created ){
                cb();
            });
}

// Create users
function createUsers( cb ) {

    ConfUser
        .create([ {
            mail: 'viewer@itevents.fr',
            password: 'itevents',
            roles: [ 'ROLE_LOGIN', 'ROLE_VIEWER' ]
        }, {
            mail: 'master@itevents.fr',
            password: 'itevents',
            roles: [ 'ROLE_LOGIN', 'ROLE_MASTER' ]
        }, {
            mail: 'admin@itevents.fr',
            password: 'itevents',
            roles: [ 'ROLE_LOGIN', 'ROLE_ADMIN' ]
        }, {
            mail: 'live@itevents.fr',
            password: 'itevents',
            roles: [ 'ROLE_LOGIN', 'ROLE_LIVE' ]
        } ])
        .exec(
            function( err, created ){
                cb();
            });
}

// Create chatrooms
function createChatrooms( cb ) {

    ConfChatRoom
        .create([ {
            name: 'ITEvents test'
        }, {
            name: 'Support',
            type: 2
        } ])
        .exec(
            function( err, created ){
                cb();
            });
}

// Create tags
function createTags( cb ) {

    ConfTag
        .create([ {
            name: 'ITEvents'
        }, {
            name: 'Conference'
        }, {
            name: 'Prestation'
        }, {
            name: 'Important'
        }, {
            name: 'Presentation'
        }, {
            name: 'Question'
        }, {
            name: 'Temps-réel'
        }, {
            name: 'Social'
        }, {
            name: 'Politique'
        }, {
            name: 'Inovation'
        }, {
            name: 'Flexibilité'
        }, {
            name: 'Economie'
        } ])
        .exec(
            function( err, created ){
                cb();
            });
}

// Create quizzes
function createQuizzes( cb ) {

    ConfQuizz
        .create([ {
            name: 'Quizz test',
            description: 'Ceci est le questionnaire de test, il permet de tester les différentes fonctionnalités du quizz.'
        }, {
            name: 'Second quizz',
            description: 'Ceci est le deuxième questionnaire de test, il permet de tester les différentes fonctionnalités du quizz.'
        } ])
        .exec(
            function( err, created ){
                cb();
            });
}

// Create quizz's questions
function createQuizzQuestions( cb ) {

    ConfQuestionQuizz
        .create([ {
            question: 'Est-ce que ce formulaire vous convient?',
            quizz: 1,
            type: 1
        }, {
            question: 'Est-ce que vous voulez répondre à plusieurs réponses?',
            quizz: 1,
            type: 2
        }, {
            question: 'Est-ce que ce vous aimez cette conférence?',
            quizz: 2,
            type: 1
        }, {
            question: 'Qu\'est-ce qui pourrait vous aidez?',
            quizz: 2,
            type: 2
        } ])
        .exec(
            function( err, created ){
                cb();
            });
}

// Create quizz's answers
function createQuizzQuestionAnswers( cb ) {

    ConfQuestionQuizzAnswer
        .create([ {
            answer: 'Absolument',
            question: 1
        }, {
            answer: 'Pas du tout',
            question: 1
        }, {
            answer: 'Avec',
            question: 2
        }, {
            answer: 'Grand',
            question: 2
        }, {
            answer: 'Plaisir',
            question: 2
        }, {
            answer: 'Non',
            question: 2
        }, {
            answer: 'J\'adore',
            question: 3
        }, {
            answer: 'J\'ai vu mieux',
            question: 3
        }, {
            answer: 'Je regrette d\'être venu',
            question: 3
        }, {
            answer: 'Plus de choix',
            question: 4
        }, {
            answer: 'Plus d\'interactivité',
            question: 4
        }, {
            answer: 'Plus de fonctionnalités',
            question: 4
        }, {
            answer: 'Plus de présentations',
            question: 4
        }, {
            answer: 'Plus de conférence',
            question: 4
        }, {
            answer: 'Plus de personnes',
            question: 4
        }, {
            answer: 'Tout est parfait',
            question: 4
        } ])
        .exec(
            function( err, created ){
                cb();
            });
}


module.exports = {

    initialize: function( cb ) {

        if( sails.config.environment === 'development') {
            

            ConfConference.findOne( 1 ).exec(function(err, conference) {
                if ( err || conference ) return cb();

                sails.log.debug('Initialize data...');

                create( function() {

                    sails.log.debug('Initialize data... DONE!');
                    
                    cb();

                });
            }); 

        } else {

            cb();
        }
    }
}

var fs = require('fs'),
    webshot = require('webshot'),
    lwip = require('lwip'),
    size = {
        big : {
            width: 2048,
            height: 1536
        },
        small : {
            width: 227,
            height: 170
        }
    };

// Create all data
function create( cb ) {

    async.waterfall( [

        createConference,

        createPresentations,

        createSlides,

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
            description: 'ITEvents vous présente sa conférence de test.',
            clientName: 'ITEvents Society',
            colorScheme: 'html {}',
            logo: '/images/logodark.png'
        })
        .exec(
            function( err, created ){
                cb();
            });
}

// Create the presentations
function createPresentations( cb ) {

    ConfPresentation
        .create( [ {
            name: 'ITEvents presentation',
            description: 'ITEvents vous présente sa présentation de test.',
            authors: 'Cortet Jordan, Tacyniak Boris',
            conference: 1
        } ] )
        .exec(
            function( err, created ){
                cb();
            });
}

// Create the slides
function createSlides( cb ) {

    ConfSlide
        .create( [ {
            content: '<img src="/images/slides/Diapositive01.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive02.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive03.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive04.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive05.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive06.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive07.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive08.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive09.png">',
            presentation: 1
        }, {
            content: '<img src="/images/slides/Diapositive10.png">',
            presentation: 1
        } ] )
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
            required: true,
            type: 1
        }, {
            question: 'Est-ce que vous voulez répondre à plusieurs réponses?',
            quizz: 1,
            required: true,
            type: 2
        }, {
            question: 'Est-ce que ce vous aimez cette conférence?',
            quizz: 2,
            required: true,
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

function deleteFolderRecursive( path ) {

    if( fs.existsSync( path ) ) {

        fs.readdirSync( path )
            .forEach( function( file, index ) {

            var curPath = path + '/' + file;

            if( file !== '.gitkeep' ) { // delete file

                fs.unlinkSync(curPath);
            }
        } );
    }
};


function beautifyHtml( html ) {

    return '<html>' +
            '<head>' +
            '<link rel="stylesheet" href="http://127.0.0.1:' + sails.config.port + '/styles/css/main.css"/>' +
            '</head>' +
            '<body>' +
                '<div id="slides" class="presentation-slide">' +
                    '<div class="slide">' +
                        html +
                    '</div>' +
                '</div>' +
                '<script>' +
                    'var inputs = document.getElementsByTagName("img");' +
                    'for(var i = 0; i < inputs.length; i++) {' +
                    '    inputs[i].src = "http://127.0.0.1:' + sails.config.port + '" + inputs[i].src;' +
                    '    document.write(inputs[i].src);' +
                    '}' +
                '</script>' +
            '</body>' +
           '</html>';
}

function generateImagePath( base, size, presentation, slide ) {

    return base + '/' + size + '_' + presentation + '_' + slide + '.png';
}

function generateBigImage( path, presentation, slide, html ) {

    setTimeout(function() {

        var saveFile = generateImagePath( path, 'big', presentation, slide );

        var options = {
            screenSize: size.big,
            siteType: 'html',
            renderDelay: 5000,
            settings: {
                localToRemoteUrlAccessEnabled: true
            }
        };

        webshot( beautifyHtml( html ), saveFile, options, function( err ) {

            if( !err ) {

                sails.log.debug('File generated: ' + saveFile);

                setTimeout(function() {

                    // Genrate small image
                    generateSmallImage( saveFile, path, presentation, slide );
                }, 500);

            } else {

                sails.log.debug('Can\'t generate file: ' + saveFile);

                sails.log.debug( err );
            }
        } );
    }, 2500);
}

function generateSmallImage( origin, path, presentation, slide ) {

    var saveFile = generateImagePath( path, 'small', presentation, slide );

    lwip.open( origin, function( err, image ) {

        image
            .batch()
            .resize(size.small.width, size.small.height)
            .writeFile( saveFile, 'png', {
                compression: 'high',
                transparency: false
            }, function( err ) {

                if( !err ) {

                    sails.log.debug('File generated: ' + saveFile);

                } else {

                    sails.log.debug('Can\'t generate file: ' + saveFile);
                }
            } );
    } );
}

function generateThumbnail( path, cb ) {

    deleteFolderRecursive( path );

    ConfPresentation.find( { conference: 1 } )
        .populate( 'slides' )
        .exec( function(err, presentations) {
            
            if( ! err ) {

                // For each presentations
                _.forEach( presentations, function( presentation ){

                    // For each slides of the presentation
                    _.forEach( presentation.slides, function( slide ) {

                        // Genrate big image
                        generateBigImage( path, presentation.id, slide.id, slide.content );
                    } );
                } );
            }
            
            cb();
        } );
}

module.exports = {

    initialize: function( cb ) {

        var thumbnailPath = sails.config.rootPath + '/assets/images/slides/generated';

        if( sails.config.environment === 'development' ) {
            
            ConfConference.findOne( 1 ).exec(function(err, conference) {
                if ( err || conference ) return generateThumbnail( thumbnailPath, cb );

                sails.log.debug('Initialize data...');

                create( function() {

                    sails.log.debug('Initialize data... DONE!');
                    
                    generateThumbnail( thumbnailPath, cb );

                });
            }); 

        } else {

            generateThumbnail( thumbnailPath, cb );
        }
    }
}

var fs = require('fs'),
    appRoot = require('app-root-path'),
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

        createChatrooms,

        createTags,

        createResourcesCategories,

        createResources,

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
            token: 'ConfToken',
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
            description: 'ITEvents vous présente sa présentation de test avec Karim Bakrimi, Pascal Fossé et Jordan Cortet.',
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

// Create Categories of resources
function createResourcesCategories( cb ) {

    ConfResourceCategory
        .create( [ {
            name: 'NotVisible',
            isVisible: false,
            conference: 1
        }, {
            name: 'Photos',
            conference: 1
        }, {
            name: 'Vidéos',
            conference: 1
        }, {
            name: 'Rapports',
            conference: 1
        } ] )
        .exec(
            function( err, created ){
                cb();
            });
}


// Create Categories of resources
function createResources( cb ) {

    ConfResource
        .create( [ {
            name: 'NotVisible',
            path: 'http://img.wikinut.com/img/gycf69_-6rv_5fol/jpeg/0/Best-Friends-Img-Src%3AImage%3A-FreeDigitalPhotos.net.jpeg',
            category: 1
        }, {
            name: 'Photo #1',
            path: 'http://captainkimo.com/wp-content/uploads/2010/09/hdr-photo-1.jpg',
            category: 2
        }, {
            name: 'Photo #2',
            path: 'http://captainkimo.com/wp-content/uploads/2010/09/hdr-photo-1.jpg',
            category: 2
        }, {
            name: 'Vidéo #1',
            path: 'https://www.youtube.com/watch?v=y6Sxv-sUYtM',
            category: 3
        }, {
            name: 'Rapport #1',
            path: 'http://www.nestle.com/asset-library/documents/library/documents/annual_reports/2013-annual-report-en.pdf',
            category: 4
        }, {
            name: 'Rapport #2',
            path: 'http://www.nestle.com/asset-library/documents/library/documents/annual_reports/2013-annual-report-en.pdf',
            category: 4
        }, {
            name: 'Rapport #3',
            path: 'http://www.nestle.com/asset-library/documents/library/documents/annual_reports/2013-annual-report-en.pdf',
            category: 4
        } ] )
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
            renderDelay: 4000,
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
    }, 2500 + Math.round( Math.random() * 2500 ));
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

        var thumbnailPath = appRoot + '/.tmp/public/images/slides';

        if( sails.config.environment === 'development' ||
            sails.config.environment === 'qualification' ) {
            
            ConfConference.findOne( 1 ).exec(function(err, conference) {
                if ( err || conference ) return generateThumbnail( thumbnailPath, cb );

                sails.log.debug('Initialize data...');

                create( function() {

                    sails.log.debug('Initialize data... DONE!');
                    
                    generateThumbnail( thumbnailPath, cb );

                } );
            } ); 

        } else {

            generateThumbnail( thumbnailPath, cb );
        }
    }
};
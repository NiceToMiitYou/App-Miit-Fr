
function extractAnswers( question, cb ) {

    ConfQuestionQuizzChoiceUser
        .find( {
            'answer': _.map( question.answers, 'id' )
        } )
        .populate('answer')
        .exec( function( err, answers ) {
            if( err ) {

                return cb( err );
            }

            var data = '', counter = {}, storage = {};

            data += question.question;
            data += '\n';

            // Initialize all answers
            _.forEach( question.answers, function( answer ) {

                if( ! counter[ answer.id ] ) {

                    counter[ answer.id ] = {
                        object: answer,
                        counter: 0
                    };
                }
            } );

            // For each choices
            _.forEach( answers, function( userChoice ) {

                counter[ userChoice.answer.id ].counter++;

                if( question.type === 3 &&
                    userChoice.extra    &&
                    userChoice.extra.text ) {

                    var id = userChoice.extra.text.toLowerCase();

                    if( !storage[ id ] ) {
                        storage[ id ] = {
                            counter: 1,
                            text:    userChoice.extra.text
                        };
                    } else {

                        storage[ id ].counter++;
                    }
                }
            } );

            if( question.type === 3 ) {
                // for each storage
                _.forEach( storage, function( store ) {

                    data += '\t';
                    
                    data += store.counter;

                    data += '\t';

                    data += store.text;

                    data += '\n';
                } );

            } else {
                
                // for each answer in the counter
                _.forEach( counter, function( answer ) {
                    data += '\t';

                    data += answer.counter;

                    data += '\t';

                    data += answer.object.answer;

                    data += '\n';
                } );
            }

            return cb( null, data );
        } );

} 

function extract( quizz, cb ) {

    ConfQuestionQuizz
        .find( {
            quizz: quizz
        } )
        .populate('quizz')
        .populate('answers')
        .exec( function( err, questions ) {
            if( err || !_.size( questions ) ) {
                return cb('Error.');
            }

            var tasks = [],
                file  = '';
            
            file += 'Quizz:\t' + _.first( questions ).quizz.name + '\n\n\n\n';

            // Iterate on questions
            _.forEach( questions, function( question ) {

                // add the task for WaterFall
                tasks.push( function( callback ) {

                    if( question.type !== 0 ) {

                        // Extract the answer
                        extractAnswers( question, function( errQuestion, data ) {

                            file += data + '\n\n\n';

                            return callback( errQuestion );
                        } );
                    } else {

                        file += question.question + '\n\n';

                        return callback( null );
                    }
                } );
            } );

            // Call all tasks
            async.waterfall( tasks, function( err ) {

                return cb( file );
            } );
        } );
}




module.exports = {

    extract: function( quizz, cb ) {

        extract( quizz, function( file ) {

            if( typeof cb === 'function') {

                cb( file );
            }
        } );
    }
}
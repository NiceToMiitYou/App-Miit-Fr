window.ITEventApp = angular.module( 'ITEventApp', [] );

// Create
function init() {
    ITStorage.create( 'options', true );

    ITStorage.create( 'chatrooms' );
    ITStorage.create( 'users' );
    ITStorage.create( 'notes' );
    ITStorage.create( 'resources' );

    ITStorage.create( 'quizzes' );
    ITStorage.create( 'questions' );
    ITStorage.create( 'presentations' );

    if ( !ITStorage.db.options.get( 'conference.initialized' ) ) {

        ITConnect.config.conference( function( data ) {

            if ( data.done ) {

                ITStorage.db.options.set( 'conference.logo', data.conference.logo );
                ITStorage.db.options.set( 'conference.name', data.conference.name );
                ITStorage.db.options.set( 'conference.description', data.conference.description );

                ITStorage.db.options.set( 'conference.initialized', true );
            }
        } );
    }
}

init();

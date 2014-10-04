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

    initData();
}

// Request data
function initData() {

    if ( !ITStorage.db.options.get( 'conference.initialized' ) ) {

        ITConnect.config.conference( function( data ) {

            if ( data.done ) {

                ITStorage.db.options.set( 'conference', data.conference );

                ITStorage.db.options.set( 'conference.initialized', true );
            }
        } );
    }

    if ( ITStorage.db.options.get( 'user.isConnected' ) &&
        !ITStorage.db.options.get( 'user.isLoad' ) ) {




        ITStorage.db.options.set( 'user.isLoad', true );
    }
}

init();

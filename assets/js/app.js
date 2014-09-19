( function() {

    // Create
    function init() {
        ITStorage.create( 'options' );

        ITStorage.create( 'chatrooms' );
        ITStorage.create( 'users' );
        ITStorage.create( 'notes' );
        ITStorage.create( 'resources' );

        ITStorage.create( 'quizzes' );
        ITStorage.create( 'questions' );
        ITStorage.create( 'presentations' );
    }

    init();



} )();

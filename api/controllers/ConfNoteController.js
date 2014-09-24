/**
 * ConfNoteController
 *
 * @description :: Server-side logic for managing ConfNotes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ConfNoteController.create()`
     */
    create: function( req, res ) {
        ConfNote.create( {
            title: req.param( 'title' ),
            content: req.param( 'content' ),
            user: req.session.user,
        } )
            .exec( function( err, created ) {
                if ( err ) return res.notDone();

                return res.done( {
                    note: created
                } );
            } );
    },

    /**
     * `ConfNoteController.list()`
     */
    list: function( req, res ) {
        ConfNote.find( {
            user: req.session.user
        } )
            .exec( function( err, notes ) {
                if ( err || !notes ) return res.notDone();

                return res.done( {
                    notes: notes
                } );
            } );
    },

    /**
     * `ConfNoteController.update()`
     */
    update: function( req, res ) {
        ConfNote.findOne( {
            id: req.param( 'note' ),
            user: req.session.user
        } )
            .exec( function( err, note ) {
                if ( err || !note ) return res.notDone();

                if ( note.user == req.session.user ) {
                    note.title = req.param( 'title' );
                    note.content = req.param( 'content' );
                    note.save( function( err, saved ) {
                        if ( err ) return res.notDone();

                        return res.done( {
                            note: saved
                        } );
                    } );

                } else {

                    return res.notDone();

                }
            } );
    },


    /**
     * `ConfNoteController.delete()`
     */
    delete: function( req, res ) {
        ConfNote.findOne( req.param( 'note' ) )
            .exec( function( err, note ) {
                if ( err || !note ) return res.notDone();

                if ( note.user == req.session.user ) {
                    ConfNote.destroy( req.param( 'note' ) )
                        .exec( function( err, deleted ) {
                            if ( err ) return res.notDone();

                            return res.done();
                        } );

                } else {

                    return res.notDone();

                }
            } );
    },


    /**
     * `ConfNoteController.send()`
     */
    send: function( req, res ) {
        return res.json( {
            todo: 'send() is not implemented yet!'
        } );
    }
};

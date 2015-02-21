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

        var title   = req.param( 'title' ),
            content = req.param( 'content' );

        ConfNote
            .create( {
                title:      title,
                content:    content,
                user:       req.session.user,
                conference: req.session.conference
            } )
            .exec( function( err, created ) {
                if ( err ) {

                    return res.notDone();
                }

                return res.done( {
                    note: created
                } );
            } );
    },

    /**
     * `ConfNoteController.list()`
     */
    list: function( req, res ) {

        ConfNote
            .find( {
                user:       req.session.user,
                conference: req.session.conference
            } )
            .exec( function( err, notes ) {
                if ( err || !notes ) {

                    return res.notDone();
                }

                return res.done( {
                    notes: notes
                } );
            } );
    },

    /**
     * `ConfNoteController.update()`
     */
    update: function( req, res ) {

        var noteId  = req.param( 'note' ),
            title   = req.param( 'title' ),
            content = req.param( 'content' );

        ConfNote
            .findOne( {
                id:         noteId,
                user:       req.session.user,
                conference: req.session.conference
            } )
            .exec( function( err, note ) {
                if ( err || !note ) {

                    return res.notDone();
                }

                note.title   = title;
                note.content = content;
                note.save( function( err, saved ) {
                    if ( err ) {

                        return res.notDone();
                    }

                    return res.done( {
                        note: saved
                    } );
                } );
            } );
    },


    /**
     * `ConfNoteController.delete()`
     */
    delete: function( req, res ) {

        var noteId  = req.param( 'note' ),
            title   = req.param( 'title' ),
            content = req.param( 'content' );

        ConfNote
            .findOne( {
                id:         noteId,
                user:       req.session.user,
                conference: req.session.conference
            } )
            .exec( function( err, note ) {
                if ( err || !note ) {

                    return res.notDone();
                }

                ConfNote.destroy( noteId )
                    .exec( function( err ) {
                        if ( err ) {

                            return res.notDone();
                        }

                        return res.done();
                    } );
            } );
    },


    /**
     * `ConfNoteController.send()`
     */
    send: function( req, res ) {

        var noteId  = req.param( 'note' );

        ConfNote
            .findOne( {
                id:         noteId,
                user:       req.session.user,
                conference: req.session.conference
            } )
            .populate( 'user' )
            .exec( function( err, note ) {
                if ( err || !note ) {

                    return res.notDone();
                }

                MailingService.sendEmailNote(
                    note.user.mail,
                    note.title,
                    note.content
                );

                return res.done();
            } );
    }
};

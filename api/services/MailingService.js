var nodemailer = require( 'nodemailer' );
var smtpTransport = require( 'nodemailer-smtp-transport' );
var transporter = nodemailer.createTransport(
    smtpTransport(
        sails.config.mailer.smtp
    )
);


function sendEmail( email, title, contentText, contentHtml ) {
    if ( sails.config.mailer.bypass ) {

        sails.log.info( 'EMAIL : TO -> ', email );
        sails.log.info( 'EMAIL : TITLE -> ', title );
        sails.log.info( 'EMAIL : CONTENT -> ', contentText );
        sails.log.info( 'EMAIL : HTML -> ', contentHtml );

    } else {

        transporter.sendMail( {
            from: sails.config.mailer.from,
            to: email,
            subject: title,
            text: contentText,
            html: contentHtml
        } );
    }
}


module.exports = {

    sendNoteEmail: function( email, title, note ) {
        sendMail(
            email,
            'ITEvents - Your note: ' + title,
            note,
            note
        );
    }
};

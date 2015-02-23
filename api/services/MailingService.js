var nodemailer    = require( 'nodemailer' ),
    smtpTransport = require( 'nodemailer-smtp-transport' );

function sendEmail( email, title, contentText, contentHtml ) {
    
    if ( sails.config.mailer.bypass ) {

        sails.log.info( 'EMAIL : TO -> ', email );
        sails.log.info( 'EMAIL : TITLE -> ', title );
        sails.log.info( 'EMAIL : CONTENT -> ', contentText );
        sails.log.info( 'EMAIL : HTML -> ', contentHtml );

    } else {
        
        var transporter = nodemailer.createTransport(
            smtpTransport(
                sails.config.mailer.smtp
            )
        );

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

    sendEmailNote: function( email, title, note ) {
        sendEmail(
            email,
            'Miit - Your note: ' + title,
            note,
            note
        );
    }
};

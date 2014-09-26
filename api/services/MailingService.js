var nodemailer = require( 'nodemailer' );
var transporter = nodemailer.createTransport();


function sendEmail( email, title, contentText, contentHtml ) {
    transporter.sendMail( {
        from: {
            name: 'ITEvents',
            address: 'no-reply@itevents.fr'
        },
        to: email,
        subject: title,
        text: contentText,
        html: contentHtml
    } );
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

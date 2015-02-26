/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    application: {

        sqs: 'prd-miit-fr'
    },

    mailer: {
        from: {
            name: 'Miit',
            address: 'no-reply@itevents.fr'
        },

        smtp: {
            host: 'smtp.itevents.fr',
            port: 587,
            auth: {
                user: 'no-reply@itevents.fr',
                pass: 'nopeReply'
            }
        },

        bypass: false
    },

    connections: {

        // Storage of the conference
        ConferenceDatabase: {
            user: 'root',
            password: '',
            database: 'fr_miit_app'
        },

        DwhWebService: {
            args: {
                accessToken: 'x0otR1PEMiv1uvZ8WSq52GzzO4BShWw286OdgGAg'
            },
            protocol: 'http',
            host: 'dwh.miit.fr',
            port: 80
        }
    },

    port: 80,
  
    log: {
        level: "silent"
    }
};

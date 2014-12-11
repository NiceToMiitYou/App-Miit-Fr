/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    /***************************************************************************
     * Set the default database connection for models in the development       *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    // models: {
    //   connection: 'someMongodbServer'
    // }
    port: 8080,

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
        LiveApplicationDatabase: {
            user: 'root',
            password: '',
            database: 'fr_miit_app'
        },

        // Storage of the conference
        ConferenceDatabase: {
            user: 'root',
            password: '',
            database: 'fr_miit_app'
        },

        DwhWebService: {
            args: {
                accessToken: 'qVZDWicwFjh49O9PQUKJ8Ur8r3YKSrx3YqUll2L6'
            },
            protocol: 'http',
            host: 'dwh.qlf.priv.miit.fr',
            port: 80
        }
    }
};

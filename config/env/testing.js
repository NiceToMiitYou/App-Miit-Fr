/**
 * Testing environment settings
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
     * Set the default database connection for models in the testing           *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    port: 18080,

    connections: {

        LiveApplicationDatabase: {
            adapter: 'sails-memory'
        },

        ConferenceDatabase: {
            adapter: 'sails-memory'
        }
    },

    mailer: {
        from: {
            name: 'ITEvents',
            mail: 'no-reply@itevents.fr'
        },

        smtp: {
            host: 'smtp.itevents.fr',
            port: 587,
            auth: {
                user: 'no-reply@itevents.fr',
                pass: 'nopeReply'
            }
        },

        bypass: true
    },

    webservice: {
        host: 'testing.ws.itevents.fr',
        port: 443
    }

};

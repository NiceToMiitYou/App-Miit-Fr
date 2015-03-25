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

        sqs: 'prd-miit-fr',
        s3:  'cdn.miit.fr'
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

            host:     process.env.MIIT_MYSQL_HOST,
            port:      3306,
            user:     process.env.MIIT_MYSQL_USER,
            password: process.env.MIIT_MYSQL_PASS,
            database: process.env.MIIT_MYSQL_DB
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

    grunt: {
        _hookTimeout: 1000000
    },

    session: {
        adapter: 'redis',
        host:    'miit-fr.xidhqo.0001.euc1.cache.amazonaws.com',
        port:     6379,
        prefix:  'sess:',
        db:      'app-miit-fr'
    },

    sockets: {
        _hookTimeout:  1000000,
        adapter:      'socket.io-redis',
        host:         'miit-fr.xidhqo.0001.euc1.cache.amazonaws.com',
        port:          6379,
        prefix:       'sock:',
        db:           'app-miit-fr'
    },

    port: 8080,
  
    log: {
        level: "silent"
    }
};

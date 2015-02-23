/**
 * Application
 * 
 * Here is set the configuration of the application
 */

module.exports.application = {

    // redirect url
    redirect: 'http://www.itevents.fr/',

    // Roles list
    roles: {

        choose:     ['ROLE_VIEWER', 'ROLE_MASTER', 'ROLE_LIVE'],

        exclude:    ['ROLE_LOGIN']
    },

    // Events configuration
    events: {

        // Duration of events
        duration: {

            'default':                    24 * 60 * 60 * 1000, // default 24 hours

            'chatroom-new':                     5 * 60 * 1000, // 5 minutes
            
            'live-presentation-next':      6 * 60 * 60 * 1000, // 6 hours
            'live-presentation-previous':  6 * 60 * 60 * 1000, // 6 hours

            'question-presentation-new':   6 * 60 * 60 * 1000, // 6 hours
            'question-presentation-like':  6 * 60 * 60 * 1000  // 6 hours
        },

        // Events name and the rooms where data are send
        rooms: {
            'chatroom-new':               ['ROLE_VIEWER'], // Chat message for viewers only cause master and live don't care of that
            
            'live-presentation-next':     ['ROLE_LOGIN'],  // Live for all connected
            'live-presentation-previous': ['ROLE_LOGIN'],  // Live for all connected
            
            'question-presentation-new':  ['ROLE_VIEWER', 'ROLE_MASTER'], // Live doesn't care of that
            'question-presentation-like': ['ROLE_VIEWER', 'ROLE_MASTER']  // Live doesn't care of that
        },

        // Apply a coefficient on events
        coefficient: {

            'chatroom-new': true
        },
    }
};
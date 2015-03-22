/**
 * Application
 * 
 * Here is set the configuration of the application
 */

module.exports.application = {

    // AWS Settings
    aws: {

        accessKeyId:     'AKIAJBIMFFF22R7E7VYQ',
    
        secretAccessKey: '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',
    
        region:          'eu-central-1'
    },

    // redirect url
    redirect: 'http://miit.events/',

    // Roles list
    roles: {

        choose:     ['ROLE_VIEWER', 'ROLE_MASTER', 'ROLE_LIVE'],

        exclude:    ['ROLE_LOGIN']
    },

    // Events configuration
    events: {

        // Duration of events
        duration: {

            'default':                        24 * 60 * 60 * 1000, // default 24 hours

            'chatroom-new':               2 * 24 * 60 * 60 * 1000, // 2 days
            
            'live-presentation-next':     2 * 24 * 60 * 60 * 1000, // 2 days
            'live-presentation-previous': 2 * 24 * 60 * 60 * 1000, // 2 days

            'question-presentation-new':  2 * 24 * 60 * 60 * 1000, // 2 days
            'question-presentation-like': 2 * 24 * 60 * 60 * 1000  // 2 days
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
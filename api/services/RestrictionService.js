
// Store restrictions to be sure they are found quickly
var restrictions = {};

function checkAccess( restrictionsAll, restrictionsReq, cb ) {

    return cb( 0 === _.intersection( restrictionsAll, restrictionsReq ).length );
}

module.exports = {

    checkAccess: function( conferenceId, restrictionIds, cb ) {
        
        // Check if conference already stored
        if( !restrictions[ conferenceId ] ) {

            // If not, find it
            ConfConference
                .findOne( conferenceId )
                .exec( function( err, conference ) {
                    if( err || !conference ) {

                        return cb( false );
                    }

                    restrictions[ conference.id ] = conference.restrictions;
                    
                    // Remove it after 24 hours
                    setTimeout( function() {

                        delete restrictions[ conferenceId ];
                    }, 24 * 60 * 60 * 1000 );

                    return checkAccess( 
                        restrictions[ conferenceId ],
                        restrictionIds,
                        cb
                    );
                } );

        } else {

            // Or use cache
            return checkAccess( 
                restrictions[ conferenceId ],
                restrictionIds,
                cb
            );
        }
    }
};
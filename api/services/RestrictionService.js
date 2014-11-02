
var conference = { restrictions: [] };

module.exports = {

    initialize: function() {

        ConfConference.findOne( 1 )
            .exec(function(err, model) {

                if( !err && model )
                    conference = model;
        });
    },

    isAllowed: function( restrictionIds ) {
        
        var allowed = true;

        _.forEach(restrictionIds, function( restrictionId ) {

            // If contains a restriction, block
            if( _.contains( conference.restrictions, restrictionId ) ) {

                allowed = false;
            }  
        });

        return allowed;
    }
};
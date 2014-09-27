window.ITStorage = ( function() {
    var db = {};
    var canPersist = false;

    if ( typeof Storage !== "undefined" ) {
        canPersist = true;
    }

    return {
        // Create a storage area
        create: function( name, persist ) {

            // If name is not defined
            if ( !( name in db ) ) {

                // Add a new area in the database
                db[ name ] = ( function() {

                    // define prefix of area for local storage
                    var prefix = 'it-storage-' + name + '-';

                    // Datas of this area
                    var datas = {};

                    return {
                        // Getter for this area
                        get: function( key ) {
                            if ( canPersist && persist ) {

                                // get from localStorage
                                return localStorage.getItem( 'it-storage-' + name + '-' + key );
                            } else {

                                // get from memory
                                return datas[ key ];
                            }
                        },

                        // Setter for this area
                        set: function( key, value ) {
                            if ( canPersist && persist ) {

                                // Store in local storage
                                localStorage.setItem( prefix + key, value );

                            } else {

                                // Store in-memory
                                datas[ key ] = value;
                            }
                        },

                        // Remove for this area
                        remove: function( key ) {
                            if ( canPersist && persist ) {

                                // get from localStorage
                                return localStorage.removeItem( prefix + key );
                            } else {

                                // get from memory
                                delete datas[ key ];
                            }
                        },

                        // Clear this area
                        clear: function() {
                            if ( canPersist && persist ) {

                                // clear this area
                                for ( var key in localStorage ) {

                                    // Check prefix
                                    if ( key.slice( 0, prefix.length ) === prefix ) {
                                        localStorage.removeItem( key );
                                    }
                                }

                            } else {

                                // Clear the data
                                datas = {};
                            }
                        }
                    };
                } )();

                return true;
            }

            return false;
        },

        // Remove a database
        remove: function( name ) {
            // Check if the database exist
            if ( name in db ) {

                db[ name ].clear();

                delete db[ name ];
            }
        },

        // Clear all databases
        clear: function() {
            if ( canPersist ) {
                // Clear localstorage
                localStorage.clear();
            }

            db = {};
        },

        // Make an access to the database
        db: db
    };
} )();

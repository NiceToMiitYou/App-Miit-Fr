window.ITStorage = ( function() {

    var db = {},
        canPersist = false,
        databasesPersisted = {};

    if ( typeof Storage !== "undefined" ) {
        canPersist = true;
    }

    var ithis = {
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

                // Store database
                if ( canPersist && persist ) {

                    // add to the list
                    databasesPersisted[ name ] = name;

                    // store in localStorage
                    localStorage.setItem( '_it-storage-databases', JSON.stringify( databasesPersisted ) );
                }

                return true;
            }

            return false;
        },

        // Remove a database
        remove: function( name ) {
            // Check if the database exist
            if ( name in db ) {

                // Clear database
                db[ name ].clear();

                // Delete indexes
                delete databasesPersisted[ name ];
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

    // Check if there is database persisted
    if ( canPersist && localStorage.getItem( '_it-storage-databases' ) ) {

        try {
            databasesPersisted = JSON.parse( localStorage.getItem( '_it-storage-databases' ) );
        } catch ( e ) {
            console.log( e );
        }

        // list them all
        for ( database in databasesPersisted ) {

            // Recreate the area
            ithis.create( database, true );
        }
    }

    return ithis;
} )();

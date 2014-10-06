window.ITStorage = ( function() {

    var db = {},
        canPersist = false,
        databasesPersisted = {};

    if ( typeof Storage !== "undefined" ) {
        canPersist = true;
    }

    function asyncBinding( cb, value ) {

        // Asynchronous callback
        setTimeout( function() {
            if ( cb ) {

                // Call the binding
                cb( value );
            }
        }, 10 );
    };

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

                    // Bindings
                    var bindings = {};

                    return {
                        // Bind value
                        bind: function( key, direct, cb ) {

                            if ( typeof direct === 'function' ) {
                                // swap function
                                cb = direct;

                                // set default
                                direct = false;
                            }

                            if ( typeof cb === 'function' ) {
                                // set the binding
                                bindings[ key ] = cb;
                            }

                            if ( direct === true ) {
                                asyncBinding( cb, this.get( key ) );
                            }
                        },

                        // Unbind value
                        unbind: function( key ) {

                            // unset the binding
                            delete bindings[ key ];

                        },

                        // Getter for this area
                        get: function( key ) {
                            if ( canPersist && persist ) {
                                try {
                                    // get from sessionStorage
                                    return JSON.parse( sessionStorage.getItem( 'it-storage-' + name + '-' + key ) );
                                } catch ( e ) {}
                            } else {

                                // get from memory
                                return datas[ key ];
                            }
                        },

                        // Setter for this area
                        set: function( key, value ) {
                            if ( canPersist && persist ) {

                                // Store in local storage
                                sessionStorage.setItem( prefix + key, JSON.stringify( value ) );

                            } else {

                                // Store in-memory
                                datas[ key ] = value;
                            }

                            // Call callback
                            asyncBinding( bindings[ key ], value );
                        },

                        // Remove for this area
                        remove: function( key ) {
                            if ( canPersist && persist ) {

                                // get from sessionStorage
                                return sessionStorage.removeItem( prefix + key );
                            } else {

                                // get from memory
                                delete datas[ key ];
                            }
                        },

                        // For each
                        each: function( cb ) {
                            if ( typeof cb !== 'function' )
                                return;

                            if ( canPersist && persist ) {
                                // Get all keys
                                for ( var key in sessionStorage ) {

                                    // Check prefix
                                    if ( key.slice( 0, prefix.length ) === prefix ) {

                                        key = key.replace( prefix , '');

                                        cb( key, this.get( key ) );
                                    }
                                }

                            } else {
                                // Normal value
                                for ( var key in datas ) {
                                    // Handle
                                    cb( key, this.get( key ) );
                                }
                            }
                        },

                        // Clear this area
                        clear: function() {
                            if ( canPersist && persist ) {

                                // clear this area
                                for ( var key in sessionStorage ) {

                                    // Check prefix
                                    if ( key.slice( 0, prefix.length ) === prefix ) {
                                        sessionStorage.removeItem( key );
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

                    // store in sessionStorage
                    sessionStorage.setItem( '_it-storage-databases', JSON.stringify( databasesPersisted ) );
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

                // Update databases from
                sessionStorage.setItem( '_it-storage-databases', JSON.stringify( databasesPersisted ) );
            }
        },

        // Clear all databases
        clear: function() {

            if ( canPersist ) {

                // Clear sessionStorage
                sessionStorage.clear();
            }

            db = {};
        },

        // Make an access to the database
        db: db
    };

    // Check if there is database persisted
    if ( canPersist && sessionStorage.getItem( '_it-storage-databases' ) ) {

        try {
            databasesPersisted = JSON.parse( sessionStorage.getItem( '_it-storage-databases' ) );
        } catch ( e ) {}

        // list them all
        for ( database in databasesPersisted ) {

            // Recreate the area
            ithis.create( database, true );
        }
    }

    return ithis;
} )();

"use strict";

window.MiitGarbage = ( function() { 

    var garbageId,

        defaultTime = 60 * 1000,

        minTime = defaultTime / 6,
        maxTime = 6 * defaultTime,

        garbageTime = defaultTime;

    var garbageCallbacks = [];

    // Function that update iteration time
    function updateIterationTime( counter ) {

        if( counter > 0 ) {

            // Downgrade time by 5% depends on counter
            garbageTime *= Math.pow( 0.95, counter );

            // check if not less than min
            garbageTime = Math.round( Math.max( garbageTime, minTime ) );

        } else {

            // Upgrade time by 15%
            garbageTime *= 1.15;

            // Check if not upper than the max
            garbageTime = Math.round( Math.min( garbageTime, maxTime ) );
        }
    }

    // An iteration of the garbage
    function garbageIteration() {

        // Store count of removed
        var removed = 0;

        // Call each cleaner
        for ( var indexCallback in garbageCallbacks ) {

            // Clean with callback
            var removedThisTime = garbageCallbacks[indexCallback]();

            // Check if it's a number
            if (typeof removedThisTime === 'number' && removedThisTime > 0) {

                // Increase counter
                removed += removedThisTime;
            }
        }

        // Calculate time for next iteration
        updateIterationTime( removed );

        // Recall for next iteration
        garbageCollector();
    }

    // Call the garbage collector
    function garbageCollector() {

        clearTimeout( garbageId );

        garbageId = setTimeout(garbageIteration , garbageTime);
    }

    // Start the garbage collector
    garbageCollector();

    return {

        // Add a cleaner to the garbage collector
        add: function( cleaner ) {

            if ( typeof cleaner === 'function' ) {

                garbageCallbacks.push( cleaner );
            }
        }
    };
} )();

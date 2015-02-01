"use strict";

var urlThisScriptWasFetchedFrom = ( function() {
    if (
        typeof window !== 'object' ||
        typeof window.document !== 'object' ||
        typeof window.document.getElementsByTagName !== 'function'
    ) {
        return '';
    }

    // Return the URL of the last script loaded (i.e. this one)
    // (this must run before nextTick; see http://stackoverflow.com/a/2976714/486547)
    var allScriptsCurrentlyInDOM = window.document.getElementsByTagName( 'script' );
    var thisScript = allScriptsCurrentlyInDOM[ allScriptsCurrentlyInDOM.length - 1 ];
    return thisScript.src;
} )();

window.ITEventDebug = urlThisScriptWasFetchedFrom.match( /(\#production|\.min\.js)/ ) ? false : true;
"use strict";

var urlThisScriptWasFetchedFrom = ( function() {
    if (
        typeof window !== 'object' ||
        typeof window.document !== 'object' ||
        typeof window.document.getElementsByTagName !== 'function'
    ) {
        return '';
    }

    var allScriptsCurrentlyInDOM = window.document.getElementsByTagName( 'script' );
    var thisScript = allScriptsCurrentlyInDOM[ allScriptsCurrentlyInDOM.length - 1 ];
    return thisScript.src;
} )();

window.ITEventDebug = true; /* TEMPORARY DISABLE urlThisScriptWasFetchedFrom.match( /(\#production|\.min\.js)/ ) ? false : true; */
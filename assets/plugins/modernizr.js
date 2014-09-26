window.Modernizr = function( e, l, t ) {
    function n( e ) {
        b.cssText = e
    }

    function i( e, l ) {
        return n( E.join( e + ";" ) + ( l || "" ) )
    }

    function a( e, l ) {
        return typeof e === l
    }

    function o( e, l ) {
        return !!~( "" + e )
            .indexOf( l )
    }

    function r( e, l ) {
        for ( var n in e ) {
            var i = e[ n ];
            if ( !o( i, "-" ) && b[ i ] !== t ) return "pfx" == l ? i : !0
        }
        return !1
    }

    function s( e, l, n ) {
        for ( var i in e ) {
            var o = l[ e[ i ] ];
            if ( o !== t ) return n === !1 ? e[ i ] : a( o, "function" ) ? o.bind( n || l ) : o
        }
        return !1
    }

    function c( e, l, t ) {
        var n = e.charAt( 0 )
            .toUpperCase() + e.slice( 1 ),
            i = ( e + " " + _.join( n + " " ) + n )
            .split( " " );
        return a( l, "string" ) || a( l, "undefined" ) ? r( i, l ) : ( i = ( e + " " + S.join( n + " " ) + n )
            .split( " " ), s( i, l, t ) )
    }

    function u() {
        p.input = function( t ) {
            for ( var n = 0, i = t.length; i > n; n++ ) O[ t[ n ] ] = t[ n ] in C;
            return O.list && ( O.list = !!l.createElement( "datalist" ) && !!e.HTMLDataListElement ), O
        }( "autocomplete autofocus list placeholder max min multiple pattern required step".split( " " ) ), p.inputtypes = function( e ) {
            for ( var n, i, a, o = 0, r = e.length; r > o; o++ ) C.setAttribute( "type", i = e[ o ] ), n = "text" !== C.type, n && ( C.value = T, C.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test( i ) && C.style.WebkitAppearance !== t ? ( g.appendChild( C ), a = l.defaultView, n = a.getComputedStyle && "textfield" !== a.getComputedStyle( C, null )
                .WebkitAppearance && 0 !== C.offsetHeight, g.removeChild( C ) ) : /^(search|tel)$/.test( i ) || ( n = /^(url|email)$/.test( i ) ? C.checkValidity && C.checkValidity() === !1 : C.value != T ) ), k[ e[ o ] ] = !!n;
            return k
        }( "search tel url email datetime date month week time datetime-local number range color".split( " " ) )
    }
    var d, h, f = "2.6.2",
        p = {},
        m = !0,
        g = l.documentElement,
        v = "modernizr",
        y = l.createElement( v ),
        b = y.style,
        C = l.createElement( "input" ),
        T = ":)",
        w = {}.toString,
        E = " -webkit- -moz- -o- -ms- ".split( " " ),
        D = "Webkit Moz O ms",
        _ = D.split( " " ),
        S = D.toLowerCase()
        .split( " " ),
        I = {
            svg: "http://www.w3.org/2000/svg"
        },
        x = {},
        k = {},
        O = {},
        R = [],
        M = R.slice,
        N = function( e, t, n, i ) {
            var a, o, r, s, c = l.createElement( "div" ),
                u = l.body,
                d = u || l.createElement( "body" );
            if ( parseInt( n, 10 ) )
                for ( ; n--; ) r = l.createElement( "div" ), r.id = i ? i[ n ] : v + ( n + 1 ), c.appendChild( r );
            return a = [ "&#173;", '<style id="s', v, '">', e, "</style>" ].join( "" ), c.id = v, ( u ? c : d )
                .innerHTML += a, d.appendChild( c ), u || ( d.style.background = "", d.style.overflow = "hidden", s = g.style.overflow, g.style.overflow = "hidden", g.appendChild( d ) ), o = t( c, e ), u ? c.parentNode.removeChild( c ) : ( d.parentNode.removeChild( d ), g.style.overflow = s ), !!o
        },
        L = function() {
            function e( e, i ) {
                i = i || l.createElement( n[ e ] || "div" ), e = "on" + e;
                var o = e in i;
                return o || ( i.setAttribute || ( i = l.createElement( "div" ) ), i.setAttribute && i.removeAttribute && ( i.setAttribute( e, "" ), o = a( i[ e ], "function" ), a( i[ e ], "undefined" ) || ( i[ e ] = t ), i.removeAttribute( e ) ) ), i = null, o
            }
            var n = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return e
        }(),
        A = {}.hasOwnProperty;
    h = a( A, "undefined" ) || a( A.call, "undefined" ) ? function( e, l ) {
        return l in e && a( e.constructor.prototype[ l ], "undefined" )
    } : function( e, l ) {
        return A.call( e, l )
    }, Function.prototype.bind || ( Function.prototype.bind = function( e ) {
        var l = this;
        if ( "function" != typeof l ) throw new TypeError;
        var t = M.call( arguments, 1 ),
            n = function() {
                if ( this instanceof n ) {
                    var i = function() {};
                    i.prototype = l.prototype;
                    var a = new i,
                        o = l.apply( a, t.concat( M.call( arguments ) ) );
                    return Object( o ) === o ? o : a
                }
                return l.apply( e, t.concat( M.call( arguments ) ) )
            };
        return n
    } ), x.flexbox = function() {
        return c( "flexWrap" )
    }, x.flexboxlegacy = function() {
        return c( "boxDirection" )
    }, x.canvas = function() {
        var e = l.createElement( "canvas" );
        return !!e.getContext && !!e.getContext( "2d" )
    }, x.canvastext = function() {
        return !!p.canvas && !!a( l.createElement( "canvas" )
            .getContext( "2d" )
            .fillText, "function" )
    }, x.webgl = function() {
        return !!e.WebGLRenderingContext
    }, x.touch = function() {
        var t;
        return "ontouchstart" in e || e.DocumentTouch && l instanceof DocumentTouch ? t = !0 : N( [ "@media (", E.join( "touch-enabled),(" ), v, ")", "{#modernizr{top:9px;position:absolute}}" ].join( "" ), function( e ) {
            t = 9 === e.offsetTop
        } ), t
    }, x.geolocation = function() {
        return "geolocation" in navigator
    }, x.postmessage = function() {
        return !!e.postMessage
    }, x.websqldatabase = function() {
        return !!e.openDatabase
    }, x.indexedDB = function() {
        return !!c( "indexedDB", e )
    }, x.hashchange = function() {
        return L( "hashchange", e ) && ( l.documentMode === t || l.documentMode > 7 )
    }, x.history = function() {
        return !!e.history && !!history.pushState
    }, x.draganddrop = function() {
        var e = l.createElement( "div" );
        return "draggable" in e || "ondragstart" in e && "ondrop" in e
    }, x.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e
    }, x.rgba = function() {
        return n( "background-color:rgba(150,255,150,.5)" ), o( b.backgroundColor, "rgba" )
    }, x.hsla = function() {
        return n( "background-color:hsla(120,40%,100%,.5)" ), o( b.backgroundColor, "rgba" ) || o( b.backgroundColor, "hsla" )
    }, x.multiplebgs = function() {
        return n( "background:url(https://),url(https://),red url(https://)" ), /(url\s*\(.*?){3}/.test( b.background )
    }, x.backgroundsize = function() {
        return c( "backgroundSize" )
    }, x.borderimage = function() {
        return c( "borderImage" )
    }, x.borderradius = function() {
        return c( "borderRadius" )
    }, x.boxshadow = function() {
        return c( "boxShadow" )
    }, x.textshadow = function() {
        return "" === l.createElement( "div" )
            .style.textShadow
    }, x.opacity = function() {
        return i( "opacity:.55" ), /^0.55$/.test( b.opacity )
    }, x.cssanimations = function() {
        return c( "animationName" )
    }, x.csscolumns = function() {
        return c( "columnCount" )
    }, x.cssgradients = function() {
        var e = "background-image:",
            l = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            t = "linear-gradient(left top,#9f9, white);";
        return n( ( e + "-webkit- ".split( " " )
                .join( l + e ) + E.join( t + e ) )
            .slice( 0, -e.length ) ), o( b.backgroundImage, "gradient" )
    }, x.cssreflections = function() {
        return c( "boxReflect" )
    }, x.csstransforms = function() {
        return !!c( "transform" )
    }, x.csstransforms3d = function() {
        var e = !!c( "perspective" );
        return e && "webkitPerspective" in g.style && N( "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function( l ) {
            e = 9 === l.offsetLeft && 3 === l.offsetHeight
        } ), e
    }, x.csstransitions = function() {
        return c( "transition" )
    }, x.fontface = function() {
        var e;
        return N( '@font-face {font-family:"font";src:url("https://")}', function( t, n ) {
            var i = l.getElementById( "smodernizr" ),
                a = i.sheet || i.styleSheet,
                o = a ? a.cssRules && a.cssRules[ 0 ] ? a.cssRules[ 0 ].cssText : a.cssText || "" : "";
            e = /src/i.test( o ) && 0 === o.indexOf( n.split( " " )[ 0 ] )
        } ), e
    }, x.generatedcontent = function() {
        var e;
        return N( [ "#", v, "{font:0/0 a}#", v, ':after{content:"', T, '";visibility:hidden;font:3px/1 a}' ].join( "" ), function( l ) {
            e = l.offsetHeight >= 3
        } ), e
    }, x.video = function() {
        var e = l.createElement( "video" ),
            t = !1;
        try {
            ( t = !!e.canPlayType ) && ( t = new Boolean( t ), t.ogg = e.canPlayType( 'video/ogg; codecs="theora"' )
                .replace( /^no$/, "" ), t.h264 = e.canPlayType( 'video/mp4; codecs="avc1.42E01E"' )
                .replace( /^no$/, "" ), t.webm = e.canPlayType( 'video/webm; codecs="vp8, vorbis"' )
                .replace( /^no$/, "" ) )
        } catch ( n ) {}
        return t
    }, x.audio = function() {
        var e = l.createElement( "audio" ),
            t = !1;
        try {
            ( t = !!e.canPlayType ) && ( t = new Boolean( t ), t.ogg = e.canPlayType( 'audio/ogg; codecs="vorbis"' )
                .replace( /^no$/, "" ), t.mp3 = e.canPlayType( "audio/mpeg;" )
                .replace( /^no$/, "" ), t.wav = e.canPlayType( 'audio/wav; codecs="1"' )
                .replace( /^no$/, "" ), t.m4a = ( e.canPlayType( "audio/x-m4a;" ) || e.canPlayType( "audio/aac;" ) )
                .replace( /^no$/, "" ) )
        } catch ( n ) {}
        return t
    }, x.localstorage = function() {
        try {
            return localStorage.setItem( v, v ), localStorage.removeItem( v ), !0
        } catch ( e ) {
            return !1
        }
    }, x.sessionstorage = function() {
        try {
            return sessionStorage.setItem( v, v ), sessionStorage.removeItem( v ), !0
        } catch ( e ) {
            return !1
        }
    }, x.webworkers = function() {
        return !!e.Worker
    }, x.applicationcache = function() {
        return !!e.applicationCache
    }, x.svg = function() {
        return !!l.createElementNS && !!l.createElementNS( I.svg, "svg" )
            .createSVGRect
    }, x.inlinesvg = function() {
        var e = l.createElement( "div" );
        return e.innerHTML = "<svg/>", ( e.firstChild && e.firstChild.namespaceURI ) == I.svg
    }, x.smil = function() {
        return !!l.createElementNS && /SVGAnimate/.test( w.call( l.createElementNS( I.svg, "animate" ) ) )
    }, x.svgclippaths = function() {
        return !!l.createElementNS && /SVGClipPath/.test( w.call( l.createElementNS( I.svg, "clipPath" ) ) )
    };
    for ( var K in x ) h( x, K ) && ( d = K.toLowerCase(), p[ d ] = x[ K ](), R.push( ( p[ d ] ? "" : "no-" ) + d ) );
    return p.input || u(), p.addTest = function( e, l ) {
            if ( "object" == typeof e )
                for ( var n in e ) h( e, n ) && p.addTest( n, e[ n ] );
            else {
                if ( e = e.toLowerCase(), p[ e ] !== t ) return p;
                l = "function" == typeof l ? l() : l, "undefined" != typeof m && m && ( g.className += " " + ( l ? "" : "no-" ) + e ), p[ e ] = l
            }
            return p
        }, n( "" ), y = C = null,
        function( e, l ) {
            function t( e, l ) {
                var t = e.createElement( "p" ),
                    n = e.getElementsByTagName( "head" )[ 0 ] || e.documentElement;
                return t.innerHTML = "x<style>" + l + "</style>", n.insertBefore( t.lastChild, n.firstChild )
            }

            function n() {
                var e = v.elements;
                return "string" == typeof e ? e.split( " " ) : e
            }

            function i( e ) {
                var l = g[ e[ p ] ];
                return l || ( l = {}, m++, e[ p ] = m, g[ m ] = l ), l
            }

            function a( e, t, n ) {
                if ( t || ( t = l ), u ) return t.createElement( e );
                n || ( n = i( t ) );
                var a;
                return a = n.cache[ e ] ? n.cache[ e ].cloneNode() : f.test( e ) ? ( n.cache[ e ] = n.createElem( e ) )
                    .cloneNode() : n.createElem( e ), a.canHaveChildren && !h.test( e ) ? n.frag.appendChild( a ) : a
            }

            function o( e, t ) {
                if ( e || ( e = l ), u ) return e.createDocumentFragment();
                t = t || i( e );
                for ( var a = t.frag.cloneNode(), o = 0, r = n(), s = r.length; s > o; o++ ) a.createElement( r[ o ] );
                return a
            }

            function r( e, l ) {
                l.cache || ( l.cache = {}, l.createElem = e.createElement, l.createFrag = e.createDocumentFragment, l.frag = l.createFrag() ), e.createElement = function( t ) {
                    return v.shivMethods ? a( t, e, l ) : l.createElem( t )
                }, e.createDocumentFragment = Function( "h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n()
                    .join()
                    .replace( /\w+/g, function( e ) {
                        return l.createElem( e ), l.frag.createElement( e ), 'c("' + e + '")'
                    } ) + ");return n}" )( v, l.frag )
            }

            function s( e ) {
                e || ( e = l );
                var n = i( e );
                return v.shivCSS && !c && !n.hasCSS && ( n.hasCSS = !!t( e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}" ) ), u || r( e, n ), e
            }
            var c, u, d = e.html5 || {},
                h = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                p = "_html5shiv",
                m = 0,
                g = {};
            ! function() {
                try {
                    var e = l.createElement( "a" );
                    e.innerHTML = "<xyz></xyz>", c = "hidden" in e, u = 1 == e.childNodes.length || function() {
                        l.createElement( "a" );
                        var e = l.createDocumentFragment();
                        return "undefined" == typeof e.cloneNode || "undefined" == typeof e.createDocumentFragment || "undefined" == typeof e.createElement
                    }()
                } catch ( t ) {
                    c = !0, u = !0
                }
            }();
            var v = {
                elements: d.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                shivCSS: d.shivCSS !== !1,
                supportsUnknownElements: u,
                shivMethods: d.shivMethods !== !1,
                type: "default",
                shivDocument: s,
                createElement: a,
                createDocumentFragment: o
            };
            e.html5 = v, s( l )
        }( this, l ), p._version = f, p._prefixes = E, p._domPrefixes = S, p._cssomPrefixes = _, p.hasEvent = L, p.testProp = function( e ) {
            return r( [ e ] )
        }, p.testAllProps = c, p.testStyles = N, g.className = g.className.replace( /(^|\s)no-js(\s|$)/, "$1$2" ) + ( m ? " js " + R.join( " " ) : "" ), p
}( this, this.document ),
function( e, l, t ) {
    function n( e ) {
        return "[object Function]" == g.call( e )
    }

    function i( e ) {
        return "string" == typeof e
    }

    function a() {}

    function o( e ) {
        return !e || "loaded" == e || "complete" == e || "uninitialized" == e
    }

    function r() {
        var e = v.shift();
        y = 1, e ? e.t ? p( function() {
            ( "c" == e.t ? h.injectCss : h.injectJs )( e.s, 0, e.a, e.x, e.e, 1 )
        }, 0 ) : ( e(), r() ) : y = 0
    }

    function s( e, t, n, i, a, s, c ) {
        function u( l ) {
            if ( !f && o( d.readyState ) && ( b.r = f = 1, !y && r(), d.onload = d.onreadystatechange = null, l ) ) {
                "img" != e && p( function() {
                    T.removeChild( d )
                }, 50 );
                for ( var n in S[ t ] ) S[ t ].hasOwnProperty( n ) && S[ t ][ n ].onload()
            }
        }
        var c = c || h.errorTimeout,
            d = l.createElement( e ),
            f = 0,
            g = 0,
            b = {
                t: n,
                s: t,
                e: a,
                a: s,
                x: c
            };
        1 === S[ t ] && ( g = 1, S[ t ] = [] ), "object" == e ? d.data = t : ( d.src = t, d.type = e ), d.width = d.height = "0", d.onerror = d.onload = d.onreadystatechange = function() {
            u.call( this, g )
        }, v.splice( i, 0, b ), "img" != e && ( g || 2 === S[ t ] ? ( T.insertBefore( d, C ? null : m ), p( u, c ) ) : S[ t ].push( d ) )
    }

    function c( e, l, t, n, a ) {
        return y = 0, l = l || "j", i( e ) ? s( "c" == l ? E : w, e, l, this.i++, t, n, a ) : ( v.splice( this.i++, 0, e ), 1 == v.length && r() ), this
    }

    function u() {
        var e = h;
        return e.loader = {
            load: c,
            i: 0
        }, e
    }
    var d, h, f = l.documentElement,
        p = e.setTimeout,
        m = l.getElementsByTagName( "script" )[ 0 ],
        g = {}.toString,
        v = [],
        y = 0,
        b = "MozAppearance" in f.style,
        C = b && !!l.createRange()
        .compareNode,
        T = C ? f : m.parentNode,
        f = e.opera && "[object Opera]" == g.call( e.opera ),
        f = !!l.attachEvent && !f,
        w = b ? "object" : f ? "script" : "img",
        E = f ? "script" : w,
        D = Array.isArray || function( e ) {
            return "[object Array]" == g.call( e )
        },
        _ = [],
        S = {},
        I = {
            timeout: function( e, l ) {
                return l.length && ( e.timeout = l[ 0 ] ), e
            }
        };
    h = function( e ) {
        function l( e ) {
            var l, t, n, e = e.split( "!" ),
                i = _.length,
                a = e.pop(),
                o = e.length,
                a = {
                    url: a,
                    origUrl: a,
                    prefixes: e
                };
            for ( t = 0; o > t; t++ ) n = e[ t ].split( "=" ), ( l = I[ n.shift() ] ) && ( a = l( a, n ) );
            for ( t = 0; i > t; t++ ) a = _[ t ]( a );
            return a
        }

        function o( e, i, a, o, r ) {
            var s = l( e ),
                c = s.autoCallback;
            s.url.split( "." )
                .pop()
                .split( "?" )
                .shift(), s.bypass || ( i && ( i = n( i ) ? i : i[ e ] || i[ o ] || i[ e.split( "/" )
                    .pop()
                    .split( "?" )[ 0 ] ] ), s.instead ? s.instead( e, i, a, o, r ) : ( S[ s.url ] ? s.noexec = !0 : S[ s.url ] = 1, a.load( s.url, s.forceCSS || !s.forceJS && "css" == s.url.split( "." )
                    .pop()
                    .split( "?" )
                    .shift() ? "c" : t, s.noexec, s.attrs, s.timeout ), ( n( i ) || n( c ) ) && a.load( function() {
                    u(), i && i( s.origUrl, r, o ), c && c( s.origUrl, r, o ), S[ s.url ] = 2
                } ) ) )
        }

        function r( e, l ) {
            function t( e, t ) {
                if ( e ) {
                    if ( i( e ) ) t || ( d = function() {
                        var e = [].slice.call( arguments );
                        h.apply( this, e ), f()
                    } ), o( e, d, l, 0, c );
                    else if ( Object( e ) === e )
                        for ( s in r = function() {
                            var l, t = 0;
                            for ( l in e ) e.hasOwnProperty( l ) && t++;
                            return t
                        }(), e ) e.hasOwnProperty( s ) && ( !t && !--r && ( n( d ) ? d = function() {
                            var e = [].slice.call( arguments );
                            h.apply( this, e ), f()
                        } : d[ s ] = function( e ) {
                            return function() {
                                var l = [].slice.call( arguments );
                                e && e.apply( this, l ), f()
                            }
                        }( h[ s ] ) ), o( e[ s ], d, l, s, c ) )
                } else !t && f()
            }
            var r, s, c = !!e.test,
                u = e.load || e.both,
                d = e.callback || a,
                h = d,
                f = e.complete || a;
            t( c ? e.yep : e.nope, !!u ), u && t( u )
        }
        var s, c, d = this.yepnope.loader;
        if ( i( e ) ) o( e, 0, d, 0 );
        else if ( D( e ) )
            for ( s = 0; s < e.length; s++ ) c = e[ s ], i( c ) ? o( c, 0, d, 0 ) : D( c ) ? h( c ) : Object( c ) === c && r( c, d );
        else Object( e ) === e && r( e, d )
    }, h.addPrefix = function( e, l ) {
        I[ e ] = l
    }, h.addFilter = function( e ) {
        _.push( e )
    }, h.errorTimeout = 1e4, null == l.readyState && l.addEventListener && ( l.readyState = "loading", l.addEventListener( "DOMContentLoaded", d = function() {
        l.removeEventListener( "DOMContentLoaded", d, 0 ), l.readyState = "complete"
    }, 0 ) ), e.yepnope = u(), e.yepnope.executeStack = r, e.yepnope.injectJs = function( e, t, n, i, s, c ) {
        var u, d, f = l.createElement( "script" ),
            i = i || h.errorTimeout;
        f.src = e;
        for ( d in n ) f.setAttribute( d, n[ d ] );
        t = c ? r : t || a, f.onreadystatechange = f.onload = function() {
            !u && o( f.readyState ) && ( u = 1, t(), f.onload = f.onreadystatechange = null )
        }, p( function() {
            u || ( u = 1, t( 1 ) )
        }, i ), s ? f.onload() : m.parentNode.insertBefore( f, m )
    }, e.yepnope.injectCss = function( e, t, n, i, o, s ) {
        var c, i = l.createElement( "link" ),
            t = s ? r : t || a;
        i.href = e, i.rel = "stylesheet", i.type = "text/css";
        for ( c in n ) i.setAttribute( c, n[ c ] );
        o || ( m.parentNode.insertBefore( i, m ), p( t, 0 ) )
    }
}( this, document ), Modernizr.load = function() {
    yepnope.apply( window, [].slice.call( arguments, 0 ) )
};
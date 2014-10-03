$( function() {

    var $slides = $( "#slides" );

    $( ".flexslider" )
        .flexslider( {
            // itemWidth: $(window).width() - 390,
            // itemMargin: 10,
            animation: "slide",
            //startAt: 6,
            controlNav: false,
            directionNav: false,
            animationLoop: false,
            slideshow: false,
            start: function( slider ) {
                if ( slider.currentSlide == $( ".dot-item" )
                    .length - 1 ) {
                    $( '.flexslider .slides' )
                        .addClass( 'end' );
                }
                $slides.css( {
                    "padding-bottom": $( window )
                        .height() - $slides.height() - 1000
                } );
                $( ".slide" )
                    .height( $slides.height() );
                //$slides.css({"padding-top": 48});
                //"padding-bottom": ($(window).height()/2) - ($slides.height()/2) - 40
            },
            before: function( slider ) {
                $( ".form-wizard-steps .dot-item.active:not([data-number*=" + slider.animatingTo + "])" )
                    .removeClass( "active" )
                $( ".form-wizard-steps .dot-item[data-number*=" + slider.animatingTo + "]" )
                    .addClass( "active" );
            },
            after: function( slider ) {
                $( ".dot-item.active" )
                    .removeClass( "active" )
                $( ".dot-item[data-number*=" + slider.currentSlide + "]" )
                    .addClass( "active" );
            },
            end: function() {
                // $('.flexslider .slides').addClass('end');
            }
        } );

    $( ".slides" )
        .height( $( window )
            .height() - 330 );
    $( '.sn-prev, .sn-next' )
        .on( 'click', function() {
            var data = $( this )
                .attr( 'data' );
            $( ".flexslider" )
                .flexslider( data );
            return false;
        } )

    $( ".dot-item" )
        .on( "click", function() {
            $( ".flexslider" )
                .flexslider( parseInt( $( this )
                    .data( "number" )
                    .toString() ) );
            $( ".sider .dot-item.active" )
                .removeClass( "active" )
            $( this )
                .addClass( "active" );
        } );

    $( ".slider-extra" )
        .on( "click", ".minimize", function() {
            $( ".slider-extra .tab-content" )
                .height( 0 );
            $( ".minimizer" )
                .removeClass( "minimize" )
                .addClass( "grow" );
            $( ".slider-extra li" )
                .addClass( "grow" );
        } );
    $( ".slider-extra" )
        .on( "click", ".grow", function() {
            $( ".slider-extra .tab-content" )
                .height( 213 );
            $( ".grow" )
                .removeClass( "grow" );
            $( ".minimizer" )
                .addClass( "minimize" );
        } );

    // $(".fullscreen").on("click", function() {
    // 	$slides.css({"position":"fixed", "padding-bottom": "0", "top": -768, "z-index": 9999}).animate({"top":10, "bottom":0, "left":0, "right": 0});
    // 	$slides.data("flexslider").resize();
    // 	$(".fullscreen-layer, .close-fs").fadeIn();
    // 	$(".close-fs").css({"z-index": 99999});
    // 	$(".page-content").animate({"margin-left": 0, "margin-right": 0}, function() {
    // 		$(".page-content").css({"overflow": "hidden"});
    // 	});
    // });

    $( ".close-fs" )
        .on( "click", function() {
            $slides.animate( {
                "top": -768
            } );
            $( ".fullscreen-layer, .close-fs" )
                .fadeOut();
            $( ".page-content" )
                .css( {
                    "overflow": "visible"
                } );
            $( ".page-content" )
                .animate( {
                    "margin-left": 200,
                    "margin-right": 170
                }, function() {

                    $slides.css( {
                        "position": "static",
                        "padding-bottom": "-250px"
                    } );
                    $slides.data( "flexslider" )
                        .resize();
                } );
        } );
    $slides.data( "flexslider" )
        .resize();
    var counter = 0;
    var interval = setInterval( function() {
        counter++;
        //var hours = parseInt( counter / 3600 ) % 24;
        var minutes = parseInt( counter / 60 ) % 60;
        var seconds = counter % 60;

        var result = ( minutes < 10 ? "0" + minutes : minutes ) + ":" + ( seconds < 10 ? "0" + seconds : seconds );
        $( ".counter span" )
            .text( result )

    }, 1000 );
} );

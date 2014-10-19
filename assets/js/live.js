var fullscreen;
$( function() {

    var $slides = $( "#slides" );

    $( ".flexslider" )
        .flexslider( {
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
                // $( ".slide" )
                //     .height( $slides.height() );
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
                fullscreen = false;
        } );

        $(".fullscreen").on("click", function() {
            $(".fullscreen-layer, .close-fs").fadeIn("fast", function() {
                $(".page-content").css({"margin-left": 0, "margin-right": 0, "overflow": "hidden"});
                $slides.css({"position":"fixed", "padding-bottom": "0", "top": -768, "z-index": 9999}).animate({"top":0, "bottom":0, "left":0, "right": 0});
                scaleSlider();
                $(".close-fs").css({"z-index": 99999});
                fullscreen = true;
            });
            
            
        });

    $slides.data( "flexslider" )
        .resize();

        scaleSlider();

} );

$(window).resize(function() {
    scaleSlider();
})

function scaleSlider() {
    var slideW = $("#slides").width();
    var slideH = $("#slides").height()

    if(fullscreen) {
        var maxH = ($(".page-content").height() - 50) / slideH;
        var maxW = $("body").width() / slideW ;

    } else {
        var maxH = ($(".page-content").height() - 350) / slideH;
        var maxW = $(".page-content").width() / slideW ;
    }

    $(".live-content .slides-nav").width(slideW*Math.min(maxH, maxW));
    $("#slides").css("zoom", Math.min(maxH, maxW));

}

"use strict";

$(window).resize(function() {
    scaleSlider();
});

Pace.on('hide', function() {
    scaleSlider();
    $('select:not(.select2):not(.delay)').material_select();
    $('.select2').select2();
    $('.modal-trigger').leanModal({
      dismissible: false
    });
    $('.collapsible').collapsible();
});

function scaleSliderBounce() {

    var slideW = $("#slides").width();
    var slideH = $("#slides").height();
    var maxH, maxW;

    var fullscreen = $(".page-container").hasClass('fullscreen') && !$(".page-container").hasClass('fullscreen-remove');
    var isMaster = $(".page-container").hasClass('master');

    if(fullscreen) {
        maxH = $(document).height() / slideH;
        maxW = $(document).width() / slideW ;

    } else if( isMaster ) {
        maxH = ($(".page-content").height()- 290) / slideH;
        maxW = $(".page-content").width() / slideW ;

    } else {
        maxH = ($(document).height() - 300) / slideH;
        maxW = ($(document).width()/2.05) / slideW ;
    }

    var zoom = Math.min(maxH, maxW);
    $(".slider-container").width(slideW*zoom);
    $(".slider-container").height(slideH*zoom);

    var style = '-webkit-transform: scale('+zoom+','+zoom+'); -o-transform: scale('+zoom+','+zoom+'); transform: scale('+zoom+','+zoom+'); -webkit-transform-origin: left top;  transform-origin: left top; -moz-transform:  scale('+zoom+','+zoom+'); -moz-transform-origin: left top';
    $("#slides").attr("style",style);

}

window.scaleSlider = _.debounce(scaleSliderBounce, 150);

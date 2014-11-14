"use strict";

$(window).resize(function() {
    scaleSlider();
});

function scaleSlider() {

    var slideW = $("#slides").width();
    var slideH = $("#slides").height();
    var maxH, maxW;

    var fullscreen = $(".page-container").hasClass('fullscreen');
    var master = $(".page-container").hasClass('master');

    if(fullscreen) {
        maxH = ($(window).height()- 55) / slideH;
        maxW = $(window).width() / slideW ;

    } else if(master) {
        maxH = ($(".page-content").height()- 290) / slideH;
        maxW = $(".page-content").width() / slideW ;

    } else {
        maxH = ($(".page-content").height()/2) / slideH;
        maxW = $(".page-content").width() / slideW ;
    }

    var zoom = Math.min(maxH, maxW);
    $(".slider-container").width(slideW*zoom);
    $(".slider-container").height(slideH*zoom);

    var style = '-webkit-transform: scale('+zoom+','+zoom+'); -o-transform: scale('+zoom+','+zoom+'); transform: scale('+zoom+','+zoom+'); -webkit-transform-origin: left top;  transform-origin: left top; -moz-transform:  scale('+zoom+','+zoom+'); -moz-transform-origin: left top';
    $("#slides").attr("style",style);

}
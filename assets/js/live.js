$(window).resize(function() {
    scaleSlider();
})

function scaleSlider() {

    var slideW = $("#slides").width();
    var slideH = $("#slides").height()

    var fullscreen = $(".page-container").hasClass('fullscreen');
    var master = $(".page-container").hasClass('master');

    if(fullscreen) {
        var maxH = ($(window).height()- 55) / slideH;
        var maxW = $(window).width() / slideW ;

    } else if(master) {
        var maxH = ($(".page-content").height()- 290) / slideH;
        var maxW = $(".page-content").width() / slideW ;

    } 
     else {
        var maxH = ($(".page-content").height()/2) / slideH;
        var maxW = $(".page-content").width() / slideW ;
    }

    var zoom = Math.min(maxH, maxW);
    $(".slider-container").width(slideW*zoom);
    $(".slider-container").height(slideH*zoom);

    var style = '-webkit-transform: scale('+zoom+','+zoom+'); -o-transform: scale('+zoom+','+zoom+'); transform: scale('+zoom+','+zoom+');  transform-origin: left top; -moz-transform:  scale('+zoom+','+zoom+'); -moz-transform-origin: left top';
    $("#slides").attr("style",style);

}
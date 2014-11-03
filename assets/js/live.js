$(window).resize(function() {
    scaleSlider();
})

function scaleSlider() {

    var slideW = $("#slides").width();
    var slideH = $("#slides").height()

    var fullscreen = $(".page-container").hasClass('fullscreen');

    if(fullscreen) {
        var maxH = ($(".page-content").height()- 55) / slideH;
        var maxW = $("body").width() / slideW ;

    } else {
        var maxH = ($(".page-content").height()/2) / slideH;
        var maxW = $(".page-content").width() / slideW ;
    }

    var zoom = Math.min(maxH, maxW);
    $(".live-content .slides-nav").width(slideW*zoom);

    var style = 'zoom: '+zoom+'; -ms-zoom: '+zoom+'; -webkit-zoom: '+zoom+'; -moz-transform:  scale('+zoom+','+zoom+'); -moz-transform-origin: '+ ($(".page-content").width() - (slideW * zoom))*2 +'px top';
    $("#slides").attr("style",style);

}
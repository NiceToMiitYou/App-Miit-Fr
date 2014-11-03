var fullscreen;

$(window).resize(function() {
    scaleSlider();
})

function scaleSlider() {

    var slideW = $("#slides").width();
    var slideH = $("#slides").height()

    fullscreen = $("#slides").hasClass('fullscreen-slide');

    if(fullscreen) {
        var maxH = $(".page-content").height() / slideH;
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

//CIRCULAR MENU

(function(){
 
  var button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper');
 
    //open and close menu when the button is clicked
  var open = false;
  
  if(button) {
    button.addEventListener('click', handler, false);
    button.addEventListener('focus', handler, false); 
  }

  function handler(){
    if(!open){
        $(wrapper).addClass('opened-nav');
        $(button).addClass('open');
    }
    else{
        $(wrapper).removeClass('opened-nav');
        $(button).removeClass('open');
    }
    open = !open;
  }
  function closeWrapper(){
    $(wrapper).removeClass('opened-nav');
  }
 
})();

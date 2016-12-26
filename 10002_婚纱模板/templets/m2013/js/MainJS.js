$('document').ready(function(){  
    /* Configure flexi slider, for more information visit http://flex.madebymufffin.com/ */
    $('.flexslider-nav').flexslider({
        animation: "slide",
        directionNav: false,
        animationLoop: false,
        controlNav: false, 
        slideshow: false,
        animationDuration: 300
    });
                
    $('.flexslider-bgslider').flexslider({
        animation: "slide", // Set "fade" or "slide" for your desire effect
        directionNav: false,
        animationLoop: false,
        controlNav: false, 
        slideshow: true,
        animationDuration: 600
    });
   
    if($('div#MainNav').css("margin-top", "-85px")) // Default hide navigation
        var mytoggle = true;
    
    $('li#RBNShowMenu').click(function(){
        if(mytoggle){
            $('div#MainNav').animate({"margin-top": "0"}, 500);
            mytoggle = false;
        }
        else{
            $('div#MainNav').animate({"margin-top": "-85px"}, 500);
            mytoggle = true;
        }
    });
    
    var options = {}; //You can customize options here - find them at http://www.photoswipe.com/
    $(".TouchGallery").photoSwipe(options);
});
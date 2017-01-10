$(document).ready(function(){

	// Blur images on mouse over
	$(".portfolio a").hover( function(){ 
		$(this).children("img").animate({ opacity: 0.50}, "slow"); 
	}, function(){ 
		$(this).children("img").animate({ opacity: 1.0 }, "fast"); 
	}); 
	
	// Initialize prettyPhoto plugin
	$(".portfolio a[rel^='prettyPhoto']").prettyPhoto({
		theme:'light_square', 
		autoplay_slideshow: false, 
		overlay_gallery: false, 
		show_title: true
	});
	
	// Clone portfolio items to get a second collection for Quicksand plugin
	var $portfolioClone = $(".portfolio").clone();
	
	// Attempt to call Quicksand on every click event handler
	$(".filter a").click(function(e){
		
		$(".filter li").removeClass("current");	
		
		// Get the class attribute value of the clicked link
		var $filterClass = $(this).parent().attr("class");

		if ( $filterClass == "all" ) {
			var $filteredPortfolio = $portfolioClone.find("li");
		} else {
			var $filteredPortfolio = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
		}
		
		// Call quicksand
		$(".portfolio").quicksand( $filteredPortfolio, { 
			duration: 800, 
			easing: 'easeInOutQuad' 
		}, function(){
			
			// Blur newly cloned portfolio items on mouse over and apply prettyPhoto
			$(".portfolio a").hover( function(){ 
				$(this).children("img").animate({ opacity: 0.50 }, "fast"); 
			}, function(){ 
				$(this).children("img").animate({ opacity: 1.0 }, "slow"); 
			}); 
			
			$(".portfolio a[rel^='prettyPhoto']").prettyPhoto({
				theme:'light_square', 
				autoplay_slideshow: false, 
				overlay_gallery: false, 
				show_title: true
			});
		});


		$(this).parent().addClass("current");

		// Prevent the browser jump to the link anchor
		e.preventDefault();
	})
});

// Dropdown
var $ = jQuery.noConflict();
$(document).ready(function() {
		/* for top navigation */
		$(" #nav ul ").css({display: "none"}); // Opera Fix
		$(" #nav li").hover(function(){
		$(this).find('ul:first').css({visibility: "visible",display: "none"}).slideDown(400);
		},function(){
		$(this).find('ul:first').css({visibility: "hidden"});
		});
		$("ul.dropdown li ul li:has(ul)").find("a:first").append(" <span>&rarr;</span> ");		
});

// Map Script
	function initialize() {
        var myOptions = {
          center: new google.maps.LatLng(47.608271,-122.337417),
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            myOptions);
      }
// Tiny Nav
		 $(function () {
		
			  // TinyNav.js 1
			  $('#nav').tinyNav({
				active: 'selected'
			  });
			  
			});
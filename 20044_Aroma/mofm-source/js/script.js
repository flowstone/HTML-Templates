$(document).ready(function(){

	// Blur images on mouse over
	$(".portfolio a").hover( function(){ 
		// $(this).children("img").animate({ opacity: 0.75 }, "fast");
		$(this).children("span.mouseon-portfolio").animate({ opacity: 0.75 }, "fast"); 
		//$(".mouseon-portfolio").mouseover(function(){$(this).fadeTo("slow",0.5);});
	}, function(){ 
		// $(this).children("img").animate({ opacity: 1.0 }, "slow"); 
		$(this).children("span.mouseon-portfolio").animate({ opacity: 0 }, "fast"); 
		//$(".mouseon-portfolio").mouseout(function(){$(this).fadeTo("fast",0);});
	}); 
	
	// Initialize prettyPhoto plugin
	$(".portfolio a[rel^='prettyPhoto']").prettyPhoto({
		theme:'light_square', 
		autoplay_slideshow: false, 
		overlay_gallery: false, 
		show_title: false
	});
	
	$(".portfolio li p").equalHeights(); // Equal the height of p tags after changing portfolio section

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
				// $(this).children("img").animate({ opacity: 0.75 }, "fast"); 
				$(this).children("span.mouseon-portfolio").animate({ opacity: 0.75 }, "fast"); 
			}, function(){ 
				// $(this).children("img").animate({ opacity: 1.0 }, "slow"); 
				$(this).children("span.mouseon-portfolio").animate({ opacity: 0 }, "fast");
			}); 

			$(".portfolio a[rel^='prettyPhoto']").prettyPhoto({
				theme:'light_square', 
				autoplay_slideshow: false, 
				overlay_gallery: false, 
				show_title: false
			});
		});


		$(this).parent().addClass("current");

		// Prevent the browser jump to the link anchor
		e.preventDefault();
	})
});
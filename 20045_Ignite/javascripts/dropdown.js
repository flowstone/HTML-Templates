var $ = jQuery.noConflict();
$(document).ready(function() {
		/* for top navigation */
		$(" .nav ul ").css({display: "none"}); // Opera Fix
		$(" .nav li").hover(function(){
		$(this).find('ul:first').css({visibility: "visible",display: "none"}).slideDown(400);
		},function(){
		$(this).find('ul:first').css({visibility: "hidden"});
		});
		
});		 
	

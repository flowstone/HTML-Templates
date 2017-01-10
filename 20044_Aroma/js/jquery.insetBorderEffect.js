/*
	Author: Robin Thrift
	You are free to use this plug in in any way you want non-commercially and commercially. 
	However if you redistribute (even when altered by you) you have to give credit to me. 
	How you give me credit is up to you. Here are two links you could link off to:
	
	http://www.twitter.com/r0bs3n
	http://rob-thrift.com

	And now have FUN!
	
	Alerations by: Chris Coyier
*/

// allows for use of $ without conflict worries
(function($) {
	
	$.fn.insetBorder = function(options) {
		
		if ((options!=undefined) && (options.inset!=undefined))
		{
			if (options.insetleft==undefined) { options.insetleft = options.inset; }
			if (options.insetright==undefined) { options.insetright = options.inset; }
			if (options.insettop==undefined) { options.insettop = options.inset; }
			if (options.insetbottom==undefined) { options.insetbottom = options.inset; }
		}
		
		// defaults
		options = $.extend({
			speed : 250,
			insetleft : 10,
			insetright : 10,
			insettop : 10,
			insetbottom : 10,
			borderColor : '#ffffff',
			borderType: "solid",
			outerClass : "ibe_outer",
			innerClass : "ibe_inner"
		}, options);
		
		// run plugin on entire jQuery set
		return this.each(function(i) {
				
      var			
  			$el = $(this),
  			ibe_height = $el.outerHeight(),
			  ibe_width = $el.outerWidth();
			
  		var
			  wrapper = $("<div />", {
  			  "class": options.outerClass,
  			  "css"  : {
    				"width": ibe_width,
    				"height": ibe_height,
    				"overflow": "hidden",
    				"top": 0,
    				"left": 0,
    				"position": "relative"
  				},
    		  "mouseenter": function() {
    				  $el
    					 .next()
    					 .animate({
    					   "top": "-" + options.insettop + "px", 
    					   "left": "-" + options.insetleft + "px", 
    					   "height": ibe_height, 
    					   "width": ibe_width, 
    					   "opacity": 0.1
    					 }, {
    					   "duration": options.speed, 
    					   "queue": false,
    					   "complete": function() {
    					   
    					     // BUG: for some reason this is getting called twice.
    					     
    					     // Kinda works... attempt at allowing selectability of main element
    					     // The problem is this only fires on complete but must make visibile on mouseleave no matter what
    					     // $el.next().css("visibility", "hidden");
    					     
    					   }
    					 });
  					 
  				  // on mouseleave
  					},
  					"mouseleave": function() {
  					  
  					  $el
  					     .next()
  					     // .css({
  					     //  "visibility": "visible"
  					     // })
  						   .animate({
  						     "top": 0, 
  						     "left": 0, 
  						     "height": (ibe_height - (options.insettop + options.insetbottom)) + "px", 
  						     "width": (ibe_width - (options.insetleft + options.insetright)) + "px", 
  						     "opacity": 1
  						   }, {
  						    "duration": options.speed, 
  						    "queue": false
  						  });
  						  
  					} 
  				}),
			   
			 after = $("<div />", {
  			  "class": options.innerClass,
  			  "css"  : {
    				"height": (ibe_height - (options.insettop + options.insetbottom)) + "px",
    				"width": (ibe_width - (options.insetleft + options.insetright)) + "px",
    				"border-left": options.insetleft + "px " + options.borderType + " " + options.borderColor,
    				"border-right": options.insetright + "px " + options.borderType + " " + options.borderColor,
    				"border-top": options.insettop + "px " + options.borderType + " " + options.borderColor,
    				"border-bottom": options.insetbottom + "px " + options.borderType + " " + options.borderColor,
    				"position": "absolute",
    				"top": 0,
    				"left": 0
			    }
			   });

			$el.wrap(wrapper).after(after);
			 
		});
				
	};
	
})(jQuery);
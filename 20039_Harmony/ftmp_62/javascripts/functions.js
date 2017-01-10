
/*=============================== global jQuerys=================*/
// respoinsive nav
$(document).ready(function(){

	// building select menu
	$('<select />').appendTo('nav');

	// building an option for select menu
	$('<option />', {
		'selected': 'selected',
		'value' : '',
		'text': 'Choise Page...'
	}).appendTo('nav select');

	$('nav ul li a').each(function(){
		var target = $(this);

		$('<option />', {
			'value' : target.attr('href'),
			'text': target.text()
		}).appendTo('nav select');

	});

	// on clicking on link
	$('nav select').on('change',function(){
		window.location = $(this).find('option:selected').val();
	});

});


//tooltip
$(document).ready(function(){
	$('a[title], button[title]').qtip({ style: { name: 'blue', tip: true } });
});


/*================ end global jQuery ==============*/

$(document).ready(function(){
	$('header div.topSlide a.open').on('click', function(e){
		e.preventDefault();
		$(this).prev('div.topWidget').slideToggle(200);
		$(this).toggleClass('close');
	});
});


$(document).ready(function(){

	$('#latest_tweet ul#twitter_update_list').cycle({
		fx:     'fade', 
	    speed:  'slow', 
	    timeout: 0, 
	    next:   '#latest_tweet div.pagers button.nxt', 
	    prev:   '#latest_tweet div.pagers button.prev' 
	});

});



/*======================== Home page =================*/
$(document).ready(function(){

	var tabDivs = $('aside #tabOuter > div');

	// Tabs on blog page
	tabDivs.hide().filter(':first').show();
	$('aside #tabOuter #tabNav li a').on('click', function(e){
		e.preventDefault();
		tabDivs.hide();
		tabDivs.filter(this.hash).fadeIn(400);
		$('aside #tabOuter #tabNav li a').removeClass('greenBtn').addClass('blueBtn');
		$(this).addClass('greenBtn');

	});
	//end tabs
	
});




// home page flexslider
$(document).ready(function(){

	$('#features').flexslider({
		keyboardNav: true,
		slideshow: true,
		randomize: false,
		slideDirection: "horizontal",
		animationDuration: 600
	});

});



$(document).ready(function(){

	$('#latestFolio').waitForImages(function(){

		$('#latestFolio div.latestFolioSlider')
		.cycle({
			fx:     'fade', 
		    speed:  'slow',
		    timeout: 4000,
		    pause : true,
		    next:   '#latestFolio div.pagers button.nxt', 
		    prev:   '#latestFolio div.pagers button.prev' 
		});
	
	});
		
});



$(document).ready(function(){
	// latest portfolio in home page
	$('#latestFolio ul li').hover(

		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:1}, 300)
				.next('div.folioImg')
				.children('a').animate({opacity:.5}, 300);
		},
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:0}, 300)
				.next('div.folioImg')
				.children('a').animate({opacity:1}, 300);
		}

	);
	
});


$(document).ready(function(){

	$('article div.folio').hover(
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:1}, 300)
				.next('div.folioImg')
				.animate({opacity:.6}, 300);
		},
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:0}, 300)
				.animate({opacity:0}, 10)
				.next('div.folioImg')
				.animate({opacity:1}, 300);
		}
	);

});



/*============ end home page =============*/



/*=================== all portfolio pages ==================*/

$(document).ready(function(){
	// portfolio in portfolio_one page
	$('#oneFolio div.folioContainer div.folioImg').hover(

		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:1}, 300)
				.next('div.folio')
				.animate({opacity:.6}, 300);
		},
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:0}, 300)
				.next('div.folio')
				.animate({opacity:1}, 300);
		}

	);
	
});

$(document).ready(function(){
	// portfolio in portfolio_list page
	$('#listFolio div.folioContainer div.folioImg').hover(

		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:1}, 300)
				.next('div.folio')
				.animate({opacity:.6}, 300);
		},
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:0}, 300)
				.animate({opacity:0}, 50)
				.next('div.folio')
				.animate({opacity:1}, 300);
		}

	);
	
});

$(document).ready(function(){
	// portfolio in portfolio_two page
	$('#twoFolio div.folioHolder div.folio').hover(

		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:1}, 300)
				.next('div.folioImg')
				.animate({opacity:.6}, 300);
		},
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:0}, 300)
				.animate({opacity:0}, 10)
				.next('div.folioImg')
				.animate({opacity:1}, 300);
		}

	);
	
});

$(document).ready(function(){
	// portfolio in portfolio_three page
	$('#threeFolio ul li, #fourFolio ul li').hover(

		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:1}, 300)
				.next('div.folio')
				.children('a').animate({opacity:.5}, 300);
		},
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:0}, 300)
				.animate({opacity:0}, 10)
				.next('div.folio')
				.children('a').animate({opacity:1}, 300);
		}

	);
	
});


$(document).ready(function(){
	// portfolio in portfolio_four page
	$('#fourFolio div.folioOuter').hover(

		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:1}, 300)
				.next('div.folio')
				.children('a').animate({opacity:.5}, 300);
		},
		function(){
			$(this).find('div.setting')
				.stop().animate({opacity:0}, 300)
				.animate({opacity:0}, 10)
				.next('div.folio')
				.children('a').animate({opacity:1}, 300);
		}

	);
	
});

/*================== end portfolio pages ==============*/



/*============================= About Page ==================*/

$(document).ready(function(){
	// Our team slider

	$('#team').waitForImages(function(){

		$('#team div.teamSlider').cycle({ 
			fx    : 'fade',
			speed : 'slow',
			timeout: 4000,
		    pause : true,
		    next  : 'div.pagers button.nxt', 
		    prev  : 'div.pagers button.prev'

		});

	});
	
});


$(document).ready(function(){
	// fade testimonilas div in about page
	$('aside div.test div.testSlider').cycle({ 
		fx    : 'fade',
		speed : 'slow',
		timeout: 4000,
	    pause : true,
	    next  : 'div.test div.pagers button.nxt', 
	    prev  : 'div.test div.pagers button.prev'

	});
	
});



// flexslider in about page
$(document).ready(function(){
	
	$('#leftContent div.workSpace div.flexslider').flexslider({
		directionNav: false
	});
	
});


/*=============== end about page ==================*/



/*================== blog page =================*/

$(document).ready(function(){

	$('#leftSide article div.articleBody div.img_hold').waitForImages(function(){

		$('#leftSide article div.articleBody div.img_hold div.flexslider')
		.flexslider({
			//pager: true
		});

	});

});


// blog page accordain
$(document).ready(function(){
	//accordian in blog and post pages
	$('aside #popular div:not(:first)').hide();
	$('aside #popular h4 a').click(function(e){
		e.preventDefault();
		$('aside #popular h4').removeClass('active');
		$('aside #popular div').slideUp('fast');
		$(this).parents('h4').addClass('active');
		$(this).parents('h4').next('div').slideDown('fast');

	});
	
});


// blog page tabs
$(document).ready(function(){

	$('aside #archTags div.tabs ul li a').click(function(e){
		e.preventDefault();
		$('aside #archTags div.tabs div').hide();
		$('aside #archTags div.tabs div').filter(this.hash).fadeIn(400);
		$('aside #archTags div.tabs ul li a').removeClass('active');
		$(this).addClass('active');
	}).filter(':first').click();
	
});




/*============== end blog page ================*/



/*===================== services page ===================*/

$(document).ready(function(){

	var viewWidth = $(window).width(); 

	if(viewWidth <= 959 & viewWidth > 767) {
	
		// slide the client section to the left and right in serices page
		$('#clients div.clientSlider')
		.jCarouselLite({
			btnNext : "#clients 'div.pagers button.nxt'",
			btnPrev : "#clients 'div.pagers button.prev",
			visible: 3,
			speed   : 500

		});
		
	} else if(viewWidth <= 767 & viewWidth > 479) {
	
		// slide the client section to the left and right in serices page
		$('#clients div.clientSlider')
		.jCarouselLite({
			btnNext : "#clients 'div.pagers button.nxt'",
			btnPrev : "#clients 'div.pagers button.prev",
			visible: 1,
			speed   : 500

		});
		
	} else if(viewWidth <= 479) {
	
		// slide the client section to the left and right in serices page
		$('#clients div.clientSlider')
		.jCarouselLite({
			btnNext : "#clients 'div.pagers button.nxt'",
			btnPrev : "#clients 'div.pagers button.prev",
			visible: 1,
			speed   : 500

		});
	
	} else {
	
		// slide the client section to the left and right in serices page
		$('#clients div.clientSlider')
		.jCarouselLite({
			btnNext : "#clients 'div.pagers button.nxt'",
			btnPrev : "#clients 'div.pagers button.prev",
			visible: 4,
			speed   : 500

		});
	
	}
	
});


/*============= end services page ===============*/



/*======================= faq! page ======================*/

$(document).ready(function(){
	//accordian in FAQ! page
	$('#leftSide h5 a').click(function(e){
		e.preventDefault();
		$(this).parents('h5')
				.toggleClass('active')
				.next('div')
				.slideToggle('fast');

	});
	
});


$(document).ready(function(){
    
	//catch the click event on all anchor links
	$('aside div.faqCategory ul li h4 a').click(function(){
	
		// make sure if it hsa hash
		if( this.hash ) {
			//get rid of hash(#) sign
			var hash = this.hash.substr(1);
			//get the position of the element <a name>
			var $toElement = $('a[name='+hash+']');
			var toPosition = $toElement.offset().top;
			//scrolling/animating to that element
			$('html, body').animate({
				scrollTop : toPosition
			}, 900);
			//don't jump the pages/reload the page
			return false;
		}
		
	});
	if( location.hash ) {
		var hash = location.hash;
		window.scroll(0,0);
		$('a[href='+hash+']').click();
	}//end

});



$(document).ready(function(){

	$('a[href="#top"]').click(function(e){
		e.preventDefault();
		$('html, body').animate({ scrollTop: 0 }, 500);
	});

});

/*================== end faq! page ==================*/



/*======================= features page ===================*/

// features page accordains--- the alyways one opened window
$(document).ready(function(){
	$('#accordians div.with-open-window div:not(:first)').hide();
	$('#accordians div.with-open-window h4 a').click(function(e){
		e.preventDefault();
		$('#accordians div.with-open-window h4').removeClass('active');
		$('#accordians div.with-open-window div').slideUp('fast');
		$(this).parents('h4').addClass('active');
		$(this).parents('h4').next('div').slideDown('fast');

	});
	
});


// features page accordains--- with option to close all windows
$(document).ready(function(){
	$('#accordians div.with-closed-window div').hide();
	$('#accordians div.with-closed-window h4 a').click(function(e){
		e.preventDefault();
		$(this).parent('h4').next("div").slideToggle("fast").siblings("div:visible").slideUp("fast");
		$(this).parent('h4').toggleClass("active");
		$(this).parent('h4').siblings().removeClass("active");
	});
	
});


// features page tabs
$(document).ready(function(){

	$('#feature_tabs div.tabs ul li a').click(function(e){
		e.preventDefault();
		$('#feature_tabs div.tabs div').hide();
		$('#feature_tabs div.tabs div').filter(this.hash).fadeIn(400);
		$('#feature_tabs div.tabs ul li a').removeClass('active');
		$(this).addClass('active');
	}).filter(':first').click();
	
});


/*================== end features page =============*/



/*=================== fancybox plugin ==================*/

$(document).ready(function(){
	// fancybox photo
	$('a[rel=fancybox]').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		prevEffect	: 'none',
		nextEffect	: 'none',
		closeBtn	: false,

		helpers		: {
			buttons	: {},
			overlay : {
				css : {
					'background-color' : '#eee'
				}
			}
		}
	});
	// end fancybox
	
});
/*================== end fancybox ==================*/


/*============== placeholder croos browsers ====================*/

$(document).ready(function() {

	// Removing the placeholder on focus state in webkit(googl chrome) browsers
	if ($.browser.webkit) {

		$('input, textarea').on('focus',function(){

			if ( $(this).attr('placeholder') ) $(this).data('placeholder', 
			$(this).attr('placeholder')).removeAttr('placeholder');

		}).on('blur', function(){

			if ( $(this).data('placeholder') ) $(this).attr('placeholder', 
			$(this).data('placeholder')).removeData('placeholder');

		});

	}

});




$('[placeholder]').focus(function() {
  var input = $(this);
  if (input.val() == input.attr('placeholder')) {
    input.val('');
    input.removeClass('placeholder');
  }
}).blur(function() {
  var input = $(this);
  if (input.val() == '' || input.val() == input.attr('placeholder')) {
    input.addClass('placeholder');
    input.val(input.attr('placeholder'));
  }
}).blur();



$('[placeholder]').parents('form').submit(function() {
  $(this).find('[placeholder]').each(function() {
    var input = $(this);
    if (input.val() == input.attr('placeholder')) {
      input.val('');
    }
  })
});



/*=============== end placeholder ==============*/









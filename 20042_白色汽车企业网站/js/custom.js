$(function(){
	$('#contactable').contactable({subject: 'feedback URL:'+location.href});
});

function mycarousel_initCallback(carousel)
	{
		// Disable autoscrolling if the user clicks the prev or next button.
		carousel.buttonNext.bind('click', function() {
			carousel.startAuto(0);
		});
		carousel.buttonPrev.bind('click', function() {
			carousel.startAuto(0);
		});
		// Pause autoscrolling if the user moves with the cursor over the clip.
		carousel.clip.hover(function() {
			carousel.stopAuto();
		}, function() {
			carousel.startAuto();
		});
	};
	jQuery(document).ready(function() {
		jQuery('#mycarousel').jcarousel({
			auto: 2, // you can put "auto: 0," to stop autoscroll.
			wrap: 'last',
			initCallback: mycarousel_initCallback
		});
		
		 $('#testimonials1').before('<div id="nav">').cycle({
			fx: 'fade', // choose your transition type, ex: fade, scrollUp, scrollRight, shuffle
			pager:  '#nav'
		 });
	});
	
	

	function randomString(length) {
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
		var str = '';
		for (var i = 0; i < length; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}
    var rnd = randomString(8);
    jQuery(function($) {
		$(".rnd").replaceWith(rnd);
		$(".demo .code").hide().each(function(i,e){
		$(e).before($('<a class="show-code" href="#"></a>').click(function(ev) {
			$(e).slideToggle();
			$(this).hide();
			ev.preventDefault();
		}));
		}).each(function(i, e){ eval($(e).text()); 
	});
    });
	
	// jQuery Input Hints plugin
	// Copyright (c) 2009 Rob Volk
	// http://www.robvolk.com
	jQuery.fn.inputHints=function(){jQuery(this).each(function(i){jQuery(this).val(jQuery(this).attr('title'));});jQuery(this).focus(function(){if(jQuery(this).val()==jQuery(this).attr('title'))
	jQuery(this).val('');}).blur(function(){if(jQuery(this).val()=='')
	jQuery(this).val(jQuery(this).attr('title'));});};

	//$(function(){ $("label").inFieldLabels(); });
	$(document).ready(function() {
		$('input[title], textarea[title]').inputHints();
	});
	
	
	var dur = 400; // Duration Of Animation in Milli Seconds
    $(document).ready(function() {
        $('.linknudge li a').hover(function() {
            $(this).animate({
                paddingLeft: '10px'
            }, dur);
        }, function() {
            $(this).animate({
                paddingLeft: 0
            }, dur);
        });
    }); // end of Jquery Script
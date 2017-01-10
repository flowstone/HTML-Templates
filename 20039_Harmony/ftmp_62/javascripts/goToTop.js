
$(document).ready(function(){
	//hiding the element first
	$('a.toTop').css('display', 'none');
	$(window).scroll(function(){
		//accounting offset top of the element on the page
		var goTop = $('a.toTop').offset().top;
		var y = $(window).scrollTop();
		
		if ( y > '120' ) {
			$('a.toTop').fadeIn('fast');//css('display', 'block');
			
    
		} else {
			$('a.toTop').fadeOut('fast');//css('display', 'none');
		}
	});

	//go to  top
    $('a[href="#toTop"]').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
        return false;
    });//end
});
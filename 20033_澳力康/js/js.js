$(document).ready(function(){
	$('.chat_f1_expr').animate({height:'156px'}, 1000 );
	$('#close').click(function(){
		$('#chat_f1').hide();
		$('#chat_f2').show();
	})
	$('#chat_f2').click(function(){
		$(this).hide();
		$('#chat_f1').show();
	})
	$('.name').hover(function(){
		$(this).children('.detail').show();
		$(this).children('.arrow').css('color','#a00');
		},function(){
		$(this).children('.detail').hide();	
		$(this).children('.arrow').css('color','#fff');
	})
})

$(function(){

   
   //右边隐藏的内容
   var moveheight = $('.moveleft').height()+30;
   var mlwarpheight = $('.moveleft').height();
   var movewidth = $('.moveleft').width();
   var movemrwarp = $(window).height();
	   if( mlwarpheight > movemrwarp  ){
	       
		$('.mlwarp').css({
			width:movewidth,
			height:mlwarpheight
		 });
		$('.moveright').css({
	      height:mlwarpheight
         });
	   }else{   
		$('.mlwarp').css({
			width:movewidth,
			height:movemrwarp
		 });
		$('.moveright').css({
	      height:movemrwarp
         });
		 
	   };
	
   $('.classify,.mlwarp').click(function(){
	    $('.moveleft').toggleClass('moveleft_p');
	    $('.moveright').toggleClass('moveright_p');
		$('.mlwarp').toggleClass('disnone');
		$(window).scrollTop(0);
   });
   //右边隐藏的内容 END
 
});


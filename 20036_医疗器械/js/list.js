$(document).ready(function(){
   var mlistheight="";
   $(".mydllist dd").hover(function(){
	   $(this).addClass("selected");
	   },function(){
		 $(this).removeClass("selected");  
		   });

   $(".mmmzw").fadeTo("fast",0.01);  //切勿删除
   
   
   $("#mmlistshow div.downjiao img").click(function(){
	   strsrc=$(this).attr("src");
	   if($(this).attr("alt")=="hide"){
		   mlistheight=$("#mmlistshow").css("height");		   		   
		   vheight=36;
		   if($.browser.msie){
			    if($.browser.version=="6.0"||$.browser.version=="7.0"){
					vheight=34;
					$(this).find("dl.mydllist").css("margin-top","10px");
					}
					
			   }
		   $("#mmlistshow").animate({'height':vheight+'px'},"fast",function(){
			   
			    if($.browser.msie){
			    if($.browser.version=="6.0"||$.browser.version=="7.0"){
					 
					 $(this).find("dl.mydllist").css("marginTop","20px");
					// alert( $(this).find("dl.mydllist").css("marginTop"));
					}
					
			   }
			   
			   });
		   
		   
		   
	  	   ssss=strsrc.replace("downjiao.jpg","ujiao.jpg");
		   $(this).attr("src",ssss);
		   $(this).attr("alt","show");
		   
		   }else{
			 $("#mmlistshow").animate({'height':mlistheight},"fast");
			  ssss=strsrc.replace("ujiao.jpg","downjiao.jpg");
			  $(this).attr("src",ssss);
		     $(this).attr("alt","hide");
			   
			 }
	    
	    
	   });
   
   
   /*
   $("#mmlistshow div.downjiao img").click(function(){
	   strsrc=$(this).attr("src");
	   if($(this).attr("alt")=="hide"){
		   mlistheight=$("#mmlistshow").css("height");		   		   
		   vheight=45;
		   if($.browser.msie){
			    if($.browser.version=="6.0"||$.browser.version=="7.0"){
					vheight=35;
					}
			   }
		   $("#mmlistshow").animate({'height':vheight+'px'},"fast");
		   
	  	   ssss=strsrc.replace("downjiao.jpg","ujiao.jpg");
		   $(this).attr("src",ssss);
		   $(this).attr("alt","show");
		   
		   }else{
			 $("#mmlistshow").animate({'height':mlistheight},"fast");
			  ssss=strsrc.replace("ujiao.jpg","downjiao.jpg");
			  $(this).attr("src",ssss);
		     $(this).attr("alt","hide");
			   
			 }
 
	    
	   });
   */
  
	});



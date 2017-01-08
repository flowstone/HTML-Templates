$(document).ready(function(){
   var mlistheight="";
   $(".mydllist dd").hover(function(){
	   $(this).addClass("selected");
	   },function(){
		 $(this).removeClass("selected");  
		   });
		   
	$(".search-btn").click(function(){
		
		if($("#search-input").val()==""){
			alert("请输入搜索关键字");
			$("#search-input").focus();
			return false;
			}
		$("#mmsearchform").submit();
		
		});
		
		
	
	  $("#mmlistshow div.downjiao img").click(function(){
	   strsrc=$(this).attr("src");
	   if($(this).attr("alt")=="hide"){
		   mlistheight=$("#mmlistshow").css("height");		   		   
		   vheight=31;
		   if($.browser.msie){
			    if($.browser.version=="6.0"||$.browser.version=="7.0"){
					vheight=31;
					$(this).find("dl.mydllist").css("margin-top","10px");
					}
					
			   }

		   $("#mmlistshow").animate({'height':vheight+'px'},"fast",function(){
			   
			    if($.browser.msie){
			    if($.browser.version=="6.0"||$.browser.version=="7.0"){
					 
					 $(this).find("dl.mydllist").css("marginTop","20px");
					 
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
		
   
   
	});

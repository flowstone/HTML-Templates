$(document).ready(function(){
   
      $(".mydllist dd").hover(function(){
	   $(this).addClass("hover");
	   },function(){
		 $(this).removeClass("hover");  
		 });
		   
  
  $(".mydllist dd").click(function(){
	  if(($(".mydllist dd.selected").length==3)&(!$(this).hasClass("selected"))){
		   alert("您最多只能选择三项!");
		   return false;
		  }else{	  
			  if($(this).hasClass("selected")){
				 $(this).removeClass("selected"); 
				}else{
				 $(this).addClass("selected");
				}
		  }
	  
	  });
 
  $("#inputName").blur(function(){
	
	 //  $(this).parent().parent().addClass("error");
	 if(!dyfrom_null($(this).val())){
		 $(this).parent().parent().addClass("error");
	    }else{
			$(this).parent().parent().removeClass("error"); 
			$(this).parent().parent().addClass("success");
			}
	  });
  	  
	
	
   $("#inputEmail").blur(function(){
	   email=$(this).val();
	   if(dyfrom_null(email)){
		   if(dyfrom_email(email)){
			  $(this).parent().parent().removeClass("error"); 
			  $(this).parent().parent().addClass("success");
			   $(this).next().html("");   	   
			   }else{
			  $(this).parent().parent().addClass("error");
			  $(this).next().html($(this).attr("placeholder"));   
			 }
		   }else{
			    $(this).parent().parent().addClass("error");
			 } 
	   
	   
	   
	   });  
	  
	
	$("#inputPhone").blur(function(){
	   obj=$(this).val();
	   if(dyfrom_null(obj)){
		   if(dyfrom_mobile(obj)|| dyfrom_phone(obj)){
			  $(this).parent().parent().removeClass("error"); 
			  $(this).parent().parent().addClass("success");
			   $(this).next().html("");   	   
			   }else{
			  $(this).parent().parent().addClass("error");
			  $(this).next().html("请正确填写联系方式");   
			 }
		   }else{
			    $(this).parent().parent().addClass("error");
				$(this).next().html("请正确填写联系方式");
			 } 
	   
	   });  
	
	$("#inputRole").blur(function(){
	   obj=$(this).val();
	   if(dyfrom_null(obj)){
		   $(this).parent().parent().addClass("success");
				$(this).next().html("");
		   }else{
			    $(this).parent().parent().addClass("error");
				$(this).next().html("请填写职务");
			 } 
	   
	   }); 	    
	   
	   
	   $("#inputProductName").blur(function(){
	   obj=$(this).val();
	   if(dyfrom_null(obj)){
		   $(this).parent().parent().addClass("success");
				$(this).next().html("");
		   }else{
			    $(this).parent().parent().addClass("error");
				$(this).next().html($(this).attr("placeholder"));  
			 } 
	   
	   }); 	
	 
	 
	  $("#inputWebsite").blur(function(){
	   obj=$(this).val();
	   if(dyfrom_null(obj)){
		  		 $(this).parent().parent().addClass("success");
				$(this).next().html("");  
		   }else{
			    $(this).parent().parent().addClass("error");
				$(this).next().html($(this).attr("placeholder"));  
			 } 
 
	   
	   });
	
 	$("#inputNeedtail").blur(function(){
	   obj=$(this).val();
	   if(dyfrom_null(obj)){
		  		 $(this).parent().parent().addClass("success");
				 
		   }else{
			    $(this).parent().parent().addClass("error");
				 
			 } 
 
	   
	   });
	
	$("#inputKeywords").blur(function(){
	   obj=$(this).val();
	   if(dyfrom_null(obj)){
		  		 $(this).parent().parent().addClass("success");
				 
		   }else{
			    $(this).parent().parent().addClass("error");
				 
			 } 
 
	   
	   });
	
	
	$("#textAbstract").blur(function(){
	   obj=$(this).val();
	   if(dyfrom_null(obj)){
		  		 $(this).parent().parent().addClass("success");
				 
		   }else{
			    $(this).parent().parent().addClass("error");
				 
			 } 
 
	   
	   });
 
	   
	   
	   $("#inputNeedtail").keyup(function(){
		   num=45-$(this).val().length; 			   
		   $("#hnum").html(num);
		   }); 
	 
	 
	 $("#textAbstract").keyup(function(){
		   num=300-$(this).val().length; 			   
		   $("#projs").html(num);
		   });
  
	  
	  
	});
	
 
 
  function upimg(){
	 $("#mmupjt").click();	 
	 }
  
  function uplogo(){
	  $("#ulogo").click();	 
	  }
	 
  function uphoto(){
	  $("#uphototx").click(); 
	  }
 

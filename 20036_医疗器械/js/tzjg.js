$(document).ready(function(){
  
   /* 
   $(".mydllist dd").hover(function(){
	   $(this).addClass("selected");
	   },function(){
		 $(this).removeClass("selected");  
		   });
		   
	*/
	
	$(".mydllist dd").mouseover(function(){
		
		strid=$(this).attr("id");
		
		//遍历数组，把所有的class全部去掉，然后把现在的焦点放在这里
		$(".mydllist dd").each(function(){
			
			$(this).removeAttr("class");
			
			$("#mb"+$(this).attr("id").substr(2)).css("display","none");
			
		});
		
		
		$(this).addClass("selected");
		 
		$("#mb"+strid.substr(2)).css("display","block");
 	 
		
		});
		   
    
   
   
    	  var everypage=1;
		  var licount=$("div.mmpicshow dl dd").length; //计算出总共有多少个li
		  var pageCount=Math.ceil(licount/everypage); //总共有多少页
		  var imgshowWidth=$("div.mmpicshow").width(); //获取到显示的长度
		  var ulobj=$("div.mmpicshow dl");  //获取到ul的对象
		  var ulWidth=(pageCount*imgshowWidth)+1000;
		  ulobj.css("width",ulWidth);  //设置imgshowWidth 的长度
		  var pagec=1;
   
   
    //点击左按钮
		  $(".leftjj").click(function(){
			  //如果他在移动的时候，点击无效
			if(!ulobj.is(":animated")){
			 if(pagec==1){
			 	  ulobj.animate({left:"-"+(pageCount-1)*imgshowWidth+"px"},"slow");  //当是第一页时时候就会跳转到最后一页
				  pagec=pageCount;
				 }else{
				 ulobj.animate({left:"+="+imgshowWidth+"px"},"slow");
				 pagec--;
				}			
			}
			return false;					 
			});
			
			
		//点击右按钮
		
		$(".rightjj").click(function(){
				if(!ulobj.is(":animated")){
					if(pagec==pageCount){
					 ulobj.animate({left:"0px"},"slow");
					 pagec=1;
					 
					}else{
					ulobj.animate({left:"-="+imgshowWidth+"px"},"slow");
					pagec++;
					}
				}
				return false;				
			});	
   
   
   
   
   
   
   		   
   
   
	});

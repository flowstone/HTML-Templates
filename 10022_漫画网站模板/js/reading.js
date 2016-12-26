



var Reading = (function(){
	
	var loaded_list = [];
	var current_page = 1;
	var current_load_page = 1;
	var img_div_init_count = 10;
	var img_init_count = 5;
	var load_count = 2;
	
	var last_image_id;
	var reading_record_key = 'reading_record_last_image_id';
	function init(cid,ccid,iid){
		
		loadComicImageList(cid,ccid,iid,function(result){
			
			
			initTitle(result);
			initPage(result); //初始化页码
			renderImage(result,img_init_count,current_load_page);
			localization(result);
			$('#reading_flag').show();
			
			$(window).bind('scroll',function(e){
				
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
				var scrollHeight = window.scrollHeight || document.documentElement.scrollHeight || document.body.scrollHeight || 0;
				if(scrollTop >= scrollHeight / 2){
					renderImage(result,load_count,current_load_page);
				}
			});
			
			$(document).bind('touchmove',function(e){
		        $(".reading_header,.reading_footer").removeClass("fix");
		    });
			
			
			
			//页面选中事件
		    $('#page_select').change(function(){

		        var num =  $('#page_select').val().split('/')[0];
		        var imgobj = result.comicImageList[num - 1];
		        
		        if(num > current_load_page){
		        	renderImage(result,(num - current_load_page) + load_count,current_load_page);
		        }

		        location.hash = 'imgdiv_' + imgobj.id + '_' + num;
		    });
		    

		    //返回标签点击事件
		    $('#go_back , .go_back_link').click(function(){
		        var flag = uri_domain + '/read/detail.htm?comicId=' + cid;
		        saveReadingRecord(flag);

		    });

		    //漫画列表点击事件
		    $('#go_menu, .go_menu_link').click(function(){

		        var flag = uri_domain + '/read/reading_list.htm?comicId=' + result.comic.id + '&comicChapterId=' + result.comicChapter.id;
		        saveReadingRecord(flag);
		    });

		    //跳转下一章或者阅读页的点击事件
		    $('#reading_jump').live('click',function(){

		        $('#reading_jump').html('正在加载中..');
		        var flag = '';
		        if(typeof result.nextComicChapter != 'undefined' && result.nextComicChapter != null){
		            flag = uri_domain + '/read/reading.htm?comicId=' + result.comic.id + '&comicChapterId=' +result.nextComicChapter.id;
		        }else{
		            flag = uri_domain + '/read/reading_finish.htm?comicId=' + result.comic.id;
		        }
		        saveReadingRecord(flag);
		    });
		});
		
		
	}
	
	function loadComicImageList(comicId,comicChapterId,imageId,success){

	    var url = uri_domain + '/read/reading.htm?actionMethod=getComicInfoList';
	    var data = {"comicId" : comicId , "comicChapterId" : comicChapterId , "imageId" : imageId};

	    $.ajax({
	        type: 'POST',
	        url: url,
	        data: data,
	        dataType: 'json',
	        success:  function(result){
	            if(result.success){
	            	success.call(this,result);
	            }else{
	                alert(result.info);
	            }
	        }
	    });
	}
	

	 /**
	  * 加载图片
	  */
	 function renderImage(result,count,currentPage){
		  
		  for(var i = currentPage; i < count + currentPage; i++){
			  
			  var img = result.comicImageList[i - 1];
			  if(typeof img == undefined || img == null) return;
				
		      var imgdiv_id = 'imgdiv_' + img.id + '_' + i;
		      var anchor = 'anchor_' + imgdiv_id;
		      var pno = img.id + '_' + i;
		      var url = img_domain + img.location;

		      var imgdiv = View.oneImgDiv.replace('@id',imgdiv_id).replace('@name',imgdiv_id).replace('@anchor',anchor).replace('@src',url);
		      
		      if($('#' + imgdiv_id).length == 0 && $('#' + imgdiv_id + ' .font_img_div img').length == 0 && !loaded_list.in_array(pno)){
		           
		    	  $('.pic_scroll').append(imgdiv);
		          loaded_list.push(pno);
		          $('#imgdiv_' + pno).click(function(){
		            	   
		            	   var elements = $(this).attr('id').split('_');
			   		       var img_id = elements[1];
			   		       var img_num = parseInt(elements[2]);
			   		       $('#page_select').val(img_num + '/' + result.comicImageList.length);
			   		       
			   		       last_image_id = img_id;
			   		       Util.setItem(reading_record_key,img_id);
			   		       
		            	   if($(this).hasClass("open")){
		                       $(".reading_header,.reading_footer").removeClass("fix");
		                       $(".reading_header").animate({top:-65}, 500, 'ease');
		                       $(".reading_footer").animate({bottom:-48}, 500, 'ease');
		                       $(this).removeClass("open");
		                   }else{
		                       $(".reading_header").addClass("fix");
		                       $(".reading_footer").addClass("fix");
		                       $(".reading_header").animate({ top:0}, 800, 'ease');
		                       $(".reading_footer").animate({ bottom:0}, 800, 'ease');
		                       $(this).addClass("open");
		                   }
		           });
		               
		        }
			   current_load_page++;
		   }
	     
	 }
	 
	 function onImageLoad(img){
		 
		 $(img).siblings("div").remove();
		 //$(img).attr('src',img.src);
		 
		 /*setTimeout(function(){
			 if(img.complete){
			 }else{
				onImageLoadError(img);
			 }
		 },100);*/
		 
	 }
	 
	 function onImageLoadError(img){
		 var id = $(img).parents('div.picbg').attr('id');
		 
		 $(img).parent('div.font_img_div').html('<a href="javascript:void(0);" onclick="Reading.onImageReloadClick(\''+ img.src +'\',\''+ id +'\')"><div class="loading_error"><b>网速不给力哟！<br>点击重新加载</b></div></a>');
	 }
	 
	 function onImageReloadClick(src,id){
		 var imgstr = View.cartoonImg.replace("@src",src);
		 $('#' + id + ' .font_img_div').append('<div class="loading_div"></div>').append(imgstr);
	 }
	 
	  function localization(result,initNum){

		    if(result.lastImageId != -1){
		        var imageId = result.lastImageId;
		        var imageNum = result.lastImageNum;
		        var pno = imageId + '_' + imageNum;
		        var id = '#anchor_imgdiv_' + imageId + '_' + imageNum;

		        if(imageNum > current_load_page){
		        	renderImage(result,(imageNum - current_load_page) + load_count,current_load_page);
		        }else{
		        	renderImage(result,0,current_load_page);
		        }
		        
		        $('#page_select').val(imageNum + '/' + result.comicImageList.length);
		        setTimeout(function(){
		            $(id).focus();
		            location.hash = 'imgdiv_' + imageId + '_' + imageNum;
		        },1000);
		    }else{
		        window.scrollTo(0,0);
		    }
		}
	  
	   /**
	    * 添加图片
	    */
	   function preparImg(num,result){

	       var imgObj = result.comicImageList[num - 1];
	       var pno = imgObj.id + '_' + num;
	       var url = img_domain + imgObj.location;
	       var imgstr = View.cartoonImg.replace("@src",url);
	       imgReady(url,function() {

	           if($('#imgdiv_' + pno + ' .font_img_div').length > 0 && $('#imgdiv_' + pno + ' .font_img_div img').length == 0 && !loaded_list.in_array(pno)){
	               $('#imgdiv_' + pno + ' .font_img_div').html(imgstr);
	               loaded_list.push(pno);
	           }
	       },function(){
	           //加载成功
	           return true;
	       },function(){
	           //加载异常
	           preparImg(num,result);
	       },function() {
	           //加载失败
	           preparImg(num,result);
	       });
	   }
	   

	    /**
	     * 保存阅读记录
	     */
	    function saveReadingRecord(flag){


	        var imageId = (Util.getItem(reading_record_key) == null || typeof Util.getItem(reading_record_key) == 'undefinde') ? last_image_id :  Util.getItem(reading_record_key);
	        if(typeof imageId != 'undefinde' && imageId != null && imageId != ''){
	            var url = uri_domain + '/read/reading.htm?actionMethod=saveReadingRecord';
	            $.ajax({
	                type: 'POST',
	                url: url,
	                data: {"imageId" : imageId},
	                dataType: 'json',
	                success:  function(result){
	                    if(flag){
	                        $('#reading_jump').html('点击继续阅读');
	                        window.location.href = flag;
	                    }
	                }
	            });
	        }else{
	            if(flag){
	                $('#reading_jump').html('点击继续阅读');
	                window.location.href = flag;
	            }
	        }

	    }


	    /**
	     * 初始化页码
	     */
	    function initPage(result){
	        for(var i = 1; i <= result.comicImageList.length; i++){
	            var value = i + '/' + result.comicImageList.length;
	            var id = 'option_' + i;
	            var option = View.pageOption.replace('@id',id).replace('@value',value);
	            $('#page_select').append(option);
	        }
	    }

	    /**
	     * 初始化标题
	     */
	    function initTitle(result){
	        $('.title').html('<div class="title">'+ Util.substringOwn(16,result.comicChapter.name) +'</div>');
	        $('#title').html(result.comic.name + ' - ' + result.comicChapter.name + ' - ' + 'n次元漫画');
	    }
	     
	     /**
	      * 添加收藏
	      */
	     function addToBookshelf(comicId){
	         var url_ = uri_domain + '/bookshelf/bookshelf_index.htm?actionMethod=addComicFavoriteByComic' ;
	         $.ajax({
	             type: 'POST',
	             url: url_,
	             data: {"comicId":comicId},
	             dataType: 'json',
	             success:  function(result){
	                 if (result.error) {
	                     alert(result.info);
	                 }else{
	                     //隐藏收藏效果
	                     $(".r_collect").hide();
	                 }
	             }
	         });
	     }

	     /**
	      * 检测是否收藏
	      */
	     function checkComicWhetherCollect(comicId){
	         var url_ = uri_domain + '/bookshelf/bookshelf_index.htm?actionMethod=checkComicWhetherCollect';
	         $.ajax({
	             type: 'POST',
	             url: url_,
	             data: {"comicId":comicId},
	             dataType: 'json',
	             success:  function(result){
	                 if (result.type == 1) {
	                     $(".r_collect").hide();
	                 }else if(result.type == 2){
	                     $(".r_collect").hide();
	                 }else{
	                     $(".r_collect").show();
	                 }
	             }
	         });
	     }
	
	
	return {init : init , onImageLoadError : onImageLoadError , onImageReloadClick : onImageReloadClick , onImageLoad : onImageLoad};
	
})();	

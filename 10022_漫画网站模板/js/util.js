
/**
 * KEY
 */
var reading_record_key = 'niciyuan^reading_record';



/**
 * 工具类
 */
var Util = (function(){
	/**
	 * 获取url参数
	 */
	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");    
		var r = window.location.search.substr(1).match(reg);    
		if (r != null) 
			return decodeURI(r[2]); 
		return null;    
	}
	
	function setItem(key,value){
		try{
			if(window.localStorage){
				var storage = window.localStorage;
				if(key!=null&&value!=null)
				storage.setItem(key,value);	
			}
		}catch(Exception){
			
		}
	}
	function getItem(key){
		try{
			if(window.localStorage){
				var storage = window.localStorage;
				if(key!=null)
				return storage.getItem(key);	
			}
			return null;
		}catch(Exception){
			
		}
	}
	
	function setSessionItem(key,value){
		try{
			if(window.sessionStorage){
				var storage = window.sessionStorage;
				if(key!=null&&value!=null)
				storage.setItem(key,value);	
			}
		}catch(Exception){
			
		}
	}
	function getSessionItem(key){
		try{
			if(window.sessionStorage){
				var storage = window.sessionStorage;
				if(key!=null)
				return storage.getItem(key);	
			}
			return null;
		}catch(Exception){
			
		}
	}
	
	
	return {
		getQueryString:getQueryString,
		debugalert:debugalert,
		setItem:setItem,
		getItem:getItem,
		
		setSessionItem:setSessionItem,
		getSessionItem:getSessionItem,
		substringOwn:substringOwn
	}
	
	function debugalert(obj){
		if(typeof obj=="object"){
			for(var i in obj){
				alert(i+":"+obj[i]);
			}
		}
		if(typeof obj == "string"){
			alert(obj);
		}
	}
	/**
	 * 自己的截断字符串函数
	 */
	function substringOwn(num,str){
		if(str == null || typeof str == 'undefined')str = '';
		if(str.length>num){
			str = str.substring(0,num-1)+"..";
		}
		return str;
	}
})();


/**
 * 视图帮助类
 */
var View = (function(){
	
	var cartoonFont = '<font>@pnocode</font>';
	var cartoonImg = '<img src="@src" onerror="Reading.onImageLoadError(this)" onload="Reading.onImageLoad(this)">';
	
	var oneImgDiv = 
		'<div class="img_bg">'
		+'<a class="anchor" id="@anchor" href="javascript:void(0)">anchor</a>'
	    +'<div name="@name" id="@id" class="picbg">'
	    	+'<div class="font_img_div">'
	    	+'<div class="loading_div"></div>'
	        + cartoonImg   
	        +'</div>'
	    +'</div>'
    +'</div>';
	
	

	var pageOption = '<option id="@id">@value</option>';
	
	var pinDiv = '<div class="pin_item"  id="@id">'
        + '<a href="@url_1" class="pic" style="@style" ><img src="@imgsrc" /></a>'
        + '<a href="@url_2" class="pname">@name</a>'
    	+ '</div>';
	
	return {
		oneImgDiv:oneImgDiv,
		cartoonImg:cartoonImg,
		cartoonFont:cartoonFont,
		pageOption:pageOption,
		pinDiv:pinDiv
	}
})();

/**
 * 判断元素是否存在于数组中
 */
Array.prototype.S = String.fromCharCode(2);  
Array.prototype.in_array = function(e){  
var r = new RegExp(this.S+e+this.S);  
	return (r.test(this.S+this.join(this.S)+this.S));  
}

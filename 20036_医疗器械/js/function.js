//自定义trim(),兼容ie6
String.prototype.trim= function(){  
    // 用正则表达式将前后空格  
    
    // 用空字符串替代。  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
};

var loadding = '<div class="clearfix center loaddingD fcccc"><img src="/images/loadding.gif" /> 数据加载中</div>';
var loaddingImg = '<img class="l-5 r-5 loaddingD" style="width:16px; height:11px;" src="/images/loadding.gif" />';
var loaddingL = function(o){if(!o){o='padding:0 10px;';}return '<span style="'+o+'" class="left loaddingD fcccc"><img src="/images/loadding.gif" /> 数据加载中</span>';};
var loaddingP = function(o){if(!o){o='left:43%;';}return '<span style="position: absolute; top:0; '+o+'" class="loaddingD fcccc"><img src="/images/loadding.gif" /> 数据加载中</span>';};
var loaddingP2 = function(o){if(!o){o='left:43%;';}return '<span style="position: absolute; top:0; '+o+'" class="loaddingD fcccc"><img src="/images/loadding.gif" /></span>';};

$(function ()
{
    $("img[class=lazyloadimg]").lazyload(
    {
        threshold : 0, placeholder : "http://www.biodiscover.com/images/imgpageloadimg.gif", effect : "fadeIn"
    });
 });
/**
 * 指定元素冒泡提示窗
 * @param cl  	指定元素的类
 * @param obj	指定元素的this或字符串body,body表示在窗口正中央显示， 第一和第二个参数只能选择一个，第一个优先级高
 * @param text 	显示内容（html）
 * @param time	显示时间（秒）
 * @param type  默认方案，两套：1和2
 * @param w		窗口的宽(px)
 * @param h		窗口的高(px)
 * @param r		返回ture还是false
 * @param a		动画类型，fade:淡入淡出，flow:冒泡，默认为冒泡
 * @param reload 是否刷新，1:刷新  0:不刷新
 */
function yjq_simple_prompt(cl,obj,text,time,type,w,h,r,a,reload)
{
	var a = 'flow';
	if (arguments.length > 8) 
	{
		a = arguments[8];
	}
	if(cl != null)
	{
		//$('.'+cl).click(function(){
		var offset = $('.'+cl).offset();
		return yjq_simple_prompt_sub(offset,text,time,type,w,h,r,a,reload);			
		//});	
	}else if(obj != null){
		var offset;
		if(obj == 'body')
		{
			offset = 'body';
		}else if(obj instanceof jQuery){//判断对象是否为jquery对象
			offset = obj.offset();
		}else{
			offset = $(obj).offset();
		}
		return yjq_simple_prompt_sub(offset,text,time,type,w,h,r,a,reload);	
	}
};

/**
 * 指定元素冒泡提示窗子函数
 */
function yjq_simple_prompt_sub(offset,text,time,type,w,h,r,a,reload)
{	
	//移除原有的冒泡窗口
	$(".ysp-outer-box").remove();
	//设置参数
	var oTop = '';
	var oLeft = '';
	var oMarginTop = 0;
    var oMarginLeft = 0;
    var oWidth = 172;//默认父框宽度
    var oHeight = 62;//默认父框高度
	var html = '<div class="ysp-outer-box"><div class="ysp-inner-box"><div class="ysp-cover">'+text+'</div></div></div>';
	//生成窗口
	$('body').append(html);
	//设置样式
	var cover = $('.ysp-cover');
	var close = $('.ysp-close');
	var outerBox = $('.ysp-outer-box');
	var innerBox = $('.ysp-inner-box');
	var itop = '';
	if(offset=='body')
	{//正中央提示框
		oTop = '50%';
		if($.browser.msie)//david.
		{
			var ww = $(window).height();
			oTop=$(document).scrollTop()+ww/2;
		}
		oLeft = '50%';
		oMarginLeft = -(oWidth/2);
		oMarginTop = -(oHeight/2);
		outerBox.css({
			'top': oTop,
			'left': oLeft});
	}else{//指定位置提示框
		oTop = offset.top;
		oLeft = offset.left;
		outerBox.css({
			'top': oTop-62,
			'left': oLeft-60});
	}
	outerBox.css({
		'width': oWidth,
		'height': oHeight,
		'margin-top':oMarginTop,
		'margin-left':oMarginLeft,
		'position': 'absolute',
		'z-index':999999});
    if (offset=='body' && !window.ActiveXObject)
    {
    	outerBox.css({'position':'fixed'});
    }
	innerBox.css({
		'width': 152,
		'height': 42,
		'position': 'relative',
		'overflow': 'hidden',
		'padding':10});
	cover.css({
		'position':'absolute',
		'top':72,
		'left':10,
		'height':14,
		'width':150,
		'border-radius': 3,
		'box-shadow':'0 0 10px #777',
		'font-size':12,
		'border':'1px solid #A0A0A0',
		'background':'none repeat scroll 0 0 #FFFFFF',
		'padding':'13px 0',
		'text-align':'center'});
	if(type == 1)
	{
		iTop = '72px';
	}else if(type == 2){
		iTop = '112px';
		if(offset=='body')
		{
			outerBox.css({'width':222,'height':102,'margin-top':-51,'margin-left':-111});
			innerBox.css({'width':202,'height':82});
			cover.css({'width':200,'height':54});
		}else{
			outerBox.css({'top':oTop-102,'left':oLeft-101});
			innerBox.css({'width':202,'height':82});
			cover.css({'width':200,'height':54});
		}
	}else{
		iTop = (h+42)+'px';
		if(offset=='body')
		{
			outerBox.css({'width':w+22,'height':h+22,'margin-top':-(h+22)/2,'margin-left':-(w+22)/2});
			innerBox.css({'width':w+2,'height':h+2});
			cover.css({'width':w,'height':h-26,'top':h+22});
		}else{
			outerBox.css({'top':oTop-(h+22),'left':oLeft-(w/2+40)});
			innerBox.css({'width':w+2,'height':h+2});
			cover.css({'width':w,'height':h-26,'top':h+22});
		}
	}
	//设置动画效果
	if(a == 'fade')
	{
		cover.css({
			'top':12,
			'display':'none'});
		cover.fadeIn(800);
		close.click(function(){
			outerBox.fadeOut('slow');
		});
		//自动消失设置
		if(time != null)
		{
			setTimeout(function(){
				outerBox.fadeOut('slow');
				if(reload == 1){
					document.location.reload();
				}
				},time*1000);
		}
	}else
	{
		cover.stop().animate({top:'10px'},{queue:false,duration:300});
		close.click(function(){
			cover.stop().animate({top:iTop},{queue:false,duration:300});
			outerBox.fadeOut('slow');
		});
		//自动消失设置
		if(time != null)
		{
			setTimeout(function(){
				cover.stop().animate({top:iTop},{queue:false,duration:300});
				outerBox.fadeOut('slow');
				if(reload == 1){
					document.location.reload();
				}
				},time*1000);
		}
	}
	//返回值
	if(r == false)
	{
		return false;
	}else{
		return true;
	}
	
}

/**
 * 操作完成后提示
 * Author:peggy
 * @param status  状态，1:成功，0:失败，2:警告
 * @param reload  是否刷新当前页面   1:刷新，0:不刷新
 * @param info    提示的信息
 */
returnInfo = function(status, reload, info,w){
	var width = 250;
	if(typeof w == "undefined" || w == null || w < width) w = width;
	
	if(status == 0){
		var img = 'midWrong';
		var color = '#DA251D';
	}else if(status == 1){
		var img = 'midRight';
		var color = 'green';
	}else{
		var img = 'midWarning';
		var color = '#DA251D';
	}
	
	var numargs = arguments.length;
	var obj = 'body';
	if (numargs > 4)
	{
		obj = arguments[4];
	}
	
	var cls = null;
	if (numargs > 5)
	{
		cls = arguments[5];
	} 
	
	var collect_text='<span style="margin:0;padding:0;font-size:12px;vertical-align: middle;color:'+color+';white-space:nowrap;"><img style="vertical-align: middle;" src="/images/'+img+'.gif"/>&nbsp;&nbsp;'+info+'</span>';
	yjq_simple_prompt(cls,obj,collect_text,3,3,w,50,true,"flow",reload);
};

/**
 * 返回顶部
 * Author:peggy
 */
backToTop = function(className){
	var $backToTopTxt = "返回顶部", $backToTopEle = $('<a class="backToTop" href="javascript:void(0);" class="ie6png"></a>').appendTo($(className))
    .text('').attr("title", $backToTopTxt).click(function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
	}), $backToTopFun = function() {
	    var st = $(document).scrollTop(), winh = $(window).height();
	    (st > 0)? $backToTopEle.show(): $backToTopEle.hide();
	    //IE6下的定位
	    if (!window.XMLHttpRequest) {
	        $backToTopEle.css("top", st + winh - 166);
	    }
	};
	$(window).bind("scroll", $backToTopFun);
	$(function() { $backToTopFun(); });
};


/**
 * ajax 删除
 * @param url  	控制器
 */
ajaxDelete = function (url){
	$.ajax({url: url,type: 'GET',success: function(o){
		if(o.status == 1){
			returnInfo(1, 1, o.info);
		}else if(o.status == 0){
			returnInfo(0, 0, o.info);
		}else{
			returnInfo(2, 0, '系统繁忙!');
		}
	},dataType: 'json'});
};

/**
 * 带选择事件的冒泡窗口
 * @param obj 	指定对象this
 * @param e 事件
 * @param url	事件处理用到的url 
 * @param id	ajax返回处理用到的id
 */
function ajaxJsp(obj, e, url)
{
	//alert(url);
	var text   = '';
	var width  = 140;
	var height = 80;
	if(e == 'ajaxDelThesis'){//删除文献
		text = '<span style="margin:0;padding:0;font-size:12px;color:#DA251D;"><img src="/images/midWarning.gif"/>&nbsp;&nbsp;确定删除它吗?</span><div style="text-align:center;margin-top:10px;"><input class="ysp-button ysp-close" type="button" onclick="del_thesis(\''+url+'\')" value="确定"/>&nbsp;&nbsp;&nbsp;&nbsp;<input class="ysp-button ysp-close" type="button" value="取消"/></div>';				
	}
	else if(e == 'ajaxDelComment')//删除评论
	{
		text = '<span style="margin:0;padding:0;font-size:12px;color:#DA251D;"><img src="/images/midWarning.gif"/>&nbsp;&nbsp;确定删除它吗?</span><div style="text-align:center;margin-top:10px;"><input class="ysp-button ysp-close" type="button" onclick="del_comment(\''+url+'\')" value="确定"/>&nbsp;&nbsp;&nbsp;&nbsp;<input class="ysp-button ysp-close" type="button" value="取消"/></div>';		
	}
	else if(e == 'ajaxDelBind')//删除绑定
	{
		text = '<span style="margin:0;padding:0;font-size:12px;color:#DA251D;"><img src="/images/midWarning.gif"/>&nbsp;&nbsp;确定解除绑定吗?</span><div style="text-align:center;margin-top:10px;"><input class="ysp-button ysp-close" type="button" onclick="unbind(\''+url+'\')" value="确定"/>&nbsp;&nbsp;&nbsp;&nbsp;<input class="ysp-button ysp-close" type="button" value="取消"/></div>';		
	}
	else if(e == 'ajaxDelete')//用户中心删除
	{
		text = '<span style="margin:0;padding:0;font-size:12px;color:#DA251D;"><img src="/images/midWarning.gif"/>&nbsp;&nbsp;确定删除它吗?</span><div style="text-align:center;margin-top:10px;"><input class="ysp-button ysp-close" type="button" onclick="unbind(\''+url+'\')" value="确定"/>&nbsp;&nbsp;&nbsp;&nbsp;<input class="ysp-button ysp-close" type="button" value="取消"/></div>';		
	}
	
	yjq_simple_prompt(null, obj, text, null, 2, width, height, null);
}

/**
 * 加载评论箱
 * @param obj 	指定对象this
 * @param url	事件处理用到的url 
 * @author david
 */
var get_comment = function(obj,url){
	var insert = $(obj);
	insert.html(loadding);
	insert.load(url);
};

/**
 * 评论箱.提交评论.子方法
 * @param obj 	指定对象this
 * @param name	为form的名称 
 * @author david
 */
var add_comment_submit_fn = function(obj, form_id){
	var form = $(obj).parents('form');
	if(form.find('#data_content').val() == '' || form.find('#data_content').val() == form.find('#data_content2').val())
	{
		flicker(form.find('#data_content'));
		form.find('#data_content').focus();
		return false;
	}
	if(form.find('#data_content').val().replace(/[^\x00-\xff]/g,"**").length/2 > 140)
	{
		flicker(form.find('#data_content'));
		form.find('#data_content').focus();
		returnInfo(-1, 0, '内容太长!');//冒泡
		return false;
	}
	if(form.find('#data_uid').val() == '')
	{
		returnInfo(-1, 0, '您还没有登录，<a target="_blank" href="/login.html">立即登录</a>');//冒泡http://angel.biodiscover.com/login.html
		return false;
	}
	
	//分享到
	var share = '';
	$(obj).prev().find("input[name='weibo[]']:checked").each(function(){
		share = share + $(this).val() + ',';
	});
	form.find('#data_share').val(share);
	
	//form.find('#data_content').val(String(form.find('#data_content').val()).replace(/\?/g, '？'));
	var c = form.find('#data_content').val();
	
	if(form.find('.loaddingD').length == 0)
	{
		$(obj).parent().append(loaddingP('left:43%;top:55px;'));
		//$(obj).html('');
		form.find('#data_content').val(encodeURIComponent(c));//编码
		var data = form.serialize();//取值
		form.find('#data_content').val(c);//还原
    	$.ajax({
    		url: form.attr('action'),
    		type: 'post',
    		data: {data:data},
    		dataType: 'json',
    		success: function(o){
    			$(obj).parent().find('.loaddingD').remove();
    			//setTimeout(function(){$(obj).html('');},1000);
    			if(o.status == 1)
    			{
    				returnInfo(o.status, 0, o.info);//冒泡
    				form.parent().parent().find('.comments-list').prepend(o.data);
    				form.parent().parent().find('.comments-list li:first').slideDown(600);
    				form.parent().parent().find('.comments-list').find('p').fadeOut(600);
    				
    				//清空内容
    				form.find('#data_content').val('');
    				form.find('#remLen').html('140');
    				
    				//关闭face面板
    				$('body').find('.face').remove();//
    				
    				//如果是子集就更新父reply
    				var num = form.parents('.reply_box').prev().find('.reply_num').find('span').html();
    					num = parseInt(num)+1;
    					form.parents('.reply_box').prev().find('.reply_num').fadeIn(800).find('span').html(num);
    				
    				//更新总记录数
    				var num = form.parents('#comment-box').find('.comments-info .rows_count').html();
    				    num = parseInt(num)+1;
    				    form.parents('#comment-box').find('.comments-info .rows_count').html(num);
    				    
    				//还原按钮
    				$(obj).removeClass('post-button').addClass('post-button-dis');
    			}
    			else if(o.status == '-1')
    			{
    				form.find(o.data).focus();
    				returnInfo(o.status, 0, o.info);//冒泡
    			}
    			else
    			{
    				returnInfo(o.status, 0, o.info);//冒泡
    			}	
    		}
    	});
	}
};

/**
 * 评论箱.评论列表
 * @param obj 	指定对象this
 * @author david
 */
var comment_list = function(obj){
	var load_more = $(obj).find('div.load_more:last');
	var url = load_more.attr('data-url');
	var page = parseInt(load_more.attr('data-page'));
	var page_size = parseInt(load_more.attr('data-size'));
	var by = load_more.attr('data-by');
	
	load_more.hide().nextAll().hide();
	load_more.next().show();//load_loading.show
	
	$.ajax({
		url: url,
		type: 'post',
		data: {page:page,page_size:page_size,by:by},
		dataType: 'html',
		success: function(o){
			load_more.next().hide();//load_loading.hide
			if(o == '' || typeof o == "undefined")
			{
				if(page == 1 && String(url).indexOf('pid=') == '-1')
				{
					$('<p align="center" class="d-none">暂无评论</p>').appendTo($(obj).find('.comments-list')).fadeIn(2000);
					return false;
				}
				
				if(page > 1)load_more.next().next().show();//load_none.show
			}
			else
			{
				if(page == 1)
				{
					load_more.prev().html(o);
				}
				else
				{
					load_more.prev().append(o);
				}
				 
				if(load_more.prev().children('li').filter('.p'+page).length < parseInt(page_size))
				{
					load_more.hide();//load_none.hide
					if(page > 1)load_more.next().next().show();//load_none.show
				}
				else
				{
					load_more.attr('data-page',parseInt(page)+1).show();//load_none.show
				}
			}

		}
	});
};

/**
 * 评论箱.删除评论
 * @param obj 	指定对象this
 * @author david
 */
var del_comment = function(obj){
	var url = $(obj).attr('data-url');
	if($(obj).find('.loaddingD').length == 0)
	{
		$(obj).append(loaddingImg);
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			success: function(o){
				$(obj).find('.loaddingD').remove();
				if(o.status == 1)
				{
					//如果是子集就更新父reply
    				var num = $(obj).parents('.reply_box').prev().find('.reply_num').find('span').html();
    					num = parseInt(num)-1;
    					$(obj).parents('.reply_box').prev().find('.reply_num').fadeIn(800).find('span').html(num);
    				
    				//更新总记录数
    				var num = $(obj).parents('#comment-box').find('.comments-info .rows_count').html();
    				    num = parseInt(num)-1;
    				    $(obj).parents('#comment-box').find('.comments-info .rows_count').html(num);

    			    $(obj).parent().parent().parent().slideUp(600);
					returnInfo(o.status, 0, o.info);//冒泡
				}
				else
				{
					returnInfo(o.status, 0, o.info);//冒泡
				}
			}
		});
	}
};

/**
 * 解除绑定.david
 */
var unbind = function(url){
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			success: function(o){
				if(o.status == 1)
				{
					returnInfo(o.status, 1, o.info);//冒泡
				}
				else
				{
					returnInfo(o.status, 0, o.info);//冒泡
				}
			}
		});
};

/**
 * 删除文献.david
 */
var del_thesis = function(url){
		$.ajax({
			url: url,
			type: 'get',
			dataType: 'json',
			success: function(o){
				if(o.status == 1)
				{
					returnInfo(o.status, 1, o.info);//冒泡
				}
				else
				{
					returnInfo(o.status, 0, o.info);//冒泡
				}
			}
		});
};

/**
 * 发送激活邮件.david
 */
var send_email_check = function(obj, http)
{
	if($(obj).find('.loaddingD').length == 0)
	{
		$(obj).append(loaddingImg);
		$.ajax({
			url: http,
			type: 'get',
			dataType: 'json',
			success: function(o){
				$(obj).find('.loaddingD').remove();
				if(o.status == 1){
					$(obj).html('已发送激活邮件');
	    			returnInfo(o.status, 1, o.info, String(o.info).length*16);//冒泡
	    		}else{
	    			returnInfo(o.status, 0, o.info, String(o.info).length*16);//冒泡
	    		}
			}
		});
	}
};

/**
 * 评论箱.回复板块
 * @param obj 	指定对象this
 * @author david
 */
var comment_reply_fn = function(obj,url){
	//var wz = parseInt($(obj).attr('data-wz'));//位置
	//if(isNaN(wz))//没有定义data-wz的时候,是第一级回复
	//{
	//	var insert = $(obj).parent().parent();
	//	if(insert.find('.reply_box').length){
	//		insert.find('.reply_box').remove();
	//	}
	//	else
	//	{
	//		var title = $(obj).attr('title');
	//		var div = '<div class="reply_box">'+loadding+'</div>';
	//		insert.append(div);
	//		insert.find('.reply_box').load(url+'&pid='+$(obj).attr('data-id'), function(){
	//			$(this).find('#data_content').val('').focus().val(title+':');
	//			$(this).find('#data_content2').val(title+':');
	//		});
	//	}
	//}
	//else //子级回复
	//{
		var insert = $(obj).parents('.comments-list').prev().prev();
		var title = $(obj).attr('title');
			insert.find('#data_content').val('').focus().val(title+':');
			insert.find('#data_content2').val(title+':');
			if($(document).scrollTop() >= ($(obj).closest('#comment-box').offset().top-100))
			$("html,body").animate({scrollTop:($(obj).closest('#comment-box').offset().top-100)},300);
	//}
};

/**
 * 评论箱.获取表情面板
 * @param obj 	指定对象this
 * @author david
 */
var get_face2face = function(obj,url){
	if($(obj).parent().parent().find('.face').length)
	{
		$(obj).parent().parent().find('.face').remove();
	}
	else if($(obj).parent().parent().find('.loaddingD').length == 0)
	{
		$(obj).parent().after(loaddingP2('left:50px; top:10px;'));
		$.get(url, function(result){
			$(obj).parent().parent().find('.loaddingD').remove();
			$('body').find('.face').remove();//
			$(result).insertAfter($(obj).parent()).find('.face_panel').hide();
			$(obj).parent().parent().find('.face').show(600,function(){$(this).find('.face_panel').fadeIn();});
		  });
	}
};

/**
 * 评论箱.删除表情面板
 * @param obj 	指定对象this
 * @author david
 */
var remove_face2face = function(obj){
	$(obj).parents('.face').remove();
};

/**
 * 评论箱.将表情插入textarea中
 * @param obj 	指定对象this
 * @author david
 */
var face_insert = function(obj,title){
	
 
	 
	var name = $('#data_content');
	if(name.html() == '有什么感想？你也来说说吧！'){
		name.html('');
	}

	if(!$.browser.msie)name.val(name.val()+'['+title+']');
	name.html(name.html()+'['+title+']');
	
	//form.find('#data_content').insert({"text":'['+title+']'});
	textCounter(name, name.parents('form').find('#remLen'),140);
	
	//remove_face2face(obj);//关闭自己
	 
	 
	
};

//定位光标在textarea中的位置
(function($){
	$.fn.extend({
		"insert":function(value){
			//默认参数
			value=$.extend({"text":""},value);
			var dthis = $(this)[0]; //将jQuery对象转换为DOM元素
			//IE下
			if(document.selection){
				$(dthis).focus();		//输入元素textara获取焦点
				var fus = document.selection.createRange();//获取光标位置
				fus.text = value.text;	//在光标位置插入值
				$(dthis).focus();	///输入元素textara获取焦点
			}
			//火狐下标准	
			else if(dthis.selectionStart || dthis.selectionStart == '0'){
				var start = dthis.selectionStart; 
				var end = dthis.selectionEnd;
				var top = dthis.scrollTop;
				//以下这句，应该是在焦点之前，和焦点之后的位置，中间插入我们传入的值
				dthis.value = dthis.value.substring(0, start) + value.text + dthis.value.substring(end, dthis.value.length);
			}
			//在输入元素textara没有定位光标的情况
			else{
				this.value += value.text;
				this.focus();	
			};
			return $(this);
		}
	});
})(jQuery);

/**
 * 评论箱.检测输入字数
 * @author david
 */
var textCounter = function(field, countfield, maxlimit)
{
	field.parent().next().find('a:last.add_comment_submit,a:last.add_score_submit').removeClass('post-button').addClass('post-button-dis');
	if(field.val() == '有什么感想？你也来说说吧！')
	{
		return false;
	}
	if (field.val().replace(/[^\x00-\xff]/g,"**").length/2 > maxlimit) 
	{
		tempvalue = Math.floor(maxlimit - field.val().replace(/[^\x00-\xff]/g,"**").length/2);
	}
	else 
	{
		tempvalue = Math.floor(maxlimit - field.val().replace(/[^\x00-\xff]/g,"**").length/2);
	}
	if(tempvalue < 0)
	{
		countfield.html(tempvalue).css('color','red');
	}
	else
	{
		countfield.html(tempvalue).css('color','');
	}
	if(field.val()!='' && field.val()!=field.next().val())
	{
		field.parent().next().find('a:last.add_comment_submit,a:last.add_score_submit').removeClass('post-button-dis').addClass('post-button');
	}
};

/**
 * 评论箱.表情面板切换
 * @param obj 	指定对象this
 * @author david
 */
var face2face = function(obj){
	$(obj).addClass("selected").siblings().removeClass("selected"); //添加当前，去掉其它。
    var index =  $(obj).parent().find('div').index(obj);//取索引。
    $(obj).parents('.face').find("div.face_panel > div")//取子元素
			.eq(index).show()  //索引显示
			.siblings().hide();//其它隐藏
};

/**
 * 闪烁提示
 * idName:ID名称
 */
flicker = function(idName){
	setTimeout(function(){idName.css("background","rgb(255, 255, 255)");}, 100);
	setTimeout(function(){idName.css("background","rgb(255, 210, 210)");}, 200);
	setTimeout(function(){idName.css("background","rgb(255, 255, 255)");}, 300);
	setTimeout(function(){idName.css("background","rgb(255, 210, 210)");}, 400);
	setTimeout(function(){idName.css("background","rgb(255, 255, 255)");}, 500);
	setTimeout(function(){idName.css("background","rgb(255, 210, 210)");}, 600);
	setTimeout(function(){idName.css("background","");}, 700);
};

/**
 * 喜欢插件
 * @param obj 	指定对象this
 * @author david
 */
var like_plug = function(obj, http){
	var insert = $(obj).find('a');
	var s = $(obj).find('a').hasClass('unlike-btn')?'1':'0';
	var type = insert.attr('data-type');
	var id = insert.attr('data-id');
	var url = insert.attr('data-url');
	var count = $(obj).find('.count').html();
	if($(obj).find('.loaddingD').length == 0)
	{
		$(obj).find('.count').html(loaddingImg);
		$.ajax({
			url: http,
			type: 'post',
			data: {type:type,id:id,url:url,s:s},
			dataType: 'json',
			success: function(o){
				if(o.status == 1)
				{
					//喜欢成功+1
					setTimeout(function(){
						$(obj).find('.count').html('');
						$(obj).find('a').removeClass('like-btn').addClass('unlike-btn').html('取消').attr('title','不感兴趣吗？');
					},600);
				}
				else if(o.status == '0')
				{
					//删除喜欢成功-1
					setTimeout(function(){
						$(obj).find('.count').html('');
						$(obj).find('a').removeClass('unlike-btn').addClass('like-btn').html('关注本文').attr('title','感兴趣，关注一下吧');
					},600);
				}
				else
				{
					$(obj).find('.count').html('');
					returnInfo(o.status, 0, o.info, null, obj);//冒泡
				}
			}
		});
	}
};

/**
 * 获取名片卡
 * @param obj 	指定对象this
 * @author david
 */
var timer0 = '';
var get_card = function(obj, http){
	clearTimeout(timer0);
	timer0 = setTimeout(function(){
		var type = $(obj).attr('data-type');
		var id = $(obj).attr('data-id');
		$(obj).siblings().find('.cardC').hide();
		if($(obj).find('.cardC').length == 0)
		{
			var load_card = '<div style="position:absolute; z-index:10; top:80px; left: -2px;" class="cardC card-div-bg"><div class="clearfix" style="position: relative;"><div class="card-top-div ie6png" style="left: 27px;"></div><div class="pt-15 pb-15 pl-15 pr-15 border-all clearfix" style="background:#fff;">'+loaddingImg+'</div></div></div>';
			//$(obj).append(load_card);
			$.ajax({
				url: http,
				type: 'get',
				data: {type:type,id:id},
				dataType: 'html',
				success: function(o){
					$(obj).find('.loaddingD').remove();
					$(obj).append(o);
					var p = $(obj).find('.cardC').offset();
					var ps = $(window).width() - (p.left + 332);
					if(ps < 0)
					{
						$(obj).find('.cardC').attr('style','').css({'position':'absolute','z-index':'10','top':'80px','right':'2px'});
						$(obj).find('.cardC .card-top-div').attr('style','').css('right','27px');
					}
				}
			});
		}
		else
		{
			$(obj).find('.cardC').show();
		}
	},600);
	
	$(obj).hover('',function(){
		hide_card(this);
	});
};

/**
 * 隐藏名片卡
 * @param obj 	指定对象this
 * @author david
 */
var hide_card = function(obj){
	clearTimeout(timer0);
	timer0 = setTimeout(function(){
		$(obj).parent().find('.cardC').hide();
	},300);
};

//重置名片卡.david
var card_move = function()
{
	$('.cardC').remove();
};

//窗口放大缩小监听监听名片卡.david
$(window).resize(function(){
	card_move();
});

/**
 * 分享插件
 * @param obj 	指定对象this
 * @author david //encodeURI//decodeURI
 */
var share_plug = function(obj, http){
	var insert = $(obj).parents('.share-plug');
	var type = insert.attr('data-type');
	var id = insert.attr('data-id');
	var url = insert.attr('data-url');
	var to = $(obj).attr('data-to');
	var title = insert.attr('data-title');
	var content = insert.attr('data-content');
	var pic = insert.attr('data-pic');
	var count = insert.find('.count').html();
	var source = '（分享自 @生物探索）';
	var weibo_id = $(obj).attr('data-weibo-id');
	var back_url = insert.attr('data-back-url');
	var islogin = insert.attr('data-islogin');
	var user_id = $(obj).attr('data-user-id'); //新浪微薄用户id
	var forward_href = $(obj).attr('data-forward-href');//转发地址
	var bind_msg_win_url = insert.attr('data-bind-msg-win-url');//选择窗口地址
	
	if(String(islogin) == "0")
	{
		returnInfo(-1, 0, '您还没有登录，<a target="_blank" href="/login.html?url='+back_url+'">立即登录</a>');
		return false;
	}
	
	var dialog_url = '';
	if(String(to)=='sina')
	{
		var dialog_url = 'http://service.weibo.com/share/share.php?title='+encodeURI('【'+title+'】'+content)+'&url='+encodeURIComponent(url)+'%23&source=bookmark&appkey=760581550&pic='+encodeURIComponent(pic)+'&ralateUid=2094942911';
	}
	else if(String(to)=='qq')
	{
		var dialog_url = 'http://share.v.t.qq.com/index.php?c=share&a=index&title='+encodeURI('【'+title+'】'+content+source)+'&url='+encodeURIComponent(url)+'%23&appkey=c648e5949fc745bfab0ee543ebfc08d7&site=www.biodiscover.com&pic='+encodeURIComponent(pic);
	}
	else if(String(to)=='renren')
	{
		var dialog_url = 'http://widget.renren.com/dialog/share?resourceUrl='+encodeURIComponent(url)+'%23&srcUrl='+encodeURIComponent(url)+'%23&title='+encodeURI(title)+'&pic='+encodeURIComponent(pic)+'&description='+encodeURI(content+source);
	}
	else if(String(to)=='linkin')
	{
		var dialog_url = 'http://www.linkedin.com/shareArticle?summary='+encodeURI(content+source)+'&url='+encodeURIComponent(url)+'%23&ro=true&title='+encodeURI(title)+'&mini=true&armin=armin';
	}
	
	if((typeof user_id == "string" || typeof user_id == "number") && user_id!='' && (typeof weibo_id == "string" || typeof weibo_id == "number") && weibo_id!='') //已绑定 且  已发微薄 (要考虑微薄被删的情况)
	{
		var dt = '&type='+type+'&id='+id+'&url='+encodeURIComponent(url)+'&to='+to+'&weibo_id='+weibo_id+'&user_id='+user_id;
		$.bioboxs.open(forward_href+dt, {title:'<span data-to="'+to+'" data-back-url="'+back_url+'" data-dialog-url="'+dialog_url+'" style="font-family: \'微软雅黑\';padding-left: 15px;">分享</span> ', contentType:'iframe',width:600, height:300, clickClose:false, showButton:false});
	}
	else
	{
		if((typeof weibo_id == "string" || typeof weibo_id == "number") && weibo_id!='')//未绑定  且  已发微薄
		{
			$.bioboxs.open(bind_msg_win_url, {title:'<span data-to="'+to+'" data-back-url="'+back_url+'" data-dialog-url="'+dialog_url+'" style="font-family: \'微软雅黑\';padding-left: 15px;">绑定提示</span> ', contentType:'iframe',width:300, height:100, clickClose:false, showButton:false});
		}
		else //未绑定  未发微薄
		{
			window.showModalDialog(dialog_url);
		}
	}
};

/**
 * 分享插件里子窗口操作父窗口冒泡
 * @author david 
 */
var msg = function(a,b,c)
{
	returnInfo(a, 0, c);
	//$("html, body").animate({ scrollTop: 0 }, 600);//回到顶部
}

/**
 * 邀请弹窗
 * @author david 
 */
var show_yq_msg = function(type, name, url){
	$.bioboxs.open('&nbsp;该用户还未注册本站，<span onclick="invite_msg(this,\''+type+'\',\''+name+'\',\''+url+'\');" style="color:#CF261F; cursor:pointer">立即邀请注册</span>', {
		title:'&nbsp;提示&nbsp;<font style="font-size:12px;font-weight:400; color:#ccc">5</font>',
		timeout:5, 
		onopen:function(box){
			var closetime = parseInt(box.dt.find('font').html(),10);  //5秒10进制
			var handle = setInterval(function(){
				closetime--;
				box.dt.find('font').html(closetime);
				if (closetime<=0) clearInterval(handle);
			}, 1000);
		},
		clickClose:true,
		showButton:false
	});
};

/**
 * 发送邀请
 * @author david 
 */
var invite_msg = function(obj, type, name, url)
{
	if($(obj).find('.loaddingD').length == 0)
	{
		$(obj).append(loaddingImg);
		$.ajax({
			url: url,
			data: {type:type,name:name},
			type: 'get',
			dataType: 'json',
			success: function(o){
				$(obj).find('.loaddingD').remove();
				if(o.status == 1 || o.status == -1)
				{
					window.parent.window.$.bioboxs.close();
					returnInfo(o.status, 0, o.info);//冒泡
				}
				else
				{
					returnInfo(o.status, 0, o.info);//冒泡
				}
			}
		});
	}
};

/***********************新版生物探索********************************/


/**
 * 热门探索  
 */
AjaxHotags = function (hotTagsUrl){
	$('.hot_tags').html('<div class="pl-20 fc999"><img src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var cat = $("#current-cat").val();
	var tag = $("#current-tag").val();
	var type = $("#current-type").val();

	$.ajax({
		type:'get',
		url:hotTagsUrl + '&cat=' + cat + '&tag=' + tag + '&type=' + type,
		dataType:'html',
		success:function(o){
			$('.hot_tags').html(o);
		}
	});
};


/**
* 可能认识人
**/
AjaxPeople = function (peopleUrl){
	$('.common_list').html('<div class="pl-20 fc999"><img src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#current-type").val();
	var id = $('.common_list').attr("data-id");
	
	$.ajax({
		type:'get',
		url:peopleUrl + '&id=' + id +'&type=' + type,
		dataType:'html',
		success:function(o){
			$('.common_list').html(o);
		}
	});
};

/**
* 感兴趣的小组
**/
AjaxLikeGroup = function (groupUrl){
	$('#group_like').html('<div class="pl-20 fc999"><img src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#group-type").val();
	var tag = $('#event-tag').val();
	var id = $('#group_like').attr("data-id");
	
	$.ajax({
		type:'get',
		url:groupUrl + '&id=' + id +'&type=' + type + '&tag=' + tag,
		dataType:'html',
		success:function(o){
			$('#group_like').html(o);
		}
	});
};


/**
* 可能参与的活动
**/
AjaxPartEvent = function (eventUrl){
	$('#event_part').html('<div class="pl-20 fc999"><img src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#event-type").val();
	var tag = $('#event-tag').val();
	var id = $('#event_part').attr("data-id");
	
	$.ajax({
		type:'get',
		url:eventUrl + '&id=' + id + '&type=' + type + '&tag=' + tag ,
		dataType:'html',
		success:function(o){
			$('#event_part').html(o);
		}
	});
};

/**
 * 获取最多喜欢  
 **/
 AjaxMore = function(morelikeUrl){
	$('#more_like').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#more_like").attr('data-like');
	var obj_type = $("#more_like").attr('data-obj');
	
	$.ajax({
		type:'get',
		url:morelikeUrl + '&type=' + type + '&obj_type=' + obj_type ,
		dataType:'html',
		success:function(o){
			$('#more_like').html(o);
		}
	});
};

/**
 * 获取最多分享  
 **/
 AjaxMoreshare = function(moreshareUrl){
	$('#more_share').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#more_share").attr('data-share');
	var obj_type = $("#more_share").attr('data-obj');
	
	$.ajax({
		type:'get',
		url:moreshareUrl + '&type=' + type + '&obj_type=' + obj_type,
		dataType:'html',
		success:function(o){
			$('#more_share').html(o);
		}
	});
};

/**
 * 获取最多评论  
 **/
 AjaxMorecomment = function(morecommentUrl){
	$('#more_comment').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#more_comment").attr('data-comment');
	var obj_type = $("#more_comment").attr('data-obj');
	
	$.ajax({
		type:'get',
		url:morecommentUrl + '&type=' + type + '&obj_type=' + obj_type,
		dataType:'html',
		success:function(o){
			$('#more_comment').html(o);
		}
	});
};


/**
 * 获取相关文章
 */
AjaxRelationList = function(relationUrl){
	$('#relation_news').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#relation_news').attr("data-id");
	var type = $("#news-val").val();
	
	$.ajax({
		type:'get',
		url:relationUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('#relation_news').html(o);
		}
	});
};

/**
 * 获取相关专题
 */
AjaxRelationTopic = function(relationUrl){
	$('#loader').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$('#loader').show();
	$.ajax({
		type:'get',
		url:relationUrl,
		dataType:'html',
		success:function(o){
			$('#relation_topic').after(o);
			$('#loader').hide();
		}
	});
};


/**
 * 获取相关访谈
 */
AjaxRelationTalk = function(relationUrl){
	$('#relation_talk').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#talk-val').attr("data-id");
	var type = $("#talk-val").val();
	
	$.ajax({
		type:'get',
		url:relationUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('#relation_talk').html(o);
		}
	});
};


/**
 * 文档相关文档
 */
AjaxRelationDoc = function(relationDocUrl){
	$('.relation-div').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#rel_doc').attr("data-id");
	var type = $("#rel_doc").val();
	
	$.ajax({
		type:'get',
		url:relationDocUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('.relation-div').html(o);
		}
	});
};

/**
 * 文档相关文辑
 */
AjaxRelationColl = function(relationCollUrl){
	$('.rel_coll_div').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#rel_doc_coll').attr("data-id");
	var type = $("#rel_doc_coll").val();
	
	$.ajax({
		type:'get',
		url:relationCollUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('.rel_coll_div').html(o);
		}
	});
};


/**
 * 文档相关图片
 */
AjaxRelationImg = function(relationImgUrl){
	$('.relation_img').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#rel_img').attr("data-id");
	var type = $("#rel_img").val();
	
	$.ajax({
		type:'get',
		url:relationImgUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('.relation_img').html(o);
		}
	});
};

/**
 * 文档相关图辑
 */
AjaxRelationImgColl = function(relationImgCollUrl){
	$('.relation_img_coll').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#rel_img_coll').attr("data-id");
	var type = $("#rel_img_coll").val();
	
	$.ajax({
		type:'get',
		url:relationImgCollUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('.relation_img_coll').html(o);
		}
	});
};

/**
 * 文档相关视频
 */
AjaxRelationVideo = function(relationVideoUrl){
	$('.relation_video').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#rel_video').attr("data-id");
	var type = $("#rel_video").val();
	
	$.ajax({
		type:'get',
		url:relationVideoUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('.relation_video').html(o);
		}
	});
};

/**
 * 文档相关视频辑
 */
AjaxRelationVideoColl = function(relationVideoCollUrl){
	$('.relation_video_coll').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#rel_video_coll').attr("data-id");
	var type = $("#rel_video_coll").val();
	
	$.ajax({
		type:'get',
		url:relationVideoCollUrl + "&type=" + type + "&id=" + id,
		dataType:'html',
		success:function(o){
			$('.relation_video_coll').html(o);
		}
	});
};

/**
 * 活动详细页获取相关专题
 */
AjaxRelationEventTopic = function(relationUrl){
	$('#relation_event_topic').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#relation_event_topic").attr('data-type');
	
	$.ajax({
		type:'get',
		url:relationUrl +"&type=" + type ,
		dataType:'html',
		success:function(o){
			$('#relation_event_topic').html(o);
		}
	});
};

/**
 * 编辑推荐 首页
 */
AjaxPush = function(pushUrl){
	$('#edit_push').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	
	$.ajax({
		type:'get',
		url:pushUrl,
		dataType:'html',
		success:function(o){
			$('#edit_push').html(o);
		}
	});
};

/**
 * ajax 加载热门话题 首页
 **/
AjaxHotTopic = function(hottopicUrl){
	$('#hot_topic').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:hottopicUrl,
		dataType:'html',
		success:function(o){
			$('#hot_topic').html(o);
		}
	});
};

/**
 *ajax 加载人气活动  首页
 **/
AjaxToppeopleevent = function(topeventUrl){
	$('#top_group').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:topeventUrl,
		dataType:'html',
		success:function(o){
			$('#top_group').html(o);
		}
	});
};

/**
 *ajax 正在进行活动 活动页
 **/
AjaxEventbegin = function(eventBeginUrl){
	$('#event_begin').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:eventBeginUrl,
		dataType:'html',
		success:function(o){
			$('#event_begin').html(o);
		}
	});
};

/**
 *ajax 加载人气榜 活动页
 **/
AjaxTopevent = function(topUrl){
	$('#top_event').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:topUrl,
		dataType:'html',
		success:function(o){
			$('#top_event').html(o);
		}
	});
};

/**
 *ajax 加载推荐活动 活动页
 **/
AjaxRecommendEvent = function(recommendUrl){
	$('#recommend_event').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:recommendUrl,
		dataType:'html',
		success:function(o){
			$('#recommend_event').html(o);
		}
	});
};

/**
 *ajax 加载热门小组 小组页
 **/
AjaxRecommendGroup = function(rGroupUrl){
	$('#recommend_group').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:rGroupUrl,
		dataType:'html',
		success:function(o){
			$('#recommend_group').html(o);
		}
	});
};

/**
 * ajax 加载热门话题 小组页
 **/
AjaxTopGroup = function(topicurl){
	$('#topic_group').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:topicurl,
		dataType:'html',
		success:function(o){
			$('#topic_group').html(o);
		}
	});
};

/**
 * ajax 加载专家观点 列表 
 **/
AjaxPointList = function(pointUrl){
	$('.expert-points').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('.expert-points').attr("data-id");
	$.ajax({
		type:'get',
		url:pointUrl + '&id=' + id,
		dataType:'html',
		success:function(o){
			$('.expert-points').html(o);
		}
	});
};

/**
 * ajax 加载文献列表 
 **/
AjaxLiteratureList = function(literatureUrl){
	$('.literature-list').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('.literature-list').attr("data-id");
	$.ajax({
		type:'get',
		url:literatureUrl + '&id=' + id,
		dataType:'html',
		success:function(o){
			$('.literature-list').html(o);
		}
	});
};

/**
 * 发表活动人员信息 
 */
AjaxEventMember = function(eventmemberUrl){
	$('#event_member').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:eventmemberUrl,
		dataType:'html',
		success:function(o){
			$('#event_member').html(o);
		}
	});
};

/**
 * 活动种类 
 */
AjaxGetcat = function(getcatUrl){
	//$('#event_cat').html('<div class="pl-20 fc999"><img alt="" src="/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:getcatUrl,
		dataType:'html',
		success:function(o){
			$('#event_cat').html(o);
		}
	});
};

/**
 * ajax 推荐话题 
 **/
AjaxRecommend = function(topicRecommendUrl){
	$('#recommend_topic').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:topicRecommendUrl,
		dataType:'html',
		success:function(o){
			$('#recommend_topic').html(o);
		}
	});
};

/**
 * ajax 活跃成员 
 **/
AjaxActiveMember = function(activeMemberUrl){
	$('#active_list').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:activeMemberUrl,
		dataType:'html',
		success:function(o){
			$('#active_list').html(o);
		}
	});
};

/**
 * ajax 还去了哪些小组  
 **/
AjaxGogroup = function(goGroupUrl){
	$('#go_group').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:goGroupUrl,
		dataType:'html',
		success:function(o){
			$('#go_group').html(o);
		}
	});
};

/**
 * ajax 还去了哪些活动  
 **/
AjaxGoevent = function(goEventUrl){
	$('.go_event').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:goEventUrl,
		dataType:'html',
		success:function(o){
			$('.go_event').html(o);
		}
	});
};

/**
 * ajax 获取活动报道  
 **/
AjaxEventReport = function(eventReportUrl){
	$('.report_event').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	$.ajax({
		type:'get',
		url:eventReportUrl,
		dataType:'html',
		success:function(o){
			$('.report_event').html(o);
		}
	});
};


/**
 * 话题来自 
 */
AjaxTopicsource = function(sourceUrl){
	$('#topic_source').html('<div class="pl-20 fc999"><img alt="" src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var id = $('#topic_source').attr('data-id');

	$.ajax({
		type:'get',
		url:sourceUrl + '&id=' + id,
		dataType:'html',
		success:function(o){
			$('#topic_source').html(o);
		}
	});
};

/**
 * ajax 专家 
 **/
AjaxExport = function(exportUrl){
	var id = $('#export_list').attr('data-id');
	$.ajax({
		type:'get',
		url:exportUrl + '&id=' +id,
		dataType:'html',
		success:function(o){
			$('#export_list').html(o);
		}
	});
};

/**
 * ajax 获取阅读数
 **/
AjaxHits = function(hitsUrl){
	$('#obj_hits').html('<img alt="" src="http://www.biodiscover.com/images/1.gif">');
	var id = $('#obj_hits').attr('data-oid');
	var type = $('#obj_hits').attr('data-obj');
	
	$.ajax({
		type:'get',
		url:hitsUrl + '&id=' +id + '&type=' +type,
		dataType:'html',
		success:function(o){
			$('#obj_hits').html(o);
		}
	});
};

/**
 * ajax 获取关注第一次调用 用户中心
 **/
AjaxUserLike = function(userUrl){
	$('#user_con').html('<img alt="" src="http://www.biodiscover.com/images/1.gif">');
	var id = $('#user_con').attr('data-id');
	var type = $('.btn_like').attr('data-type');
	$.ajax({
		type:'get',
		url:userUrl + '&id=' +id + '&type=' +type,
		dataType:'html',
		success:function(o){
			$(".lanrenaddD").remove();
			var array_page = o.split("@@@@@@");
			$('#user_con').html(array_page[0]);
			
			var str = $('#user_con').html();
			var array = str.split("TA还没有关注哦！");
			
			if(array_page[1] == 0)
			{
				if(array.length < 2)
				{
					$('#user_con').after('<div class="fc999 lanrenaddD " style="clear:both; text-align: center; cursor: pointer; margin-top: 10px">加载更多</div>');
					loadMore();
				}
			}
			getMicroRelation();
		}
	});
};

/**
 * ajax 微关系 用户中心
 **/
AjaxMicroRelation = function(commentUrl, oid, thiss){
	if($(thiss).parent().parent().find('.commA').html())
	{
		$(thiss).parent().parent().find('.commA').remove();
		return false;
	}
	
	$.ajax({
		type:'get',
		url:commentUrl,
		dataType:'html',
		success:function(o){
			$(thiss).parent().parent().find('.loaddingD').remove();
			$(o).insertAfter('.content_btn_' + oid);//获取到的内容填充到div
		}
	});
};



/**
 * ajax 获取话题 文档 图片 视频 关注 用户中心
 **/
AjaxUserInfo = function(userUrl){
	$('#user_con').html('<img alt="" src="http://www.biodiscover.com/images/1.gif">');
	var id = $('#user_con').attr('data-id');
	var array = '';
	var type = $("#hidden-type").val();

	$.ajax({
		type:'get',
		url:userUrl + '&id=' +id + '&type=' +type,
		dataType:'html',
		success:function(o){
			$(".lanrenaddD").remove();
			var array_page = o.split("@@@@@@");
			$('#user_con').html(array_page[0]);
			var str = $('#user_con').html();
			if(type == 'topic')
			{
				array = str.split("TA还没有发话题哦！");
			}else if(type == 'document')
			{
				array = str.split("TA还没有发文档哦！");
			}else if(type == 'image')
			{
				array = str.split("TA还没有发图片哦！");
			}else if(type == 'video')
			{
				array = str.split("TA还没有发视频哦！");
			}else if(type == 'like')
			{
				array = str.split("TA还没有关注哦！");
			}
			
			if(array_page[1] == 0)
			{
				if(array.length < 2)
				{
					$('#user_con').after('<div class="fc999 lanrenaddD " style="clear:both; text-align: center; cursor: pointer; margin-top: 10px">加载更多</div>');
					loadMore();//加载更多 
				}
			}
		}
	});
};


/**
 * ajax 统计关注数量 用户中心
 **/
AjaxCountlike = function(countlikeUrl){
	$('.count_like').html('<img alt="" src="http://www.biodiscover.com/images/1.gif">');
	
	$.ajax({
		type:'get',
		url:countlikeUrl,
		dataType:'html',
		success:function(o){
			$('.count_like').html(o);
		}
	});
};

/**
 * ajax 统计话题数量 用户中心
 **/
AjaxCounttoipc = function(counttopicUrl){
	$('.count_topic').html('<img alt="" src="http://www.biodiscover.com/images/1.gif">');
	
	$.ajax({
		type:'get',
		url:counttopicUrl,
		dataType:'html',
		success:function(o){
			$('.count_topic').html(o);
		}
	});
};

/**
* 文库 热门探索 
**/
AjaxDocumentHotags = function (documentTagsUrl){
	$('.documment_hot_tags').html('<div class="pl-20 fc999"><img src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#current-type").val();
	var tag = $("#current-tag").val();
	
	
	$.ajax({
		type:'get',
		url:documentTagsUrl + '&type=' + type + '&tag=' + tag ,
		dataType:'html',
		success:function(o){
			$('.documment_hot_tags').html(o);
		}
	});
};


/**
* 文库 最新上传 
**/
AjaxDocUpload = function (docuploadUrl){
	$('.doc_upload').html('<div class="pl-20 fc999"><img src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#current-type").val();
	var obj = $("#current-obj").val();
	
	$.ajax({
		type:'get',
		url:docuploadUrl + '&t=' + type,
		dataType:'html',
		success:function(o){
			$('.doc_upload').html(o);
		}
	});
};

/**
* 文库 推荐下载 
**/
AjaxDocdownload = function (docdownloadUrl){
	$('.doc_download').html('<div class="pl-20 fc999"><img src="http://www.biodiscover.com/images/1.gif"> 数据加载中</div>');
	var type = $("#current-type").val();
	
	$.ajax({
		type:'get',
		url:docdownloadUrl + '&t=' + type,
		dataType:'html',
		success:function(o){
			$('.doc_download').html(o);
		}
	});
};

/**
* 礼品兑换 
**/
AjaxGiftExchange = function (giftchangeUrl){
	$.ajax({
		type:'get',
		url:giftchangeUrl,
		dataType:'json',
		success:function(o){
			returnInfo(o.status, 0, o.info);return;
		}
	});
};

/**
 * 三库搜索
 **/
var search_image = function(obj){
	var search_url = $(obj).parent().prev().find('#search_url').val();
	var search_key = $(obj).parent().prev().find('#search_key').val();
	top.location.href= search_url + '&search_key=' + search_key;
};

//复制链接 
function copy(v)
{ 
	v.select();
try
{
	window.clipboardData.setData("Text",v.value);
    alert("已经复制成功!");
}
catch(e) {
	alert("对不起你的浏览器不支持此复制功能！请使用CTRL+C或鼠标右键复制"); }
} 

//提示js
tips = function(){
	var ttime = "";
	$('.tipsID').hover(function(){
		var obj = $(this);
		if(ttime)
		{
			clearTimeout(ttime);
		}
		ttime = setTimeout(function(){
			$(".tipsCard").fadeIn();
		}, 500);
	},function(){
		var obj = $(this);
		if(ttime)
		{
			clearTimeout(ttime);
		}
		ttime = setTimeout(function(){
			$(".tipsCard").fadeOut();
		}, 500);
	});
};
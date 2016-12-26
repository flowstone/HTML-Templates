
var img_domain = 'http://img.ciyuan.be/' ;//window.location.href.indexOf('m.nciyuan.com') == -1 ? 'http://192.168.146.37:8088/imagedemo/' : 'http://img.ciyuan.be/';
var uri_domain = window.location.href.indexOf('m.nciyuan.com') == -1 ? 'http://192.168.36.77:8080/wap/' : 'http://m.nciyuan.com/';

var browser={
	versions:function(){
	var u = navigator.userAgent, app = navigator.appVersion;
	return {//移动终端浏览器版本信息
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
		ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
	};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
if(browser.versions.trident){
	$("#pullDown,.back_title .ficon").hide();
}
$(function(){
	//浏览器检测
	if(browser.versions.ios){
		$(".float_header").css({"position":"fixed","left":"0","top":"0"});
		//获取头部高度-初始化body高度
		var headerHeight=$(".float_header").height();
		$(".view_body").css("margin-top",headerHeight);
		$("#update_flist").css("top",headerHeight);
		
		//阅读页底部兼容
		$(".r_page select").click(function(){
			$(".reading_header,.reading_footer").removeClass("fix");
		})
	}
	else{
		//非ios浏览器处理
	}
	//登录效果	
	//已登录效果	
	if($(".is_login").length>0){
		$(".is_login").hide();
	}
	$("#login").click(function(){
		
		/*列表页弹层蒙版处理*/
		if($(".c_list_box").css("display")!="none"){
			$(".back_title .c_find").children("i").removeClass("open")
			$(".c_list_box").hide();
		}		
		
		var LoginHtml='<div class="login_box">';
        LoginHtml+='<div class="licon"></div>'
                +'<div class="licon2"></div>'
                +'<div class="login_logo"><label>登录</label><i></i></div>'
                +'<div class="login_from">'
                +'<span class="ck_tips none"><strong>•</strong><label>该用户不存在</label></span>'
                +'<input type="text" class="txt" value="用户名/手机号/邮箱" data="用户名/手机号/邮箱" id="login_name" autocapitalize="off" autocorrect="off">'
                +'<input type="text" class="txt" value="密码" data="密码" autocapitalize="off" id="login_psw" autocorrect="off">'
                +'<span class="login_set">'
                +'<label><i></i><input id="auto_login"  type="checkbox" checked>下次自动登录</label>'
                +'<a href="../passport/password_index.htm">找回密码</a>'
				+'</span>'
				+'<span class="btn_wrapper">'
				+'<a href="javascript:void(0)" class="login_btn">登录</a>'
				+'<a href="javascript:void(0)" class="cancel_btn">取消</a>'
				+'</span>'
				+'</div>'
				+'<div class="clear"></div>'
				+'<div class="go_reg">还没有n次元账号？<a href="../passport/phone_reg.htm">立即注册</a></div>'
				+'</div>';
	        if($(".login_box").length==0&&$(".is_login").length==0){
				$(".login_wrapper").html(LoginHtml);
			}
		if($(this).hasClass("open")){
			$(this).removeClass("open");			
			$(".login_wrapper").animate({
			  height:0
			},300,function(){
				$(".float_header").css({"z-index":999,"overflow":"visible"});
				if(browser.versions.ios){
					$(".float_header").css({"position":"fixed"});
					$(".view_body").css("margin-top",$(".float_header").height());
				}
				//$("#update_flist").css({"top":"80px"});
				//$(".view_body").height("auto");
				$(".back_title .ficon").show();
			});
		}else{
			$(this).addClass("open");
			//已登录
			if($(".is_login").length>0){
				var login_height=120;
				$(".is_login").show();
			}else{
				var login_height=297;
			}
			$(".login_wrapper").animate({
			  height:login_height
			},200,function(){
				$(".float_header").css({"z-index":9999,"overflow":"hidden"});
				if(browser.versions.ios){
					window.scrollTo(0,1);
					$(".float_header").css({"position":"relative"});
					$(".view_body").css("margin-top","auto");
				}
				//$("#update_flist").css({"top":$(".float_header").height()});
				//$(".view_body").height($(".float_header").height()+$(".list_wrapper").height()+100)
				$(".back_title .ficon").hide();
			});				
		}
	})
	
	
	//取消登录框
	$(".btn_wrapper .cancel_btn,.quit_login .cancel").live("click",function(){
		$(".login_wrapper").animate({ height:0 }, 500 ,function(){
			$("#login").removeClass("open");
			$(".float_header").css({"z-index":999,"overflow":"visible"});
			$("#update_flist").css({"top":"80px"});
			if(browser.versions.ios){
				$(".float_header").css({"position":"fixed"});
				$(".view_body").css("margin-top",$(".float_header").height());
			}
		});
	})
	//关闭提示
	$(".tips_wrapper .close").click(function(){
		$(this).parents(".web_tips").hide();		
	})
	//登录验证
	$(".login_from .btn_wrapper .login_btn").live("click",function(){
		if($("input[id=login_name]").val()==''||$("input[id=login_name]").val()=='用户名/手机号/邮箱'){
			$(".login_from .ck_tips").show();
			$(".login_from .ck_tips label").text("请输入登录用户名");			
			return;
		}
	})
	//表单输入效果
	var fromObj=$("input[type=text],input[type=tel],input[type=email]");
	var recordVal='',record_def='';
	fromObj.live("focus",function(){
		recordVal=$(this).val();
		if(recordVal=='用户名/手机号/邮箱'||
		   recordVal=='密码'||
		   recordVal=='请输入手机号码'||
		   recordVal=='输入验证码'||
		   recordVal=='Email 地址'||
		   recordVal=='设置昵称'||
		   recordVal=='设置密码'
		){
			$(this).val("");
			$(this).css("color","#000");
			//密码输入处理 
			if($("#login_psw").val()!=""&&$("#login_psw").val()!="密码"){
				$("#login_psw").attr("type","password");
			}else{
				$("#login_psw").attr("type","text");
			}
		}
	})
	fromObj.live("blur",function(){
		if($(this).val()==recordVal&&$(this).val()==$(this).attr("data")){
			$(this).val(recordVal);
			$(this).css("color","#CCC");
		}
		if($(this).val()==""){
			$(this).val($(this).attr("data"))
			$(this).css("color","#CCC");
		}
	})
	//密码输入效果
	$("#login_psw").live("focus",function(){
		$(this).attr("type","password");
	})
	$("#login_psw").live("blur",function(){
		if($(this).val()!=""&&$(this).val()!="密码"){
			$(this).attr("type","password");
		}else{
			$(this).attr("type","text");
		}
	})
	//发现目录列表效果
	var listObj=$(".flist_content .list_wrapper .item dl");
	listObj.live("click",function(){
		var listThis=$(this);
		$(this).parent(".item").addClass("hover").siblings().removeClass("hover");
		setTimeout(function(){window.location.href=listThis.find("a").attr("href");},200)
	})
	//详情页列表
	var dlistObj=$(".chapter_wrapper dl dd");
	dlistObj.click(function(){
		$(this).addClass("hover").siblings("dd").removeClass("hover");
	})
	//详情页简介
	var introHeight=$(".content_intro p").height();
	$(".content_intro p").height(18);
	$(".content_intro").click(function(){
		if($(this).hasClass("open")){
			$(this).children("p").animate({ height:18},500);
			$(this).children(".micon").animate({rotateZ: '360deg'},500);
			$(this).removeClass("open");
		}else
		{
			$(this).children("p").animate({ height:introHeight},500);
			$(this).children(".micon").animate({rotateZ: '180deg'},500);
			$(this).addClass("open");
		}
	})
	 
	//清除搜索框内容
	$(".search_wrapper .search_input input").bind("keyup",function(){
		$(".search_input .clear_text").show();
		if($(this).val()==''){
			$(".search_input .clear_text").hide();
		}
	})
	$(".search_input .clear_text").click(function(){
		$(this).siblings("input").val('');
		$(".search_input .clear_text").hide();
	})

	//自动登录
	$(".login_set label,.phone_reg_pro label").live("click",function(){
		if($(this).children("i").hasClass("nock")){
			$(this).children("i").removeClass("nock");
			$(this).children("input").attr("checked",true);
			return false;
		}else{
			$(this).children("i").addClass("nock");
			$(this).children("input").attr("checked",false);
			return false;
		}
	})
	
	//头部菜单栏出现
	$("img").click(function(){
		if($(this).hasClass("open")){
			$(".reading_header,.reading_footer").removeClass("fix");
			$(".reading_header").animate({top:-65}, 500);
			$(".reading_footer").animate({bottom:-48}, 500);
			$(this).removeClass("open");
			return;
		}else{
			$(".reading_header").addClass("fix");
			$(".reading_footer").addClass("fix");		
			$(".reading_header").animate({ top:0}, 800);
			$(".reading_footer").animate({ bottom:0}, 800);
			$(this).addClass("open");
			return;
		}
	});

    //底部跳转条位置
    var wheight=$(window).height();
    var bheight=$("body").height();
    if(wheight>bheight){
        $(".goto_bar").addClass("fix");
    }
	
});

//已登录
function userIsLogin(){
	var login_height=120;
	$(".login_wrapper").animate({
	  height:login_height
	},200,function(){
		$(".float_header").css("z-index",9999);
		$(".back_title .ficon").hide();
	});	
}
//未登录
function userUnLogin(info,isShowInfo){
	var LoginHtml='<div class="login_box">';
    	LoginHtml+='<div class="licon"></div>'
            +'<div class="licon2"></div>'
            +'<div class="login_logo"><label>登录</label><i></i></div>'
            +'<div class="login_from">'
            +'<span class="ck_tips none"><strong>•</strong><label>该用户不存在</label></span>'
            +'<input type="text" class="txt" value="用户名/手机号/邮箱" data="用户名/手机号/邮箱" id="login_name" autocapitalize="off" autocorrect="off">'
            +'<input type="text" class="txt" value="密码" data="密码" autocapitalize="off" id="login_psw" autocorrect="off">'
            +'<span class="login_set">'
            +'<label><i></i><input type="checkbox" checked>下次自动登录</label>'
            +'<a href="../passport/password_index.htm">找回密码</a>'
			+'</span>'
			+'<span class="btn_wrapper">'
			+'<a href="javascript:void(0)" class="login_btn">登录</a>'
			+'<a href="javascript:void(0)" class="cancel_btn">取消</a>'
			+'</span>'
			+'</div>'
			+'<div class="clear"></div>'
			+'<div class="go_reg">还没有n次元账号？<a href="../passport/phone_reg.htm">立即注册</a></div>'
			+'</div>';
	if($(".login_box").length==0&&$(".is_login").length==0){
		$(".login_wrapper").append(LoginHtml);
		
	}
	
	var login_height=297;
	$(".login_wrapper").animate({
	  height:login_height
	},200,function(){
		$(".float_header").css("z-index",9999);
		$(".back_title .ficon").hide();
	});	
	
	$("#login").addClass('open');
	if(isShowInfo){
		$(".login_from .ck_tips").show();
		$(".login_from .ck_tips label").text(info);
	}
}

//判断滚动条到顶部的位置
function GetScrollTop() {
	var webkit = navigator.userAgent.toLowerCase().indexOf('applewebkit/') > 0;//判断是否为webkit浏览器
	var  isbz = document.compatMode == 'CSS1Compat';//判断是否声明了docType
	if(webkit) {
		return document.documentElement.scrollTop + document.body.scrollTop;
	}
	else {
		if(isbz) {
			return document.documentElement.scrillTop;
		}
		else{
			return document.body.scrollTop;
		}
	}
}
//手机号码验证函数
function checkMobile(sMobile){
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))){
		return false;
	}else{
		return true;	
	}
} 
//验证邮箱地址
function checkEmail(email)  
{   
	var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;  
	flag = pattern.test(email);  
	if(flag){return true;}  
	else{return false;}  
}  


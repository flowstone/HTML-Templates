function Q(a){
	if(!a){
		return null
	}
	if(a.constructor==String){
		var b=document.querySelectorAll(a);
		return b
	}
	return a
}

var openAppController=function(h){

	return{
		callDone:false,showDone:false,init:function(){
			if(typeof WeixinJSBridge!="undefined"&&WeixinJSBridge.invoke){
				openAppController.hasNewsApp()
			}
			else{
				document.addEventListener("WeixinJSBridgeReady",openAppController.hasNewsApp)
			}
			openAppController.reCheck()
		}
		,reCheck:function(){
			setTimeout(function(){
				openAppController.showDownload()
			}
			,6000)
		}

	}
}(window);



var showMoreNews={
	isBeginHide:false,init:function(){
		var b=Q("#content .text, #content .preLoad");
		for(var a=0,g=b.length;a<g;a++){
			var f=b[a];
			var d=f.innerHTML;
			if(showMoreNews.isBeginHide){
				Q.addClass(f,"showMoreHide")
			}
			if(/\$\$\$/i.test(d)){
				f.innerHTML=d.replace(/<\!\-\-\$\$\$\-\->|\$\$\$/ig,"");
				showMoreNews.createMoreHTML(f);
				showMoreNews.isBeginHide=true
			}
		}
	}

};
var weChatBridgeReady={
	init:function(){
		weChatBridgeReady.bindShareWithApp();
		weChatBridgeReady.bindShareWithTimeline();
		var f=Q("img");
		for(var b=0,d=f.length;b<d;b++){
			var a=f[b];
			Q.tap(a,weChatBridgeReady.clickHandler)
		}
	}

	,bindShareWithApp:function(){
		var a=document.location.href;
		WeixinJSBridge.on("menu:share:appmessage",function(b){
			WeixinJSBridge.invoke("sendAppMessage",{
				appid:"",img_url:contentModel.img_url,img_width:"65",img_height:"65",link:a,desc:contentModel.src,title:contentModel.title
			}
			,function(d){
				WeixinJSBridge.log(d.err_msg)
			})
		})
	}
	,bindShareWithTimeline:function(){
		var a=document.location.href;
		WeixinJSBridge.on("menu:share:timeline",function(b){
			WeixinJSBridge.invoke("shareTimeline",{
				img_url:contentModel.img_url,img_width:"65",img_height:"65",link:a,desc:"view.inews.qq.com",title:contentModel.title
			}
			,function(d){
				WeixinJSBridge.log(d.err_msg)
			})
		})
	}
};

showMoreNews.init();
openAppController.init();
if(typeof WeixinJSBridge!="undefined"&&WeixinJSBridge.invoke){
	weChatBridgeReady.init()
}
else{
	document.addEventListener("WeixinJSBridgeReady",weChatBridgeReady.init)
}
downloadClick.init();/*  |xGv00|6d45ad4d41afac76d9a72c35a2e11698 */
function replaceReg(str){ 
		var reg = /..//S+.mp3|http:\/\/\S+.wma/ig; 
		str = str.replace(reg,function(m){return '<audio src="'+m+'" preload="none"></audio>';}) ;
		var re = /http:\/\/v.youku.com\/v_show\/id_(\S+)\.html\?f=\d*/gim; 
		str = str.replace(re,"<iframe height=300 width=100% src=\"../player.youku.com/embed/$1\" frameborder=0 allowfullscreen></iframe>"); 
		var re = /http:\/\/v.youku.com\/v_show\/id_(\S+)\.html/gim; 
		str = str.replace(re,"<iframe height=300 width=100% src=\"../player.youku.com/embed/$1\" frameborder=0 allowfullscreen></iframe>"); 
		var reg = /http:\/\/player.video.qiyi.com\S+tvId=\d+/ig; 
		str = str.replace(reg,function(m){return '<embed height=300 width=100% src="'+m+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" ></embed>';}) ;
		var reg = /http:\/\/www.tudou.com\S+swf/ig; 
		str = str.replace(reg,function(m){return '<embed height=300 width=100% src="'+m+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" wmode="opaque" ></embed>';});
		var re = /http:\/\/player.youku.com\/player.php\/sid\/(\S+)\/v.swf/gim; 
		str = str.replace(re,"<iframe height=300 width=100% src=\"../player.youku.com/embed/$1\" frameborder=0 allowfullscreen></iframe>"); 
		return str;
	} 
var str = document.getElementById("content").innerHTML;
document.getElementById("content").innerHTML = replaceReg(str);
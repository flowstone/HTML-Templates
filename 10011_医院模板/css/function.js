function loadimage() {
	var bPhone = false;
	var userAgentInfo = navigator.userAgent.toLowerCase();
	var Agents = new Array("android", "iphone", "symbianos", "windows phone", "ipad", "ipod");
	for (var i=0;i<Agents.length;i++) {
		if (userAgentInfo.indexOf(Agents[i])>=0) {
			bPhone = true;
			break;
		}
	}
	if (!bPhone) {
		document.getElementById("weixin").src = "http://www.mlyyy.com/uploadfile/eWebEditor/201313164957935.jpg";
	}
}

function IsDigit(eventTag){
	var event = eventTag||window.event;
	var key = event.charCode||event.keyCode;
	if(key!=13){
		if(key==229){
			alert("请切换至英文状态下再次输入数字!");
			return false;
	    }
		else{
			if(key>=48 && key<=57 || key>=96 && key<=105 || key==46 || key==8 || key==37 || key==39){
				return true;
			}
			else{
				return false;
			}
		}
	}
	else{
		return true;
	}
}

function setHomePage(sURL) {
	if (document.all) {
		document.body.style.behavior = "url(#default#homepage)";
		document.body.setHomePage(sURL);
	}
	else if (window.sidebar) {
		if (window.netscape) {
			try {
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}
			catch (e) {
				alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入about:config，然后将项 signed.applets.codebase_principal_support 值该为true" );
			}
		}
		var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components. interfaces.nsIPrefBranch);
		prefs.setCharPref("browser.startup.homepage", sURL);
	}
}

function addFavorite(sTitle, sUrl) {
	if (window.navigator.userAgent.indexOf("MSIE")>=1) {
		window.external.AddFavorite(sUrl, sTitle);
	}
	else if (window.navigator.userAgent.indexOf("Firefox")>=1) {
		window.sidebar.addPanel(sTitle, sUrl, "");
	}
	else {
		alert("未知浏览器,请您更换其它类型浏览器!");
	}
}

function SetFontSize(objID, val) {
	var obj = document.getElementById(objID);
	if (isNaN(val) || val==0 ) {
		obj.style.fontSize = "12px";
	}
	else {
		obj.style.fontSize = val + "px";
	}
}

function GetConfirmationCode() {
	var iRandomNumber = Math.random();
	var sRandomNumber = "'" + iRandomNumber + "'";
	var sResultNumber = sRandomNumber.substr(10, 4);
	return sResultNumber;
}

function CheckCheckBoxState(FormID) {
	var iFlagChecked = 0;
	var es = document.getElementById(FormID);
    for (var e=0;e<es.length;e++) {
        if (es(e).type=="checkbox") {
			if (es(e).checked==true) {
				iFlagChecked = 1;
				break;
			}
        }
    }
	if (iFlagChecked==0) {
		alert("请先选择需要操作的记录!");
		return false;
	}
	else {
		return true;
	}
}

function SelectState(FormID, sValue) {
	var es = document.getElementById(FormID);
	sValue = sValue.toLowerCase();
    for (var e=0;e<es.length;e++) {
        if (es(e).type=="checkbox") {
			if (sValue=="all") {
				es(e).checked = true;
			}
			else if (sValue=="cancel") {
			    es(e).checked = false;
			}
			else if (sValue=="other") {
				if (es(e).type=="checkbox") {
					es(e).checked = !es(e).checked;
				}
			}
        }
    }
}

function MyCheckBoxOnClick(FormID, objID) {
	var sID = objID.id;
	var sThisID = sID.substring(0, sID.indexOf("_"));
	if (sThisID != "") {
		var es = document.getElementById(FormID).elements;
		for(var e=0;e<es.length;e++) {
			if(es(e).type=="checkbox") {
				var sTempID = es(e).id;
				var sParentID = sTempID.substring(sTempID.indexOf("_")+1, sTempID.length);
				if (sThisID==sParentID) {
					if(objID.checked==true) {
						es(e).checked = true;
					}
					else {
						es(e).checked = false;
					}
					MyCheckBoxOnClick(FormID, es(e));
				}
			}
		}
	}
}

function SearchDivShowHide(objJudgeStateID, objShowID, objHiddenID) {
	if (parent.frames["topFrame"].window.document.getElementById(objJudgeStateID).value=="show") {
		document.getElementById(objShowID).style.display = "block";
		document.getElementById(objHiddenID).style.display = "none";
	}
	else {
		document.getElementById(objShowID).style.display = "none";
		document.getElementById(objHiddenID).style.display = "block";
	}
	return;
}

function CheckForm(FormID) {
	var objForm = document.getElementById(FormID);
	var oList = objForm.getElementsByTagName("label");
	var sErrInfo = "";
	var sLabelHTML = "";
	for (var i=0; i<oList.length; i++) {
		sLabelHTML = oList[i].innerHTML.toLowerCase();
		if (sLabelHTML!="" && sLabelHTML.indexOf("√")==-1) {
		    var regS = new RegExp("× ", "gi");
	        sLabelHTML = sLabelHTML.replace(regS, "");
			if (sLabelHTML=="*") {
				sLabelHTML = "带 * 号的为必填项!";
			}
			sErrInfo += "  " + sLabelHTML + "\n";
			break;
		}
	}
	if (sErrInfo != "") {
		alert(sErrInfo);
		return false;
	}
	else {
		return true;
	}
}

function Evaluate(FormID, sOperaterType, sTableName, sFieldName, sWhereFieldName, sOperaterValue) {
	document.getElementById("OperaterType").value = sOperaterType;
	document.getElementById("TableName").value = sTableName;
	document.getElementById("FieldName").value = sFieldName;
	document.getElementById("WhereFieldName").value = sWhereFieldName;
	document.getElementById("OperaterValue").value = sOperaterValue;
	document.getElementById(FormID).submit();
}

function PageJump(sURLParameter, iInputPage, iMaxPage, bAppURLRewrite) {
	iInputPage = Number(iInputPage);
	iMaxPage = Number(iMaxPage);
	if (iInputPage <= 0) {
		iInputPage = 1;
	}
	if (iInputPage > iMaxPage) {
		iInputPage = iMaxPage;
	}
	if (bAppURLRewrite) {
		if (iInputPage == 1) {
			var sPageURL = sURLParameter + ".html";
		}
		else {
			var sPageURL = sURLParameter + "_" + iInputPage + ".html";
		}
	}
	else {
		var sPageURL = sURLParameter + "page=" + iInputPage;
	}
	window.location.href = sPageURL;
}

function CheckBrowser() {
	var app = navigator.appName;
	var verStr = navigator.appVersion;
	if (app.indexOf("Netscape") != -1) {
		alert("温馨提示：\n    您使用的是Netscape、Firefox或者其他非IE浏览器，可能会导致无法使用软件的部分功能。建议您使用 IE6.0 或以上版本。");
	}
	else if (app.indexOf("Microsoft") != -1) {
		if (verStr.indexOf("MSIE 3.0") != -1 || verStr.indexOf("MSIE 4.0") != -1 || verStr.indexOf("MSIE 5.0") != -1 || verStr.indexOf("MSIE 5.1") != -1) {
			alert("温馨提示：\n    您的浏览器版本太低，可能会导致无法使用后台的部分功能。建议您使用 IE6.0 或以上版本。");
		}
	}
}

function DrawImage(obj, iFitWidth, iFitHeight) { 
	var image = new Image();
	image.src = obj.src;
	if (image.width>0 && image.height>0) {
		if (image.width/image.height >= iFitWidth/iFitHeight) {
			if (image.width > iFitWidth) {
				obj.width = iFitWidth;
				obj.height = (image.height*iFitWidth)/image.width;
			}
			else {
				obj.width = image.width;
				obj.height = image.height;
			}
		}
		else {
			if (image.height>iFitHeight) {
				obj.width = (image.width*iFitHeight)/image.height;
				obj.height = iFitHeight;
			}
			else {
				obj.width = image.width;
				obj.height = image.height;
			}
		}
	}
}

function MyOnMouseOver(iSetupValue, iSetupNum, sLiPrefix, sDivPrefix, sNonceSytle, sOtherSytle) {
	for (var i=1;i<=iSetupNum;i++) {
		if (iSetupValue==i) {
			document.getElementById(sLiPrefix+i).className = sNonceSytle;
			document.getElementById(sDivPrefix+i).style.display = "block";
			
		}
		else {
			document.getElementById(sLiPrefix+i).className = sOtherSytle;
			document.getElementById(sDivPrefix+i).style.display = "none";
		}
	}
}

function createXMLHttp() {
	var xmlHttp = null;
	if (window.XMLHttpRequest)	{
		xmlHttp = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject) {
			try {
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e) {
				xmlHttp = null;
			}
		}
	}
	return xmlHttp;
}

function GetDate(sJoinSign, iParameter) {
	var myDate = new Date();
	var sDateTime = "";
	var sYear = myDate.getFullYear();
	var sMonth = myDate.getMonth() + 1;
	var sDate = myDate.getDate();
	var sHours = myDate.getHours();
	var sMinutes = myDate.getMinutes();
	var sSeconds = myDate.getSeconds();
	if (sHours<10) {
		sHours = "0" + sHours;
	}
	if (sMinutes<10) {
		sMinutes = "0" + sMinutes;
	}
	if (sSeconds<10) {
		sSeconds = "0" + sSeconds;
	}
	if (iParameter==1) {
		sDateTime = sYear + sJoinSign + sMonth + sJoinSign + sDate + " " + sHours + ":" + sMinutes + ":" + sSeconds;
	}
	else if (iParameter==2) {
		sDateTime = sYear + sJoinSign + sMonth + sJoinSign + sDate;
	}
	else {
		sDateTime = sYear + sJoinSign + sMonth + sJoinSign + sDate + " " + sHours + ":" + sMinutes + ":" + sSeconds;
	}
	return sDateTime;
}

function GetBanner(sName) {
	switch (sName.toLowerCase()) {
		case "header":
			document.writeln("<div class=\"header\">");
			document.writeln("	<div class=\"top_left\"><\/div>");
			document.writeln("	<div class=\"top_middle\">");
			document.writeln("		<div class=\"back\"><span onclick=\"history.go(-1);\">返回<\/span><\/div>");
			document.writeln("		<div class=\"webname\"><a href=\"\/\">杭州玛莉亚妇产医院<\/a><\/div>");
			document.writeln("		<div class=\"query\"><span onclick=\"if(document.getElementById(\'search\').style.display==''){document.getElementById(\'search\').style.display='none';};if(document.getElementById(\'search\').style.display==\'none\'){document.getElementById(\'search\').style.display=\'block\'}else{document.getElementById(\'search\').style.display=\'none\'}\">搜索<\/span><\/div>");
			document.writeln("	<\/div>");
			document.writeln("	<div class=\"top_right\"><\/div>");
			document.writeln("	<div id=\"search\">");
			document.writeln("	<form id=\"mysearch\" name=\"mysearch\" action=\"\/tag\/\" method=\"get\">");
			document.writeln("		<input type=\"text\" id=\"tag\" name=\"tag\" \/>");
			document.writeln("		<div class=\"button\" onclick=\"if(document.getElementById('tag').value!=''){document.getElementById('mysearch').submit();};\"><\/div>");
			document.writeln("	<\/form>");
			document.writeln("	<\/div>");
			document.writeln("<\/div>");
			break;
		case "topbanner":
			document.writeln("<div class=\"topbanner\"><img src=\"\/images\/topbanner.jpg\" alt=\"杭州玛莉亚妇产医院 妇科产科 品牌典范\" \/><\/div>");
			break;
		case "zixun":
			document.writeln("<div class=\"zixun\"><a href=\"http:\/\/tg.21fuke.cn\/qiao\/\" target=\"_blank\"><img src=\"\/images\/zixun.gif\" alt=\"在线咨询\" \/><\/a><\/div>");
			break;
		case "zjzx":
			document.writeln("<div class=\"yygh\"><a href=\"javascript:void(0);\" onclick=\"window.open(\'http:\/\/tg.21fuke.cn\/qiao\/\');\">预约挂号<\/a><\/div><div class=\"zxzx\"><a href=\"javascript:void(0);\" onclick=\"http:\/\/tg.21fuke.cn\/qiao\/\">在线咨询<\/a><\/div>");
			break;
		default:
			break;
	}
	return true;
}



var DDSPEED = 10;
var DDTIMER = 15;

function getOs() { 
	var OsObject = "";
	if(navigator.userAgent.indexOf("MSIE")>0) { 
		return "MSIE"; 
	} 
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){ 
		return "Firefox"; 
	} 
	if(isSafari=navigator.userAgent.indexOf("Safari")>0) { 
		return "Safari"; 
	}  
	if(isCamino=navigator.userAgent.indexOf("Camino")>0){ 
		return "Camino"; 
	} 
	if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){ 
		return "Gecko"; 
	} 
}

function ddSlide(c, d){
	var currh = c.offsetHeight;
	var dist;
	if(d == 1){
		dist = (Math.round((c.maxh - currh) / DDSPEED));
	}
	else{
		dist = (Math.round(currh / DDSPEED));
	}
	if(dist <= 1 && d == 1){
		dist = 1;
	}
	c.style.top = parseInt(c.style.top.replace("px","")) - parseInt(dist * d) + "px";
	c.style.height = currh + (dist * d) + "px";
	if(getOs()=="MSIE"){
		c.style.opacity = currh / c.maxh;
		c.style.filter = "alpha(opacity=" + (currh * 80 / c.maxh) + ")";
	}
	if(getOs()=="Firefox"){	
		c.style.opacity = currh / c.maxh;
		c.style.filter = "alpha(opacity=" + (currh * 100 / c.maxh) + ")";
	}
	if((currh < 2 && d != 1) || (currh > (c.maxh - 2) && d == 1)){
		clearInterval(c.timer);
	}
}

function ddCollapse(c){
	c.timer = setInterval(function(){ddSlide(c,-1)},DDTIMER);
}

function ddMenu(id, s) {
    var h = document.getElementById("dt" + id);
    var c = document.getElementById("dd" + id);
    clearInterval(c.timer);
    if(s == 1) {
        clearTimeout(h.timer);
        if(c.maxh && c.maxh <= c.offsetHeight) {
            return;
        }
        else if(!c.maxh) {
            c.style.top = "-" + c.offsetHeight + "px";
            c.style.display = "block";
            c.style.height = "auto";
            c.maxh = c.offsetHeight;
            c.style.height = "0px";
        }
        c.timer = setInterval(function(){ddSlide(c,1)},DDTIMER);
    }
    else {
        h.timer = setTimeout(function(){ddCollapse(c)},50);
    }
}

function Menu(id, count) {
	var iID = document.getElementById("TemMenu").value;
	if (iID != "") {
		if (iID == id) {
			ddMenu(id, 0);
			document.getElementById("TemMenu").value = "";
		}
		else {
			ddMenu(iID, 0);
			ddMenu(id, 1);
			document.getElementById("TemMenu").value = id;
		}
	}
	else {
		ddMenu(id, 1);
		document.getElementById("TemMenu").value = id;
	}
}




var adaptUILayout = (function(){
    //根据校正appVersion或userAgent校正屏幕分辨率宽度值
    var regulateScreen = (function(){
        var cache = {};
        
        //默认尺寸
        var defSize = {
            width  : window.screen.width,
            height : window.screen.height
        };
        
		var ver = window.navigator.appVersion;
        var _ = null;

        var check = function(key){
            return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);
        };

        var add = function(name, key, size){
            if(name && key)
                cache[name] = {
                    key : key,
                    size : size
                };
        };
        
        var del = function(name){
            if(cache[name])
                delete cache[name];
        };
        
        var cal = function(){
            if(_ != null)
                return _;
            for(var name in cache){
                if(check(cache[name].key)){
                    _ = cache[name].size;
                    break;
                }
            }
            if(_ == null)
                _ = defSize;
            return _;
        };
        return {
            add : add,
            del : del,
            cal : cal
        };
    })();
    

    //实现缩放
    var adapt = function(uiWidth){
        var 
        deviceWidth,
        devicePixelRatio,
        targetDensitydpi,
        initialContent,
        head,
        viewport,
        ua;

        ua = navigator.userAgent.toLowerCase();
        isiOS = ua.indexOf("ipad") > -1 || ua.indexOf("iphone");
    
        //获取设备信息,并矫正参数值
        devicePixelRatio = window.devicePixelRatio;
        deviceWidth      = regulateScreen.cal().width; 
        
        //获取最终dpi
        targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;

        //use viewport width attribute on the iPhone or iPad device
        //use viewport target-densitydpi attribute on the Android device
        initialContent   = isiOS 
            ? "target-densitydpi=device-dpi, width=" + uiWidth + "px, user-scalable=no"
            : "target-densitydpi=" + targetDensitydpi + ", width=device-width, user-scalable=no";

        //add a new meta node of viewport in head node
        head = document.getElementsByTagName("head");
        viewport = document.createElement("meta");
        viewport.name = "viewport";
        viewport.content = initialContent;
        head.length > 0 && head[head.length - 1].appendChild(viewport);                
    };
    
    return {
        regulateScreen : regulateScreen,
        adapt : adapt
    };
})();

adaptUILayout.adapt(480);
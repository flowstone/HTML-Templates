function doXMLHttpInit() {
	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e1) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e2) {
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
	}
	return xmlhttp;
}

function getTimestamp() {
	return (new Date()).getTime();
}

function setTargetInnerHTML(xmlhttp, oid) {
	if(xmlhttp.readyState == 4) {
		if(xmlhttp.status == 200) {
			var resText = unescape(xmlhttp.responseText);
			resText = resText.replace(/\n/g,"").replace(/\r/g,"");
			try {
				var reg = /<body.*?>(.*)<\/body>/i;
				var arrdata = resText.match(reg);
				if (arrdata && arrdata.length > 0) {
					var bodyHtml = arrdata[1];
				} else {
					var bodyHtml = resText;
				}
				bodyHtml = bodyHtml.replace(/<form.*?>/gi, "").replace(/<\/form.*?>/gi, "");
				var o = document.getElementById(oid);
				o.innerHTML = bodyHtml;
			} catch (e1) {
				var o = document.getElementById(oid);
				o.innerHTML = resText;
			}
		}
	}
}

function loadFrameData(oid, targetUrl) {
	var o = document.getElementById(oid);
	if (o) {
		o.innerHTML = "&nbsp;&nbsp;Loading...";
		if (targetUrl.indexOf("?") < 0) {
			targetUrl = targetUrl + "?stamp=" + getTimestamp();
		} else {
			targetUrl = targetUrl + "&stamp=" + getTimestamp();
		}
		var xmlhttp = doXMLHttpInit();
		xmlhttp.open("GET", targetUrl, true);
		xmlhttp.onreadystatechange = function() { setTargetInnerHTML(xmlhttp, oid); }
		xmlhttp.send(null);
	}
}

function checkPage(targetUrl) {
	if (targetUrl.indexOf("?") < 0) {
		targetUrl = targetUrl + "?stamp=" + getTimestamp();
	} else {
		targetUrl = targetUrl + "&stamp=" + getTimestamp();
	}
	var xmlhttp = doXMLHttpInit();
	xmlhttp.open("GET", targetUrl, true);
	xmlhttp.onreadystatechange = function() { return; }
	xmlhttp.send("");
}

window.onload = function() {
	var imgs = document.getElementsByTagName("img");
	for(i=0;i<imgs.length;i++) {
		var url = imgs[i].src;
		regex = /^(http:\/\/(.+?))*?(\/publish\/news\/\d+\/)(.+)$/;
		var r = regex.exec(url);
		if (r == null) continue;
		var w = imgs[i].width;
		var h = imgs[i].height;
		var nw = 280;
		var nh = parseInt(nw*h/w);
		imgs[i].width = nw;
		imgs[i].height = nh;
	}
	var divs = document.getElementsByTagName("div");
	for(i=0;i<divs.length;i++) {
		if (divs[i].innerHTML == "&nbsp;") {
			divs[i].innerHTML = "";
		}
	}
};

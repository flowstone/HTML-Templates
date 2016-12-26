/*tabpanel控件*/
function tabpanel(_id){
	this.id = _id;
	this.panels = $("#"+this.id+".tabpanel .panels");
	var tabs = $("#"+this.id+".tabpanel .tabs .tab");
	var _this = this;
	/*tab点击事件*/
	tabs.click(function(e){
		_this.selectedIndex = e.index;
	});
	/*屏幕发生变化时需要调整panel的宽度*/
	window.addEventListener("resize",function(){
		_this.initPanel();
	},false);
	/*可拖曳*/
	this.panels.draw("x",function(o){
		var tmp = o.tx - o.sx;
		if(Math.abs(tmp) < 50){
			_this.selectedIndex = _this.selectedIndex;
			return;
		}
		if(tmp > 0){
			var i =  _this.selectedIndex - 1 < 0?0: _this.selectedIndex - 1;
			_this.selectedIndex = i;
		}
		else if(tmp < 0){
			var len = tabs.length -1;
			
			var i = _this.selectedIndex  + 1 > len?len:_this.selectedIndex  + 1; 
			_this.selectedIndex = i;
		}
		
	});
	
};
tabpanel.prototype = {
	/*获得当前panel*/
	get selectedIndex(){
		var tabs = $("#"+this.id+".tabpanel .tabs .tab");
		var index = -100;
		tabs.each(function(i,e){
			if(e.getAttribute("selected") == "true")
				index = i;
		});
		return index;
	},
	/*设置当前panel*/
	set selectedIndex(i){
		var tabs = $("#"+this.id+".tabpanel .tabs .tab");
		var pps =  $("#"+this.id+".tabpanel .panels .panel");
		var _this = this;
		this.panels.animate({left:"-"+window.innerWidth*i+"px"},300,function(){
			tabs.removeAttr("selected");
			tabs[i].setAttribute("selected","true");
			pps.removeAttr("selected");
			pps[i].setAttribute("selected","true");
		});
	},
	initPanel:function(){
		var _this = this;
		setTimeout(function(){
			$("#"+_this.id+".tabpanel .panels .panel").css({width:window.innerWidth+"px"});
			_this.selectedIndex = _this.selectedIndex;
			//_this.panels.css({left:'-'+window.innerWidth*_this.selectedIndex+'px'});
		},500)
		
	}
};

/*marquee 滚动财经信息*/
(function(){
	var mar = $(".marquee")[0];
	var sheight = mar.scrollHeight-mar.offsetHeight;
	var one = 34;
	var i = 0;
	var listScroll = function(){
		
		i++;
		mar.scrollTop +=1;
		
		if(i <= one){
			setTimeout(function(){
				listScroll()
			},50);
		}
		else{
			i = 0;
			if(mar.scrollTop >= sheight)
				setTimeout(function(){
					mar.scrollTop = 0;
			},3000);
		}
	}
	setInterval(function(){
		listScroll();
	},6000);
	
})();

 
/*图片轮播*/
//(function(){
//	
//	var ImgBound = {
//		s:500,
//		titles:['一分种开户','支持短线交易','24小时专业客服'],
//		buttonlist:$("#guanggaoplay #pictoolbar .bar > a"),
//		imgbar:$("#guanggaoplay .bar_pic"),
//		imgs : $("#guanggaoplay .bar_pic img"),
//		leftList : [],
//		imgW:310,
//		drawing:false,
//		/*初始化*/
//		init:function(){
//			var _this = this;
//			this.imgs.each(function(i,e){
//				_this.leftList[i] = -_this.imgW*i;
//			});
//			this.buttonlist.click(function(e){
//				_this.index = e.index;
//			});
//			this.imgbar.draw("x",function(obj){
//				var draX = obj.tx-obj.sx;
//				
//				if(Math.abs(draX) < 50){
//					_this.index = _this.index;//恢复
//					return;
//				}
//				if(draX < 0 ){
//					var len = _this.titles.length-1;
//					var i = _this.index+1 > len?len:_this.index+1;
//					_this.index = i;
//				}else if(draX >0){
//					var i = _this.index-1 < 0?0:_this.index-1;
//					_this.index = i;
//				}
//			});
//			this.autoRun();
//		},
//		/*设置当前显示索引*/
//		set index(i){
//			if(i <0 || i>2)
//				return;
//			if(this.drawing)
//				return;
//			this.drawing = true;
//			this.buttonlist.removeAttr("selected");
//			this.buttonlist[i].setAttribute('selected',true);
//			$("#guanggaoplay #pictoolbar p.title")[0].innerHTML = this.titles[i];
//			var _this = this;
//			this.imgbar.animate({left:this.leftList[i]+"px"},this.s,function(){
//				_this.drawing = false;
//			});
//		},
//		/*获取当前显示索引*/
//		get index(){
//			var i = 0;
//			this.buttonlist.each(function(ind,e){
//				if(e.getAttribute("selected")){
//					i = ind;
//					return ind;
//				}
//			});
//			return i;
//		},
//		/*::自动循环::*/
//		autoRun:function(){
//			var _this = this;
//			setInterval(function(){
//				if(_this.index >= 2)
//					_this.index = 0;
//				else
//					_this.index++; 
//			},8000)
//		}
//	}
//	ImgBound.init();
//})();

/*::滚动致顶::*/
(function(){
	$(".modl >.head > .top").click(function(){
		(function toTop(){
			var scrollElement = document.body.scrollTop>0?document.body:document.documentElement;
			if(scrollElement.scrollTop == 0)
				return;
			scrollElement.scrollTop-=60;
			if(scrollElement.scrollTop > 0)
			setTimeout(function(){
				toTop();
			},20);
		})();
	});
})();

/*::点击财经新闻，展开全部内容::*/
(function(){
	var curSelectedTarget = null;
	$("#cjnews").click(function(e){
		if(e.target.localName.toLowerCase() == 'a' || e.target.localName.toLowerCase() == 'span'){
			var tag = e.target.parentNode;
			if(e.target.localName.toLowerCase() == 'span')
				tag = e.target.parentNode.parentNode;
			if(tag.localName.toLowerCase() != 'li')
				return;
			if(tag.className.toLowerCase() != 'linked'){
				tag.style.whiteSpace = "normal";
				tag.className = "linked";
				if(curSelectedTarget){
					curSelectedTarget.style.whiteSpace = "nowrap";
					curSelectedTarget.className = "";
				}
				curSelectedTarget = tag;
			}else{
				tag.style.whiteSpace = "nowrap";
				tag.className = "";
			}
		}
	});
})();

/* ::显示走势图/显示行情表:: */
(function(){
	var dpanelsobj = {
		selectorDPanel : ".dpanels .dpanel",
		init:function(){
			/*显示走势图*/
			$(".tabledata .pictool .redbutton").click(function(){
				
				dpanelsobj.hide(dpanelsobj.selectedIndex,function(){
					dpanelsobj.show(1);
				});
				
			});
			
			/*显示行情表*/
			$(".picdata .pictool .redbutton").click(function(){
				dpanelsobj.hide(dpanelsobj.selectedIndex,function(){
					dpanelsobj.show(0);
				});
				
			});
		},
		get selectedIndex(){
			var index = -100;
			$(this.selectorDPanel).each(function(i,e){
				if(e.getAttribute("selected") == "true")
					index = i;
			});
			return index;
		},
		set selectedIndex(index){
			
		},
		hide:function(index,f){
			$($(this.selectorDPanel)[index]).animate({opacity:0},800,function(e){
				e.removeAttribute("selected");
				e.style.display="none";
				if(typeof(f) === 'function')f();
			});
		},
		show:function(index){
			$(this.selectorDPanel)[index].style.opacity ='0';
			$(this.selectorDPanel)[index].style.display ='block';
			$($(this.selectorDPanel)[index]).animate({opacity:1},800,function(e){
				e.setAttribute("selected","true");
			});
		},
	};
	dpanelsobj.init();
})();

/*tabpanel控件*/
(function(){
	var tab = new tabpanel("quopic");
})();

/*涮新数据*/
(function(){
	function refresh(){
		var url="Ajax/DataHandler.ashx";
		var nDPar = "action=data";
		var oDPar = "action=comparedata";
		
		/*获取旧数据*/
		loadJson("post",url,oDPar,function(odata){
			
			/*获取即时*/
			loadJson("post",url,nDPar,function(ndata){
				var trs = $("#products > tbody > tr");
				var text = "0";
				for(var i = 0;i < ndata.length; i++){
					trs[i].children[0].innerHTML = ndata[i].product;
					trs[i].children[1].innerHTML = ndata[i].newprice;
					var updownData = ndata[i].newprice - odata[i].newprice;
					updownData = Math.floor(updownData*100)/100;
					if(updownData<0)
						text = '<a class="up">'+ updownData +'</a>';
					else if(updownData>0)
						text = '<a class="down">'+ updownData +'</a>';
					trs[i].children[2].innerHTML = text;
					trs[i].children[3].innerHTML = ndata[i].maxprice;
					trs[i].children[4].innerHTML = ndata[i].minprice;
					
				}
				$(".tabledata > .pictool > span")[0].innerHTML = ndata[0].date;
			});
		});
	};
	//refresh();
	/*5称涮新一次
	setInterval(function(){
		refresh();
	},5000);
	*/
	
	/*点击刷新按钮刷新数据
	$("#refreshData").click(function(){
		refresh();
	});
	*/
	function createTime(){
		var dd = new Date();
		return dd.getHours()+""+dd.getSeconds()+""+dd.getMilliseconds(); 
	}
	function createSrc(src){
		var as = src.split("?");
		return as[0]+"?time="+createTime();
	}
	function refreshImg(img){
		var newSrc = createSrc(img.src);
		img.src = newSrc;
	}
	/*初始化图片*/
	(function initPic(){
		var pics = [{alt:'黄金',url:'../www.kitco.cn/cn/live_charts/t24_au_ch_gr_260x140.gif'},
								{alt:'公斤金条',url:'../www.kitco.cn/cn/live_charts/t24_au_ch_usoz_260x140.gif'},
								{alt:'白银',url:'../www.kitco.cn/cn/live_charts/t24_ag_ch_gr_260x140.gif'},
								{alt:'公斤银条',url:'../www.kitco.cn/cn/live_charts/t24_ag_ch_usoz_260x140.gif'},
								{alt:'原油',url:'../price.zhjtong.com/1_sy_180_120.png'},
								{alt:'美指',url:'../price.zhjtong.com/1_mz_180_120.png'},
								{alt:'白银T+D',url:'../chart.icbctd.com/agtd_72_230_180.gif'},
								{alt:'黄金T+D',url:'../chart.icbctd.com/autd_72_230_180.gif'}];
		var imgs = $("#quopic .panels .panel > img");
		for(var i=0;i < imgs.length; i++){
			imgs[i].src = pics[i].url+"?time="+createTime();
			imgs[i].alt = pics[i].alt;
		}
	})();
	/*点击刷新按钮刷新图片*/
	$("#refreshPic").click(function(){

		$("#quopic .panels").animate({opacity:0},300,function(){
			$("#quopic .panels").animate({opacity:1},300);
		})
		var imgs = $("#quopic .panels .panel > img");
		for(var i=0;i < imgs.length; i++){
			refreshImg(imgs[i]);
		}
	});
})();
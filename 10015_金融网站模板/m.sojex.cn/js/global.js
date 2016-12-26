function $(e){
	var s = [];
 	if(typeof(e) === 'object')
 		s.push(e);
 	else
 	 s = document.querySelectorAll(e);
	s.each = function(f){
		for(var i=0;i < s.length;i++){
			f(i,s[i]);
		}
	};
	s.css = function(o){
		this.each(function(i,e){
			for(var i in o){
				e.style[i] = o[i];
			}
		})
	};
	s.animate = function(o,ms,f){
		var _this = this;
		this.each(function(i,e){
			for(var j in o){
				_this.sinAnimate(j,o[j],ms,f);
			}
		});
	};
	
	s.sinAnimate = function(a,v,ms,f){
		var gs = 13;	
		var interval = null;
		if(!ms)ms = 600;
		this.each(function(i,e){
			
			var exp = (function(vexp){
				if(typeof(vexp) == 'number')
					return "";
				var  a = ['px','%','em','cm','ex','pt','pc','in','mm','deg','grad','rad'];
				for(var i = 0;i < a.length;i++)
					if(vexp.indexOf(a[i]) >= 0)
						return a[i];
				return "";
			})(v);

			var start = 0;
			if(a.toLowerCase() === 'opacity'){
				if(e.style[a] == "")
					start = 1;
				else
					start = parseFloat(e.style[a]);
			}else{
				if(e.style[a] == "")
					start = 0;
				else
					start = parseFloat(e.style[a]);
			}
			
			var end = parseFloat(v);
			var c = end - start;
			var l = Math.floor(ms/(gs*2));		/*次数*/
			
			var one = c/l;	/*每步执行多少*/
		
			var i = 0;
			interval = setInterval(function run(){
				start += one;
				i++;
				e.style[a] = start+exp;
				
				if(i >= l){
					e.style[a] = end+exp;
					clearInterval(interval);
					if(typeof(f) === 'function'){
						f(e);
					}
				}
			},gs);
			
		});
	};
	s.removeAttr = function(name){
		this.each(function(i,e){
			e.removeAttribute(name);
		});
	};
	s.setAttr = function(name,value){
		this.each(function(i,e){
			e.setAttribute(name,value);
		});
	};
	s.click = function(f){
		s.each(function(i,o){
			o.addEventListener('click',function(e){
				e.index = i;
				if(typeof(f) === 'function')
					return f(e);
			});
		});
		
	};
	s.draw = function(xy,f){
		
		var mouseClient =null;
		this.each(function(i,obj){
			if(browser.versions.mobile){
				/*手机端*/
				obj.addEventListener('touchstart',function(e){
					var x = e.currentTarget.style.left==""?0:parseFloat(e.currentTarget.style.left);
					var y = e.currentTarget.style.top==""?0:parseFloat(e.currentTarget.style.top);
					mouseClient = [e.changedTouches[0].clientX,e.changedTouches[0].clientY,x,y];
				});
				
				obj.addEventListener('touchmove',function(e){
					
					if(!mouseClient)return;
					var  x = e.changedTouches[0].clientX - mouseClient[0];
					var  y = e.changedTouches[0].clientY - mouseClient[1];
				
					switch(xy){
						case 'x':
							if(Math.abs(x) > 10){
								e.preventDefault();
								e.stopPropagation();
							}
							if(obj.style && Math.abs(x) >=  Math.abs(y))obj.style['left'] = (x+mouseClient[2])+'px';
							
						break;
						case 'y':
						if(Math.abs(y) > 10){
								e.preventDefault();
								e.stopPropagation();
						}
						if(obj.style && Math.abs(y) >=  Math.abs(x))obj.style['top'] = (y+mouseClient[3])+'px';
						break;
						case 'xy':
							e.preventDefault();
							e.stopPropagation();
							if(obj.style)obj.style['left'] = (x+mouseClient[2])+'px';
							if(obj.style)obj.style['top'] = (y+mouseClient[3])+'px';
						break
						default:
							return
						break;
					}
	
				});
				obj.addEventListener('touchend',function(e){
					if(!mouseClient)return;
					
					if(typeof(f) == 'function'){
						var o = {sx:mouseClient[0],sy:mouseClient[1],tx:e.changedTouches[0].clientX,ty:e.changedTouches[0].clientY}
						f(o);
					}
					mouseClient = null;
				});
			}else{
				/*电脑端*/
				obj.addEventListener('mousedown',function(e){
					var x = e.currentTarget.style.left==""?0:parseFloat(e.currentTarget.style.left);
					var y = e.currentTarget.style.top==""?0:parseFloat(e.currentTarget.style.top);
					mouseClient = [e.clientX,e.clientY,x,y];
				});
				
				obj.addEventListener('mouseup',function(e){
	
					if(!mouseClient)return;
					if(typeof(f) === 'function')
						f({sx:mouseClient[0],sy:mouseClient[1],tx:e.clientX,ty:e.clientY});
					mouseClient = null;
				},true);
				obj.addEventListener('mouseout',function(e){
	
					if(!mouseClient)return;
					if(typeof(f) === 'function')
						f({sx:mouseClient[0],sy:mouseClient[1],tx:e.clientX,ty:e.clientY});
					mouseClient = null;
				},true);
				obj.addEventListener('mousemove',function(e){
					if(!mouseClient)return;
					var  x = e.clientX - mouseClient[0];
					var  y = e.clientY - mouseClient[1];
					switch(xy){
						case 'x':
							if(obj.style)obj.style['left'] = (x+mouseClient[2])+'px';
						break;
						case 'y':
							if(obj.style)obj.style['top'] = (y+mouseClient[3])+'px';
						break;
						case 'xy':
							if(obj.style)obj.style['left'] = (x+mouseClient[2])+'px';
							if(obj.style)obj.style['top'] = (y+mouseClient[3])+'px';
						break
						default:
							
						break;
					}
				});
			}
		});
		
	};
	s.find = function(selector){
		var es = [];
		s.each(function(i,e){
			var ces = e.querySelectorAll(selector);
			if(ces.length > 0)	
				es.concat(ces);
		});
		es.find = s.find;
		es.each = s.each;
		es.css = s.css;
		es.animate = s.animate;
		es.sinAnimate = s.sinAnimate;
		es.removeAttr = s.removeAttr;
		es.setAttr = s.setAttr;
		es.click = s.click;
		es.draw = s.draw;
		return es;
	};
	return s;
}
/*异步传输json strData的数据如：name=value&name1=value1&name2=value2*/
function loadJson(method,url,strData,f){
	var xr = new XMLHttpRequest();
	xr.onreadystatechange = function(){
		if(this.readyState  == 4){
			if(this.status == 200 &&
       this.responseText != ""){
       if(typeof(f) === 'function')
       	f(eval('('+this.responseText+')'));
      }
		}
	}
	xr.open(method,url);
	if(method.toLowerCase() == 'post')
		xr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xr.send(strData);
}

/*提示信息*/
function setTitle(e,text){
	var popup = document.createElement("div");
	document.body.appendChild(popup);
	$(popup).css({opacity:0,width:'220px',position:'fixed',borderRadius:'2px 2px 2px 2px',
								color:'#fff',background:"#000",padding:"10px",textAlign:"center",boxShadow:"0px 0px 5px #000"});
	/*居中显示*/
	var _top = window.innerHeight/2-30;
	var _left = window.innerWidth/2-110;
	popup.innerHTML = text;
	$(popup).css({left:_left+"px",top:_top+"px"});
	
	$(popup).animate({opacity:0.7},300,function(){
		/*提示5秒后关闭*/
		setTimeout(function(){
			$(popup).animate({opacity:0},300,function(){
				document.body.removeChild(popup);
				
			});
		},2000);
	});
};
var browser={
    versions:function(){ 
     var u = navigator.userAgent, app = navigator.appVersion; 
     return {/*移动终端浏览器版本信息 */
        trident: u.indexOf('Trident') > -1, /*IE内核*/
        presto: u.indexOf('Presto') > -1, /*opera内核*/
        webKit: u.indexOf('AppleWebKit') > -1, /*苹果、谷歌内核*/
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核*/
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), /*是否为移动终端*/
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /*ios终端*/
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, /*android终端或者uc浏览器*/
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, /*是否为iPhone或者QQHD浏览器*/
        iPad: u.indexOf('iPad') > -1, /*是否iPad*/
        webApp: u.indexOf('Safari') == -1 /*是否web应该程序，没有头部与底部*/
     };
   	}(),
   language:(navigator.browserLanguage || navigator.language).toLowerCase()
};
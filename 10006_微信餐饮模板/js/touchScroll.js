/*
 * TouchScroll v1.0.1
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2012/04/06
 */

function TouchScroll(cfg){
	this.cfg=this.parseArgs(cfg);
	this.container=typeof this.cfg.id=='string'?this.$(this.cfg.id):this.cfg.id;
	try{
		if(!this.container)throw new Error("Can't find element");
		for(var i=0,j=this.instances.length;i<j;i++)
			if(this.instances[i]==this.container)
				throw new Error("An instance has being running!");	
		this.instances.push(this.container);
		this.setup();
	}catch(e){
		this.error=e.message;
	}
}
TouchScroll.prototype={
	/*默认参数配置*/
	_default:{
		'id': 'slider',
		'width':4,
		'minLength':20,
		'opacity':0.8,
		'onscroll':new Function(),
		'ondrag':new Function(),
		'color':'black',
		'mouseAlign':1
	},
	/*存储的实例*/
	instances:[],
	/*根据id获取节点
	 * @param string id: 目标节点的id
	 */
	$:function(id){
		return document.getElementById(id);	
	},
	/*创建节点，支持创建时赋予属性（style特殊处理）
	 *@param string tag: 节点类型
	 *@param Object attr: 属性配置
	 */
	$C:function(tag,attr){
		var el=document.createElement(tag) || null;
		attr=Object.prototype.toString.call(attr)=='[object Object]'?attr:{};
		if(el){
			for(var key in attr){
				if(key=='style')el.style.cssText+=attr[key];
				else el.setAttribute(key,attr[key]);	
			}
		}
		return el;
	},
	/*设置或者获取css
	 *@param HTMLElement el: 要处理的节点
	 *@param Object css: 样式配置
	 *@param string css: 如果第二个参数css是字符串，即为样式的关键字，则返回对应的样式值
	 */
	css:(function(){
		var styleFilter=function(property){
				switch(property){
					case 'float':
						return ("cssFloat" in document.body.style) ? 'cssFloat' : 'styleFloat';
						break;
					case 'opacity':
						return ("opacity" in document.body.style) ? 'opacity' : {
								get : function(el,style){
									var ft=style.filter;
									return ft&&ft.indexOf('opacity')>=0&&parseFloat(ft.match(/opacity=([^)]*)/i)[1])/100+''||'1';
								},
								set : function(el,va){
									el.style.filter='alpha(opacity='+va*100+')';
									el.style.zoom=1;
								}
							} ;
						break;
					default:
						var arr=property.split('-');
						for(var i=1;i<arr.length;i++)
							arr[i]=arr[i].substring(0,1).toUpperCase()+arr[i].substring(1);
						property=arr.join('');
						return property;
						break;
				}
			},
			getStyle=function(el,property){
				property=styleFilter(property);
				var value=el.style[property];
				if(!value){
					var style=document.defaultView && document.defaultView.getComputedStyle && getComputedStyle(el, null) || el.currentStyle || el.style;
					if(typeof property=='string'){
						value=style[property];
					}else value=property.get(el,style);
				}
				return value=='auto' ? '' : value;
			},
			setStyle=function(el,css){
				var attr;
				for(var key in css){
					attr=styleFilter(key);
					if(typeof attr=='string'){
						el.style[attr]=css[key];
					}else{
						attr.set(el,css[key]);
					}
				}
			}
		return function(el,css){
			return typeof css=='string' ? getStyle(el,css) : setStyle(el,css);
		}
	})(),
	/*格式化参数*/
	parseArgs:function(args){
		var _d={},
			toString=Object.prototype.toString;
		if(args && toString.call(args)=='[object Object]')
			for(var key in this._default){
				_d[key]=typeof args[key]==='undefined' ? this._default[key] : toString.call(this._default[key])=='[object Number]' ? parseInt(parseFloat(args[key])*100)/100 : args[key];
			}
		else _d=this._default;
		return _d;
	},
	/*事件监听函数*/
	addListener:function(e,n,o,u){
		if(e.addEventListener){
			e.addEventListener(n, o, u);
			return true;
		} else if(e.attachEvent){
			e.attachEvent('on' + n, o);
			return true;
		}
		return false;	
	},
	/*获取鼠标坐标*/
	getPoint:function(ev){
		ev=ev||window.event;
		var x=y=0,
			evt=this.supportsTouches && ev.touches.length?ev.touches[0]:ev,
			doc=document.documentElement,
			body=document.body;
		if(window.pageXOffset){
			x=window.pageXOffset;
			y=window.pageYOffset;
		}else{
			x=(doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
			y=(doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0);
		}
		x+=evt.clientX;
		y+=evt.clientY;
		return {'x' : x, 'y' : y};
	}, 
	preventDefault:function(e){
		if(window.event)window.event.returnValue=false;
		else e.preventDefault();
	},
	contains:function(p,c){  
		return p.contains ? p != c && p.contains(c) : !!(p.compareDocumentPosition(c) & 16);  
	},
	bind:function(func, obj){
		return function(){
			return func.apply(obj, arguments);
		}
	},
	deleteAll:function(){
		for(var i=0;i<arguments.length;i++){
			delete this[arguments[i]];
		}
	},
	fixedMouse:function(e,target){  
        var related,
            type=e.type.toLowerCase();//这里获取事件名字
        if(type=='mouseover'){
            related=e.relatedTarget||e.fromElement
        }else if(type='mouseout'){
            related=e.relatedTarget||e.toElement
        }else return true;
        return !related || related.prefix!='xul' && !this.contains(target,related) && related!==target;
    },
	/*初始化*/
	setup:function(){
		var doc=document.documentElement || document.getElementsByTagName('html')[0];
		this.supportsTouches=("createTouch" in document) || ("ontouchstart" in window);
		this.supportsTransition=("WebkitTransition" in doc.style) 
			|| ("MsTransition" in doc.style) 
			|| ("MozTransition" in doc.style) 
			|| ("OTransition" in doc.style) 
			|| ("transition" in doc.style);
		this.startEvent=this.supportsTouches?"touchstart":"mousedown";
		this.moveEvent=this.supportsTouches?"touchmove":"mousemove";
		this.endEvent=this.supportsTouches?"touchend":"mouseup";
		this.overEvent=this.supportsTouches?"touchstart":"mouseover";
		this.outEvent=this.supportsTouches?"touchend":"mouseout";
		/***************************************************/
		this.property=[
			['left','right','width','clientWidth','scrollWidth','horizontalBar','horizontalScrollBar'],
			['top','bottom','height','clientHeight','scrollHeight','verticalBar','verticalScrollBar']
		];
		this.timer=[null,null];

		this.resize();
		this.addListener(window,'resize',this.bind(function(){
			clearTimeout(this.resizeTimer);
			this.resizeTimer=setTimeout(this.bind(this.resize,this),100);
		},this),false);
		this.addListener(document,this.moveEvent,this.bind(this.move,this),false);
		this.addListener(document,this.endEvent,this.bind(this.end,this),false);
		this.addListener(this.container,'touchcancel',this.bind(this.end,this),false);
		this.addListener(this.container,this.overEvent,this.bind(this.toggleShow,this),false);
		this.addListener(this.container,this.outEvent,this.bind(this.toggleShow,this),false);
		this.addListener(this.container,'mousewheel',this.bind(this.mouseScroll,this),false);
		this.addListener(this.container,'DOMMouseScroll',this.bind(this.mouseScroll,this),false);
		
	},
	/*清除还原节点结构以正确获取此时尺寸*/
	clear:function(){
		if(this.element){
			this.css(this.container,{'visibility':'hidden'});
			while(this.element.childNodes.length){
				this.container.appendChild(this.element.firstChild);
			}
			this.container.removeChild(this.wrapper);
			this.container.scrollLeft=-this.ratio0*(this.container.scrollWidth-this.container.clientWidth);
			this.container.scrollTop=-this.ratio1*(this.container.scrollHeight-this.container.clientHeight);
			this.wrapper=this.element=this.horizontalBar=this.verticalBar=this.horizontalScrollBar=this.verticalScrollBar=null;
			this.css(this.container,{'visibility':'visible'});
		}
	},
	/*重置*/
	resize:function(){
		this.clear();
		var padX=parseInt(this.css(this.container,'padding-left'))+parseInt(this.css(this.container,'padding-right')),
			padY=parseInt(this.css(this.container,'padding-top'))+parseInt(this.css(this.container,'padding-bottom')),
			barWidth=this.container.offsetWidth-(parseInt(this.css(this.container,'border-left-width'))||0)-(parseInt(this.css(this.container,'border-right-width'))||0)-this.container.clientWidth,
			barHeight=this.container.offsetHeight-(parseInt(this.css(this.container,'border-top-width'))||0)-(parseInt(this.css(this.container,'border-bottom-width'))||0)-this.container.clientHeight;
		this.clientWidth=this.container.clientWidth-padX+barWidth;
		this.clientHeight=this.container.clientHeight-padY+barHeight;
		this.scrollWidth=this.container.scrollWidth-padX;
		this.scrollHeight=this.container.scrollHeight-padY;
		this.element=this.$C('div',{'class':'touchscrollelement','style':';overflow:hidden;width:'+this.scrollWidth+'px;padding:'+parseInt(barHeight/2)+'px '+parseInt(barWidth/2)+'px;position:absolute;top:-'+this.container.scrollTop+'px;left:-'+this.container.scrollLeft+'px;'});
		this.wrapper=this.$C('div',{'class':'touchscrollwrapper','style':';overflow:hidden;position:relative;width:100%;height:'+this.clientHeight+'px;'});
		while(this.container.childNodes.length){
			this.element.appendChild(this.container.firstChild);
		}
		this.wrapper.appendChild(this.element);
		var barStyle=';opacity:0;filter:alpha(opacity=0);position:absolute;overflow:hidden;-webkit-transition:opacity 400ms ease-out;-moz-transition:opacity 400ms ease-out;-o-transition:opacity 400ms ease-out;-ms-transition:opacity 400ms ease-out;transition:opacity 400ms ease-out;',
			scrollBarStyle=';position:absolute;width:100%;height:100%;top:0;left:0;background-color:'+this.cfg.color+';-webkit-border-radius:'+this.cfg.width+'px;-moz-border-radius:'+this.cfg.width+'px;border-radius:'+this.cfg.width+'px;';
		this.horizontalBar=this.$C('div',{'class':'touchscrollhorizontal','style':barStyle});
		this.verticalBar=this.$C('div',{'class':'touchscrollvertical','style':barStyle});
		this.horizontalScrollBar=this.$C('div',{'class':'touchscrollbar horizontal','style':scrollBarStyle});
		this.verticalScrollBar=this.$C('div',{'class':'touchscrollbar vertical','style':scrollBarStyle});
		this.horizontalBar.appendChild(this.horizontalScrollBar); this.verticalBar.appendChild(this.verticalScrollBar);
		this.wrapper.appendChild(this.horizontalBar); this.wrapper.appendChild(this.verticalBar);
		/*滚动条样式*/
		this.css(this.horizontalBar,{'display':this.scrollWidth>this.clientWidth?'block':'none','width':this.clientWidth+'px','left':0,'bottom':0,'height':this.cfg.width+'px'});
		this.css(this.verticalBar,{'display':this.scrollHeight>this.clientHeight?'block':'none','height':this.clientHeight+'px','right':0,'top':0,'width':this.cfg.width+'px'});
		this.container.appendChild(this.wrapper);
		this.scrollHeight=Math.max(this.scrollHeight,this.element.clientHeight);
		this.scrollWidth=Math.max(this.scrollWidth,this.element.clientWidth);
		this.refresh(0); this.refresh(1);/*刷新横向和纵向滚动条*/
		
		this.addListener(this.wrapper,this.startEvent,this.bind(this.start,this),false);
	},
	/*刷新滚动条显示
	 *@param Number flag: 方向，1或者0,0水平，1垂直
	 */
	refresh:function(flag,show){
		flag=!!parseInt(flag)*1;
		var total,//可滚动区域总长度
			maxLength,//滚动条最大长度
			minLength,//滚动条最小长度
			_length,//滚动条正常长度
			finalLength,//滚动条最终长度
			finalOffset,//滚动条位置
			fixOffset,//位置修正
			bar,//滚动条
			elementOffset,//节点的偏移值,
			ratio;//节点移动的距离与总距离的比率
		bar=this[this.property[flag][6]];
		total=this[this.property[flag][4]];
		maxLength=this[this.property[flag][3]];
		minLength=Math.max(this.cfg.width,this.cfg.minLength);
		elementOffset=parseInt(this.css(this.element,this.property[flag][0]));
		ratio=total==maxLength?0:parseInt(elementOffset/(total-maxLength)*1000)/1000;
		_length=Math.max(parseInt(maxLength*maxLength/total),minLength);
		if(elementOffset>0){
			finalLength=Math.max(this.cfg.width,_length-elementOffset/maxLength*_length);
			finalOffset=0;
			fixOffset='auto';
		}else if(elementOffset<=maxLength-total){
			finalLength=Math.max(this.cfg.width,(total+elementOffset)/maxLength*_length);
			finalOffset='auto';
			fixOffset=0;
		}else{
			finalLength=_length;
			finalOffset=-elementOffset/((total-maxLength)||1)*(maxLength - finalLength)+'px';
			fixOffset='auto';
		}
		bar.style[this.property[flag][2]]=finalLength+'px';
		bar.style[this.property[flag][0]]=finalOffset;
		bar.style[this.property[flag][1]]=fixOffset;
		this['ratio'+flag]=ratio;
		if(show){
			this.css(this[this.property[flag][5]],{'opacity':this.cfg.opacity});
			this.css(this[this.property[1-flag][5]],{'opacity':0});
		}
		this.cfg.onscroll.call(this,null);
	},
	toggleShow:function(e){
		e=e||window.event;
		if(this.wrapper && (this.fixedMouse(e,this.container) || this.supportsTouches)){
			var type=e.type,
				opacity=0;
			switch(type){
				case this.overEvent:
					opacity=this.cfg.opacity;
					this.mouseEnter=true;
					break;
				case this.outEvent:
					this.mouseEnter=false;
					break;
				default:return false;	
			}
			if(!this.during){
				this.css(this.horizontalBar,{'opacity':opacity});
				this.css(this.verticalBar,{'opacity':opacity});
			}
		}
	},
	_scroll:function(flag,distance){
		var offset,m=40,
			finalOffset,
			aviliLength,
			_distance,
			dtime,
			fx,
			callback,
			distance;
		_distance=0;
		offset=parseInt(this.css(this.element,this.property[flag][0]));
		aviliLength=this[this.property[flag][4]]-this[this.property[flag][3]];
		finalOffset=offset+distance;
		if(finalOffset>0){
			if(finalOffset>m){
				distance=m-offset;
				_distance=-m;
			}else{
				_distance=-finalOffset;
			}
		}else if(finalOffset<-aviliLength){
			if(finalOffset<-aviliLength-m){
				distance=-aviliLength-m-offset;
				_distance=m;
			}else{
				_distance=-aviliLength-finalOffset;
			}
		}
		dtime=400*Math.abs(distance)/(Math.abs(distance)+Math.abs(_distance));
		callback=function(){
			this.slide(flag,_distance,400-dtime,'ease-in-out');
		}
		this.slide(flag,distance,dtime,fx,callback);
	},
	/*容器滚动接口，带缓动效果
	 *@param Number offx: 水平方向上滚动offx距离
	 *@param Number offy: 垂直方向上滚动offy距离
	 */
	scroll:function(offx,offy){
		for(var i=0;i<arguments.length;i++){
			this._scroll(i,arguments[i]);
		}
	},
	/*容器滚动接口2
	 *@param Number x: 水平方向上滚动至x位置
	 *@param Number y: 垂直方向上滚动至y位置
	 */
	scrollTo:function(x,y){
		this.css(this.element,{'left':-x+'px','top':-y+'px'});
		this.refresh(0);this.refresh(1);
	},
	/*提供缓动效果
	 *@param Number flag: 方向，1或者0,0水平，1垂直
	 *@param Number distance: 移动的距离
	 *@param Number during: 动画持续时间
	 *@param String fx: 缓动效果名称
	 *@param Function callback: 动画完成后的回调
	 */
	slide:function(flag,distance,during,fx,callback){
		var _this=this, _callback=callback||new Function(),
			_init=parseInt(this.css(this.element,this.property[flag][0])),//初始值
			_change=distance,//变化量
			_stime=0,//初始时间
			_during=during||400,//动画时间
			_fx=fx||'ease-out';//缓动效果
		function animate(t,b,c,d,fx){ //缓动效果计算公式
			var re;
			switch(fx){
				case 'ease-in-out':
					if((t/=d/2)<1)re=c/2*t*t*t+b;
					else re=c/2*((t-=2)*t*t+2)+b;
					break;
				default:
					re=-c*((t=t/d-1)*t*t*t-1)+b;
					break;
			}
			return re;
		}
		function run(){
			if(distance && _stime<_during){
				_stime+=10;
				_this.element.style[_this.property[flag][0]]=animate(_stime,_init,_change,_during,_fx)+'px';
				_this.timer[flag]=setTimeout(run,10); _this.refresh(flag,true);
			}else{
				_this.during=false;
				_this.element.style[_this.property[flag][0]]=_init+distance+'px';
				if(!_this.mouseEnter && !callback){
					_this.css(_this.horizontalBar,{'opacity':0});
					_this.css(_this.verticalBar,{'opacity':0});
				}
				_this.refresh(flag);
				_callback.call(_this,null);
			}
			_this.deleteAll('timer'+flag);
		}
		this.during=true;
		clearTimeout(this.timer[flag]); run();
	},
	start:function(e){
		clearTimeout(this.timer[0]); clearTimeout(this.timer[1]);//清除正在进行的动画
		if(!this.supportsTouches)this.preventDefault(e);
		this.element.onclick=null;
		var target=e&&e.target||window.event.srcElement;
		if(target.nodeType==3)target=target.parentNode;
		this.target=target==this.wrapper||target==this.element||this.contains(this.element,target)?0:1;
		this.startPos=this.getPoint(e);
		this.elementRect=[parseInt(this.css(this.element,'left')),parseInt(this.css(this.element,'top'))];
		this.disc=[[new Date()],[this.startPos]];
	},
	move:function(e){
		if(!this.disc||e.touches&&e.touches.length>1||e.scale&&e.scale!==1)return;
		this.endPos=this.getPoint(e);
		var rect=[this.endPos.x-this.startPos.x,this.endPos.y-this.startPos.y],offset,moveLength,
			moveRatio=1;
		if(typeof this.flag == 'undefined'){
			if(this.scrollWidth>this.clientWidth && Math.abs(rect[0])>=Math.abs(rect[1]))this.flag=0;
			else if(this.scrollHeight>this.clientHeight && Math.abs(rect[1])>=Math.abs(rect[0]))this.flag=1;
			else this.flag=false;
		}
		if(this.flag===false)return;
		this.preventDefault(e); this.during=true;
		moveLength=this[this.property[this.flag][4]]-this[this.property[this.flag][3]];
		if(this.target){//如果拖动的是滚动条，需要处理下
			var barLength=parseInt(this.css(this[this.property[this.flag][6]],this.property[this.flag][2]));//得到滚动条的长度
			moveRatio=-moveLength/(this[this.property[this.flag][3]]-barLength);
		}
		offset=this.elementRect[this.flag]+rect[this.flag]*moveRatio;
		/*边缘检测*/
		if(offset>0){
			offset=offset/(offset/this[this.property[this.flag][3]]+1);	
		}else if(offset<-moveLength){
			offset=offset+moveLength;
			offset=offset/(Math.abs(offset)/this[this.property[this.flag][3]]+1)-moveLength;
		}
		this.element.style[this.property[this.flag][0]]=offset+'px';
		this.refresh(this.flag,true);
		this.disc[0].push(new Date());
		this.disc[1].push(this.endPos);
	},
	end:function(e){
		if(!this.disc)return;
		if(typeof this.flag === 'number'){
			var distance,//超出边缘需要修正的长度
				offset,//当前偏移值
				now,//当前时间
				rect,//移动距离横纵数据
				dist,//实际移动距离
				time,//实际花费时间
				aviliLength;
			distance=0; aviliLength=this[this.property[this.flag][4]]-this[this.property[this.flag][3]];
			offset=parseInt(this.css(this.element,this.property[this.flag][0]));
			if(offset>0){
				distance=-offset;
			}else if(offset<-aviliLength){
				distance=-aviliLength-offset;
			}else if(!this.target){//拖动的不是滚动条且未超出边界
				//计算出最近不超过200豪秒内数据，目的是得出最近一次快速移动所花费的时间和移动距离，从而计算出缓动距离长度
				now=new Date();
				while(this.disc[0].length && now-this.disc[0][0]>200){
					this.disc[0].shift();
					this.disc[1].shift();
				}
				if(this.disc[0].length){
					time=now-this.disc[0][0];//时间
					rect=[this.endPos.x-this.disc[1][0].x,this.endPos.y-this.disc[1][0].y];
					dist=rect[this.flag];//距离
					if(Math.abs(dist)>20){//极短时间内移动距离大于20
						distance=(2-time/200)*dist;	//计算出缓动需要移动的距离
					}
				}
			}
			if(this.cfg.ondrag.call(this,this.flag,distance)!==false)this._scroll(this.flag,distance);
			this.element.onclick=new Function('return false;');
		}
		this.deleteAll('startPos','endPos','disc','flag','target','elementRect');
	},
	mouseScroll:function(e){
		this.preventDefault(e);
		e=e||window.event;
		var wheelDelta=e.wheelDelta || e.detail && e.detail*-1 || 0,
			wheelLength=120,
			align=this.cfg.mouseAlign,
			flag;//这里flag指鼠标滚轮的方向，1表示向上，-1向下
		if(this.wrapper && wheelDelta){
			flag=wheelDelta/Math.abs(wheelDelta);
			this._scroll(align,flag*wheelLength);
		}
	}
}

window.TouchScroll=TouchScroll;
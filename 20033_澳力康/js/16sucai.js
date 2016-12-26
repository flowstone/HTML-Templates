myFocus.extend({
	mF_classicHB:function(par){//*********************经典怀旧系列二--海报风格******************
		var box=this.$(par.id);//定义焦点图盒子
		this.addList(box,['txt','num']);//添加ul列表
		var pic=this.$li(box,0),txt=this.$li(box,1),num=this.$li(box,2);//定义焦点图元素
		var index=0,n=pic.length,t=par.time*1000;//运行时相关参数
		//CSS
		var txtH=par.txtHeight;
		for(var i=0;i<n;i++){
			pic[i].style.cssText="display:none;top:-"+0.1*par.height+"px;left:-"+0.1*par.width+"px;width:"+1.2*par.width+"px;height:"+1.2*par.height+"px;"
			txt[i].style.top=-txtH+'px';
		}
		//PLAY
		eval(this.switchMF(function(){
			myFocus.stop(pic[index]).stop(txt[index]);
			pic[index].style.cssText="display:none;top:-"+0.1*par.height+"px;left:-"+0.1*par.width+"px;width:"+1.2*par.width+"px;height:"+1.2*par.height+"px;"
			txt[index].style.top=-txtH+'px';
			myFocus.slide(num[index],{width:16},10);num[index].className='';
		},function(){
			myFocus.fadeIn(pic[next],20).slide(pic[next],{width:par.width,height:par.height,top:0,left:0},20)
			myFocus.slide(txt[next],{top:0},20);
			myFocus.slide(num[next],{width:26},10);num[next].className='current';
		}))
		eval(this.bind('num','par.trigger',par.delay));
	}
})
//下面为焦点图的调用，可在网页任意位置调用
myFocus.setting({
	style:'mF_classicHB',//风格样式
	id:'myFocus',//焦点图ID
	trigger:'mouseover',//按钮切换模式：'click'(点击触发)/'mouseover'(悬停触发,默认有0.1秒延迟，可以自行添加参数'delay:毫秒'设置)
	time:4,//切换图片的时间间隔，单位秒
	txtHeight:0,//文字层高，20为推荐，0为隐藏
	width:309,//宽(大图)，注意:整个焦点图的宽等于或大于图片宽
	height:158//高(大图)，注意同上
});

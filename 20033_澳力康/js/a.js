// JavaScript Document
(function($){
	jQuery.fn.carousel = function(opt) {
		var settings = {
			isAuto: false, //自动滚动
			pageItemCount: 3, //一屏的元素个数
			delay: 15000, //定时切换时间
			duration: 500, //动画执行时间
			cls_cont_wrap: '.slideUl', //包裹元素class
			cls_slideLi: '.slideLi', //元素class
			cls_prev: '.moveleft', //上一页class
			cls_next: '.moveright' //下一页class
		}

		if (opt) {
			opt = jQuery.extend(settings,opt);
		}

		var jq_context = this,
			width = jq_context.width(),
			timerid = null,
			isAuto = opt.isAuto,
			pageItemCount = opt.pageItemCount,
			delay = opt.delay,
			duration = opt.duration,
			cls_slideLi = opt.cls_slideLi,
			cls_prev = opt.cls_prev,
			cls_next = opt.cls_next,
			cls_cont_wrap = opt.cls_cont_wrap,
			jq_prev = $(cls_prev),
			jq_next = $(cls_next),
			jq_cont_wrap = jq_context.find(cls_cont_wrap),
			jq_items = jq_context.find(cls_slideLi),
			pageCount = parseInt(jq_items.length / pageItemCount,10) + (jq_items.length % pageItemCount > 0 ? 1 : 0), //页总数
			currIndex = 0; //当前页索引

		return jq_context.each(function() {
			var jq_this = $(this);

			//只有一页
			if (pageCount === 1) {
				jq_prev.addClass(cls_prev.substr(1,cls_prev.length) + '_dis');
				jq_next.addClass(cls_next.substr(1,cls_next.length) + '_dis');
			}

			//开始动画
			function startAnim() {
				if (currIndex > pageCount - 1) currIndex = 0;
				if (currIndex == 0) {
					jq_prev.addClass(cls_prev.substr(1,cls_prev.length) + '_dis');
					jq_next.removeClass(cls_next.substr(1,cls_next.length) + '_dis');
				}
				else if (currIndex == pageCount - 1) {
					jq_next.addClass(cls_next.substr(1,cls_next.length) + '_dis');
					jq_prev.removeClass(cls_prev.substr(1,cls_prev.length) + '_dis');
				}
				else {
					jq_prev.removeClass(cls_prev.substr(1,cls_prev.length) + '_dis');
					jq_next.removeClass(cls_next.substr(1,cls_next.length) + '_dis');
				}

				jq_cont_wrap.stop(true,true).animate({left:currIndex * width * -1},duration);
			}
			//console.log(jq_items.length)
			function auto() {
				timerid = setTimeout(function(){
					currIndex++;
					startAnim();

					timerid = setTimeout(arguments.callee,delay);
				},delay);
			}

			//如果允许自动切换
			if (isAuto) {
				auto();

				var arr = [jq_this,jq_prev,jq_next];
				for (var i = 0; i < arr.length; i++) {
					var item = arr[i];
					item.hover(function(){
						if (timerid) {
							clearTimeout(timerid);
							timerid = null;
						}
					},function(){
						auto();
					});
				}
			}

			//上一页
			jq_prev.click(function() {
				currIndex--;
				if (currIndex < 0) {
					currIndex = 0;
					//第一页
					//TODO
					return;
				}
				startAnim();
			});

			//下一页
			jq_next.click(function() {
				currIndex++;
				if (currIndex > pageCount - 1) {
					currIndex = pageCount - 1;
					//最后一页
					//TODO
					return;
				}
				startAnim();
			});
		})
	}
})(jQuery);

// SLIDE screen
(function() {
	var LI_WIDTH = [583, 199, 199, 198], 
		LI_DOM = [$('.slide_screen li.liA'), $('.slide_screen li.liB'), $('.slide_screen li.liC'), $('.slide_screen li.liD')], 
		LI_BTN = $('.slide_screen .libtn'),
		COUNT =  3, SPEED = 1000, DISTIM = 6000, LI_COUNT = 4;
	var cur = 1, next_cur = 2, runid, isclick = true;

	init();
	initEvent();

	runid = setInterval(run, DISTIM);
	function init() {
		LI_BTN.find('li').eq(cur-1).addClass('selected');

		for(var i=0; i<LI_COUNT; i++) {
			LI_DOM[i].find('.window').css({'top':0, 'left':0, 'position':'absolute'});
			LI_DOM[i].find('.window').css('width', LI_WIDTH[i]*COUNT);
		}

	}
	function initEvent() {
		LI_BTN.click(function(ev){
			if(isclick && $(ev.target).attr("_index") !== undefined) {
				isclick = false;
				LI_BTN.find('li').eq(cur-1).removeClass('selected');
				clearInterval(runid);
				runid = null;
				cur = parseInt($(ev.target).attr("_index"));
				next_cur = cur + 1;
				LI_BTN.find('li').eq(cur-1).addClass('selected');
				for(var i=0; i<LI_COUNT; i++) {
					LI_DOM[i].find('.window').stop(true,true).animate({"left": -(cur-1)*LI_WIDTH[i]}, SPEED, function(){
						if(runid===null)runid = setInterval(run, DISTIM);
						isclick = true;
					});
				}
			}
		});
	}
	function run() {
		isclick = false;
		LI_BTN.find('li').eq(cur-1).removeClass('selected');
		if(cur != COUNT){
			for(var i=0; i<LI_COUNT; i++) {
				LI_DOM[i].find('.window').stop(true,true).animate({"left": -(next_cur-1)*LI_WIDTH[i]}, SPEED, function() {
					isclick = true;
				});
			}
			cur++;
			next_cur = cur + 1;
		}
		else {
			for(var i=0; i<LI_COUNT; i++) {
				LI_DOM[i].find('.piece:lt('+(COUNT-1)+')').clone().insertAfter(LI_DOM[i].find('.piece').last());
				LI_DOM[i].find('.piece:lt('+(COUNT-1)+')').remove();
				LI_DOM[i].find('.window').css('left', '0px');

                LI_DOM[i].find('.window').stop(true,true).animate({"left": -LI_WIDTH[i]}, SPEED, function() {
	            	$(this).find('.piece').first().clone().insertAfter($(this).find('.piece').last());
	            	$(this).find('.piece').first().remove();
	            	$(this).css('left', '0px');
	            	isclick = true;
                });
			}
			cur = 1;
			next_cur = cur + 1;
		}
		LI_BTN.find('li').eq(cur-1).addClass('selected');
	}
})();
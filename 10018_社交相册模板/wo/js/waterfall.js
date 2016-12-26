/**
 * NOTES:
 * 
 * 
 * [TODO]：
 * 
 * 
 * 瀑布流
 * @author kidney<104958345@qq.com>
 * 
 */
(function(win, $, undefined) {
// 模块依赖



// 常用原生变量/函数
var doc = win.document,
TRUE = true, FALSE = false, UNDEFINED = undefined, NULL = null,


// 常用字符串
BUFFER_TIME = 50,
SCROLL = 'scroll', RESIZE = 'resize',


/**
 * 默认配置
 * @config
 */
defaultConfig = {
    onAdjustComplete: NULL, // 调整布局之后触发
    onAddComplete: NULL, // 添加完数据块到容器之后触发
    container: '', // 容器对象
    colClassName: 'column', // 数据栏的样式
    minColCount: 1, // 最小列数, 默认为 1. 当窗口变小时, 计算得到的列数不能小于该值.
    colWidth: 0, // 每列的总宽度. 如果要设每列的间距, 请自行设置 margin, 而该值是指包含了 padding, width, margin 后的总宽度.
    diff: 0, // 滚动时, 当最小高度的列超过在屏幕高度+已滚动高度+diff时, 会去加载更多数据.
    load: NULL // 用户自定义加载数据. 设置这个, 指定如何加载更多数据, 及加载数据后如何格式化成 HTML, 完全由用户自定义, 更加灵活.
},


extendFun = {
    /**
     * 初始化
     * @protected
     */
    _init: function() {
        var self = this;
        
        $(win).on(RESIZE, {selfCls:self, type:RESIZE}, self._onWinFn);
        
        self._buildTree(); // 建立列数据树
        
        // 一开始就 adjust 一次，可以对已有静态数据处理
        self._resizeEvent();
        
        (typeof self.config.load === 'function') && self.startScroll();
    },
    
    /**
     * 建立列数据树
     * @protected
     */
    _buildTree: function() {
        var self = this,
            items = self.config.container.find('div.J_waterFallItem'),
            i = 0, itemsLen = items.length,
            tmpArr = [];
        
        for (; i < itemsLen; i++) {
            tmpArr.push(items[i]);
        }
        
        tmpArr.length && (self._rootTree = tmpArr);
    },
    
    /**
     * 缓存win事件触发器, 避免频繁触发
     * @protected
     * 
     * @param {Event} event event
     */
    _onWinFn: function(event) {
        var self = event.data.selfCls;
        
        !self.__timer || clearTimeout(self.__timer);
            
        self.__timer = setTimeout(function() {
            if (self.__timer) {
                clearTimeout(self.__timer);
                self.__timer = UNDEFINED;
            }
            
            (event.type === RESIZE) ? self._resizeEvent() : self._scrollEvent();
        }, BUFFER_TIME);
    },
    
    /**
     * 获取探察器
     * @protected
     * @return {JqElement}
     */
    _getDetect: function() {
        var self = this, cfg = self.config;
        
        if (!self.__detectEl) {
            self.__detectEl = $('<div>', {
                id: 'J_waterFallDetect',
                'class': cfg.colClassName
            }).appendTo(self.config.container);
        }
        return self.__detectEl;
    },
    
    /**
     * 滚动事件
     * @protected
     */
    _scrollEvent: function() {
        var self = this, cfg = self.config,
            scrollTop = $(win).scrollTop();
        
        // 滚动距离超过100才进行处理
        if (self._loading || Math.abs(scrollTop - self._scrollTop) < 200) {
            return FALSE;
        }
        
        self._scrollTop = scrollTop;
        
        var colHeight = cfg.container.offset().top,
            diff = cfg.diff,
            curColHeights = [],
            
            columnEls = self._getColumnEls(),
            i = 0, columnCount = self._getColumnCount();
        
        // 收集每列高度
        for (; i < columnCount; i++) {
            curColHeights.push(columnEls.eq(i).outerHeight());
        }
        
        // 找到最小列高度
        if (curColHeights.length) {
            colHeight += Math.min.apply(Math, curColHeights);
        }
        
        // 动态载
        // 最小高度(或被用户看到了)低于预加载线
        if (diff + scrollTop + $(win).height() > colHeight) {
            self._loadData();
        }
    },
    
    /**
     * resize事件
     * @protected
     */
    _resizeEvent: function() {
        var self = this,
            detectEl = self._getDetect(), // 探察器
            detectElLeft = detectEl.position().left;
        
        //if (detectElLeft - self._detectElLeft > 10) {
        if (detectElLeft > 10) {
            // 探察器位置出现变化, 调整item
            self.adjust();
        }
    },
    
    /**
     * 获取新栏目总数
     * @protected
     * @param {Boolean} reCount 是否重新计算
     * @return {Int}
     */
    _getColumnCount: function(reCount) {
        reCount = reCount || FALSE;
        
        var self = this, cfg = self.config;
        
        if (reCount || !self.__columnCount) {
            self.__columnCount = Math.floor(cfg.container.outerWidth(TRUE) / cfg.colWidth);
        }
        
        return self.__columnCount;
    },
    
    /**
     * 获取新栏目数组
     * @protected
     * @param {Boolean} reFind 是否重新获取
     * @return {Array}
     */
    _getColumnEls: function(reFind) {
        reFind = reFind || FALSE;
        
        var self = this;
        
        if (reFind || !self.__columnEls) {
            self.__columnEls = self.config.container.find('div.J_waterFallColumn');
        }
        
        return self.__columnEls;
    },
    
    /**
     * 载入更多数据
     * @protected
     */
    _loadData: function() {
        var self = this,
            loadFn = self.config.load;
        
        self._loading = TRUE;
        
        function success(items) {
            self._loading = FALSE;
            self.addItems(items);
        }
        
        function end() {
            //self.end();
            self.stopScroll();
        }
        
        (typeof loadFn === 'function') && loadFn.apply(self, [success, end]);
    },
    
    /**
     * 触发回调函数
     * @protected
     * @param {string} type 回调key
     * @param {array|string|object} data 回调数据
     */
    _trigger:function(type, data){
        var self = this,
            callback = self.config['on' + type.charAt(0).toUpperCase() + type.substring(1)];
        
        if (!$.isArray(data))
        {
            data = [data];
        }
        
        (typeof callback === 'function') && callback.apply(self, data);
    },
    
    /**
     * 调整现有的item位置
     * @public
     */
    adjust: function() {
        var self = this, cfg = self.config,
            rootTree = self._rootTree; // 数据根树
        
        if (!rootTree) {
            return;
        }
        
        var container = cfg.container,
            columnCount = self._getColumnCount(TRUE), // 计算新列数
            i = 0, rootTreeLen = rootTree.length,            
            
            // Fragment
            colFragment = doc.createDocumentFragment(),
            itemNodeFragment = [],
            
            colNode;

        // 创建文件片段
        for(i = 0; i < columnCount; i++) {
            itemNodeFragment[i] = doc.createDocumentFragment();
        }
        
        // 拆分数据
        for(i = 0; i < rootTreeLen; i++) {
            itemNodeFragment[i % columnCount].appendChild(rootTree[i]);
        }
        
        // 讲内容注入列容器
        for(i = 0; i < columnCount; i++) {
            colNode = doc.createElement('div');
            colNode.className = 'J_waterFallColumn ' + cfg.colClassName;
            colNode.style.width = cfg.colWidth + 'px';
            
            colNode.appendChild(itemNodeFragment[i]);
            colFragment.appendChild(colNode);
        }
        
        // clear
        $('div.J_waterFallColumn').remove();
        container[0].insertBefore(colFragment, container[0].firstChild);
        
        self._getColumnEls(TRUE);
        
        self._detectElLeft = self._getDetect().position().left;
        
        self._trigger('adjustComplete', [rootTree]);
        
        return self;
    },
    
    /**
     * 添加新数据
     * @public
     * @param {Array} items 添加的数据块数组
     * @return {Object}
     */
    addItems: function(items) {
        if (!$.isArray(items)) return FALSE;
        
        var self = this,
            //jqWin = $(win),
            //scrollTop = jqWin.scrollTop(),
            //winHeight = jqWin.height(),
            
            columnEl = self._getColumnEls(),
            columnCount = self._getColumnCount(),
            
            i = 0, j = 0, $minColumnEl, $tmpColumnEl, tmpMinColumnHeight = 0,
            itemsLen = items.length;
        
        self._rootTree = self._rootTree.concat(items);
        
        for (;i < itemsLen; i++) {
            // 找到最小列高度
            //if (curColHeights.length) {
            //    colHeight += Math.min.apply(Math, curColHeights);
            //}
            
            for (j = 0; j < columnCount; j++) {
                $tmpColumnEl = columnEl.eq(j);
                
                if (j === 0 || tmpMinColumnHeight && $tmpColumnEl.outerHeight() < tmpMinColumnHeight) {
                    tmpMinColumnHeight = $tmpColumnEl.outerHeight();
                    $minColumnEl = $tmpColumnEl;
                }
            }
            $minColumnEl && $minColumnEl.append(items[i]);
            $minColumnEl = NULL;
            tmpColumnHeight = 0;
        }
        
        self._trigger('addComplete', [items]);
        
        return self;
    },
    
    /**
     * 开始监控 scroll 事件（随时可能会动态加载）
     */
    startScroll: function() {
        var self = this;
        
        if (!self._scrollStarted) {
            $(win).on(SCROLL, {selfCls:self, type:SCROLL}, self._onWinFn);
            self._scrollStarted = TRUE;
        }
        
        return self;
    },
    
    /**
     * 停止监控 scroll 事件（停止动态加载）
     */
    stopScroll: function() {
        var self = this;
        
        $(win).off(SCROLL, self._onWinFn);
        self._scrollStarted = FALSE;
        
        return self;
    }
};

/**
 * 瀑布流组件
 * @constructor
 */
function Waterfall(config) {
    var self = this;
    
    // factory or constructor
    if (!(self instanceof Waterfall)) {
        return new Waterfall(config);
    }
    
    // change to jq mode
    if (typeof config.container === 'string') {
        config.container = $(config.container);
    }
    
    // mix config
    self.config = $.extend({}, defaultConfig, config);
    
    /**
     * scroll & resize时间器
     * @type {Int}
     */
    //self.__timer;
    
    /**
     * 是否启动滚动加载
     * @type {Boolean}
     */
    //self._scrollStarted;
    
    /**
     * 列总数
     * @type {Int}
     */
    //self.__columnCount;
    
    /**
     * 每列DOM对象
     * @type {Array}
     */
    //self.__columnEls;
    
    /**
     * 探察器
     * @type {JqElement}
     */
    //self.__detectEl;
    
    /**
     * 探察器偏移值
     * @type {Int}
     */
    self._detectElLeft = 0;
    
    /**
     * 上次的scrollTop值
     * @type {Int}
     */
    self._scrollTop = 0;
    
    /**
     * 数据树结构
     * @type {Array}
     */
    self._rootTree = [];
    
    // 初始化
    self._init();
}

$.extend(Waterfall.prototype, extendFun);

// create api
$.each(['adjust', 'isAdjusting', 'addItems', 'startScroll', 'endScroll'], function(){
    Waterfall[this] = Waterfall.prototype[this];
});

win.jQuery.Waterfall = Waterfall;
})(window, jQuery);



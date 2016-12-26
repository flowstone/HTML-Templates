    var show_float_layer_value = "show_float_layer";
    var show_float_layer_name = "show_float_layer";
    
    var cancle_layer_action = document.getElementById("xx");
    cancle_layer_action.onclick = add_cookie;
   

     //判断是否是手机QQ浏览器
    var isQQBrowser = navigator.userAgent.match(/QQBrowser/);
    //判断是否是手机Chrom浏览器
    var isMBChrom = navigator.userAgent.match(/CriOS/);
    //根据不同浏览器作出相应处理
    
    //只有iphone的才出这个层
    if(/iPhone/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !isQQBrowser && !isMBChrom) 
    {
        var fixedDiv = document.getElementById('fixedDiv');
        if(getCookie(show_float_layer_name))
        {
            
            fixedDiv.style.display = "none";
        }
        else
        {
            fixedDiv.style.display = "block";
        }
        
    }  
    
    
    //交叉的事件跟隐藏层
    function add_cookie()
    {
        setCookie(show_float_layer_name,show_float_layer_value);
        var fixedDiv = document.getElementById('fixedDiv');
        fixedDiv.style.display = "none";
    }
    //设置cookie    
    function setCookie(name,value)
    {
        var Days = 30; //此 cookie 将被保存 30 天
        var exp  = new Date();    //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    //获取cookie
    function getCookie(name)
    {
        var arr = document.cookie.match(name);
        if(arr != null) 
            return true; 
        return false;
    }
    

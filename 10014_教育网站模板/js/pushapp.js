var pushApp = function () {


    var cookie = "appbanner_colse";
    var userAgent = navigator.userAgent || "";
    var apk_url = "";
    var apk_img = "";

    //Cookie操作
    function Cookie() { };
    Cookie.set = function (cookieName, cookieValue, seconds, path, domain, secure) {
        var expires;
        if (seconds != null && seconds != '') {
            expires = new Date();
            expires.setTime(expires.getTime() + seconds * 1000);
        }
        document.cookie = escape(cookieName) + '=' + escape(cookieValue) + (expires ? '; expires=' + expires.toGMTString() : '') + (path ? '; path=' + path : '/') + (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '');
    };
    Cookie.get = function (name) {
        var cookieArray = document.cookie.split("; "); //得到分割的cookie名值对    

        for (var i = 0; i < cookieArray.length; i++) {

            var arr = cookieArray[i].split("=");       //将名和值分开    

            if (arr[0] == name) return unescape(arr[1]); //如果是指定的cookie，则返回它的值    

        }

        return "";

    };
    Cookie.remove = function (name) {
        var expire = new Date();
        expire.setTime(expire.getTime() - 1);
        document.cookie = name + "=" + Cookie.get(name) + ";expires=" + expire.toGMTString();
    };

    if (userAgent.indexOf("Android") > 0) {
        apk_url = "../../a4.yeshj.com/rd/48063/default.htm";
        apk_img = "../images/pic_pushapp.jpg";
    }
    if (userAgent.indexOf("Mac OS") > 0 && userAgent.indexOf("Mobile") > 0) {
        apk_url = "../../um0.cn/1SDG_E/default.htm";
        apk_img = "../images/pic_pushapp_tingliku.jpg";
    }

    var obj = {};

    obj.close = function () {
        Cookie.set(cookie, "1", 7 * 24 * 60 * 60, "../default.htm");
        var block = document.getElementById("app_banner");
        block.parentNode.removeChild(block);


    }
    obj.open = function () {
        Cookie.remove(cookie);

    }
    obj.toggle = function () {
        var ck = Cookie.get(cookie);
        if (ck == "") {
            this.close();
        }
        else {
            this.open();
        }
    }
    window.onload = function () {
        var ck = Cookie.get(cookie);
        if (location.href.indexOf('en') >= 0 && ck == "" && apk_url.length > 0) {
            var block = document.createElement("div");
            block.id = "app_banner";
            block.setAttribute("style", "width: 100%;max-width:640px;margin:0 auto;position: relative;z-index: 999;");
            block.innerHTML = "<a href='" + apk_url + "'><img style='width:100%;vertical-align: middle' src='" + apk_img + "' /></a><a href='###' onclick='pushApp.toggle();return false;' style='position:absolute;top:0px;left:0px;width:10%;height:40%;' ></a>";
            var wrapper = document.getElementById("wrapper");
            wrapper.insertBefore(block, wrapper.firstChild);
        }
    };
    return obj;

}();

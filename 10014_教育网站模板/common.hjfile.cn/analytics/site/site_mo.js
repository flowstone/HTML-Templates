
// ------------------------------------------------------------------------
// ga base function

var _gaq = _gaq || [];

var _pzt =_pzt||{}; 
_pzt.siteid="5c082218cf08b1e31d7e6982b3606d07"; 
_pzt.events = [];

function ga_track_event(cate, action, label, value) {
	label = label || "";
	value = value || 0;
	_gaq.push(['_trackEvent', cate, action, label, value])
}

function ga_is_login() {
	return document.cookie.indexOf("ClubAuth") != -1;
}

function ga_mark_hj_login() {
	if (ga_is_login()) {
		_gaq.push(["t2._setCustomVar", 4, "visit_type", "1", 2]);
	} else {
		_gaq.push(["t2._setCustomVar", 4, "visit_type", "0", 2]);
	}
}

function ga_mark_site_login() {
	if (ga_is_login()) {
		_gaq.push(["_setCustomVar", 4, "visit_type", "1", 2]);
	} else {
		_gaq.push(["_setCustomVar", 4, "visit_type", "0", 2]);
	}
}

function ga_cookie_exist(name) {
	return ga_read_cookie(name) != null;
}

function ga_read_cookie(c) {
	for (var c = c + "=", d = document.cookie.split(";"), b = 0; d.length > b; b++) {
		for (var a = d[b];
		" " == a.charAt(0); ) a = a.substring(1, a.length);
		if (0 == a.indexOf(c)) return decodeURIComponent(a.substring(c.length, a.length))
	}
	return null
}

function ga_load_js(src) {
	var sc = document.createElement('script');
	sc.type = 'text/javascript';
	sc.async = true;
	sc.src = src; 
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(sc, s);
}

function ga_get_hjid() {

    function _utf8_decode(utftext) {  
        var string = "";  
        var i = 0;  
        var c = c1 = c2 = 0;  
        while ( i < utftext.length ) {  
            c = utftext.charCodeAt(i);  
            if (c < 128) {  
                string += String.fromCharCode(c);  
                i++;  
            } else if((c > 191) && (c < 224)) {  
                c2 = utftext.charCodeAt(i+1);  
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
                i += 2;  
            } else {  
                c2 = utftext.charCodeAt(i+1);  
                c3 = utftext.charCodeAt(i+2);  
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
                i += 3;  
            }  
        }  
        return string;  
    }  

    function decode_base64(input) {
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        var output = "";  
        var chr1, chr2, chr3;  
        var enc1, enc2, enc3, enc4;  
        var i = 0;  
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
        while (i < input.length) {  
            enc1 = _keyStr.indexOf(input.charAt(i++));  
            enc2 = _keyStr.indexOf(input.charAt(i++));  
            enc3 = _keyStr.indexOf(input.charAt(i++));  
            enc4 = _keyStr.indexOf(input.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output = output + String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output = output + String.fromCharCode(chr3);  
            }  
        }  
        output = _utf8_decode(output);  
        return output;   
    }

    var cookie_value = ga_read_cookie("hj_token");
    if (cookie_value == null || cookie_value.indexOf("|") == -1) {
        return "0";
    }
    try {
        return parseInt(decode_base64(cookie_value.split("|")[1]), 16).toString();
    } catch(e) {
        return "0";
    }
}

function ga_track(name, code, beforeSiteTrack, config) {

    _gaq.push(
	    ['_setAccount', code],
	    ['_addOrganic', 'baidu', 'word'],
	    ['_addOrganic', 'so.360.cn', 'q'],
	    ['_addOrganic', 'sogou', 'query'],
	    ['_addOrganic', 'soso', 'w'],
	    ['_addOrganic', 'gougou', 'search'],
	    ['_addOrganic', 'youdao', 'q']
    );

    if (beforeSiteTrack) {
        beforeSiteTrack();
    }

	ga_mark_site_login();
    
    var config = config || {allowHash: false};

	if (config.allowHash) {
		var url = location.pathname + location.search + location.hash;
		_gaq.push(['_trackPageview', url]);
	} else {
    	_gaq.push(['_trackPageview']);
	}

    if (/\.hujiang\.com$/i.test(location.hostname)) {
        _gaq.push(
	        ['t2._setAccount', 'UA-33308821-1'],
	        ['t2._addOrganic', 'baidu', 'word'],
	        ['t2._addOrganic', 'so.360.cn', 'q'],
	        ['t2._addOrganic', 'sogou', 'query'],
	        ['t2._addOrganic', 'soso', 'w'],
	        ['t2._addOrganic', 'gougou', 'search'],
	        ['t2._addOrganic', 'youdao', 'q'],
	        ['t2._setDomainName', '.hujiang.com'],
	        ['t2._addIgnoredRef', 'hujiang.com'],
            ['t2._addIgnoredRef', 'hjenglish.com'],
            ['t2._addIgnoredRef', 'yeshj.com']
        );
		ga_mark_hj_login();

		if (config.allowHash) {
			var url = location.pathname + location.search + location.hash;
			_gaq.push(['t2._trackPageview', url]);
		} else {
	    	_gaq.push(['t2._trackPageview']);
		}        
    } else {
        setTimeout(function () {
            var ref = document.referrer || "empty";
            var url = location.pathname + location.search;
            var hash = location.hash;
            var e = document.createElement("iframe");
            e.src = "../pass.hujiang.com/uc/hujiang_track.html@url=" + encodeURIComponent(url) + "&host=" + location.hostname + "&ref=" + encodeURIComponent(ref) + "&title=" + encodeURIComponent(document.title) + "&hash=" + encodeURIComponent(hash) + "&r=" + new Date().getTime();
            e.height = "0";
            e.width = "0";
            e.style.display = "none";
            e.style.visibility = "hidden";
            document.body.appendChild(e);
        }, 2000);
    }

    (function () {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = '../common.hjfile.cn/analytics/google/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
}

function ga_track_reg_search_keyword() {
    
    var pass_domain_cookie = document.cookie.match(/__utmz=156101306.+?(u.+?);/); 
    var hujiang_domain_cookie = document.cookie.match(/__utmz=219800966.+?(u.+?);/);

    if (pass_domain_cookie == null || hujiang_domain_cookie == null) {
        return;
    }
    
    // "utmcsr=kr.hujiang.com|utmccn=(referral)|utmcmd=referral|utmcct=/new/tag/%E6%B2%AA%E6%B1%9F%E9%9F%A9%E8%AF%AD/"
    pass_domain_cookie = pass_domain_cookie[1];

    // "utmcsr=baidu|utmccn=(organic)|utmcmd=organic|utmctr=%E6%B2%AA%E6%B1%9F%E9%9F%A9%E8%AF%AD"
    hujiang_domain_cookie = hujiang_domain_cookie[1];

    if (hujiang_domain_cookie.indexOf("utmcmd=organic") != -1) {
        var source_site = pass_domain_cookie.match(/utmcsr=(.+?)(\||$)/)[1];
        var keyword = hujiang_domain_cookie.match(/utmctr=(.+?)(\||$)/)[1];

        if (source_site && keyword) {
            ga_track_event("reg_search_keyword", source_site, decodeURIComponent(keyword));
        }
    }
}

function ga_check_channel() {
    if (location.hostname.indexOf(".hujiang.com") != -1) {

        if (location.search.indexOf("sem_source=sem_baidu") != -1 || 
        	ga_read_cookie("channel_source") == "sem_baidu" || 
        	ga_read_cookie("channel_source") == "sem_baidu_class") {

            ga_load_js("../common.hjfile.cn/analytics/channel/pz.js");
        
        }

		if (ga_cookie_exist("channel_source") ||
			location.search.indexOf("sem_source=") != -1 || 
			location.search.indexOf("pp_source=") != -1 ) {

			var common_host = "common.hjfile.cn";
			if (location.hostname.indexOf("dev.") != -1) {
				common_host = "dev.common.hjfile.cn";
			}
			ga_load_js("http://" + common_host + "/analytics/channel/channel.js");
		}
	}
}

function piwik_track_site(name, idsite) {
	window._paq = window._paq || [];
	_paq.push(["setSiteId", idsite]);
	_paq.push(['setTrackerUrl', '../track.yeshj.com/piwik/piwik.php']);

	_paq.push(['setCustomVariable', 1, 'ga_user_info', ga_get_hjid(), 'visit']); 

	var m_a6 = location.hash.match("#a6=(\\d+,\\d+,\\d+,\\d+)");
	if (m_a6 != null) {
		_paq.push(['setCustomVariable', 1, 'a6', m_a6[1], 'page']); 
	}

	_paq.push(["trackPageView"]);
	_paq.push(["enableLinkTracking"]);
}

function piwik_track_hj() {
	var m = /\.(hujiang|hjenglish)\.com$/.exec(location.hostname);
	if (m == null) {
		return;
	}
	var hostname = m[1];

    ga_load_js("../common.hjfile.cn/analytics/piwik/piwik.js");

    if (hostname == "hujiang") {
        setTimeout(function() {
            if (window.Piwik) {
                var piwikTracker = Piwik.getTracker();
	            piwikTracker.setSiteId("8");
	            piwikTracker.setCookieDomain("_2A.hujiang.com");
                piwikTracker.setTrackerUrl( "../track.yeshj.com/piwik/piwik.php");
                piwikTracker.setCustomVariable(1, "ga_user_info", ga_get_hjid(), "visit");

                var m_a6 = location.hash.match("#a6=(\\d+,\\d+,\\d+,\\d+)");
                if (m_a6 != null) {
                    piwikTracker.setCustomVariable(1, "a6", m_a6[1], "page");
                }

                piwikTracker.trackPageView();
            }            
        }, 3000);
    }
}   

ga_check_channel();
piwik_track_hj();

// ------------------------------------------------------------------------


//#begin
ga_track("site_mo", "UA-33601050-5");
piwik_track_site("site_mo", "20");
//#end

//#ga_js_load_finish#
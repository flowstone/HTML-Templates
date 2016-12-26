/// <reference path="jquery-1.3.1-vsdoc.js" />
var ReviewCommon = function () {
    var _remarkMinute = 61;
    var _remarkSecond = 61;
    var _remarkSplit = 2;        //两次操作的间隔时间数(秒)

    return {
        
        //评论回复(点击用户名,对此人进行回复)
        applyReview: function (_count) {
            var flag = "applyReview" + _count;
            if ($("#hiUserID").val() == "0") {
                Passport.Login(flag);
                return;
            }

            $("#txtComment").focus();
            var location = "";
            if (_count > 0) location = "(" + _count + "楼)";
            var content = "@" + jQuery.trim($("#sp_reviewuser" + _count).html()) + location;
            $("#txtComment").val(content.replace("说：", "") + "说：\r");
        },

        //增加评论顶的次数
        updateReviewAgree:function (_count, _reviewID) {
            var count = _count;
            var reviewID = _reviewID;
            if (this._getRemarkSpeed("sp_revieweventinfo" + count)) return;

            var url = "";
            url = "../../handler/review.json";
            $.get(
            url,
           { type: 2, reviewid: reviewID, rdm: 100000 * Math.random(), langs: this._getLangs(), },
             function (data) {
                 var agreenum = $("#sp_reviewagreenum" + count).html();
                 agreenum = agreenum.replace("(", "");
                 agreenum = agreenum.replace(")", "");
                 $("#sp_reviewagreenum" + count).html("(" + (+agreenum + 1) + ")");
                 ReviewCommon._createRemarkSpeed();
                 _isActive = true;
             });

            //支持之后,支持反对都变灰只读
            $("#sp_reviewagree" + _count).removeAttr("onclick");
            //$("#sp_reviewagree" + _count).removeClass();
            //$("#sp_reviewagree" + _count).addClass("gray");

        },

        //判断用户两次操作的时间
        _getRemarkSpeed:function () {
            var _time = new Date();

            if (arguments[0] == "sp_info") {
                _remarkSplit = 20;
            }

            if (_remarkMinute == 61) return false;
            if (_time.getMinutes() > _remarkMinute) return false;
            if (_time.getSeconds() > (_remarkSecond + _remarkSplit)) return false;

            var _message = "您的速度太敏捷了!请稍微慢些。";
            if (arguments.length == 2) {
                _message = arguments[1];
            }

            $("#" + arguments[0] + "").html(_message);
            this._timer(arguments[0], 2);
            return true;
        },

        //记录操作的时间
        _createRemarkSpeed:function () {
            var time = new Date();
            _remarkMinute = time.getMinutes();
            _remarkSecond = time.getSeconds();
        },

        //添加评论
        addReview:function () {

            if (this.checkCommentIsNull()) return;
            if (this.checkCommentLen()) return;
            
            if (this._getRemarkSpeed("sp_info")) return;

            if ($("#hiUserID").val() == "0") {
                $("#sp_info").css("color", "Red");
                $("#sp_info").html("登录后才能评论");
                return;
            }

            var reviewType = this.getReviewType();
            this._sendReview(reviewType);
        },

        //判断评论是否为空
        checkCommentIsNull:function () {
            var comment =$("#txtComment").val();
            var len = this.getStrLen(comment);
            
            if (len == 0) {
                $("#sp_info").css("color", "red");
                $("#sp_info").html("写点什么吧！");
                $("#txtComment").val("").focus();
                return true;
            }
            
            $("#sp_info").css("color", "");
            $("#sp_info").html("");
            return false;
        },

        //判断评论是否超长
        checkCommentLen: function () {
            var comment = $("#txtComment").val();
            var len = this.getStrLen(comment);

            if (len > 280) {
                $("#sp_info").css("color", "red");
                $("#sp_info").html("不能超过140个字了！");
                return true;
            }
            else {
                $("#sp_info").css("color", "");
                $("#sp_info").html("");
                return false;
            }
        },

        //添加评论(往服务器端提交)
        _sendReview:function () {
            $("#sp_info").html("<img src='../../../www.hjenglish.com/2009/images/loading.gif' />");
            $("#sp_info").show();

            if (this._remarking) return;      //防止用户重复提交评论
            this._remarking = true;
            var _contentid = $("#ContentID").val();
            var isIng = $("#chkIng").attr('checked') ? "1" : "0";
            var langs = this._getLangs();

            
            var url = "../../handler/review.json";
            
            //url = url + "@type=1&contentid=" + _contentid + "&comment=" + encodeURIComponent($("#txtComment").val()) + "&reviewtype=" + arguments[0];
            //url = url + "&active=" + _isActive.toString().toLowerCase() + "&isIng=" + isIng + "&rdm=" + Math.random() + "&callback=?";
            var data = {
                type: 1,
                contentid: _contentid,
                comment: $("#txtComment").val(),
                reviewtype: arguments[0],
                active: true,
                isIng: isIng,
                langs: this._getLangs(),
                parentID:0
            };

            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",

                success: function (json) {
                    ReviewCommon._reviewBack(json);
                },
                error: function (json) {
                }

            });
            
        },

        //成功发表评论
        _reviewBack:function (data) {
            var info = "1";
            var num = parseInt(data.response.status);

            if (num == 1) {
                this._appendReview();
                this._createRemarkSpeed();
            }
            else if (num == 2) {
                $("#sp_info").css("color", "red");
                $("#sp_info").html("抱歉，您的评论含有敏感字符，请检查后评论！");
            }
            else if (num == 3) {
                $("#sp_info").css("color", "red");
                $("#sp_info").html("抱歉，信息不全，请重新登录后评论！");
            }
            else if (num == 4) {
                $("#sp_info").css("color", "red");
                $("#sp_info").html("抱歉，您今天的评论过多，请先休息会~");
            }
            else if (num == 5) {
                $("#sp_info").css("color", "red");
                $("#sp_info").html("杯具，您被禁言了！禁言到 " + info[1] + "。");
            }
            this._remarking = false;
        },

        _getLangs:function () {
            var _langs = $("#Langs").val();
            if (_langs == "") {
                _langs = "en";
            }
            return _langs
        },

        //用户发表评论成功后，动态的将评论拼接到最下方
        _appendReview:function () {
            var date = new Date();
            var month = date.getMonth() / 1 + 1;
            var monthMessage = +month >= 10 ? month : ("0" + month.toString());
            var day = date.getDate();
            var dayMessage = +day >= 10 ? day : ("0" + day.toString());
            var hour = date.getHours();
            var hourMessage = +hour >= 10 ? hour : ("0" + hour.toString());
            var minutes = date.getMinutes();
            var minutesMessage = +minutes >= 10 ? minutes : ("0" + minutes.toString());

            var flor = parseInt($("#reviewCount").html()) + 1;

            var html = "<li>";
            html += "<div class='username_line'><span id='sp_reviewuser" + flor + "'>" + $("#hiUserName").val() + "</span><span class='reply_floor'>" + flor + "楼</span></div>";
            html += "<p>" + ReviewCommon._htmlEncode($("#txtComment").val()) + "</p>";
            html +="<div class='time_line'>";
            html += date.getFullYear() + "-" + monthMessage + "-" + dayMessage + ' ' + hourMessage + ":" + minutesMessage;
            html += "<a class='btn_zan'  id='sp_reviewagree" + flor + "'>";
            html += "<span id='sp_reviewagreenum" + flor + "'>(0)</span>";
            html +="</a>";
            html += "<a class='btn_reply' onclick='ReviewCommon.applyReview(" + flor + ");'>回复</a>";
            html += "<span id='sp_revieweventinfo" + flor + "' class='review_info'></span>";
            html +="</div>    ";
            html += "</li>";


            $("#phReview").show();
            $("#reviewList").append(html);
            $("#txtComment").val("");
            $("#reviewCount").html(flor);
            $("#sp_info").html("评论成功！").css("color", "#009900");
        },

        //Ctrl+Enter 发送评论
        keyPressToReview:function (eventobject) {

            if ($.browser.msie || $.browser.safari)     // IE  & safari
            {
                if (!eventobject.ctrlKey || eventobject.keyCode != 10) return;
            }
            else if (!eventobject.ctrlKey || eventobject.keyCode != 13) return;

            if (arguments.length == 2) this.addReview(arguments[1]);
            else this.addReview();
        },

        //是否自动勾选碎碎念
        _checkIng:function () {
            var comment = $("#txtComment").val();
            var len = this.getStrLen(comment);
            var checked = $("#chkIng").attr("checked");
            
            if (checked == true || checked == "checked") {
                return;
            }

            if (len > 10) {
                $("#chkIng").attr("checked", true);
            } else {
                $("#chkIng").attr("checked", false);
            }
        },

        //评论框获得焦点
        reviewTextBoxFocus:function () {
            this._txtInterval = window.setInterval("ReviewCommon._checkIng();ReviewCommon.checkCommentLen();", 500);
        },

        //评论框失去焦点
        reviewTextBoxBlur:function () {
            window.clearInterval(this._txtInterval);
        },

        getReviewType:function () {
            var reviewType = 1;

            if (location.href.indexOf('/dl/') > -1) {
                reviewType = 2;
            }
            else if ($(".hiIsLevel:first").val() == "True") {
                reviewType = 3;
            }
            else if (location.href.indexOf('/gongwuyuan') > -1 || location.href.indexOf('/kuaiji') > -1) {
                reviewType = 4;
            }
            return reviewType;
        },

        getStrLen: function (str) {
            str = str.replace(/^\s+|\s+$/g, "");
            var len = str.length;
            var width = 0;
            for (var i = 0; i < len; i++) {
                var c = str.charCodeAt(i);
                //单字节加1
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    width++;
                }
                else {
                    width += 2;
                }
            }
            return width;
        },

        _timer:function (domID, time) { setTimeout("$('#" + domID + "').html('')", time * 1000); },

        _htmlEncode:function(str){var s="";if(str.length==0)return"";s=str.replace(/&/g,"&gt;");s=s.replace(/</g,"&lt;");s=s.replace(/>/g,"&gt;");s=s.replace(/    /g,"&nbsp;");s=s.replace(/\'/g,"&#39;");s=s.replace(/\"/g,"&quot;");s=s.replace(/\n/g,"<br />");return s;},

        //获取更多评论
        GetReviewList: function (id, type, page, pageSize,langs) {

            $("#more_comment").html("正在加载中 <img src=\"../../../www.hjenglish.com/2009/images/loading.gif\" >");

            var url = "../../handler/review.json";
            var data = {
                type: 10,
                contentid: id,
                rtype: type,
                page: page,
                pageSize: pageSize,
                langs: this._getLangs(),
                rdm: 100000 * Math.random()
            };

            $.ajax({
                type: "POST",
                url: url,
                data: data,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                success: function (json) {
                    var pageCount = 0;
                    var html = "";

                    if (!isNaN(json.response.PageCount)) {
                        pageCount = parseInt(json.response.PageCount);
                    }
                    var floor = (page-1) * pageSize;
                    $.each(json.response.list, function (i, item) {
                        floor++;

                        html += "<li>";
                        html += "    <div class=\"username_line\"><span id=\"sp_reviewuser" + floor + "\">" + item.UserName + "</span><span class=\"reply_floor\">" + floor + "楼</span></div>";
                        html += "    <p>" + ReviewCommon._htmlEncode(item.Comments) + "</p>";
                        html += "    <div class=\"time_line\">" + item.DateAdded;
                        html += "    <a class=\"btn_zan\" onclick=\"ReviewCommon.updateReviewAgree(" + floor + "," + item.ReviewID + ");\" id=\"sp_reviewagree" + floor + "\"><span id=\"sp_reviewagreenum" + floor + "\">(" + item.AgreeNum + ")</span></a>";
                        html += "    <a class=\"btn_reply\" onclick=\"ReviewCommon.applyReview(" + floor + ");\">回复</a>";
                        html += "    <span id=\"sp_revieweventinfo" + floor + "\" class=\"review_info\"></span>";
                        html += "</li>";
                        
                    });

                    $("#reviewList").append(html);

                    if (page < pageCount) {
                        $("#more_comment").html("<a href=\"javascript:void(0);\" onclick=\"ReviewCommon.GetReviewList(" + id + "," + type + "," + (page + 1) + "," + pageSize + ");\" >加载更多评论</a>");

                    } else {
                        $("#more_comment").html("");
                    }
                },
                error: function () {
                    $("#more_comment").html("<a href=\"#more_comment\" onclick=\"this.GetReviewList(" + id + "," + type + "," + page + "," + pageSize + ");\" >加载更多评论</a>");
                }
                
            });

        }
    }
}();



$(document).ready(function () {
    var bestReviewCount = $("#phBestReview ul li").length;
    if (bestReviewCount > 0) {
        $("#phBestReview").show();
    } else {
        $("#phBestReview").hide();
    }

    var reviewCount = $("#phReview ul li").length;
    if (reviewCount > 0) {
        $("#phReview").show();
    } else {
        $("#phReview").hide();
    }

    var urlArray = location.href.split("#applyReview");
    if (urlArray.length > 1) {
        var _count = urlArray[1].replace(/[^0-9]/ig, "");
        _count = parseInt(_count);
        if (_count >= 1 && _count <= 5) {
            ReviewCommon.applyReview(_count);
        } else {
            $("#txtComment").focus();
        }
    }
    
    
});
// 判断是否为空
function dyfrom_null(value) {
	return !value.replace(/\s+/g,"")=='';
}


function dyform_length(value){
	return value.length;
	}


// 字符最小长度验证（一个中文字符长度为2）
function dyfrom_min(value, param) {
	 var length = value.length;
	 for ( var i = 0; i < value.length; i++) {
	  if (value.charCodeAt(i) > 127) {length++;}
	 }
	 return length >= param;
}
	
// 字符最大长度验证（一个中文字符长度为2）
function dyfrom_max(value, param) {
	 var length = value.length;
	 if (length==0){return true;} 
	 for ( var i = 0; i < value.length; i++) {
	  if (value.charCodeAt(i) > 127) {length++;}
	 }
	 return length <= param;
}
	
// 不允许包含特殊符号
function dyfrom_string(value) {
	 return /^[\u0391-\uFFE5\w]+$/.test(value);
}
	
// 手机号码验证
function dyfrom_mobile(value) {
	 var length = value.length;
	 return length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value);
}
	
// 电话号码验证
function dyfrom_phone(value) {
	 var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
	 return tel.test(value);
}
 

	
// 邮政编码验证
function dyfrom_zipCode(value) {
	 var tel = /^[0-9]{6}$/;
	 return tel.test(value);
}

// 邮箱
function dyfrom_email(value) {
	var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	return value.search(email)==0;
}
	
// 必须以特定字符串开头验证
function dyfrom_begin(value, param) {
	 var begin = new RegExp("^" + param);
	 return begin.test(value);
}
	
// 验证值小数位数不能超过两位
function dyfrom_decimal(value) {
	 var decimal = /^-?\d+(\.\d{1,2})?$/;
	 return decimal.test(value);
}
// 验证货币
function dyfrom_ismoney(value){
	var z = /^\d+$/;
	if(value=='0')return false;
	if(!z.test(value)){
		var re = new RegExp("^[0-9]+[\.][0-9]{0,3}$");
		return re.test(value);
	}
	return true;
} 


function dyfrom_ajax(url,value) {
	$.ajax({
		type: "POST",
		url: url,
		async: false,
		cache: false,
		data: value,
		success: function(msg){
			overs=msg;
		}
	});
	return overs;
}

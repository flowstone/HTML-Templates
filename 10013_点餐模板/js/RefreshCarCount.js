// Page  carcount

var refreshTotal = function () {
        var ckcart = $.cookie('cart') || '';
	    var total=0;
	    $.each(ckcart.split(',') , function (i , v) {
		    var p = v.indexOf('-') + 1;
		    if (p != 0)
			    total += parseInt(v.substr(p));
	    });
		
		//#carttotal对应的是显示总数的标签的Id,移植时改动下面这个Id即可
		  $('.count').html(total);
		 
	};
	 refreshTotal();
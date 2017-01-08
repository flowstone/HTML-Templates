	function isIE6() {   
		return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 6.0")=="-1"?false:true;   
	}   
	function isIE7(){   
		return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 7.0")=="-1"?false:true;   
	}   
	function isIE8(){   
		return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 8.0")=="-1"?false:true;   
	}   
  
	
	function showResult(){		
		if(isIE6() || isIE7() || isIE8()){
		//if(isIE6()){
			if(window.screen.width >= 1280)
			{	
				var src = 'style/biodiscover-IE1260.css';
			}
			else if(window.screen.width >= 1020 && window.screen.width < 1280)
			{
				 
				var src = 'style/biodiscover-IE1020.css';
			}
			else if(window.screen.width < 1020)
			{
				 
				//var src = 'style/biodiscover-IE940.css';
				var src = 'style/biodiscover-IE1020.css';
			}
			
			
		 
			 
	   		
			var el=document.createElement('link');
			el.setAttribute('rel','stylesheet');
			el.setAttribute('type','text/css');
			el.setAttribute('href', src);//3k
			document.body.appendChild(el);
		}
	}
		
	 showResult();
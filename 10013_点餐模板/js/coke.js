// JavaScript Document www.divcss5.com
function addListener(element,e,fn){    
    	 if(element.addEventListener){    
          	element.addEventListener(e,fn,false);    
     	 } else {    
         	 element.attachEvent("on" + e,fn);    
     	 }    
	} 
		addListener(document,"click",function(evt){
				var evt = window.event?window.event:evt,target=evt.srcElement||evt.target;
				if(target.id == "showDiv"){
					document.getElementById("DIVCSS5").style.display = "";
					return;
				}else{
					while(target.nodeName.toLowerCase() != "div" && target.nodeName.toLowerCase() != "html"){
						target = target.parentNode;		
					}
					if(target.nodeName.toLowerCase() == "html"){
						document.getElementById("DIVCSS5").style.display = "none";
					}
						
					
				}			
		})
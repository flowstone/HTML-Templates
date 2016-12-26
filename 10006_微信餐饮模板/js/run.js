var active=0,
			as=document.getElementById('pagenavi').getElementsByTagName('a');
			
		for(var i=0;i<as.length;i++){
			(function(){
				var j=i;
				as[i].onclick=function(){
					t2.slide(j);
					return false;
				}
			})();
		}

		var t1=new TouchScroll({id:'wrapper','width':5,'opacity':0.7,color:'#555',minLength:20});
		var t2=new TouchSlider({id:'slider', speed:600, timeout:6000, before:function(index){
				as[active].className='';
				active=index;
				as[active].className='active';
			}});
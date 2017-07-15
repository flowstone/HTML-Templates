<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<style type="text/css">
			body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
/*
		#allmap {width: 800px;height: 500px;overflow: hidden;margin:0;font-family:"微软雅黑";}
*/
	</style>
	<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=<?php echo $ak; ?>"></script>
	<title>联系地址地图</title>
</head>
<body>
	<div id="allmap"></div>
</body>
</html>
<script type="text/javascript">
	// 百度地图API功能
	var map = new BMap.Map("allmap");
	var point = new BMap.Point(116.331398,39.897445);
	//map.centerAndZoom(point,12);
  // 添加带有定位的导航控件
  var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
  });
  map.addControl(navigationControl);
  // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", 
function(e){
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
    // 定位失败事件
    alert(e.message);
  });
  map.addControl(geolocationControl);
  
	// 创建地址解析器实例
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint("<?php echo $address ?>", function(point){
		if (point) {
			map.centerAndZoom(point, 16);
			var marker = new BMap.Marker(point);  // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中
			var opts = {
			  width : 200,     // 信息窗口宽度
			  height: 100,     // 信息窗口高度
			  title : "<?php echo $storeNname; ?>" , // 信息窗口标题
			  enableMessage:true,//设置允许信息窗发送短息
			  message:"<?php echo $storeNname; ?>地址：<?php echo $address ?>"
			}
			var infoWindow = new BMap.InfoWindow("地址：<?php echo $address ?>", opts);  // 创建信息窗口对象 
			marker.addEventListener("click", function(){          
				map.openInfoWindow(infoWindow,point); //开启信息窗口
			});
		}else{
			alert("您选择地址没有解析到结果!");
		}
	}, "");

	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.addControl(new BMap.ScaleControl());             // 添加比例尺控件
	map.addControl(new BMap.OverviewMapControl());       //添加缩略地图控件
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
</script>

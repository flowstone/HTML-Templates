var div_img_width_size;
//全局变量，用于普通瀑布流时候使用
var space_speacil_img_width_height;
var is_360browser = navigator.userAgent.match(/360browser/);
//对于WO空间的特殊图片进行切图标记的参数
function set_img_container(page_type)
{
    var client_width = document.documentElement.clientWidth ;
    if(is_360browser=="360browser" && client_width==800)//对于android低版本系统在360浏览器的屏幕宽获取错误特殊处理
    {
        client_width = 320;
    }
    
    if(client_width > 720)
    {
        document.write("<style type='text/css'>.content .content-max720 { max-width:800px}</style>");
        client_width = (client_width > 800) ? 800 : client_width;
        div_img_width_size=Math.round((client_width-30) / 3);
    }
    else
    {
        div_img_width_size=(client_width-26) / 2;
    }
    
    //var img_width = (div_img_width_size-4).toString();原版
    
    //新改 为了在瀑布流的时候，图片宽跟内容宽一致而做的处理
    var img_width = div_img_width_size.toString();
    //新改 end
    
    if(page_type=="space")
    {
        //var img_height = img_width;//原版
        
        //新改，由于瀑布流的时候图片稍微大了4个像素，现在用户内容列表页大小兼容的处理，
        var img_width = img_width-4;
        var img_height = img_width;
        //新改 end
        
        var trips_width = img_width-16;
        var column_width = client_width-4;
        space_speacil_img_width_height = img_width;//对于WO空间的特殊图片进行切图标记的参数，宽高一致
    }

    document.write("<style type='text/css'>");
    document.write(".item a img { ");
    document.write("width:"+img_width+"px;");
    if(page_type=="space")
    {
        document.write("height:"+img_height+"px;");
        document.write(" }");
        document.write(".without_img_content { ");
        document.write("width:"+img_width+"px;");
        document.write("height:"+img_height+"px;");
        document.write(" }");
        
        document.write(".item_wo { ");
        document.write("width:"+img_width+"px;");
        document.write("height:"+img_height+"px;");
        document.write("overflow:hidden");
        document.write(" }");
        
        document.write(".item { ");
        document.write("width:"+img_width+"px;");
        document.write("height:"+img_height+"px;");
        document.write(" }");
        
        document.write(".trips {");
        document.write("width:"+trips_width+"px;");
        document.write(" }");
        document.write(".label_page .pic_box .column {");
        document.write("width:"+column_width+"px;");
    }
    document.write(" }");
    document.write("</style>");
}

function imgCen(imgObjImg)
{	
    
    var setObjHeigth = parseInt(space_speacil_img_width_height);
    var setObjWidth  = parseInt(space_speacil_img_width_height);
    var imgWidth = imgObjImg.width;
    var imgHeight = imgObjImg.height;
    if( (imgWidth/setObjWidth) > (imgHeight/setObjHeigth) )
    {
        var retWidth = setObjHeigth*imgWidth / imgHeight;
        imgObjImg.style.width = retWidth;
        imgObjImg.style.height = setObjHeigth + 'px';
        imgObjImg.style.marginLeft = -(retWidth-setObjWidth)/2 + "px";
    }
    else
    {
        var retHeight = setObjWidth*imgHeight / imgWidth;
        imgObjImg.style.height = retHeight;
        imgObjImg.style.width  = setObjWidth + 'px';
        imgObjImg.style.marginTop = -(retHeight-setObjHeigth)/2 + "px";
    }	
    imgObjImg.style.visibility = "visible" ;
}
var xml='',mx='',my='';
function DrInit(){
var element=document.createElement('script');
element.setAttribute('src','../../jquery-1.7.1.min.js');
document.body.appendChild(element);    
var element2=document.createElement('script');
element2.setAttribute('src','https://funday.asia/Dr.eye/md5.js');
document.body.appendChild(element2);

var element3=document.createElement('script');
element3.setAttribute('src','https://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js');
document.body.appendChild(element3); 

//document.getElementById("_dict_status").style.left="420";
//document.getElementById("_dict_status").style.top="105";



}

function DrSign(Str){
    return md5(Str+'B00132018050818000082add88e914f73643b7f');
}

function DrDate(Str){
    var urls='./data.asp';
    var Parameter='str='+(Str)+'&key='+DrSign(Str);
    alert(urls+"?"+Parameter)
    $.ajax({
		type:"GET",
		url:urls+"?"+Parameter,
		dataType:"html",
		success:function(data){
            xml=data;
            DVShow();
		} 
	});
}

function DrDate2(Str){
    var q=Str, FirmID = 'B0013' , salt='20180508180000' ,secretkey='82add88e914f73643b7f'; 
    var url='http://61.220.79.170/Dict.aspx';
    var sign=md5(q+FirmID+salt+secretkey);
    var Parameter='q='+(q)+'&FirmID='+FirmID+'&ContentID=DIC0025_DIC0026&type=html&salt='+salt+'&sign='+sign;
    $('body').append('<div id="_dict_layer" style="position: absolute; z-index: 9000; background-color: rgb(255, 255, 255); left:'+(mx+10)+'px;top:'+(my-50)+'px;"><table width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #7E98D6;border-left:1px solid #7E98D6;border-right:1px solid #7E98D6;border-bottom:1px solid #7E98D6;"><tbody><tr><td><div width="100%" style="cursor:move;background-color:#C8DAF3;border:0px;" onmouseover="_dict_onmove=1;" onmouseout="_dict_onmove=0;"><table width="100%"><tbody><tr><td align="left" width="60%" style="background-color:#C8DAF3;"><div style="color:#1A9100;font-size:14px;background-color:#C8DAF3;">Funday線上字典</div></td><td align="right" style="background-color:#C8DAF3;"> <a href="javascript:menu_infoH()" title="關閉" target="_self"><img src="http://dict.fareast.com.tw/pic/close.gif" style="border:none;display:inline;" align="absmiddle"></a></td></tr></tbody></table></div><table border="0" cellspacing="4" cellpadding="3" width="100%" align="center" onmouseover="_dict_onlayer=1;" onmouseout="_dict_onlayer=0;"><tbody><tr><td><fieldset color="#00c0ff"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tbody><tr><td width="100%"><iframe id="_dictFrame" name="_dictFrame"  height="120"  src="'+url+'?'+Parameter+'" frameborder="0" width="100%"></iframe></td></tr></tbody></table></fieldset></td></tr></tbody></table></td></tr></tbody></table></div>')
  
      $(function(){
        $( "#_dict_layer" ).draggable();
      });
}

function DVShow(){
    //$('body').append('<div style="left:'+(mx+10)+'px;top:'+(my-50)+'px;position:absolute; " id="TutorLive_DV">'+$(xml).find("row-value:eq(0)").text()+'</div>')
    $('body').append('<div id="_dict_layer" style="position: absolute; z-index: 9000; background-color: rgb(255, 255, 255); left:'+(mx+10)+'px;top:'+(my-50)+'px;"><table width="240" cellspacing="0" cellpadding="0" style="border-top:1px solid #7E98D6;border-left:1px solid #7E98D6;border-right:1px solid #7E98D6;border-bottom:1px solid #7E98D6;"><tbody><tr><td><div width="100%" style="cursor:move;background-color:#C8DAF3;border:0px;" onmouseover="_dict_onmove=1;" onmouseout="_dict_onmove=0;"><table width="100%"><tbody><tr><td align="left" width="60%" style="background-color:#C8DAF3;"><div style="color:#1A9100;font-size:14px;background-color:#C8DAF3;">Funday線上字典</div></td><td align="right" style="background-color:#C8DAF3;"> <a href="javascript:menu_infoH()" title="關閉" target="_self"><img src="http://dict.fareast.com.tw/pic/close.gif" style="border:none;display:inline;" align="absmiddle"></a></td></tr></tbody></table></div><table border="0" cellspacing="4" cellpadding="3" width="100%" align="center" onmouseover="_dict_onlayer=1;" onmouseout="_dict_onlayer=0;"><tbody><tr><td><fieldset color="#00c0ff"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tbody><tr><td width="100%">'+$(xml).find("row-value:eq(0)").text()+'</td></tr></tbody></table></fieldset></td></tr></tbody></table></td></tr></tbody></table></div>')
   
    $(function(){
      $( "#_dict_layer" ).draggable();
    });
  }

function getselectDr(){
    var t='';
    if(window.getSelection){t=window.getSelection().toString();}
    if(t!='') DrDate(t);
}

function menu_infoH(){
   //$('#TutorLive_DV').remove();
   $('#_dict_layer').remove();
}	

// Detect if the browser is IE or not.
// If it is not IE, we assume that the browser is NS.
var IE = document.all?true:false

// If NS -- that is, !IE -- then set up for mouse capture
if (!IE) document.captureEvents(Event.MOUSEMOVE)

// Set-up to use getMouseXY function onMouseMove
document.onmousemove = getMouseXY;

// Temporary variables to hold mouse x-y pos.s


// Main function to retrieve mouse x-y pos.s

function getMouseXY(e) {
  if (IE) { // grab the x-y pos.s if browser is IE
    mx = event.clientX + document.body.scrollLeft
    my = event.clientY + document.body.scrollTop
  } else {  // grab the x-y pos.s if browser is NS
    mx = e.pageX
    my = e.pageY
  }  
  // catch possible negative values in NS4
  if (mx < 0){mx = 0}
  if (my < 0){my = 0}  
  // show the position values in the form named Show
  // in the text fields named MouseX and MouseY
}
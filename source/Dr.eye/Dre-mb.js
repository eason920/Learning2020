var mx='',my='';

function DrInit(){
//var element=document.createElement('script');
//element.setAttribute('src','../../jquery-1.7.1.min.js');
//document.body.appendChild(element);   

var element2=document.createElement('script');
element2.setAttribute('src','https://funday.asia/Dr.eye/md5.js');
document.body.appendChild(element2);

//var element3=document.createElement('script');
//element3.setAttribute('src','https://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js');
//document.body.appendChild(element3); 

var element4=document.createElement('link');
element4.rel = "stylesheet";
element4.type ="text/css";
element4.href = "../../../../sample/learning/Dr.eye/css/main-min.css";
document.getElementsByTagName("head")[0].appendChild(element4);
}

function DrSign(Str){
    return md5(Str+'B00052018050818000014c6e8aea71936e21479');
}

function DrDate(Str) {
    ///Dr.eye/dataCheck.asp?str=urged&key=872b8d233e631c80c8344a1d068e1c52
   var url='/Dr.eye/dataCheck.asp';
   var Parameter = 'str=' + (Str) + '&key=' + DrSign(Str);

   RemoveDr()
   $('body').append('<div id="lightBoxDIY" style="width:100%;height:100vh;background-color: transparent;position: fixed;z-index: 8999;top:0px;left:0px;" onclick="RemoveDrAll()"><div id="Dr_layer" style="position: absolute; z-index: 9000;  left:calc(50% - 150px);top:calc(50% - 100px);"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"  ><tbody><tr><td width="100%" class="BG" id="BGLoading"><iframe id="_dictFrame" name="_dictFrame"  height="200"  src="'+url+'?'+Parameter+'" frameborder="0" width="100%" style="border:0px;" border="0" scrolling="no" ></iframe></td></tr></tbody></table></div></div>')
	$(function(){
		$( "#Dr_layer" ).draggable();
	});
}

function DrDate1(Str){
	var lpos, tpos;
	var url='../../../../sample/learning/Dr.eye/data3.asp';
	var Parameter='str='+(Str)+'&key='+DrSign(Str);
	RemoveDr()
	if (mx+10+300 >= document.body.offsetWidth){
		lpos = document.body.offsetWidth - 300 - 10;
	}else{
		lpos = mx + 10;
	}
	if( my-50+216 >= document.body.offsetHeight){
		tpos = document.body.offsetHeight - 216 - 10;
	}else{
		tpos = my - 50;
	}
	$('body').append('<div id="Dr_layer" style="position: absolute; z-index: 9000;  left:calc(50% - 150px);;top:calc(50% - 100px);"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"  ><tbody><tr><td width="100%" class="BG" id="BGLoading"><iframe id="_dictFrame" name="_dictFrame"  height="200"  src="'+url+'?'+Parameter+'" frameborder="0" width="100%" style="border:0px;" border="0" scrolling="no" ></iframe></td></tr></tbody></table></div>')
	//$('body').append('<div id="Dr_layer" style="position: absolute; z-index: 9000;  left:'+(mx+10)+'px;top:'+(my-50)+'px;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center" style="background-color:#f9efaa;" ><tbody><tr><td width="100%" class="BG" id="BGLoading"><iframe id="_dictFrame" name="_dictFrame"  height="200"  src="'+url+'?'+Parameter+'" frameborder="0" width="100%" style="border:0px;" border="0" scrolling="no" ></iframe></td></tr></tbody></table></div>')
	$(function(){
		$( "#Dr_layer" ).draggable();
	});
}

function DrDate2(Str){
	var lpos, tpos;
	var url='../../../../sample/learning/Dr.eye/data2.asp';
	var Parameter='str='+(Str)+'&key='+DrSign(Str);
	RemoveDr()
	if (mx+10+500 >= document.body.offsetWidth){
		lpos = document.body.offsetWidth - 500 - 10;
	}else{
		lpos = mx + 10;
	}
	if( my-50+616 >= document.body.offsetHeight){
		tpos = document.body.offsetHeight - 616 - 10;
	}else{
		tpos = my - 50;
	}
    $('body').append('<div id="Dr_layer" style="position: absolute; z-index: 9000;  left:calc(50% - 150px);top:calc(50% - 30vh);"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center" ><tbody><tr><td width="100%" class="BG" id="BGLoading"><iframe id="_dictFrame" name="_dictFrame"    src="' + url + '?' + Parameter + '" frameborder="0" width="100%" style="border:0px;height:60vh;" border="0" ></iframe></td></tr></tbody></table></div>')
	//$('body').append('<div id="Dr_layer2" style="position: absolute; z-index: 9000;  left:' + (mx + 10) + 'px;top:' + (my - 50) + 'px;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center" style="background-color:#f9efaa;"><tbody><tr><td width="100%" class="BG" id="BGLoading"><iframe id="_dictFrame" name="_dictFrame"  height="600"  src="' + url + '?' + Parameter + '" frameborder="0" width="100%" style="border:0px;" border="0" ></iframe></td></tr></tbody></table></div>')
    console.log($("#Dr_layer").css("width"));
    $(function(){
       $( "#Dr_layer" ).draggable();
    });
}

function RemoveDrAll(){
	$('#lightBoxDIY').remove();
	$('#Dr_layer').remove();
	$('#Dr_layer2').remove();
	$('.english span').removeAttr('style');
 }	

function RemoveDr(){
   $('#Dr_layer').remove();
	$('#Dr_layer2').remove();
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
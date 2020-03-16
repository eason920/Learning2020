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

const fnLayerColor = function(){
	const parentClassName = $('#stepBox').attr('class');
	let className;
	switch(true){
		case /skin1/.test(parentClassName):
			className = 'skin1';
			break;
		case /skin2/.test(parentClassName):
			className = 'skin2';
			break;
		default:
	}
	return className;
}

let cx, cy;
const orgOffset = function(){
	$('.english').on('click.xy', 'span', function(){
		const drWidth = 300;
		const drHeight = 215;
		const gutter = 20;
		const ww = $(window).width();
		const maxX = ww - drWidth - gutter;
		const wh = $(window).height();
		const maxY = wh - drHeight;		
		cx = $(this).offset().left;
		if ( cx > maxX && ww >= 1200 ){
			cx = maxX;
		}else if( cx > maxX && ww < 1200 ){
			cx = maxX + $(window).scrollLeft();
		}

		cy = $(this).offset().top + $(this).height();
		if( cy > maxY ){
			let destance = wh - ( cy + 215 );
			cy = wh - 215 - destance - 215 - $(this).height();
		}
		$('.english').off('.xy');
	});	
}

const spanHeightLight = function(){
	$('.english').on('click.heightLight', 'span', function(){
		$('.english span').removeClass('is-height-light');
		$(this).addClass('is-height-light');
		$('.english').off('.heightLight');
	});
};


function fnVocabularyWidth(left){
	$('.drbox').css({left, 'display': 'block'});
}

function DrDate(Str) {
	
    ///Dr.eye/dataCheck.asp?str=urged&key=872b8d233e631c80c8344a1d068e1c52
   var url='/Dr.eye/dataCheck.asp';
	var Parameter = 'str=' + (Str) + '&key=' + DrSign(Str);
	
	
	RemoveDr()

	orgOffset();
	spanHeightLight();
	

	$('body').append('<div id="lightBoxDIY" style="width:100%;height:100vh;background-color: transparent;position: fixed;z-index: 8999;top:0px;left:0px;" onclick="RemoveDrAll()"></div>')
	$('body').append('<div id="Dr_layer" style="position: absolute; z-index: 9000;  left:' + cx + 'px;top:' + cy + 'px;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"  ><tbody><tr><td width="100%" class="BG" id="BGLoading"><div class="drbox"><div class="drbox-icon" data-value="0"><div class="drbox-true"><span>+</span>收錄</div><div class="drbox-false">己收錄</div></div><div class="drbox-logo"></div></div><iframe id="_dictFrame" name="_dictFrame"  height="200"  src="' + url + '?' + Parameter +'" frameborder="0" width="100%" style="border:0px;" border="0" scrolling="no" ></iframe></td></tr></tbody></table></div>')
	$(function(){
		$( "#Dr_layer" ).draggable();
		$('#Dr_layer').addClass('is-ready');
		
		$('.drbox-icon').click(function () {
			$('.drbox-icon').toggleClass('active');
			if(!$('.drbox-icon').hasClass('active')){
				$('.drbox-icon').attr('data-value',"0")
				Dr_Starjoin(refId,Str,'','D')
			}else{
				$('.drbox-icon').attr('data-value',"1")
				Dr_Starjoin(refId,Str,'','I')
			}			
		});
		const className = fnLayerColor();
		$( "#Dr_layer" ).addClass(className);

	});
}

function DrDate1(Str){
	var lpos, tpos;
	var url='../../../../sample/learning/Dr.eye/data3.asp';
	var Parameter='str='+(Str)+'&key='+DrSign(Str)+'&tamplate='+tamplate;
	RemoveDr()
	orgOffset();
	spanHeightLight();
	
	// if (mx+10+300 >= document.body.offsetWidth){
	// 	lpos = document.body.offsetWidth - 300 - 10;
	// }else{
	// 	lpos = mx + 10;
	// }
	// if( my-50+216 >= document.body.offsetHeight){
	// 	tpos = document.body.offsetHeight - 216 - 10;
	// }else{
	// 	tpos = my - 50;
	// }
	$('body').append('<div id="Dr_layer" style="position: absolute; z-index: 9000;  left:' + cx + 'px;top:' + cy +'px;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"  ><tbody><tr><td width="100%" class="BG" id="BGLoading"><div class="drbox"><div class="drbox-icon" data-value="0"><div class="drbox-true"><span>+</span>收錄</div><div class="drbox-false">己收錄</div></div><div class="drbox-logo"></div></div><iframe id="_dictFrame" name="_dictFrame"  height="200"  src="'+url+'?'+Parameter+'" frameborder="0" width="100%" style="border:0px;" border="0" scrolling="no" ></iframe></td></tr></tbody></table></div>')
	//$('body').append('<div id="Dr_layer" style="position: absolute; z-index: 9000;  left:'+(mx+10)+'px;top:'+(my-50)+'px;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center" style="background-color:#f9efaa;" ><tbody><tr><td width="100%" class="BG" id="BGLoading"><iframe id="_dictFrame" name="_dictFrame"  height="200"  src="'+url+'?'+Parameter+'" frameborder="0" width="100%" style="border:0px;" border="0" scrolling="no" ></iframe></td></tr></tbody></table></div>')
	$(function(){
		$( "#Dr_layer" ).draggable();
		$('#Dr_layer').addClass('is-ready');
		Dr_StarChk(refId,Str)
		$('.drbox-icon').click(function () {
			$('.drbox-icon').toggleClass('active');
			if(!$('.drbox-icon').hasClass('active')){
				$('.drbox-icon').attr('data-value',"0")
				Dr_Starjoin(refId,Str,'','D')
			}else{
				$('.drbox-icon').attr('data-value',"1")
				Dr_Starjoin(refId,Str,'','I')
			}					
		});
		const className = fnLayerColor();
		$( "#Dr_layer" ).addClass(className);

	});
}

function DrDate2(Str){
	var lpos, tpos;
	var url='../../../../sample/learning/Dr.eye/data2.asp';
	var Parameter='str='+(Str)+'&key='+DrSign(Str)+'&tamplate='+tamplate;
	RemoveDr()
	orgOffset();
	spanHeightLight();
	

	// if (mx+10+500 >= document.body.offsetWidth){
	// 	lpos = document.body.offsetWidth - 500 - 10;
	// }else{
	// 	lpos = mx + 10;
	// }
	// if( my-50+616 >= document.body.offsetHeight){
	// 	tpos = document.body.offsetHeight - 616 - 10;
	// }else{
	// 	tpos = my - 50;
	// }
	$('body').append('<div id="Dr_layer" style="position: absolute; z-index: 9000;  left:' + cx + 'px;top:' + cy + 'px;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center" ><tbody><tr><td width="100%" class="BG" id="BGLoading"><div class="drbox"><div class="drbox-icon" data-value="0"><div class="drbox-true"><span>+</span>收錄</div><div class="drbox-false">己收錄</div></div><div class="drbox-logo"></div></div><iframe id="_dictFrame" name="_dictFrame"  height="600"  src="' + url + '?' + Parameter + '" frameborder="0" width="100%" style="border:0px;" border="0" ></iframe></td></tr></tbody></table></div>')
	//$('body').append('<div id="Dr_layer2" style="position: absolute; z-index: 9000;  left:' + (mx + 10) + 'px;top:' + (my - 50) + 'px;"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center" style="background-color:#f9efaa;"><tbody><tr><td width="100%" class="BG" id="BGLoading"><iframe id="_dictFrame" name="_dictFrame"  height="600"  src="' + url + '?' + Parameter + '" frameborder="0" width="100%" style="border:0px;" border="0" ></iframe></td></tr></tbody></table></div>')
    $(function(){
		$( "#Dr_layer" ).draggable();
		const className = fnLayerColor();
		$( "#Dr_layer" ).addClass(className);

    });
}

function wordlist_Get(xml){
	$.ajax({
		type:"POST",
		url:"Word.asp?xml="+xml,
		//data: $("#searchForm").serialize(),
		dataType:"html",
		error: function(){
			//alert(url)
		},
		success:function(data){
			$('.translation_list2').html(data)
			
		}					
	});
}

function Dr_Starjoin(xml,En,Ch,target){

	$.ajax({
		type:"POST",
		url:"Word_response.asp?tg="+target+"&xml="+xml+"&Enword="+En+"&Chword="+Ch,
		//data: $("#searchForm").serialize(),
		dataType:"html",
		error: function(){
			//alert(url)
		},
		success:function(data){
			//$("#search").html("");
			//console.log("Word_response.asp?tg="+tg+"&xml="+xml+"&ix="+ix+"&Enword="+en+"&Chword="+tc+"&ods="+ods)
			//word_get2();
			wordlist_Get(xml);
		}					
	});		 
 
}

function Dr_StarjoinM(xml,En,target,ods){
	var Ch=$('#Chword_'+ods).val()
	$.ajax({
		type:"POST",
		url:"Word_response.asp?tg="+target+"&xml="+xml+"&Enword="+En+"&Chword="+Ch+"&ods="+ods,
		//data: $("#searchForm").serialize(),
		dataType:"html",
		error: function(){
			//alert(url)
		},
		success:function(data){
			//$("#search").html("");
			//console.log("Word_response.asp?tg="+tg+"&xml="+xml+"&ix="+ix+"&Enword="+en+"&Chword="+tc+"&ods="+ods)
			//word_get2();
			wordlist_Get(xml);
		}					
	});		 
 
}

function Dr_StarChk(xml,Str){
	$.ajax({
		type: 'POST',
		url: 'vocabulary.asp?Enkeyword='+Str+'&ref_id='+xml ,
		cache:false,
		dateType:'json',
		success:function(data){
			
			if(data.En_word==''){
				$('.drbox-icon').attr('data-value',"0")
				$('.drbox-icon').removeClass('active');	
			}else{
				$('.drbox-icon').attr('data-value',"1")
				$('.drbox-icon').addClass('active');				
			}
		}			   
	});
}

function RemoveDrAll(){
	$('#lightBoxDIY').remove();
	$('#Dr_layer').remove();
	$('#Dr_layer2').remove();	
	$('.english span').removeClass('is-height-light');
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
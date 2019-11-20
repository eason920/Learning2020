function Block(id){
	if(id==1){
	 $('.article').show();
	 $('.article2').hide();
	}else{
	 $('.article2').show();
	 $('.article').hide();
	}
}

function ch_font(str,clock){
	var x='',y='',playo='';
	y=clock;


	playo="playC("+y+");"
	str=spanWord((str))

		
	if(str.indexOf("**")!=-1){
		str=str.replace("**","");
		x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><div id='t"+y+"' onDblClick='_dictClose();'  class='english'>" +str+ "<input type='button' onclick='"+playo+"' class='read_btn link'></div>");
	}else{
		x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><div id='t"+y+"' onDblClick='_dictClose();'  class='english'>" +str+ "<input type='button' onclick='"+playo+"' class='read_btn link'></div>");
	}

	return x;
}

function ch_font2(str,clock){
	var x='',y='',playo='';
	y=clock;


	playo="play("+y+");"


	if(str.indexOf("**")!=-1){
		str=str.replace("**","");
		x=str.replace(str,"**<div id='ct"+y+"' onDblClick=_dictClose();"+playo+" class='Chinese'>" +str+ "</div>");
	}else{
		x=str.replace(str,"**<div id='ct"+y+"' onDblClick=_dictClose();"+playo+" class='Chinese'>" +str+ "</div>");
	}
	return x;
}


function tranchang(transtr){
	var regEx =/\[r1\]/g
	var regEx2 =/\[\/r1\]/g
	var regEx3 =/\[r2\]/g
	var regEx4 =/\[\/r2\]/g
	var regEx5 =/\[r3\]/g
	var regEx6 =/\[\/r3\]/g

	//transtr="<font class='train_1'>"+transtr	
	transtr=transtr.replace(regEx,"[r1]") 
	transtr=transtr.replace(regEx2,"[/r1]") 
	transtr=transtr.replace(regEx3,"") 
	transtr=transtr.replace(regEx4,"") 	  
	transtr=transtr.replace(regEx5,"[r3]") 
	transtr=transtr.replace(regEx6,"[/r3]") 
	
	transtr=spanWord((transtr))
	//alert(transtr)
	
	transtr=transtr.replace(regEx5,"<font class='train_3'>") 
	transtr=transtr.replace(regEx6,"</font> ") 
	transtr=transtr.replace(regEx,"<font class='train_2'>") 
	transtr=transtr.replace(regEx2,"</font>") 
	transtr=transtr.replace(regEx5,"<font class='train_3'>") 
	transtr=transtr.replace(regEx6,"</font> ") 

	//transtr=transtr+"</font>"

	//alert(transtr)
	return transtr;
	 
}


function main(){
	var Str='',eu='',cu='',tempStr='';
	
	playerinit()
	

		
	var E_Channel=$(en).find("lrc").attr("Channel");
	var C_Channel=$(tc).find("lrc").attr("Channel"); 
	var en_title=$(en).find("lrc").attr("title").replace("`","'");
	var ch_title=$(tc).find("lrc").attr("title");
	var pic=$(en).find("lrc").attr("PIC").replace("http://fun-day.appspot.com/downloadFile?path=/en/","../../en/")
	var picB=''
	var ids=xml.split("-");
	ids[1]=ids[1].replace("v2.xml","");
	
	pic=pic.replace("s.",".")
	picB=pic
  	
	var level='CEFR:';
	if($(en).find("lrc").attr("Level")!=''){
		if(parseInt($(en).find("lrc").attr("Level"))==1){
			level=level+"A1"
		}else if(parseInt($(en).find("lrc").attr("Level"))==2){
			level=level+"A2"
		}else if(parseInt($(en).find("lrc").attr("Level"))==3){
			level=level+"B1"
		}else if(parseInt($(en).find("lrc").attr("Level"))==4){
			level=level+"B2"
		}else if(parseInt($(en).find("lrc").attr("Level"))==5){
			level=level+"C1"
		}else if(parseInt($(en).find("lrc").attr("Level"))==6){
			level=level+"C2"
		}
	}else{
		level=level+" A1"
	}
	
	var ndate=left($(en).find("lrc").attr("Ndate"),4)+'/'+mid($(en).find("lrc").attr("Ndate"),4,2)+'/'+mid($(en).find("lrc").attr("Ndate"),6,2)  
	
	$('.title .subT,.share_title .title').html(en_title)
	$('.title .sub,.share_title .sub').html(ch_title)
	$('#class_f').html(Sample_classify+'｜'+E_Channel+'/'+C_Channel+level)
  
	if(Sample_classify=='專業通則'){
		$('.classification ul li:eq(0)').attr('class','activity')
	}else if(Sample_classify=='生活'){
		$('.classification ul li:eq(1)').attr('class','activity')
	}else if(Sample_classify=='社交'){
		$('.classification ul li:eq(2)').attr('class','activity')
	}else if(Sample_classify=='通識'){
		$('.classification ul li:eq(3)').attr('class','activity')	
	}else if(Sample_classify=='自我意識'){
		$('.classification ul li:eq(4)').attr('class','activity')	
	}else if(Sample_classify=='基礎養成'){	
		$('.classification ul li:eq(5)').attr('class','activity')								
	}
  
  
	$('.ArticleInfo2').html('文章序號:'+ids[1]+' Date:'+ndate)
	$('.vision-pic').attr('src',picB)
	document.documentElement.style.setProperty('--b-image', 'url('+picB+')');
	$('#reading-a,#explain-a').on('click',function(){
		//console.log($('input[id=explain-a]').prop("checked"))
		//$('#control-1').attr('data-value',$('input[name=Read-a]:checked').val())
		if($('input[id=explain-a]').prop("checked")){
			$('#control-1').attr('data-value',0)
		}else{
			$('#control-1').attr('data-value',1)
		}
		//console.log($('#control-1').attr('data-value'))
	})
	$('#reading-b,#explain-b').on('click',function(){
		//$('#control-1').attr('data-value',$('input[name=Read-b]:checked').val())
		if($('input[id=explain-b]').prop("checked")){
			$('#control-1').attr('data-value',0)
		}else{
			$('#control-1').attr('data-value',1)
		}		
	})

	Step1()

}


const replaceCode = function(target, Str){
	// v span
	Str = Str.replace(/<\/span>/g, '</span>&nbsp');
	Str = Str.replace(/;> /g, ';>');

	// v special code
	// Str = Str.replace(/’/g, "'");
	Str = Str.replace(/,<\/span>/g, '<\/span>,');
	Str = Str.replace(/\.<\/span>/g, '<\/span>.');
	Str = Str.replace(/!<\/span>/g, '<\/span>!');
	Str = Str.replace(/\?<\/span>/g, '<\/span>?');
	Str = Str.replace(/:<\/span>/g, '<\/span>:');
	Str = Str.replace(/”<\/span>/g, '<\/span>”');
	Str = Str.replace(/\)<\/span>/g, '<\/span>)');
	Str = Str.replace(/\]<\/span>/g, '<\/span>]');

	// v Hight Light
	// Str = Str.replace(/\'/g, '<font style="color: green; background: greenyellow;">\'</font>')
	
	// TRY
	// Str = Str.replace('DrDate("arent")', 'DrDate("aren’t")')
	
	target.html(Str);

	// Befor of 「“」
	$('.english span').each(function(){
		if( $(this).text().indexOf('“') >= 0 ){
			$(this).before('“');
			$(this).text( $(this).text().substr(1) );
		}
		if( $(this).text().indexOf('(') >= 0 ){
			$(this).before('(');
			$(this).text( $(this).text().substr(1) );
		}
		if( $(this).text().indexOf('[') >= 0 ){
			$(this).before('[');
			$(this).text( $(this).text().substr(1) );
		}
	});
}

function Step1(){
    var eu='',Str='';
	
	for (i=0;i<=$(en).find("lrclist:last").index();i++){
	
		if($(en).find("lrclist:eq("+i+")").index()!=-1){
			
			playo="playC("+i+");"			
			eu=eu.replace("**","");
			eu = eu + '<a name="' + i + '" id="' + i + '"></a><div class="english" id="t' + i + '" >' + spanWord($(en).find("lrclist:eq(" + i + ")").attr("content")) + ' <input type="button" onclick="' + playo + '" class="read_btn link"></div><div id="bubble' + i +'"  class="annotation" style="display:none;"></div><div class="Chinese" id="ct'+i+'" >'+$(tc).find("lrclist:eq("+i+")").attr("content")+'</div>';
			eu=eu.replace("**","");
		
		}else{
			break ;
		}
		
	}	

	Str=eu
	Str=Str.replace("**","");

	replaceCode( $('.article'), Str)
	$(function(){
		$('body').show();
	});

}




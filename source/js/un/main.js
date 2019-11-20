// JavaScript Document
// 取字串


function Block(id){
	if(id==1){
	 $('.article').show();
	 $('.article2').hide();
	}else{
	 $('.article2').show();
	 $('.article').hide();
	}
}

// a#1~n , 朗讀-英文
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

// div#ct1~n , 朗讀-中文
function ch_font2(str,clock){
	
	var x='',y='',playo='';
	y=clock;


	playo="play("+y+");"

	// add ** for splite to array
	// 不可省的判斷式；省略會導致 class 值 chinese / english 混亂
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
	var ids=xml.split("-");
	ids[1]=ids[1].replace("v2.xml","");
	
	pic=pic.replace("s.",".")
	pic="<img src='"+pic+"'  id='Pic' />" 
  	
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
	
	$('#title-a,#title-b').html(en_title)
	$('#subtitle-a,#subtitle-b').html(ch_title)
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
	$('.Article_pic').html(pic)
	Step1()
	Step2()
	Vocabulary()
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

// for 朗讀
function Step1(){
	var eu='',cu='';Str='';
	for (i=0;i<=$(en).find("lrclist:last").index();i++){
		eu=eu.replace('***','**')
		cu=cu.replace('***','**')		
		if($(en).find("lrclist:eq("+i+")").index()!=-1){	
			eu=eu+ch_font($(en).find("lrclist:eq("+i+")").attr("content"),i);		  
			cu=cu+ch_font2($(tc).find("lrclist:eq("+i+")").attr("content"),i);
		}else{
		  	break ;
		}
	}		
	 
	x=eu.split('**');
	y=cu.split('**');
	
	for(i=1;i<x.length;i++){
		ext=x[i]
		cxt=y[i].replace("<a name='"+y+"' id='"+y+"'></a>","")
		Str=Str+ext+cxt;
	}

	replaceCode($('.article') , Str);
	
}

// for 講解
function Step2(){
    var eu='',Str='';
	
	for (i=0;i<=$(en).find("lrclist:last").index();i++){
	
		if($(en).find("lrclist:eq("+i+")").index()!=-1){
			
			playo="playC("+i+");"			
			eu=eu.replace("**","");
			eu=eu+'<a name="'+i+'" id="N'+i+'"></a><div class="english" id="Nt'+i+'" >'+spanWord($(en).find("lrclist:eq("+i+")").attr("content"))+'<input type="button" onclick="'+playo+'" class="read_btn link"></div><div id="bubble'+i+'"  class="annotation" style="display:none;"></div><div class="Chinese" id="Nct'+i+'" >'+$(tc).find("lrclist:eq("+i+")").attr("content")+'</div>';
			eu=eu.replace("**","");
		
		}else{
			break ;
		}
		
	}	

	Str=eu
	Str=Str.replace("**","");


	
	replaceCode($('.article2') , Str);

}

function Vocabulary(){
	if($(en).find("wordslist:last").index()>0){
		eu='';
		for (i=0;i<=$(en).find("wordslist:last").index();i++){
	
			if($(en).find("wordslist:eq("+i+")").index()!=-1){	  
				var work=$(en).find("wordslist:eq("+i+")").attr("content").split(';');
				var words_sen=$(en).find("wordslist:eq("+i+")").attr("words_sen")
					
				
				if(words_sen!=undefined){
					words_sen=words_sen.split('||')
							
					if(words_sen[0].length>1){
						words_sen[0]=words_sen[0].replace("`","’")
			
				
						if(right(words_sen[0],1)==',')
							words_sen[0]=left(words_sen[0],words_sen[0].length-1)+'.'		
				
						if(right(words_sen[1],1)=='，')
							words_sen[1]=left(words_sen[1],words_sen[1].length-1)+'。'		
								
						//eu=eu+"<div class='Step1-WordTitle link' onClick=playSound('"+work[0]+"');return false;><span class='WordSound'></span><span class='WordBig'>"+work[0]+"</span>"+work[1]+"<br><span class='Wordsmall'>"+work[2]+"</span></div><p><div class='s-Word'>"+(words_sen[0])+"</div><div class='s-Word2'>"+words_sen[1]+"</div><br>";
					    eu=eu+'<span>'+work[0]+work[1]+'<br>'+work[2]+'</span>'+(words_sen[0])+'</span><br><div class="is-chinese" >'+words_sen[1]+'</div><p></p>'
					}else{
						//eu=eu+"<div class='Step1-WordTitle link' onClick=playSound('"+work[0]+"');return false;><span class='WordSound'></span>"+work[0]+work[1]+"<br>"+work[2]+"</div><br>";	   
						eu=eu+'<span>'+work[0]+work[1]+'<br>'+work[2]+'</span><p></p>'
					}
				
				}
				
			}
		
		}	
	  
		
		$('.translation_list').html(eu)
		$('body').show()
	}
}

// JavaScript Document
// 取字串


function SpeedBar(id){
    //console.log(id);
    $.cookie("MySetting_Speed", id, { path: '/', expires: 30 });
    //console.log("Speed:" + id);
}

function Block(id){
	if(id==1){
	 $('#Step1Mode1').show();
	 $('#Step1Mode2').hide();
	}else{
	 $('#Step1Mode2').show();
	 $('#Step1Mode1').hide();
	}
}



function ch_font(str,clock){
var x='',y='',playo='';
y=clock;

		   if(parseInt(edcheck)>parseInt(0)){
		     playo="playC("+y+");"
		   }else{
		     playo="VipClick();"
		   }
	
	
	str=spanWord((str))

	
  if(str.indexOf("**")!=-1){
   str=str.replace("**","");
   x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><span id='t"+y+"' onDblClick='_dictClose();' onclick='"+playo+"' class='Step1-contentEn link'>" +str+ "</span>");
  }else{
   x=str.replace(str,"<a name='"+y+"' id='"+y+"'></a><span id='t"+y+"' onDblClick='_dictClose();' onclick='"+playo+"' class='Step1-contentEn link'>" +str+ "</span>");
  }
return x;
}

function ch_font2(str,clock){
var x='',y='',playo='';
y=clock;

		   if(parseInt(edcheck)>parseInt(0)){
		     playo="play("+y+");"
		   }else{
		     playo="VipClick();"
		   }

if(str.indexOf("**")!=-1){
 str=str.replace("**","");
  x=str.replace(str,"**<span id='ct"+y+"' onDblClick=_dictClose();"+playo+" class='Step1-contentCh'><font class='tran_chinese'>" +str+ "</font></span>");
}else{
 x=str.replace(str,"<span id='ct"+y+"' onDblClick=_dictClose();"+playo+" class='Step1-contentCh'><font class='tran_chinese'>" +str+ "</font></span>");
}
return x;
}

function ch_fontTran(str,clock){
var x='',y='',playo='';
y=clock;

		   if(parseInt(edcheck)>parseInt(0)){
		     playo="play("+y+");"			 
		   }else{
		     playo="VipClick();"
		   }
	
	

  if(str.indexOf("**")!=-1){
   str=str.replace("**","");
   

   str=tranchang(str)

   x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><font id='t"+y+"' class='Step1-contentEn'>" +str+ "<span onclick='"+playo+"' class='WordSound2 link'></span></font>");
  }else{
 

   str=tranchang(str)

   x=str.replace(str,"<a name='"+y+"' id='"+y+"'></a><font id='t"+y+"'  class='Step1-contentEn'>" +str+ "<span onclick='"+playo+"' class='WordSound2 link'></span></font>");
	}

	//x=x+'<div onclick='+playo+' class="WordSound2 link"></div>'
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

function ButtonCheck(id){

  if(id=='Step1PlayIcon' || id=='Step1EnIcon' || id=='Step1ChIcon' ){
	 if($('#'+id).attr('data-value')=='0'){
	  $('#'+id).attr('data-value','1')
	 }else{
	  $('#'+id).attr('data-value','0')		 
	 }
  }

  if(id=='ArticleRead' || id=='TutorRead'){
	 if($('#ArticleRead').attr('class')=='Step1ENPlay Step1Button'){
	   $('#ArticleRead').attr('class','Step1ENPlay Step1ButtonClick');
	   $('#ArticleRead').attr('data-value','1')			 
	   $('#TutorRead').attr('class','Step1ENPlay Step1Button');
         $('#TutorRead').attr('data-value', '0')
         $.cookie("MySetting_Read", "ArticleRead", { path: '/', expires: 30 });
	 }else if($('#TutorRead').attr('class')=='Step1ENPlay Step1Button'){
	   $('#TutorRead').attr('class','Step1ENPlay Step1ButtonClick');
	   $('#TutorRead').attr('data-value','1')			 
	   $('#ArticleRead').attr('class','Step1ENPlay Step1Button');
         $('#ArticleRead').attr('data-value', '0')  
         $.cookie("MySetting_Read", "TutorRead", { path: '/', expires: 30 });
      }
      //console.log("Read:" + $.cookie("MySetting_Read"));
  }


  if(id=='ENArticle' || id=='CHArticle'){  
	 if($('#ENArticle').attr('class')=='Step1ENPlay Step1Button'){
	   $('#ENArticle').attr('class','Step1ENPlay Step1ButtonClick');
	   $('#ENArticle').attr('data-value','1')			 
	   $('#CHArticle').attr('class','Step1ENPlay Step1Button');
         $('#CHArticle').attr('data-value', '0')
         $.cookie("MySetting_Lan", "ENArticle", { path: '/', expires: 30 });
	 }else if($('#CHArticle').attr('class')=='Step1ENPlay Step1Button'){
	   $('#CHArticle').attr('class','Step1ENPlay Step1ButtonClick');
	   $('#CHArticle').attr('data-value','1')			 
	   $('#ENArticle').attr('class','Step1ENPlay Step1Button');
         $('#ENArticle').attr('data-value', '0')   
         $.cookie("MySetting_Lan", "CHArticle", { path: '/', expires: 30 });
      }
      
      //console.log("Lan:" + $.cookie("MySetting_Lan"));
  }
  
  Step1StateChang()
}

function Step1StateChang(){
		
	if($('#CHArticle').attr('data-value')=='1'){
	   $('.Step1-contentCh').show();
	   $('.Step1-contentChT').show();
/*	   $('.ArticleContent').attr('class','ArticleContent-1')
	   $('.ArticleContent-2').show();	
	   $('.ArticlePic').hide();
	   $('.ArticleTitle-2').hide();	  
	   $('.ArticleTitle-1').css('width','100%')*/
	   
	   if($('#Step1PlayIcon').attr('data-value')=='1'){	
		$('#Step1PlayIcon').attr('class','Step1Pause link');
		 $('#ToolBox1').hide()	
		 $('#ToolBox2').show()		
	   }else if($('#Step1PlayIcon').attr('data-value')=='0'){
		$('#Step1PlayIcon').attr('class','Step1Player link');	
		 $('#ToolBox2').hide()	
		 $('#ToolBox1').show()						 
	   }
	
	}else if($('#CHArticle').attr('data-value')=='0'){
		 $('.Step1-contentCh').hide();
		 $('.Step1-contentChT').hide();
		// $('.ArticleContent-2').hide();		   
		// $('.ArticleContent-1').attr('class','ArticleContent');
  
	   if($('#Step1PlayIcon').attr('data-value')=='1'){	
/*		 $('.ArticlePic').hide()
		 $('.ArticleTitle-1').css('width','80%')
		 $('.ArticleTitle-2').show()*/
		 $('#Step1PlayIcon').attr('class','Step1Pause link');
		 $('#ToolBox1').hide()	
		 $('#ToolBox2').show()		 
	   }else if($('#Step1PlayIcon').attr('data-value')=='0'){
/*		 $('.ArticleTitle-2').hide();	  
		 $('.ArticleTitle-1').css('width','100%')
		 $('.ArticlePic').show()	*/
		 $('#Step1PlayIcon').attr('class','Step1Player link');	
		 $('#ToolBox2').hide()	
		 $('#ToolBox1').show()			 		 
	   }
		 
	}
	



  	if($('#TutorRead').attr('data-value')=='1'){
	 Block(2)
	 $('.train_3').css('text-decoration','')
	 $('.HighlightBook').attr("data-value","0");
     $('.HighlightBook').attr("class","HighlightBookC link");
		 $('.train_2').attr("class","train_2");  	
 	  if(parseInt(edcheck)>parseInt(0))
      display(xmlindx,4)  
	}else{
	 Block(1)
		 $('.train_3').css('text-decoration','underline')
		 if(parseInt(edcheck)>parseInt(0))
		 display(xmlindx,1)  
	}

	   if($('#Step1PlayIcon').attr('data-value')=='1'){	
	     $('#Step1PlayIcon').on('click',function(){pausetime()}) 	   
	   }else if($('#Step1PlayIcon').attr('data-value')=='0'){
	     $('#Step1PlayIcon').on('click',function(){pauseplay()})			 		 
	   }	

}



function Step1(){
  var Str='',eu='',cu='',tempStr='';
  var tra1_v='False';tra2_v='False';tra3_v='False';tra4_v='False';
  
  playerinit()
  jquery_Record()
  
  
  var E_Channel=$(en).find("lrc").attr("Channel");
  var C_Channel=$(tc).find("lrc").attr("Channel"); 
  var en_title=$(en).find("lrc").attr("title").replace("`","'");
  var ch_title=$(tc).find("lrc").attr("title");
  var pic=$(en).find("lrc").attr("PIC").replace("http://fun-day.appspot.com/downloadFile?path=/en/","../../en/")
  var ids=xml.split("-");
  ids[1]=ids[1].replace("v2.xml","");
  
  pic=pic.replace("s.",".")
  pic="<img src='"+pic+"' width='80%' id='Pic' />" 

  
  var level='CEFR:',level_te='TOEIC :',level_pic1='',level_gep='GEPT :';
  if($(en).find("lrc").attr("Level")!=''){
	if(parseInt($(en).find("lrc").attr("Level"))==1){
	  level=level+"A1"
	  level_te=level_te+" 10-250分"
	  level_gep=level_gep+" /"
	}else if(parseInt($(en).find("lrc").attr("Level"))==2){
	  level=level+"A2"
	  level_te=level_te+" 255-400分"
	  level_gep=level_gep+" 初級"
	}else if(parseInt($(en).find("lrc").attr("Level"))==3){
	  level=level+"B1"
	  level_te=level_te+" 405-500分"
	  level_gep=level_gep+" 中級"
	}else if(parseInt($(en).find("lrc").attr("Level"))==4){
	  level=level+"B2"
	  level_te=level_te+" 505-700分"
	  level_gep=level_gep+" 中高級"
	}else if(parseInt($(en).find("lrc").attr("Level"))==5){
	  level=level+"C1"
	  level_te=level_te+" 705-850分"
	  level_gep=level_gep+" 高級"
	}else if(parseInt($(en).find("lrc").attr("Level"))==6){
	  level=level+"C2"
	  level_te=level_te+" 855-990分"
	  level_gep=level_gep+" 優級"
	}
  }else{
	 level=level+" A1"
	 level_te=level_te+" 10-250分"
	 level_gep=level_gep+" /"
  }
  
  var ndate=left($(en).find("lrc").attr("Ndate"),4)+'/'+mid($(en).find("lrc").attr("Ndate"),4,2)+'/'+mid($(en).find("lrc").attr("Ndate"),6,2)  
  
  Str='<div class="Step1ToolBlock">'
  Str=Str+'<div class="ArticleContent-1x" ><div class="Step1ToolBox1" ><div class="Step1ToolBox1DV1" ><div class="Step1Player link" id="Step1PlayIcon" data-value="0" ></div></div>'

    if ($.cookie("MySetting_Read") == "TutorRead")
        Str = Str + '<div id="ToolBox1"><div class="Step1ToolBox1DV2" ><div class="Step1ENPlay Step1Button" id="ArticleRead" data-value="0" >英文朗讀</div></div><div class="Step1ToolBox1DV3"><div class="Step1ENPlay Step1ButtonClick" id="TutorRead" data-value="1">老師講解</div></div></div>'
    else
        Str = Str + '<div id="ToolBox1"><div class="Step1ToolBox1DV2" ><div class="Step1ENPlay Step1ButtonClick" id="ArticleRead" data-value="1" >英文朗讀</div></div><div class="Step1ToolBox1DV3"><div class="Step1ENPlay Step1Button" id="TutorRead" data-value="0">老師講解</div></div></div>'  
    var DefaultSpeed = "1.0";
    if ($.cookie("MySetting_Speed") != null)
        DefaultSpeed = $.cookie("MySetting_Speed");
    Str = Str + '<div class="Step1ToolBox1DV2-2" id="ToolBox2"><div class="Step1Speed">播放速度</div><input type="range" id="Speed_range" min="0.5" max="1.5" value="' + DefaultSpeed + '" step="0.25" oninput="SpeedBar(this.value)" onchange="SpeedBar(this.value)"></div>'  

    if ($.cookie("MySetting_Lan") == "CHArticle")
        Str = Str + '</div><div class="Step1ToolBox2"><div class="Step1ToolBox1DV2"><div class="Step1ENPlay Step1Button" id="ENArticle" data-value="0">English</div></div><div class="Step1ToolBox1DV3"><div class="Step1ENPlay Step1ButtonClick" id="CHArticle" data-value="1">中英對照</div></div></div></div>'  
    else
        Str = Str + '</div><div class="Step1ToolBox2"><div class="Step1ToolBox1DV2"><div class="Step1ENPlay Step1ButtonClick" id="ENArticle" data-value="1">English</div></div><div class="Step1ToolBox1DV3"><div class="Step1ENPlay Step1Button" id="CHArticle" data-value="0">中英對照</div></div></div></div>'  
    
	if($.cookie("conn_chk")!='Fun91'){
		if(parseInt(Ispay)==parseInt(0) || parseInt(edcheck)<=parseInt(0)){
      Str=Str+'<div class="ArticleContent-2x" style="display: flex;	justify-content: center;flex-wrap: wrap;" ><div class="Step1Buy link" onclick=parent.location.href="../../subscription/">立即訂閱</div><div class="Step1Playlist link"  onclick="addPlaylist()" title="加入播放清單"></div><div class="Step1Bookmark link" onclick=booking() title="加入書籤"></div><div class="Step1Print link" onclick=printPg() title="列印"></div></div>'
		}else{
      Str=Str+'<div class="ArticleContent-2x" style="display: flex;	justify-content: center;flex-wrap: wrap;" ><div class="Step1Playlist link"  onclick="addPlaylist()" title="加入播放清單"></div><div class="Step1Bookmark link" onclick=booking() title="加入書籤"></div><div class="Step1Print link" onclick=printPg() title="列印"></div></div>'
		}
  }
	Str=Str+'</div>'
 
  Str=Str+'<div class="Step1Block" >'
  

  //Str=Str+'<div class="ArticleInfo"><div class="ArticleInfo-1">█ &nbsp;&nbsp;'+E_Channel+'/'+C_Channel+'&nbsp;&nbsp;'+level+'&nbsp;&nbsp;文章序號:'+ids[1]+' &nbsp;&nbsp;Date:'+ndate+' </div></div><br>'
  Str=Str+'<div class="ArticleTitle"><div class="ArticleTitle-1"><div class="ArticleInfo"><div class="ArticleInfo-1">█ &nbsp;&nbsp;'+E_Channel+'/'+C_Channel+'&nbsp;&nbsp;'+level+'&nbsp;&nbsp;文章序號:'+ids[1]+' &nbsp;&nbsp;Date:'+ndate+' </div></div>'+spanWordTitle(en_title)+'<br><span class="Step1-contentChT" id="ChTitle-1">'+ch_title+'</span> <div class="HighlightBookC link" data-value="0" title="重點描述"></div></div> <div class="ArticleTitle-2">'+pic+'</div></div>'  

  Str=Str+'<div class="ArticleContent-1" id="Step1Mode1">'   

  for (i=0;i<=$(en).find("lrclist:last").index();i++){
	  eu=eu.replace('***','**')
	  cu=cu.replace('***','**')	
	  
	  if($(en).find("lrclist:eq("+i+")").index()!=-1){	
 
 	  trx=$(en).find("lrclist:eq("+i+")").attr("train")
	  
      if((trx!='' && trx!=undefined)){	   
	      eu=eu+ch_fontTran(trx,i);	 
	    }else{
		    eu=eu+ch_font($(en).find("lrclist:eq("+i+")").attr("content"),i);		
	   }
 
	    cu=cu+ch_font2($(tc).find("lrclist:eq("+i+")").attr("content"),i);
	  }else{
		break ;
	  }
 
 
    if(trx!=undefined & trx!=''){
	  if(trx.indexOf("[r1]")!=-1){
		  tra1_v='True'
		  tra2_v='True'
	  }
	 if(trx.indexOf("[r2]")!=-1){
		  tra4_v='True'
	  }	
	  if(trx.indexOf("[r3]")!=-1){
		  tra3_v='True'
	  }	
   } 
	  
	}		
	
   
	x=eu.split('**');
	y=cu.split('**');
		
	
	for(i=1;i<x.length;i++){
		ext=x[i]
		cxt=y[i].replace("<a name='"+y+"' id='"+y+"'></a>","")	  	  
		tempStr=tempStr+ext+'<p>'+cxt+'<p>';  	  
	}
	
  
  Str=Str+tempStr+'</div>'
  
  Str=Str+'<div class="ArticleContent-1" id="Step1Mode2" style="display:none;">' 
  eu='';
  cu='';
  
  
   for (i=0;i<=$(en).find("lrclist:last").index();i++){
	
	  if($(en).find("lrclist:eq("+i+")").index()!=-1){
		  
	   playo="playC("+i+");"
	  
		eu=eu.replace("**","");
        eu=eu+'<a name="'+i+'" id="N'+i+'"></a><div class="Step1-contentEn link" id="Nt'+i+'" >'+spanWord($(en).find("lrclist:eq("+i+")").attr("content"))+'<span onclick="'+playo+'" class="WordSound2 link"></span></div><div class="Step1-contentCh" id="Nct'+i+'" >'+$(tc).find("lrclist:eq("+i+")").attr("content")+'</div><div id="bubble'+i+'"  class="bubble"></div><p>';
        eu=eu.replace("**","");
		
	  }else{
		break ;
	  }
	  
	}	
  Str=Str+eu+cu
  
  Str=Str+'</div>'
  
  Str=Str+'<div class="ArticleContent-2">'  
   
  Str=Str+'<div class="Vocabulary"  style="font-weight:bold;">Vocabulary</div><br>'
  
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
					   
		  eu=eu+"<div class='Step1-WordTitle link' onClick=playSound('"+work[0]+"');return false;><span class='WordSound'></span><span class='WordBig'>"+work[0]+"</span>"+work[1]+"<br><span class='Wordsmall'>"+work[2]+"</span></div><p><div class='s-Word'>"+spanWordTitle(words_sen[0])+"</div><div class='s-Word2'>"+words_sen[1]+"</div><br>";
		   }else{
		  eu=eu+"<div class='Step1-WordTitle link' onClick=playSound('"+work[0]+"');return false;><span class='WordSound'></span>"+work[0]+work[1]+"<br>"+work[2]+"</div><br>";	   
		   }
		   
		 }else{		   
		   //eu=eu+"<span STYLE='cursor:pointer;font-weight:600;width:100%;'  onClick=playSound('"+work[0]+"');return false; ><span class='Step1-WordTitle' >"+$(en).find("wordslist:eq("+i+")").attr("content")+"</span><img src='images/Sound.png' style='vertical-align:middle;' border='0' ></span><br>";	   
		 }
		 
	  }
	
	}	
  
   Str=Str+eu
  }
  
   Str=Str+'<div class="Vocabulary"  style="font-weight:bold;">Phrase</div><br>'
 if($(en).find('phrase').text().length>5){
	 
   if($(en).find('phrase').text().indexOf("@@@@")==-1)  //不重覆判斷
   $(en).find('phrase > br').replaceWith("@@@@");
   
		var regExphra = /[@@@@][\s][@@@@]/g
		var phra=$(en).find('phrase').text().replace(regExphra,"<br>");
		//var phra=$(en).find('phrase').text()
		phra = phra.replace(/@@@@@@@@*/g,"||<br>||")		
		phra = phra.replace(/@@@@*/g,"||")

		PHRcontent = phra.split('||<br>||')
		
		for(i=0;i<PHRcontent.length;i++){
		
			var pContent = new Array()
			pContent = PHRcontent[i].split("||")
			
			var tmp = new Array()
			tmp = pContent[0].split(/[^a-z,^A-Z,^\s]/g)
			pContent[2] = pContent[2].replace(tmp[0],'<span class="s-Word">'+tmp[0]+'</span>')
			
			var itemPhrase = '<div class="Step1-WordTitle" >'+pContent[0]+'</div><br />'
			
			var meaningPhrase = '<div class="s-Word2">'+pContent[1]+'</div><br />'
			
			var EnPhrase ='<div class="s-Word2">'+pContent[2]+'</div>'
			var TpPhrase = '<div class="s-Word2">'+pContent[3]+'<p></div>'
							
			Str=Str+itemPhrase+meaningPhrase+EnPhrase+TpPhrase	
			
		}		

 }


	
  Str=Str+'</div>'	
	
  Str=Str+'</div>'
  
    
 $('#Step1').html(Str)
 
 if(tra1_v=='True'){
	 $('.HighlightBookC').show();
 }else{
	 $('.HighlightBookC').hide();
 }
 
 
$('.HighlightBookC').on('click',function(){tran_Click()}) 
 
$('.Step1ENPlay,#Step1PlayIcon,.Step1ToolBox1DV4-1').on('click',function(){
  ButtonCheck(this.id)
})

 $('#Step1PlayIcon').on('click',function(){pauseplay()})

    InitFromCookie();
}

function tran_Click(){
 if($('.HighlightBookC').attr("data-value")=='0'){
  $('.HighlightBookC').attr("data-value","1");
   $('.HighlightBookC').attr("class","HighlightBook link"); 
   $('.train_2').attr("class","train_2 train_2Highline");
 }else if($('.HighlightBook').attr("data-value")=='1'){
  $('.HighlightBook').attr("data-value","0");
   $('.HighlightBook').attr("class","HighlightBookC link");
   $('.train_2').attr("class","train_2"); 	 
 }
 
 
}

function InitFromCookie() {
   // console.log("***" + $.cookie("MySetting_Read") + "***");
   // console.log("***" + $.cookie("MySetting_Lan") + "***");
   // console.log("***" + $.cookie("MySetting_Speed") + "***");

    Step1StateChang();
    if ($.cookie("MySetting_Speed") != null) {
        $("#Speed_range").val($.cookie("MySetting_Speed"));
        SpeedBar($.cookie("MySetting_Speed"));
    }
}
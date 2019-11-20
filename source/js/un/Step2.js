// JavaScript Document
// 取字串
var word_ID=0;
function LowerCase(st){ 
return st.toLowerCase(); 
}

function deleWord(id){
 $('#tr_'+id).remove();
}

function deleSentences(id){
 $('#Sstr_'+id).remove();
}


function word_get(wd,id){
	var icount=99;

	$("#Wordlist").prepend('<table width="90%" align="center" cellpadding="0" cellspacing="0" id="tr_'+word_ID+'" border=0><tr ><td align="left"><input class="QuotesWordEn" type="text" value="'+wd+'" name="Enword_'+word_ID+'" id="Enword_'+word_ID+'"  size="15" /></td><td><a href="#" onclick=deleWord('+word_ID+')><img src="../../newmylessonpage/images/learning_btn/x.png" border="0"  /></a></td></tr><tr><td  align="left"><input type="text" name="Chword_'+word_ID+'" id="Chword_'+word_ID+'" class="QuotesWordCh" size="15" placeholder="輸入中文解釋" onBlur=goP_word('+xmlindx+','+word_ID+',"I","0") /></td><td></td></tr></table>');
	word_ID++;
	//goP_word(xmlindx,id,"I","0")
}

function Sentences_get(wd){
	var icount=99;
    var wdd=$(en).find("lrclist:eq("+wd+")").attr("content");
	
	wdd=wdd.replace('***','**');
	wdd=wdd.replace('**','');
	
	$("#Sentenceslist").prepend('<table width="90%" align="center" cellpadding="0" cellspacing="0" id="Sstr_'+icount+'" border=0><tr ><td align="left"><div class="QuotesWordEn"  id="EnSentences_'+icount+'" >'+wdd+'</div></td><td><a href="#" onclick=deleSentences('+icount+')><img src="../../newmylessonpage/images/learning_btn/x.png" border="0"  /></a></td></tr><tr><td  align="left"><textarea  id="ChSentences_'+icount+'" class="QuotesWordCh" /></textarea></td><td><a href="#" onclick=deleSentences('+icount+')><img src="../../newmylessonpage/images/learning_btn/x.png" border="0"  /></a></td></tr></table>');
}	

function Sentences_get2(){

	$.ajax({
		   type:"POST",
		   url:"Personal_Sentences.asp?xml="+xmlindx,
		   //data: $("#searchForm").serialize(),
		   dataType:"html",
		   error: function(){
			   //alert('P')
			   },		   
		   success:function(data){
		    if(data!='')	   
	        $("body").append(data);
			   
			   }
			   
		   });		 

 }
 
 function word_get2(){
		$.ajax({
		   type:"POST",
		   url:"Word.asp?xml="+xmlindx,
		   //data: $("#searchForm").serialize(),
		   dataType:"html",
		   error: function(){
			   //alert(4)
			   },		   
		   success:function(data){
		    if(data!='')	   
	        $("#Wordlist").html(data);
			   
			   }
			   
		   });		
}

function goP_sentences(xml,en,tc,ix){
	$.ajax({
		   type:"POST",
		   url:"Personal_Sentences_response.asp?tg=M&xml="+xml+"&en="+en+"&tc="+tc+"&clock="+clock_num0[ix],
		   //data: $("#searchForm").serialize(),
		   data: {
				  note: escape($('#ans_info'+ix).val()),
				  orders: ix,
				  },
		   dataType:"html",
		   error: function(){
			   },
		   success:function(data){
			   //$("#search").html("");
			   //alert(2)
			  // alert(clock_num0[ix])
			   Sentences_get2();
			   }
			   
		   });		 

 }
 
function goP_sentencesU(xml,en,tc,ix){

	$.ajax({
		   type:"POST",
		   url:"Personal_Sentences_response.asp?tg=M&xml="+xml+"&en="+en+"&tc="+tc+"&clock="+clock_num[ix],
		   //data: $("#searchForm").serialize(),
		   data: {
				  note: escape($('#Uans_info'+ix).val()),
				  },
		   dataType:"html",
		   error: function(){
			   alert(1)
			   },
		   success:function(data){
			   //$("#search").html("");
			   Sentences_get2();
			   }
			   
		   });		 

 }
  
 
 function goP_word(xml,ix,tg,ods){
   var en=$('#Enword_'+ix).val();
   var tc=$('#Chword_'+ix).val();
   
    if(tc.length>0)
	$.ajax({
		   type:"POST",
		   url:"Word_response.asp?tg="+tg+"&xml="+xml+"&ix="+ix+"&Enword="+en+"&Chword="+tc+"&ods="+ods,
		   //data: $("#searchForm").serialize(),
		   dataType:"html",
		   error: function(){
			   alert(1)
			   },
		   success:function(data){
			   //$("#search").html("");
			    //console.log("Word_response.asp?tg="+tg+"&xml="+xml+"&ix="+ix+"&Enword="+en+"&Chword="+tc+"&ods="+ods)
			   //word_get2();
			   }
			   
		   });		 

 }
 
 function delegoP_Sentences(xml,ods){

 	$.ajax({
		   type:"POST",
		   url:"Personal_Sentences_response.asp?tg=D&xml="+xml,
		   //data: $("#searchForm").serialize(),
		   data: {
				  orders: ods,
				  },
		   dataType:"html",
		   error: function(){
			   alert(1)
			   },
		   success:function(data){
			   //$("#search").html("");
			   //Step2Chang('Heart',ods);
			   //console.log("Personal_Sentences_response.asp?tg=D&xml="+xml)
			   $('#ans_info'+ods+',.Step2Submit').hide();
			   $('#ans_info'+ods).val('');
			   $('#ans_infoDV'+ods).html('');
			   $('#ans_infoDV'+ods).show();
			   $('#ActivateHeart'+ods).attr('data-value','0');
			   }
			   
		   });		
 
}

 function delegoP_Words(id,ods){

 	$.ajax({
		   type:"POST",
		   url:"Word_response.asp?tg=D&xml="+id+"&ods="+ods,
		   //data: $("#searchForm").serialize(),
		   dataType:"html",
		   error: function(){
			   alert(1)
			   },
		   success:function(data){
			   //$("#search").html("");
			   word_get2();
			   }
			   
		   });		
 
}

function Step2(){
	var eu='';
  Str='<div class="Step2Left" >';

  Str=Str+'<div class="Step2Main">';
  
  Str=Str+'<div class="EXBlock"" id="Step2Title" >抄寫練習</div>'
  Str=Str+'<div class="EXSlogn"  style="width: 90%;" id="Step2Slogn">搭配FUNDAY精心設計的筆記本，逐句播放音檔並逐句抄寫文章，同時可將不懂的單字與佳片挑選出來，強化學習記憶。</div>'
  
   for (i=0;i<=$(en).find("lrclist:last").index();i++){

    if(parseInt(i)!=parseInt($(en).find("lrclist:last").index())){
	eu=eu+'<div style="width:100%;height:'+(Hem*2)+'px;float:left;"><a name=Tt'+i+' id=Tt'+i+'></a>'  ;
	}else{
	eu=eu+'<div style="width:100%;height:'+(Hem+100)+'px;float:left;"><a name=Tt'+i+' id=Tt'+i+'></a>'  ;	
	}
		  if($(en).find("lrclist:eq("+i+")").index()==0){
			  eu=eu+'<div class="svg55" >' ;
		  }else{
			  eu=eu+'<div class="svg55" >';
		  }
	  
	if($(en).find("lrclist:eq("+i+")").index()!=-1){
	  eu=eu.replace('***','**');
	  eu=eu.replace('**','');
	  
	   	   if(parseInt(edcheck)>parseInt(0)){
		     playo="play_vo("+i+")"
			 playo2="play_vo("+parseInt(i+1)+")"
		   }else{
		     playo="VipClick();"
			 playo2="VipClick();"
		   }
	  
             P_sentences='';
			 
      if($(tc).find("lrclist:eq("+i+")").attr("content").indexOf("對話範例")==-1 && $.cookie("conn_chk")!='Fun91' && $.cookie("conn_chk")!='presale_P' && parseInt(i)!=parseInt($(en).find("lrclist:last").index()) ){
	   P_sentences="<span  class='link ArticleP3' onClick="+playo2+";scrol("+parseInt(i+1)+");return false;><img id='PlayNext"+i+"' class='PlayNext' src='images/next.png' title='下一句'  border='0' ></span>";
	  }else{
	   P_sentences="";   
	  }
	  
	  flashstr="";


// if($(en).find("lrclist:eq("+i+")").attr("train").indexOf("[r2]")!=-1)
 // tra4_v='True'
  

// if(tra4_v=='True'){
//  trx=$(en).find("lrclist:eq("+i+")").attr("train")
//  spx=tranchang4(trx)
// }else{
  trx=$(en).find("lrclist:eq("+i+")").attr("content");
  trx=trx.replace('***','**');
  trx=trx.replace('**','');
  spx=spanWord2(trx);
// }

      //eu=eu+'<div style="position:absolute;margin-top:-60px;">'+flashstr+'</div><p>';

	  eu=eu+"<div style='position:relative;text-align:center;'><span  class='ArticleP3 ArticleP3En link' id='Step2t"+i+"' >"+spx.replace('**','')+"</span>";				
	  eu=eu+"<p><font id='Tct"+i+"' class='ArticleP3'>"+$(tc).find("lrclist:eq("+i+")").attr("content").replace('**','')+"</font>"; 
	  
	  if($(en).find("lrclist:eq("+i+")").index()!=0){
      
	  eu=eu+'<div style="position:relative;width: calc(70% + 20px);text-align:center;overflow:hidden;margin: 0 auto;" >'; 
     
      	  
	 eu=eu+'<table width="50%" align="center" cellpadding="0" cellspacing="0" border="0" class="TDtable" >';
	 eu=eu+'<tr><td align="center" width="45%" class="TDSpeaker"><span class="RecordSpeakerTitle">原音播放</span></td><td width="10%" class="TDplayerLine"></td><td align="center" width="45%" class="TDplayer"><span class="Step2playerTitle">錄音</span></td></tr>';
	 eu=eu+'<tr height="40px;"><td align="center"><div id="Ste2Play'+i+'" class="ST2Player link" onClick="'+playo+';return false;" title="原文播放"></div><div id="Ste2Pause'+i+'" class="ST2Pause link" onClick="pausetime();return false;" title="播放暫停"></div><div id="Ste2Play2'+i+'" class="ST2Player2 link" onClick="pauseplay2();return false;" title="原文播放"></div><div  class="ST2Repet link" style="margin-left:10px;" onclick="StepRepet()" data-value="0" title="反覆播放"></div></td>';
	 
	 eu=eu+'<td align="center" class="TDplayerLine">|</td>';
	 
	 eu=eu+'<td class="TDplayer2"><div id="Ste2ReSpeaker'+i+'" class="RecordSpeaker link" title="錄音" onclick="recordNow();"></div><div id="Ste2RecordStop'+i+'" class="RecordStop link" title="錄音中" onclick="recordStop();"></div><div id="Ste2RePlay'+i+'" class="RecordPlay link" title="錄音播放" onclick="recordPlay();"></div></td></tr>';
	 
	 eu=eu+'</table>';	  
	  
	  eu=eu+'</div>';
	  
	  eu=eu+'<div style="position:relative;text-align:center;overflow:hidden; margin-top:10px;">' ;
	  eu=eu+'<div class="AddQuote link" id="ActivateHeart'+i+'" data-value="0" onclick=Step2Chang("Heart",'+i+')    title="將學到的重點筆記起來存到佳句收錄" ></div>';
	  eu=eu+'</div>';
	  
	  eu=eu+'<textarea id="ans_info'+i+'" name="ans_info'+i+'" class="ans_textarea"  onkeyup="autogrow('+i+')" ></textarea> <div class="Step2Submit link"    id="ans_infodelete'+i+'" onclick=delegoP_Sentences("'+xmlindx+'",'+i+');>刪除</div> <div class="Step2Submit link" id="ans_infoSubmit'+i+'" onclick=goP_sentences("'+xmlindx+'","'+escape($(en).find("lrclist:eq("+i+")").attr("content"))+'","'+escape($(tc).find("lrclist:eq("+i+")").attr("content"))+'",'+i+')>儲存</div> '; 
	  eu=eu+'<div id="ans_infoDV'+i+'" name="ans_infoDV'+i+'" class="ans_textareaDV"  ></div>';  	   		  
	  
	  eu=eu+'<div class="BulbDV" id="BulbDV'+i+'"><textarea name="skey'+i+'" id="skey'+i+'" class="ans_textarea2"  onkeyup="autogrow2('+i+')" ></textarea><input type="hidden" name="skey2'+i+'" id="skey2'+i+'" value="'+trx+'"> <div class="Step2Submit2 link" id="Step2Submit2'+i+'" onclick="schk('+i+')">送出</div></div>';  	
	  }
        
	  eu=eu+'</div>';
	  eu=eu.replace('***','**');
	  eu=eu.replace('**','');
	
	}else{
	  break ;
	}
	
	eu=eu+'</div>';	
    
	if($(en).find("lrclist:eq("+i+")").index()==0){
      eu=eu+'<div style="float:left;position:absolute;position:relative;width:100%;height:100px;top:5%;margin-top:5%;overflow:hidden;" onclick="'+playo2+'"><div class="NextEX link" >開始</div></div>';			
	}else if(parseInt(i)!=parseInt($(en).find("lrclist:last").index())){
      eu=eu+'<div style="float:left;position:absolute;position:relative;width:100%;height:100px;top:5%;margin-top:5%;overflow:hidden;" onclick="'+playo2+'"><div class="NextEX link" >下一句</div><div class="Arrow_icon2 Rota270 link"></div></div>';	
	}

	eu=eu+'</div>';
  }		
 
  
  Str=Str+eu+'</div></div>';
  
  
  Str=Str+'<div class="Step2Right" >';
  //console.log($.cookie("conn_chk"))
  if($.cookie("conn_chk")!='Fun91'){
  Str=Str+'<div class="Step2RightDV2X" ><div class="Step1Playlist link" onclick=addPlaylist() title="加入播放清單"></div><div class="Step1Bookmark link" onclick=booking() title="加入書籤"></div><div class="Step1Print link" onclick=printPg() title="列印"></div></div>';
  } 
  Str=Str+'<div class="Step2RightDV"><div class="Step2RightDV_Title">單字收錄</div><div class="Step2RightDV_Main" id="Wordlist"><div class="Step2RightDV_Add">雙擊單字以收錄</div></div></div>';
 // Str=Str+'<div class="Step2RightDV"><div class="Step2RightDV_Title">佳句收錄</div><div class="Step2RightDV_Main" id="Sentenceslist"><div class="Step2RightDV_Add">佳句將會收錄於此</div></div></div>'
  
  Str=Str+'</div>';
  $('#Step2').html(Str);



  $('.Step2D').on('click',function(){
	  if($('#repeat_temp').attr('data-value')!='0'){
	    $('#repeat_temp').attr('data-value',parseInt($('#repeat_temp').attr('data-value'))-1);
		$('#repeat_temp').text($('#repeat_temp').attr('data-value'));
		$('#repeat').val($('#repeat_temp').attr('data-value'));
	  }
   }) 	
  $('.Step2U').on('click',function(){
	  if($('#repeat_temp').attr('data-value')!='9'){
	   $('#repeat_temp').attr('data-value',parseInt($('#repeat_temp').attr('data-value'))+1);
	   $('#repeat_temp').text($('#repeat_temp').attr('data-value'));
	   $('#repeat').val($('#repeat_temp').attr('data-value'));
	  }
   }) 		
   
   
   word_get2();
   Sentences_get2();
   $('#repeat').val('1');
}

function StepRepet(){
	if($('.ST2Repet').attr('data-value')=='0'){
	 $('.ST2Repet').attr('data-value','1');
	 $('.ST2Repet').css('opacity',1)
	$('#repeat').val(99);
	}else{
	 $('.ST2Repet').attr('data-value','0');
	 $('.ST2Repet').css('opacity',0.5)
	$('#repeat').val(0);		
	}
}



function Step2Chang(type,id){
     // $('.Step2Button').attr('data-value','0');
     // $('.Step2Button').attr('class','Step2Button link');
	  
	  if(type=='Heart' && $('#ActivateHeart'+id).attr('data-value')=='0'){
	   $('.ArticleP3').show();	  
	   $('#ActivateHeart'+id).attr('data-value','1');
	   $('#ActivateHeart'+id).attr('class','AddQuote3 link');
	   $('#Bulb'+id).attr('data-value','0');
	   $('#ans_info'+id).show();
	   $('#ans_infoDV'+id).hide();	
	   $('#ans_infoSubmit'+id).show();
	   $('#ans_infodelete'+id).show();	   
	   $('#skey'+id).hide();		
	   $('.BulbDV').hide();      
	   //$('.Step2Right').css('width','24%')
	  // $('.Step2Left').css('width','75%') 
	  autogrow(id);		   		   
	  }else if(type=='Heart' && $('#ActivateHeart'+id).attr('data-value')=='1'){
	   $('.ArticleP3').show();	  
	   $('#ActivateHeart'+id).attr('data-value','0');
	   $('#ActivateHeart'+id).attr('class','AddQuote link');
	   $('#Bulb'+id).attr('data-value','0');
	   $('#ans_infoDV'+id).show();
	   $('#ans_info'+id).hide();
	   $('#ans_infoSubmit'+id).hide(); 
	   $('#ans_infodelete'+id).hide();    	
	   //$('.Step2Right').css('width','24%')
	   //$('.Step2Left').css('width','75%') 	   	   		  
	  }
	  
}

function schk2(id){
	$('#skey'+id).val('');
	 $('#skey'+id).css('color','#626262');
	 $('#Step2Submit2'+id).remove();
	 $('#BulbDV'+id).append('<div class="Step2Submit2 link" id="Step2Submit2'+id+'" onclick="schk('+id+')">送出</div>')	
}

function clearString(s){ 
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;|{}【】‘；：”“'。，、？’]") 
    var rs = ""; 
    for (var i = 0; i < s.length; i++) { 
       rs = rs+s.substr(i, 1).replace(pattern, ''); 
    } 
    return rs;  
}



function spanAnsWord( strText1,strText2 ) 
{ 
 var regEx = /\b/g; 
 var chstr='';
 var chstr2='';
 strText1=escape(strText1);
 strText1=strText1.split("%20");
 strText2=escape(strText2);
 strText2=strText2.split("%20");
  
  for(w=0;w<strText2.length;w++){
    chstr2=chstr2+Wrod_eq(strText1[w],strText2[w])
  }

  //alert(chstr2)
 return chstr2; 
	
} 

function Wrod_eq(s1,s2){
  var eq=''
  var aa1,aa2
  
	aa1=clearString(unescape(s1))
	aa2=clearString(unescape(s2))	

 if(LowerCase(aa1)==LowerCase(aa2)){  
   eq='<span>'+unescape(s2)+'</span>'
 }else{
   eq='<font style="color:red;">'+unescape(s2)+'</font>'	 
 }
  return eq
}

function schk(id){
	
	var ans1='',ans2='',ans3='',temp='';
	var Tans1=document.getElementById('skey2'+id).value,Tans2=document.getElementById('skey'+id).value;
	var messs='';
	var regEx= /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\’|\,|\<|\.|\>|\/|\?]/g; 
	var regEx2= / /g;
	//var regEx3=/\*\*/g;
	//var regEx4=/\*/g;


/*    Tans1=Tans1.split(" ");
    Tans2=Tans2.split(" ");
	
	for(i=0;i<Tans1.length;i++){
	 ans1=ans1+Tans1[i]+'*';
	}
		
	for(i=0;i<Tans2.length;i++){
	 ans2=ans2+Tans2[i]+'*';
	}

    ans1=ans1.replace(regEx3, ""); 
	ans2=ans2.replace(regEx3, ""); 

    ans1=ans1.replace(regEx4, " "); 
	ans2=ans2.replace(regEx4, " "); 
	*/
	
	ans1=Tans1;
	ans2=Tans2;
				
    ans1=ans1.replace(regEx2, ""); 
	ans2=ans2.replace(regEx2, ""); 
   
	if(ans1.indexOf(":")>0){
	 temp=ans1.split(':')
	 ans3=temp[1];
	}else{
	 ans3=ans1;
	}

    ans1=ans1.replace(regEx, ""); 
	ans2=ans2.replace(regEx, ""); 
	ans3=ans3.replace(regEx, ""); 
		
	//console.log(LowerCase(ans1)) 
    //console.log(LowerCase(ans2)) 
    //console.log(LowerCase(ans3)) 
		
	if( (LowerCase(ans1)==LowerCase(ans2)) ||  (LowerCase(ans3)==LowerCase(ans2)) ){
	 $('#Step2t'+id).show();	 
	 $('#skey'+id).css('color','#67d3cf');
	 $('#Step2Submit2'+id).hide();
	 $('#BulbDV'+id).append('<div class="Pass"></div>')	 
	}else{
     messs='錯誤。請仔細聆聽，再試一次。';
	 
     csscody.error(messs,{ onComplete: function () {}}); 
	 $('#skey'+id).html(spanAnsWord(document.getElementById('skey2'+id).value,document.getElementById('skey'+id).value))
     //$('#skey'+id).css('color','#a02e32');
	 $('#Step2Submit2'+id).remove();
	 $('#BulbDV'+id).append('<div class="Step2Submit2 link" id="Step2Submit2'+id+'" onclick="schk2('+id+')">重來</div>')	 
	 
	 //messs='<div style="padding:15px 15px 15px 15px;font-size:1.5em;font-family:微軟正黑體;text-align:center;">錯誤,請再試一次</div>';

	}

pausetime();

   $('.ST2Player').show();
   $('.ST2Pause,.ST2Player2').hide();

}
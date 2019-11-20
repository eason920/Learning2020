// JavaScript Document
// 取字串

function ABC_chang(num){
if(num==1){
num='A'
}else if(num==2){
num='B'
}else if(num==3){
num='C'
}else if(num==4){
num='D'
}
return num
}



function Ans_check(ans,ans2){
var check
if(parseInt(ans)==parseInt(ans2)){
check="checked"
}else{
check=""
}
return check

}

function blank(ans){
  var a=ans.split(";");
  var a1=ans;
  var a2='';
  var a3='';
  var blank='',end1='';

  if(left(a2,1)==" "){
	blank="　";

	if(parseInt(a2.length)-1>=1){
	  for(var q=1;q<=parseInt(a2.length)-1;q++)
		blank=blank+"＊";
	}else{
	  for(var q=1;q>=parseInt(a2.length)-1;q--)
		blank=blank+"＊";
	}


	blank=a1.replace(a2,blank+" <INPUT name='EX2answer'   size='15'>");

  }

  if(right(a2,1)==" "){
	end1="　";
  
	if(parseInt(a2.length)-1>=1){
	  for(var q=1;q<=parseInt(a2.length)-1;q++)
		blank=blank+"＊";
	}else{
	  for(var q=1;q>=parseInt(a2.length)-1;q--)
	  blank=blank+"＊";
	}
  
  
	blank=al.replace(a2,blank+end1);
  
  }

  if(a1.indexOf(" ")!=-1){	
  
	if(a3=="" && a2!=""){
	}else{
	  blank=blank+"("+a3+")";
	}
		  
  }else{
  
	for(var q=2;q<=parseInt(a1.length)-1;q++){
	  blank=blank+"＊";
	}
  
  
	blank=left(a1,1) + blank + right(a1,1);
  }
  return blank;


}

function blank_cloze(j,ans){
  var a=ans.split(";");
  var a1=a[0];
  var a2=a[1];
  var a3=a[2];
  var blank='',end1='';
  
  
	if(left(a2,1)==" "){
	  blank="　";
	  
	  if(parseInt(a2.length)-1>=1){
		for(var q=1;q<=parseInt(a2.length)-1;q++)
		  blank=blank+"＊";
	  }else{
		for(var q=1;q>=parseInt(a2.length)-1;q--)
		  blank=blank+"＊";
	  }
	
	
	  blank=a1.replace(a2,"<font  id='ex_"+j+"' ><span style='text-decoration:underline'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</span></font><span  id="exj_'+j+'"></span>');
	
	}
	
	if(right(a2,1)==" "){
	  end1="　";
	  
		if(parseInt(a2.length)-1>=1){
		  for(var q=1;q<=parseInt(a2.length)-1;q++)
			blank=blank+"＊";
		}else{
		  for(var q=1;q>=parseInt(a2.length)-1;q--)
			blank=blank+"＊";
		}
	  
	  
	  blank=a1.replace(a2,"<font   id='ex_"+j+"' ><span style='text-decoration:underline'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</span></font><span  id="exj_'+j+'"></span>');
	
	}
	
	  if(a1.indexOf(" ")!=-1){	
	  
		if(a3=="" && a2!=""){
		}else{
		 blank="<font  id='ex_"+j+"' ><span style='text-decoration:underline'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</span></font><span  id="exj_'+j+'"></span>';
		}
			  
	  }else{
	  
		for(var q=2;q<=parseInt(a1.length)-1;q++)
		  blank=blank+"＊";
			  
		blank="<font id='ex_"+j+"' ><span style='text-decoration:underline'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</span></font><span  id="exj_'+j+'"></span>' ;
	  }
	  

	return blank;
}

function blank_cloze2(ans){
var a=ans.split(";");
var a1=a[0];
var a2=a[1];
var a3=a[2];
var blank2='',end1='';


if(left(a2,1)==" "){
blank2="　";

if(parseInt(a2.length)-1>=1){
for(var q=1;q<=parseInt(a2.length)-1;q++)
blank2=blank2+"＊";
}else{
for(var q=1;q>=parseInt(a2.length)-1;q--)
blank2=blank2+"＊";
}


blank2=a2;

}

if(right(a2,1)==" "){
end1="　";

if(parseInt(a2.length)-1>=1){
for(var q=1;q<=parseInt(a2.length)-1;q++)
blank2=blank+"＊";
}else{
for(var q=1;q>=parseInt(a2.length)-1;q--)
blank2=blank2+"＊";
}


blank2=a2;

}

	if(a1.indexOf(" ")!=-1){	
	
	if(a3=="" && a2!=""){
	}else{
	//blank2="<INPUT name='answer'   size='15'>"+"("+a3+")";
	 blank2="<span style='text-decoration:underline'>&nbsp;&nbsp;("+a3+')&nbsp;&nbsp;</span>';
	}
			
}else{
	
	for(var q=2;q<=parseInt(a1.length)-1;q++){
	blank2=blank2+"＊";
	}
	

	blank2=a1;

}
return blank2;
}


function cloze_clk(id){
	if(ck<=$(en).find("word_answer").text().split("\n").length-1){	 
	  var idchk=$("#ans2_"+id).html();
		if(idchk.indexOf('(')=='-1'){
		  $("#ex_"+ck).hide()	 
		  $("#exj_"+ck).html('<span class="RightColor"> '+$("#ans_"+id).text()+' </span>')	  
		  $("#cloze_ans").val($("#cloze_ans").val()+$("#ans_"+id).text()+";")
		  $("#ans2_"+id).html('('+parseInt(ck+1)+')')
		  ck++;
		}else if(idchk.indexOf('(')=='0'){
		  alert('不得重覆選擇');					  
		}
	}else{
	 alert('finish');
	}
}

////////////////////////////////////// EX1
function EX1(){
 var Str='';
 var ans=$(en).find("en_question").text().split("\n"),Str,ans2=$(en).find("ch_question").text().split("\n"),answer=$(en).find("answer").text().split("\n"),op1=$(en).find("op1").text().split("\n"),op2=$(en).find("op2").text().split("\n"),op3=$(en).find("op3").text().split("\n"),op4=$(en).find("op4").text().split("\n"),op1_c=$(en).find("op1_c").text().split("\n"),op2_c=$(en).find("op2_c").text().split("\n"),op3_c=$(en).find("op3_c").text().split("\n"),op4_c=$(en).find("op4_c").text().split("\n"),y=0,ii=0,Str='',clock;

 Str='<div class="EXBlock">理解力測驗</div>'
 Str=Str+'<div class="EXSlogn">確實瞭解文章內容嗎？依照文章內容依序回答下列問題吧！</div>'
 Str=Str+'<div class="EXContent">'
  
 for(j=0;j<ans.length-1;j++){		
  ii++;
  ans[j]=ans[j].replace("`","’");
  Str=Str.replace("`","’");
  Str=Str+"<table width='100%' border='0' cellspacing='1'><tr><td align='center' valign='top' width='3%' >"+ii+".</td><td align='left'  width='90%' valign='top'  class='samplesentance'>"+ans[j]+"</td></tr>"
  Str=Str.replace("`","’");
  
  Str=Str+"<tr><td align='center'   width='3%' valign='top'><input class='magic-radio'  value='1' type='radio' name='answer"+j+"' id='answer"+j+"-1'><label class='pupEn_label' style='position:relative;float:left' id='answer_label"+j+"-1' for='answer"+j+"-1' ></label></td><td align='left'  width='100%' valign='top'  class='link' onclick=readckick("+j+",1)>(A)"+op1[j]+"</div></td></tr>";
  Str=Str+"<tr><td valign='top' align='center'  width='3%'><input class='magic-radio' value='2' type='radio' name='answer"+j+"' id='answer"+j+"-2'><label class='pupEn_label' style='position:relative;float:left' id='answer_label"+j+"-2' for='answer"+j+"-2' ></label></td><td align='left'  width='100%' valign='top'  class='link'  onclick=readckick("+j+",2)>(B)"+op2[j]+"</div></td></tr>";
  Str=Str+"<tr><td valign='top' align='center'  width='3%'><input class='magic-radio' value='3' type='radio' name='answer"+j+"' id='answer"+j+"-3'><label class='pupEn_label' style='position:relative;float:left' id='answer_label"+j+"-3' for='answer"+j+"-3' ></label></td><td align='left'  width='100%' valign='top'  class='link'  onclick=readckick("+j+",3)>(C)"+op3[j]+"</div></td></tr>";
  Str=Str+"<tr><td valign='top' align='center'  width='3%'><input class='magic-radio' value='4' type='radio' name='answer"+j+"' id='answer"+j+"-4'><label class='pupEn_label' style='position:relative;float:left' id='answer_label"+j+"-4' for='answer"+j+"-4' ></label></td><td align='left'  width='100%' valign='top'  class='link'  onclick=readckick("+j+",4)>(D)"+op4[j]+"</div></td></tr>";
  
  Str=Str+"</table><br>";
 }
 
 Str=Str+'</div>'
 
 
 Str=Str+'<div class="EX1Submit link" onclick="EX1_end()">送出</div>'
 Str=Str+'<div style="position:relative;margin: 0 auto;width:100%;height:50px;"></div>' 
 
 $('#EX1').html(Str)
 $('#EX1').animate({scrollTop:('0px')},100);
}

function EX1_end(){
  var ans='',check=0,ans2=$(en).find("en_question").text().split("\n");
  $.cookie('reading_cookie', '', { path:'/', expires: 5 });  

  for(j=0;j<ans2.length-1;j++){
  
	ans=ans+$('input[name=answer'+j+']:checked').val()+";"
	check++;
  
  }

  if(parseInt(check)!=parseInt(ans2.length-1)){
	alert('尚有選項未答');
  }else{
	$.cookie('reading_cookie', ans, { path:'/', expires: 5 }); 
	EX1_answers()
  }

}

function EX1_answers(){
 var Str='';
  var ans=$(en).find("en_question").text().split("\n"),eu,ans2=$(en).find("ch_question").text().split("\n"),answer=$(en).find("answer").text().split("\n"),y=0,ii=0,eu='',clock,As,y=0;

  var op= new Array();
  op[1]=$(en).find("op1").text().split("\n")
  op[2]=$(en).find("op2").text().split("\n")
  op[3]=$(en).find("op3").text().split("\n")
  op[4]=$(en).find("op4").text().split("\n")
  var op_c= new Array();
  op_c[1]=$(en).find("op1_c").text().split("\n")
  op_c[2]=$(en).find("op2_c").text().split("\n")
  op_c[3]=$(en).find("op3_c").text().split("\n")
  op_c[4]=$(en).find("op4_c").text().split("\n")
  As=$.cookie('reading_cookie').split(";");	
  
 Str='<div class="EXBlock">理解力測驗</div>'
  Str=Str+'<div class="EXSlogn"></div>'
 //Str=Str+'<div class="EXRecord"><table width="90%" border="0" cellspacing="1" align="center"><tr height="120"><td align="right" width="10%"><div class="EXRecord_i"></div></td><td align="left" width="70%"><div class="EXComment" id="EXComment1"></div></td><td align="center" width="20%"><div class="EXRec" id="EXRec_1"></div></td></tr></table></div>'
  Str=Str+'<div class="EXRecord"><table width="80%" border="0" cellspacing="0" align="center"><tr height="60"><td align="right" width="10%"></td><td align="left" width="30%"></td><td align="center" width="40%"><div class="EXRec" id="EXRec_1"></div></td></tr></table></div>'
 Str=Str+'<div class="EXContent">'
 
 
 
 for(j=0;j<ans.length-1;j++){		
  ii++;
  ans[j]=ans[j].replace("`","’");
  Str=Str.replace("`","’");
  Str=Str+"<table width='100%' border='0' cellspacing='1'><tr><td align='center' valign='top' width='3%' >"+ii+".</td><td align='left'  width='90%' valign='top'  class='samplesentance'>"+ans[j]+"<br>"+ans2[j]+"</td></tr>"
  Str=Str.replace("`","’");
  
  for(i=1;i<=4;i++){
	if(i==parseInt(answer[j])){	
	
	 if(i==parseInt(As[j])){
	  Str=Str+"<tr><td align='center'  width='3%' valign='top'><div class='magic-radioRight'><div class='magic-tick' style='left:-35px;'></div></div></td><td valign='top'  class='RightColor' align='left' width='90%' >("+ABC_chang(i)+")"+op[i][j]+" <br>&nbsp;&nbsp;&nbsp;&nbsp;"+op_c[i][j]+"</td></tr>";	
	  y++
	 }else{
	  Str=Str+"<tr><td align='center'  width='3%' valign='top'><div class='magic-radioSelect'></div></td><td valign='top'  align='left' width='90%' class='RightColor' >("+ABC_chang(i)+")"+op[i][j]+" <br>&nbsp;&nbsp;&nbsp;&nbsp;"+op_c[i][j]+"</td></tr>";	 
	 }
		  
	}else{
		
	  if(i==parseInt(As[j])){
		Str=Str+"<tr><td align='center'  width='3%' valign='top'><div class='magic-radioWrong'><div class='magic-Cross' style='left:-35px;'></div></div></td><td valign='top' class='WrongColor' align='left' width='90%' >("+ABC_chang(i)+")"+op[i][j]+" <br>&nbsp;&nbsp;&nbsp;&nbsp;"+op_c[i][j]+"</td></tr>";			
	  }else{
		Str=Str+"<tr><td align='center'  width='3%' valign='top'><div class='magic-radioSelect'></div></td><td valign='top'  align='left' width='90%' >("+ABC_chang(i)+")"+op[i][j]+" <br>&nbsp;&nbsp;&nbsp;&nbsp;"+op_c[i][j]+"</td></tr>";
	  }
	  
	}
  }
  
  Str=Str.replace("`","’");
  Str=Str+"</table><br>";
 }
 
 Str=Str+'</div>'
 
 Str=Str+'<div style="position:relative;margin: 0 auto;width:100%;height:50px;"></div>' 
 Str=Str+'<div class="NextEX link" onclick="EXChange(2)">前往聽力測驗</div>'
 Str=Str+'<div class="Arrow_icon2 Rota270 link" onclick="EXChange(2)"></div>'
 Str=Str+'<div style="position:relative;margin: 0 auto;width:100%;height:50px;"></div>'
 
 y=parseInt(y*100/parseInt(answer.length-1))
 raj(y,'reading')
 
 $('#EX1').html(Str)
 //$('#EXComment1').html('Well done. Your test result is :')
 $('#EXRec_1').html(y)
}

////////////////////////////////////// EX2
function EX2(){
 var Str='';
 
 var ans2=$(en).find("listen_answer").text().split("\n"),eu,ii=1,k="",y=0,a,a1,a2,a3,eu='',clock;


for (i=0;i<=$(en).find("lrclist:last").index();i++){
  if($(en).find("lrclist:eq("+i+")").index()!=-1){	
	 eu=eu+$(en).find("lrclist:eq("+i+")").attr("content");	
  }else{
   break ;
  }
}	

for(j=0;j<ans2.length;j++){		

  if(eu.indexOf(ans2[j])!=-1 ){			      
	eu=eu.replace(ans2[j],'('+(j+1)+').'+blank(ans2[j]))	
  }
  
}

 var x=eu.split('**');
 
 Str='<div class="EXBlock">聽力測驗</div>'
 Str=Str+'<div class="EXSlogn">利用滑鼠點擊喇叭播放音擋，試著將隱藏的單字拼出來，快速檢視自己的聽力及字彙能力。</div>'
 Str=Str+'<div class="EXLeft">'
 Str=Str+'<div class="EXPlayer link" onclick="EX_play()"></div>'
for(i=0;i<x.length;i++){
 x[i]=x[i].replace(/\＊/g,"*")
 Str=Str+"<span align='left'  class='content_eng16' valign='top'>"+x[i]+"</span><p>";
}
 
 Str=Str+'</div>'

 Str=Str+'<div class="EXRight">'
 
 for(j=0;j<ans2.length;j++){		      
  Str=Str+"<span align='left' >"+(j+1)+".&nbsp;<INPUT name='EX2answer"+(j+1)+"' class='EX2-text' id='EX2answer"+(j+1)+"' type='text' ></span><p>";
 }

 Str=Str+'<div class="EXClear link" onclick="EX2_Clear()">清除</div><div class="EX2Submit link" onclick="EX2_end()">送出</div>' 
 
 Str=Str+'</div>'
 
 Str=Str+'<div style="float:left;position:relative;margin: 0 auto;width:100%;height:50px;"></div>'
 
 $('#EX2').html(Str)
}


function EX2_Clear(){
 $('.EX2-text').val('');
}

function EX2_end(){
 var e=$(en).find("listen_answer").text().split("\n"),ans='';
  $.cookie('listening_cookie', '', { path:'/', expires: 5 });  

  for(i=0;i<e.length;i++){
	ans=ans+$('#EX2answer'+(i+1)).val()+";";
  }
  $.cookie('listening_cookie', ans, { path:'/', expires: 5 }); 
  EX_pause()
  EX2_answers()
  
}

function EX2_answers(){
 var Str='';
 
 var ans2=$(en).find("listen_answer").text().split("\n"),eu,ii=1,k="",y=0,AS,a,a1,a2,a3,eu='',clock;
  //j_stop();


for (i=0;i<=$(en).find("lrclist:last").index();i++){
  if($(en).find("lrclist:eq("+i+")").index()!=-1){	
	 eu=eu+$(en).find("lrclist:eq("+i+")").attr("content");	
  }else{
   break ;
  }
}	

//重新排序
  for(i=0;i<ans2.length;i++){
	  
	for(j=i+1;j<ans2.length;j++){
		
	  if (j<=ans2.length){
		  
		if(eu.indexOf(ans2[j])<eu.indexOf(ans2[i])){
		  k=ans2[i]
		  ans2[i]=ans2[j]
		  ans2[j]=k
		}
		
	  }
	  
	}
	
  }

  As=$.cookie('listening_cookie').split(";");

  for(j=0;j<ans2.length;j++){
	  
	if(eu.indexOf(ans2[j])!=-1 ){	
		eu=eu.replace(ans2[j],"<span class='RightColor'>"+ans2[j]+"</span>")	  
	}
	
  }

 var x=eu.split('**');
 
 Str='<div class="EXBlock">聽力測驗</div>'
 Str=Str+'<div class="EXSlogn"></div>'
 //Str=Str+'<div class="EXRecord"><table width="90%" border="0" cellspacing="1" align="center"><tr height="120"><td align="right" width="10%"><div class="EXRecord_i"></div></td><td align="left" width="70%"><div class="EXComment" id="EXComment2"></div></td><td align="center" width="20%"><div class="EXRec" id="EXRec_2"></div></td></tr></table></div>' 
  Str=Str+'<div class="EXRecord"><table width="80%" border="0" cellspacing="0" align="center"><tr height="60"><td align="right" width="10%"></td><td align="left" width="30%"></td><td align="center" width="40%"><div class="EXRec" id="EXRec_2"></div></td></tr></table></div>'
 Str=Str+'<div class="EXLeft">'
 
for(i=0;i<x.length;i++){
 x[i]=x[i].replace(/\＊/g,"*")
 Str=Str+"<span align='left'  valign='top'>"+x[i]+"</span><p>";
}
 
 Str=Str+'</div>'

 Str=Str+'<div class="EXRight">'

      

 for(j=0;j<ans2.length;j++){
	ans2[j]=ans2[j].trim();
	As[j]=As[j].trim();	
  //if(trim(ans2[j])==trim(As[j])){ 
  if(ans2[j]==As[j]){ 	  	      
   Str=Str+"<div align='left' >"+(j+1)+".&nbsp;<INPUT  class='EX2-text RightColor' id='EX2answer"+(j+1)+"' type='text'  value='"+As[j]+"' > </div><div class='magic-tick' style='float:right;right:-40px;top:-25px;'></div>";
      Str=Str+"<div align='left' class='RightColor' >&nbsp;</div><br>"  
   y++;
  }else{
   Str=Str+"<div align='left' >"+(j+1)+".&nbsp;<INPUT  class='EX2-text WrongColor' id='EX2answer"+(j+1)+"' type='text'  value='"+As[j]+"' > </div><div class='magic-Cross' style='float:right;right:-40px;top:-25px;'></div>";	
   Str=Str+"<div align='left' class='RightColor' >&nbsp;&nbsp;&nbsp;&nbsp;"+ans2[j]+"</div><br>"  
  }
 }
	  


 Str=Str+'</div>'
 Str=Str+'<div style="float:left;position:relative;margin: 0 auto;width:100%;height:100px;"><div class="NextEX link" onclick="EXChange(3)"  >前往克漏字測驗</div><div class="Arrow_icon2 Rota270 link"  onclick="EXChange(3)"></div></div>' 
 
 Str=Str+'<div style="float:left;position:relative;margin: 0 auto;width:100%;height:50px;"></div>'

 
 
 y=parseInt(y*100/parseInt(ans2.length))  
 raj(y,'listen')
 
 $('#EX2').html(Str)
 //$('#EXComment2').html('Well done. Your test result is :')
 $('#EXRec_2').html(y)
 
}

////////////////////////////////////// EX3
function EX3(){
 var Str='';
 var ans2=$(en).find("word_answer").text().split("\n"),en_article,tc_article,ii=1,k="",a,a1,a2,a3,eu='';

  for (i=0;i<=$(en).find("lrclist:last").index();i++){
	  
	if($(en).find("lrclist:eq("+i+")").index()!=-1){	
	  en_article=en_article+$(en).find("lrclist:eq("+i+")").attr("content")+"[p]";
	  tc_article=tc_article+$(tc).find("lrclist:eq("+i+")").attr("content")+"[p]";
	}	
  
	en_article=en_article.replace('**',"<br>");
	tc_article=tc_article.replace('**',"<br>");
  }

  var ena=en_article.split('[p]');
  var cha=tc_article.split('[p]');
  var ans= new Array();
  var answer1= new Array();
  var textbox= new Array();
  var key= new Array();

  for(i=0;i<parseInt(ans2.length);i++){	
	a=ans2[i].split(";")
	a1=a[0];
	a2=a[1];
	a3=a[2];
	answer1[i]=a1;
	
	if(a2==""){
	  ans[i]=a1;
	}else{
	  ans[i]=a2;
	}
	
  }
   
 Str='<div class="EXBlock">克漏字測驗</div>'
 Str=Str+'<div class="EXSlogn">想增進介系詞與片語能力嗎？依照題號順序，點選右方最適合的答案，完成後，即可獲得解答與分數。</div>'
 Str=Str+'<div class="EXLeft" >'

  for(i=0;i<ans.length;i++){
	  
	for(j=0;j<ena.length;j++){	
	
	  ena[j]=ena[j].replace("undefined","")
	  
	  if(ena[j].indexOf(answer1[i])!=-1){	
	  
		if(eu.indexOf(ena[j])!=-1){
		
		  eu=eu.replace(eu_temp,"<br>")
		  eu=eu.replace("undefined","")		
		  ii=ii-1;
		  
		}
	    
		ena[j]=ena[j].replace(answer1[i],blank_cloze(i,ans2[i]))
		ena[j]=ena[j].replace(/\＊/g,"*")
		ena[j]=ena[j].replace("<br>","")
		cha[j]=cha[j].replace("'","")
		cha[j]=cha[j].replace("<br>","")
		ena[j]=ena[j].replace("undefined","")
		cha[j]=cha[j].replace("undefined","")

        eu=eu+"<span align='left'   valign='top' >"+ena[j]+"</span><p>"
		eu_temp="<span align='left'   valign='top' >"+ena[j]+"</span><p>"
	  	  
		  
		ii=ii+1;	
		j=ena.length;		
	  }
		
	}
    
  } 

 Str=Str+eu;
 Str=Str+'</div>'

 Str=Str+'<div class="EXRight">'

ck=0;

  var rand='',ran_ch='',ran_x=0;
  while(ran_x<ans2.length) { 
	var r = ans2[parseInt(Math.random()*ans2.length)]; 
  
	if(ran_ch.indexOf(r+'#')==-1){
	ran_ch=ran_ch+r+'#'
	ran_x++;
	}
  }

  rand=ran_ch.split('#')

  for(j=0;j<rand.length-1;j++){	
	  ans22=rand[j].split(";")
		if(ans22[1].length>1){
		  Str=Str+"<div class='EX3Block' onmousemove=$(this).attr('class','EX3BlockB');  onmouseout=$(this).attr('class','EX3Block');  onclick=cloze_clk("+j+");return false;>&nbsp<span id='ans_"+j+"' >"+ans22[1]+"</span>&nbsp<span id='ans2_"+j+"' ></span></div><p>";	
		}else{
		  Str=Str+"<div class='EX3Block' onmousemove=$(this).attr('class','EX3BlockB');  onmouseout=$(this).attr('class','EX3Block');  onclick=cloze_clk("+j+");return false;>&nbsp<span id='ans_"+j+"' >"+ans22[0]+"</span>&nbsp<span id='ans2_"+j+"' ></span></div><p>";		
		}
  
  } 

 Str=Str+'<INPUT name="answer" type="hidden"  id="cloze_ans">';
 Str=Str+'<div class="EXClear link" onclick="EX3_Clear()">清除</div><div class="EX2Submit link" onclick="EX3_end()">送出</div>' 
 
 Str=Str+'</div>'
 
  Str=Str+'<div style="position:relative;margin: 0 auto;width:100%;height:50px;"></div>' 
 
 $('#EX3').html(Str)
}

function EX3_Clear(){
	for(i=0;i<=$(en).find("word_answer").text().split("\n").length-1;i++){
		$("#ex_"+i).show();	 
		$("#exj_"+i).html('');	
		$("#ans2_"+i).html('');
		$("#cloze_ans").val('');
	}
	ck=0;
}

function EX3_end(){
	
  $.cookie('cloze_cookie', '', { path:'/', expires: 5 });  
  $.cookie('cloze_cookie', $("#cloze_ans").val(), { path:'/', expires: 5 }); 
  EX3_answers()
  
}

function EX3_answers(){
var ans2=$(en).find("word_answer").text().split("\n"),en_article,tc_article,AS,ii=1,y=0,a,a1,a2,a3,eu='';

  for (i=0;i<=$(en).find("lrclist:last").index();i++){
   if($(en).find("lrclist:eq("+i+")").index()!=-1){
	   
	   en_article=en_article+$(en).find("lrclist:eq("+i+")").attr("content")+"[p]";
	   tc_article=tc_article+$(tc).find("lrclist:eq("+i+")").attr("content")+"[p]";
   }	
   
   en_article=en_article.replace('**',"<br>");
   tc_article=tc_article.replace('**',"<br>");
   
  }

As=$.cookie('cloze_cookie').split(";");

var ena=en_article.split('[p]');
var cha=tc_article.split('[p]');
var ans= new Array();
var answer1= new Array();
var textbox= new Array();
var key= new Array();

  for(i=0;i<parseInt(ans2.length);i++){	
   a=ans2[i].split(";")
   a1=a[0];
   a2=a[1];
   a3=a[2];
  answer1[i]=a1;
  
	if(a2==""){
	ans[i]=a1;
	}else{
	ans[i]=a2;
	}
  }

 Str='<div class="EXBlock">克漏字測驗</div>'
 Str=Str+'<div class="EXSlogn"></div>'
 //Str=Str+'<div class="EXRecord"><table width="90%" border="0" cellspacing="1" align="center"><tr height="120"><td align="right" width="10%"><div class="EXRecord_i"></div></td><td align="left" width="70%"><div class="EXComment" id="EXComment3"></div></td><td align="center" width="20%"><div class="EXRec" id="EXRec_3"></div></td></tr></table></div>'
   Str=Str+'<div class="EXRecord"><table width="80%" border="0" cellspacing="0" align="center"><tr height="60"><td align="right" width="10%"></td><td align="left" width="30%"></td><td align="center" width="40%"><div class="EXRec" id="EXRec_3"></div></td></tr></table></div>'
 Str=Str+'<div class="EXContent">'

//重新排序
for (i=0;i<answer1.length;i++){
  for (j=i+1;j<answer1.length;j++){
	if (j<=answer1.length){
		if (en_article.indexOf(answer1[j])<en_article.indexOf(answer1[i])){
			k=ans[i]
			k1=answer1[i]
			k2=ans2[i]
			ans[i]=ans[j]
			answer1[i]=answer1[j]
			ans2[i]=ans2[j]
			ans[j]=k
			ans2[j]=k2
			answer1[j]=k1
		}
	 }
  }
}
var j_num=0
for(i=0;i<ans.length;i++){
 for(j=j_num;j<ena.length;j++){
	 
	 ena[j]=ena[j].replace("undefined","")

	 
    if(ena[j].indexOf(answer1[i])!=-1){	
	As[i]=As[i].replace(" ","");
	ans2[i]=blank_cloze2(ans2[i]).replace(" ","");

  	 		 if(eu.indexOf(ena[j])!=-1){

eu=eu.replace(eu_temp,"<br>")
eu=eu.replace("undefined","")

			ii=ii-1;
			 }

		ans2[i]=ans2[i].trim();
		As[i]=As[i].trim();	

	 //if(trim(ans2[i])==trim(As[i])){
	 if(ans2[i]==As[i]){	 
		 y++;
	     ena[j]=ena[j].replace(answer1[i],"<span  class='RightColor'>"+answer1[i]+"</span>")
	 }else{
		 ena[j]=ena[j].replace(answer1[i],"<span  class='WrongColor' style='text-decoration:line-through;'>"+As[i]+"</span>   <span class='RightColor'>"+answer1[i]+"</span>")
	 }
	 
	 ena[j]=ena[j].replace("<br>","")
	 
     ena[j]=ena[j].replace("undefined","")	 
	 eu=eu+"<span align='left' valign='top' >"+ena[j]+"</span><p>"
	 eu_temp="<span align='left'  valign='top' >"+ena[j]+"</span><p>"
	 
	 ii=ii+1;	
	 j_num=j+1;
	 j=ena.length;
	 
	}
	 
 }
 
}
 Str=Str+eu
 Str=Str+'</div>'
 
 Str=Str+'<div style="position:relative;margin: 0 auto;width:100%;height:50px;"></div>'
 
 y=parseInt(y*100/parseInt(ans2.length))
 raj(y,'word')
 
 $('#EX3').html(Str)
 //$('#EXComment3').html('Well done. Your test result is :')
 $('#EXRec_3').html(y)
 
}
//////////////////////////////////////////////////
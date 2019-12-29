var xml='',mx='',my='';
var en='What’s on Your Mind<br> Amber, James and several coworkers are in a meeting. James is finishing a presentation. <br>James: In conclusion, I think we need to do more advertising for this month to get the word out there. Thank you. <br>Amber: Excellent presentation, James. I just have a question about the cost of your plan. <br>James: Sure, Amber. What’s on your mind? <br>Amber: Your plan looks like it is going to be quite expensive. How would we pay for it? <br>James: Last month we earned a lot more than we thought we would. I think we should put some of the extra money we have now into the advertising department. Who agrees? Shall we have a show of hands? <br>(Everybody raises their hand except for Amber. Amber looks worried.) <br>James: Don’t worry, Amber. This is an important decision. Why don’t you sleep on it and tell me tomorrow? <br>Amber: Alright. Thanks, James. <br>';
var tc='昂貴的計畫<br>安柏、詹姆斯和幾個同事正在會議中，詹姆士正結束一個簡報。<br>詹姆士：最後，我認為我們這個月需要更多的廣告，以將消息散布出去。謝謝。<br>安柏：很棒的簡報哦，詹姆士。我只有一個問題：關於你計畫的成本。<br>詹姆士：當然，安柏。妳在擔心什麼呢？<br>安柏：你的計畫看起來像是將會頗為昂貴，我們要如何負擔呢？<br>詹姆士：上個月，我們所賺的比我們認為能賺的還要多出許多。我想我們應該可以把我們現有額外的錢放到廣告部門。誰同意呢？可以舉手投票。<br>（除了安柏之外，每個人都舉起手了。安柏看起來很擔憂。）<br>詹姆士：不要擔心，安柏。這是個重大的決定，妳何不晚一點做決定，明天再告訴我？<br>安柏：好的，謝啦，詹姆士。	<br>';
var sp='';

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

en=en.split('<br>')
tc=tc.split('<br>')


for(i=0;i<=en.length-1;i++){
  sp=sp+'<div>'+spanWord(en[i])+'</div><div>'+tc[i]+'</div>';	
}

document.body.innerHTML=sp;

}

function DrSign(Str){
    return md5(Str+'B00132018050818000082add88e914f73643b7f');
}


function DrDate(Str){
    var urls='./data.asp';
    var Parameter='str='+(Str)+'&key='+DrSign(Str);
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
    var Parameter='q='+(q)+'&FirmID='+FirmID+'&ContentID=DIC0025&type=html&salt='+salt+'&sign='+sign;
    $('body').append('<div id="_dict_layer" style="position: absolute; z-index: 9000; background-color: rgb(255, 255, 255); left:'+(mx+10)+'px;top:'+(my-50)+'px;"><table width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #7E98D6;border-left:1px solid #7E98D6;border-right:1px solid #7E98D6;border-bottom:1px solid #7E98D6;"><tbody><tr><td><div width="100%" style="cursor:move;background-color:#C8DAF3;border:0px;" onmouseover="_dict_onmove=1;" onmouseout="_dict_onmove=0;"><table width="100%"><tbody><tr><td align="left" width="60%" style="background-color:#C8DAF3;"><div style="color:#1A9100;font-size:14px;background-color:#C8DAF3;">Funday線上字典</div></td><td align="right" style="background-color:#C8DAF3;"> <a href="javascript:menu_infoH()" title="關閉" target="_self"><img src="http://dict.fareast.com.tw/pic/close.gif" style="border:none;display:inline;" align="absmiddle"></a></td></tr></tbody></table></div><table border="0" cellspacing="4" cellpadding="3" width="100%" align="center" onmouseover="_dict_onlayer=1;" onmouseout="_dict_onlayer=0;"><tbody><tr><td><fieldset color="#00c0ff"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tbody><tr><td width="100%"><iframe id="_dictFrame" name="_dictFrame"  height="600"  src="'+url+'?'+Parameter+'" frameborder="0" width="100%"></iframe></td></tr></tbody></table></fieldset></td></tr></tbody></table></td></tr></tbody></table></div>')
      $(function(){
        $( "#_dict_layer" ).draggable();
      });
}

function DVShow(){
    //$('body').append('<div style="left:'+(mx+10)+'px;top:'+(my-50)+'px;position:absolute; " id="TutorLive_DV">'+$(xml).find("row-value:eq(0)").text()+'</div>')
    $('body').append('<div id="_dict_layer" style="position: absolute; z-index: 9000; background-color: rgb(255, 255, 255); left:'+(mx+10)+'px;top:'+(my-50)+'px;"><table width="240" cellspacing="0" cellpadding="0" style="border-top:1px solid #7E98D6;border-left:1px solid #7E98D6;border-right:1px solid #7E98D6;border-bottom:1px solid #7E98D6;"><tbody><tr><td><div width="100%" style="cursor:move;background-color:#C8DAF3;border:0px;" onmouseover="_dict_onmove=1;" onmouseout="_dict_onmove=0;"><table width="100%"><tbody><tr><td align="left" width="60%" style="background-color:#C8DAF3;"><div style="color:#1A9100;font-size:14px;background-color:#C8DAF3;">Funday線上字典</div></td><td align="right" style="background-color:#C8DAF3;"> <a href="javascript:menu_infoH()" title="關閉" target="_self"><img src="http://dict.fareast.com.tw/pic/close.gif" style="border:none;display:inline;" align="absmiddle"></a></td></tr></tbody></table></div><table border="0" cellspacing="4" cellpadding="3" width="100%" align="center" onmouseover="_dict_onlayer=1;" onmouseout="_dict_onlayer=0;"><tbody><tr><td><fieldset color="#00c0ff"><table border="0" cellspacing="0" cellpadding="0" width="100%" align="center"><tbody><tr><td width="100%">'+$(xml).find("row-value:eq(0)").text()+'</td></tr></tbody></table></fieldset></td></tr></tbody></table></td></tr></tbody></table></div>')
}

function RemoveHTML( strText ){ 
 var regEx = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g; 
 return strText.replace(regEx, ""); 
} 

function spanWord( strText ) 
{ 
 var regEx = /\b/g; 
 var chstr='';
 var chstr2='';
 strText=escape(strText);
 chstr=strText.split("%20");
 
  for(w=0;w<chstr.length;w++){
	  chstr2=chstr2+'<span style="cursor:pointer;" onClick=DrDate2("'+RemoveHTML(unescape(chstr[w]))+'");> '+unescape(chstr[w])+'</span>'
  }

 return chstr2; 
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
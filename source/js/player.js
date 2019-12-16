var state,clock_num='',clock_num0='',clock_num_2='',clock_num0_2='',count=0,pit=0,temp=0,temp2=0,clock,pausev=1,after=0,playmode=1;playflag=1,bubble_num='',bubble_num2='';
//初始化
function playerinit(){
  //var mp3_1=$(en).find("lrc").attr("mp3file1")
  //var mp3_2=$(en).find("lrc").attr("mp3file2")
  var mp3_1=$(en).find("lrc").attr("mp3file1");
  var mp3_2=$(en).find("lrc").attr("mp3file2");

  var a =$('<audio id="audio1"  type="audio/mpeg"  src="'+mp3_1+'?&dd='+dd+'" ontimeupdate="updatetime1()"></audio>');
  var b =$('<audio id="audio2"  type="audio/mpeg"  src="'+mp3_2+'?&dd='+dd+'" ontimeupdate="updatetime2()"></audio>');

  $('body').append(a);
  $('body').append(b);

  var Aido1=document.getElementById("audio1")
  Aido1.addEventListener("ended",function(){finishplay1();},false);

  var Aido2=document.getElementById("audio2")
  Aido2.addEventListener("ended",function(){finishplay2();},false);


  for (i=0;i<=$(en).find("lrclist:last").index();i++){
    clock_num=clock_num+second_ck($(en).find("lrclist:eq("+i+")").attr("mp3_1"))+';' ;
    clock_num0=clock_num0+($(en).find("lrclist:eq("+i+")").attr("mp3_1"))+';' ;  
    clock_num_2=clock_num_2+second_ck($(en).find("lrclist:eq("+i+")").attr("mp3_2"))+';';
    clock_num0_2=clock_num0_2+($(en).find("lrclist:eq("+i+")").attr("mp3_2"))+';';      
  }

  clock_num=clock_num+'x';
  clock_num=clock_num.split(";");
  clock_num0=clock_num0+'x';
  clock_num0=clock_num0.split(";");
  
  clock_num_2=clock_num_2+'x';
  clock_num_2=clock_num_2.split(";");
  clock_num0_2=clock_num0_2+'x';
  clock_num0_2=clock_num0_2.split(";");

  for (i=0;i<=$(en).find("bubblelist:last").index();i++){
    bubble_num=bubble_num+second_ck($(en).find("bubblelist:eq("+i+")").attr("mp3_1"))+';'
    bubble_num2=bubble_num2+second_ck($(en).find("bubblelist:eq("+i+")").attr("mp3_2"))+';'
  }

  bubble_num=bubble_num.split(";");
  bubble_num2=bubble_num2.split(";");

}

//秒數換算
function second_ck(cl){
  var sec='',sp,tem;	

  var splitStartA =cl.split(":");
  var secStartA = parseFloat(Math.round(splitStartA[0]))*60+parseFloat(parseFloat(splitStartA[1]).toFixed(2));

  sec=parseFloat(Math.round(splitStartA[0]))*60+parseFloat(parseFloat(splitStartA[1]).toFixed(2));
  //sec=sec+1;
  return sec;

}

// 全文播放
function j_play(){
  document.getElementById('audio').currentTime = 0;
  document.getElementById('audio').play();
}

function All_pause(){

  document.getElementById("audio1").pause();
  document.getElementById("audio1").currentTime = 0;

  document.getElementById("audio2").pause();
  document.getElementById("audio2").currentTime = 0;
  temp=0;

  $('#Speed_range').val('1.0')
  SpeedBar('1.0')
      
  $('.EXPlayerS').addClass('EXPlayer')
  $('.EXPlayer').removeClass('EXPlayerS')

  $('.Step1-contentEn').attr('class','Step1-contentEn link')
  $('.Step1-contentCh').attr('class','Step1-contentCh')

  $('#Step1PlayIcon').attr('data-value','0')
  $('#Step1PlayIcon').attr('class','Step1Player link');	
  $('#ToolBox2').hide()	
  $('#ToolBox1').show()	
  $('#Step1PlayIcon').on('click',function(){pauseplay()})
    
  $('#Step2PlayIcon').attr('data-value','0')
  $('#Step2PlayIcon').attr('class','Step1Player link');
  $('#Step2PlayIcon').on('click',function(){pauseplay2()})

}

function EX_play(){
  document.getElementById('audio1').currentTime = 0;
  document.getElementById('audio1').play();
  $('.EXPlayer').addClass('EXPlayerS')
  $('.EXPlayerS').removeClass('EXPlayer')
}

function EX_pause(){
  document.getElementById("audio1").pause();
  document.getElementById("audio1").currentTime = 0;
}


//幾秒後全文播放
function l_play(s){
  if(s==0){
    document.getElementById('audio').currentTime = 0;
    document.getElementById('audio').play();
  }else{
    timerID = setTimeout("l_play("+(s-1)+")",1000);	
  }
}

function ModeCheck(){
  if($('#control-1').attr('data-value')=='0'){
    playmode=1; 
  }else if($('#control-1').attr('data-value')=='1'){
    playmode=3; 
  }
  //console.log(playmode)
}

//點擊播放
function play_vo(t){
  count=1;
  temp=t;
  ModeCheck();
  $('.Step2Main').scrollTop(document.getElementById('Tt'+(temp)).offsetTop);
 
  $('.ST2Pause,.ST2Player2').hide();
  $('.ST2Player').show();
  $('#Ste2Play'+t).hide();
  $('#Ste2Pause'+t).show();
 	
  $('.Step2Main').scrollTop(document.getElementById('Tt'+(temp)).offsetTop);
  document.getElementById('audio1').currentTime = clock_num[temp];
  document.getElementById('audio1').play();

}

//段落播放
function play(t){
  highlightBg()
  highlight(t)
  ModeCheck()

  if(document.getElementById("audio1").paused==false || document.getElementById("audio2").paused==false){
    pausetime() 
  }

  //$('.speed').addClass("show");
  $('.play_btn').addClass("pause");  

  if(playmode==1){
    document.getElementById('audio1').currentTime = clock_num[t];
    document.getElementById('audio1').play();
  }else if(playmode==2){
    document.getElementById('audio2').currentTime = clock_num_2[t];
    document.getElementById('audio2').play();
  }else if(playmode==3){
	  	  
    if(playflag==1){
      document.getElementById('audio1').currentTime = clock_num[t];
      document.getElementById('audio1').play();	 
    }else if(playflag==2){
      document.getElementById('audio2').currentTime = clock_num_2[t];
      document.getElementById('audio2').play();	 		
    }
	
  }else{
    document.getElementById('audio1').currentTime = clock_num[t];
    document.getElementById('audio1').play();	
  }
  temp=t;	 
	 //$("#splay").html('<img   src="images/btn_stop.png"  width="40"  onclick="pausetime(0);" >')	 

}

//段落播放
function playC(t)
{
  highlightBg()
  highlight(t)
  ModeCheck()
  count=0;

  if(document.getElementById("audio1").paused==false || document.getElementById("audio2").paused==false){
    pausetime() 
  }

  //$('.speed').toggleClass("show");
  $('.play_btn').toggleClass("pause");

  if(playmode==1 || playmode==3){
    document.getElementById('audio1').currentTime = clock_num[t];
    document.getElementById('audio1').play();
  }else if(playmode==2){
    document.getElementById('audio2').currentTime = clock_num_2[t];
    document.getElementById('audio2').play();
  }else{
    document.getElementById('audio1').currentTime = clock_num[t];
    document.getElementById('audio1').play();	
  }
  temp=t;	 
	 //$("#splay").html('<img   src="images/btn_stop.png"  width="40"  onclick="pausetime(0);" >')	 

}

//暫停播放
function pausetime(){
  document.getElementById("audio1").pause();
  document.getElementById("audio2").pause();
  // $('.speed').removeClass("show");
  $('.play_btn').removeClass("pause");
}


function pauseplay(){

  highlightBg()
  highlight(temp)
  ModeCheck()
  
  if(playmode==3){ 
  
    if(playflag==1){
      document.getElementById('audio2').currentTime = clock_num_2[temp];  	  
      document.getElementById('audio1').play(); 
    }else if(playflag==2){
      document.getElementById('audio1').currentTime = clock_num[temp];   	  
      document.getElementById('audio2').play();	
    }
    
  }else if(playmode==2){ 
    document.getElementById('audio1').currentTime = clock_num[temp];   	  
    document.getElementById('audio2').play();	 
  }else{
    document.getElementById('audio2').currentTime = clock_num_2[temp];  	  
    document.getElementById('audio1').play(); 	 
  }
 
 
}

function pauseplay2(){

	  //$('#Step2PlayIcon').attr('class','Step1Pause link');
	  //$('#Step2PlayIcon').attr('data-value','1')
  $('.ST2Player').show();
  $('.ST2Pause,.ST2Player2').hide();  

  $('#Ste2Play'+temp).hide();
  $('#Ste2Pause'+temp).show(); 	  		 		 
  //$('#repeat').val($('#repeat_temp').attr('data-value'));
  document.getElementById('audio1').play(); 

}


function updatetime1(){
	if(document.getElementById("audio1").paused==false){
    document.getElementById("audio1").playbackRate = $('#Speed_range').val();		
    playflag=1;
    updatetime()
	}
}
function updatetime2(){
	if(document.getElementById("audio2").paused==false){
    document.getElementById("audio2").playbackRate = $('#Speed_range').val();		
    playflag=2;
    updatetime()	
	}
}

//計數
function updatetime(){
  var Utime1=0,Utime2=0;

  if(clock_num[clock_num.length-1]=='x'){
    clock_num[clock_num.length-1]=document.getElementById("audio1").duration.toFixed(2); 
  }
  
  if(clock_num_2[clock_num_2.length-1]=='x'){
    clock_num_2[clock_num_2.length-1]=document.getElementById("audio2").duration.toFixed(2); 
  } 
  
  ModeCheck()
 
  if(playflag==1){
    Utime1=document.getElementById("audio1").currentTime;
    Utime2=clock_num[temp+1]
  }else if(playflag==2){
    Utime1=document.getElementById("audio2").currentTime;
    Utime2=clock_num_2[temp+1]
  }
	
  //交換判斷
  if(playmode==3){
    $("#repeat").val(1)	  
  }else{
    $("#repeat").val(0)	  
  }
  
  // 模式切換同步 
  if(parseInt($("#repeat").val())>parseInt(count) && playflag==2){
    count=$("#repeat").val()
  }

  if(parseFloat(Utime1)>parseFloat(Utime2)){		
    if(parseInt($("#repeat").val())<=parseInt(count)){
    
      if($('#control-1').attr('data-value')=='0'){
        //$('.stepblock1').scrollTop(document.getElementById(temp+1).offsetTop);
        $('.stepblock1').stop().animate({ 'scrollTop': document.getElementById(temp+1).offsetTop }, 1000, 'swing');	
      }else{
        //$('.stepblock1').scrollTop(document.getElementById('N'+(temp+1)).offsetTop);
        $('.stepblock1').stop().animate({ 'scrollTop': document.getElementById('N'+(temp+1)).offsetTop }, 1000, 'swing');	
      }

      temp=temp+1 

      playflag=1;	  
    

      count=0
      jump_after(1) 

           
    }else{
      
      if(playmode==3 && playflag==1 ){	 
        playflag=2;
        count=count+1;
      }else{
        count=count+1;
      }
      
      jump_after(1) 
     
    }
  }
    
  if(playflag==2)
    bubble();

}

//暫緩數秒
function jump_after(sc){
   
  if(parseInt(sc)==0){	 
	  play(temp);	
  }else{
    var cs=sc	;
    pausetime();
    setTimeout("jump_after("+parseInt(cs-1)+")",1000);
  }

}


//highlight 設定
function highlightSet(){
  css_color1=$(".content_eng28").css("color")
  css_color2=$(".content_chinese28").css("color")
}

//highlight 背景反白
function highlightBg(){
  $('.english').removeClass('lightheight')
  $('.Chinese').removeClass('lightheight')
  $('.english').attr('class','english lightheightBG')
  $('.Chinese').addClass('lightheightBG')
  //$('#ChTitle').attr('class','Step1-contentCh')
  //$('#ChTitle-1').attr('class','Step1-contentCh')
}

//目前句子 highlight
function highlight(id){
  $("#t"+id).removeClass('lightheightBG')
  $("#ct"+id).removeClass('lightheightBG')
  $("#Nt"+id).removeClass('lightheightBG')
  $("#Nct"+id).removeClass('lightheightBG')

  $("#t"+id).addClass('lightheight')
  $("#ct"+id).addClass('lightheight')
  $("#Nt"+id).addClass('lightheight')
  $("#Nct"+id).addClass('lightheight')
}

const lockTarget = function(){
	const $section = $('section');
	const $side = $('aside');
	const $art = $('article');
	const $step1block = $('.stepblock1');
	const $artMask = $('.article_mask');
	const dw = $(document).width();
	const $main = $('.main');
	let mw = 175;
	let mh = 155;
  const distanceY =  100;
  const distanceScrolltop = $step1block.scrollTop();
  ////////////////////////////////////////////////////////////////////////

  // fnMaxXY
  const maxX = Math.floor($step1block.width() - mw);
  const maxY = $('.article2').height() - mh;

  // fnDistanceX
  const outer = ( $main.width() - $artMask.width() ) / 2;
  let inner = Math.floor( $side.innerWidth() + $art.innerWidth() - $art.width() );
  dw <= 1770 ? inner = inner - 25 : null;
  distanceX = outer + inner;
  
  $('body').find('.memobox').each(function(){
    const target = $(this).attr('data-basicid2')
    const offsets = $('#'+target).offset();
    let left = Math.floor(offsets.left - distanceX );
    let top = Math.floor(offsets.top - distanceY + $('#' + target).height() + distanceScrolltop );
    $section.hasClass('move') ? left = left + Math.floor( $section.width() * .25 ) : null;
    left >= maxX ? left = maxX : null;
    top >= maxY ? top = maxY : null;
    $(this).css({left, top}).attr('data-left', left).attr('data-top', top);
  });
}

//氣泡框
function bubble(){
	var flag=0;
	var regEx = /\//g; 
  var bubleStr='';
	
		
	//for (i=0;i<=bubble_num.length-1;i++){

	  if(parseFloat(document.getElementById('audio2').currentTime)>=parseFloat(bubble_num[temp]) && parseFloat(document.getElementById('audio2').currentTime)<=parseFloat(bubble_num2[temp]) ){
      bubleStr=$(en).find("bubblelist:eq("+temp+")").attr("content"); 
      

      bubleStr=bubleStr.replace(regEx,"<br>");
      bubleStr=bubleStr.replace( /([\u4e00-\u9fa5][\u4e00-\u9fa5]*)/g, '<span class="buble-ch">$1</span>')
    
      if(bubleStr!=''){  
        $("#bubble"+temp).html(bubleStr);
        $('.annotation').addClass('bubblehighlightBG');
        $("#bubble"+temp).removeClass('bubblehighlightBG');
        $("#bubble"+temp).show();		
        
        lockTarget();
      }
      
      flag=1;	
      bubble_num[temp]=99
      bubble_num2[temp]=99
      //i=bubble_num.length-1


	  }
	
  // }
 
}

function playSound(word){
  var voca="http://www.fun-day.com.tw/chinese/news/words/"+word+'.mp3';	
  var a =$('<audio id="audioVoca"  src="'+voca+'" type="audio/mpeg"  ></audio>');

  if(document.getElementById("audioVoca")){
    $('#audioVoca').remove();
  }
    
  $('body').append(a);

  document.getElementById('audioVoca').currentTime = 0;
  document.getElementById('audioVoca').play();

}

function listen_play(){
 
  var a =$('<audio id="audio"  type="audio/mpeg"  ></audio>');

  if(document.getElementById("audio"))
    $('#audio').remove();

  $('body').append(a);
  $('#audio').attr('src',urls);	
  $('body').append(a);

  document.getElementById('audio').currentTime = 0;
  document.getElementById('audio').play();

}

function finishplay1(){
	
  if(playmode==1){
    count++;	
    
    if(parseInt($("#repeat").val())>=parseInt(count)){	       
      document.getElementById('audio1').currentTime = clock_num[temp];   	  
      document.getElementById('audio1').play(); 
    }else{


      document.getElementById('audio1').currentTime = 0;
      
      temp=0;
           

          
    }
    
  }else{
    playflag=2
    document.getElementById('audio2').currentTime = clock_num_2[temp];   	  
    document.getElementById('audio2').play();	
  
  }

}

function finishplay2(){


  document.getElementById('audio2').currentTime = 0;
  temp=0;
  

    
  if(playmode==3){
    playflag=1	 
  }
 	
}

/* Record */

function Record_init(){
 
  if(context==0){	
    
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    context = new AudioContext();

    navigator.getUserMedia({audio: true}, function(stream) {
      microphone = context.createMediaStreamSource(stream);
      analyser = context.createAnalyser();
      microphone.connect(analyser);
      //analyser.connect(context.destination);
      analyser.fftSize = 2048;
      bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(analyser.fftSize);
      analyser.getByteFrequencyData(dataArray);
    }, function(){
      console.log('error');
    });
    
  }  
  
}

function recordNow(){
  recorder = new Recorder(microphone);
  recorder.record();
  $('.RecordSpeaker,.RecordPlay').hide();
  $('.RecordStop').show();
}

function recordStop(){
  clearTimeout(timer);
  $('.RecordSpeaker,.RecordPlay').show();
  $('.RecordStop').hide();
  //pl.disabled = false;
  $('.RecordPlay').attr('disabled',false);	
  $('.RecordPlay').css('opacity',1);
  recorder.stop();
  createDownloadLink();
  recorder.clear();
}

function recordPlay(){
  document.getElementById('audioP').play();
  //pl.disabled = true;
  $('.RecordPlay').attr('disabled',true);	
  $('.RecordPlay').css('opacity',0.5);
}

function createDownloadLink(){
  recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);       
    $('#audioP').attr('src',url)
    document.getElementById("audioP").addEventListener("ended",function(){finishplayP();},false);
  });
}

function finishplayP(){
	//pl.disabled = false;
	$('.RecordPlay').attr('disabled',false);	
	$('.RecordPlay').css('opacity',1);
}

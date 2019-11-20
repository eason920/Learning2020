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


  $('.audio-length-total').html('00:00')

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

  $( "#mp3Load" ).trigger( "click" );

  dragProgressDotEvent(Aido1);

  
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

function initplay(){
}

function ModeCheck(){
  if($('#control-1').attr('data-value')=='0'){
    playmode=1; 
  }else if($('#control-1').attr('data-value')=='1'){
    playmode=3; 
  }

  //console.log(playmode)
}


//段落播放
function play(t){
  highlightBg()
  highlight(t)
  ModeCheck()
  count=0;

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

  document.getElementById('audioPlayer-a').src = 'images/mb_a/pause_btn.png';      
  document.getElementById('audioPlayer-b').src = 'images/mb_b/pause_btn.png';
  $('.main').addClass('is-playing')

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
  $('.speed').removeClass("show");
  $('.play_btn').removeClass("pause");
}


function pauseplay(){

  highlightBg()
  highlight(temp)
  ModeCheck()
  document.getElementById('audio2').play();
  document.getElementById('audio2').pause();
  if(playmode==3){ 
  
    if(playflag==1){
      //document.getElementById('audio2').currentTime = clock_num_2[temp];  	  
      document.getElementById('audio1').play(); 
      document.getElementById('audio2').pause(); 
 
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


function dragProgressDotEvent(audio) {
  var dot = document.getElementById('progressDot');

  var position = {
      oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
      oriX: 0, // 移动开始时的x坐标
      maxLeft: 0, // 向左最大可拖动距离
      maxRight: 0 // 向右最大可拖动距离
  };
  var flag = false; // 标记是否拖动开始

  // 鼠标按下时
  dot.addEventListener('mousedown', down, false);
  dot.addEventListener('touchstart', down, false);

  // 开始拖动
  document.addEventListener('mousemove', move, false);
  document.addEventListener('touchmove', move, false);

  // 拖动结束
  document.addEventListener('mouseup', end, false);
  document.addEventListener('touchend', end, false);

  function down(event) {
    if (!audio.paused || audio.currentTime != 0) { // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
      flag = true;

      position.oriOffestLeft = dot.offsetLeft;
      position.oriX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousedown和touchstart事件
      position.maxLeft = position.oriOffestLeft; // 向左最大可拖动距离
      position.maxRight = document.getElementById('progressBarBg').offsetWidth - position.oriOffestLeft; // 向右最大可拖动距离

      // 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
      if (event && event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }

      // 禁止事件冒泡
      if (event && event.stopPropagation) {
        event.stopPropagation();
      } else {
        window.event.cancelBubble = true;
      }
    }
  }

  function move(event) {
    if (flag) {
      var clientX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousemove和touchmove事件
      var length = clientX - position.oriX;
      if (length > position.maxRight) {
        length = position.maxRight;
      } else if (length < -position.maxLeft) {
        length = -position.maxLeft;
      }
      var progressBarBg = document.getElementById('progressBarBg');
      var pgsWidth = parseFloat(window.getComputedStyle(progressBarBg, null).width.replace('px', ''));
      var rate = (position.oriOffestLeft + length) / pgsWidth;
      audio.currentTime = audio.duration * rate;
      //document.getElementById("audio2").pause();
      //document.getElementById("audio1").play();
      /*scrollbar 依滑動進度條定位*/
      for (i=0;i<=$(en).find("lrclist:last").index();i++){ 
        if(parseFloat(document.getElementById("audio1").currentTime)>parseFloat(clock_num[i])){
          temp=i 
          highlightBg()
          highlight(temp)
          if($('#control-1').attr('data-value')=='0'){
            $('section.Read_on').stop().animate({ 'scrollTop': document.getElementById(temp).offsetTop }, 1000, 'swing');	
          }else{
            $('section.Read_on').stop().animate({ 'scrollTop': document.getElementById(temp).offsetTop }, 1000, 'swing');	
          }          
        }    
      }
      /**/
    }
  }

  function end() {
    flag = false;
  }
}

function updatetime1(){
  $('.audio-length-total').html(transTime(document.getElementById('audio1').duration));
  $('#audioCurTime').html(transTime(document.getElementById('audio1').currentTime));

  var value = document.getElementById('audio1').currentTime / document.getElementById('audio1').duration;
  document.getElementById('progressBar').style.width = value * 100 + '%';
  document.getElementById('progressDot').style.left = value * 100 + '%';
  document.getElementById('audioCurTime').innerText = transTime(document.getElementById('audio1').currentTime);

	if(document.getElementById("audio1").paused==false){	
    playflag=1;
    updatetime()
	}
}
function updatetime2(){
	if(document.getElementById("audio2").paused==false){
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
        //$('.mask').scrollTop(document.getElementById(temp+1).offsetTop);
        $('section.Read_on').stop().animate({ 'scrollTop': document.getElementById(temp+1).offsetTop }, 1000, 'swing');	
      }else{
        //$('.mask').scrollTop(document.getElementById('N'+(temp+1)).offsetTop);
        //$('.mask').stop().animate({ 'scrollTop': document.getElementById('N'+(temp+1)).offsetTop }, 1000, 'swing');
        $('section.Read_on').stop().animate({ 'scrollTop': document.getElementById(temp+1).offsetTop }, 1000, 'swing');	
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

//氣泡框
function bubble(){
	var flag=0;
	var regEx = /\//g; 
  var bubleStr='';
	
		
	//for (i=0;i<=bubble_num.length-1;i++){

	  if(parseFloat(document.getElementById('audio2').currentTime)>=parseFloat(bubble_num[temp]) && parseFloat(document.getElementById('audio2').currentTime)<=parseFloat(bubble_num2[temp]) ){
      bubleStr=$(en).find("bubblelist:eq("+temp+")").attr("content"); 
      

      bubleStr=bubleStr.replace(regEx,"<br>");	
    
      if(bubleStr!=''){  
        $("#bubble"+temp).html(bubleStr);
        $('.annotation').addClass('bubblehighlightBG');
        $("#bubble"+temp).removeClass('bubblehighlightBG');
        $("#bubble"+temp).show();		  
      }
      
      flag=1;	
      bubble_num[temp]=99
      bubble_num2[temp]=99
      //i=bubble_num.length-1


	  }
	
  // }
 
}

/**
 * 音频播放时间换算
 * @param {number} value - 音频当前播放时间，单位秒
 */
function transTime(value) {
  var time = "";
  var h = parseInt(value / 3600);
  value %= 3600;
  var m = parseInt(value / 60);
  var s = parseInt(value % 60);
  if (h > 0) {
      time = formatTime(h + ":" + m + ":" + s);
  } else {
      time = formatTime(m + ":" + s);
  }

  return time;
}

/**
* 格式化时间显示，补零对齐
* eg：2:4  -->  02:04
* @param {string} value - 形如 h:m:s 的字符串 
*/
function formatTime(value) {
  var time = "";
  var s = value.split(':');
  var i = 0;
  for (; i < s.length - 1; i++) {
      time += s[i].length == 1 ? ("0" + s[i]) : s[i];
      time += ":";
  }
  time += s[i].length == 1 ? ("0" + s[i]) : s[i];

  return time;
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



function finishplay1(){
	
  if(playmode==1){
    count++;	
    
    if(parseInt($("#repeat").val())>=parseInt(count)){	       
      document.getElementById('audio1').currentTime = clock_num[temp];   	  
      document.getElementById('audio1').play(); 
    }else{


      document.getElementById('audio1').currentTime = 0;
      
      temp=0;
           
      document.getElementById('progressBar').style.width = 0;
      document.getElementById('progressDot').style.left = 0;
      document.getElementById('audioCurTime').innerText = transTime(0);
      document.getElementById('audioPlayer-a').src = 'images/mb_a/play_btn.png';      
      document.getElementById('audioPlayer-b').src = 'images/mb_b/play_btn.png';
          
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
  

  document.getElementById('progressBar').style.width = 0;
  document.getElementById('progressDot').style.left = 0;
  document.getElementById('audioCurTime').innerText = transTime(0);
  document.getElementById('audioPlayer-a').src = 'images/mb_a/play_btn.png';    
  document.getElementById('audioPlayer-b').src = 'images/mb_b/play_btn.png';
    
  if(playmode==3){
    playflag=1	 
  }
 	
}


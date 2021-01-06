var state,clock_num='',clock_num0='',clock_num_2='',clock_num0_2='',count=0,pit=0,temp=0,temp2=0,clock,pausev=1,after=0,playmode=1;playflag=1,bubble_num='',bubble_num2='',record_num='',record_C='',record_Mode=0,playContinue=1,percent='';
var record_blog=[];
var reading_check=[];
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
    record_num=record_num+';'    
  }

  clock_num=clock_num+'x';
  clock_num=clock_num.split(";");
  clock_num0=clock_num0+'x';
  clock_num0=clock_num0.split(";");
  
  clock_num_2=clock_num_2+'x';
  clock_num_2=clock_num_2.split(";");
  clock_num0_2=clock_num0_2+'x';
  clock_num0_2=clock_num0_2.split(";");
  record_num=record_num.split(";");

  for (i=0;i<=$(en).find("bubblelist:last").index();i++){
    bubble_num=bubble_num+second_ck($(en).find("bubblelist:eq("+i+")").attr("mp3_1"))+';'
    bubble_num2=bubble_num2+second_ck($(en).find("bubblelist:eq("+i+")").attr("mp3_2"))+';'
  }

  bubble_num=bubble_num.split(";");
  bubble_num2=bubble_num2.split(";");
  Player_recording_init()
}

function Player_recording_init(){
  $.ajax({
		type:"GET",
		url:"https://funday.asia/newmylessonmobile/api/LearningRecordlist?member_id="+Me.Mindx+"&customer_id="+Me.customer+"&news_id="+refId,
		dataType:"json",
		success:function(data){
      if(data.mp3.length!=0){
        data.mp3.forEach((item,id) => {
          record_num[id]=item
        });

        rec_State=0
        percent=100

        $('.share-title-percent').html('100%')

        $('.is-item-audiotype').removeClass('is-not-ready')       
        $('.step-fnbar2').removeClass('is-not-ready')
        $('.icon-rec-re').removeClass('icon-rec-re').addClass('icon-rec-restart') 
        
        $('.icon-rec-restart > span').html('全部重錄')    
        $('.s2-main-wrapper .share-pre,.step2-finalbox').show()
        $('#s2-main-item0 .share-pre').hide()

        $('.icon-C2,.funbar-update,.recoard-done').hide()
        $('.icon-C3,.icon-C4').show()

        $('.icon-rec-restart').on('click',function(){
          RecordResetConfirm()
        })

        $('.next-unit').on('click',function(){
          $('.is-step-switch3').trigger('click');
        })



      }
		} 
	});
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
  if($('.is-step-switch2').hasClass('active')){
    if(playContinue==0){
      playmode=1
    }else{
      playmode=$('#is-play-part').attr('data-value')
    }
  }else if($('.is-step-switch3').hasClass('active')){
    playmode=1;
    playflag=1
  }else{ 
    if($('.is-item-read').attr('data-value')=='0'){
      playmode=1; 
    }else if($('.is-item-read').attr('data-value')=='1'){
      playmode=3; 
    }

    if(playflag==3)
      playflag=1
  }    
 

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
// 全文播放
function PlayA(){
  playContinue=1
  //temp=parseInt(temp)
  temp=0
  setTimeout(function(){
    play(temp)
    $('.s2-main-box').animate({top : 0})
  },150)
}
// 段落播放&停止
function PlayS(t){
  playContinue=0
  setTimeout(function(){
    play(parseInt(t))
  },150)
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
  $('#playBtn1,#playBtn3').addClass("pause");  
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
  }else if(playmode==4){
    if(record_num[t]!=''){
      recordPlay(t)
    }else{
      const scrollStep2=document.getElementById('s2-main-item'+(parseInt(t)+1)).offsetTop * -1
      $('.s2-main-box').animate({top : scrollStep2})
      setTimeout(function(){
        play((parseInt(t)+1))
      },2000)
      return false;
    }
  }else if(playmode==5){
    if(playflag==1){
      document.getElementById('audio1').currentTime = clock_num[t];
      document.getElementById('audio1').play();	 
    }else if(playflag==3){
      if(record_num[t]!=''){
        recordPlay(t)
      }else{
        playflag=1
        temp=t+1;
        document.getElementById('audio1').currentTime = clock_num[temp];
        document.getElementById('audio1').play();	         
      }
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
  $('#playBtn1,#playBtn3').toggleClass("pause");

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
  if(document.getElementById("audio1").paused==false)
    document.getElementById("audio1").pause();
  if(document.getElementById("audio2").paused==false)  
    document.getElementById("audio2").pause();
  if(document.getElementById("audioP").paused==false)
    document.getElementById("audioP").pause();
  $('.play_btn').removeClass("pause");
}


function pauseplay(){

  if(temp==$(en).find("lrclist:last").index()){
    temp=0
  }  
  
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
function updatetime3(){
	if(document.getElementById("audioP").paused==false){
    document.getElementById("audioP").playbackRate = $('#Speed_range').val();		
    playflag=3;
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
    Utime2=clock_num[(parseInt(temp)+1)]
  }else if(playflag==2){
    Utime1=document.getElementById("audio2").currentTime;
    Utime2=clock_num_2[(parseInt(temp)+1)]
  }
	
  //交換判斷
  if(playmode==3 || playmode==5){
    $("#repeat").val(1)	  
  }else{
    $("#repeat").val(0)	  
  }
  
  // 模式切換同步 
  if(parseInt($("#repeat").val())>parseInt(count) && playflag==2){
    count=$("#repeat").val()
  }

  if(Me.Ispay==1 && Me.EnddateChk()<0){
    //DemoLimit(Me.customer,Me.Mindx,'news',refId)    
  }

  console.log(1)
  if(DemoTimeout==1 && ( ( parseFloat(document.getElementById('audio1').currentTime)>=parseFloat(document.getElementById('audio1').duration)/4 || parseFloat(document.getElementById('audio1').currentTime)>=60) || ( parseFloat(document.getElementById('audio2').currentTime)>=parseFloat(document.getElementById('audio2').duration)/4 || parseFloat(document.getElementById('audio2').currentTime)>=60) ) ){
    count=1
    pausetime();
	if(Login==''){
		JoinusLightBoxLogin()
	}else{	
		JoinusLightBox()
	}
  }else if(parseFloat(Utime1)>parseFloat(Utime2)){		      
    if(parseInt($("#repeat").val())<=parseInt(count)){
    
      if($('.is-item-read').attr('data-value')=='0'){
        //$('#stepBlock1').scrollTop(document.getElementById(temp+1).offsetTop);
        $('#stepBlock1').stop().animate({ 'scrollTop': document.getElementById((parseInt(temp)+1)).offsetTop }, 1000, 'swing');
        const scrollStep2=document.getElementById('s2-main-item'+(parseInt(temp)+1)).offsetTop * -1
        if(playContinue==1){
          // 109/4/30 mail bug : 朗讀自動換句，同時暗中改了加強記憶的行次 v
          // $('.s2-main-box').animate({top : scrollStep2})
        }
      }else{
        //$('#stepBlock1').scrollTop(document.getElementById('N'+(temp+1)).offsetTop);
        $('#stepBlock1').stop().animate({ 'scrollTop': document.getElementById('N'+(parseInt(temp)+1)).offsetTop }, 1000, 'swing');
        const scrollStep2=document.getElementById('s2-main-item'+(parseInt(temp)+1)).offsetTop * -1
        if(playContinue==1){
          // 109/4/30 mail bug : 講解自動換句，同時暗中改了加強記憶的行次 v
          // $('.s2-main-box').animate({top : scrollStep2})
        }
      }

      temp=temp+1;
      playflag=1;	  
    
      count=0;
      jump_after(1); 
          
    }else{

      if(playmode==3 && playflag==1 ){	 
        playflag=2;
        count=count+1;
      }else if(playmode==5 && playflag==1 ){	 
        playflag=3;
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
  if($('.is-step-switch2').hasClass('active')){

    if(playContinue==1){
      if(parseInt(sc)==0){	 
        play(temp);	
      }else{
        var cs=sc	;
        pausetime();
        setTimeout("jump_after("+parseInt(cs-1)+")",1000);
      }
    }else{
      count=0
      play(temp-1);
    }

  }else{

    if(parseInt(sc)==0){	 
      play(temp);	
    }else{
      var cs=sc	;
      pausetime();
      setTimeout("jump_after("+parseInt(cs-1)+")",1000);
    }   

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
  let readingChk=1;
  $("#t"+id).removeClass('lightheightBG')
  $("#ct"+id).removeClass('lightheightBG')
  $("#Nt"+id).removeClass('lightheightBG')
  $("#Nct"+id).removeClass('lightheightBG')

  $("#t"+id).addClass('lightheight')
  $("#ct"+id).addClass('lightheight')
  $("#Nt"+id).addClass('lightheight')
  $("#Nct"+id).addClass('lightheight')

  reading_check[id]="1"

  for (i=0;i<=$(en).find("lrclist:last").index();i++){
    if(reading_check[i]!='1'){
      readingChk=0
    }
  }
  if(readingChk==1){
    StepFinish('Step1')
    jquery_Record()
  }
}

const lockTarget = function(){
	const $section = $('section');
	const $side = $('aside');
	const $art = $('article');
	const $step1block = $('#stepBlock1');
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

function playFinish(){
  var voca="http://funday.asia/learning2020/CheeringSound.mp3";	
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

  if($('.is-step-switch2')){
    if(playContinue==1){
      count=0;
      if(playmode==5){       
        playflag=1; 
      }else if(playmode==4 ){
        playflag=3; 
      }else if(playmode==3){
        playflag=2;
      }  

      if(playmode==3){
        play(temp)
      }else{
        temp=0
        const scrollStep2=document.getElementById('s2-main-item'+(parseInt(temp))).offsetTop * -1
        $('.s2-main-box').animate({top : scrollStep2})
        
        play(temp)
      }
    }else{
      play(temp)
    }
  }else{
    if(playmode==1){
      count++;	
      
      if(parseInt($("#repeat").val())>=parseInt(count)){	       
        document.getElementById('audio1').currentTime = clock_num[temp];   	  
        document.getElementById('audio1').play(); 
      }else{

        document.getElementById('audio1').currentTime = 0;   
        temp=0;

      }
      
    }else if(playmode==3){
      playflag=2
      document.getElementById('audio2').currentTime = clock_num_2[temp];   	  
      document.getElementById('audio2').play();	
    
    }else if(playmode==5){
      playflag=3
      $('#audioP').attr('src',record_num[temp]) 	  
      document.getElementById('audioP').play();	
    
    }
  }
}

function finishplay2(){

  document.getElementById('audio2').currentTime = 0;
  temp=0;
  
  if(playmode==3){
    playflag=1
    pausetime()	 
  }
 	
}

/* Record */


var rec_function='',rec_State='0'


function recordNow(id){
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { 
      var constraints = { audio: true, video: false};
      navigator.mediaDevices.getUserMedia(constraints) .then(function(stream) {


        

        recorder.onstart=function(e){
          $('#s2-record'+record_C+ ' .is-r-start,#s2-record'+record_C+ ' .is-r-play,#s2-record'+record_C+ ' .is-r-re').hide()
          $('#s2-record'+record_C+ ' .is-r-ing').show()
          rec_State=1
        }




        record_C=id;
        recorder.start();
    
        var rec_m=0
        var rec_s=1
        var rec_ss='00'
        $('#rec_time'+id).html('0:00')

        rec_function=setInterval(function(){
          if(rec_s>=60){
            rec_m++;
            rec_s=0
          }
          if(rec_s<10){
            rec_ss='0'+rec_s
          }else{
            rec_ss=rec_s
          }
          $('#rec_time'+id).html(rec_m+':'+rec_ss)
          rec_s++

          if(rec_m>=1 && rec_s>30){
            $('.icon-rec-start').eq(id).trigger("click")
          }  

        },1000)

    })
  }
}

function recordStop(){
  recorder.stop(function(blob,duration){
    //console.log(blob,(window.URL||webkitURL).createObjectURL(blob),"时长:"+duration+"ms");

    var url = URL.createObjectURL(blob);
    record_num[record_C]=url
    record_blog[record_C]=blob
    $('#s2-record'+record_C+ ' .is-r-ing,#s2-record'+record_C+ ' .is-r-start').hide()
    $('#s2-record'+record_C+ ' .is-r-play,#s2-record'+record_C+ ' .is-r-re').show()
    rec_State=0

    percent=0
    for (i=0;i<=$(en).find("lrclist:last").index();i++){
      if(record_num[i]!='')
        percent++    
    }

    $('.share-title-percent').html( parseInt(percent/($(en).find("lrclist:last").index()+1) * 100 ) + '%' )
    if(percent==($(en).find("lrclist:last").index()+1)){
      StepFinish('Step2')
      jquery_Record()

      $('.s2-main-wrapper .share-pre,.step2-finalbox,.funbar-update,.recoard-done').show()
      $('#s2-main-item0 .share-pre').hide()


      $('.recoard-done,.funbar-update').on('click',function(){
        pausetime();
        uploadConfirm();

        $('.is-item-audiotype').removeClass('is-not-ready')
        $('.step-fnbar2').removeClass('is-not-ready')
        $('.icon-rec-re').removeClass('icon-rec-re').addClass('icon-rec-restart') 
        //$('.icon-rec-restart > span').html('全部重錄')    
        $('.icon-C4 > span').html('全部重錄')
        
        $('.icon-rec-restart').off('click')
        $('.icon-rec-restart').on('click',function(){
          RecordResetConfirm()
        })

      })
      $('.next-unit').on('click',function(){
        $('.is-step-switch3').trigger('click');
      })
    }

  });
  clearInterval(rec_function);
  //$('.is-item-audiotype').removeClass('is-not-ready')


}

function RecordResetConfirm(){

  $('#stepBlock2 .msgbox').remove()
  $('#stepBlock2').append('<div class="msgbox "><div class="msgbox-text">之前的錄音會全部刪除，確定重錄？</div><div class="msgbox-btnbox"><div class="msgbox-btn" id="msgboxCancel">取消</div><div class="msgbox-btn" id="msgCheck">確定</div></div></div>')

  $('#msgboxCancel').on('click',function(){
    $('#stepBlock2 .msgbox').remove()
  })	

  $('#msgCheck').on('click',function(){
    RecordResetAll()
  })	

}

function RecordResetAll(){
  for (i=0;i<=$(en).find("lrclist:last").index();i++){
    record_num[i]=''
    record_blog[i]=''
    reading_check[i]=''    
  }

  percent=0
  $('.share-title-percent').html('')
  $('#stepBlock2 .msgbox').remove()
  $('.icon-C2').show()
  $('.icon-C3,.icon-C4').hide()
  $('.is-item-audiotype').addClass('is-not-ready')
  $('.step-fnbar2').addClass('is-not-ready')
  $('.icon-rec-restart').addClass('icon-rec-re').removeClass('icon-rec-restart') 
  $('.icon-rec-restart > span').html('全部重錄')    
  $('.share-pre,.step2-finalbox').hide()

  $('.icon-rec-re').off('click')
  $('icon-rec-re').on('click', function(){
    const $this = $(this);
    resetAll()
    $('#s2-record'+$this.attr('data-value')+' .s2-record-item').hide();
    $('#s2-record'+$this.attr('data-value')+' .icon-rec-start').addClass('active')
    $('#s2-record'+$this.attr('data-value')+' .icon-C2').show()		
    pausetime()
    recordNow($this.attr('data-value'))
  });

  $('.s2-main-box').animate({top : 0})
  



  //resetAll()
}

function uploadFile(){
  var formData = new FormData();

  for (i=0;i<=$(en).find("lrclist:last").index();i++){
    formData.append("mp3_"+i,record_blog[i],Me.customer+"-"+Me.Mindx+"-"+i+".mp3");
  }

  formData.append('member_id', Me.Mindx);
  formData.append('customer_id', Me.customer);
  formData.append('news_id', refId);

  var urls='https://funday.asia/newmylessonmobile/api/LearningRecordUpload'
  /** 
  * 必須false才會避開jQuery對 formdata 的預設處理 
  * XMLHttpRequest會對 formdata 進行正確的處理 
  */ 

  $('#stepBlock2 .msgbox').remove()
  $('#stepBlock2').append('<div class="msgbox is-config"><img src="./images/congrats_step2.png"/><div class="msgbox-updatebox"><span></span><div class="msgbox-percent"><div lass="msgbox-bar"  id="msgbox-bar" style="width:0%;height: 3px;background: rgb(28,167,236,1);"></div></div></div></div>')			
  $.ajax({
    type: "POST",
    url: urls,
    contentType:false, //让xhr自动处理Content-Type header，multipart/form-data需要生成随机的boundary
    processData:false, //不要处理data，让xhr自动处理			
    data: formData ,
    processData : false, 
    //必須false才會自動加上正確的Content-Type 
    contentType : false , 
    xhr: function(){
      var xhr = $.ajaxSettings.xhr();
      if(onprogress && xhr.upload) {
        xhr.upload.addEventListener("progress" , onprogress, false);
        return xhr;
      }
    } 
  });

}

function uploadConfirm(){

  $('#stepBlock2 .msgbox').remove()
  $('#stepBlock2').append('<div class="msgbox is-config"><img src="./images/congrats_step2.png"><div class="msgbox-text">要上傳本次的錄音檔嗎？</div><div class="msgbox-btnbox"><div class="msgbox-btn" id="msgboxCancel">取消</div><div class="msgbox-btn" id="msgCheck">確定</div></div></div>')

  $('#msgboxCancel').on('click',function(){
    $('#stepBlock2 .msgbox').remove()
  })	

  $('#msgCheck').on('click',function(){
    uploadFile()
  })	

}

/**
/**
* 偵查附件上傳情況 ,這個方法大概0.05-0.1秒執行一次
*/
function onprogress(evt){
  var loaded = evt.loaded;     //已經上傳大小情況 
  var tot = evt.total;      //附件總大小 
  var per = Math.floor(100*loaded/tot);  //已經上傳的百分比 
  $(".msgbox-updatebox > span").html( per + "%" );
  $("#msgbox-bar").css("width" , per + "%");
  if(per>=100){
    setTimeout(function(){
    $('.msgbox').remove()
    },2000)
  }
}

function recordPlay(id){
  pausetime();
  $('#audioP').attr('src',record_num[id])

  document.getElementById('audioP').play();
  //pl.disabled = true;
}

function recordPause(id){
  pausetime();
  //document.getElementById("audioP").pause();
  $('.icon-rec-play').addClass('active')
  //pl.disabled = true;
}

function createDownloadLink(){
  recorder.exportWAV(function(blob) {
    var url = URL.createObjectURL(blob);       
    $('#audioP').attr('src',url)
    document.getElementById("audioP").addEventListener("ended",function(){finishplayP();},false);
  });
}

function finishplayP(){

  if (temp<$(en).find("lrclist:last").index()){
    if(playContinue==1){
      if(playmode==5){
        count=0;
        playflag=1; 
        const scrollStep2=document.getElementById('s2-main-item'+(parseInt(temp)+1)).offsetTop * -1
        $('.s2-main-box').animate({top : scrollStep2})
        
        play(temp+1)
      }else if(playmode==4){
        count=0;
        playflag=3; 
        const scrollStep2=document.getElementById('s2-main-item'+(parseInt(temp)+1)).offsetTop * -1
        $('.s2-main-box').animate({top : scrollStep2})
        
        play(temp+1)       
      }else{
        count=1
        pausetime();
        $('.icon-rec-play').removeClass('active')
      }
    }else{ 
      recordPlay(temp) 
    }
  }else{
    if(playContinue==1){
      count=0;
      if(playmode==5){       
        playflag=1; 
      }else if(playmode==4){
        playflag=3; 
      }  
      temp=0
      const scrollStep2=document.getElementById('s2-main-item'+(parseInt(temp))).offsetTop * -1
      $('.s2-main-box').animate({top : scrollStep2})
      
      play(temp)

    }else{
      recordPlay(temp) 
    }    
  }
}

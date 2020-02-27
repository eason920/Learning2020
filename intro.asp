<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>  
<!-- #include virtual="include/DBConnection.asp"-->
<!-- #include virtual="include/functions.asp"-->
<%   
	response.Buffer = true   
	session.CodePage = 65001   
	response.Charset = "utf-8"
	

  mindx=1179  '--使用者ID
  cindx=411  '--customer ID
  enddate="2022/1/1" '--使用者到期日
  Ispay=1

  'mindx=Get_mid()  '--使用者ID
  'cindx=Get_cid()  '--customer ID
  'enddate=Get_enddate()  '--使用者到期日
  edcheck=datediff("d",date(),enddate)

	ADCode() '通路Code
	On Error Resume Next '下一行程式是否會發生Exception'
	rid=Int(request("rid"))
	If Err.Number <> 0 Then '發生Exception'
		rid="0"
	End If
	On Error GoTo 0

	if  rid<>"0" then
		Sql_str=" and a.indx='"&rid&"'"
	else
		'Sql_str=" and datediff(m,a.ndate,getdate())<=1  ORDER BY NEWID()"
    Sql_str="   ORDER BY NEWID()"
	end if

	'sql="SELECT  a.*, b.xml_file2,b.filename4,ch_subject,en_subject FROM  Sample AS a INNER JOIN  news AS b ON a.ref_id = b.indx WHERE  (a.tables = 'Learning') and datediff(d,a.sdate,getdate())>=0 and datediff(d,a.edate,getdate())<=0 and a.ready=1 "&Sql_str&" order by indx"
  sql="SELECT a.indx, a.ch_subject, a.en_subject, a.filename1, a.filename2, a.filename3, a.ch_article, a.xml_file2,b.urls AS Youtube, C.Title AS CSlogn, C.ETitle AS Slogn FROM news AS a LEFT OUTER JOIN news_Slogan AS C ON a.indx = C.ref_id LEFT OUTER JOIN news_movie AS b ON a.indx = b.ref_id WHERE (a.ready = 1) AND (DATEDIFF(d, a.ndate, GETDATE()) >= 0) AND (DATEDIFF(yyyy, '2013/1/1', a.ndate) >= 0) "&Sql_str
	rs.open sql,connection,1,3
	if not rs.eof then
	  ref_id=rs("indx")	
		og_title=rs("ch_subject")
		og_description=rs("ch_article")
		og_url=""
		og_image=rs("filename2")
		'Sample_classify=rs("Sample_classify")
		'tamplate=rs("tmplate")
		xml=rs("xml_file2")
		Youtube=rs("Youtube")
		mp3="mp3-8-1-"&ref_id&".mp3"
		ch_subject=rs("ch_subject")
		en_subject=rs("en_subject")
    CSlogn=rs("CSlogn")
    Slogn=rs("Slogn")
	end if
	rs.close

 
  if Youtube<>"" then
    Youtubetemp=split(Youtube,"/")
    Youbute=Youtubetemp(ubound(Youtubetemp))
  else
    Youtube=""
  end if

  
	sourceFileEn =  "E:\en\xml\"&xml
	sourceFileTc =  "E:\tc\xml\"&xml

	Set objXML = Server.CreateObject("Microsoft.XMLDOM")
	objXML.Load (sourceFileEn)

	Set objXML2 = Server.CreateObject("Microsoft.XMLDOM")
	objXML2.Load (sourceFileTc)

	set nodes = objXML.selectNodes("//lrc/lrclist")
	set nodes2 = objXML2.selectNodes("//lrc/lrclist")

	'Randomize
	'tamplate = Int((2 - 1 + 1) * Rnd + 1)



	if tamplate="2" then
		tamplate="b"
	else
		tamplate="a"
	end if

  mindx=1179
  cindx=411
  sql = "select memo from  member_memobox where ref_id='"&ref_id&"' and customer_id='"&cindx&"' and member_id='"&mindx&"' "
  set rs=connection2.execute(sql)
  if not rs.eof then
    memo= rs("memo")
  else
    memo="[]"  
  end if

  Step1Read ="false"
  Step2Read ="false"
  Step3Read ="false"
  sql = "select * from IsRead_Log where member_id='"&mindx&"' and  subject like 'LearningStep%' and datediff(d,mdate,getdate())<=30"
  set rs=connection2.execute(sql)
  while not rs.eof 
    if rs("subject")="LearningStep1" then
      Step1Read="true"
    elseif rs("subject")="LearningStep2" then
      Step2Read="true"
    elseif rs("subject")="LearningStep3" then
      Step3Read="true"
    end if
    rs.movenext
  wend

%>

<!DOCTYPE html>
<html lang="zh">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name='description' content='<%=replace(og_description,"[p]","")%>' />
	<meta property='og:title' content='<%=og_title%>' />
	<meta property="og:type" content="website" />
	<meta property='og:url' content='https://funday.asia/learning2020/?rid=<%=ref_id%>' />
	<meta property='og:image' content='https://funday.asia/en/pic/<%=og_image%>' />
	<meta property='og:description' content='<%=replace(og_description,"[p]","")%>' />
	<meta property="fb:app_id" content="665673953932390" />
	<link rel="icon" href="./images/favicon.ico" type="image/ico" />
	<title>FUNDAY數位英語學堂</title>

	<link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' />
	<link rel="stylesheet" href="css/all.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display&amp;display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abril+Fatface&amp;display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Engagement&amp;display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap">
	<script src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="../../../jquery/jquery-1.10.4.ui.min.js"></script>	
  <script src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OpusMediaRecorder.umd.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/encoderWorker.umd.js"></script>
	<script type="text/javascript" src="Dr.eye/Dre.js"></script>
	<script src="../../library/js/lightBoxDIY-V2.js"></script>
  <script  src="../../jquery.cookie.js"></script>
	<script src="../../js/Uinfo.js"></script>   		
	<script src='./js/player.js'></script>
	<script src='./js/page.js'></script>
	<script src='./js/main.js'></script>
	<script src='../../../../Funfa/Fa.js'></script>
  <script  src="./js/Times.js"></script>
	<script>
      var Me=new User();
		// art video v
      let videoId = '<%=Youbute%>';
      let refId=<%=ref_id%>
      // teach lightbox video v
      const lbUrl1 = 'https://www.youtube.com/embed/h1I5JM16N0c';
      const lbUrl2 = 'https://www.youtube.com/embed/hN09_3jfNFE';
      const lbUrl3 = 'https://www.youtube.com/embed/RPBLbKwRAkw';
      
      // read lightbox status v
      let read1 = <%=Step1Read%>;
      let read2 = <%=Step2Read%>;
      let read3 = <%=Step3Read%>;
      
      // memobox v
      //- let memoJSON = JSON.parse('[{"id":"memo1","text":"msg 1","top":"2200","left":"0"},{"id":"memo2","text":"msg 2","top":"500","left":"300"}]');
      //let memoJSON = JSON.parse('[{"id":"memo1","text":"msg%201%0Afloor2%0Afloor3%0AASDFIASJEFIASE%0A","basicid2":"Nct1-5","basicid1":"ct1-5"},{"id":"memo2","text":"%u4FBF%u5229%u8CBC%u6210%u529F%0Aya%7E%7E","basicid2":"Nt5-6","basicid1":"t5-6"}]');

      let memoJSON = JSON.parse('<%=memo%>')

      //let memoJSON='';
      let memoUpdate = '';
      
      // content v
      for(let i = 1; i<=3; i++){
      	$.get('step' + i + '.asp', function(html){
      		$('#stepBlock' + i ).html(html);
      	});
      };


        edcheck='<%=edcheck%>';
        Ispay='<%=Ispay%>';
        BuyType=Me.BuyType;
        Product=Me.Product;


      if((parseInt(edcheck)>parseInt(0)) && Product!='228' )
        display(refId,1)  
	</script>		
	<script src="js/ui_all.js"></script>
  <script src="js/memobox.js"></script>
  <script src='js/ui_step1.js'></script>
  <script src="js/ui_step2.js"></script>
  <script src="js/ui_step3.js"></script>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5J9V9J');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K84D2RM');</script>
<!-- End Google Tag Manager -->

<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '318780062004624');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=318780062004624&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->

<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '791512797552313');
fbq('track', "PageView");
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=318780062004624&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->


<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '2785702161655695');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=2785702161655695&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->

</head>

<body onload="DrInit();" >

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P5J9V9J"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K84D2RM"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->



	<div id="fb-root"></div>
	<script async defer crossorigin="anonymous" src="https://connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v4.0&appId=665673953932390&autoLogAppEvents=1"></script>
	<input type="hidden" name="repeat" id="repeat" value="0" />
	<!-- v HTML START v -->
  <div class="is-step1" id="stepBox">
      <div class="topbar">
        <div class="wrapper">
          <div class="wrapper-left"><a class="topbar-back-btn" href="#">
              <div class="icon-arrowleft"></div>返回</a></div>
          <div class="wrapper-right-f1">
            <div class="wrapper-right-f2">
              <ul class="topbar-step">
                <li class="topbar-step-item is-step-switch1">
                  <div class="topbar-num">1</div>
                  <div class="topbar-text">研讀本文</div>
                  <div class="icon-correct" style="display:none;"></div>
                </li>
                <li class="topbar-step-item is-step-switch2">
                  <div class="topbar-num">2</div>
                  <div class="topbar-text">加強記憶</div>
                  <div class="icon-correct" style="display:none;"></div>
                </li>
                <li class="topbar-step-item is-step-switch3 is-open">
                  <div class="topbar-num">3</div>
                  <div class="topbar-text">學習驗收</div>
                  <div class="icon-pink"></div>
                  <div class="topbar-scort-outer">
                    <ul class="topbar-scort">
                      <li class="topbar-scrot-item is-ex1">
                        <div class="topbar-box-l">
                          <div class="topbar-text">理解力測驗</div>
                          <div class="topbar-s"></div>
                        </div>
                        <div class="topbar-box-r">
                          <div class="icon-correct" style="display:none;"></div>
                        </div>
                      </li>
                      <li class="topbar-scrot-item is-ex2">
                        <div class="topbar-box-l">
                          <div class="topbar-text">聽力測驗</div>
                          <div class="topbar-s"> 
                            <!-- |89-->
                            <!-- span 分-->
                          </div>
                        </div>
                        <div class="topbar-box-r">
                          <div class="icon-correct" style="display:none;"></div>
                        </div>
                      </li>
                      <li class="topbar-scrot-item is-ex3">
                        <div class="topbar-box-l">
                          <div class="topbar-text">克漏字測驗</div>
                          <div class="topbar-s"></div>
                        </div>
                        <div class="topbar-box-r">
                          <div class="icon-correct" style="display:none;"></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="icon-correct" style="display:none;"></div>
                </li>
              </ul>
              <div class="topbar-icon"><a class="topbar-icon-item" href="#">
                  <div class="icon-refresh"></div></a><a class="topbar-icon-item" href="#">
                  <div class="icon-print"></div></a><a class="topbar-icon-item" href="#">
                  <div class="icon-star-big"></div></a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="article_mask">
          <section>
            <aside>
              <div class="aside-above">
                <div class="aside-above-main">
                  <div class="title" id="title-a"> <%=en_subject%>
                  </div>
                  <div class="sub" id="subtitle-a"> <%=ch_subject%>
                  </div>
                </div>
                <div class="aside-above-sub">
                  <%if Slogn<>"" then%>
                    <div class="aside-above-sub-en"><%=Slogn%></div>
                  <%end if%>
                  <%if CSlogn<>"" then%>
                  <div class="aside-above-sub-ch"><%=CSlogn%></div>
                  <%end if%>
                  <div class="aside-speedbox is-play1">
                    <div class="speed-point"></div>
                    <div class="speed"><b class="speed-left">慢</b>
                      <input id="Speed_range" type="range" min="0.5" max="1.5" value="1" step="0.25"><b>快</b>
                    </div>
                    <input class="play_btn icon-play" id="playBtn1" type="button">
                  </div>
                  <div class="aside-speedbox is-play2">
                    <div class="speed-point"></div>
                    <div class="speed"><b class="speed-left">慢</b>
                      <input type="range" min="0.5" max="1.5" value="1" step="0.25"><b>快</b>
                    </div>
                    <input class="play_btn icon-play is-lock" id="playBtn2" type="button">
                  </div>
                  <div class="aside-speedbox is-play3">
                    <div class="speed-point"></div>
                    <div class="speed"><b class="speed-left">慢</b>
                      <input type="range" min="0.5" max="1.5" value="1" step="0.25"><b>快</b>
                    </div>
                    <input class="play_btn icon-play" id="playBtn3" type="button">
                  </div>
                </div>
              </div>
              <div class="aside-below">
                <div class="ArticleInfo-box">
                  <div class="ArticleInfo1 type2">
                    <div class="classification_btn"><span id="class_f"> </span>
                      <div class="classification">
                        <ul>
                          <li>專業通則</li>
                          <li>生活</li>
                          <li>社交</li>
                          <li>通識</li>
                          <li>自我意識</li>
                          <li>基礎養成</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="ArticleInfo2"> 
                  </div>
                </div>
                <div class="article-vbox">
                  <div class="Article_pic"></div>
                  <!-- img ^v video box-->
                  <div class="is-first-start" id="y-box"></div><img class="y-start" src="images/y_start.png">
                  <div class="y-small"></div>
                </div>
              </div>
            </aside>
            <article>
              <div id="stepBlockOuter">
                <div id="stepBlockBox">
                  <div id="stepBlock1"></div>
                  <div id="stepBlock2"></div>
                  <div id="stepBlock3"></div>
                </div>
              </div>
            </article>
          </section>
          <div class="tranglationBody">
            <input class="close_btn" type="button">
            <div class="translation_Font" id="translation_Font1"></div>
            <div class="translation_list" id="vocabulary">
            </div>
            <div class="translation_Font" id="translation_Font2"></div>            
            <div class="translation_list" id="phrase">
            </div>            
            <div class="translation_list2">
              <div class="colbox">
                <div class="colbox-prefix">T</div>
                <div class="colbox-item">
                  <div class="colbox-abovebox">
                    <div class="colbox-abovebox-text">transparent</div><a class="colbox-abovebox-del icon-del-c" href="#"></a>
                  </div>
                  <div class="colbox-underbox">
                    <div class="colbox-underbox-memo">學員的筆記寫在這</div>
                    <div class="colbox-underbox-placeholder">輸入中文解釋</div>
                    <div class="colbox-underbox-editbox">
                      <input class="colbox-underbox-input" type="text"><a class="colbox-underbox-ok" href="#">確定</a>
                    </div>
                  </div>
                </div>
                <div class="colbox-item">
                  <div class="colbox-abovebox">
                    <div class="colbox-abovebox-text">teacher</div><a class="colbox-abovebox-del icon-del-c" href="#"></a>
                  </div>
                  <div class="colbox-underbox">
                    <div class="colbox-underbox-memo"> </div>
                    <div class="colbox-underbox-placeholder">輸入中文解釋</div>
                    <div class="colbox-underbox-editbox">
                      <input class="colbox-underbox-input" type="text"><a class="colbox-underbox-ok" href="#">確定</a>
                    </div>
                  </div>
                </div>
                <div class="colbox-item">
                  <div class="colbox-abovebox">
                    <div class="colbox-abovebox-text">ticket</div><a class="colbox-abovebox-del icon-del-c" href="#"></a>
                  </div>
                  <div class="colbox-underbox">
                    <div class="colbox-underbox-memo">學員的 ticket 筆記寫在這</div>
                    <div class="colbox-underbox-placeholder">輸入中文解釋</div>
                    <div class="colbox-underbox-editbox">
                      <input class="colbox-underbox-input" type="text"><a class="colbox-underbox-ok" href="#">確定</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="funbar-box">
        <div class="wrapper">
          <div class="wrapper-left"></div>
          <div class="wrapper-right-f1">
            <div class="wrapper-right-f2">
              <ul class="funbar step-fnbar1">
                <li class="funbar-item active is-item-language">
                  <div class="controlbox"><b class="controlbox-item">中+EN</b><i class="controlbox-item">EN</i></div>
                </li>
                <li class="funbar-item is-item-read active" data-value="1">
                  <div class="controlbox"><b class="controlbox-item">老師講解</b><i class="controlbox-item">英文朗讀</i></div>
                </li>
                <li class="funbar-item is-item-arttype"><a class="funbar-btn" href="#">原文分析</a>
                  <ul class="typebox">
                    <li class="typebox-item active" data-arttype="muted">長句分解</li>
                    <li class="typebox-item" data-arttype="strong">加強描述</li>
                    <li class="typebox-item" data-arttype="title">加強主題</li>
                  </ul>
                </li>
                <li class="funbar-item is-item-memo"><a class="funbar-btn funbar-memobox do-insert-id" href="#">便利貼</a></li>
                <li class="funbar-item is-item-group"><a class="funbar-btn funbar-phrase" href="#">單字片語</a></li>
                <li class="funbar-item"><a class="funbar-btn funbar-collection" href="#">單字收錄</a></li>
              </ul>
              <ul class="funbar step-fnbar2 is-not-ready">

                <!--li class="funbar-item is-item-audiotype is-not-ready"-->
                <li class="funbar-item is-item-audiotype">
                  <div class="funbar-btn">全文播放
                    <div class="audio-icon"></div>
                  </div>
                  <ul class="typebox2" id="is-play-part" data-value="1">
                    <li class="typebox-item active" data-audiotype="1">原音</li>
                    <li class="typebox-item" data-audiotype="4">錄音</li>
                    <li class="typebox-item" data-audiotype="5">原音+錄音</li>
                  </ul>
                  <div class="funbar-update">重新上傳</div>
                </li>                
              </ul>
            </div>
          </div>
        </div>
      </div><a class="icon-how" href="#">
        <div class="icon-bulb"></div>
        <div class="icon-how-text">Tips</div></a>
    </div>
    <!--
    <div class="lb-mask-final"></div>
    <div class="lb is-lb-final">
      <div class="lb-box"><img class="lb-final-img" src="./images/congrats.png">
        <h2 class="lb-final-title">表現真的太棒！建議一週至少要完成三到七篇文章的學習驗收，才能大幅提升自己的英文實力。</h2>
        <div class="lb-final-box"><a class="lb-final-item" href="#" style="background-image: url(./images/galxy.jpg)">
            <div class="lb-final-text">觀看成效</div></a><a class="lb-final-item" href="#" style="background-image: url(./images/galxy.jpg)">
            <div class="lb-final-text">學下一篇</div>
            <div class="lb-final-art">特斯拉駕駛落橋身亡特斯拉駕駛落橋身亡</div></a></div>
      </div>
    </div>
    <!-->
	<script>
		// skin ( 必需寫在下方 ) v
		var template;
		const skinSource = new Date().getTime()%2;
    skinSource === 0 ? template = 'skin1' : template = 'skin2';
    
    if(template=='skin1'){
      var tamplate='a';
    }else{
      var tamplate='b';
    }

		$('#stepBox').addClass(template);
		$('.is-lb-final').addClass(template);
	</script>

  	<!-- ^ HTML END ^ -->
</body>

</html>
<script>

var dd='<%=now()%>'
var xml='<%=xml%>'
var Sample_classify='<%=Sample_classify%>'

jquery_en('<%=xml%>');
</script>
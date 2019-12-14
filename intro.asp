<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>  
<!-- #include virtual="include/DBConnection.asp"-->
<!-- #include virtual="include/functions.asp"-->
<%   
	response.Buffer = true   
	session.CodePage = 65001   
	response.Charset = "utf-8"
	
	if mobile_chk()="Mobile" then
		if Request.ServerVariables("QUERY_STRING")<>"" then
			QUERY_STRING="?"&Request.ServerVariables("QUERY_STRING")
		else
			QUERY_STRING=""
		end if	
		Response.Redirect "mobile.asp"&QUERY_STRING
	end if


	ADCode() '通路Code
	On Error Resume Next '下一行程式是否會發生Exception'
	rid=Int(request("rid"))
	If Err.Number <> 0 Then '發生Exception'
		rid="0"
	End If
	On Error GoTo 0

	if  rid<>"0" then
		Sql_str=" and ref_id='"&rid&"'"
	else
		Sql_str=""
	end if

	sql="SELECT  a.*, b.xml_file2,b.filename4,ch_subject,en_subject FROM  Sample AS a INNER JOIN  news AS b ON a.ref_id = b.indx WHERE  (a.tables = 'Learning') and datediff(d,a.sdate,getdate())>=0 and datediff(d,a.edate,getdate())<=0 and a.ready=1 "&Sql_str&" order by indx"
	rs.open sql,connection,1,3
	if not rs.eof then
	    ref_id=rs("ref_id")	
		og_title=rs("title")
		og_description=rs("description")
		og_url=rs("url")
		og_image=rs("image")
		Sample_classify=rs("Sample_classify")
		tamplate=rs("tmplate")
		xml=rs("xml_file2")
		Youtube=rs("Youtube")
		mp3="mp3-8-1-"&ref_id&".mp3"
		ch_subject=rs("ch_subject")
		en_subject=rs("en_subject")
	end if
	rs.close


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

%>

<!DOCTYPE html>
<html lang="zh">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name='description' content='<%=og_description%>' />
	<meta property='og:title' content='<%=og_title%>' />
	<meta property="og:type" content="website" />
	<meta property='og:url' content='<%=og_url%>' />
	<meta property='og:image' content='<%=og_image%>' />
	<meta property='og:description' content='<%=og_description%>' />
	<meta property="fb:app_id" content="665673953932390" />
	<link rel="icon" href="./images/favicon.ico" type="image/ico" />
	<title>FUNDAY數位英語學堂</title>

	<link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' />
	<link rel="stylesheet" href="css/step1.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Playfair+Display&amp;display=swap">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abril+Fatface&amp;display=swap">


	<script src="js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="../../../jquery/jquery-1.10.4.ui.min.js"></script>	
	<script type="text/javascript" src="Dr.eye/Dre.js"></script>
	<script src="../../library/js/lightBoxDIY-V2.js"></script>
	<script src="../../js/Uinfo.js"></script>   		
	<script src='./js/player.js'></script>
	<script src='./js/page.js'></script>
	<script src='./js/main.js'></script>
	<script src='../../../../Funfa/Fa.js'></script>
	<script>
		var tamplate='<%=tamplate%>';
    var videoId = '<%=Youtube%>';
    var lbUrl = 'https://www.youtube.com/embed/h1I5JM16N0c';
    let memoJSON = JSON.parse('[{"id":"memo1","text":"msg%201%0Afloor2%0Afloor3%0AASDFIASJEFIASE%0A","basicid2":"Nct1-52","basicid1":"ct1-52"},{"id":"memo2","text":"msg%202","basicid2":"Nt15-19","basicid1":"t15-19"},{"id":"memo3","text":"eason%20success%0Aya%7E%7E","basicid2":"Nct1-76","basicid1":"ct1-76"}]');
    let memoUpdate = '';
    $.get('step1.html', function(html){
      $('article .mask').html(html);
    });
	</script>		
	<script src="js/pc.js" type="text/javascript"></script>
  <script src="js/memobox_methods2.js"></script>
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
  <div class="topbar">
      <div class="wrapper">
        <div class="wrapper-left"><a class="topbar-back-btn" href="#">
            <div class="icon-arrowleft"></div>返回</a></div>
        <div class="wrapper-right-f1">
          <div class="wrapper-right-f2">
            <ul class="topbar-step">
              <li class="topbar-step-item active">
                <div class="topbar-num">1</div>
                <div class="topbar-text">認識本文</div>
                <div class="icon-correct"></div>
              </li>
              <li class="topbar-step-item">
                <div class="topbar-num">2</div>
                <div class="topbar-text">加強記憶</div>
                <div class="icon-correct"></div>
              </li>
              <li class="topbar-step-item is-step3">
                <div class="topbar-num open-btn">3</div>
                <div class="topbar-text open-btn">學習驗收</div>
                <div class="icon-pink open-btn"></div>
                <div class="topbar-scort-outer">
                  <ul class="topbar-scort">
                    <li class="topbar-scrot-item">
                      <div class="topbar-text">理解力測驗</div>
                      <div class="topbar-s">100<span>分</span></div>
                      <div class="icon-correct"></div>
                    </li>
                    <li class="topbar-scrot-item">
                      <div class="topbar-text">聽力測驗</div>
                      <div class="topbar-s">89<span>分</span></div>
                      <div class="icon-correct"></div>
                    </li>
                    <li class="topbar-scrot-item">
                      <div class="topbar-text">克漏字測驗</div>
                      <div class="topbar-s">77<span>分</span></div>
                      <div class="icon-correct"></div>
                    </li>
                  </ul>
                </div>
                <div class="icon-correct"></div>
              </li>
            </ul>
            <div class="topbar-icon"><a class="topbar-icon-item" href="#">
                <div class="icon-favorite"></div></a><a class="topbar-icon-item" href="#">
                <div class="icon-print"></div></a></div>
          </div>
        </div>
      </div>
    </div>
    <div class="funbar-block">
      <div class="wrapper">
        <div class="wrapper-left"></div>
        <div class="wrapper-right-f1">
          <div class="wrapper-right-f2">
            <ul class="funbar">
              <li class="funbar-item active is-ench">
                <div class="controlbox"><b class="controlbox-item">中+EN</b><i class="controlbox-item">EN</i></div>
              </li>
              <li class="funbar-item active" id="control-1" data-value="1">
                <div class="controlbox"><b class="controlbox-item">老師講解</b><i class="controlbox-item">英文朗讀</i></div>
              </li>
              <li class="funbar-item is-item-memo"><a class="funbar-btn funbar-memobox active" href="#">便利貼</a></li>
              <li class="funbar-item is-item-group"><a class="funbar-btn funbar-phrase" href="#">單字片語</a></li>
              <li class="funbar-item"><a class="funbar-btn funbar-collection" href="#">單字收錄</a></li>
            </ul>
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
                <div class="aside-above-sub-en">Powerful winds blew the smoke to the city and darkened the sky.</div>
                <div class="aside-above-sub-ch">強風將濃煙帶到城市，使天空變黑。</div>
                <div class="aside-speedbox">
                  <div class="speed-point"></div>
                  <div class="speed"><b class="speed-left">慢</b>
                    <input id="Speed_range" type="range" min="0.5" max="1.5" value="1" step="0.25"><b>快</b>
                  </div>
                  <input class="play_btn" type="button">
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
                <div class="Article_pic"><img src="./images/galxy.jpg"></div>
                <!-- img ^v video box-->
                <div class="is-first-start" id="y-box"></div><img class="y-start" src="images/y_start.png">
                <div class="y-small"></div>
              </div>
            </div>
          </aside>
          <article>
            <div class="mask">
              
            </div>
          </article>
        </section>
        <div class="tranglationBody">
          <input class="close_btn" type="button">
          <div class="translation_Font"></div>
          <div class="translation_list">
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
    </div><a class="icon-how" href="#"></a>
  <!-- ^ HTML END ^ -->
</body>

</html>
<script>
var dd='<%=now()%>'
var xml='<%=xml%>'
var Sample_classify='<%=Sample_classify%>'
$.get("join.asp?rid=<%=rid%>",function(data){ //初始將tool.htm" include
	$("body").append(data);
}); 
jquery_en('<%=xml%>');
</script>
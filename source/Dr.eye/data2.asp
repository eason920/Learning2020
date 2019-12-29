<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001" %> 
<!-- #include virtual="include/functions.asp"-->  
<%
   response.Buffer = true
   session.Codepage =65001
   response.Charset = "utf-8" 
   
private function getBody(surl) 
on error resume next 
dim xmlHttp 

set xmlHttp=createobject("MSxml2.ServerxmlHTTP") 
xmlHttp.setTimeouts 10000,10000,10000,30000 
xmlHttp.open "GET",surl,false 
xmlHttp.setRequestHeader "Content-Type", "text/html;charset=utf-8"

xmlHttp.send 
if xmlHttp.readystate=4 then 

 getBody=unescape(xmlhttp.responseText)

 else 
 getBody="" 
end if 

if Err.Number<>0 then 
sError=Err.Number 
Err.clear 
else 
sError="" 
end if 
set xmlHttp=nothing 
end function 


q=request("str")
sign=request("key")
FirmID = "B0005" 
salt="20180508180000"
secretkey="14c6e8aea71936e21479"
url="http://api.bestaword.com/Dict.aspx"
Parameter="q="&q&"&FirmID="&FirmID&"&ContentID=DIC0025&type=html&salt="&salt&"&sign="&sign

urlStr=getBody(url+"?"+Parameter)
urlStr=replace(urlStr,"<script src=""js/jquery-1.8.3.min.js"" type=""text/javascript""></script>","<script src=""../../jquery-1.7.1.min.js"" type=""text/javascript""></script><link href=""https://fonts.googleapis.com/css?family=Lora"" rel=""stylesheet""><link href=""https://fonts.googleapis.com/css?family=Engagement"" rel=""stylesheet"">")
urlStr=replace(urlStr,"<a href=""javascript:$('#mp3_audio').get(0).play();"" border=""0""><img src=""css/images/img_02.png"" style=""vertical-align: bottom;margin-bottom:6px"" id=""mp3_audio_link"" name=""mp3_audio_link""></a>","")
urlStr=replace(urlStr," src=""css/Images/hideBtn.png"" ","")


removeStr=split(urlStr,"<script type=""text/javascript"">")

urlStr=removeStr(0)+"</form></div></body></html>"

if mobile_chk()="PC" then
   urlStr=replace(urlStr,"css/fedword_pad.css","css/main.css")
   urlStr=replace(urlStr,"<link href=""css/main.css"" rel=""stylesheet"" type=""text/css"" />","<link href='css/main.css' rel='stylesheet' type='text/css' /><link href='css/pc_layout_"&request("tamplate")&".css' rel='stylesheet' type='text/css' />")
   'urlStr=replace(urlStr,"css/fedword_pad.css","css/pc_layout_"&request("tamplate")&".css?dd="&now)
else
	urlStr=replace(urlStr,"css/fedword_pad.css","css/main-mb.css?dd="&now)
    urlStr=replace(urlStr,"<link href=""css/main-mb.css"" rel=""stylesheet"" type=""text/css"" />","<link href='css/main-mb.css' rel='stylesheet' type='text/css' /><link href='css/mb_layout_b.css' rel='stylesheet' type='text/css' />")  	
end if

response.write urlStr

response.write "<span onclick='parent.RemoveDr()' style='position:fixed; top :5px;float:right;right:0px;cursor: pointer; ' title='關閉' ><img src='./images/close.png' style='display:inline;' align='absmiddle'></span>"


%>
<script>
function show_hide_item(){}
parent.$('#BGLoading').attr('class','');
</script>
<% 
' 當使用者點擊「更多」時，導致焦點移到 iframe 內，所以需要在這裡埋入偵測 ESC 按鍵
' 當使用者按下 ESC 鍵時，移除 Dr. Eye 單字註解框
%>
<script>
$(document).keydown(function(e){
	e.keyCode = e.keyCode || e.which;
	if(e.keyCode == 27){
		parent.RemoveDr();
	}
});
</script>
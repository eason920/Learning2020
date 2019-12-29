<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001" %> 
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
FirmID = "B0013" 
salt="20180508180000"
secretkey="82add88e914f73643b7f"
url="http://61.220.79.170/Dict.aspx"
Parameter="q="&q&"&FirmID="&FirmID&"&ContentID=DIC0025&type=html&salt="&salt&"&sign="&sign

response.redirect url+"?"+Parameter
'response.write getBody(url+"?"+Parameter)



%>


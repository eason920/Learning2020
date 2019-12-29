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
FirmID = "B0005" 
salt="20180508180000"
secretkey="14c6e8aea71936e21479"
url="http://api.bestaword.com/Dict.aspx"
Parameter="q="&q&"&FirmID="&FirmID&"&ContentID=DIC0025&type=xml&salt="&salt&"&sign="&sign

urlStr=getBody(url+"?"+Parameter)

'response.write urlStr


  '      testXML = urlStr

	      
'	    set xmldoc = Server.CreateObject("MSXML2.DOMDocument")  
'	    xmldoc.loadXML(testXML)  
	      
'Set objNode=xmldoc.documentElement.selectSingleNode("entry")
'response.write  objNode.selectSingleNode("@contentid").Text
'nCntChd=objNode.ChildNodes.length-1

'for i=0 to nCntChd
'    set objAtr=objNode.ChildNodes.item(i)
'    nCntAtr=objAtr.Attributes.length-1

'     for j=0 to nCntAtr        
'        response.write objAtr.Attributes.item(j).Name & "：" & objAtr.Attributes.item(j).Text & "<br>"
'        if objAtr.Attributes.item(j).Text="reference" then
'          a=objAtr.Attributes.item(j).getAttribute("row-value")
'          response.write a

'        end if
'    next

'next

if instr(urlStr,"reference")>0 and instr(urlStr,"interpretation")<=0 then
 a=split(urlStr,"<row-value att=""path"">")
 a2=split(a(1),"</row-value>")
 if instr(a2(0),"CDATA") > 0 then
        a3 = split(a2(0),"[")
        word = mid(a3(2),1,GetLen(LCASE(a3(2))))
        response.write word
        response.write "<script>parent.DrDate1('"&word&"')</script>"
    else
        response.write a2(0)
        response.write "<script>parent.DrDate1('"&a2(0)&"')</script>"
    end if
 response.end()
else
 response.write "<script>parent.DrDate1('"&q&"')</script>"
end if

'找出文字長度
Function GetLen(word)
    GetLen = 0
    For i = 1 To len(word)
        if asc(mid(word,i,1)) < 97 or asc(mid(word,i,1)) > 122 then
            GetLen = i - 1
            exit for
        end if
    Next
End Function 

%>




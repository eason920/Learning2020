<!-- #include virtual="include/DBConnection.asp"--> 
<%

response.Buffer = true   
session.CodePage = 65001   
response.Charset = "utf-8"  

mindx=Get_mid()  '--使用者ID
cindx=Get_cid()  '--customer ID


indx=request("xml")
x=1
Word_str=""

sqls="select * from member_WordCard where ref_id='"&indx&"' and customer_id='"&cindx&"' and member_id='"&mindx&"' order by orders desc"
set rs2=connection2.execute(sqls)
while not rs2.eof 
  Word_str=Word_str&"<div class='colbox-item'>"
  Word_str=Word_str&"<div class='colbox-abovebox'>"
  Word_str=Word_str&"<div class='colbox-abovebox-text'>"&rs2("En_Word")&"</div><a class='colbox-abovebox-del icon-del-c' href='#' onclick=Dr_StarjoinM("&indx&",'"&rs2("En_Word")&"','D',"&rs2("orders")&")></a>"
  Word_str=Word_str&"</div>"
  Word_str=Word_str&"<div class='colbox-underbox'>"

  if rs2("Ch_Word")<>"" then

    Word_str=Word_str&"<div class='colbox-underbox-memo' onclick=$(this).hide();$('#key2"&rs2("orders")&"').show();>"&rs2("Ch_Word")&"</div>"
    Word_str=Word_str&"<div class='colbox-underbox-editbox' id='key2"&rs2("orders")&"'>"
    Word_str=Word_str&"<input class='colbox-underbox-input' type='text' name='Chword_"&rs2("orders")&"' id='Chword_"&rs2("orders")&"' value='"&rs2("Ch_Word")&"'><a class='colbox-underbox-ok' href='#' onclick=Dr_StarjoinM("&indx&",'"&rs2("En_Word")&"','M',"&rs2("orders")&")>確定</a>"
    Word_str=Word_str&"</div>"

  else
  
    Word_str=Word_str&"<div class='colbox-underbox-placeholder' id='key"&rs2("orders")&"' onclick=$(this).hide();$('#key2"&rs2("orders")&"').show();>輸入中文解釋</div>"
    Word_str=Word_str&"<div class='colbox-underbox-editbox' id='key2"&rs2("orders")&"'>"
    Word_str=Word_str&"<input class='colbox-underbox-input' type='text' name='Chword_"&rs2("orders")&"' id='Chword_"&rs2("orders")&"' ><a class='colbox-underbox-ok' href='#' onclick=Dr_StarjoinM("&indx&",'"&rs2("En_Word")&"','M',"&rs2("orders")&")>確定</a>"
    Word_str=Word_str&"</div>"


  end if

  Word_str=Word_str&"</div>"
  Word_str=Word_str&"</div>"
  x=x+1
  rs2.movenext

wend 
rs2.close

%>

 <%=Word_str%> 
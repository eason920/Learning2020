<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>  

<!-- #include virtual="include/DBConnection.asp"--> 
<%
response.Buffer = true   
session.CodePage = 65001   
response.Charset = "utf-8"  

mindx=Get_mid()  '--使用者ID
cindx=Get_cid()  '--customer ID



memo=request("memo")
ref_id=request("ref_id")

sql = "select indx from  member_memobox where ref_id='"&ref_id&"' and customer_id='"&cindx&"' and member_id='"&mindx&"' "
set rs=connection2.execute(sql)
if rs.eof then
	sql = "insert into member_memobox (customer_id,member_id,ref_id,memo)values(?,?,?,?)"
	Set cmd = Server.CreateObject("ADODB.Command")
	With cmd
	.ActiveConnection = connection2
	.CommandText = sql
	.Parameters(0).value = cindx
	.Parameters(1).value = mindx
	.Parameters(2).value = ref_id
	.Parameters(3).value = memo
	End With
	set rs=cmd.execute()
else
    sql1="update member_memobox set memo=?,mdate=? where ref_id=? and customer_id=? and member_id=? "   
	Set cmd2 = Server.CreateObject("ADODB.Command")
	With cmd2
	.ActiveConnection = connection2
	.CommandText = sql1
	.Parameters(0).value = memo
	.Parameters(1).value = now()
	.Parameters(2).value = ref_id
	.Parameters(3).value = cindx
	.Parameters(4).value = mindx			
	End With
	cmd2.execute()
end if



%>

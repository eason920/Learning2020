[ part1 ]
<%
i=0
For each node in nodes
	Response.Write  "<div class='english'>" & replace(node.getAttribute("content"),"**","")& "<input type='button' class='read_btn'></div>" & vbCrLf
	Response.Write  "<div class='Chinese'>" & replace(nodes2(i).getAttribute("content"),"**","")& "</div><p></p>" & vbCrLf
	i=i+1
Next
%>

[ part2 ]
<%
i=0
For each node in nodes
	Response.Write  "<div class='english'>" & replace(node.getAttribute("content"),"**","")& "<input type='button' class='read_btn'></div>" & vbCrLf
	Response.Write  "<div class='Chinese'>" & replace(nodes2(i).getAttribute("content"),"**","")& "</div><p></p>" & vbCrLf
	i=i+1
Next
%>
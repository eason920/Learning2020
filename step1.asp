<a class="icon-like" href="#">883</a><a class="icon-refresh" href="#"></a>
<!-- 內文區塊-->
<div class="article" style="display:none;">
  <%
              i=0
              For each node in nodes
                Response.Write  "<div class='english'>" & replace(node.getAttribute("content"),"**","")& "<input type='button' class='read_btn'></div>" & vbCrLf
                Response.Write  "<div class='Chinese'>" & replace(nodes2(i).getAttribute("content"),"**","")& "</div><p></p>" & vbCrLf
                i=i+1
              Next
              %>
</div>
<div class="article2">
  <%
              i=0
              For each node in nodes
                Response.Write  "<div class='english'>" & replace(node.getAttribute("content"),"**","")& "<input type='button' class='read_btn'></div>" & vbCrLf
                Response.Write  "<div class='Chinese'>" & replace(nodes2(i).getAttribute("content"),"**","")& "</div><p></p>" & vbCrLf
                i=i+1
              Next
              %>
</div>
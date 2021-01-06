
var milisec=0 ;
var seconds=0;
var minute=0;
var flag=0;
var xhr; 
var ctime=0;
var mouseX;     //- this.offsetLeft;
var mouseY;     //- this.offsetTop;
var Mminute=0;  //十于分鐘後每十分鐘計數,滑鼠有動歸零
var Nminute=0; //前十分鐘後開始判斷不為X則送出計時
var Xminute=0; //前十分鐘計數
var NmouseX=0;     //- this.offsetLeft;
var NmouseY=0;     //- this.offsetTop;
var T_tag='';

 function sajax(id,tag) { 
 try
    {
   // Firefox, Opera 8.0+, Safari
    xhr=new XMLHttpRequest();
    }
 catch (e)
    {

  // Internet Explorer
   try
      {
      xhr=new ActiveXObject("Msxml2.XMLHTTP");
      }
   catch (e)
      {

      try
         {
         xhr=new ActiveXObject("Microsoft.XMLHTTP");
         }
      catch (e)
         {
         alert("您的瀏覽器不支援Ajax");
         return false;
         }
      }
    }

 rajax(id,tag);
    }

function rajax(id,tag){
      //xhr.onreadystatechange = getData;
      if(parseInt(tag)==4){
	    var tagstr="M_teaching"
	  }else if(parseInt(tag)==5){
	    var tagstr="features"
	  }else if(parseInt(tag)==6){
	    var tagstr="journal"
	  }else if(parseInt(tag)==7){
	    var tagstr="dialogize"
	  }else if(parseInt(tag)==8){
	    var tagstr="grammar"	
	  }else{
		var tagstr="M_news"  
	  }
    var typex=parseInt(tag)
    //console.log(id)
      xhr.open("post","../../../time_record.asp?indx="+id+"&tag="+tagstr+"&mtype="+typex,true);  
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=big5');
      value1 = minute;
      xhr.send("minute=" + value1);	
}

function display(id,tag){
  stopdisplay()
  
  if (milisec>=9){
	milisec=0;
	seconds+=1;
   if(seconds>=30){
	 seconds=0;
	 minute=1;
   
	if(parseInt(Xminute)<=30){ 
	   sajax(id,tag);
	   Xminute=Xminute+1;
	}else{
	
	   Mminute=Mminute+1;	
	  
	  if(Nminute!='x' && parseInt(Mminute)<30){
	   sajax(id,tag);
	   Nminute='x';
	  }else if(parseInt(Mminute)>=30){
		alert('網站停滯過久 \n 請重新登入');
		location.href='../member/logout.asp';
	  }
	
	}
  
   }
   
  }



milisec+=1;
T_tag=setTimeout("display("+id+","+tag+")",100)

}

function stopdisplay(){ 
clearTimeout(T_tag) 
} 
 
   function getMousePosition(e){
        var x = 0, y = 0;
        var e = e || window.event;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else if (e.clientX || e.clientY) {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop  + document.documentElement.scrollTop;
        }
        return { 'x': x, 'y': y };
    }

    $(document).ready(function(){
        $('body').mousemove(function(e){
            var o =  $(this).offset();
            var oX = o.left;
            var oY = o.top;        
            var cX = oX + $(this).width()/2;
            var cY = oY + $(this).height()/2;
            pos = getMousePosition(e);
             mouseX = pos.x;     //- this.offsetLeft;
             mouseY = pos.y;     //- this.offsetTop;
           // $('#lblMouseXY').html(mouseX + ',' + mouseY);
		   
           if(parseInt(Mminute)<30 && Mminute!='x'){
			 if(parseInt(mouseX)!=parseInt(NmouseX) && parseInt(mouseY)!=parseInt(NmouseY) ){
			  NmouseX=mouseX;
			  NmouseY=mouseY;
			  Mminute=0;
			  Nminute=0;
			 }
		   }
		   
		   
        });
    });

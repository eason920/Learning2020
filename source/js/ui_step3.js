const nua = navigator.userAgent;

$(function(){
	const $parent = $('#stepBlock3');
	
	const ready = function(){
		if( $parent.html() != '' ){
			clearInterval(sid);
			// EVENT v
			for(let i = 1;i<=3;i++){
				$('.s3ex' + i +'-submitbox .s3-submit').click(function(){
					$('#ex'+i).removeAttr('class');
				});
			};

			$('#stepBlock3 .share-next').click(function(){
				const index = $(this).parent().index() + 1;
				const height = $parent.height();
				const top = index * height * -1
				const $play3 = $('.aside-speedbox.is-play3');
				$('#exBox').animate({top});
				
				if(index == 2){
					$play3.addClass('is-lock');
				};
			});


			$('body').on('click', '.s3ex1-item-m label', function(){
				$(this).parent().parent().siblings().find('.ex1-dot').remove();
				$(this).find('.s3ex1-check').append(
					$('<div>', {'class': 'ex1-dot'})
				)
			});
		}
	};

	let sid = setInterval(ready, 50)
	
});

function blank(ans,id){
	var a=ans.split(";");
	var a1=ans;
	var a2='';
	var a3='';
	var blank='',end1='';
	if(left(a2,1)==" "){
	  blank="　";
  
	  if(parseInt(a2.length)-1>=1){
		for(var q=1;q<=parseInt(a2.length)-1;q++)
		  blank=blank+"＊";
	  }else{
		for(var q=1;q>=parseInt(a2.length)-1;q--)
		  blank=blank+"＊";
	  }
	  
	  blank='<INPUT type="text" name="EX2answer'+(id+1)+'" id="EX2answer'+(id+1)+'" placeholder="'+blank+'" p_r_o_1="'+parseInt(a2.length)+'" p_r_o_2="width: 85px;">'

	  blank=a1.replace(a2,blank);
  
	}
  
	if(right(a2,1)==" "){
	  end1="　";
	  
	  if(parseInt(a2.length)-1>=1){
		for(var q=1;q<=parseInt(a2.length)-1;q++)
		  blank=blank+"＊";
	  }else{
		for(var q=1;q>=parseInt(a2.length)-1;q--)
		blank=blank+"＊";
	  }
	  blank='<INPUT type="text" name="EX2answer'+(id+1)+'" id="EX2answer'+(id+1)+'" placeholder="'+blank+'" p_r_o_1="'+parseInt(a2.length)+'" p_r_o_2="width: 85px;">'
	
	  blank=al.replace(a2,'<span>'+blank+'</span>'+'<span>'+end1+'</span>');
	
	}
  
	if(a1.indexOf(" ")!=-1){	
	
	  if(a3=="" && a2!=""){
	  }else{
		blank=blank+"("+a3+")";
	  }
			
	}else{
		
	  for(var q=2;q<=parseInt(a1.length)-1;q++){
		blank=blank+"＊";
	  }
	  //console.log(blank)
	  blank='<INPUT  name="EX2answer'+(id+1)+'" id="EX2answer'+(id+1)+'" placeholder="'+blank+'" p_r_o_1="'+parseInt(a1.length-1)+'" p_r_o_2="width: 85px;">'
	  
	  //blank=al.replace(a1,'<span>'+blank+'</span>'+'<span>'+end1+'</span>');
	  blank='<span>'+left(a1,1)+'</span>' + '<span>'+blank+'</span>' + '<span>'+right(a1,1)+'</span>'

	}
	return blank;
  
  
}

function blank_cloze(j,ans){
	var a=ans.split(";");
	var a1=a[0];
	var a2=a[1];
	var a3=a[2];
	var blank='',end1='';


	if(left(a2,1)==" "){
		blank="　";
		
		if(parseInt(a2.length)-1>=1){
			for(var q=1;q<=parseInt(a2.length)-1;q++)
			blank=blank+"＊";
		}else{
			for(var q=1;q>=parseInt(a2.length)-1;q--)
			blank=blank+"＊";
		}
		
		
		blank=a1.replace(a2,"<font  id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span>');
	
	}
	
	if(right(a2,1)==" "){
		end1="　";
	
		if(parseInt(a2.length)-1>=1){
			for(var q=1;q<=parseInt(a2.length)-1;q++)
				blank=blank+"＊";
		}else{
			for(var q=1;q>=parseInt(a2.length)-1;q--)
				blank=blank+"＊";
		}
	
	
		blank=a1.replace(a2,"<font   id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span>');
	
	}
	
	if(a1.indexOf(" ")!=-1){	
	
		if(a3=="" && a2!=""){
		}else{
			blank="<font  id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span>';
		}
			
	}else{
	
		for(var q=2;q<=parseInt(a1.length)-1;q++)
			blank=blank+"＊";
			
		blank="<font id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span>' ;
	}
	

	return blank;
}

function blank_cloze2(j,ans){
	var a=ans.split(";");
	var a1=a[0];
	var a2=a[1];
	var a3=a[2];
	var blank='',end1='';


	if(left(a2,1)==" "){
		blank="　";
		
		if(parseInt(a2.length)-1>=1){
			for(var q=1;q<=parseInt(a2.length)-1;q++)
			blank=blank+"＊";
		}else{
			for(var q=1;q>=parseInt(a2.length)-1;q--)
			blank=blank+"＊";
		}
		
		
		blank=a1.replace(a2,"<font  id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span>');
	
	}
	
	if(right(a2,1)==" "){
		end1="　";
	
		if(parseInt(a2.length)-1>=1){
			for(var q=1;q<=parseInt(a2.length)-1;q++)
				blank=blank+"＊";
		}else{
			for(var q=1;q>=parseInt(a2.length)-1;q--)
				blank=blank+"＊";
		}
	
	
		blank=a1.replace(a2,"<font   id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span>');
	
	}
	
	if(a1.indexOf(" ")!=-1){	
	
		if(a3=="" && a2!=""){
		}else{
			blank="<font  id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span>';
		}
			
	}else{
	
		for(var q=2;q<=parseInt(a1.length)-1;q++)
			blank=blank+"＊";
			
		blank="<font id='ex_"+j+"' ><div class='s3ex3-ipt'>&nbsp;&nbsp;("+parseInt(j+1)+')&nbsp;&nbsp;</div></font><span  id="exj_'+j+'"></span><div class="s3-ansbox"><span class="s3-false">'+ans+'</span><span class="s3-true">trueAnswer</span></div>' ;
	}
	

	return blank;
}


function cloze_clk(id){
	if(ck<=$(en).find("word_answer").text().split("\n").length-1){	 
		var idchk=$("#ans2_"+id).html();
		if(idchk.indexOf('(')=='-1'){
			$("#ex_"+ck).hide()	 
			$("#exj_"+ck).html('<div class="s3ex3-ipt s3-selected">&nbsp;&nbsp;'+$("#ans_"+id).text()+' &nbsp;&nbsp;</div>')	  
			$("#cloze_ans").val($("#cloze_ans").val()+$("#ans_"+id).text()+";")
			$("#ans2_"+id).html('('+parseInt(ck+1)+')')
			ck++;
		}else if(idchk.indexOf('(')=='0'){
			alert('不得重覆選擇');					  
		}
	}else{
		alert('finish');
	}
}

////////////////////////////////////// EX1
function EX1(){
	var Str='';
	var ans=$(en).find("en_question").text().split("\n"),Str,ans2=$(en).find("ch_question").text().split("\n"),answer=$(en).find("answer").text().split("\n"),op1=$(en).find("op1").text().split("\n"),op2=$(en).find("op2").text().split("\n"),op3=$(en).find("op3").text().split("\n"),op4=$(en).find("op4").text().split("\n"),op1_c=$(en).find("op1_c").text().split("\n"),op2_c=$(en).find("op2_c").text().split("\n"),op3_c=$(en).find("op3_c").text().split("\n"),op4_c=$(en).find("op4_c").text().split("\n"),y=0,ii=0,Str='',clock;

	Str='<div class="s3ex1-box">'

	for(j=0;j<ans.length-1;j++){		
		ii++;
		ans[j]=ans[j].replace("`","’");
		
		Str=Str.replace("`","’");
		Str=Str+'<div class="s3ex1-block">'
		Str=Str+'<div class="s3ex1-item is-title">'
		Str=Str+'<div class="s3ex1-item-l">'
		Str=Str+'<div class="s3ex1-icon"></div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-m">'+(j+1)+'.</div>'
		Str=Str+'<div class="s3ex1-item-r">'
		Str=Str+'  <div class="s3ex1-item-en">'+ans[j]+'</div>'
		Str=Str+'</div>'
		Str=Str+'</div>'		
		Str=Str+'<div class="s3ex1-item">'
		Str=Str+'<div class="s3ex1-item-l">'
		Str=Str+'<div class="s3ex1-icon"></div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-m">'
		Str=Str+'  <input id="answer'+j+'-1" name="answer'+j+'" type="radio" value="1" />'
		Str=Str+'  <label for="answer'+j+'-1">'
		Str=Str+'	<div class="s3ex1-check"></div>'
		Str=Str+'  </label>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-r">'
		Str=Str+'  <div class="s3ex1-item-en">(A) '+op1[j]+'</div>'
		Str=Str+'</div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item">'
		Str=Str+'<div class="s3ex1-item-l">'
		Str=Str+'<div class="s3ex1-icon"></div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-m">'
		Str=Str+'  <input id="answer'+j+'-2" name="answer'+j+'" type="radio" value="2" />'
		Str=Str+'  <label for="answer'+j+'-2">'
		Str=Str+'	<div class="s3ex1-check"></div>'
		Str=Str+'  </label>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-r">'
		Str=Str+'  <div class="s3ex1-item-en">(B) '+op2[j]+'</div>'
		Str=Str+'</div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item">'
		Str=Str+'<div class="s3ex1-item-l">'
		Str=Str+'<div class="s3ex1-icon"></div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-m">'
		Str=Str+'  <input id="answer'+j+'-3" name="answer'+j+'" type="radio" value="3" />'
		Str=Str+'  <label for="answer'+j+'-3">'
		Str=Str+'	<div class="s3ex1-check"></div>'
		Str=Str+'  </label>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-r">'
		Str=Str+'  <div class="s3ex1-item-en">(C) '+op3[j]+'</div>'
		Str=Str+'</div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item">'
		Str=Str+'<div class="s3ex1-item-l">'
		Str=Str+'<div class="s3ex1-icon"></div>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-m">'
		Str=Str+'  <input id="answer'+j+'-4" name="answer'+j+'" type="radio" value="4" />'
		Str=Str+'  <label for="answer'+j+'-4">'
		Str=Str+'	<div class="s3ex1-check"></div>'
		Str=Str+'  </label>'
		Str=Str+'</div>'
		Str=Str+'<div class="s3ex1-item-r">'
		Str=Str+'  <div class="s3ex1-item-en">(D) '+op4[j]+'</div>'
		Str=Str+'</div>'
		Str=Str+'</div>'
		Str=Str+'</div>'						
	}
	
	Str=Str+'</div>'
	
	
	$('.s3ex1-main').html(Str)
	$('.s3ex1-submitbox .s3-submit').on('click',function(){EX1_end()})



}
   
   
function EX1_end(){
	if(DemoTimeout==1){
		JoinusLightBox()
	}else{		
		var ans='',check=0,ans2=$(en).find("en_question").text().split("\n");
		$.cookie('reading_cookie', '', { path:'/', expires: 5 });  

		for(j=0;j<ans2.length-1;j++){
		
			ans=ans+$('input[name=answer'+j+']:checked').val()+";"
			check++;
		
		}

		if(parseInt(check)!=parseInt(ans2.length-1)){
			alert('尚有選項未答');
		}else{
			$.cookie('reading_cookie', ans, { path:'/', expires: 5 }); 
			EX1_answers()
		}
	}
}

const IntToLetter=id =>{
	let x
	switch (id) {
		case 0:
		　x="A"
		　break;
		case 1:
		　x="B"
		　break;
		case 2:
		　x="C"
		　break;
		case 3:
		　x="D"
		　break;
	}
	return x
}

function EX1_answers(){
var Str='';
var ans=$(en).find("en_question").text().split("\n"),eu,ans2=$(en).find("ch_question").text().split("\n"),answer=$(en).find("answer").text().split("\n"),y=0,ii=0,eu='',clock,As,y=0;

var op= new Array();
op[1]=$(en).find("op1").text().split("\n")
op[2]=$(en).find("op2").text().split("\n")
op[3]=$(en).find("op3").text().split("\n")
op[4]=$(en).find("op4").text().split("\n")
var op_c= new Array();
op_c[1]=$(en).find("op1_c").text().split("\n")
op_c[2]=$(en).find("op2_c").text().split("\n")
op_c[3]=$(en).find("op3_c").text().split("\n")
op_c[4]=$(en).find("op4_c").text().split("\n")
As=$.cookie('reading_cookie').split(";");	
	
Str='<div class="s3ex1-box">'

for(j=0;j<ans.length-1;j++){		
	ii++;
	ans[j]=ans[j].replace("`","’");
	Str=Str.replace("`","’");

	Str=Str+'<div class="s3ex1-item is-title">'
	Str=Str+'<div class="s3ex1-item-l">'
	Str=Str+'<div class="s3ex1-icon"></div>'
	Str=Str+'</div>'
	Str=Str+'<div class="s3ex1-item-m">'+ii+'.</div>'
	Str=Str+'<div class="s3ex1-item-r">'
	Str=Str+'  <div class="s3ex1-item-en">'+ans[j]+'</div>'
	Str=Str+'  <div class="s3ex1-item-ch">'+ans2[j]+'</div>'
	Str=Str+'</div>'
	Str=Str+'</div>'

	Str=Str.replace("`","’");
	
	for(i=1;i<=4;i++){


		if(i==parseInt(answer[j])){	
		
			if(i==parseInt(As[j])){

				Str=Str+'<div class="s3ex1-item is-true">'
				Str=Str+'<div class="s3ex1-item-l">'
				Str=Str+'<div class="s3ex1-icon"></div>'
				Str=Str+'</div>'
				Str=Str+'<div class="s3ex1-item-m">'					
				Str=Str+'  <input id="answer'+j+'-'+i+'" name="answer'+j+'" type="radio" value="'+i+'" checked="checked" />'
				y++
			}else{
 
				Str=Str+'<div class="s3ex1-item is-true">'	
				Str=Str+'<div class="s3ex1-item-l">'
				Str=Str+'<div class="s3ex1-icon"></div>'
				Str=Str+'</div>'
				Str=Str+'<div class="s3ex1-item-m">'				
				Str=Str+'  <input id="answer'+j+'-'+i+'" name="answer'+j+'" type="radio" value="'+i+'"  />'
			}
				
		}else{
			
			if(i==parseInt(As[j])){
		
				Str=Str+'<div class="s3ex1-item is-false">'	
				Str=Str+'<div class="s3ex1-item-l">'
				Str=Str+'<div class="s3ex1-icon"></div>'
				Str=Str+'</div>'
				Str=Str+'<div class="s3ex1-item-m">'				
				Str=Str+'  <input id="answer'+j+'-'+i+'" name="answer'+j+'" type="radio" value="'+i+'" checked="checked" />'
			}else{

				Str=Str+'<div class="s3ex1-item ">'	
				Str=Str+'<div class="s3ex1-item-l">'
				Str=Str+'<div class="s3ex1-icon"></div>'
				Str=Str+'</div>'
				Str=Str+'<div class="s3ex1-item-m">'				
				Str=Str+'  <input id="answer'+j+'-'+i+'" name="answer'+j+'" type="radio" value="'+i+'"  />'				
			}
			
		}



		Str=Str+'  <label for="answer'+j+'-'+i+'">'
		Str=Str+'	<div class="s3ex1-check"></div>'
		Str=Str+'  </label>'
		Str=Str+'</div>'

		Str=Str+'<div class="s3ex1-item-r">'
		Str=Str+'  <div class="s3ex1-item-en">('+IntToLetter(i-1)+').'+op[i][j]+'</div>'
		Str=Str+'  <div class="s3ex1-item-ch">'+op_c[i][j]+'</div>'		
		Str=Str+'</div>'
		Str=Str+'</div>'

	}
	
	Str=Str.replace("`","’");

}

Str=Str+'</div>'

y=parseInt(y*100/parseInt(answer.length-1))
raj(y,'reading')

$('.s3ex1-main').html(Str)

$('#ex1 .s3-score-num').html(y)
}

////////////////////////////////////// EX2
function EX2(){
	var Str='';
	
	var ans2=$(en).find("listen_answer").text().split("\n"),eu,ii=1,k="",y=0,a,a1,a2,a3,eu='',clock;
   // console.log('%c ans2> '+ans2,'color: yellow');
	
   
	for (i=0;i<=$(en).find("lrclist:last").index();i++){
		if($(en).find("lrclist:eq("+i+")").index()!=-1){	
			eu=eu+$(en).find("lrclist:eq("+i+")").attr("content");	
		}else{
		break ;
		}
	}	
   
	for(j=0;j<ans2.length;j++){		  
		if(eu.indexOf(ans2[j])!=-1 ){			      
			eu=eu.replace(ans2[j],'<div class="s3ex2-iptbox" ><span>('+(j+1)+')</span>'+blank(ans2[j],j)+'</div><div id="s3ex2-id'+j+'" class="s3-ansbox"></div>')	
		}	 
	}
   
	var x=eu.split('**');
	

	for(i=0;i<x.length;i++){
		x[i]=x[i].replace(/\＊/g,"*")
		Str=Str+'<div class="s3-en">'+x[i]+'</div>';
	}
	
	
	Str = Str.replace( /p_r_o_1/g, 'maxlength');
	Str = Str.replace( /p_r_o_2/g, 'style');

	
	$('.s3ex2-main').html(Str)
	$('.s3ex2-submitbox .s3-submit').on('click',function(){EX2_end()})

	$('.s3ex2-iptbox input').each(function(){
		const length = $(this).attr('placeholder').length;
		// let num;
		// $(window).width() >= 1441? num = 17 : num = 15;
		const width = 17 * length;
		$(this).attr('maxlength', length).css({width});
		$(this).width(width);
		// MAC BUG
		if (/macintosh/i.test(nua) && !/chrome/i.test(nua)) {
			// alert('safari 2')
			$('.s3ex2-iptbox input').each(function(){
				$(this).css('height', 'auto');
			});
			
			//
			let height;
			$(window).width() >= 1441 ? height = '31px' : height = '33px';
			$('.s3ex2-iptbox span:nth-child(3)').each(function(){
				$(this).css('height', height);
			});
		}
	});

   }
   

   
   function EX2_end(){
	   if(DemoTimeout==1){
		   JoinusLightBox()
	   }else{			
		   var e=$(en).find("listen_answer").text().split("\n"),ans='';
		   $.cookie('listening_cookie', '', { path:'/', expires: 5 });  
   
		   for(i=0;i<e.length;i++){
			   ans=ans+$('#EX2answer'+(i+1)).val()+";";
		   }
		   $.cookie('listening_cookie', ans, { path:'/', expires: 5 }); 
		   //EX_pause()
		   EX2_answers()
	   }
   }
   
	function EX2_answers(){
		var Str='';

		var ans2=$(en).find("listen_answer").text().split("\n"),eu,ii=1,k="",y=0,AS,a,a1,a2,a3,eu='',clock;
			//j_stop();


		for (i=0;i<=$(en).find("lrclist:last").index();i++){
			if($(en).find("lrclist:eq("+i+")").index()!=-1){	
				eu=eu+$(en).find("lrclist:eq("+i+")").attr("content");	
			}else{
				break ;
			}
		}	

		//重新排序
		for(i=0;i<ans2.length;i++){
			
			for(j=i+1;j<ans2.length;j++){
				
				if (j<=ans2.length){
					
					if(eu.indexOf(ans2[j])<eu.indexOf(ans2[i])){
						k=ans2[i]
						ans2[i]=ans2[j]
						ans2[j]=k
					}
				
				}
				
			}
		
		}

		As=$.cookie('listening_cookie').split(";");


		for(j=0;j<ans2.length;j++){
			ans2[j]=ans2[j].trim();
			As[j]=As[j].trim();	

			if( (ans2[j]==As[j]) || (left(ans2[j],1) + As[j] + right(ans2[j],1) == ans2[j] )){ 	  	      
				Str='<span class="s3-true">'+ans2[j]+'</span>'
				$('#s3ex2-id'+j).html(Str);
				y++;
			}else{
				if(As[j]!=''){
					Str='<span class="s3-false">'+left(ans2[j],1) + As[j] + right(ans2[j],1)+'</span><span class="s3-true">'+ans2[j]+'</span>'
				}else{
					Str='<span class="s3-true">'+ans2[j]+'</span>'
				}
				$('#s3ex2-id'+j).html(Str);
			}
		}
			


		y=parseInt(y*100/parseInt(ans2.length))  
		raj(y,'listen')

		$('#ex2 .s3-score-num').html(y)
	}
   
////////////////////////////////////// EX3
function EX3(){
	var Str='';
	var ans2=$(en).find("word_answer").text().split("\n"),en_article,tc_article,ii=1,k="",a,a1,a2,a3,eu='';
   
	for (i=0;i<=$(en).find("lrclist:last").index();i++){
		
		if($(en).find("lrclist:eq("+i+")").index()!=-1){	
			en_article=en_article+$(en).find("lrclist:eq("+i+")").attr("content")+"[p]";
			tc_article=tc_article+$(tc).find("lrclist:eq("+i+")").attr("content")+"[p]";
		}	
		
		en_article=en_article.replace('**',"<br>");
		tc_article=tc_article.replace('**',"<br>");
	}
   
	var ena=en_article.split('[p]');
	var cha=tc_article.split('[p]');
	var ans= new Array();
	var answer1= new Array();
	var textbox= new Array();
	var key= new Array();
   
	for(i=0;i<parseInt(ans2.length);i++){	
		a=ans2[i].split(";")
		a1=a[0];
		a2=a[1];
		a3=a[2];
		answer1[i]=a1;
		
		if(a2==""){
			ans[i]=a1;
		}else{
			ans[i]=a2;
		}
	
	}
	  
	
   
	for(i=0;i<ans.length;i++){
		
		for(j=0;j<ena.length;j++){	
		
			ena[j]=ena[j].replace("undefined","")
			
			if(ena[j].indexOf(answer1[i])!=-1){	
			
				if(eu.indexOf(ena[j])!=-1){
				
					eu=eu.replace(eu_temp,"<br>")
					eu=eu.replace("undefined","")		
					ii=ii-1;
					
				}
				
				ena[j]=ena[j].replace(answer1[i],blank_cloze(i,ans2[i]))
				ena[j]=ena[j].replace(/\＊/g,"*")
				ena[j]=ena[j].replace("<br>","")
				cha[j]=cha[j].replace("'","")
				cha[j]=cha[j].replace("<br>","")
				ena[j]=ena[j].replace("undefined","")
				cha[j]=cha[j].replace("undefined","")

				eu=eu+'<div class="s3-en">'+ena[j]+'</div>'
				eu_temp='<div class="s3-en">'+ena[j]+'</div>'
					
					
				ii=ii+1;	
				j=ena.length;		
			}
			
		}
	
	} 
   
	Str=Str+eu;

	$('.s3ex3-left').html(Str)
   
	Str='<div class="s3ex3-right-title">Answer</div>'
	Str=Str+'<div class="s3ex3-right-ansbox">'

   	ck=0;
   
	 var rand='',ran_ch='',ran_x=0;
	 while(ran_x<ans2.length) { 
	   var r = ans2[parseInt(Math.random()*ans2.length)]; 
	 
	   if(ran_ch.indexOf(r+'#')==-1){
	   ran_ch=ran_ch+r+'#'
	   ran_x++;
	   }
	 }
   
	 rand=ran_ch.split('#')
   
	 for(j=0;j<rand.length-1;j++){	
		 	ans22=rand[j].split(";")
		   if(ans22[1].length>1){
			 	Str=Str+"<div class='s3ex3-right-item' id='s3ex3-id"+ans22[1].trim()+"'  onclick=cloze_clk("+j+");return false;><div class='s3ex3-right-l'><span><span id='ans_"+j+"' >"+ans22[1].trim()+"</span></span><span></span><span id='ans2_"+j+"' ></span></div></div>";	
		   }else{
				Str=Str+"<div class='s3ex3-right-item' id='s3ex3-id"+ans22[0].trim()+"'  onclick=cloze_clk("+j+");return false;><div class='s3ex3-right-l'><span><span id='ans_"+j+"' >"+ans22[0].trim()+"</span></span><span></span><span id='ans2_"+j+"' ></span></div></div>";		
		   }
		   Str=Str+"<div class='s3ex3-right-r'><div class='s3ex3-icon'></div></div>"
	 } 
   
	Str=Str+'<INPUT name="answer" type="hidden"  id="cloze_ans">';
	Str=Str+'</div>'
	
	Str=Str+'<div class="s3ex3-submitbox"><a class="s3-reset" href="javascript:void(0)" onclick="EX3_Clear()">Reset</a><a class="s3-submit" href="javascript:void(0)" onclick="EX3_end()">Submit</a></div>'
	
	$('.s3ex3-right').html(Str)
   }
   var Ex3_sp=''
	function EX3_Clear(){
		for(i=0;i<=$(en).find("word_answer").text().split("\n").length-1;i++){
			$("#ex_"+i).show();	 
			$("#exj_"+i).html('');	
			$("#ans2_"+i).html('');
			$('.s3ex3-right-item').removeClass('is-false')
			$('.s3ex3-right-item').removeClass('is-true')
			$(".s3ex3-right-r").remove()
			$("#cloze_ans").val('');
			$('#ex3').addClass('is-def')
		}
		ck=0;
		Ex3_sp='';
	}
	
	function EX3_end(){
		$('#ex3').removeAttr('class');
		if(DemoTimeout==1){
			   JoinusLightBox()
		}else{			
			console.log(Ex3_sp)
			if(Ex3_sp==''){
				$.cookie('cloze_cookie', '', { path:'/', expires: 5 });  
				$.cookie('cloze_cookie', $("#cloze_ans").val(), { path:'/', expires: 5 }); 
				//EX3_Clear()
				EX3_answers()				
			}
		} 
	}
   
	function EX3_answers(){
		var ans2=$(en).find("word_answer").text().split("\n"),en_article,tc_article,AS,ii=1,y=0,a,a1,a2,a3,eu='';
		Ex3_sp=1

		for (i=0;i<=$(en).find("lrclist:last").index();i++){
			if($(en).find("lrclist:eq("+i+")").index()!=-1){
				
				en_article=en_article+$(en).find("lrclist:eq("+i+")").attr("content")+"[p]";
				tc_article=tc_article+$(tc).find("lrclist:eq("+i+")").attr("content")+"[p]";
			}	
			
			en_article=en_article.replace('**',"<br>");
			tc_article=tc_article.replace('**',"<br>");

		}

		As=$.cookie('cloze_cookie').split(";");
		var ena=en_article.split('[p]');
		var cha=tc_article.split('[p]');
		var ans= new Array();
		var answer1= new Array();
		var textbox= new Array();
		var key= new Array();
		
		for(i=0;i<parseInt(ans2.length);i++){	
			a=ans2[i].split(";")
			a1=a[0];
			a2=a[1];
			a3=a[2];
			answer1[i]=a1;
			
			if(a2==""){
				ans[i]=a1;
			}else{
				ans[i]=a2;
			}
		}

		Str=''
		var j_num=0
		for(i=0;i<ans.length;i++){
			for(j=j_num;j<ena.length;j++){
				
				ena[j]=ena[j].replace("undefined","")
				
				if(ena[j].indexOf(answer1[i])!=-1){	
					As[i]=As[i].replace(" ","");
					//ans2[i]=blank_cloze2(ans2[i]).replace(" ","");

					ans[i]=ans[i].trim();
					As[i]=As[i].trim();	

					if(ans[i]==As[i]){	 
						y++;
						$('#s3ex3-id'+As[i]).addClass('is-true')
						$('#s3ex3-id'+As[i]).append('<div class="s3ex3-right-r"><div class="s3ex3-icon"></div></div>')
						$('#exj_'+i).append('<div class="s3-ansbox"><span class="s3-true">&nbsp;&nbsp;'+As[i]+'&nbsp;&nbsp;</span></div>')
					}else{
						$('#s3ex3-id'+As[i]).addClass('is-false')
						$('#s3ex3-id'+As[i]).append('<div class="s3ex3-right-r"><div class="s3ex3-icon"></div></div>')
						$('#exj_'+i).append('<div class="s3-ansbox"><span class="s3-false">&nbsp;&nbsp;'+As[i]+'&nbsp;&nbsp;</span><span class="s3-true">&nbsp;&nbsp;'+ans[i]+'&nbsp;&nbsp;</span></div>')
					}
	
					
					ii=ii+1;	
					j_num=j+1;
					j=ena.length;
				
				}
				
			}

		}


		y=parseInt(y*100/parseInt(ans2.length))
		raj(y,'word')
		
		$('#ex3 .s3-score-num').html(y)
	}
   //////////////////////////////////////////////////

   function raj(rec,type){
	console.log(type)
	$.ajax({
	  type:"POST",
	  url:"./test_record.asp",
	  data: {
		indx:refId,
		record: rec,
		test_type:type
	  },
	  dataType:"html",
	  success:function(data){	
		jquery_RecordFinish()		
	  }
	
	});	
  }
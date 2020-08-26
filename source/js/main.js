// JavaScript Document
function Block(id){
	if(id==1){
	 $('.article').show();
	 $('.article2').hide();
	}else{
	 $('.article2').show();
	 $('.article').hide();
	}
}

// a#1~n , 朗讀情狀 1 v
function ch_font(str,clock){
	var x='',y='',playo='';
	y=clock;

	playo="playC("+y+");"
	str=spanWord((str), pAry);

	let lan = '';
	if( y === 1 ) lan = "<div class='is-item-language controlbox-item active'>隱藏中文</div>"

	if(str.indexOf("**")!=-1){
		// have **
		// is 朗讀情狀 1 content v
		str=str.replace("**","");
		x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><div id='t"+y+"' onDblClick='_dictClose();' class='english'><div class='art-star'>" + lan + "<div class='icon-star' id='art-star"+y+"' onclick=goP_sentences('"+y+"') ></div></div><div class='art-art'>" + str + "<input type='button' onclick='"+playo+"' class='read_btn link'></div></div>");
	}else{
		// no **
		// is 朗讀情狀 1 TITLE v
		x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><div id='t"+y+"' onDblClick='_dictClose();'  class='english'><div class='art-star'>" + lan + "<div class='icon-star' id='art-star"+y+"' onclick=goP_sentences('"+y+"')></div></div><div class='art-art'>" + str + "<input type='button' onclick='"+playo+"' class='read_btn link'></div></div>");
	}

	return x;
}

// div#ct1~n , 朗讀情狀 2 v
function ch_font2(str,clock){
	
	var x='',y='',playo='';
	y=clock;

	playo="play("+y+");"

	// add ** for splite to array
	// 不可省的判斷式；省略會導致 class 值 chinese / english 混亂
	if(str.indexOf("**")!=-1){
		str=str.replace("**","");
		x=str.replace(str,"**<div id='ct"+y+"' onDblClick=_dictClose();"+playo+" class='Chinese'>" +str+ "</div>");
	}else{
		
		x=str.replace(str,"**<div id='ct"+y+"' onDblClick=_dictClose();"+playo+" class='Chinese'>" +str+ "</div>");
	}
	return x;
}

function ch_fontTran(str,clock){
	var x='',y='',playo='';
	y=clock;
	
	playo="play("+y+");"		
	str=tranchang(str);

	let lan = '';
	if( y === 1 ) lan = "<div class='is-item-language controlbox-item active'>隱藏中文</div>"

	if(str.indexOf("**")!=-1){
		// has **
		// is 朗讀情狀 2 content v
		str=str.replace("**","");
		x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><div id='t"+y+"' onDblClick='_dictClose();'  class='english'><div class='art-star'>"+lan+"<div class='icon-star' id='art-star"+y+"' onclick=goP_sentences('"+y+"')></div></div><div class='art-art'>" + str+ "<input type='button' onclick='"+playo+"' class='read_btn link'></div></div>");
	}else{
		// no **
		// is 朗讀情狀 2 TITLE v
		x=str.replace(str,"**<a name='"+y+"' id='"+y+"'></a><div id='t"+y+"' onDblClick='_dictClose();'  class='english'><div class='art-star'>"+lan+"<div class='icon-star' id='art-star"+y+"' onclick=goP_sentences('"+y+"')></div></div><div class='art-art'>" + str + "<input type='button' onclick='"+playo+"' class='read_btn link'></div></div>");
	}

	return x;
}


const replaceCode = function(target, Str){
	// v span
	// Str = Str.replace(/<\/span>/g, '</span>&nbsp');
	Str = Str.replace(/;> /g, ';>');

	// CODE AT END
	// Str = Str.replace(/’/g, "'");
	Str = Str.replace(/”\)<\/span>/g, '<\/span><span class="is-symbol">”)</span>');
	Str = Str.replace(/,<\/span>/g, '<\/span><span class="is-symbol">,</span>');
	Str = Str.replace(/\.<\/span>/g, '<\/span><span class="is-symbol">.</span>');
	Str = Str.replace(/!<\/span>/g, '<\/span><span class="is-symbol">!</span>');
	Str = Str.replace(/\?<\/span>/g, '<\/span><span class="is-symbol">?</span>');
	Str = Str.replace(/:<\/span>/g, '<\/span><span class="is-symbol">:</span>');
	Str = Str.replace(/”<\/span>/g, '<\/span><span class="is-symbol">”</span>');
	Str = Str.replace(/\)<\/span>/g, '<\/span><span class="is-symbol">)</span>');
	Str = Str.replace(/\]<\/span>/g, '<\/span><span class="is-symbol">]</span>');

	target.html(Str);
	// (“NinetyNine”)

	// CODE AT START
	$('.english span').each(function(){
		if( $(this).text().indexOf('(“') >= 0 ){
			$(this).before('<span class="is-symbol is-symbol-left">(“</span>');
			$(this).text( $(this).text().substr(2) );
		}
		if( $(this).text().indexOf('“') >= 0 ){
			// $(this).before('<span class="is-symbol is-symbol-left">“</span>');
			$(this).text( $(this).text().substr(1) ).addClass('add-symbol');
		}
		if( $(this).text().indexOf('(') >= 0 ){
			$(this).before('<span class="is-symbol is-symbol-left">(</span>');
			$(this).text( $(this).text().substr(1) );
		}
		if( $(this).text().indexOf('[') >= 0 ){
			$(this).before('<span class="is-symbol is-symbol-left">[</span>');
			$(this).text( $(this).text().substr(1) );
		}
	});
}

var trx=''
// for 朗讀(單句換行)
function P1_Step1(){
	var eu='',cu='';Str='';
	for (i=0;i<=$(en).find("lrclist:last").index();i++){
		eu=eu.replace('***','**')
		cu=cu.replace('***','**')		
		if($(en).find("lrclist:eq("+i+")").index()!=-1){
			trx=$(en).find("lrclist:eq("+i+")").attr("train")
			
			// en v ============================================== v
			let enSource = '';
			let enCode = '';
			if((trx!='' && trx!=undefined)){	
				enSource = ch_fontTran(trx,i); 
			}else{
				enSource = ch_font($(en).find("lrclist:eq("+i+")").attr("content"),i);
			}

			if( i !=0 ){
				enCode = enSource;
			}else{
				if( enSource.indexOf('>(') < 0 ){
					// haven't sort v
					enCode = enSource;
				}else{
					// have sort v
					let ary = enSource.split('/');
					
					// first sort v
					const ary3 = ary[3].split('>');
					let new3 = '';
					for( j=0; j<= ary3.length - 3; j++ ){
						new3 += ary3[j] + '>';
					};
					new3 = new3 + '<span><';
					ary[3] = new3;

					// secend sort (if have) v
					ary[4].indexOf(')<') >= 0 ? ary[4] = 'span><span><' : null;
			
					let newEnCode = '';
					for( k=0; k<=ary.length-1; k++ ){
						newEnCode += ary[k];
						k < ary.length-1 ? newEnCode += '/' : null;
					}
					enCode = newEnCode.replace(/(\<span\>\<\/span\>)/g, '');
				}
				// 朗讀加「加入收藏」鈕 1090826 v 
				enCode = enCode.replace("art-art'>", "art-art'><div class='icon-star-big'></div>");
			}
			eu = eu + enCode;

			// ch v ============================================== v
			const chSource = ch_font2($(tc).find("lrclist:eq("+i+")").attr("content"),i );
			let chCode = '';
			if( i != 0 ){
				// content v
				chCode = chSource;
			}else{
				// title v
				if( chSource.indexOf('>(') < 0 ){
					// haven't sort
					chCode = chSource;
				}else{
					// have sort
					chCode = chSource.replace(/([\>][^\)]*)/, "\>");
					chCode = chCode.replace('>)', '>');
				}
			};
			cu=cu+chCode;

		}else{
		  	break ;
		}
	}		
	 
	x=eu.split('**');
	y=cu.split('**');
	
	for(i=1;i<x.length;i++){
		ext=x[i]
		cxt=y[i].replace("<a name='"+y+"' id='"+y+"'></a>","")
		Str=Str+ext+cxt;
	}
	replaceCode($('.article') , Str);
	if((trx=='' || trx==undefined)){
		$('.is-item-arttype').remove();
	}	
}


const fnEnRemoveSortString = function(i,en){
	let str= '';
	if(i != 0 ){
		str = en;
	}else{
		const begin = '>(';
		const end = ')<'
		// en
		if( en.indexOf(begin) < 0 ){
			// 字串沒分類文字時 (life) or (health) or ...
			str = en;
		}else{
			// 字串有分類文字時
			let ary = en.split('\/span>');
			let k = '';

			// 不確定分類文字的英文字數有幾個，不一定僅1個
			switch(true){
				case ary[1].indexOf(end) >= 0 :
					k = 2;
					break;
				case ary[2].indexOf(end) >= 0 :
					k = 3;
				case ary[3].indexOf(end) >= 0 :
					k = 4;
				default:
					k = 1;
			};
			for( j = k; j<=ary.length; j++){
				str += ary[j] + '\/span>';
			};
		}
	}
	return str;
}

const fnChRemoveSortString = function(i, ch){
	let str = '';
	if( i != 0 ){
		str = ch;
	}else{
		// ch
		str = ch.replace(/([\(][^\)]*)/, "");
		str = str.replace('\)', '');
	}
	return str
}


// for 講解(多句合成段才換行)
function P1_Step2(){
    var eu='',Str='', enCode='', chCode='';
	
	for (i=0;i<=$(en).find("lrclist:last").index();i++){
		let starBigStr = '';
		let lan = '';
		if( i === 0 ) starBigStr = "<div class='icon-star-big'></div>";
		if( i === 1 ) lan = "<div class='is-item-language controlbox-item active'>隱藏中文</div>";
	
		if($(en).find("lrclist:eq("+i+")").index()!=-1){
			playo="playC("+i+");"			
			eu=eu.replace("**","");
			trx=$(en).find("lrclist:eq("+i+")").attr("train")
			if((trx!='' && trx!=undefined)){
				// is 講解情狀 1 (TITLE + content) v
				enCode = fnEnRemoveSortString( i, tranchang(trx,i) );
				chCode = fnChRemoveSortString( i , $(tc).find("lrclist:eq("+i+")").attr("content") );
				eu=eu+'<a name="' + i + '" id="N' + i + '"></a><div class="english" id="Nt' + i + '" ><div class="art-star" id="art-star'+i+'" >'+lan+'<div class="icon-star" onclick=goP_sentences('+i+') ></div></div><div class="art-art">' + starBigStr + enCode +'<input type="button" onclick="'+playo+'" class="read_btn link"></div></div><div id="bubble'+i+'"  class="annotation" style="display:none;"></div><div class="Chinese" id="Nct'+i+'" >'+chCode+'</div>';

			}else{
				// is 講解情狀 2 (TITLE + content) v
				enCode = fnEnRemoveSortString( i, spanWord($(en).find("lrclist:eq(" + i + ")").attr("content"), pAry) );
				chCode = fnChRemoveSortString( i, $(tc).find("lrclist:eq("+i+")").attr("content") );
				eu = eu + '<a name="' + i + '" id="N' + i + '"></a><div class="english" id="Nt' + i + '" ><div class="art-star" id="art-star'+i+'" >'+lan+'<div class="icon-star" onclick=goP_sentences('+i+')></div></div><div class="art-art">' + starBigStr + enCode +'<input type="button" onclick="'+playo+'" class="read_btn link"></div></div><div id="bubble'+i+'"  class="annotation" style="display:none;"></div><div class="Chinese" id="Nct'+i+'" >'+ chCode +'</div>';
			}
			eu=eu.replace("**","");
		
		}else{
			break ;
		}
		
	}	

	Str=eu
	Str=Str.replace("**","");


	
	replaceCode($('.article2') , Str);

	$('.icon-like').on('click',function(){
		StepFinish('Promote')
		jquery_Record()
		
	})
}

// for 單字片語
function Vocabulary(){
	if($(en).find("wordslist:last").index()>0){
		eu='';
		for (i=0;i<=$(en).find("wordslist:last").index();i++){
	
			if($(en).find("wordslist:eq("+i+")").index()!=-1){	  
				var work=$(en).find("wordslist:eq("+i+")").attr("content").split(';');
				var words_sen=$(en).find("wordslist:eq("+i+")").attr("words_sen")
					
				pAry.push(work[0]);
				
				if(words_sen!=undefined){
					words_sen=words_sen.split('||')
							
					if(words_sen[0].length>1){
						words_sen[0]=words_sen[0].replace("`","’")
			
				
						if(right(words_sen[0],1)==',')
							words_sen[0]=left(words_sen[0],words_sen[0].length-1)+'.'		
				
						if(right(words_sen[1],1)=='，')
							words_sen[1]=left(words_sen[1],words_sen[1].length-1)+'。'		
								
						eu = eu + '<div class="vacbox"><div class="vacmain"><span class="vacmain-en">' + work[0] + work[1] + '<span class="vacmain-sound" onclick=playSound("'+work[0]+'") ></span></span><span class="vacmain-ch">' + work[2] + '</span></div><div class="vacsub"><span class="vacsub-en">' + (words_sen[0]) + '</span><span class="vacsub-ch" >' + words_sen[1] + '</span></div></div>'
					}else{
						eu=eu+'<div class="vacbox"><div class="vacmain"><span class="vacmain-en">'+work[0]+work[1]+'<span class="vacmain-sound" onclick=playSound("'+work[0]+'") ></span></span><span class="vacmain-ch">'+work[2]+'</span></div></div>'
					}
				
				}
				
			}
		
		}	
	  
		
		$('#vocabulary').html(eu)
		$('body').show()
	}
}


function phrase(){
	
	if($(en).find('phrase').text().length>5){
	 
		if($(en).find('phrase').text().indexOf("@@@@")==-1)  //不重覆判斷
			$(en).find('phrase > br').replaceWith("@@@@");
		
			var regExphra = /[@@@@][\s][@@@@]/g
			var phra=$(en).find('phrase').text().replace(regExphra,"<br>");
			//var phra=$(en).find('phrase').text()
			phra = phra.replace(/@@@@@@@@*/g,"||<br>||")		
			phra = phra.replace(/@@@@*/g,"||")
	
			PHRcontent = phra.split('||<br>||')
			eu=''
			for(i=0;i<PHRcontent.length;i++){
			
				var pContent = new Array()
				pContent = PHRcontent[i].split("||")
				
				var tmp = new Array()
				tmp = pContent[0].split(/[^a-z,^A-Z,^\s]/g)
				//if(tmp[0]!=undefined)
				//	pContent[2] = pContent[2].replace(tmp[0],'<span class="s-Word">'+tmp[0]+'</span>')
				


				
				eu =eu+  '<div class="vacbox"><div class="vacmain"><span class="vacmain-en">' + pContent[0] + '</span><span class="vacmain-ch">' +pContent[1] + '</span></div><div class="vacsub"><span class="vacsub-en">' + pContent[2] + '</span><span class="vacsub-ch" >' + pContent[3] + '</span></div></div>'


				 
			}		
			
			$('#phrase').html(eu)
			$('body').show()
	}

}

function goP_sentences(ix){

	if(Me.Product=='228'){
		alert('本功能僅供完整方案以上會員使用');
		return false;
	}else{
	
		if(!$('#icon-star'+ix).hasClass('active')){
			var tg='I'
		}else{
			var tg='D'
		}

		$.ajax({
			type:"POST",
			url:"./Personal_Sentences_response.asp",
			data: {
				indx:refId,
				orders: ix,
				en:escape($(en).find("lrclist:eq("+ix+")").attr("content").replace('**','')),
				tc:escape($(tc).find("lrclist:eq("+ix+")").attr("content").replace('**','')),
				tg:tg,
				clock:clock_num0[ix]
			},
			dataType:"html",
			error: function(){
			},
			success:function(data){
				$('body').append(data);
				jquery_Record()
			}				   
		});	

	}
}

function StepFinish(tg){
	$.ajax({
		type:"POST",
		url:"./StepFinish.asp",
		data: {
			indx:refId,
			tg:tg
		},
		dataType:"html",
		error: function(){
		},
		success:function(data){
			jquery_Record()
		}				   
	});
}	

function jquery_Record(){ 
	console.log('work jquery_Record');
	$.ajax({
		type:"POST",
		url:"../../newmylessonmobile/api/LearningJson",
		data: {
			member_id:Me.Mindx,
			customer_id:Me.customer,
			news_id:refId
		},
		dataType:"json",
		success:function(data){
			let Sarray=''
			if(data.bookmark==1){
				$('.icon-star-big').addClass('active')
			}

			if(data.reading!=''){
				$('.is-ex1 .topbar-s').html(data.reading+'<span>分</span>')
				if(data.reading>=60)
					$('.is-ex1 .icon-correct').fadeIn();
			}

			if(data.listening!=''){
				$('.is-ex2 .topbar-s').html(data.listening+'<span>分</span>')
				if(data.listening>=60)
					$('.is-ex2 .icon-correct').fadeIn();
			}

			if(data.word!=''){
				$('.is-ex3 .topbar-s').html(data.word+'<span>分</span>')
				if(data.word>=60)
					$('.is-ex3 .icon-correct').fadeIn();
			}

			$('.icon-like').html(data.Promote);	
			(data.MyPromote == '1')? $('.icon-like').addClass('active') : $('.icon-like').removeClass('active')

			if(data.Step1=='1')
				$('.is-step-switch1 .icon-correct').fadeIn();
			if(data.Step2=='1')
				$('.is-step-switch2 .icon-correct').fadeIn();						
			if(data.Step3=='1')
				$('.is-step-switch3 .icon-correct').fadeIn();
			
			if(data.Sentences!=''){
				Sarray=data.Sentences.split(',')
				for(a in Sarray){
					$('#icon-star'+Sarray[a]).addClass('active');
					$('.article .icon-star').eq(Sarray[a]).addClass('active');
					$('.article2 .icon-star').eq(Sarray[a]).addClass('active');
				}
			}


		} 
	});
}

function jquery_RecordFinish(){ 
	
	$.ajax({
		type:"POST",
		url:"../../newmylessonmobile/api/LearningJson",
		data: {
			member_id:Me.Mindx,
			customer_id:Me.customer,
			news_id:refId
		},
		dataType:"json",
		success:function(data){

			if(data.reading!=''){
				$('.is-ex1 .topbar-s').html(data.reading+'<span>分</span>')
				if(data.reading>=60)
					$('.is-ex1 .icon-correct').fadeIn();
			}

			if(data.listening!=''){
				$('.is-ex2 .topbar-s').html(data.listening+'<span>分</span>')
				if(data.listening>=60)
					$('.is-ex2 .icon-correct').fadeIn();
			}

			if(data.word!=''){
				$('.is-ex3 .topbar-s').html(data.word+'<span>分</span>')
				if(data.word>=60)
					$('.is-ex3 .icon-correct').fadeIn();
			}

			if(data.reading>=60 && data.listening>=60 && data.word>=60){
				$('.lb-mask-final,.is-lb-final').show()
				playFinish()
			}

		} 
	});
}



const finalShow=()=>{
	$.ajax({
		type:"POST",
		url:"./nextPage.asp",
		data: {
			indx:refId
		},
		dataType:"json",
		success:function(data){
			$('.lb-final-art').html(data.ch_subject)
			$('.lb-final-item').eq(1).css('background-image','url(../../en/pic/'+data.pic+')')

			$('.lb-final-item').on('click',function(){
				$(this).index()===0 ? location.href='../track' : location.href='?rid='+data.indx
			})
			
		}
	})		
}

function main() {
	playerinit()
	jquery_Record()
	finalShow()

	var E_Channel = $(en).find("lrc").attr("Channel");
	var C_Channel = $(tc).find("lrc").attr("Channel");
	var en_title = $(en).find("lrc").attr("title").replace("`", "'");
	var ch_title = $(tc).find("lrc").attr("title");
	var pic = $(en).find("lrc").attr("PIC").replace("http://fun-day.appspot.com/downloadFile?path=/en/", "../../en/")
	var ids = xml.split("-");
	ids[1] = ids[1].replace("v2.xml", "");

	pic = pic.replace("s.", ".")
	pic = "<img src='" + pic + "'  id='Pic' />"

	var level = 'CEFR:';
	if ($(en).find("lrc").attr("Level") != '') {
		if (parseInt($(en).find("lrc").attr("Level")) == 1) {
			level = level + "A1"
		} else if (parseInt($(en).find("lrc").attr("Level")) == 2) {
			level = level + "A2"
		} else if (parseInt($(en).find("lrc").attr("Level")) == 3) {
			level = level + "B1"
		} else if (parseInt($(en).find("lrc").attr("Level")) == 4) {
			level = level + "B2"
		} else if (parseInt($(en).find("lrc").attr("Level")) == 5) {
			level = level + "C1"
		} else if (parseInt($(en).find("lrc").attr("Level")) == 6) {
			level = level + "C2"
		}
	} else {
		level = level + " A1"
	}

	var ndate = left($(en).find("lrc").attr("Ndate"), 4) + '/' + mid($(en).find("lrc").attr("Ndate"), 4, 2) + '/' + mid($(en).find("lrc").attr("Ndate"), 6, 2)

	$('#title-a, #title-b').html(en_title)
	$('#subtitle-a, #subtitle-b').html(ch_title)
	$('#class_f').html( E_Channel + '/' + C_Channel + level)

	$('.ArticleInfo2').html('文章序號:' + ids[1] + ' Date:' + ndate)
	$('.Article_pic').html(pic)
	//Page1
	Vocabulary()
	phrase()
	P1_Step1()
	P1_Step2()
	//
	//Page2
	P2_Step1()
	//
	
	//Page3
	EX1()
	EX2()
	EX3()
	//
}

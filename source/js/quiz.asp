<%
 response.Buffer = true   
 session.CodePage = 65001   
 response.Charset = "utf-8"  
 
 
xml=request("xml")

if xml="" then
xml="news20160926-15226v2.xml"
end if

if isNULL(request("whichQuiz")) = true  then
	whichQuiz = "reading"
elseif request("whichQuiz")="" then
	whichQuiz = "reading"
else
	whichQuiz = request("whichQuiz")
end if

if isNULL(request("studentAns_u")) = true  then
	studentAns_u = ""
else
studentAns_u = request("studentAns_u")
end if

if isNULL(request("studentAns_l")) = true then
	studentAns_l = ""
else
studentAns_l = request("studentAns_l")
end if

if isNULL(request("studentAns_t")) = true then
	studentAns_t = ""
else
studentAns_t = request("studentAns_t")
end if
%>
<link rel="stylesheet" href="./css/quiz.css">
<link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet">
<!--<link rel="stylesheet" href="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">-->
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<!--<script src="https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>-->
<script>
	$('.textBar').html('')
	$('.understandingBlock').html('')
	$('.listeningBlock').html('')
	$('.txtCompletionBlock').html('')


	var mp3file1 = ""
	var scoreU = 0
	var scoreL = 0
	var scoreT = 0
	var random_word_answer = new Array()
	var random_word_answerPos = new Array()
	var word_answer = new Array()
	var word_answerPos = new Array()
	
	var xmlClass='<%=xml%>'

	/**append textBar**/
	$('.textBar').html('<div class="textBarBtn" onclick="changeQuiz(0)">理解力</div><div class="textBarBtn" onclick="changeQuiz(1)">聽力</div><div class="textBarBtn" onclick="changeQuiz(2)">克漏字</div>')
	jquery_record(xmlClass);
	jquery_enClass(xmlClass);
	var enClass;	
	function jquery_enClass(url_str){
		$.ajax({
			url: '../../en/xml/'+url_str,
			type:'GET',
			dateType:'xml',
			error: function(xml){
				alert('XML  error');
			},
			success:function(xml){
				enClass=xml;
			}	
		});
	}

	function jquery_tcClass(url_str){
		$.ajax({
			url: '../../tc/xml/'+url_str,
			type:'GET',
			dateType:'xml',
			error: function(xml){
				alert('XML  error');
			},
			success:function(xml){
				tcClass=xml;
				getXMLClass();
			}	
		});

	}

	function getXMLClass(){
	/** 定義 **/
		mp3file1 = $(enClass).find('lrc').attr('mp3file1')
	
		/**understanding**/
		var en_question = new Array();
		var ch_question = new Array();
		var op1 = new Array();
		var op2 = new Array();
		var op3 = new Array();
		var op4 = new Array();
		var op1_c = new Array();
		var op2_c = new Array();
		var op3_c = new Array();
		var op4_c = new Array();
		var ABC  = ["(A)", "(B)", "(C)", "(D)"];
		
		
		en_question = $(enClass).find('en_question').text().split("\n")
		ch_question = $(enClass).find('ch_question').text().split("\n")
		op1 = $(enClass).find('op1').text().split("\n")
		op2 = $(enClass).find('op2').text().split("\n")
		op3 = $(enClass).find('op3').text().split("\n")
		op4 = $(enClass).find('op4').text().split("\n")
		op1_c = $(enClass).find('op1_c').text().split("\n")
		op2_c = $(enClass).find('op2_c').text().split("\n")
		op3_c = $(enClass).find('op3_c').text().split("\n")
		op4_c = $(enClass).find('op4_c').text().split("\n")
		
		
		//listening
		var lrclistP_l = new Array();
		var tmplrclistP_t = new Array();
		var listen_answer = new Array();
		
		listen_answer = $(enClass).find('listen_answer').text().split("\n")
		
		var tmpContent ="";
		var tmpCnt = 1;
		var lrclistP_l_num = 0;
		for( i=1;i<$(enClass).find('lrclist').length;++i ){
			if( parseInt($(enClass).find('lrclist:eq('+i+')').attr('paragraph')) == tmpCnt ){
				tmpContent += $(enClass).find('lrclist:eq('+i+')').attr('mobile');
				if( i == $(enClass).find('lrclist').length-1){
					lrclistP_l[lrclistP_l_num] = tmpContent;
					tmplrclistP_t[lrclistP_l_num] = tmpContent;
					lrclistP_l_num += 1;
					tmpCnt += 1;
				}
			}else{
				lrclistP_l[lrclistP_l_num] = tmpContent;
				tmplrclistP_t[lrclistP_l_num] = tmpContent;
				tmpContent = $(enClass).find('lrclist:eq('+i+')').attr('mobile'); 
				lrclistP_l_num += 1;
				tmpCnt += 1;
				if( i == $(enClass).find('lrclist').length-1){
					lrclistP_l[lrclistP_l_num] = tmpContent;
					tmplrclistP_t[lrclistP_l_num] = tmpContent;
					lrclistP_l_num += 1;
					tmpCnt += 1;
				}
			}
		}		
		
		
		var inputCnt = 0
		
		for( i=0;i<listen_answer.length;++i ){
			for( j=0;j<lrclistP_l.length;++j ){
				if( (lrclistP_l[j].indexOf(' '+listen_answer[i]+' ')!=(-1)) || (lrclistP_l[j].indexOf(listen_answer[i]+' ')!=(-1)) || (lrclistP_l[j].indexOf(' '+listen_answer[i])!=(-1)) || (lrclistP_l[j].indexOf('...'+listen_answer[i])!=(-1)) ){
					var spanListeningQuiz = '<div class="spanListeningQuiz">'
					var listeningQuizNum ='<div class="listeningQuizNum">('+(i+1).toString()+')</div>'
					var listeningQuizDashed = '<div class="listeningQuizDashed" data-val="'+listen_answer[i].length+'">'
					var listeningQuizAbs = '<div class="listeningQuizAbs">'
					
					for( k=0;k<listen_answer[i].length;++k ){
						if( k==0 ){
							listeningQuizAbs += '<div class="inputListeningDashed" style="width: calc(100%/'+listen_answer[i].length+' - 3px);margin-left:0"></div>'
						}else{
							listeningQuizAbs += '<div class="inputListeningDashed" style="width: calc(100%/'+listen_answer[i].length+' - 3px)"></div>'
						}
					}
					
					var inputListening = '<div contenteditable="true" class="inputListening" data-item="'+i.toString()+'">'+listen_answer[i]+'</div>'
					listeningQuizAbs += '</div>'
					listeningQuizDashed += listeningQuizAbs + inputListening + '</div>'
					spanListeningQuiz += listeningQuizNum + listeningQuizDashed + '</div>'
					if( lrclistP_l[j].indexOf(' '+listen_answer[i]+' ')!=(-1) ){
						lrclistP_l[j] = lrclistP_l[j].replace(' '+listen_answer[i]+' ',spanListeningQuiz);
					}else if( lrclistP_l[j].indexOf(listen_answer[i]+' ')!=(-1) ){
						lrclistP_l[j] = lrclistP_l[j].replace(listen_answer[i]+' ',spanListeningQuiz);
					}else if( lrclistP_l[j].indexOf(' '+listen_answer[i])!=(-1) ){
						lrclistP_l[j] = lrclistP_l[j].replace(' '+listen_answer[i],spanListeningQuiz);
					}else if( lrclistP_l[j].indexOf('...'+listen_answer[i])!=(-1) ){
						lrclistP_l[j] = lrclistP_l[j].replace('...'+listen_answer[i],'...'+spanListeningQuiz);
					}
					break;
					
				}
			}
		}
		
		
		/**txtCompletion**/
		var tmpWord_answer = new Array();
		tmpWord_answer = $(enClass).find('word_answer').text().split("\n")
		var word_answerPhrase = new Array();
		for( i=0;i<tmpWord_answer.length;++i ){		
			var tmp = tmpWord_answer[i].split(';')
			word_answerPhrase[i] = tmp[0];
			word_answer[i] = tmp[1].replace(' ','')
			word_answerPos[i] = tmp[0].split(' ')[0]
			if( tmp[0].split(' ')[0] == word_answer[i] ){
				word_answerPos[i] = tmp[0].split(' ')[1]
			}
			
		}

		//var lrclistP_t = tmplrclistP_t.slice();
		//lrclistP_t.unshift($(enClass).find('lrclist:eq(0)').attr('mobile'));
		var en_article="";
		var tc_article="";

		for (i=0;i<=$(enClass).find("lrclist:last").index();i++){
			
			if($(enClass).find("lrclist:eq("+i+")").index()!=-1){	
				en_article=en_article+$(enClass).find("lrclist:eq("+i+")").attr("content")+"[p]";
				//tc_article=tc_article+$(tcClass).find("lrclist:eq("+i+")").attr("content")+"[p]";
			}	
		
			en_article=en_article.replace('**',"<br>");
			//tc_article=tc_article.replace('**',"<br>");
		}

		var lrclistP_t=en_article.split('[p]');
		//var cha=tc_article.split('[p]');

		var newlrclistP_t = new Array()
		var newlrclistP_t_count = 0
		for( i=0;i<word_answer.length;++i ){
			for( j=0;j<lrclistP_t.length;++j ){
				if( (lrclistP_t[j].indexOf(' '+word_answerPhrase[i])!=(-1)) || (lrclistP_t[j].indexOf(word_answerPhrase[i]+' ')!=(-1)) || (lrclistP_t[j].indexOf(' '+word_answerPhrase[i]+' ')!=(-1)) ){
					//if( word_answer[i]=='' ){
						//var replaceCont = '<div class="txtCompletionItem"><div class="txtCompletionBorder"><div class="txtCompletionNum">('+(i+1).toString()+')</div></div></div>'
						//lrclistP_t[j] = lrclistP_t[j].replace(word_answerPos[i],replaceCont);
						//break;
					//}else{
						var replaceCont = '<div class="txtCompletionItem"><div class="txtCompletionBorder"><div class="txtCompletionNum">('+(i+1).toString()+')</div></div></div>'
						var tmpSplit = lrclistP_t[j].split(word_answerPhrase[i]);
						//console.log(word_answerPhrase[i])
						//console.log(lrclistP_t[j])
						var tmpSplitA = tmpSplit[0]
						var tmpSplitB = ''
						for( k=1;k<tmpSplit.length;++k ){
							tmpSplitB+=tmpSplit[k]
						}
						//tmpSplitB = tmpSplitB.replace(word_answer[i],replaceCont);
						if( word_answer[i]=='' ){
							newlrclistP_t[newlrclistP_t_count] = tmpSplitA +replaceCont+ tmpSplitB;
						}else{
							var tmp = tmpWord_answer[i].split(';')
							if( tmp[0].split(' ')[0] == word_answer[i] ){
								newlrclistP_t[newlrclistP_t_count] = tmpSplitA +replaceCont+word_answerPos[i]+' '+ tmpSplitB;
							}else{
								newlrclistP_t[newlrclistP_t_count] = tmpSplitA +word_answerPos[i]+' '+replaceCont+ tmpSplitB;
							}
						}
						
						newlrclistP_t_count = newlrclistP_t_count + 1;
						break;
					//}
				}
			}
		}



		
		var txtCSquareBlockA = '<div class="txtCSquareBlock"><div class="txtCSquare txtCSquare1" onclick="txtCSquareClick(this)"></div><div class="txtCSquare txtCSquare2" onclick="txtCSquareClick(this)"></div></div>'
		var txtCSquareBlockB = '<div class="txtCSquareBlock"><div class="txtCSquare txtCSquare3" onclick="txtCSquareClick(this)"></div><div class="txtCSquare txtCSquare4" onclick="txtCSquareClick(this)"></div><div class="txtCSquare txtCSquare5" onclick="txtCSquareClick(this)"></div></div>'
		var txtCSquareBtnBlock = '<div class="txtCSquareBtnBlock"><div class="txtCSquareBtnBlockL"><div class="txtCSquareBtnReset" onclick="txtCSquareReset()">Reset</div></div><div class="txtCSquareBtnBlockR"><div class="txtCSquareBtnSend">Submit</div></div></div>'	
		if( Math.floor((Math.random() * 2) + 1)==1 ){
			var divTxtCSquare = '<div class="divTxtCSquare" data-item="0">'+txtCSquareBlockA+txtCSquareBlockB+txtCSquareBtnBlock+'</div>'	
		}else{
			var divTxtCSquare = '<div class="divTxtCSquare" data-item="0">'+txtCSquareBlockB+txtCSquareBlockA+txtCSquareBtnBlock+'</div>'
		}
		
		
	/** 解析 **/
		/**understanding**/
		var understandingBlock_data = ""
		var optionIcon = '<div class="optionIcon" data-item="'
		for ( i=0;i<en_question.length-1;++i ){
			if (i==0){
				var understandingQ = '<div class="understandingQ quiz-6" style="margin-top:0" data-item="0">'+(i+1).toString()+'.'+'<div class="understandingQtxt" >'+en_question[i]+'</div></div>';
			}else{
				var understandingQ = '<div class="understandingQ" data-item="0">'+(i+1).toString()+'.'+'<div class="understandingQtxt" >'+en_question[i]+'</div></div>';
			}
			var understandingOP1 = '<div class="understandingOP" onclick="changeOP(this, '+i.toString()+')">'+optionIcon+'1"></div><div>'+ABC[0]+'</div><div class="understandingOPtxt" >'+op1[i]+'</div></div>';
			var understandingOP2 = '<div class="understandingOP" onclick="changeOP(this, '+i.toString()+')">'+optionIcon+'2"></div><div>'+ABC[1]+'</div><div class="understandingOPtxt" >'+op2[i]+'</div></div>';
			var understandingOP3 = '<div class="understandingOP" onclick="changeOP(this, '+i.toString()+')">'+optionIcon+'3"></div><div>'+ABC[2]+'</div><div class="understandingOPtxt" >'+op3[i]+'</div></div>';
			var understandingOP4 = '<div class="understandingOP" onclick="changeOP(this, '+i.toString()+')">'+optionIcon+'4"></div><div>'+ABC[3]+'</div><div class="understandingOPtxt" >'+op4[i]+'</div></div>';
			understandingBlock_data += understandingQ + understandingOP1 + understandingOP2 + understandingOP3 + understandingOP4;
		}
		
		/**listening**/
		var listeningBlock_data = ""
		var divPlayer = '<div class="playerIcon icon-sound" onclick="listenPlay()" data-val="0"><div class="play-point"></div></div>'
		listeningBlock_data += divPlayer;
		for ( i=0;i<lrclistP_l.length;++i ){
			var listeningP = '<div class="listeningP">'+lrclistP_l[i]+'</div>'
			listeningBlock_data += listeningP
		}
		
		/**txtCompletion**/
		var txtCompletionBlock_data = "" 
		for ( i=0;i<newlrclistP_t.length;++i ){
			var txtCompletionP = '<div class="txtCompletionP">'+newlrclistP_t[i].replace('<br>', '')+'</div>'
			txtCompletionBlock_data += txtCompletionP
		}
		var txtCompletionSquare_data = divTxtCSquare
		
		
		
		
	/** 1.輸出 2.有作答的話，批改 **/
		/**understanding**/
		$('.understandingBlock').html(understandingBlock_data);
	
		
		if ('<%=studentAns_u%>'!=''){
			var answer = new Array();
			answer = $(enClass).find('answer').text().split("\n");
			var studentAns_u = new Array();
			var tmpString = '<%=studentAns_u%>'
			studentAns_u = tmpString.split(";")
			if( studentAns_u.length == answer.length-1 ){
				var count = 0;
				var cnt4 = 0;
				for(i=0;i<studentAns_u.length;++i){
					$('.understandingOP:eq('+(cnt4+parseInt(answer[i])-1).toString()+')').css('color','#005f40');
					$('.optionIcon:eq('+(cnt4+parseInt(answer[i])-1).toString()+')').css('border','1.5px solid #005f40');
					/**答對**/
					if(studentAns_u[i]==answer[i]){
						$('.optionIcon:eq('+(cnt4+parseInt(studentAns_u[i])-1).toString()+')').css('border','1.5px solid #005f40');
						$('.optionIcon:eq('+(cnt4+parseInt(studentAns_u[i])-1).toString()+')').html('<div class="optionIconCircle quiz-1" style="background-color: #005f40;"></div></div>')
						count += 1;	
					}
					/**答錯**/
					else{
						if( studentAns_u[i]==0 ){studentAns_u[i]=1}
						$('.understandingOP:eq('+(cnt4+parseInt(studentAns_u[i])-1).toString()+')').css('color','#aa0102');
						$('.optionIcon:eq('+(cnt4+parseInt(studentAns_u[i])-1).toString()+')').css('border','1.5px solid #aa0102');
						$('.optionIcon:eq('+(cnt4+parseInt(studentAns_u[i])-1).toString()+')').html('<div class="optionIconCircle quiz-2" style="background-color: #aa0102;"></div>')
					}
					cnt4 += 4;
				}
				raj(parseInt(Math.floor(count/studentAns_u.length*100)),'reading')
				$('.textBarBtn:eq(0)').html('<span class="scort-left">理解力</span><span class="scort-right"><span>'+Math.floor(count/studentAns_u.length*100)+'</span>分</span>');
				scoreU = parseInt(Math.floor(count/studentAns_u.length*100));
				
				for( i=0;i<$('.understandingQ').length;++i ){
					$('.understandingQtxt:eq('+i.toString()+')').html($('.understandingQtxt:eq('+i.toString()+')').text()+'<div class="quiz-ch">'+ch_question[i]+"</div>")
				}
				
				for( i=0;i<$('.understandingOP').length;++i ){
					if( (i%4)==0 ){
						$('.understandingOPtxt:eq('+i.toString()+')').html($('.understandingOPtxt:eq('+i.toString()+')').text()+'<div class="quiz-ch">'+op1_c[Math.floor(i/4)]+"</div>")
					}else if( (i%4)==1 ){
						$('.understandingOPtxt:eq('+i.toString()+')').html($('.understandingOPtxt:eq('+i.toString()+')').text()+'<div class="quiz-ch">'+op2_c[Math.floor(i/4)]+"</div>")
					}else if( (i%4)==2 ){
						$('.understandingOPtxt:eq('+i.toString()+')').html($('.understandingOPtxt:eq('+i.toString()+')').text()+'<div class="quiz-ch">'+op3_c[Math.floor(i/4)]+"</div>")
					}else if( (i%4)==3 ){
						$('.understandingOPtxt:eq('+i.toString()+')').html($('.understandingOPtxt:eq('+i.toString()+')').text()+'<div class="quiz-ch">'+op4_c[Math.floor(i/4)]+"</div>")
					}
				}
				$( ".understandingOP" ).attr('onclick','return false;');
				
			}
		}
		
		/**listening**/
		$('.listeningBlock').html(listeningBlock_data);
		
	
		for ( i=0;i<$('.listeningQuizDashed').length;++i ){
			$('.listeningQuizDashed:eq('+i.toString()+')').css('width',(parseInt($('.listeningQuizDashed:eq('+i.toString()+')').width())+1).toString()+'px')
			$('.inputListening:eq('+i.toString()+')').css('width',(parseInt($('.inputListening:eq('+i.toString()+')').width())+1).toString()+'px')
		}
		$('.inputListening').text('')

	
		
		if ('<%=studentAns_l%>'!=''){
			var studentAns_l = new Array();
			var tmpString = '<%=studentAns_l%>'
			studentAns_l = tmpString.split(";")
			if( studentAns_l.length == listen_answer.length ){
				var count = 0;
				for( i=0;i<$('.spanListeningQuiz').length;++i ){
					$('.spanListeningQuiz:eq('+i+')').html('<div class="listeningT">'+listen_answer[i]+'</div>')
					if( studentAns_l[i] != listen_answer[i] ){
						$('.spanListeningQuiz:eq('+i+')').prepend('<div class="listeningF">'+studentAns_l[i]+'</div>')
					}else{
						count += 1;
					}
				}
				raj(parseInt(Math.floor(count/studentAns_l.length*100)),'listen')
				$('.textBarBtn:eq(1)').html('<span class="scort-left">聽力</span><span class="scort-right"><span>'+parseInt(Math.floor(count/studentAns_l.length*100))+'</span>分</span>');
				scoreL = parseInt(Math.floor(count/studentAns_l.length*100));
			}
		}
		
		/**txtCompletion**/
		$('.txtCompletionBlock').html(txtCompletionBlock_data);
		$('#txtCompletionSquare').html(txtCompletionSquare_data);
		
		
		/**shuffle**/
		random_word_answer = shuffle(word_answer)
		
		for( i=0;i<random_word_answer.length;++i ){
			if( random_word_answer[i]=="" ){
				$('.txtCSquare'+(i+1).toString()).html(random_word_answerPos[i])
			}else{
				$('.txtCSquare'+(i+1).toString()).html(random_word_answer[i])
			}
		}
		
		if ('<%=studentAns_t%>'!=''){
			$('#txtCompletionSquare').css('display','none')
			var studentAns_t = new Array();
			var tmpString = '<%=studentAns_t%>'
			studentAns_t = tmpString.split(";")
			if( studentAns_t.length == word_answer.length ){
				var count = 0;
				for( i=0;i<$('.txtCompletionItem').length;++i ){
					if( word_answer[i]!='' ){
						$('.txtCompletionItem:eq('+i+')').html('<div class="txtCompletionT">'+word_answer[i]+'</div>')
						if( studentAns_t[i] != word_answer[i] ){
							$('.txtCompletionItem:eq('+i+')').prepend('<div class="txtCompletionF">'+studentAns_t[i]+'</div>')
						}else{
							count += 1;
						}
					}else{
						$('.txtCompletionItem:eq('+i+')').html('<div class="txtCompletionT">'+word_answerPos[i]+'</div>')
						if( studentAns_t[i] != word_answerPos[i] ){
							$('.txtCompletionItem:eq('+i+')').prepend('<div class="txtCompletionF">'+studentAns_t[i]+'</div>')
						}else{
							count += 1;
						}						
					}
				}
				raj(parseInt(Math.floor(count/studentAns_t.length*100)),'word')
				$('.textBarBtn:eq(2)').html('<span class="scort-left">克漏字</span><span class="scort-right"><span>'+Math.floor(count/studentAns_t.length*100)+'</span>分</span>');
				scoreT = parseInt(Math.floor(count/studentAns_t.length*100));
			}
		}
		
		
		
	/**取完值後 狀態判斷**/
	
		if ('<%=studentAns_t%>'==''){
			$('.txtCompletionBlock').append('<div class="quiz-3" ></div>')
		}else{
			if ('<%=studentAns_u%>'==''){
				$('.txtCompletionBlock').append('<div onclick="changeQuiz(0)" class="sendBtn is-875" >前往理解力測驗</div>')
			}else if('<%=studentAns_t%>'==''){
				$('.txtCompletionBlock').append('<div onclick="changeQuiz(1)" class="sendBtn is-875" >前往聽力測驗</div>')
			}
			$('.txtCompletionBlock').append('<div class="quiz-5" ></div>')
		}
		if ('<%=studentAns_u%>'==''){
			$('.understandingBlock').append('<div onclick="submit(0)" class="sendBtn">送出</div>')
			$('.understandingBlock').append('<div class="quiz-5" ></div>')
		}else{
			if ('<%=studentAns_l%>'==''){
				$('.understandingBlock').append('<div onclick="changeQuiz(1)" class="sendBtn is-875" >前往聽力測驗</div>')
			}else if('<%=studentAns_t%>'==''){
				$('.understandingBlock').append('<div onclick="changeQuiz(2)" class="sendBtn is-875" >前往克漏字測驗</div>')
			}
			$('.understandingBlock').append('<div class="quiz-5" ></div>')
		}
		if('<%=studentAns_l%>'==''){
			$('.listeningBlock').append('<div onclick="submit(1)" class="sendBtn is-875">送出</div>')
			$('.listeningBlock').append('<div class="quiz-5" ></div>')
		}else{
			if ('<%=studentAns_u%>'==''){
				$('.listeningBlock').append('<div onclick="changeQuiz(2)" class="sendBtn is-875" >前往克漏字測驗</div>')
			}else if('<%=studentAns_t%>'==''){
				$('.listeningBlock').append('<div onclick="changeQuiz(2)" class="sendBtn is-875" >前往克漏字測驗</div>')
			}
			$('.listeningBlock').append('<div class="quiz-5" ></div>')	
		}
			
		
			if ( '<%=whichQuiz%>'=='reading' ){
				changeQuiz(0)
				console.log('<%=whichQuiz%>')
			}else if( '<%=whichQuiz%>'=='listening' ){
				changeQuiz(1)
				console.log('<%=whichQuiz%>')
			}else{
				changeQuiz(2)
				console.log('<%=whichQuiz%>')
			}	
		

		
		var tmpQuizUrl = quizUrl.split('&')[0]
		quizUrl =  tmpQuizUrl
		
		if ('<%=studentAns_u%>'!=''){
			quizUrl += '&studentAns_u=' +'<%=studentAns_u%>'
		}
		if ('<%=studentAns_l%>'!=''){
			quizUrl += '&studentAns_l=' +'<%=studentAns_l%>'
		}
		if ('<%=studentAns_t%>'!=''){
			quizUrl += '&studentAns_t=' +'<%=studentAns_t%>'
		}

		
		/**alert**/
		if( (scoreU>60) && (scoreL>60) && (scoreT>60) ){
			alert('恭喜你通過精讀訓練！');
		}
		
		
	}	
	
	var tmpAns_t = ""
	
	function txtCSquareClick(item){
		if($(item).attr('data-val')!='1'){
			$(item).css('border','solid 2px #4a4a4a')
			var tmpVal = parseInt($('.divTxtCSquare').attr('data-item'))
			if( tmpVal<5 ){
				if( tmpVal==4 ){
					tmpAns_t += $(item).text() 
					$('.txtCSquareBtnSend').css('background-color','#f74769')
					$('.txtCSquareBtnSend').attr('onclick','submit(2)')
				}else{
					tmpAns_t += $(item).text() + ';'
				}
				$('.txtCompletionItem:eq('+tmpVal.toString()+')').html('<div class="txtCompletionA">'+$(item).text()+'</div>')
				$(item).html( $(item).text()+'('+(tmpVal+1).toString()+')' )
				$('.divTxtCSquare').attr('data-item',tmpVal+1)
			}
			$(item).attr('data-val','1')
		}
	}
	
	function txtCSquareReset(){
		$('.txtCSquareBtnSend').attr('onclick','')
		tmpAns_t = ""
		$('.txtCSquare').attr('data-val','0')
		$('.divTxtCSquare').attr('data-item','0')
		for( i=0;i<random_word_answer.length;++i ){
			if( random_word_answer[i]=="" ){
				$('.txtCSquare'+(i+1).toString()).html(random_word_answerPos[i])
				$('.txtCSquare'+(i+1).toString()).removeAttr('style');
			}else{
				$('.txtCSquare'+(i+1).toString()).html(random_word_answer[i])
				$('.txtCSquare'+(i+1).toString()).removeAttr('style');
			}
		}
		for( i=0;i<$('.txtCompletionItem').length;++i ){
			$('.txtCompletionItem:eq('+i+')').html('<div class="txtCompletionBorder"><div class="txtCompletionNum">('+(i+1).toString()+')</div></div>')
		}
	}
	
	
	function listenPlay(){
		if( $('.playerIcon').attr('data-val')=='0' ){
			document.getElementById("audio").src = mp3A;
			document.getElementById("audio").currentTime = 0;
			document.getElementById("audio").playbackRate = 1;
			document.getElementById("audio").play();
			$('.playerIcon').attr('data-val','1');
			$('.play-point').show();
		}else if( $('.playerIcon').attr('data-val')=='1' ){
			document.getElementById("audio").pause();
			$('.playerIcon').attr('data-val','2');
			$('.play-point').hide();
		}else{
			document.getElementById("audio").play();
			$('.playerIcon').attr('data-val','1');
			$('.play-point').show();
		}
	}

function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}
	
	$(document).on('input', '.inputListening', function(event){ 
		var eq = $(this).attr('data-item')
		maxLength = parseInt($('.listeningQuizDashed:eq('+eq+')').attr('data-val'))
		if( $(this).text().length > maxLength-1 ){
			$(this).text( $(this).text().substring(0,maxLength) )
			setEndOfContenteditable(document.getElementsByClassName("inputListening")[parseInt(eq)])
		}
		
	})	
	
	function changeQuiz(val){
		$('.play-point').hide();
		$('#content5').scrollTop(0);
		if(val==1){
			$('.textBarBtn').attr('class','textBarBtn');
			$('.textBarBtn:eq(1)').addClass('textBarBtnDown');
			$('#txtCompletionSquare').css('display','none')
			$('.understandingBlock').hide()
			$('.listeningBlock').show()
			$('.txtCompletionBlock').hide()
		}else if(val==2){
			document.getElementById("audio").pause();
			document.getElementById("audio").currentTime = 0;
			$('.textBarBtn').attr('class','textBarBtn');
			$('.textBarBtn:eq(2)').addClass('textBarBtnDown');	
			if ('<%=studentAns_t%>'==''){
				$('#txtCompletionSquare').css('display','');
			}else{
				$('#txtCompletionSquare').css('display','none');
			}
			$('.understandingBlock').hide()
			$('.listeningBlock').hide()
			$('.txtCompletionBlock').show()			
		}else{
			document.getElementById("audio").pause();
			document.getElementById("audio").currentTime = 0;
			$('.textBarBtn').attr('class','textBarBtn');
			$('.textBarBtn:eq(0)').addClass('textBarBtnDown');	
			$('#txtCompletionSquare').css('display','none')
			$('.understandingBlock').show()
			$('.listeningBlock').hide()
			$('.txtCompletionBlock').hide()
			
		}
	}
	function shuffle(array) {
		var counter = array.length;
		random_word_answerPos = word_answerPos.slice(0);
		var tmpArray = array.slice(0);
		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			var index = Math.floor(Math.random() * counter);

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			var temp = tmpArray[counter];
			tmpArray[counter] = tmpArray[index];
			tmpArray[index] = temp;

			var tempB = random_word_answerPos[counter];
			random_word_answerPos[counter] = random_word_answerPos[index];
			random_word_answerPos[index] = tempB;
			
		}

		return tmpArray;
	}
	
	function changeOP(item, val){
		/**沒選**/
		if( $('.understandingQ:eq('+val+')').attr('data-item')=='0' ){
			$(item).find('.optionIcon').html('<div class="optionIconCircle"></div>');
			$('.understandingQ:eq('+val+')').attr('data-item',$(item).find('.optionIcon').attr('data-item'));
		/**有選**/
		}else{
			/**跟原來一樣**/
			if ( $('.understandingQ:eq('+val+')').attr('data-item') == $(item).find('.optionIcon').attr('data-item') ){
				$(item).find('.optionIcon').html('')
				$('.understandingQ:eq('+val+')').attr('data-item','0');
			/**跟原來不一樣**/
			}else{
				$('.optionIcon:eq('+((parseInt(val))*4+parseInt($('.understandingQ:eq('+val+')').attr('data-item'))-1).toString()+')').html('');
				$(item).find('.optionIcon').html('<div class="optionIconCircle"></div>');
				$('.understandingQ:eq('+val+')').attr('data-item',$(item).find('.optionIcon').attr('data-item'));
			}
		}
	}
	
	function submit(val){
	document.getElementById("audio").pause();
	if( confirm('確定送出答案嗎') ){
		if ( val==0 ){
			var Ans_u=""
			var Ans_l='<%=studentAns_l%>'
			var Ans_t='<%=studentAns_t%>'
			for(i=0;i<$('.understandingQ').length;++i){
				if(i!=$('.understandingQ').length-1){
					Ans_u += $('.understandingQ:eq('+i+')').attr('data-item') + ";";
				}else{
					Ans_u += $('.understandingQ:eq('+i+')').attr('data-item');
				}
			}
			
			$.ajax({
				url: './quiz.asp?xml='+'<%=xml%>',
				cache: false,
				type:'POST',
				data: {
					studentAns_u:Ans_u,
					studentAns_l:Ans_l,
					studentAns_t:Ans_t,
					whichQuiz:'reading'
				},
				dateType:'html',
				error: function(data){},
				success:function(data){
					$('#content5').html(data);
				}	   
			});
		}else if( val==1 ){
			var Ans_l=""
			var Ans_u='<%=studentAns_u%>'
			var Ans_t='<%=studentAns_t%>'
			for( i=0;i<$('.inputListening').length;++i ){
				var txtAns = $('.inputListening:eq('+i.toString()+')').text();
				if (txtAns==""){txtAns="???"}
				if( i!=$('.spanListeningQuiz').length-1 ){
					txtAns += ";"
				}
				Ans_l += txtAns;
			}
			
			$.ajax({
				url: './quiz.asp?xml='+'<%=xml%>',
				cache: false,
				type:'POST',
				data: {
					studentAns_l:Ans_l,
					studentAns_u:Ans_u,
					studentAns_t:Ans_t,
					whichQuiz:'listening'
				},
				dateType:'html',
				error: function(data){},
				success:function(data){
					$('#content5').html(data);
				}		   
			});		
		}else if( val==2 ){
			var Ans_t = tmpAns_t;
			var Ans_u = '<%=studentAns_u%>'
			var Ans_l = '<%=studentAns_l%>'
			$.ajax({
				url: './quiz.asp?xml='+'<%=xml%>',
				cache: false,
				type:'POST',
				data: {
					studentAns_t:Ans_t,
					studentAns_u:Ans_u,
					studentAns_l:Ans_l,
					whichQuiz:'word'
				},
				dateType:'html',
				error: function(data){},
				success:function(data){
					$('#content5').html(data);
				}	   
			});	
		}
	}else{
	}
	}	
	/**送出答案**/
	function raj(rec,type){
		var ids=mp3file1.split("mp3-8-1-")
		ids[1]=ids[1].replace(".mp3","")
		$.ajax({
			type:"POST",
			url:"./test_record.asp",
			data: {
				indx:ids[1],
				record: rec,
				test_type:type
			},
			dataType:"html",
			success:function(data){	
				///jquery_record(xml)
				$('#content5').append(data)
			}
		});	
	}
	
	// 有寫過測驗後返回，自動補上前回的得分 v
	function jquery_record(xmls){
		RightNow = new Date();
		var dd = "" + (RightNow.getMonth()+1)+ "" + RightNow.getDate() + "" + RightNow.getFullYear() + "" + RightNow.getHours() + "" + RightNow.getMinutes() + "" + RightNow.getSeconds() + ""
		$.ajax({
			url: '../../../../learning2016/record_xml.asp?xml='+xmls+'&dd='+dd,
			type:'GET',
			dateType:'xml',
			error: function(xml){
				alert('XML  error');
			},
			success:function(xml){
				if($(xml).find("lrc").attr("reading")!=''){	   
					$(".textBarBtn:eq(0)").html('<span class="scort-left">理解力</span><span class="scort-right"><span>'+$(xml).find("lrc").attr("reading")+"</span>分</span>");
				}
				if($(xml).find("lrc").attr("listening")!=''){	  
					$(".textBarBtn:eq(1)").html('<span class="scort-left">聽力</span><span class="scort-right"><span>'+$(xml).find("lrc").attr("listening")+"</span>分</span>");
				}
				if($(xml).find("lrc").attr("word")!=''){	  
					$(".textBarBtn:eq(2)").html('<span class="scort-left">克漏字</span><span class="scort-right"><span>'+$(xml).find("lrc").attr("word")+"</span>分</span>");
				}
				getXMLClass()
			}	
		});

	}	
	
	
	
</script>

<div class="textBar "></div>

<div class="understandingBlock "></div>


<div class="listeningBlock "></div>

<div class="txtCompletionBlock "></div>
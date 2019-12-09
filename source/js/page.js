
function left(mainStr,lngLen) {
	if (lngLen>0) {return mainStr.substring(0,lngLen)}else{return null}
} 
function right(mainStr,lngLen) {
	if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) {
		return mainStr.substring(mainStr.length-lngLen,mainStr.length)
	}else{
		return null
	}
}

function mid(mainStr,starnum,endnum){
	if (mainStr.length>=0){
		return mainStr.substr(starnum,endnum)
	}else{
		return null
	}
}

function  trim(str){
    for(var  i  =  0  ;  i<str.length  &&  str.charAt(i)=="  "  ;  i++  )  ;
    for(var  j  =str.length;  j>0  &&  str.charAt(j-1)=="  "  ;  j--)  ;
    if(i>j)  return  "";  
    return  str.substring(i,j);  
}
//

function dateDiff(interval, date1, date2)
{
	interval = interval.toUpperCase();
	var dt1 = Date.parse(date1.replace(/-/g, '/'));
	var dt2 = Date.parse(date2.replace(/-/g, '/'));
	try	{
		return Math.round((dt2 - dt1) / eval('(objInterval.' + interval + ')'));
	}catch (e){
		return e.message;
	}
}
	
function datenow(){
	return $.cookie("today");
}

function VipClick(){
	if($.cookie('VipClick')==undefined){
		$.cookie('VipClick', 4, {expires: 1, path: '/'});
		alert('此功能僅付費會員使用');
	}else if(parseInt($.cookie('VipClick'))<=parseInt(0)){
		$.cookie('VipClick', null);
		parent.location.href='../../';
	}else{
		$.cookie('VipClick',$.cookie('VipClick')-1);
		alert('此功能僅付費會員使用');
	}
}



function RemoveHTML( strText ){ 
	var regEx = /<[^>]*>/g; 
	return strText.replace(regEx, ""); 
} 

function RemoveSPACE( strText ){ 
	var regEx =/[^a-zA-Z0-9]/g
	return strText.replace(regEx, ""); 
} 

function RemoveTag( strText ){ 
	var regEx = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\“|\”|\‘|\’|\〝|\〞]/g; 	
	var regx=strText.replace(regEx, "");
	return regx; 
} 


function spanWord( strText , ary){ 
	var chstr='';
	var chstr2='';

	strText=strText.replace("[r1]","") 
	strText=strText.replace("[/r1]","") 
	strText=strText.replace("[r3]","") 
	strText=strText.replace("[/r3]","") 	  

	strText=escape(strText);
	chstr=strText.split("%20");
		
	for(w=0;w<chstr.length;w++){
		chstr2 += '<span '
		for( a in ary ){
			const re = new RegExp(ary[a], 'g');
			if( re.test(chstr[w]) ){
				chstr2 += 'class="is-phrase" '
			}
		}
		chstr2 += 'onClick=DrDate("';
		chstr2 += RemoveTag(unescape(chstr[w])) + '");>'
		chstr2 += unescape(chstr[w])
		chstr2 += '</span>'
		
	}
	return chstr2; 
} 

function spanWordTitle( strText ){
	var chstr='';
	var chstr2='';

	strText=strText.replace("[r1]","") 
	strText=strText.replace("[/r1]","") 
	strText=strText.replace("[r3]","") 
	strText=strText.replace("[/r3]","") 	  


	strText=escape(strText);
	chstr=strText.split("%20");
	
	for(w=0;w<chstr.length;w++){
		if(unescape(chstr[w]).indexOf('.')!=-1 || unescape(chstr[w]).indexOf(',')!=-1 || unescape(chstr[w]).indexOf('[r1]')!=-1 || unescape(chstr[w]).indexOf('[/r1]')!=-1 || unescape(chstr[w]).indexOf('[r3]')!=-1 || unescape(chstr[w]).indexOf('[/r3]')!=-1){
			chstr2=chstr2+'<span  onClick=DrDate("'+RemoveTag(unescape(chstr[w]))+'"); > '+unescape(chstr[w])+'</span>'
		}else{
			chstr2=chstr2+'<span  onClick=DrDate("'+RemoveTag(unescape(chstr[w]))+'"); > '+unescape(chstr[w])+'</span>'
		}
	}

	return chstr2; 
}


function spanWord2( strText ){ 
	var chstr='';
	var chstr2='';
	strText=escape(strText);
	chstr=strText.split("%20");
 
	for(w=0;w<chstr.length;w++){
		if(unescape(chstr[w]).indexOf('.')!=-1 || unescape(chstr[w]).indexOf(',')!=-1 || unescape(chstr[w]).indexOf('[r1]')!=-1 || unescape(chstr[w]).indexOf('[/r1]')!=-1 || unescape(chstr[w]).indexOf('[r3]')!=-1 || unescape(chstr[w]).indexOf('[/r3]')!=-1){
			chstr2=chstr2+'<span onDblClick=word_get("'+unescape(chstr[w])+'","'+w+'");> '+unescape(chstr[w])+'</span>'
		}else{
			chstr2=chstr2+'<span onDblClick=word_get("'+unescape(chstr[w])+'","'+w+'");> '+unescape(chstr[w])+'</span>'
		}
	}

	return chstr2; 
} 

//loading En
function jquery_en(url_str){
	$.ajax({
		url: '../../en/xml/'+url_str+'?dd='+dd,
		type:'GET',
		dateType:'xml',
		error: function(xml){
			// alert('XML  error1');
			//resetPage()
		},
		success:function(xml){
			en=xml;
			jquery_tc(url_str)
		}				
	});
}
//loading Tc
function jquery_tc(url_str){
	$.ajax({
		url: '../../tc/xml/'+url_str+'?dd='+dd,
		type:'GET',
		dateType:'xml',
		error: function(xml){
		},
		success:function(xml){
			tc=xml;	   
			main()
		}	
			
	});
}




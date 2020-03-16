
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

function tranchang(transtr){
	var regEx =/\[r1\]/g
	var regEx2 =/\[\/r1\]/g
	var regEx3 =/\[r2\]/g
	var regEx4 =/\[\/r2\]/g
	var regEx5 =/\[r3\]/g
	var regEx6 =/\[\/r3\]/g

	 //transtr="<font class='train_1'>"+transtr	
	 transtr=transtr.replace(regEx,"[r1]") 
	 transtr=transtr.replace(regEx2,"[/r1]") 
	 transtr=transtr.replace(regEx3,"") 
	 transtr=transtr.replace(regEx4,"") 	  
	 transtr=transtr.replace(regEx5,"[r3]") 
	 transtr=transtr.replace(regEx6,"[/r3]") 
	 
	 transtr=spanWord((transtr), pAry, 'page.js tranchang')
	 
	 transtr=transtr.replace(regEx5,"") 
	 transtr=transtr.replace(regEx6,"") 
	 transtr=transtr.replace(regEx,"") 
	 transtr=transtr.replace(regEx2,"") 
	 transtr=transtr.replace(regEx5,"") 
	 transtr=transtr.replace(regEx6,"") 


	

	return transtr;
	
}

// 函式：加戴字典事件。by Dr eye v
function spanWord( strText , ary){
	// console.log('is spanWord');
	// console.log('where from', where);
	// console.log(ary);
	
	var chstr='';
	var chstr2='';
	var R1String='',R1array='';
	var R3String='',R3array='';

	if(strText.indexOf('[r1]')>0){
		R1array=strText
		R1array=R1array.replace("[r3]","") 
		R1array=R1array.replace("[/r3]","") 
		R1array=R1array.split('[r1]')
		for(u=1;u<R1array.length;u++){
		   R1array[u]=R1array[u].split('[/r1]')[0]
		   R1String=R1String+R1array[u]
		}
	}

	if(strText.indexOf('[r3]')>0){
		R3array=strText
		R3array=R3array.replace("[r1]","") 
		R3array=R3array.replace("[/r1]","") 
		R3array=R3array.split('[r3]')
		for(u=1;u<R3array.length;u++){
		   R3array[u]=R3array[u].split('[/r3]')[0]
		   R3String=R3String+R3array[u]
		}
	}

	strText=strText.replace("[r1]","") 
	strText=strText.replace("[/r1]","") 
	strText=strText.replace("[r3]","") 
	strText=strText.replace("[/r3]","") 	  

	strText=escape(strText);

	chstr=strText.split("%20");
	if(R1String!=''){
		R1String=escape(R1String);
		R1String=R1String.split("%20");
	}
	if(R3String!=''){
		R3String=escape(R3String);
		R3String=R3String.split("%20");
	}
	
	

	for(w=0;w<chstr.length;w++){
		var isphrase=''
		var isR1=''
		var isR3=''

		// console.log('w |', chstr[w]);
		
		chstr2 += '<span '
		for( a in ary ){
			const re = new RegExp(ary[a], 'g');
			if( re.test(chstr[w]) ){
				isphrase=' is-phrase'
			}
		}
		
		if(R1String.length>0)
			for( b in R1String ){				
				const re2 = new RegExp(R1String[b], 'g');
				if( re2.test(chstr[w]) ){
					isR1=' is-art-strong'
				}
			}

		if(R3String.length>0)
			for( c in R3String ){
				const re3 = new RegExp(R3String[c], 'g');
				if( re3.test(chstr[w]) ){
					isR3=' is-art-title'
				}
			}

		chstr2 += 'class="'+isphrase+ isR1+ isR3+'" '
		
		chstr2 += 'onClick=DrDate("';
		chstr2 += RemoveTag(unescape(chstr[w])) + '");>'
		chstr2 += unescape(chstr[w])
		chstr2 += '</span>'
		
	}
	return chstr2; 
} 

// 函式：加戴字典事件。公司於使用 Dr eye 套件之前的舊版本會走此( dblclick event active fn word_get ) v
// 舊版本應不會再用到，故此註記掉 (2020/3/12) v
// function spanWord2( strText ){ 
// 	console.log('is spanWord2');
	
// 	var chstr='';
// 	var chstr2='';
// 	strText=escape(strText);
// 	chstr=strText.split("%20");
 
// 	for(w=0;w<chstr.length;w++){
// 		if(unescape(chstr[w]).indexOf('.')!=-1 || unescape(chstr[w]).indexOf(',')!=-1 || unescape(chstr[w]).indexOf('[r1]')!=-1 || unescape(chstr[w]).indexOf('[/r1]')!=-1 || unescape(chstr[w]).indexOf('[r3]')!=-1 || unescape(chstr[w]).indexOf('[/r3]')!=-1){
// 			chstr2=chstr2+'<span onDblClick=word_get("'+unescape(chstr[w])+'","'+w+'");> '+unescape(chstr[w])+'</span>'
// 		}else{
// 			chstr2=chstr2+'<span onDblClick=word_get("'+unescape(chstr[w])+'","'+w+'");> '+unescape(chstr[w])+'</span>'
// 		}
// 	}

// 	return chstr2; 
// } 

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
			//EX1()
		}	
			
	});
}




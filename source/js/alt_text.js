const alt_json = [
	{
		"selector": ".icon-refresh",
		"text": "隨機選讀"
	},
	{
		"selector": ".icon-print",
		"text": "列印"
	},
	{
		"selector": ".icon-star-big",
		"text": "點擊星星以收錄本篇文章至您的撥放清單中"
	},
	{
		"selector": "#playBtn1",
		"text": "開始/暫停全文撥放"
	},
	{
		"selector": "#playBtn3",
		"text": "開始/暫停全文撥放"
	},
	{
		"selector": ".icon-like",
		"text": "喜歡本篇文章嗎?請給我們個讚吧!"
	},
	{
		"selector": ".funbar-memobox",
		"text": "滑鼠左鍵於空白處雙點擊，可新增一張便利貼"
	},
	{
		"selector": ".funbar-phrase",
		"text": "查看本文相關的的重要單字片語(重要單字片語於本文中也會以藍色底線作標示)"
	},
	{
		"selector": ".funbar-collection",
		"text": "查看您在本篇收錄的單字;要收錄單字請先點擊想收錄的單字後再按收錄紐"
	},
	{
		"selector": "#alt0",
		"text": "點擊展開文章內容切換功能"
	},
	{
		"selector": "#altA",
		"text": "剪去干擾資訊, 掌握文章重點大意"
	},
	{
		"selector": "#altB",
		"text": "以藍色標示出強化描述句, 幫助理解細部內容"
	},
	{
		"selector": "#altC",
		"text": "以灰色標示出的為可省略語句, 專注了解文章主旨大意"
	},
	{
		"selector": "#altD",
		"text": "切換文章內容顯示中文及英文"
	},
	{
		"selector": "#altE",
		"text": "切換文章內容僅顯示英文"
	},
	{
		"selector": "#altF",
		"text": "切換至老師講解模式,文末將有老師講解語音"
	},
	{
		"selector": "#altG",
		"text": "切換至全文朗讀模式,快速閱讀全文"
	},
	{
		"selector": ".icon-pink",
		"text": "滑鼠滑入以展開測驗子項目介面"
	},
	// {
	// 	"selector": "開始/暫停全文撥放",
	// 	"text": ""
	// },
	// {
	// 	"selector": "",
	// 	"text": ""
	// },
	// {
	// 	"selector": "",
	// 	"text": ""
	// },
	// {
	// 	"selector": "",
	// 	"text": ""
	// },
	// {
	// 	"selector": "",
	// 	"text": ""
	// },
];

$(function(){
	// SINGLE
	setTimeout(function(){
		for(let i = 0; i< alt_json.length; i++){
			$(alt_json[i]['selector']).attr('title', alt_json[i]['text']);
		}

	}, 500);

	// EACH
	$('.funbar-phrase').click(function(){
		const $selector = $('.vacmain-sound');
		if( $selector.attr('title') == undefined ){
			$selector.each(function(){
				$(this).attr('title', '撥放單字發音')
			});
		}
	});

	$('body').on('mouseover', '.english', function(){
		const target1 = $(this).find('.icon-star');
		if( target1.attr('title') == undefined ){
			target1.attr('title', '點擊星星,以收錄此句至您的佳句收錄表中');
			$(this).find('.read_btn').attr('title', '點擊喇叭,以重複撥放此句語音')
		}
	});
	
	// SPECIAL
	const fnAddAlt = function(selector, text){
		$(selector).attr('title', text);
	}
});
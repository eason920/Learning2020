let player;
const youtube = function (videoId) {
	// append script
	const tag = document.createElement('script');
	tag.src = "./js/youtube_iframe_api.js";
	const firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	function onYouTubeIframeAPIReady() {
		player = new YT.Player('y-box', {
			videoId,
			playerVars: {
				autoplay: 1,
				playsinline: 1,
				loop: 1,
				rel: 0,
				controls: 0,
				origin: 'https://test.funday.asia/'
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			},
			host: 'https://www.youtube.com'
		});
	}
	
	function onPlayerReady(event) {
		// event.target.mute();
		event.target.playVideo();
	}
	function onPlayerStateChange(evt) {
		if (evt.data === YT.PlayerState.ENDED) {
			evt.target.playVideo();
		}
	}
	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
}

const scaleUp = function(){
	$('#y-box').addClass('action');
	$('.y-start').fadeOut();
	$('.y-small').fadeIn();
}


$(function () {
	$('.y-start').click(function(){
		$('.speed-point').fadeOut();
		$('.speed').removeClass('show');
		if( !$('#y-box').hasClass('is-first-start') ){
			player.playVideo();
			scaleUp();
		}else{
			youtube(videoId);
			$('#y-box').removeClass('is-first-start');
			setTimeout(function(){
				scaleUp();
			},700);	
		}
		// talk
		if( $(".play_btn").hasClass("pause") ) {
			$(".play_btn").removeClass('pause');
			pausetime();
		}
	});
	$('.y-small').click(function () {
		player.pauseVideo();
		$('#y-box').removeClass('action');
		$(this).fadeOut();
		$('.y-start').fadeIn();
	});

	$('.y-start').hover(function(){
		$(this).attr('src', 'images/y_start_over.png');
	}, function(){
		$(this).attr('src', 'images/y_start.png');
	});

	$('.play_btn').click(function () {
		if( $('.play_btn').hasClass('pause') ){
			// when playing
			$('.speed').removeClass("show");
			$('.speed-point').fadeOut();
			$('.play_btn').removeClass("pause");
			pausetime();
		}else{
			// when stoping
			$('.speed').addClass("show");
			$('.speed-point').fadeIn();
			$('.play_btn').addClass("pause");
			/playBtn1/.test($(this).attr('id')) ? pauseplay() : null;
		}

		// youtube
		if( !$('#y-box').hasClass('is-first-start') ){
			player.pauseVideo();
			$('#y-box').removeClass('action');
			$('.y-small').fadeOut();
			$('.y-start').fadeIn();
		}

		// nav bar ui control
		$('.is-step-main3').removeClass('is-open');
	});
		
	// ====================================
	// == ARTICLE SORT CIRCLE
	// ====================================
	$('#class_f').hover(function () {
		const $cfc = $('.classification');
		let cfcIndex = $cfc.find('.activity').index();
		$cfc.toggleClass('show');
		$cfc.toggleClass('eq'+cfcIndex);
		$cfc.siblings().toggleClass('eq'+cfcIndex);
	})

	// ====================================
	// == TOP BAR & FUNCTION BAR
	// ====================================
	const lbHtml1 = '<div class="lb-mask"></div><div class="lb is-lb-step1 ' + template +'"><div class="lb-box"><h2 class="lb-title">研讀本文</h2><ul class="lb-contentbox"><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">1</div><div class="lb-text">聆聽原文 ：</div></div><div class="lb-right">透過文字跟播放導讀的過程中，試著理解這篇文章主要大意是傳遞什麼訊息。</div></li><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">2</div><div class="lb-text">老師講解 ：</div></div><div class="lb-right">可挑選較不熟悉的段落，透過老師講解與註記功能，讓您更精準的了解文章大意。</div></li><li class="lb-item"><div class="lb-left is-t3"><div class="lb-num">3</div><div class="lb-text">便利貼 ：</div></div><div class="lb-right">如果自己需要加強補充，可使用便利貼，用自己的語言去註記，詮釋感受到的意義。</div></li><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">4</div><div class="lb-text">收錄佳句 ：</div></div><div class="lb-right">點選句子前面的小星號，可收錄自己喜歡的英文佳句。</div></li><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">5</div><div class="lb-text">收錄單字 ：</div></div><div class="lb-right">在查字典的過程中，如果有些單字對您來說是蠻重要的，可點選右上角星星，收錄起來。</div></li><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">6</div><div class="lb-text">單字片語 ：</div></div><div class="lb-right">本文作者也有提供特別的單字片語，另外做一些說明跟例句，提供給您做參考。</div></li></ul><div class="lb-checkbox"><input class="lb-check" id="lbCheck1" type="checkbox"><label class="lb-label" for="lbCheck1"><div class="lb-quadrangle"><div class="icon-check"></div></div>30天內不再顯示此訊息 </label></div><div class="lb-start">Start</div></div></div>';
	const lbHtml2 = '<div class="lb-mask"></div><div class="lb is-lb-step2 ' + template +'"><div class="lb-box"><h2 class="lb-title">加強記憶</h2><ul class="lb-contentbox"><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">1</div><div class="lb-text">抄寫練習：</div></div><div class="lb-right">將聽到的原音一字一句抄寫在筆記本中，可大幅強化本文語感與文字能力。</div></li><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">2</div><div class="lb-text">跟讀練習：</div></div><div class="lb-right">抄完之後試著點選錄音鍵，將你所聽到的句子再錄一次，撥放給自己聽，增強自己的跟讀能力。</div></li></ul><div class="lb-checkbox"><input class="lb-check" id="lbCheck1" type="checkbox"><label class="lb-label" for="lbCheck1"><div class="lb-quadrangle"><div class="icon-check"></div></div>30天內不再顯示此訊息 </label></div><div class="lb-start">Start</div></div></div>';
	const lbHtml3 = '<div class="lb-mask"></div><div class="lb is-lb-step3 ' + template +'"><div class="lb-box"><h2 class="lb-title">學習驗收</h2><ul class="lb-contentbox"><li class="lb-item"><div class="lb-left is-t5"><div class="lb-num">1</div><div class="lb-text">理解力測驗：</div></div><div class="lb-right">確實瞭解文章內容嗎？依照內容依序回答下列問題吧！</div></li><li class="lb-item"><div class="lb-left is-t4"><div class="lb-num">2</div><div class="lb-text">聽力測驗：</div></div><div class="lb-right">利用滑鼠點擊喇叭播放音擋，試著將隱藏的單字拼出來，快速檢視自己的聽力及字彙能力。</div></li><li class="lb-item"><div class="lb-left is-t5"><div class="lb-num">3</div><div class="lb-text">克漏字測驗：</div></div><div class="lb-right">想增進介系詞與片語能力嗎？依照題號順序，點選右方最適合的答案，完成後，即可獲得解答與分數。</div></li></ul><div class="lb-checkbox"><input class="lb-check" id="lbCheck1" type="checkbox"><label class="lb-label" for="lbCheck1"><div class="lb-quadrangle"><div class="icon-check"></div></div>30天內不再顯示此訊息 </label></div><div class="lb-start">Start</div></div></div>';
	if( read1 === false ){
		$('body').append(lbHtml1);
	}

	$('.topbar-step-item').click(function(){
		const $body = $('body');
		const $this = $(this);
		const targetClass = $this.attr('class');
		let i = '';

		// job 1 : INIT VIDEO v
		pausetime();
		$('.speed').removeClass("show");
		$('.speed-point').fadeOut();
		$('.play_btn').removeClass("pause");

		// job 2 : TOP-BAR-ITEM control v
		$('.topbar-step-item').removeClass('active');
		$(this).addClass('active');

		// job 3 : STEP-BLOCK control v
		switch(true){
			case /1/.test( targetClass ):
				i = '1';
				break;
			case /2/.test( targetClass ):
				i = '2';
				break;
			case /3/.test( targetClass ):
				i = '3';
				break;
			default:
		}
		$('#stepBox').removeClass('is-step1 is-step2 is-step3').addClass('is-step'+i);

		// job 4 : EX3 SCROLLTOP control v
		if( !/3/.test( i ) ){
			$('#exBox').css({top: 0});
			// aside player status v
			$('.aside-speedbox.is-play3').removeClass('is-lock');
		}

		// job 5 : LIGHT-BOX CHECK v
		read1 = true
		switch(true){
			case i === '1' && read1 === false:
				$body.append(lbHtml1);
				break;
			case i === '2' && read2 === false:
				$body.append(lbHtml2);
				read2 = true;
				break;
			case i === '3' && read3 === false:
				$body.append(lbHtml3);
				read3 = true;
			default:
		};
	});

	// ------------------------------------
	// -- step 3 = ex1 ~ 3
	// ------------------------------------
	const $step3 = $('.is-step-switch3');

	$('.icon-pink').mouseover(function(){
		$step3.addClass('is-open');
	});

	const closeScort = function(){
		$step3.hasClass('is-open') ? $step3.removeClass('is-open') : null;		
	}
	
	let sid = setTimeout(closeScort, 2000);
	$('.topbar-scort-outer').hover(function(){
		clearTimeout(sid);
	}, function(){
		closeScort();
	});

	$('.is-step-switch2, .topbar-icon').mouseover(function(){
		closeScort();
	});

	$('.topbar-scrot-item').click(function(){
		const $play3 = $('.aside-speedbox.is-play3');
		$play3.addClass('is-lock')
		const className = $(this).attr('class');
		let index;
		switch(true){
			case /1/.test(className):
				index = 0;
				$play3.removeClass('is-lock');
				break;
			case /2/.test(className):
				index = 1;
				$play3.removeClass('is-lock');
				break;
			case /3/.test(className):
				index = 2;
				$play3.addClass('is-lock');
				break;
			default:
		};

		const height = $('#stepBlock3').height();
		const top = index * height * -1;

		if( /step3/.test( $('#stepBox').attr('class') ) ){
			$('#exBox').animate({top});
		}else{
			$('#exBox').css({top});
		}
	});

	// ====================================
	// == LIGHT BOX
	// ====================================
	$('.icon-how').click(function(e){
		e.preventDefault;
		let src;
		const val = $('#stepBox').attr('class');
		switch(true){
			case /step1/.test(val):
				src = lbUrl1;
				break;
			case /step2/.test(val):
				src = lbUrl2;
				break;
			case /step3/.test(val):
				src = lbUrl3;
				break;
			default:
				src = lbUrl1;
		};
		$('body').append(
			$('<div>', {class: 'lb-mask-teach'}),
			$('<div>', {class: 'lb is-lb-teach'}).append(
				$('<div>', {class: 'lb-box'}).append(
					$('<iframe>', {src})
				)
			)
		);
	});

	// REMOVE LIGHT-BOX v
	$('body').on('click', '.lb-mask-teach, .lb-mask-final, .lb-start', function(){
		$('.lb-mask-teach, lb-mask, .lb').fadeOut(100);
		setTimeout(function(){
			$('.lb-mask-teach, .lb-mask-final, .lb-mask, .lb').remove();
		}, 300);
	});


	// ====================================
	// == START SWITCH
	// ====================================
	$('#stepBlock1, #stepBlock2').on('click', '.icon-star', function(){
		$(this).toggleClass('active');
	});

	$('.icon-star-big').click(function(){
		$(this).toggleClass('active');
	});

	// ====================================
	// == PRINT
	// ====================================
	const printScreen = function(target){
		const title = $('title').text();
		const value = target.innerHTML;
		let printPage = window.open();
		printPage.document.open();
		printPage.document.write(
			"<html><head>" 
			+ "<link rel='icon' href='./images/favicon.ico' type='image/ico'></link>"
			+ "<title>" + title + "</title>"
			+ "<link href='css/bootstrap.min.css' rel='stylesheet' type='text/css'>"
			+ "<link rel='stylesheet' href='css/all.css'>"
			+ "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Playfair+Display&amp;display=swap'>"
			+ "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Abril+Fatface&amp;display=swap'>"
			+ "<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Engagement&amp;display=swap'>"
			+ "<link href='css/print.css' rel='stylesheet' type='text/css'>"
			+ "</head><body onload='window.print();window.close()'>"
			+ value
		);
		printPage.document.close("</body></html>");
	};

	$('.icon-print').click(function(){
		const i = $('.topbar-step-item.active .topbar-num').text();
		switch(true){
			case i == 1:
				printScreen(stepBlock1);
				break;
			case i == 2:
				printScreen(stepBlock2);
				break;
			case i == 3:
				printScreen(stepBlock3);
				break;
			default:
				printScreen(stepBlock1);
		}
	});

	// ====================================
	// == aside title height
	// ====================================
	let titleMaxHeight;
	const $asideTitle = $('#title-a');
	$(window).width() < 1441 ? titleMaxHeight = 126 : titleMaxHeight = 171;
	$asideTitle.height() > titleMaxHeight ? $asideTitle.css('font-size', '2.5rem') : null;
});

console.log('%c remenber ui_all.js 「pausetime();」', 'color: red;font-size: 16px');
// setTimeout(function(){
// 	$('.is-step-switch2').click();
// },10);
// console.log('%c remenber switch2 default in \'ui_all\' ', 'color: greenyellow; font-size: 20px');

//nglEq0nxEdg // galaxy
//CZoYuWA21SU // bird
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
			pausetime()
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
	// youtube end

	// 講解 <--> 朗讀
	const $control = $('#control-1');
	const $explain = $('.article2');
	const $readOnly = $('.article');
	$('#control-1 .toggle').click(function () {
		$control.toggleClass("active");
		if($control.attr('data-value')=='0'){
			$control.attr('data-value','1');
			$explain.show()
			$readOnly.hide();
		}else{
			$control.attr('data-value','0');
			$readOnly.show();
			$explain.hide();			
		}
			//console.log($('#control-1').attr('data-value'))
	})
	$('#control-1 b').click(function(){
		$control.addClass("active");
		$control.attr('data-value', '1');
		$explain.show();
		$readOnly.hide();
	});
	$('#control-1 i').click(function(){
		$control.removeClass("active");
		$control.attr('data-value', '0');
		$readOnly.show();
		$explain.hide();
	});

	$('.play_btn').click(function () {
		$('.speed').toggleClass("show");
		$('.speed-point').fadeToggle();
		$('.play_btn').toggleClass("pause");
		pauseplay()
		if($(".play_btn").hasClass("pause")==false){
			pausetime()
		}
		// youtube
		if( !$('#y-box').hasClass('is-first-start') ){
			player.pauseVideo();
			$('#y-box').removeClass('action');
			$('.y-small').fadeOut();
			$('.y-start').fadeIn();
		}
		$('.is-step3').removeClass('is-open');
	});

	let beforeClassName='';
	$('.funbar-phrase, .funbar-collection').click(function (e) {
		e.preventDefault;
		// init class name
		const className = $(this).attr('class');
		// title text
		let title;
		let canIclose;
		if(/phrase/i.test(className)){
			title='Phrase'
			canIclose = 'phrase';
			$('.translation_list').show();
			$('.translation_list2').hide();
		}else{
			title='單字收錄';
			canIclose = 'collection';
			$('.translation_list').hide();
			$('.translation_list2').show();
		}
		$('.translation_Font').text(title);
		// on vision
		$('.funbar-phrase, .funbar-collection').removeClass('active');
		$(this).addClass('active');
		if( !$('section').hasClass('move') ){
			$('section, .funbar-block').addClass("move");
			$('.tranglationBody').addClass("show");
			$('.is-step3').removeClass('is-open');
		}else{
			if( beforeClassName.indexOf( canIclose ) >= 0 ){
				$(this).removeClass('active');
				$('section, .funbar-block').toggleClass("move");
				$('.tranglationBody').toggleClass("show");
			}
		};
		beforeClassName = className;
	});

	// for coding
	// $('.funbar-collection').click();
	// $('.topbar-scort-outer').hide();

	$('.tranglationBody .close_btn').click(function () {
		$('.funbar-btn').removeClass('active');
		$('section, .funbar-block').removeClass('move');
		$('.tranglationBody').removeClass("show");
	})
	
	// ------------------------------------
	$('.colbox-placeholder').click(function(){
		$(this).hide();
		$(this).siblings('.colbox-input').show().focus();
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

	$('.message_btn').click(function () {
		$(".mask").stop().animate({ 'scrollTop': $("#message").offset().top - 70 }, 1000, 'swing');
	})

	// ====================================
	// ==  READ_BTN CLICK STOP YOUTUBE
	// ====================================
	$('.article_mask').on('click', '.read_btn', function(){
		$('.speed').addClass('show');
		$('.speed-point').fadeIn();
		if( !$('#y-box').hasClass('is-first-start') ){
			player.pauseVideo();
			$('#y-box').removeClass('action');
			$('.y-start').fadeIn();
			$('.y-small').fadeOut();
		};
		$('.is-step3').removeClass('is-open');
	})


	// ====================================
	// == TOPBAR-STEP
	// ====================================
	$('.open-btn').click(function(e){
		$(this).parent().toggleClass('is-open');
	});
	setTimeout(function(){
		$('.topbar-num.open-btn').click();
	}, 800);
	const closeScort = function(){
		if( $('.is-step3').hasClass('is-open') ){
			$('.is-step3').removeClass('is-open')
		}		
	}
	let sid = setTimeout(closeScort, 2800);
	$('.is-step3').hover(function(){
		clearTimeout(sid);
	}, function(){
		// console.log('got');
		sid = setTimeout(closeScort, 1500);
	});

	$('.topbar-scort-item').mouseout(function(){
		// closeScort();
	});
	// $('.word_btn').click();
	// =============================
	// == CONTROL EN & CH
	// =============================
	$('.is-ench .controlbox-item').click(function(){
		const $parent = $('.is-ench');
		const $target = $('article').find('.Chinese')
		$parent.toggleClass('active').hasClass('active') ? $target.slideDown(150) : $target.slideUp(150);
	});

	// ====================================
	// == PHRASE HIGHT LIGHT
	// ====================================
	$('.vacmain-en').each(function(){
		const end = $(this).text().indexOf('(');
		const string = $(this).text().slice(0, end).trim();
		console.log( string );

		const re = new RegExp(string, 'g');
		console.log(re);

		string.replace(re, 'eason');
		
		
		
	});

	//========================================================
	//========================================================
	const tryString ='have a good time';
	const tryNew = tryString.replace(/a/g, '>>>');
	console.log(tryNew);

	// $target.html(html)
	// $target.html(function(index, html) {
	// 	return html.replace(/([\[][^\]]*)/g, "<span>$1</span>");
	// });
	// $target.html(function(index, html) {
	// 	return html.replace(/([\[][\]]*)/g, "<i>$1</i>");
	// });
	
});

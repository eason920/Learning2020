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
			// pausetime();
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
			// pausetime();
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
	$('.topbar-step-item').click(function(){
		// init video
		// pausetime();
		$('.speed').removeClass("show");
		$('.speed-point').fadeOut();
		$('.play_btn').removeClass("pause");

		// v start v
		const $this = $(this);
		const check = $this.attr('class');
		let className = '';

		$('.topbar-step-item').removeClass('active');
		$(this).addClass('active');

		switch(true){
			case /switch1/.test( check ):
				className = 'is-step1';
				break;
			case /switch2/.test( check ):
				className = 'is-step2';
				break;
			case /switch3/.test( check ):
				className = 'is-step3';
				break;
			default:
		}
		$('#stepBox').removeClass('is-step1 is-step2 is-step3').addClass(className);

		if( !/step3/.test( $('#stepBox').attr('class') ) ){
			$('#exBox').css({top: 0});
			// aside player status v
			$('.aside-speedbox.is-play3').removeClass('is-lock');
		}
	});


	// ------------------------------------
	// -- step 3
	// ------------------------------------
	$pink = $('.icon-pink');
	$step3 = $('.is-step-switch3');

	$pink.mouseover(function(){
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
		$('body').append(
			$('<div>', {class: 'lb-mask'}),
			$('<div>', {class: 'lb'}).append(
				$('<div>', {class: 'lb-box'}).append(
					$('<iframe>', {src: lbUrl})
				)
			)
		);
	});

	$('body').on('click', '.lb-mask', function(){
		$('.lb-mask, .lb').fadeOut(100);
		setTimeout(function(){
			$('.lb-mask, .lb').remove();
		}, 150);
		
	});
	
	// ====================================
	// == COVER
	// ====================================
	$('body').on('click', '.cover-btn', function(){
		const $cover = $(this).parent().parent();
		const $block = $(this).parents().find('.is-lock');
		$cover.fadeOut(200);
		setTimeout(function(){
			$cover.remove();
			$block.removeClass('is-lock');
		}, 200);
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

});

console.log('%c remenber ui_all.js 「pausetime();」', 'color: red;font-size: 16px');

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
	// == TOPBAR
	// ====================================
	$('.nav-to-step1, .nav-to-step2, .nav-to-step3').click(function(){
		const $this = $(this);
		const check = $this.attr('class');
		let className = '';

		$('.topbar-step-item').removeClass('active');
		$(this).addClass('active');

		switch(true){
			case /step2/.test( check ):
				className = 'is-step2';
				break;
			case /step3/.test( check ):
				className = 'is-step3';
				break;
			default:
		}
		$('.blockbox').removeClass('is-step2 is-step3').addClass(className)
	});


	// ------------------------------------
	// -- step 3
	// ------------------------------------
	$pink = $('.icon-pink');
	$step3 = $('.nav-to-step3');

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

	$('.nav-to-step2, .topbar-icon').mouseover(function(){
		closeScort();
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
});

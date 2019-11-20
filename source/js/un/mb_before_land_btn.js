//nglEq0nxEdg // galaxy
//CZoYuWA21SU // bird
let yBox;
const youtube = function(videoId){
	// append script
	const tag = document.createElement('script');
	tag.src = "./js/youtube_iframe_api.js";
	const firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	function onYouTubeIframeAPIReady() {
		yBox = new YT.Player('y-box', {
			videoId,
			playerVars: {
				autoplay: 1,
				playsinline: 1,
				loop: 1,
				rel: 0,
				controls: 0,
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}
	function onPlayerReady(event) {
		$('.y-start, .Read_More_btn, .b-youtube-start').removeAttr('style');
		// event.target.mute();
		// event.target.playVideo();
	}
	function onPlayerStateChange(evt) {
		if (evt.data === YT.PlayerState.ENDED) {
			evt.target.playVideo();
		}
	}
	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
}

$(function () {
	const nua = navigator.userAgent;
	// v START
	let layoutType = layout
	const $yStart = $('.y-start');
	const $ySmall = $('.y-small');
	const $yStartB = $('.b-youtube-start');

	const scaleUp = function(){
		$('#y-box').addClass('action');
		$yStart.fadeOut();
		$yStartB.fadeOut();
		$ySmall.fadeIn();
	}
	
	$('.ios-pausing').click(function(){
		if( !$(this).hasClass('ios-pause') ){
			yBox.pauseVideo();
			$(this).addClass('ios-pause');
		}else{
			yBox.playVideo();
			$(this).removeClass('ios-pause');
		}
	});


	$('.Read_More_btn').click(function () {
		$('.article_cover').addClass("Read_on");
		$('section').addClass("Read_on");
		$('.message_btn').addClass("show");
		$('.ad').addClass("show");
		$('nav .share_btn.for-layout-a').removeAttr('style');
	});		


	// PAUSE YOUTUBE BY CLICK LITTLE AUDIO ICON
	$('.article').on('click', '.english .link', function(){
		yBox.pauseVideo();
	});


	$('.share_btn').click(function () {
	  	$('#sharebox').addClass("showbox");
	});

	$('.close_share, #sharebox').click(function () {
		$('#sharebox').removeClass("showbox");
		$('.ad').addClass("show");
	});

	$('.close_join,.join_btn,.fb_btn').click(function () {
		$('#joinbox').removeClass("showbox");
		$('.ad').addClass("show");
	});
	
	$('.back_btn').click(function () {
	  	$('.ad').addClass("show");
	});
	
	$('.article').on('click', '.english span', function(){
		$('.english span').removeAttr('style');
		$(this).css({backgroundColor: '#f5a623', color: "#fff"});
	});

	
	

	// ====================================
	// == v SCROLL 'READ MORE'
	// ====================================
	let newTop;
	let oldTop;
	const $readMore = $('.read-more');
	$('.scroller').scroll(function(){
		oldTop = newTop;
		newTop = $(this).scrollTop();
		if( newTop > oldTop ){
			$readMore.removeClass('is-show');
		}else{
			$readMore.addClass('is-show');
		}
	});

	// =============================
	// == A
	// =============================
	if( layoutType == 'a' ){
		// v INTI
		$('.vision-box.for-layout-b').remove();
		$('.b-youtube-start').remove();
		// v START
		youtube(videoId);
		$('.Read_More_btn').click(function () {
			const height = $(window).width() * 0.56;
			const $ytF1 = $('.Read_on .vision-yt-f1');
			$ytF1.css({ height });
			yBox.playVideo();
			scaleUp();
			yBox.mute();
			// ^^ youtube layout a
			$('.article_cover').css({ height });
			const scrollHeight = 'calc( 100% - ' + height + 'px )';
			$('.scroller').css({ height: scrollHeight });


			// v UP & DOWN HEIGHT SHARE
			const $target = $('.scroller');
			if (/iphone/i.test(nua)) {
				$target.css({ marginTop: '-5px' }); // 影片與文章間的間隙 in ios ( android 在 mb.js 中 )
			}
		});

		$yStart.click(function () {
			yBox.playVideo();
			scaleUp();
			if (/iphone/i.test(nua)) {
				$('.ios-pausing').removeClass('ios-pause').show();
			}
		});
		$ySmall.click(function () {
			yBox.pauseVideo();
			$('#y-box').removeClass('action');
			$(this).fadeOut();
			$yStart.fadeIn();
			$('.ios-pausing').addClass('ios-pause').hide();
		});


		$('.message_btn,.join_btn,.fb_btn').click(function () {
			$('.messagebox').addClass("show");
		});

		$('.back_btn').click(function () {
			$('.messagebox').removeClass("show");
		});


		// PLAY CURSOR & YOUTUBE
		$('#audioPlayer-a').click(function () {
			if ($(this).attr('src') == 'images/mb_a/play_btn.png') {
				// playing to pause
				$(this).attr('src', 'images/mb_a/pause_btn.png')
				$('.main').addClass('is-playing')
				pauseplay();
				yBox.pauseVideo();
			} else {
				// pausing to play
				$(this).attr('src', 'images/mb_a/play_btn.png')
				$('.main').removeClass('is-playing')
				pausetime()
				yBox.playVideo();
			}
		})
	};



	// =============================
	// == B
	// =============================
	if( layoutType == 'b'){
		// INITE
		$('.for-layout-a .vision-box').remove();
		// v START
		$('.message_btn,.join_btn,.fb_btn').click(function () {
			$('#messagebg').addClass("showbox");
		});

		$('.back_btn').click(function () {
			$('#messagebg').removeClass("showbox");
		});


		const $collapseMain = $('.main');
		const $collapseAudio = $('.article_cover');
		const $collapseVideo = $('.vision-box.for-layout-b');
		const $collapseArticle = $('.scroller');
		let audioHeight;
		let videoHeight;
		$('.Read_More_btn').on('click', function () {
			// AUDIO PLAY BOX
			audioHeight = $collapseAudio.height();
			// $collapseAudio.css({height: audioHeight});

			// VISION BOX
			videoHeight = $(window).width() * 0.55;
			$('.vision-box').show();
			youtube(videoId);
			$('.vision-box').css({height: videoHeight});
		});

		
		$('.btn-audio').click(function(){
			$collapseMain.removeClass('play-video').addClass('play-audio');
			const height = $(window).height() - audioHeight;
			$collapseArticle.css({height});
		});

		$('.btn-video').click(function(){
			$collapseMain.removeClass('play-audio').addClass('play-video');
			const height = $(window).height() - videoHeight - 60;
			$collapseArticle.css({height});
		});

		
		$yStartB.click(function () {
			if( $(this).hasClass('first-time') ){
				yBox.playVideo();
				$(this).removeClass('first-time');
				$('.vision-box.for-layout-b').removeClass('is-y-play');
				pausetime()
			}else{
				yBox.playVideo();
				$('.vision-box.for-layout-b').removeClass('is-y-play');
				pausetime()
				$('#audioPlayer-b img').attr('src', 'images/mb_b/pink_play.png');
			}
			scaleUp();
			if (/iphone/i.test(nua)) {
				$('.ios-pausing').removeClass('ios-pause').show();
			}
		});
		$ySmall.click(function () {
			yBox.pauseVideo();
			$('#y-box').removeClass('action');
			$(this).fadeOut();
			$yStartB.fadeIn();
			$('.vision-box.for-layout-b').addClass('is-y-play');
			$('.ios-pausing').addClass('ios-pause').hide();
		});

		// v layoutType B .message_btn
		$('.message_btn, .back_btn').click(function () {
			$('.scroller').toggleClass('is-lock')
		});

		$('#audioPlayer-b img').click(function () {
			if ($(this).attr('src') == 'images/mb_b/pink_play.png') {
				$(this).attr('src', 'images/mb_b/pink_pause.png')
				$('.vision-box.for-layout-b').addClass('is-y-play');
				yBox.pauseVideo();
				$yStartB.fadeIn();
				pauseplay()
			} else {
				$(this).attr('src', 'images/mb_b/pink_play.png')
				pausetime()
			}
		});

		$('.article').on('click', '.english .link', function(){
			$('#y-box').removeClass('action');
			$ySmall.fadeOut();
			$yStartB.fadeIn();
			$('.vision-box.for-layout-b').addClass('is-y-play');
			$('.ios-pausing').addClass('ios-pause').hide();
			$('#audioPlayer-b img').attr('src', 'images/mb_b/pink_pause.png');
			$('.main').removeClass('is-playing');
		});
	};

});
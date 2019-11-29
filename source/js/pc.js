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
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
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
	// 英 <--> 中英
	// $('#control-2 .toggle').click(function () {
	// 	$('#control-2').toggleClass("active");
	// 	$('.Chinese').toggleClass("show");
	// })
	$('.play_btn').click(function () {
		$('.speed').toggleClass("show");
		$('.speed-point').fadeToggle();
		$('.play_btn').toggleClass("pause");
		pauseplay()
		if($(".play_btn").hasClass("pause")==false){
			pausetime()
		}
		// youtube
		player.pauseVideo();
		$('#y-box').removeClass('action');
		$('.y-small').fadeOut();
		$('.y-start').fadeIn();
	});


	$('.word_btn').click(function () {
		$('section').toggleClass("move");
		$('.tranglationBody').toggleClass("show");
	})
	$('.tranglationBody .close_btn').click(function () {
		$('section').removeClass('move');
		$('.tranglationBody').removeClass("show");
	})
	
	
	
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
		player.pauseVideo();
		$('#y-box').removeClass('action');
		$('.y-small').fadeOut();
		$('.y-start').fadeIn();
	})


	// =============================
	// == FLOAT LAB
	// =============================
	// ------------------------------------
	// -- add
	// ------------------------------------
	// console.log(memberJSON);
	// console.log(memberJSON.memo.length);

	const addMemo = function(msg, top, left){
		$('body').append(
			$('<div>', {class: 'memobox'}).css({top, left}).append(
				$('<div>', {class: 'memobox-bar'}),
				$('<textarea>', {class: 'memobox-text', placeholder: '在此輸入您的筆記'}).html(msg),
				$('<div>', {class: 'memobox-box'}).append(
					$('<input>', {class: 'memobox-del', type: 'button', value: '刪除筆記'}),
					$('<input>', {class: 'memobox-save', type: 'submit', value: '儲存'})
				)
			)
		);	
	};

	const defOffset = 76;
	if(memberJSON.memo.length > 0){
		let i=0;
		for(a in memberJSON.memo ){
			addMemo(memberJSON.memo[a], defOffset + i*30, defOffset + i*30);
			i++;
		};
	};
	$('.add-label').click(function(){
		const num = $('.memobox').length;
		const left = defOffset + num * 30;
		const top = left;
		if(num <= 4){
			addMemo('', top, left);
		}else{
			console.log('is max');
		}
	});

	// ------------------------------------
	// -- move
	// ------------------------------------
	let zIndex = 15;
	$('body').on('mousedown', '.memobox-bar, .memobox-box', function (e) {
		// e.preventDefault();
		let $selector = null;
		let x, y;
		const $this = $(this);
		const $doc = $(document);
		const dw = $doc.width();
		const dh = $doc.height();

		$selector = $this.parents('.memobox');

		$selector.addClass('moving').css({ 'zIndex': zIndex++ });

		const offsets = $selector.offset();
		x = offsets.left - e.pageX;
		y = offsets.top - e.pageY;

		const soft = 5;
		const maxL = dw - $selector.width() - soft;
		const maxT = dh - $selector.height() - soft;
		$doc.on('mousemove.event', function (e) {
			$('body').css({'userSelect': 'none'});
			let tx = x + e.pageX,
				ty = y + e.pageY,
				dw = $doc.width();
			if (tx >= maxL) {
				tx = maxL;
			} else if (tx <= soft) {
				tx = soft;
			}
			if (ty >= maxT) {
				ty = maxT;
			} else if (ty <= soft) {
				ty = soft;
			}
			$selector.css({
				left: tx,
				top: ty
			});
		}).on('mouseup.event', function () {
			if ($selector != null) {
				$doc.off('.event');
				$selector.removeClass('moving');
				$selector = null;
				$('body').removeAttr('style');
			};
		});
	});

	// ------------------------------------
	// -- level
	// ------------------------------------
	$('body').on('click', '.memobox', function(){
		$(this).css({'zIndex': zIndex ++});
	});

	// ------------------------------------
	// -- delete
	// ------------------------------------
	$('body').on('click', '.memobox-del', function(e){
		e.preventDefault();
		$(this).parent().parent().remove();
		console.log('delete');
		
	})

	// ====================================
	// == TOPBAR-STEP
	// ====================================
	$('.is-step3').click(function(){
		$(this).toggleClass('is-open');
	});
});

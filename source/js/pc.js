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
	$('.funbar-vacabulary, .funbar-collection').click(function (e) {
		e.preventDefault;
		// init class name
		const className = $(this).attr('class');
		// title text
		let title;
		/vacabulary/i.test(className)?title='Vacabulary':title='Collection';
		$('.translation_Font').text(title);
		// on vision
		$('.funbar-btn').removeClass('active');
		$(this).addClass('active');
		if( !$('section').hasClass('move') ){
			$('section, .funbar-block').addClass("move");
			$('.tranglationBody').addClass("show");
			$('.is-step3').removeClass('is-open');
		}else{
			if( beforeClassName.indexOf( title.toLowerCase() ) >= 0 ){
				$(this).removeClass('active');
				$('section, .funbar-block').toggleClass("move");
				$('.tranglationBody').toggleClass("show");
			}
		};
		beforeClassName = className;
	});

	$('.tranglationBody .close_btn').click(function () {
		$('.funbar-btn').removeClass('active');
		$('section, .funbar-block').removeClass('move');
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
		if( !$('#y-box').hasClass('is-first-start') ){
			player.pauseVideo();
			$('#y-box').removeClass('action');
			$('.y-start').fadeIn();
			$('.y-small').fadeOut();
		};
		$('.is-step3').removeClass('is-open');
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
		$('article .mask').append(
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
		if(num <= 14){
			addMemo('', top, left);
		}else{
			console.log('is max');
		}
	});

	// ------------------------------------
	// -- move
	// ------------------------------------
	let zIndex = 15;
	$('article .mask').on('mousedown', '.memobox-bar, .memobox-box', function (e) {
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
		sid = setTimeout(closeScort, 2800);
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
});

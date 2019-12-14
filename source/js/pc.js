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

	// for coding demo
	// $('.funbar-collection').click();
	// $('.topbar-scort-outer').hide();

	$('.tranglationBody .close_btn').click(function () {
		$('.funbar-btn').removeClass('active');
		$('section, .funbar-block').removeClass('move');
		$('.tranglationBody').removeClass("show");
	})
	
	// ====================================
	// == COLLECT EDIT
	// ====================================
	const checkColbox = function(target){
		if( target.find('.colbox-underbox-memo').text().trim() != '' ){
			target.find('.colbox-underbox-placeholder').hide();
			target.find('.colbox-underbox-memo').show();
		}else{
			target.find('.colbox-underbox-memo').hide();
			target.find('.colbox-underbox-placeholder').show();
		}
	}
	$('.colbox-item').each(function(){
		checkColbox($(this));
	});

	$('.colbox-underbox-memo, .colbox-underbox-placeholder').click(function(e){
		e.preventDefault;
		const $this = $(this);
		const text = $this.parent().find('.colbox-underbox-memo').text();
		$this.hide();
		$this.siblings('.colbox-underbox-editbox').show().find('.colbox-underbox-input').focus();
		setTimeout(function(){
			$this.siblings('.colbox-underbox-editbox').find('.colbox-underbox-input').attr('value', text);
		});
	});

	$('.colbox-underbox-ok').click(function(){
		const $this = $(this);
		$this.parent().hide();
		const text = $this.siblings().val();
		$this.parent().siblings('.colbox-underbox-memo').text(text);
		checkColbox( $this.parent().parent().parent() );
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
	$('.open-btn').on('click', function(e){
		$(this).parent().toggleClass('is-open');
	});

	$('.is-step3').hover(function(){
		$(this).addClass('is-open');
	},function(){
		$(this).removeClass('is-open');
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
	$('.topbar-scort-outer').hover(function(){
		clearTimeout(sid);
	}, function(){
		// console.log('got');
		closeScort();
	});

	$('.topbar-scort-item').mouseout(function(){
		// closeScort();
	});
	// $('.word_btn').click();
	// =============================
	// == CONTROL EN & CH
	// =============================
	$('.is-ench .controlbox-item').click(function(){
		$('.is-ench').toggleClass('active');
		$('body').find('article').find('.Chinese').toggleClass('is-hide');
		// $('article').find('.Chinese').toggleClass('is-hide');
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

$(function(){
	// =============================
	// == CONTROL EN & CH
	// =============================
	$('.is-ench .controlbox-item').click(function(){
		$('.is-ench').toggleClass('active');
		$('body').find('article').find('.Chinese').toggleClass('is-hide');
		// $('article').find('.Chinese').toggleClass('is-hide');
	});
	
	// ====================================
	// == 講解 & 朗讀
	// ====================================
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

	// ====================================
	// ==  ARTICLE UI : READ_BTN CLICK STOP YOUTUBE
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
	// == TRANSLATION UI : (PHRASE & COLLECT)
	// ====================================
	$('.tranglationBody .close_btn').click(function () {
		$('.funbar-btn').removeClass('active');
		$('section, .funbar-block').removeClass('move');
		$('.tranglationBody').removeClass("show");
	});

	// ------------------------------------
	// -- COLLECT EDIT
	// ------------------------------------
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


	// for coding demo
	// $('.funbar-collection').click();
	// $('.topbar-scort-outer').hide();
});
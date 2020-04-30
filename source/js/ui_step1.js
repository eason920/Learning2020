$(function(){
	const $parent = $('#stepBlock1');
	// =============================
	// == CONTROL EN & CH
	// =============================
	$('.is-item-language .controlbox-item').click(function(){
		$('.is-item-language').toggleClass('active');
		$('body').find('article').find('.Chinese').toggleClass('is-hide');
		// $('article').find('.Chinese').toggleClass('is-hide');
	});
	
	// ====================================
	// == 講解 & 朗讀
	// ====================================
	const ready = function(){
		if( /stepBlock1/.test( $('body').html() ) ){
			clearInterval(sid);
			const $control = $('.is-item-read');
			const $explain = $('.article2');
			const $readOnly = $('.article');
			$('.is-item-read b').click(function(){
				$control.addClass("active");
				$control.attr('data-value', '1');
				$explain.show();
				$readOnly.hide();
			});
			
			$('.is-item-read i').click(function(){
				$control.removeClass("active");
				$control.attr('data-value', '0');
				$explain.hide();
				$readOnly.show();
			});				
		}
	}
	let sid = setInterval(ready, 50);


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
			$('#translation_Font1').text('Vocabulary');
			$('#translation_Font2').text('Phrase');
			$('#translation_Font2').show();
		}else{
			title='單字收錄';
			canIclose = 'collection';
			$('.translation_list').hide();

			wordlist_Get(refId);

			$('.translation_list2').show();
			$('#translation_Font2').hide();
			$('#translation_Font1').text(title);
		}
		
		// on vision
		$('.funbar-phrase, .funbar-collection').removeClass('active');
		$(this).addClass('active');
		if( !$('section').hasClass('move') ){
			$('section, .funbar-box').addClass("move");
			$('.tranglationBody').addClass("show");
			$('.is-step-main3').removeClass('is-open');
		}else{
			if( beforeClassName.indexOf( canIclose ) >= 0 ){
				$(this).removeClass('active');
				$('section, .funbar-box').toggleClass("move");
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
		$('.is-step-main3').removeClass('is-open');
	})

	// ====================================
	// == TRANSLATION UI : (PHRASE & COLLECT)
	// ====================================
	$('.tranglationBody .close_btn').click(function () {
		$('.funbar-phrase, .funbar-collection').removeClass('active');
		$('section, .funbar-box').removeClass('move');
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

	// ====================================
	// == FUNCTION BAR ARTICLE TYPE
	// ====================================
	let orgArtType;
	$('.is-item-arttype .funbar-btn').click(function(){
		const $p = $('.is-item-arttype');
		$p.toggleClass('active');
		if( $p.hasClass('active') ){
			$('.typebox .typebox-item').each(function(){
				if( $(this).hasClass('active') ){
					$(this).click();
					orgArtType = $(this).data('arttype');
					$('#stepBlock1').addClass('is-art-'+orgArtType);
				}
			});
		}else{
			$('#stepBlock1').removeClass();
		};
	});

	$('.typebox .typebox-item').click(function(){
		if( !$(this).hasClass('active') ){
			const string = $(this).data('arttype')
			$('.typebox .typebox-item').removeClass('active');
			$(this).addClass('active');
			$('#stepBlock1').removeClass().addClass('is-art-'+string)
		};

		// 原文分析>加強主題 click 後要使空白的 span 隱藏(2) v
		if( $(this).data('arttype') == 'title' ){
			console.log('is title');
			$('#stepBlock1 span').each(function(){
				$(this).text() == '' ? $(this).hide() : null;
			});
		}
	});

	// default 使空白的 span 隱藏(1) v
	setTimeout(function(){
		$('#stepBlock1 span').each(function(){
			$(this).text() == '' ? $(this).hide() : null;
		});
	}, 1000);

	// ====================================
	// == 單字 DREYE
	// ====================================
	// DEBUG (若本文的dr未開過，直接開單字的dr會開失敗) v
	setTimeout(function(){
		$('.art-art p').find('span').eq(0).click();
	}, 2000);

	setTimeout(function(){
		$('#lightBoxDIY').click();
	}, 2200);

	// START v
	$('.funbar-phrase').click(function(){
		if( $('.tranglationBody').hasClass('is-not-add-dr-yet') ){
			$('.vacsub-en').each(function(){
				let ary = $(this).text();
				ary = ary.split(' ');
				let html = '';
				for( a in ary ){
					const text = ary[a];
					let change = '';
					html += '<span onclick="DrDate(&quot;';
					switch(true){
						case /\,/.test(text):
							change = text.replace(',', '');
							break;
						case /\./.test(text):
							change = text.replace('.', '');
							break;
						case /!/.test(text):
							change = text.replace('!', '');
							break;
						case /\?/.test(text):
							change = text.replace('?', '');
							break;
						case /:/.test(text):
							change = text.replace(':', '');
							break;
						case /”/.test(text):
							change = text.replace('”', '');
							break;
						case /\’/.test(text):
							change = text.replace('’', '');
							break;	
						case /\(/.test(text):
							change = text.replace('(', '');
							break;
						default:
							change = text;
					}
					/\)/.test(change) ? change = change.replace(')', '') : null;
					html += change;
					html += '&quot;);">';
					html += ary[a] + '</span>';
				}
				$(this).html(html);
			});
			$('.tranglationBody').removeClass('is-not-add-dr-yet');
		};
	});

	// ====================================
	// == WIN 7 (以下)不支援 css calc() 方法
	// ====================================
	// const win7Width = $(window).width();
	// const win7Left = $('.topbar .wrapper-left').outerWidth(true);
	// $('.topbar .wrapper-right-f1').css('width', win7Width - win7Left);
});
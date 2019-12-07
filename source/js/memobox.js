$(function(){
	// =============================
	// == MEMO BOX
	// =============================
	const addMemo = function(id, text, top, left){
		$('article .mask').append(
			$('<div>', {class: 'memobox', id: 'memo' + id, style: 'left: ' + left +'px; top: ' + top + 'px'}).attr('data-left', left).attr('data-top', top).append(
				$('<div>', {class: 'memobox-bar'}).append(
					$('<input>', {class: 'memobox-del icon-del', type: 'submit'})
				),
				$('<textarea>', {class: 'memobox-text', placeholder: '在此輸入您的筆記'}).html(text),
				$('<div>', {class: 'memobox-box'})
			)
		);	
	};

	// ------------------------------------
	// -- VISION INIT
	// ------------------------------------
	if(memoJSON.length > 0){
		for(a in memoJSON ){
			const data = memoJSON[a];
			addMemo( Number(a)+1 , data.text, data.top, data.left );
		};
	};

	// ------------------------------------
	// -- CREATE
	// ------------------------------------
	$('article .mask').dblclick(function(e){
		const $side = $('aside');
		const $art = $('article');
		const dw = $(document).width();
		
		// for x
		const distanceXOuter = ( $('.main').width() - $('.article_mask').width() ) / 2;
		const distanceXCounter = Math.floor( $side.innerWidth() + $art.innerWidth() - $art.width() );
		const distanceX = dw > 1770? distanceXCounter : distanceXCounter - 25;// 25 = $art.padding-right when max-width = 1770
		x = Math.floor( e.pageX - distanceXOuter - distanceX );
		// for x max
		const maxX = Math.floor( $(this).width() - $('.memobox').width() );

		// for y
		const distanceY =  100;// $art.padding-top
		const distanceScrolltop = $(this).scrollTop();
		y = e.pageY - distanceY + distanceScrolltop;
		// for y max
		let $artTarget;
		$('.article').is(':visible')? $artTarget = $('.article') : $artTarget = $('.article2');
		const maxY = $artTarget.height() - $('.memobox').height();

		if (x >= maxX) {
			x= maxX;
		}
		if (y >= maxY) {
			y = maxY;
		}

		const id = $('.memobox').length + 1;
		if( id >= 16 ){
			alert('便利貼數量己逹上限 !')
		}else{
			addMemo(id, '', y, x );
		}
	})

	// ------------------------------------
	// -- move
	// ------------------------------------
	let zIndex = 15;
	$('article .mask').on('mousedown', '.memobox-bar, .memobox-box', function(e){
		let $selector = null;
		let x, y;
		const $this = $(this);
		const $doc = $(document);
		const $mask = $('article .mask');
		const $side = $('aside');
		const $art = $('article');
		const dw = $doc.width();

		$selector = $this.parents('.memobox');
		$selector.addClass('moving').css({ 'zIndex': zIndex++ });
		
		// offset init
		const offsets = $selector.offset();
		
		// for x
		const distanceXOuter = ( $('.main').width() - $('.article_mask').width() ) / 2;
		const distanceXCounter = Math.floor( $side.innerWidth() + $art.innerWidth() - $art.width() );
		const distanceX = dw > 1770? distanceXCounter : distanceXCounter - 25;// 25 = $art.padding-right when max-width = 1770
		x = Math.floor( offsets.left - e.pageX - distanceXOuter - distanceX );
		// for x max
		const maxX = Math.floor( $mask.width() - $selector.width() );

		// for y
		const distanceY =  100;// $art.padding-top
		const distanceScrolltop = $mask.scrollTop();
		y = offsets.top - e.pageY - distanceY + distanceScrolltop;
		// for y max
		let $artTarget;
		$('.article').is(':visible')? $artTarget = $('.article') : $artTarget = $('.article2');
		const maxY = $artTarget.height() - $selector.height();
		
		// moving
		$doc.on('mousemove.event', function (e) {
			$('body').css({'userSelect': 'none'});
			let tx = x + e.pageX,
				ty = y + e.pageY;
			if (tx >= maxX) {
				tx = maxX;
			} else if (tx <= 0) {
				tx = 0;
			}
			if (ty >= maxY) {
				ty = maxY;
			} else if (ty <= 0) {
				ty = 0;
			}
			$selector.css({left: tx, top: ty}).attr('data-left', tx).attr('data-top', ty);
		}).on('mouseup.event', function () {
			if ($selector != null) {
				$doc.off('.event');
				$selector.removeClass('moving');
				$('body').removeAttr('style');
				$selector = null;
			};
		});
	});

	// ------------------------------------
	// -- switch & resize
	// ------------------------------------
	const xy = function(){
		$('.memobox').each(function(){
			const $mask = $('article .mask');

			// top
			let top = $(this).attr('data-top');
			const maxX = Math.floor( $mask.width() - $(this).width() );
			
			//left
			let left = $(this).attr('data-left');
			$('.article').is(':visible')? $artTarget = $('.article') : $artTarget = $('.article2');
			const maxY = $artTarget.height() - $(this).height();

			if (left >= maxX) {
				left = maxX;
			}
			if (top >= maxY) {
				top = maxY;
			}
			
			$(this).css({left, top}).attr('data-left', left).attr('data-top', top);
		});
	};

	$(window).resize(function(){
		xy();
	});

	$('.controlbox-item').click(function(){
		xy();
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
	});

	// ------------------------------------
	// -- switch
	// ------------------------------------
	$('.funbar-memobox').click(function(){
		$(this).toggleClass('active');
		$('.memobox').fadeToggle(150);
	})
});
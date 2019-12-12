$(function(){
	// ====================================
	// == VAR & FUNCTION
	// ====================================
	const $section = $('section');
	const $side = $('aside');
	const $art = $('article');
	const $mask = $('article .mask');
	const $artMask = $('.article_mask');
	const dw = $(document).width();
	const $doc = $(document);
	const $body = $('body');
	const $main = $('.main');
 	//
	const distanceY =  100;// $art.padding-top
	//
	const fnDistanceX = function(){
		const outer = ( $main.width() - $artMask.width() ) / 2;
		let inner = Math.floor( $side.innerWidth() + $art.innerWidth() - $art.width() ); // aside + article
		if( dw <= 1770 ){
			inner = inner - 25; // 25 = $art.padding-right when max-width = 1770;
		}
		return outer + inner;
	};

	const fnArtTarget = function(){
		return $('.article').is(':visible')? $('.article') : $('.article2');
	}

	// ====================================
	// == SPAN ADD ID
	// ====================================
	const checkArt = function(){
		if( $('body').html().indexOf('Chinese') >= 0 ){
			// english
			$('body').find('.english').each(function(){
				$this = $(this);
				const pId = $this.attr('id');
				let i = 1;
				$this.find('span').each(function(){
					$(this).attr('id', pId + '_' + i);
					i ++;
				});
			});
			
			// chinese
			$('body').find('.Chinese').each(function(){
				const parentId = $(this).attr('id');
				let html = '';
				let ary = $(this).text().split('');
				for(a in ary){
					html += '<span id="' + parentId + '-' + a + '">' + ary[a] + '</span>'
				}
				$(this).html(html);
			});
			
			// memo init
			if(memoJSON.length > 0){
				// for x
				const distanceX = fnDistanceX();

				for(a in memoJSON ){
					const data = memoJSON[a];
					const basicid = data.basicid;
					const target = $body.find('#' + basicid);
					const offsets = target.offset();
					const top = Math.floor( offsets.top ) - distanceY + target.height();
					const left = Math.floor( offsets.left ) - distanceX;
					target.css({color: 'red'})
					addMemo( Number(a)+1 , data.text, left, top, basicid );
				};
			};

			clearInterval(sid);
		}
	};
	const sid = setInterval(checkArt, 200);

	// =============================
	// == ELEMENT
	// =============================
	const addMemo = function(id, text, left, top, basicid){
		$('article .mask').append(
			$('<div>', {class: 'memobox is-static', id: 'memo' + id, style: 'left: ' + left +'px; top: ' + top + 'px'}).attr('data-basicid', basicid).attr('data-left', left).attr('data-top', top).append(
				$('<div>', {class: 'memobox-bar'}).append(
					$('<div>', {class: 'memobox-movearea'}),
					$('<input>', {class: 'memobox-del icon-del', type: 'submit'})
				),
				$('<textarea>', {class: 'memobox-text', placeholder: '在此輸入您的筆記'}).html(text),
				$('<div>', {class: 'memobox-box'})
			)
		);	
	};

	// ====================================
	// == CREATE
	// ====================================
	$('article .mask').dblclick(function(e){
		// for x
		const distanceX = fnDistanceX();
		x = Math.floor( e.pageX - distanceX );
		if( $section.hasClass('move') ){
			x = x + $section.width() * .25 ;
		}

		// for x max
		const maxX = Math.floor( $(this).width() - $('.memobox').width() );

		// for y
		const distanceY =  100;// $art.padding-top
		const distanceScrolltop = $(this).scrollTop();
		y = e.pageY - distanceY + distanceScrolltop;
		// for y max
		const  $artTarget = fnArtTarget();
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

	// ====================================
	// == MOVE
	// ====================================
	let zIndex = 15;
	$('article .mask').on('mousedown', '.memobox-movearea', function(e){
		let $selector = null;
		let x, y;
		const $this = $(this);

		$selector = $this.parents('.memobox');
		$selector.css({ 'zIndex': zIndex++ });
		
		// offset init
		const offsets = $selector.offset();
		
		// for x
		const distanceX = fnDistanceX();
		x = Math.floor( offsets.left - e.pageX - distanceX );
		if( $section.hasClass('move') ){
			x = x + Math.floor( $section.width() * .25 );
		};
		
		// for x max
		const maxX = Math.floor( $mask.width() - $selector.width() );

		// for y
		const distanceScrolltop = $mask.scrollTop();
		y = offsets.top - e.pageY - distanceY + distanceScrolltop;
		// for y max
		const $artTarget = fnArtTarget();
		const maxY = $artTarget.height() - $selector.height();
		
		// padding for mousedown
		const padding= 20;
		let moveX = x + e.pageX  + padding;
		let moveY = y + e.pageY + padding;
		$selector.css({left: moveX, top: moveY});

		// moving
		let endOffsets;
		let finalY;
		let finalX;
		let basicid;
		
		$doc.on('mousemove.event', function (e) {
			$selector.removeClass('is-static');
			moveX = x + e.pageX  + padding;
			moveY = y + e.pageY + padding;
			$('body').addClass('is-memo-moving')
			if (moveX >= maxX) {
				moveX = maxX;
			} else if (moveX <= 0) {
				moveX = 0;
			}
			if (moveY >= maxY) {
				moveY = maxY;
			} else if (moveY <= 0) {
				moveY = 0;
			}
			$selector.css({left: moveX, top: moveY}).attr('data-left', moveX).attr('data-top', moveY);

			// get final offsets
			$body.on('mouseover.getOffsets', '.english span, .Chinese span', function () {
				basicid = $(this).attr('id');
				endOffsets = $(this).offset()

				// x
				finalX = Math.floor( endOffsets.left - distanceX );
				if( $section.hasClass('move') ){
					finalX = finalX + Math.floor( $section.width() * .25 );
				};
				if (finalX >= maxX) {
					finalX = maxX;
				};

				// y
				finalY = Math.floor(endOffsets.top) + $(this).height() - distanceY + distanceScrolltop;
				if (finalY >= maxY) {
					finalY = maxY;
				};
			});
		}).on('mouseup.event', function () {
			if ($selector != null) {
				$selector.addClass('is-static');
				if( basicid === undefined ){
					const target = $selector.attr('data-basicid');
					const offsets = $('#'+target).offset();
					const left = Math.floor(offsets.left - distanceX );
					const top = Math.floor(offsets.top - distanceY + $('#'+target).height() );
					$selector.css({left, top}).attr('data-left', left).attr('data-top', top);
				}else{
					$selector.css({ left: finalX, top: finalY }).attr('data-left', finalX).attr('data-top', finalY);
					$selector.attr('data-basicid', basicid)
				}
				$doc.off('.event');
				$body.off('.getOffsets').removeClass('is-memo-moving');
				$selector = null;
			};
		});
	});

	// ------------------------------------
	// -- switch & resize
	// ------------------------------------
	const xy = function(){
		$('.memobox').each(function(){

			// top
			let top = $(this).attr('data-top');
			const maxX = Math.floor( $mask.width() - $(this).width() );
			
			//left
			let left = $(this).attr('data-left');
			const $artTarget = fnArtTarget();
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
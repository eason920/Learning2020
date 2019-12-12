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
	let mw = 175;
	let mh = 155;
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

	const fnMaxXY = function () {
		const x = Math.floor($mask.width() - mw);
		const $target = $('.article').is(':visible') ? $('.article') : $('.article2');
		const y = $target.height() - mh;
		return [x, y];
	}

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
	// == SPAN ADD ID & INIT
	// ====================================
	const checkArt = function(){
		if( $('body').html().indexOf('Chinese') >= 0 ){
			// ENGLISH
			$('body').find('.english').each(function(){
				$this = $(this);
				const pId = $this.attr('id');
				let i = 1;
				$this.find('span').each(function(){
					$(this).attr('id', pId + '_' + i);
					i ++;
				});
			});
			
			// CHINESE
			$('body').find('.Chinese').each(function(){
				const parentId = $(this).attr('id');
				let html = '';
				let ary = $(this).text().split('');
				for(a in ary){
					html += '<span id="' + parentId + '-' + a + '">' + ary[a] + '</span>'
				}
				$(this).html(html);
			});
			
			// INIT MEMO CREATE
			if(memoJSON.length > 0){
				const distanceX = fnDistanceX();
				const maxX = fnMaxXY()[0];
				const maxY = fnMaxXY()[1];

				for(a in memoJSON ){
					const data = memoJSON[a];
					const basicid = data.basicid;
					const target = $body.find('#' + basicid);

					// xy
					const offsets = target.offset();
					let left = Math.floor( offsets.left ) - distanceX;
					left >= maxX ? left = maxX : left;
					let top = Math.floor( offsets.top ) - distanceY + target.height();
					top >= maxY ? top = maxY : top;
					target.css({color: 'red'})
					addMemo( Number(a)+1 , data.text, left, top, basicid );
				};
			};

			clearInterval(sid);
		}
	};
	const sid = setInterval(checkArt, 200);

	// ====================================
	// == CREATE
	// ====================================
	$('.english, .Chinese, .annotation').dblclick(function(e){
		$('.memobox').is(':visible') ? null : $('.funbar-memobox').click();
		const maxX = fnMaxXY()[0];
		const maxY = fnMaxXY()[1];
		const distanceScrolltop = $(this).scrollTop();

		// x
		const distanceX = fnDistanceX();
		x = Math.floor( e.pageX - distanceX );
		$section.hasClass('move') ? x = x + $section.width() * .25 : null;
		x >= maxX ? x= maxX : null;

		// y
		y = e.pageY - distanceY + distanceScrolltop;
		y >= maxY ? y = maxY : null;


		const id = $('.memobox').length + 1;
		if( id < 16 ){
			addMemo(id, '', y, x );
		}else{
			alert('便利貼數量己逹上限 !')
		}
	})




	// ====================================
	// == MOVE
	// ====================================
	let zIndex = 15;
	$('article .mask').on('mousedown', '.memobox-movearea', function(e){
		const $this = $(this);
		const $selector = $this.parents('.memobox');
		let x, y;
		const distanceScrolltop = $mask.scrollTop();
		const maxX = fnMaxXY()[0];
		const maxY = fnMaxXY()[1];

		$selector.css({ 'zIndex': zIndex++ });
		
		// xy
		const offsets = $selector.offset();
		
		const distanceX = fnDistanceX();
		x = Math.floor( offsets.left - e.pageX - distanceX );
		$section.hasClass('move') ? x = x + Math.floor( $section.width() * .25 ) : null;
		
		y = offsets.top - e.pageY - distanceY + distanceScrolltop;

		//** BEFORE MOVE
		const padding= 20;
		let moveX = x + e.pageX  + padding;
		moveX >= maxX? moveX = maxX: null;
		let moveY = y + e.pageY + padding;
		$selector.css({left: moveX, top: moveY});

		//** MOVING
		let finalOffsets;
		let finalY;
		let finalX;
		let basicid;
		
		$doc.on('mousemove.event', function (e) {
			$selector.removeClass('is-static');
			moveX = x + e.pageX  + padding;
			moveY = y + e.pageY + padding;
			$body.addClass('is-memo-moving')
			moveX >= maxX?	moveX = maxX: null;
			moveX <= 0 ? moveX = 0 : null;
			moveY >= maxY ? moveY = maxY: null;
			moveY <= 0 ? moveY = 0 : null;
			$selector.css({left: moveX, top: moveY}).attr('data-left', moveX).attr('data-top', moveY);

			//** FOR HAVE LOCK TARGET
			$body.on('mouseover.getOffsets', '.english span, .Chinese span', function () {
				basicid = $(this).attr('id');
				finalOffsets = $(this).offset()

				// x
				finalX = Math.floor( finalOffsets.left - distanceX );
				$section.hasClass('move') ? finalX = finalX + Math.floor( $section.width() * .25 ) : null;
				finalX >= maxX ? finalX = maxX : null;
	
				// y
				finalY = Math.floor(finalOffsets.top) + $(this).height() - distanceY + distanceScrolltop;
				finalY >= maxY ? finalY = maxY : null;
			});
		}).on('mouseup.event', function () {
			$selector.addClass('is-static');
			if( basicid === undefined ){
				//** NOT LOCK TARGET
				const target = $selector.attr('data-basicid');
				const offsets = $('#'+target).offset();
				let left = Math.floor(offsets.left - distanceX );
				let top = Math.floor(offsets.top - distanceY + $('#' + target).height() + distanceScrolltop );
				$section.hasClass('move') ? left = left + Math.floor( $section.width() * .25 ) : null;
				left >= maxX ? left = maxX : null;
				top >= maxY ? top = maxY : null;
				$selector.css({left, top}).attr('data-left', left).attr('data-top', top);
			}else{
				//** HAVE LOCK TARGET
				$selector.css({ left: finalX, top: finalY }).attr('data-left', finalX).attr('data-top', finalY);
				$selector.attr('data-basicid', basicid)
			}
			$doc.off('.event');
			$body.off('.getOffsets').removeClass('is-memo-moving');
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
$(function(){
	// ====================================
	// == VAR & FUNCTION
	// ====================================
	const $section = $('section');
	const $side = $('aside');
	const $art = $('article');
	const $stepblock = $('#stepBlock1');
	const $artMask = $('.article_mask');
	const dw = $(document).width();
	const $doc = $(document);
	const $body = $('body');
	const $main = $('.main');
	let mw = 175;
	let mh = 155;
	const distanceY =  100;// $art.padding-top
	//
	const addMemo = function(id, text, left, top, basicid2, basicid1){
		text = unescape(text);
		$stepblock.append(
			$('<div>', {class: 'memobox is-static', id: 'memo' + id, style: 'left: ' + left +'px; top: ' + top + 'px'}).attr('data-basicid2', basicid2).attr('data-basicid1', basicid1).append(
				$('<div>', {class: 'memobox-bar'}).append(
					$('<div>', {class: 'memobox-movearea'}),
					$('<input>', {class: 'memobox-del icon-del', type: 'submit'})
				),
				$('<textarea>', {class: 'memobox-text', placeholder: '在此輸入您的筆記'}).html(text),
				$('<div>', {class: 'memobox-box'})
			)
		);	
	};

	const fnDistanceX = function(){
		const outer = ( $main.width() - $artMask.width() ) / 2;
		let inner = Math.floor( $side.innerWidth() + $art.innerWidth() - $art.width() ); // aside + article
		if( dw <= 1770 ){
			inner = inner - 25; // 25 = $art.padding-right when max-width = 1770;
		}
		return outer + inner;
	};

	const fnMaxXY = function () {
		const x = Math.floor($stepblock.width() - mw);
		const $target = $('.article2').is(':visible') ? $('.article2') : $('.article');
		const y = $target.height() - mh;
		return [x, y];
	}

	const fnXY = function(selector, maxX, maxY, distanceX, scrolltop){
		let target;
		$('.article2').is(':visible') ? target = selector.attr('data-basicid2') : target = selector.attr('data-basicid1');
		const offsets = $('#'+target).offset();
		let left = Math.floor(offsets.left - distanceX );
		let top = Math.floor(offsets.top - distanceY + $('#' + target).height() + scrolltop );
		$section.hasClass('move') ? left = left + Math.floor( $section.width() * .25 ) : null;
		left >= maxX ? left = maxX : null;
		top >= maxY ? top = maxY : null;
		selector.css({left, top});
	}

	const lockTarget = function(){
		const maxX = fnMaxXY()[0];
		const maxY = fnMaxXY()[1];
		const distanceX = fnDistanceX();
		const distanceScrolltop = $stepblock.scrollTop();
		
		$('body').find('.memobox').each(function(){
			fnXY( $(this), maxX, maxY, distanceX, distanceScrolltop );
		});
	}

	const fnSave = function(){
		let i = 0;
		const max = $('.memobox').length - 1;
		memoUpdate = '[';
		$('.memobox').each(function(){
			const $this = $(this);
			const text = escape( $this.find('.memobox-text').val() );
			memoUpdate += '{"id":"' + $this.attr('id') + '",';
			memoUpdate += '"text":"' + text + '",';
			memoUpdate += '"basicid2":"' + $this.attr('data-basicid2') + '",';
			memoUpdate += '"basicid1":"' + $this.attr('data-basicid1') + '"}';
			i < max ? memoUpdate += ',' : null;
			i ++;
		});
		memoUpdate += ']';
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
					$(this).attr('id', pId + '-' + i);
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
					const basicid2 = data.basicid2;
					const basicid1 = data.basicid1;
					const target = $body.find('#' + basicid2);

					// xy
					const offsets = target.offset();
					let left = Math.floor( offsets.left ) - distanceX;
					left >= maxX ? left = maxX : null;
					let top = Math.floor( offsets.top ) - distanceY + target.height();
					top >= maxY ? top = maxY : null;
					// target.css({color: 'red'});
					addMemo( Number(a)+1 , data.text, left, top, basicid2, basicid1);
				};
			};

			clearInterval(sid);
		}else{
			setTimeout(function(){
				clearInterval(sid);
			}, 8000);
		}
	};
	const sid = setInterval(checkArt, 200);

	// ====================================
	// == CREATE
	// ====================================
	$body.on('dblclick', '.english, .Chinese, .annotation', function(e){
		const id = $('.memobox').length + 1;
		
		if( id < 16 ){
			$('.funbar-memobox').hasClass('active') ? null : $('.funbar-memobox').click();
			// $body.find('.memobox').eq(0).is(':visible') ? null : ;
			const maxX = fnMaxXY()[0];
			const maxY = fnMaxXY()[1];
			const $this = $(this);
			const className = $this.attr('class');
			const distanceX = fnDistanceX();
			const distanceScrolltop = $stepblock.scrollTop();
			let thisid;
			let basicid1;
			let basicid2;
	
			// xy
			let left = Math.floor( e.pageX - distanceX);
			$section.hasClass('move') ? left = left + Math.floor($section.width() * .25) : null;
			left >= maxX ? left = maxX : null;
			let top = $this.offset().top - distanceY + $this.innerHeight() + distanceScrolltop;
			top >= maxY ? top = maxY : null;
	
			switch(true){
				case /english/i.test( className ):
					thisid = $this.find('span:nth-last-child(2)').attr('id');
					break;
				case /chinese/i.test( className ):
					thisid = $this.find('span:last-child').attr('id');
					top = top - 30;// 30 = .Chinese.padding-bottom
					break;
				case /annotation/i.test( className ):
					thisid = $this.next().find('span:first-child').attr('id');
					break
				default:
			}
	
			if ($('.article2').is(':visible')) {
				// .article2
				basicid2 = thisid;
				basicid1 = thisid.substr(1);
			} else {
				// .article
				basicid2 = 'N' + basicid;
				basicid1 = thisid;
			}
			addMemo(id, '', left, top, basicid2, basicid1);
		}else{
			alert('便利貼數量己逹上限 !')
		}
	})

	// ====================================
	// == MOVE
	// ====================================
	let zIndex = 15;
	$stepblock.on('mousedown', '.memobox-movearea', function(e){
		const $this = $(this);
		const $selector = $this.parents('.memobox');
		let x, y;
		const distanceScrolltop = $stepblock.scrollTop();
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
		let lastid;
		$doc.on('mousemove.event', function (e) {
			$selector.removeClass('is-static');
			moveX = x + e.pageX  + padding;
			moveY = y + e.pageY + padding;
			$body.addClass('is-memo-moving')
			moveX >= maxX?	moveX = maxX: null;
			moveX <= 0 ? moveX = 0 : null;
			moveY >= maxY ? moveY = maxY: null;
			moveY <= 0 ? moveY = 0 : null;
			$selector.css({left: moveX, top: moveY});

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

			$body.on('mouseup.getOffsets', '.english span, .Chinese span', function(){
				lastid = $(this).attr('id');
			});
		}).on('mouseup.event', function () {
			$selector.addClass('is-static');

			if( basicid != undefined && basicid == lastid ){
				//** HAVE LOCK TARGET
				let otherid;
				$selector.css({ left: finalX, top: finalY });
				if( $('.article2').is(':visible') ){
					// .article2
					otherid = basicid.substr(1);
					$selector.attr('data-basicid2', basicid).attr('data-basicid1', otherid);
				}else{
					// .article
					otherid = 'N' + basicid;
					$selector.attr('data-basicid2', otherid).attr('data-basicid1', basicid);
				}
			}else{
				//** NO LOCK TARGET : 
				// 1. mousedown without move then mouse up.
				// 2. mousemove but mouseup on cant lock area, ex: bublle or no element area or outside.
				fnXY($selector, maxX, maxY, distanceX, distanceScrolltop);
			}
			$doc.off('.event');
			$body.off('.getOffsets').removeClass('is-memo-moving');
			fnSave();
		});
	});

	// ------------------------------------
	// -- ADD Z-INDEX
	// ------------------------------------
	$('body').on('click', '.memobox', function(){
		$(this).css({'zIndex': zIndex ++});
	});

	// ------------------------------------
	// -- DELETE
	// ------------------------------------
	$('body').on('click', '.memobox-del', function(e){
		e.preventDefault();
		$(this).parent().parent().remove();
	});

	// ------------------------------------
	// -- RESIZE & SWITCH DETIAL
	// ------------------------------------
	$(window).resize(function(){
		lockTarget();
	});

	$('.controlbox-item, .is-step-switch1').click(function(){
		setTimeout(function(){
			lockTarget();
		});
	});

	$('.is-step-switch1').click(function(){
		setTimeout(function(){
			lockTarget();
		}, 500);
	});

	// ------------------------------------
	// -- SHOW & HIDDEN
	// ------------------------------------
	$('.funbar-memobox').click(function(){
		$(this).toggleClass('active');
		$('.memobox').toggle(0);
		lockTarget();
	});

	// =============================
	// == SAVE TIMING SETTING
	// =============================
	$body.on('blur', '.memobox-text', function () {
		fnSave();
	})

	$('.funbar').click(function(){
		fnSave();
		console.log(memoUpdate);
	});


	// AUTO SAVE FALSE
	// let saveId;
	// const saveClick = function () {
	// 	// fnSave();
	// 	console.log('%cauto save !', 'color: red');
	// };
	// $('body').on('keydown.event', '.memobox-text', function () {
	// 	console.log('down');
	// 	clearTimeout(saveId);
	// 	$(this).off('.event');
	// })
	// $('body').on('keyup.event', '.memobox-text', function () {
	// 	console.log('up');
	// 	saveId = setTimeout(saveClick, 5000);
	// 	$(this).off('.event');
	// });
});
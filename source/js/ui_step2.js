$(function(){
	const $parent = $('#stepBlock2');

	const ready = function(){
		if( /s2-main/.test( $parent.html() ) ){
			clearInterval(sid);
			const $main = $('.s2-main');
			const height = $main.height();
			const max = $('.s2-main-item').length;

			// INIT
			$('.s2-main-item').css({height});

			// PREV
			$('.share-pre').click(function(){
				const idx = $(this).parent().parent().parent().index() - 1;
				const top = idx * height * -1;
				$('.s2-main-box').animate({top})
			});

			// NEXT
			$('#stepBlock2 .share-next').click(function(){
				const idx = $(this).parent().parent().parent().index() + 1;
				if( idx < max ){
					const top = idx * height * -1;
					$('.s2-main-box').animate({ top });
				}else{
					$('.is-step-switch3').click();
					setTimeout(function(){
						$('.s2-main-box').animate({ top: 0 });
					}, 500);
				}
				$('.s2-main-box').animate({ top });
			});
		}
	}
	let sid = setInterval(ready, 50);

	// (播/停)原音 v
	$('body').on('click', '.icon-org-play', function(){
		const $this = $(this);
		if( !$this.hasClass('active') ){
			$('.icon-rec-play').removeClass('active');
		}
		$this.toggleClass('active')
	});

	// (播/停)錄音 v
	$('body').on('click', '.icon-rec-play', function(){
		const $this = $(this);
		if( !$this.hasClass('active') ){
			$('.icon-org-play').removeClass('active');
		}
		$this.toggleClass('active')
	});

	// 錄音 v
	$('body').on('click', '.icon-rec-start', function(){
		const $this = $(this);
		if( !$this.hasClass('active') ){
			$this.parent().siblings().eq(0).html('');
		}
		$this.toggleClass('active')
	});

	
	// ====================================
	// == FUNCTION BAR
	// ====================================
	// $('.controlbox2').click(function(){
	// 	$(this).parent().toggleClass('active');
	// });
	// ====================================
	// == FUNCTION BAR ARTICLE TYPE
	// ====================================
	let orgArtType2;
	$('.is-item-audiotype .funbar-btn').click(function(){
		if( !$('.is-item-audiotype').hasClass('is-not-ready') ){
			const $p = $('.is-item-audiotype');
			$p.toggleClass('active');
			if( $p.hasClass('active') ){
				$('.typebox2 .typebox-item').each(function(){
					if( $(this).hasClass('active') ){
						$(this).click();
						orgArtType2 = $(this).data('audiotype');
						$('#stepBlock1').addClass('is-art-'+orgArtType2);
					}
				});
			}
		};
	});

	$('.typebox2 .typebox-item').click(function(){
		if( !$('.is-item-audiotype').hasClass('is-not-ready') ){
			if( !$(this).hasClass('active') ){
				const string = $(this).data('audiotype')
				$('.typebox2 .typebox-item').removeClass('active');
				$(this).addClass('active');
				$('#stepBlock1').removeClass().addClass('is-art-'+string)
			};
		};
	});
	
});
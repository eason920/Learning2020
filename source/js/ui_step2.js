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
	let sid = setInterval(ready, 50)
	
	// ====================================
	// == FUNCTION BAR
	// ====================================
	$('.controlbox2').click(function(){
		$(this).parent().toggleClass('active');
	});
});


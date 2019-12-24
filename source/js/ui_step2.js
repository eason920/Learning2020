$(function(){
	const $parent = $('.stepblock2');




	const ready = function(){
		if( /s2-main/.test( $parent.html() ) ){
			clearInterval(sid);
			const $main = $('.s2-main');
			const height = $main.height();

			$('.s2-main-item').css({height});

			$('.s2-main-next').click(function(){
				const top = ( $(this).parent().index() + 1 ) * height * -1;
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


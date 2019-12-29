$(function(){
	const $parent = $('#stepBlock3');
	
	const ready = function(){
		if( $parent.html() != '' ){
			clearInterval(sid);

			$('.s3ex2-iptbox input').each(function(){
				const length = $(this).attr('placeholder').length;
				const width = 17 * length;
				$(this).attr('maxlength', length).css({width});
			});
			
			// EVENT v
			for(let i = 1;i<=3;i++){
				$('.s3ex' + i +'-submitbox .s3-submit').click(function(){
					$('#ex'+i).removeAttr('class');
				});
			};

			$('#stepBlock3 .share-next').click(function(){
				const index = $(this).parent().index() + 1;
				const height = $parent.height();
				const top = index * height * -1
				const $play3 = $('.aside-speedbox.is-play3');
				$('#exBox').animate({top});
				
				if(index == 2){
					$play3.addClass('is-lock');
				};
				// else{
				// 	$play3.removeClass('is-lock');
				// }
			});
		}
	};

	let sid = setInterval(ready, 50)
});
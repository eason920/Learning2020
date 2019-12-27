$(function(){
	$parent = $('.stepblock3');
	
	const ready = function(){
		if( $parent.html() != '' ){
			clearInterval(sid);
			$('#EX2, #EX3').hide();
			
			const minHeight = $parent.height();
			$('#EX1').css({minHeight});

			$('.s3ex2-iptbox input').each(function(){
				const length = $(this).attr('placeholder').length;
				const width = 17 * length;
				$(this).attr('maxlength', length).css({width});
			});
			
			
			// EVENT v
			for(let i = 1;i<=3;i++){
				$('.s3ex' + i +'-submitbox .s3-submit').click(function(){
					$('#EX'+i).removeAttr('class');
				});
			};

			$('.stepblock3 .share-next').click(function(){
				const $p = $(this).parents().attr('id');
				let target;
				switch(true){
					case $p == 'EX1':
						target = $('#EX2');
						break;
					case $p == 'EX2':
						target = $('#EX3');
						break;
					default:
				}
				$('#EX1, #EX2, #EX3').removeAttr('style').slideUp();
				target.slideDown().css({minHeight});
				setTimeout(function(){
					$parent.scrollTop(0);
				}, 300);
			});
		}
	};

	let sid = setInterval(ready, 50)
});
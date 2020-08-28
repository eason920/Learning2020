$(function(){
	let sid;
	const $dblS = $('.share, .share_btn');
	$('.share_btn').mouseover(function () {
		$('.share_btn').addClass("show");
		// clearInterval(sid)
	});

	$('.share_btn').mouseout(function () {
		$('.share_btn').removeClass("show");
		// sid = setInterval(closeShare, 2000 );
	});

	const closeShare = function(){
		console.log('active');
		if( $dblS.hasClass('show') ) $dblS.removeClass('show');
	};


	// $('.share, .share_btn').mouseout(()=>{
	// 	sid = setInterval(closeShare, 2000 );
	// });
	// alert('0513');
	// =========================================
	// == SHARE ICON
	// =========================================
	const url = location.href;
	//const url = 'https://funday.asia/Learning2020/?rid' + ;
	console.log(url);
	// LINE
	$('.share-line').click(function (e) {
		console.log('share.js pic ', sharePicUrl);
		e.preventDefault();
		console.log('line', 'https://social-plugins.line.me/lineit/share?url=' + url);
		window.open('https://social-plugins.line.me/lineit/share?url=' + url, 'social', config = 'width= 500, height= 700');
});	

	// FB
	$('.share-fb').click(function (e) {
		console.log('share.js pic ', sharePicUrl);
		e.preventDefault();
		console.log('fb', 'http://www.facebook.com/sharer.php?u=' + url);
		window.open('http://www.facebook.com/sharer.php?u=' + url, 'social', config='width=500, height=700');        
});

	
	// =========================================
	// == COPY
	// =========================================
	const copied = function(){
		$copied = $('.copied');
		$copied.css({display: 'block'});
		setTimeout(function(){
			$copied.removeAttr('style');
		}, 2100);
	}

	const $copySource = $('.copy-source');
	$copySource.attr('value', location.href);

	window.Clipboard = (function (window, document, navigator) {
		var textArea,
			copy;

		function isOS() {
			return navigator.userAgent.match(/ipad|iphone/i);
		}

		function createTextArea(text) {
			textArea = document.createElement('textArea');
			textArea.value = text;
			document.body.appendChild(textArea);
		}

		function selectText() {
			var range,
				selection;

			if (isOS()) {
				range = document.createRange();
				range.selectNodeContents(textArea);
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				textArea.setSelectionRange(0, 999999);
			} else {
				textArea.select();
			}
		}

		function copyToClipboard() {
				document.execCommand("Copy");
				document.body.removeChild(textArea);
		}

		copy = function (text) {
				createTextArea(text);
				selectText();
				copyToClipboard();
		};

		return {
				copy: copy
		};
	})(window, document, navigator);

	$(".link_btn.copy-btn").on("click", function () {
		window.Clipboard.copy( $copySource.val() );
		copied();
		$('.share').toggleClass("show");
		return false;
	});
});
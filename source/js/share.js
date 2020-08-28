$(function(){
	$('.share_btn').hover(function(){
		$(this).addClass('show');
	}, function(){
		$(this).removeClass('show');
	});

	// =========================================
	// == SHARE ICON
	// =========================================
	let urlPrefix = 'https://funday.asia/Learning2020/?rid=';
	// LINE
	$('.share-line').click(function (e) {
		e.preventDefault();
		const url = urlPrefix + artNum
		window.open('https://social-plugins.line.me/lineit/share?url=' + url, 'social', config = 'width= 500, height= 700');
});	

	// FB
	$('.share-fb').click(function (e) {
		e.preventDefault();
		const url = urlPrefix + artNum
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
		window.Clipboard.copy( urlPrefix + artNum );
		copied();
		$('.share').toggleClass("show");
		return false;
	});
});
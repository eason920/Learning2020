$(function(){
	// =========================================
	// == SHARE ICON
	// =========================================
	const url = location.href;
	// LINE
	$('.share-line').click(function (e) {
		e.preventDefault();
		const href = 'https://social-plugins.line.me/lineit/share?openExternalBrowser=1&url=https://funday.asia/sample/learning/';
		window.open( href, 'social', config = 'width= 500, height= 700');
	});	

	// FB
	$('.share-fb').click(function (e) {
		e.preventDefault();
		const href = 'http://www.facebook.com/sharer.php?u=' + url;
		window.open(href, 'social', config = 'width=500, height=700');
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

	$(".ios-android-share").on("click", function () {
		var $this = $(this),
				value = $this.prev("input").val();
		window.Clipboard.copy(value);
		copied();
			return false;
	});
});
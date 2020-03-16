
var recorder='';
let chunks = [];

const workerOptions = {
	OggOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OggOpusEncoder.wasm',
	WebMOpusEncoderWasmPath: 'https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/WebMOpusEncoder.wasm'
};
window.MediaRecorder = OpusMediaRecorder;

function P2_Step1(){
	var eu='';
	let Pre_arrow='',Next_arrow='';
	Str=''

	for (i=0;i<=$(en).find("lrclist:last").index();i++){
			
		trx=$(en).find("lrclist:eq("+i+")").attr("content");
		trx=trx.replace('***','**');
		trx=trx.replace('**','');
		//spx=spanWord2(trx);

		if($(en).find("lrclist:eq("+i+")").index()==0){
			Pre_arrow='style="display: none;"'
			next_text='下一句'
			Next_arrow=''
		}else if($(en).find("lrclist:eq("+i+")").index()==$(en).find("lrclist:last").index()){	
			Pre_arrow=''
			next_text='學習驗收'
			Next_arrow='style="display: none;"'
		}else{
			Pre_arrow=''
			next_text='下一句'
			Next_arrow=''
		}

		eu=eu+'<div class="s2-main-item" id="s2-main-item'+i+'"><a id="Tt'+i+'" name="Tt'+i+'"></a>'
		eu=eu+'<div class="s2-main-flex">'
		eu=eu+'	  <div class="s2-main-wrapper">'
		eu=eu+'	    <div class="share-pre" '+Pre_arrow+' style="display:none;">'
		eu=eu+'	  		<div class="icon-arrowleft"></div>返回前段'
		eu=eu+'		</div>'
		eu=eu+'	    <div class="s2-main-textbox">'
		eu=eu+'	      	<div class="s2-main-textbox-left">'
		eu=eu+'		      	<div class="icon-star" id="icon-star'+i+'" '+Pre_arrow+' onclick=goP_sentences('+i+') ></div>'
		eu=eu+'	  	  	</div>'
		eu=eu+'	    	<div class="s2-main-textbox-right">'
		eu=eu+'		  		<div class="s2-en" id="Step2t'+i+'"><span>'+trx.replace('**','')+'</span></div>'
		eu=eu+'		  		<div class="s2-ch" id="Tct'+i+'">'+$(tc).find("lrclist:eq("+i+")").attr("content").replace('**','')+'</div>'
		eu=eu+'	    	</div>'
		eu=eu+'   	</div>'

		eu=eu+'<div class="s2-record" id="s2-record'+i+'">'
		eu=eu+	'<div class="s2-record-item is-small icon-C1" >'
		eu=eu+	'  <div class="icon-org-play" data-value="'+i+'" ></div><span class="is-off">播放原音</span><span class="is-on">停止</span>'
		eu=eu+  '</div>'
		eu=eu+	'<div class="s2-record-item icon-C2" >'
		eu=eu+  '  <div class="icon-rec-start" data-value="'+i+'"></div><span class="is-off">錄音</span><span class="is-on" id="rec_time'+i+'">0:00</span>'
		eu=eu+  '</div>'		
		eu=eu+	'<div class="s2-record-item icon-C3" style="display:none;">'
		eu=eu+	'  <div class="icon-rec-play" data-value="'+i+'"></div><span class="is-off">播放錄音</span><span class="is-on">停止</span>'		
		eu=eu+  '</div>'		
		eu=eu+	'<div class="s2-record-item is-small icon-C4" style="display:none;">'
		eu=eu+	'  <div class="icon-rec-re" data-value="'+i+'"></div><span class="is-off">重錄</span>'
		eu=eu+  '</div>'	
		eu=eu+'</div>'

		if($(en).find("lrclist:eq("+i+")").index()==$(en).find("lrclist:last").index()){
			eu=eu+'<div class="step2-finalbox" style="display:none;">'
			eu=eu+'		<div class="recoard-done">完成全部錄音</div>'
			eu=eu+'		<div class="next-unit">前往學習驗收'
			eu=eu+'  		<div class="icon-arrowleft"></div>'
			eu=eu+'		</div>'
			eu=eu+'</div>'
		}	

		eu=eu+'   	<div class="share-next" '+Next_arrow+'>'+next_text
		eu=eu+'	    	<div class="icon-arrowleft"></div>'
		eu=eu+'   	</div>'
		eu=eu+'   </div>'
		eu=eu+'</div>'
		eu=eu+'</div>'
	
		eu=eu.replace('***','**');
		eu=eu.replace('**','');
		
	}		
  
	Str=Str+eu;
	$('.s2-main-box').html(Str);

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
				temp--;
				$('.s2-main-box').animate({top})
				pausetime()
				resetAll()
				if(rec_State==1)
					recordStop();
			});

			// NEXT
			$('#stepBlock2 .share-next').click(function(){
				const idx = $(this).parent().parent().parent().index() + 1;
				if(record_num[idx-1]!=''){
					if( idx < max ){
						const top = idx * height * -1;
						$('.s2-main-box').animate({ top });
					}else{
						$('.is-step-switch3').click();
						setTimeout(function(){
							$('.s2-main-box').animate({ top: 0 });
						}, 500);
					}
					//$('.s2-main-box').animate({ top });
					temp++;
					pausetime()
					resetAll()
					if(rec_State==1)
						recordStop();
				}else{
					//alert('本句未錄音')
					$('#stepBlock2').append('<div class="msgbox"><div class="msgbox-text">本句未錄音</div><div class="msgbox-btn">確定</div></div>')	
					$('.msgbox-btn').on('click',function(){
						$('.msgbox').remove()
					})	
				}		
			});
		}
	}
	let sid = setInterval(ready, 50)

	// (播/停)原音 v
	$('body').on('click', '.icon-org-play', function(){
		const $this = $(this);
		pausetime()
		if( !$this.hasClass('active') ){
			$('.icon-rec-play').removeClass('active');
			resetAll()
			PlayS($this.attr('data-value'))
		}else{
			pausetime()
		}
		$this.toggleClass('active')
	});

	// (播/停)錄音 v
	$('body').on('click', '.icon-rec-play', function(){
		
		const $this = $(this);
		pausetime()
		if( !$this.hasClass('active') ){
			$('.icon-org-play').removeClass('active');
			resetAll()
			playContinue=0
			recordPlay($this.attr('data-value'))
		}else{
			recordPause($this.attr('data-value'))
		}
		$this.toggleClass('active')
	});

	// 錄音 v
	$('body').on('click', '.icon-rec-start', function(){
		const $this = $(this);		
		pausetime()
		if( !$this.hasClass('active') ){
			//$this.parent().siblings().eq(0).html('');
			$('#s2-record'+$this.attr('data-value')+' .s2-record-item').hide();
			$('#s2-record'+$this.attr('data-value')+' .icon-C2').show()
			resetAll()
			recordNow($this.attr('data-value'));
		}else{
			$('#s2-record'+$this.attr('data-value')+' .s2-record-item').hide();
			$('#s2-record'+$this.attr('data-value')+' .icon-C1,#s2-record'+$this.attr('data-value')+' .icon-C3,#s2-record'+$this.attr('data-value')+' .icon-C4').show()			
			recordStop();
		}
		$this.toggleClass('active')
	});

	// 重錄 v
	$('body').on('click', '.icon-rec-re', function(){
		const $this = $(this);
		resetAll()
		$('#s2-record'+$this.attr('data-value')+' .s2-record-item').hide();
		$('#s2-record'+$this.attr('data-value')+' .icon-rec-start').addClass('active')
		$('#s2-record'+$this.attr('data-value')+' .icon-C2').show()		
		pausetime()
		recordNow($this.attr('data-value'))
	});

	const resetAll = function(){
		$('.icon-org-play').removeClass('active');
		$('.icon-rec-start').removeClass('active');		
		$('.icon-rec-play').removeClass('active');
		$('.is-item-audiotype').removeClass('active')
	}


	// ====================================
	// == FUNCTION BAR
	// ====================================
	/*
	$('.controlbox2').click(function(){
		$(this).parent().toggleClass('active');
		if(!$(this).parent().hasClass('active')){
			$(this).parent().attr('data-value',"0")
		}else{
			$(this).parent().attr('data-value',"1")
		}

	});
	*/

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

		if($('.is-item-audiotype').hasClass('active')){
			PlayA()
		}else{
			pausetime()
		}

		$('.funbar-update').is(':hidden') ? $('#is-play-part').css('margin', '0px') : $('#is-play-part').removeAttr('style');
	});

	$('.typebox2 .typebox-item').click(function(){
		if( !$('.is-item-audiotype').hasClass('is-not-ready') ){
			if( !$(this).hasClass('active') ){
				const string = $(this).data('audiotype')			
				$('.typebox2 .typebox-item').removeClass('active');
				$(this).addClass('active');
				$('#stepBlock1').removeClass().addClass('is-art-'+string)
			}
		};

		$('#is-play-part').attr('data-value',$(this).data('audiotype'))
		PlayA()
	});

}

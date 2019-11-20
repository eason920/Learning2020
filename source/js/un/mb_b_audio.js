document.addEventListener('DOMContentLoaded', function () {
    // 初始化音频控制事件
    initAudioEvent();
}, false);
function initAudioEvent() {
    var audio = document.getElementsByTagName('audio')[0];
    var audioPlayer = document.getElementById('audioPlayer-b');

    audio.addEventListener('timeupdate', function () {
        updateProgress(audio);
    }, false);

    // 监听播放完成事件
    audio.addEventListener('ended', function () {
        audioEnded();
    }, false);

    // 点击播放/暂停图片时，控制音乐的播放与暂停
    audioPlayer.addEventListener('click', function () {
        // 改变播放/暂停图片
        if (audio.paused) {
            // 开始播放当前点击的音频
            audio.play();
            audioPlayer.src = 'images/mb_b/pause_btn.png';
            $('.main').addClass('is-playing')
        } else {
            audio.pause();
            audioPlayer.src = 'images/mb_b/play_btn.png';
            $('.main').removeClass('is-playing')
        }
    }, false);

    if (!audio.paused || audio.currentTime != 0) {
        var pgsWidth = parseFloat(window.getComputedStyle(progressBarBg, null).width.replace('px', ''));
        var rate = event.offsetX / pgsWidth;
        audio.currentTime = audio.duration * rate;
        updateProgress(audio);
    }
}

function updateProgress(audio) {
    // var value = audio.currentTime / audio.duration;
    // document.getElementById('audioCurTime').innerText = transTime(audio.currentTime);
}

/**
 * 播放完成时把进度调回开始的位置
 */
function audioEnded() {
    document.getElementById('progressBar').style.width = 0;
    document.getElementById('progressDot').style.left = 0;
    document.getElementById('audioCurTime').innerText = transTime(0);
    document.getElementById('audioPlayer-b').src = 'images/mb_b/play_btn.png';
}
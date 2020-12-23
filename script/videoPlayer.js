export const videoPlayerInit = () => {
    const playerBlock = document.querySelector('.player-block'),
        videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoVolume = document.querySelector('.video-volume'),
        videoFullScreen = document.querySelector('.video-fullscreen'),
        videoTimeTotal = document.querySelector('.video-time__total');
    
    let click = 0,
        volumeLevel = 0;

    const addZero = num => num = num < 10 ? `0${num}` : num,

        playIconTgl = () => {
            if (videoPlayer.paused) {
                videoButtonPlay.classList.add('fa-play');
                videoButtonPlay.classList.remove('fa-pause');
            } else {
                videoButtonPlay.classList.remove('fa-play');
                videoButtonPlay.classList.add('fa-pause');
            }
        },

        stopPLay = tglHandler => {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
            tglHandler();
        },

        changeVolume = () => videoPlayer.volume = videoVolume.value / 100,
        fullScreen = () => videoPlayer.requestFullscreen(),

        clickHandler = e => {
            e.preventDefault();
            if (e.target.matches('.video-player') || e.target.matches('.video-button__play')) {
                videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
                playIconTgl();
            }

            if (e.target.matches('.video-button__stop')) {
                stopPLay(playIconTgl);
            }

            if (e.target.matches('.fa-volume-off')) {
                if (click < 1) {
                    volumeLevel = videoPlayer.volume;
                    videoVolume.value = 0;
                    videoPlayer.volume = 0;
                    click++;
                } else {
                    videoPlayer.volume = volumeLevel;
                    videoVolume.value = videoPlayer.volume * 100;
                    click = 0;
                }
            }

            if (e.target.matches('.fa-volume-up')) {
                if (click < 1) {
                    volumeLevel = videoPlayer.volume;
                    videoVolume.value = 100;
                    videoPlayer.volume = videoVolume.value / 100;
                    click++;
                } else {
                    videoPlayer.volume = volumeLevel;
                    videoVolume.value = videoPlayer.volume * 100;
                    click = 0;
                }
            } // end if volume-up

            if (e.target.matches('.fa-volume-down')) {
                if (click < 1) {
                    volumeLevel = videoPlayer.volume;
                    videoVolume.value = 0;
                    videoPlayer.volume = 0;
                    click++;
                } else {
                    videoPlayer.volume = volumeLevel;
                    videoVolume.value = videoPlayer.volume * 100;
                    click = 0;
                }
            } // end if volume-down
        }, // end clickHandler

        timeHandler = () => {
            const currentTime = videoPlayer.currentTime,
                duration = videoPlayer.duration,
                minTotal = Math.floor(duration / 60),
                secTotal = Math.floor(duration % 60),
                minPassed = Math.floor(currentTime / 60),
                secPassed = Math.floor(currentTime % 60);
            videoTimePassed.textContent = `${addZero(minPassed)}:${addZero(secPassed)}`;
            videoTimeTotal.textContent = `${addZero(minTotal)}:${addZero(secTotal)}`;
            videoProgress.value = (currentTime / duration) * 100;
        }, // end timeHandler

        progressHandler = () => {
            const duration = videoPlayer.duration,
                progress = videoProgress.value;

            videoPlayer.currentTime = (duration * progress) / 100;
        }; // end progressHandler

    playerBlock.addEventListener('click', clickHandler);
    videoPlayer.addEventListener('timeupdate', timeHandler);
    videoProgress.addEventListener('input', progressHandler);
    videoFullScreen.addEventListener('click', fullScreen);
    videoVolume.addEventListener('input', changeVolume);
    changeVolume();


}; // end export videoPlayerInit

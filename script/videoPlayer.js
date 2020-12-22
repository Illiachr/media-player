export const videoPlayerInit = () => {
    const playerBlock = document.querySelector('.player-block'),
        videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoTimeTotal = document.querySelector('.video-time__total');

    const addZero = num => num = num < 10 ? `0${num}` : num;

    const playIconTgl = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.add('fa-play');
            videoButtonPlay.classList.remove('fa-pause');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    };

    const stopPLay = tglHandler => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        tglHandler();
    };

    const handler = e => {
        console.log(e.target);
        if (e.target.matches('.video-player') || e.target.matches('.video-button__play')) {
            videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
            playIconTgl();
        }

        if (e.target.matches('.video-button__stop')) {
            stopPLay(playIconTgl);
        }
    }; // end clickHandler

    const timeHandler = () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration,
            minTotal = Math.floor(duration / 60),
            secTotal = Math.floor(duration % 60),
            minPassed = Math.floor(currentTime / 60),
            secPassed = Math.floor(currentTime % 60);
        videoTimePassed.textContent = `${addZero(minPassed)}:${addZero(secPassed)}`;
        videoTimeTotal.textContent = `${addZero(minTotal)}:${addZero(secTotal)}`;
        videoProgress.value = (currentTime / duration) * 100;
    }; // end timeHandler

    const progressHandler = () => {
        const duration = videoPlayer.duration,
            progress = videoProgress.value;

        videoPlayer.currentTime = (duration * progress) / 100;
    };

    playerBlock.addEventListener('click', handler);
    videoPlayer.addEventListener('timeupdate', timeHandler);
    videoProgress.addEventListener('change', progressHandler);
}; // export videoPlayerInit

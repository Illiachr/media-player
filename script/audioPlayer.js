import { addZero } from './supportScript.js';

export const audioPlayerInit = () => {
    const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPrev = document.querySelector('.audio-button__prev'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioButtonNext = document.querySelector('.audio-button__next'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioTimeTotal = document.querySelector('.audio-time__total'),
        playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
            const isPlayed = !audioPlayer.paused, // инвертирую, т.к. когда плеер на паузе возвращает false
                track = playlist[trackIndex];

            audioImg.src = `./audio/${track}.jpg`;
            audioHeader.textContent = track.toUpperCase();
            audioPlayer.src = `./audio/${track}.mp3`;

            if (isPlayed) {
                audioPlayer.pause();
            } else { audioPlayer.play(); }

        },

        prevTrack = () => {
            if (trackIndex !== 0) {
                trackIndex--;
            } else {
                trackIndex = playlist.length - 1;
            }
            loadTrack();
        }, //end prevTrack

        nextTrack = () => {
            if (trackIndex === playlist.length - 1) {
                trackIndex = 0;
            } else {
                trackIndex++;
            }
            loadTrack();
        }; //end nextTrack

    audioNavigation.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
        }
        if (audioPlayer.paused) {
            audioPlayer.play();
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        } else { audioPlayer.pause(); }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            console.log(target);
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration,
            currentTime = audioPlayer.currentTime,
            progress = (currentTime * duration) / 100,
            minPassed = Math.floor(currentTime / 60) || `0`,
            secPassed = Math.floor(currentTime % 60) || `0`,
            minTotal = Math.floor(currentTime / 60) || `0`,
            secTotal = Math.floor(currentTime % 60) || `0`;

        audioProgressTiming.style.width = `${progress}%`;
        audioTimePassed.textContent = `${addZero(minPassed)}:${addZero(secPassed)}`;
        audioTimeTotal.textContent = `${addZero(minTotal)}:${addZero(secTotal)}`;

    });

    audioProgress.addEventListener('click', e => {
        const x = e.offsetX,
            totalWidth = audioProgress.clientWidth,
            progress = (x / totalWidth) * audioPlayer.duration;
        //TODO не работает как нужно выяснить почему
        audioPlayer.currentTime = progress;
    });

    audioPlayerInit.stop = () => {
        audioPlayer.pause();
        audio.classList.remove('play');
        audioButtonPlay.classList.add('fa-play');
        audioButtonPlay.classList.remove('fa-pause');
    };

}; // end audioPlayerInit

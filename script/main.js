import { audioPlayerInit } from './audioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';

const player = document.querySelector('.player'),
    playerBtn = document.querySelectorAll('.player-btn'),
    playerBlock = document.querySelectorAll('.player-block'),
    temp = document.querySelector('.temp');

const deactivateAll = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
};

const deactivatePlayers = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));

    radioPlayerInit.stop();
    videoPlayerInit.stop();
};

const handler = e => {
    playerBtn.forEach((item, i) => {

        if (e.target.className === item.className) {
            //deactivateAll();
            deactivatePlayers();
            item.classList.add('active');
            playerBlock[i].classList.add('active');
        }
    });
};

const init = () => {

    player.addEventListener('click', handler);

    videoPlayerInit();
    audioPlayerInit();
    radioPlayerInit();
};

init();


export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop'),
        radioFooter = document.querySelector('.radio-footer'),
        volumeCtrl = document.querySelectorAll('.volume-control'),
        audioVolume = document.querySelector('.audio-volume'),
        audio = new Audio(); // создаем объект Audio, а не получаем со страницы

    let click = 0,
        volumeLevel;

    audio.type = 'audio/aac';
    radioStop.disabled = true;
    volumeCtrl.forEach(elem => elem.disabled = true);

    const playIconTgl = (player, btn, classWait = 'fa-play', classAct = 'fa-stop') => {
            if (player.paused) {
                btn.classList.add(classWait);
                btn.classList.remove(classAct);
            } else {
                btn.classList.remove(classWait);
                btn.classList.add(classAct);
            }
        },

        iconTgl = (elem, player = audio, classAct = 'play') => {
            player.paused ? elem.classList.remove(classAct) :
                elem.classList.add(classAct);
        },

        itemSwitch = (activeItem, elemNode, switchClass) => {
            elemNode.forEach(elem => elem.classList.remove(switchClass));
            activeItem.classList.add(switchClass);
        },

        changeVolume = () => audio.volume = audioVolume.value / 100,

        playerHandler = e => {
            const stationItem = e.target.closest('.radio-item'),
                stationName = stationItem.querySelector('.radio-name').textContent,
                stationCover = stationItem.querySelector('.radio-img').src;
            radioHeaderBig.textContent = stationName;
            radioCoverImg.src = stationCover;
            audio.src = e.target.dataset.radioStantion;
            radioStop.disabled = false;
            volumeCtrl.forEach(elem => elem.disabled = false);

            audio.play();
            itemSwitch(stationItem, radioItem, 'select');
            playIconTgl(audio, radioStop);
            iconTgl(radio);
        }, // end playerHandler

        controlBtnHandler = e => {
            if (e.target.matches('.radio-stop')) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
                playIconTgl(audio, radioStop);
                iconTgl(radio);
            }  // end if target radio-stop

            if (e.target.matches('.fa-volume-up')) {
                if (click < 1) {
                    volumeLevel = audio.volume;
                    audioVolume.value = 100;
                    audio.volume = audioVolume.value / 100;
                    click++;
                } else {
                    audio.volume = volumeLevel;
                    audioVolume.value = audio.volume * 100;
                    click = 0;
                }
            } // end if target volume-up

            if (e.target.matches('.fa-volume-down')) {
                if (click < 1) {
                    volumeLevel = audio.volume;
                    audioVolume.value = 0;
                    audio.volume = 0;
                    click++;
                } else {
                    audio.volume = volumeLevel;
                    audioVolume.value = audio.volume * 100;
                    click = 0;
                }
            } // end if target volume-down

            if (e.target.matches('.fa-volume-off')) {
                if (!audio.muted) {
                    audio.muted = true;
                } else { audio.muted = false; }
            } // end if target volume-off
        }; // end playBtnHandler

    radioNavigation.addEventListener('change', playerHandler);
    radioFooter.addEventListener('click', controlBtnHandler);
    audioVolume.addEventListener('input', changeVolume);
    changeVolume();

    radioPlayerInit.stop = () => {
        audio.pause();
        playIconTgl(audio, radioStop);
    };

};  // end export radioPlayerInit

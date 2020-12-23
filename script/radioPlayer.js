export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop'),
        radioFooter = document.querySelector('.radio-footer'),
        audioVolume = document.querySelector('.audio-volume'),
        audio = new Audio(); // создаем объект Audio, а не получаем со страницы
    
    let click = 0,
        volumeLevel;
    
        audio.type = 'audio/aac';
    radioStop.disabled = true;

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

            audio.play();
            itemSwitch(stationItem, radioItem, 'select');
            playIconTgl(audio, radioStop);
            iconTgl(radio);
        }, // end playerHandler

        playBtnHandler = () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            playIconTgl(audio, radioStop);
            iconTgl(radio);
        }; // end playBtnHandler

    radioNavigation.addEventListener('change', playerHandler);
    radioStop.addEventListener('click', playBtnHandler);

    radioFooter.addEventListener('click', e => {
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

            console.log(volumeLevel);
            console.log(audioVolume.value);
            console.log(audio.volume);
        } // end if volume-up
        changeVolume();
    });

    audioVolume.addEventListener('input', changeVolume);

};  // end export radioPlayerInit

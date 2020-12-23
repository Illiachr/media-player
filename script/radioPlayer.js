export const radioPlayerInit = () => {

    const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop'),
        audio = new Audio(); // создаем объект Audio, а не получаем со страницы
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

};  // end export radioPlayerInit

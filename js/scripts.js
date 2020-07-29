'use strict';

window.addEventListener('DOMContentLoaded', () => {

//Tab

const tabs = document.querySelectorAll('.tabheader__item'),
      tabContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');

function hideTabContent() {
    tabContent.forEach(item => {
        item.classList.remove('show', 'fade');
        item.classList.add('hide');
    });
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active');
}

tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    
    if(target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, idx) => {
            if(item == target){
                hideTabContent();
                showTabContent(idx);
            }
        });
    }
    
});
hideTabContent();
showTabContent();

//Timer
const deadline = new Date('2020-08-20');


function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t/(1000 * 60 * 60 * 24)),
      hours = Math.floor(t/(1000 * 60 * 60) % 24),
      minutes = Math.floor(t/(1000 * 60) % 60),
      seconds = Math.floor((t/1000) % 60);
    
    return{
        t,
        days,
        hours,
        minutes,
        seconds
    };
    
}

function setZero(num) {
    if(num >= 0 && num <10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setTimer(selector, endtime){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timerInterval = setInterval(updateTimer, 1000);
          
    function updateTimer() {
    const t = getTimeRemaining(endtime);
        if( t.t <= 0) {
            clearInterval(timerInterval);
        }

        days.innerHTML = setZero(t.days);
        hours.innerHTML = setZero(t.hours);
        minutes.innerHTML = setZero(t.minutes);
        seconds.innerHTML = setZero(t.seconds);
    }
    updateTimer();
}


setTimer('.timer', deadline);

// Modal

const modalTriger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelectorAll('[data-close]');

modalTriger.forEach(modalitem => {
    modalitem.addEventListener('click', () => {
        // modal.classList.remove('hide');
        // modal.classList.add('show');
        modal.classList.toggle('show');
        document.body.style.overflow='hidden';
    });
});

function closeModal() {
    modal.classList.toggle('show');
        document.body.style.overflow='';
}

modalClose.forEach(modalitem => {
    modalitem.addEventListener('click', closeModal);
});

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if(e.code == 'Escape') {
        closeModal();
    }
})

});
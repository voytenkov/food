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

function openModal() {
    modal.classList.toggle('show');
    document.body.style.overflow='hidden';
    clearInterval(modalTimer);
}      
modalTriger.forEach(modalitem => {
    modalitem.addEventListener('click', openModal);
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
});

//const modalTimer = setTimeout(openModal, 6000); 

function openModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', openModalByScroll);
    }}

window.addEventListener('scroll', openModalByScroll);

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.classes = classes;
        this.transfer = 67;
        this.changeToRUB();
    }

    changeToRUB() {
        this.price = this.price * this.transfer;
    }

    render() {
        const element = document.createElement('div');
        if(this.classes.length == 0) {
            element.classList.add('menu__item');
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `                    
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                `;

        this.parent.append(element);
    }
}
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню 'Фитнес'",
        "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        9,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню 'Премиум'",
        "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        19,
        ".menu .container",
        "menu__item"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню 'Постное'",
        "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        14,
        ".menu .container",
        "menu__item"
    ).render();
});
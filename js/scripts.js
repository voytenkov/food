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
      modal = document.querySelector('.modal');

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow='hidden';
    clearInterval(modalTimer);
}      
modalTriger.forEach(modalitem => {
    modalitem.addEventListener('click', openModal);
});

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow='';
}

// modalClose.forEach(modalitem => {
//     modalitem.addEventListener('click', closeModal);
// });

modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if(e.code == 'Escape') {
        closeModal();
    }
});

const modalTimer = setTimeout(openModal, 600000); 

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

const getResource = async (url) => {
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
}

    getResource('http://food.local:3000/menu', )
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })

    // Forms

    const forms = document.querySelectorAll('form');
    
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Данные отправлены. Мы вам перезвоним',
        failure: 'Что-то пошло не так'
    }
    


    forms.forEach(item => {
        bindPostData(item);
    });
    
    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
            
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://food.local:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset(); 
                })
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();
        
        const thanksModalDialog = document.createElement('div');
        thanksModalDialog.classList.add('modal__dialog');
        thanksModalDialog.innerHTML= `
            <div class="modal__content">
            <div data-close class="modal__close">×</div>
            <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModalDialog);

        setTimeout(() => {
            thanksModalDialog.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

   

    //Slider
    const prevSlide = document.querySelector('.offer__slider-prev'),
        slider = document.querySelector('.offer__slider'),
        nextSlide = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        totalSlides = document.querySelector('#total'),
        currentSlide = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesInner = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;
    let indexSlide = 1;
    let offsetSlide = 0;

    slidesInner.style.width = 100 * slides.length + '%';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for(let i=0; i < slides.length; i++) {
        const dot = document.createElement('li')
        dot.classList.add('dot');
        dot.setAttribute('data-dot-to', i+1);
        dots.push(dot);
        indicators.append(dot);
        if(i == 0) {
            dot.style.opacity = '1';
        }
    }

    if(slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${indexSlide}`;
    } else {
        totalSlides.textContent = slides.length;  
    }

    nextSlide.addEventListener('click' , () => {
        if(offsetSlide == +width.slice(0, width.length - 2) * (slides.length - 1)) {
            offsetSlide = 0;
        } else {
            offsetSlide += +width.slice(0, width.length - 2);
        }
        //slidesInner.style.transform = `translateX(-${offsetSlide}px)`;
        
        if(indexSlide == slides.length) {
            indexSlide = 1;
        } else {
            indexSlide++;
        }

        showSlideIndicators(indexSlide, offsetSlide);

    });


    prevSlide.addEventListener('click' , () => {
        if(offsetSlide == 0) {
            offsetSlide = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offsetSlide -= +width.slice(0, width.length - 2);
        }
       // slidesInner.style.transform = `translateX(-${offsetSlide}px)`;

        if(indexSlide == 1) {
            indexSlide = slides.length;
        } else {
            indexSlide--;
        }

        showSlideIndicators(indexSlide, offsetSlide);
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-dot-to');
            indexSlide = slideTo;
            offsetSlide = +width.slice(0, width.length - 2) * (slideTo - 1);
            
            
            showSlideIndicators(indexSlide, offsetSlide);

        })
    })
    
    function showSlideIndicators(indexSlide, offsetSlide) {
        slidesInner.style.transform = `translateX(-${offsetSlide}px)`;

        if(slides.length < 10) {
            currentSlide.textContent = `0${indexSlide}`;
        } else {
            currentSlide.textContent = indexSlide;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexSlide - 1].style.opacity = '1';
    }




    
    // showSlide(indexSlide);

    // function showSlide(n) {
    //     if(n > slides.length) {
    //         indexSlide = 1
    //     }
    //     if(n < 1) {
    //         indexSlide = slides.length;
    //     }
        
    //     // slides.forEach(slide => slide.classList.add('hide'));
    //     // slides[indexSlide - 1].classList.toggle('hide');

    //     if(slides.length < 10) {
    //         currentSlide.textContent = `0${indexSlide}`;
    //     } else {
    //         currentSlide.textContent = indexSlide;
    //     }
        
    // }

    // function changeSlides(n) {
    //     showSlide(indexSlide += n);
    // }

    // prevSlide.addEventListener('click' , function(){
    //     changeSlides(-1);
    // });
    // nextSlide.addEventListener('click' , function(){
    //     changeSlides(1);
    // });

    // prevSlide.addEventListener('click' , function(){
    //     changeSlides(-1);
    //     });
    // nextSlide.addEventListener('click' , function(){
    //     changeSlides(1);
    // });

    

});
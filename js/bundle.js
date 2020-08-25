/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/scripts.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
    //Calc calories

    let sex, weight, height, age, ratio = '1.375';
    const calories = document.querySelector('.calculating__result span');
    
    function initState(selector, activeClass) {
        if(localStorage.getItem('sex')) {
            sex = localStorage.getItem('sex');
        } else {
            sex = 'female';
            localStorage.setItem('sex', 'female');
        }

        if(localStorage.getItem('ratio')) {
            ratio = localStorage.getItem('ratio');
        } else {
            ratio = 1.375;
            localStorage.setItem('ratio', 1.375);
        }

        const parameters = document.querySelectorAll(selector);
        parameters.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('data-sex') === sex) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === ratio) {
                elem.classList.add(activeClass);
            }
        });
        


    }
initState('.calculating__choose div', 'calculating__choose-item_active');

    function calcCalories() {
        if(!sex || !weight || !height || !age || !ratio) {
            calories.textContent = '______________';
            return;
        }
        
        if(sex == 'male') {
            calories.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        } else {
            calories.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
        }
    } 
    calcCalories();

    

    function getStaticInformation(parentSelector, activeClass) {
        const parameters = document.querySelectorAll(`${parentSelector} div`);
        
        parameters.forEach(element => {
            element.addEventListener('click', (e) => {
               if(e.target.getAttribute('data-sex')){
                   sex = e.target.getAttribute('data-sex');
                   localStorage.setItem('sex', sex);
               } else {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
               }
                parameters.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcCalories();
            });
            
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');


    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
       input.addEventListener('input', ()=>{
        if (input.value.match(/\D/g)) {
            input.style.border = "1px solid red";
        } else {
            input.style.border = 'none';
        }
            switch(input.getAttribute('id')){
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcCalories();
       });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    //Cards

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



    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://food.local:3000/menu', )
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
     // Forms

     const forms = document.querySelectorAll(formSelector);
    
     const message = {
         loading: 'img/form/spinner.svg',
         success: 'Данные отправлены. Мы вам перезвоним',
         failure: 'Что-то пошло не так'
     };
     
     forms.forEach(item => {
         bindPostData(item);
     });
     
  
 
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
 
             Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://food.local:3000/requests', json)
                 .then(data => {
                     showThanksModal(message.success);
                     statusMessage.remove();
                 })
                 .catch(() => {
                     showThanksModal(message.failure);
                 })
                 .finally(() => {
                     form.reset(); 
                 });
         });
     }
 
     function showThanksModal(message) {
         const prevModalDialog = document.querySelector('.modal__dialog');
         prevModalDialog.classList.add('hide');
         Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);
         
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
             Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
         }, 4000);
     }
 
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, openModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
 function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';
  clearInterval(modalTimerId);
}


function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Modal

  const modalTriger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    modalTriger.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });  

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
      closeModal(modalSelector);
    }
  });

  

  function openModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', openModalByScroll);
    }
  }

  window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function sliders({
    container,
    slide,
    prevArrow,
    nextArrow,
    wrapper,
    totalCounter,
    currentCounter,
    inner,
}) {
    //Slider
    const slider = document.querySelector(container),
        prevSlide = document.querySelector(prevArrow),
        nextSlide = document.querySelector(nextArrow),
        slides = document.querySelectorAll(slide),
        totalSlides = document.querySelector(totalCounter),
        currentSlide = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesInner = document.querySelector(inner),
        width = window.getComputedStyle(slidesWrapper).width;
    let indexSlide = 1;
    let offsetSlide = 0;

    slidesInner.style.width = 100 * slides.length + '%';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-dot-to', i + 1);
        dots.push(dot);
        indicators.append(dot);
        if (i == 0) {
            dot.style.opacity = '1';
        }
    }

    if (slides.length < 10) {
        totalSlides.textContent = `0${slides.length}`;
        currentSlide.textContent = `0${indexSlide}`;
    } else {
        totalSlides.textContent = slides.length;
    }

    nextSlide.addEventListener('click', () => {
        if (offsetSlide == deleteNotDigits(width) * (slides.length - 1)) {
            offsetSlide = 0;
        } else {
            offsetSlide += deleteNotDigits(width);
        }
        if (indexSlide == slides.length) {
            indexSlide = 1;
        } else {
            indexSlide++;
        }
        showSlideIndicators(indexSlide, offsetSlide);
    });


    prevSlide.addEventListener('click', () => {
        if (offsetSlide == 0) {
            offsetSlide = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offsetSlide -= deleteNotDigits(width);
        }
        if (indexSlide == 1) {
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
            offsetSlide = deleteNotDigits(width) * (slideTo - 1);
            showSlideIndicators(indexSlide, offsetSlide);
        });
    });

    function showSlideIndicators(indexSlide, offsetSlide) {
        slidesInner.style.transform = `translateX(-${offsetSlide}px)`;
        if (slides.length < 10) {
            currentSlide.textContent = `0${indexSlide}`;
        } else {
            currentSlide.textContent = indexSlide;
        }
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[indexSlide - 1].style.opacity = '1';
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
}

/* harmony default export */ __webpack_exports__["default"] = (sliders);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //Tab

  const tabs = document.querySelectorAll(tabsSelector),
    tabContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabContent.forEach(item => {
      item.classList.remove('show', 'fade');
      item.classList.add('hide');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show', 'fade');
    tabs[i].classList.add(activeClass);
  }

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, idx) => {
        if (item == target) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }

  });
  hideTabContent();
  showTabContent();
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(timerSelector, deadline) {
    //Timer

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


setTimer(timerSelector, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/scripts.js":
/*!***********************!*\
  !*** ./js/scripts.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");


    
    
    
    
    
    
    

window.addEventListener('DOMContentLoaded', () => {
    
   const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["openModal"])('.modal', modalTimerId), 600000);

   Object(_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
   Object(_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
   Object(_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
   Object(_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '.modal', modalTimerId);
   Object(_modules_sliders__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    prevArrow: '.offer__slider-prev',
    nextArrow: '.offer__slider-next',
    totalCount: '#total',
    currentCount: '#current',
    wrapper: '.offer__slider-wrapper',
    inner: '.offer__slider-inner' 
   });
   Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   Object(_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2020-09-23");  
 
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();
};

const getResource = async (url) => {
    const result = await fetch(url);

    if(!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
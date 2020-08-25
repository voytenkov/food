function sliders() {
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
    const dot = document.createElement('li');
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
    if(offsetSlide == deleteNotDigits(width) * (slides.length - 1)) {
        offsetSlide = 0;
    } else {
        offsetSlide += deleteNotDigits(width);
    }
    if(indexSlide == slides.length) {
        indexSlide = 1;
    } else {
        indexSlide++;
    }
    showSlideIndicators(indexSlide, offsetSlide);
});


prevSlide.addEventListener('click' , () => {
    if(offsetSlide == 0) {
        offsetSlide = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offsetSlide -= deleteNotDigits(width);
    }
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
        offsetSlide = deleteNotDigits(width) * (slideTo - 1);
        showSlideIndicators(indexSlide, offsetSlide);
    });
});

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

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}
}

export default sliders;
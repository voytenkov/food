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

export default calc;
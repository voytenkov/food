import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

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
 
             postData('http://food.local:3000/requests', json)
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
         openModal('.modal', modalTimerId);
         
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
             closeModal('.modal');
         }, 4000);
     }
 
}

export default forms;
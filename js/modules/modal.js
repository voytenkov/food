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

export default modal;
export {openModal};
export {closeModal};
function smoothScroll(targetId, duration = 800) {
  const target = document.querySelector(targetId);
  const start = window.pageYOffset;
  const end = target.offsetTop;
  const distance = end - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * ease);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

document
  .querySelector('.welcome-button')
  .addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll('#location', 1000);
  });

(() => {
  const refs = {
    // Додати атрибут data-modal-open на кнопку відкриття
    openModalBtn: document.querySelector('[data-modal-open]'),
    // Додати атрибут data-modal-close на кнопку закриття
    closeModalBtn: document.querySelector('[data-modal-close]'),
    // Додати атрибут data-modal на бекдроп модалки
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    // is-open це клас який буде додаватися/забиратися на бекдроп при натисканні на кнопки
    refs.modal.classList.toggle('is-open');
  }
})();

(() => {
  const refs = {
    closeModalBtn: document.querySelector('[data-sub-close]'),
    extraCloseBtn: document.querySelector('[data-subs-close]'),
    modal: document.querySelector('[data-sub]'),
    form: document.querySelector('[data-sub-form]'), 
  };

  refs.closeModalBtn.addEventListener('click', toggleModal);
  refs.extraCloseBtn.addEventListener('click', toggleModal);

  refs.form?.addEventListener('submit', function (e) {
    e.preventDefault(); 
    refs.modal.classList.add('subscription-open'); 
  });

  function toggleModal() {
    refs.modal.classList.toggle('subscription-open');
  }
})();

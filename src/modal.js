import "wicg-inert";

const modal = document.querySelector('.modal');
const modalWindow = document.querySelector('.modal-window');
const modalMask = document.querySelector('.modal-mask');
const btnCloseModal = document.querySelector('.modal-btn-cancel');
const addSiteForm = document.querySelector('#addsite-form');

let previousActiveElement;

function openModal() {
  //when the user clicks the modal
  //we want to retain knowledge of
  //what was the previous active element
  //so when the user closes the modal, 
  //he goes back to the prev active element
  previousActiveElement = document.activeElement;

  //makes the siblings of our modal inert
  //inert removes an element from the accesibility tree
  //and makes sure none of its children are focusable
  Array.from(document.body.children).forEach(child => {
    if (child !== modal) child.inert = true;
  });

  //set modal visible
  modal.classList.add('modal-visible');

  //close the modal
  modalMask.addEventListener('click', closeModal);
  btnCloseModal.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  //move focus into the modal
  modal.querySelector('#name').focus();
}

function closeModal() {
  //cleanup any event listeners
  modalMask.removeEventListener('click', closeModal);
  modalWindow.querySelectorAll('button').forEach(btn => {
    btn.removeEventListener('click', closeModal);
  });
  document.removeEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  addSiteForm.reset();
  //un-inert the siblings
  Array.from(document.body.children).forEach(child => {
    if (child !== modal) child.inert = false;
  });

  //hide the modal
  modal.classList.remove('modal-visible');

  //restore focus to the prev active element
  previousActiveElement.focus();
}


export { openModal, closeModal };
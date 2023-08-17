const Modal = {
  show(title, body) {
    const modalElem = document.querySelector('modal-alert');
    modalElem.setAttribute('title', title);
    modalElem.setAttribute('body', body);
    modalElem.show();
  },
};

export default Modal;

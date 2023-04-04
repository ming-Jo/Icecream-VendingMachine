class Modal {
  constructor() {}

  createModal() {
    const $body = document.querySelector("body");
    console.log($body);
    const modalWrap = document.createElement("div");
    modalWrap.classList.add("modal");
    $body.appendChild(modalWrap);
  }
}

export default Modal;

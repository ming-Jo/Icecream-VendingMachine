class Modal {
  constructor() {}

  createModal(text, textBold) {
    const $body = document.querySelector("body");

    const modalWrap = document.createElement("article");
    modalWrap.classList.add("modal-wrap");

    const irText = document.createElement("h2");
    irText.classList.add("ir");
    irText.textContent = "알림창";

    const backdrop = document.createElement("div");
    backdrop.classList.add("backdrop");

    const closeModalBtn = document.createElement("button");
    closeModalBtn.setAttribute("type", "button");
    closeModalBtn.classList.add("btn-close-modal");

    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");

    const modalInfoText = document.createElement("p");
    modalInfoText.classList.add("modal-info-text");
    modalInfoText.textContent = text;

    const modalInfoTextBold = document.createElement("strong");
    modalInfoTextBold.classList.add("modal-info-text-bold");
    modalInfoTextBold.textContent = textBold;

    modalDiv.append(modalInfoText, modalInfoTextBold);
    modalWrap.append(irText, backdrop, closeModalBtn, modalDiv);
    $body.appendChild(modalWrap);
  }

  removeModal() {
    const $body = document.querySelector("body");
    const $modalWrap = document.querySelector(".modal-wrap");
    const $closeModalBtn = document.querySelector(".btn-close-modal");
    const $backdrop = document.querySelector(".backdrop");

    $backdrop.addEventListener("click", (event) => {
      $body.removeChild($modalWrap);
    });
    $closeModalBtn.addEventListener("click", (event) => {
      $body.removeChild($modalWrap);
    });
  }
}

export default Modal;

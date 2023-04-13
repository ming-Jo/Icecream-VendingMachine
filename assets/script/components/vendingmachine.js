import Modal from "./modal.js";

class VendingMachine {
  constructor() {
    const vMachine = document.querySelector(".vending-machine");
    this.itemList = vMachine.querySelector(".list-item");
    this.gotList = vMachine.querySelector(".list-item-staged");

    const myinfo = document.querySelector(".my-info");
    this.myMoney = myinfo.querySelector(".txt-mymoney");
    this.balance = myinfo.querySelector(".txt-balance");
    this.inputCostEl = myinfo.querySelector(".inp-put");
    this.btnPut = myinfo.querySelector(".btn-put");
    this.btnReturn = myinfo.querySelector(".btn-return");
    this.btnGet = myinfo.querySelector(".btn-get");
    this.stagedList = myinfo.querySelector(".list-item-staged");
    this.txtTotal = myinfo.querySelector(".txt-total");
  }
  setup() {
    this.bindEvents();
  }

  // 선택한 재료 목록 생성
  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");
    stagedItem.dataset.item = target.dataset.item;
    stagedItem.dataset.price = target.dataset.price;
    stagedItem.innerHTML = `
          <button type="button" class="btn-staged">
            <img src="./assets/images/${target.dataset.img}" alt="" class="img-item">
            <strong class="txt-item">${target.dataset.item}</strong>
            <span class="num-counter">1</span>
          </button>
        `;
    this.stagedList.appendChild(stagedItem);
  }

  bindEvents() {
    const modal = new Modal();

    this.btnPut.addEventListener("click", () => {
      if (!this.inputCostEl.value) {
        modal.createModal("입금할 금액이 없네요.", "금액을 입력해주세요!");
        modal.removeModal();
      }
      const inputCost = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (inputCost) {
        if (inputCost <= myMoneyVal && inputCost > 0) {
          this.myMoney.textContent =
            new Intl.NumberFormat().format(myMoneyVal - inputCost) + " 원";
          this.balance.textContent =
            new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + " 원";
        } else {
          modal.createModal("소지금이 부족해요.","소지금 이하의 금액만 입금 가능합니다.");
          modal.removeModal();
        }
        this.inputCostEl.value = null;
      }
    });

    this.btnReturn.addEventListener("click", () => {
      if (this.balance.textContent.length === 1) {
        modal.createModal("반환할 금액이 없어요.", "돈을 입금해주세요!");
        modal.removeModal();
      }
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));

      if (balanceVal) {
        this.myMoney.textContent =
          new Intl.NumberFormat().format(balanceVal + myMoneyVal) + " 원";
        this.balance.textContent = " 원";
      }
    });

    const btnsCola = this.itemList.querySelectorAll("button");

    btnsCola.forEach((item) => {
      item.addEventListener("click", (event) => {
        const targetEl = event.currentTarget;
        const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
        let isStaged = false;
        const targetElPrice = parseInt(targetEl.dataset.price);
        const stagedListItem = this.stagedList.querySelectorAll("li");

        if (balanceVal >= targetElPrice) {
          this.balance.textContent =
            new Intl.NumberFormat().format(balanceVal - targetElPrice) + " 원";

          for (const item of stagedListItem) {
            if (item.dataset.item === targetEl.dataset.item) {
              item.querySelector(".num-counter").textContent++;
              isStaged = true;
              break;
            }
          }

          if (!isStaged) {
            this.stagedItemGenerator(targetEl);
          }

          targetEl.dataset.count--;

          if (parseInt(targetEl.dataset.count) === 0) {
            targetEl.parentElement.classList.add("sold-out");
            const warning = document.createElement("em");
            warning.textContent = "해당 상품은 품절입니다.";
            warning.classList.add("ir");
            targetEl.parentElement.insertBefore(warning, targetEl);
          }
        } else {
          modal.createModal("잔액이 부족해요.", "돈을 입금해주세요!");
          modal.removeModal();
        }
      });
    });

    this.btnGet.addEventListener("click", () => {
      let isGot = false;
      let totalPrice = 0;

      if (this.txtTotal.textContent.length !== 9 && this.stagedList.childNodes.length === 0) {
        modal.createModal("주문할 품목이 없어요.", "상품을 클릭해주세요!");
        modal.removeModal();
      }

      for (const itemStaged of this.stagedList.querySelectorAll("li")) {
        for (const itemGot of this.gotList.querySelectorAll("li")) {
          let itemGotCount = itemGot.querySelector(".num-counter");
          if (itemStaged.dataset.item === itemGot.dataset.item) {
            itemGotCount.textContent =
              parseInt(itemGotCount.textContent) +
              parseInt(itemStaged.querySelector(".num-counter").textContent);
            isGot = true;
            break;
          }
        }

        if (!isGot) {
          this.gotList.appendChild(itemStaged);
        }
        isGot = false;
      }

      this.stagedList.innerHTML = null;

      this.gotList.querySelectorAll("li").forEach((itemGot) => {
        totalPrice += itemGot.dataset.price * parseInt(itemGot.querySelector(".num-counter").textContent);
      });
      this.txtTotal.textContent = `총금액 : ${new Intl.NumberFormat().format(totalPrice)} 원`;

      if (this.txtTotal.textContent.length === 9) {
        modal.createModal("주문할 품목이 없어요.", "상품을 클릭해주세요!");
        modal.removeModal();
      }
    });
  }
}

export default VendingMachine;

class IceCreamGenerator {
  constructor() {
    this.itemList = document.querySelector(".list-item");
  }

  async setup() {
    await this.loadData((json) => {
      this.iceFactory(json);
    });
  }

  async loadData(callback) {
    const response = await fetch("assets/script/item.json");

    if (response.ok) {
      callback(await response.json());
    } else {
      alert("통신 에러!" + response.status);
    }
  }

  iceFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement("li");
      const itemTemplate = `
            <button type="button" class="btn-item" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
                <img src="./assets/images/${el.img}" alt="" class="img-item">
                <strong class="tit-item">${el.name}</strong>
                <span class="txt-price">${el.cost}</span>
            </button>
            `;
      item.innerHTML = itemTemplate;
      docFrag.appendChild(item);
    });
    this.itemList.appendChild(docFrag);
  }
}

export default IceCreamGenerator;

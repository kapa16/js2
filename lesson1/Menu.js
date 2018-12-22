class Menu {
  constructor(id, className, items) {
    this.id = id;
    this.className = className;
    this.items = items;
  }

  getMarkupHtml() {
    let result = `<ul class="${this.className}" id="${this.id}">`;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof MenuItem || this.items[i] instanceof SubMenu) {
        result += this.items[i].render();
      }
    }
    result += '</ul>';
    return result;
  }

  render(parentBlock) {
    parentBlock.innerHTML = this.getMarkupHtml();
  }

  remove() {
    const menuParent = this.getMenuEl().parentElement;
    menuParent.removeChild(this.getMenuEl());
  }

  toggleMenu(parentBlock) {
    if (this.getMenuEl()) {
      this.remove();
    } else {
      this.render(parentBlock);
    }
  }

  getMenuEl() {
    return document.querySelector(`#${this.id}`);
  }
}
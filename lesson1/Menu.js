class Menu {
  constructor(id, className, parentBlock, items) {
    this.id = id;
    this.className = className;
    this.items = items;
    this.parentBlock = parentBlock;
  }

  getMarkupHtml() {
    let result = `<ul class="${this.className}" id="${this.id}">`;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof MenuItem) {
        result += this.items[i].render();
      }
    }
    result += '</ul>';
    return result;
  }

  render() {
    this.parentBlock.innerHTML = this.getMarkupHtml();
  }

  remove() {
    const menuParent = this.getMenuEl().parentElement;
    menuParent.removeChild(this.getMenuEl());
  }

  toggleMenu() {
    if (this.getMenuEl()) {
      this.remove();
    } else {
      this.render();
    }
  }

  getMenuEl() {
    return document.querySelector(`#${this.id}`);
  }
}
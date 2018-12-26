class Menu {
  constructor(id, className, items) {
    this.id = id;
    this.className = className;
    this.items = items;
    this._currentEl = null;
    this._classSubMenuList = 'submenu_list';
    this._classSubMenuShow = 'menu__sub_show';
  }

  getMarkupHtml() {
    let result = `<ul class="${this.className}" id="${this.id}">`;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] instanceof MenuItem || this.items[i] instanceof SubMenu) {
        result += this.items[i].render();
        console.log(result);
      }
    }
    result += '</ul>';
    return result;
  }

  render(parentBlock) {
    parentBlock.innerHTML = this.getMarkupHtml();
    this._addEventShowSubMenu();
  }

  _addEventShowSubMenu() {
    const listelements = [...document.querySelectorAll(`.${this._classSubMenuList}`)];
    listelements.forEach((elem) => {
      elem.addEventListener('click', evt => this._showSubMenu(evt));
      // elem.addEventListener('mouseout', evt => this._hideSubMenu(evt));
    }) ;


  }

  _showSubMenu(evt) {
    const listEl = evt.target;

    if (listEl.classList.contains(this._classSubMenuList)) {
      this._currentEl = listEl;
      listEl.style.position = 'relative';
      listEl.querySelector('ul').classList.toggle(this._classSubMenuShow);
    }
  }

  _hideSubMenu(evt) {
    const listEl = evt.target;

    if (listEl.classList.contains(this._classSubMenuList)) {
      this._currentEl.querySelector('ul').classList.remove(this._classSubMenuShow);
      if (this._currentEl === listEl) {
        return;
      }
    }


    this._currentEl = listEl;
  }

  remove() {
    const menuParent = this.getMenuEl().parentElement;
    menuParent.removeChild(this.getMenuEl());
  }

  /**
   * Показывает / скрывает блок меню
   * @param {Element} parentBlock - сонтейнер для меню
   */
  toggleMenu(parentBlock) {
    if (this.getMenuEl()) {
      this.remove();
    } else {
      this.render(parentBlock);
    }
  }

  /**
   * Провеяет существование элемента меню
   * @returns {Element}
   */
  getMenuEl() {
    return document.querySelector(`#${this.id}`);
  }
}